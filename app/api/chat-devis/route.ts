import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { nom, prenom, email, telephone, ville, vehicule } = body

    const nomComplet = prenom ? `${prenom} ${nom}` : nom
    const villeAffichee = ville && ville !== 'Non précisée' ? ville : 'Non précisée'
    const dateHeure = new Date().toLocaleString('fr-MA', {
      timeZone: 'Africa/Casablanca',
      dateStyle: 'full',
      timeStyle: 'short',
    })

    await resend.emails.send({
      from: 'Cadozat Bot <noreply@cadozaat.com>',
      to: 'CADOZAT99@hotmail.com',
      subject: `🚛 Nouveau devis (Chat) — ${vehicule} — ${nomComplet}`,
      html: `
        <!DOCTYPE html>
        <html lang="fr">
        <head><meta charset="UTF-8"/></head>
        <body style="margin:0;padding:0;background:#f5f5f5;font-family:Arial,sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="padding:32px 0;">
            <tr><td align="center">
              <table width="580" cellpadding="0" cellspacing="0"
                style="background:#fff;border-radius:14px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

                <tr>
                  <td style="background:linear-gradient(135deg,#CC0000,#1B2B6B);padding:26px 32px;">
                    <h1 style="margin:0;color:#fff;font-size:20px;font-weight:800;">
                      🚛 Nouveau devis via Chatbot
                    </h1>
                    <p style="margin:6px 0 0;color:rgba(255,255,255,0.75);font-size:12px;">
                      ${dateHeure}
                    </p>
                  </td>
                </tr>

                <tr>
                  <td style="padding:24px 32px 0;">
                    <div style="background:#fff5f5;border:2px solid #fecaca;border-radius:10px;padding:16px;text-align:center;">
                      <p style="margin:0;font-size:11px;color:#CC0000;font-weight:700;text-transform:uppercase;letter-spacing:1px;">Véhicule souhaité</p>
                      <p style="margin:6px 0 0;font-size:26px;font-weight:900;color:#1e293b;">${vehicule}</p>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td style="padding:20px 32px 0;">
                    <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;">
                      <tr style="background:#f8fafc;">
                        <td style="padding:10px 16px;font-size:12px;color:#64748b;width:120px;">Nom</td>
                        <td style="padding:10px 16px;font-size:14px;font-weight:700;color:#1e293b;">${nomComplet}</td>
                      </tr>
                      <tr style="border-top:1px solid #e2e8f0;">
                        <td style="padding:10px 16px;font-size:12px;color:#64748b;">Email</td>
                        <td style="padding:10px 16px;">
                          <a href="mailto:${email}" style="font-size:14px;font-weight:600;color:#CC0000;text-decoration:none;">${email}</a>
                        </td>
                      </tr>
                      <tr style="border-top:1px solid #e2e8f0;background:#f8fafc;">
                        <td style="padding:10px 16px;font-size:12px;color:#64748b;">Téléphone</td>
                        <td style="padding:10px 16px;">
                          <a href="tel:${telephone}" style="font-size:14px;font-weight:700;color:#1B2B6B;text-decoration:none;">📞 ${telephone}</a>
                        </td>
                      </tr>
                      <tr style="border-top:1px solid #e2e8f0;">
                        <td style="padding:10px 16px;font-size:12px;color:#64748b;">Ville</td>
                        <td style="padding:10px 16px;font-size:14px;color:#1e293b;">📍 ${villeAffichee}</td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <tr>
                  <td style="padding:24px 32px 28px;">
                    <a href="tel:${telephone}"
                      style="display:inline-block;padding:12px 22px;background:linear-gradient(135deg,#CC0000,#1B2B6B);color:#fff;font-weight:700;font-size:13px;border-radius:8px;text-decoration:none;margin-right:10px;">
                      📞 Appeler le client
                    </a>
                    <a href="mailto:${email}?subject=Votre devis ${vehicule} — CADOZAT"
                      style="display:inline-block;padding:12px 22px;background:#f1f5f9;color:#1e293b;font-weight:700;font-size:13px;border-radius:8px;text-decoration:none;border:1px solid #e2e8f0;">
                      ✉️ Répondre
                    </a>
                  </td>
                </tr>

                <tr>
                  <td style="background:#f8fafc;padding:14px 32px;border-top:1px solid #e2e8f0;text-align:center;">
                    <p style="margin:0;font-size:11px;color:#94a3b8;">Cadozat Bot · cadozaat.com</p>
                  </td>
                </tr>

              </table>
            </td></tr>
          </table>
        </body>
        </html>
      `,
    })

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('[Chat Devis Error]', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}