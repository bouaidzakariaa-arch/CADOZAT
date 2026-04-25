import { NextRequest, NextResponse } from 'next/server'

// ─── CONFIGURATION ────────────────────────────────────────────────
// 1. Créer un compte sur resend.com (gratuit)
// 2. Créer une API Key dans le dashboard Resend
// 3. Ajouter dans Vercel : Settings → Environment Variables
//    RESEND_API_KEY = re_xxxxxxxxxxxxxxxxx
//    ADMIN_EMAIL    = ton@email.com  (où recevoir les devis)
// ─────────────────────────────────────────────────────────────────

const RESEND_API_KEY = process.env.RESEND_API_KEY
const ADMIN_EMAIL    = process.env.ADMIN_EMAIL || 'contact@cadozat.com'
const FROM_EMAIL     = 'devis@cadozat.com' // doit correspondre à ton domaine vérifié sur Resend
                                            // ou utilise: onboarding@resend.dev pour les tests

// POST — Recevoir un devis et envoyer 2 emails
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validation
    if (!body.nom || !body.prenom || !body.telephone || !body.email || !body.vehicule) {
      return NextResponse.json(
        { error: 'Champs obligatoires manquants' },
        { status: 400 }
      )
    }

    if (!RESEND_API_KEY) {
      console.error('RESEND_API_KEY manquante')
      return NextResponse.json({ error: 'Configuration email manquante' }, { status: 500 })
    }

    const {
      nom, prenom, societe, telephone, email,
      ville, vehicule, message, date
    } = body

    const dateFormatee = new Date(date || Date.now()).toLocaleString('fr-MA', {
      dateStyle: 'full', timeStyle: 'short', timeZone: 'Africa/Casablanca'
    })

    // ── Email 1 : notification admin ──────────────────────────────
    const emailAdmin = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `CADOZAT Devis <${FROM_EMAIL}>`,
        to: [ADMIN_EMAIL],
        subject: `🚛 Nouveau devis — ${vehicule} — ${prenom} ${nom}`,
        html: `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
</head>
<body style="margin:0;padding:0;background:#f4f5f7;font-family:Arial,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f5f7;padding:32px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

        <!-- Header -->
        <tr>
          <td style="background:#1B2B6B;padding:28px 32px;">
            <div style="height:3px;background:linear-gradient(90deg,#CC0000,#C9A84C,#1B2B6B);border-radius:99px;margin-bottom:20px;"></div>
            <h1 style="color:#fff;margin:0;font-size:22px;font-weight:900;letter-spacing:-0.5px;">
              🚛 Nouveau devis reçu
            </h1>
            <p style="color:rgba(255,255,255,0.6);margin:6px 0 0;font-size:13px;">${dateFormatee}</p>
          </td>
        </tr>

        <!-- Véhicule -->
        <tr>
          <td style="padding:24px 32px 0;">
            <div style="background:#fff5f5;border:1px solid #fecaca;border-radius:12px;padding:16px 20px;">
              <p style="margin:0;font-size:11px;color:#aaa;text-transform:uppercase;letter-spacing:1px;margin-bottom:6px;">Véhicule demandé</p>
              <p style="margin:0;font-size:18px;font-weight:800;color:#CC0000;">${vehicule}</p>
            </div>
          </td>
        </tr>

        <!-- Infos client -->
        <tr>
          <td style="padding:20px 32px 0;">
            <h2 style="font-size:13px;font-weight:700;color:#1B2B6B;text-transform:uppercase;letter-spacing:1px;margin:0 0 14px;">Coordonnées client</h2>
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td width="50%" style="padding-bottom:12px;">
                  <p style="margin:0;font-size:11px;color:#aaa;">Nom complet</p>
                  <p style="margin:4px 0 0;font-size:14px;font-weight:700;color:#111;">${prenom} ${nom}</p>
                </td>
                <td width="50%" style="padding-bottom:12px;">
                  <p style="margin:0;font-size:11px;color:#aaa;">Société</p>
                  <p style="margin:4px 0 0;font-size:14px;font-weight:700;color:#111;">${societe || '—'}</p>
                </td>
              </tr>
              <tr>
                <td width="50%" style="padding-bottom:12px;">
                  <p style="margin:0;font-size:11px;color:#aaa;">Téléphone</p>
                  <p style="margin:4px 0 0;font-size:14px;font-weight:700;color:#111;">
                    <a href="tel:${telephone}" style="color:#CC0000;text-decoration:none;">${telephone}</a>
                  </p>
                </td>
                <td width="50%" style="padding-bottom:12px;">
                  <p style="margin:0;font-size:11px;color:#aaa;">Email</p>
                  <p style="margin:4px 0 0;font-size:14px;font-weight:700;color:#111;">
                    <a href="mailto:${email}" style="color:#CC0000;text-decoration:none;">${email}</a>
                  </p>
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  <p style="margin:0;font-size:11px;color:#aaa;">Ville</p>
                  <p style="margin:4px 0 0;font-size:14px;font-weight:700;color:#111;">${ville || '—'}</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Message -->
        ${message ? `
        <tr>
          <td style="padding:16px 32px 0;">
            <h2 style="font-size:13px;font-weight:700;color:#1B2B6B;text-transform:uppercase;letter-spacing:1px;margin:0 0 10px;">Message</h2>
            <div style="background:#f8f7f5;border-radius:10px;padding:14px 16px;">
              <p style="margin:0;font-size:13px;color:#555;line-height:1.6;">${message}</p>
            </div>
          </td>
        </tr>
        ` : ''}

        <!-- Actions rapides -->
        <tr>
          <td style="padding:24px 32px;">
            <div style="display:flex;gap:12px;">
              <a href="tel:${telephone}" style="display:inline-block;background:#CC0000;color:#fff;font-weight:700;font-size:13px;padding:10px 20px;border-radius:99px;text-decoration:none;margin-right:8px;">
                📞 Appeler ${prenom}
              </a>
              <a href="mailto:${email}" style="display:inline-block;background:#1B2B6B;color:#fff;font-weight:700;font-size:13px;padding:10px 20px;border-radius:99px;text-decoration:none;">
                ✉️ Répondre par email
              </a>
            </div>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#f8f7f5;padding:16px 32px;border-top:1px solid #ece9e2;">
            <p style="margin:0;font-size:11px;color:#aaa;text-align:center;">
              CADOZAT — Concessionnaire Isuzu & Karry au Maroc<br/>
              Ouarzazate · Agadir · Tinghir — 0524 885 025
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>

</body>
</html>
        `,
      }),
    })

    if (!emailAdmin.ok) {
      const err = await emailAdmin.json()
      console.error('Erreur Resend admin:', err)
      throw new Error('Échec envoi email admin')
    }

    // ── Email 2 : confirmation client ─────────────────────────────
    const emailClient = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `CADOZAT <${FROM_EMAIL}>`,
        to: [email],
        subject: `✅ Votre demande de devis a bien été reçue — ${vehicule}`,
        html: `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
</head>
<body style="margin:0;padding:0;background:#f4f5f7;font-family:Arial,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f5f7;padding:32px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

        <!-- Header -->
        <tr>
          <td style="background:#1B2B6B;padding:32px;text-align:center;">
            <div style="height:3px;background:linear-gradient(90deg,#CC0000,#C9A84C,#1B2B6B);border-radius:99px;margin-bottom:24px;"></div>
            <div style="width:56px;height:56px;background:rgba(255,255,255,0.1);border-radius:50%;display:inline-flex;align-items:center;justify-content:center;margin-bottom:16px;">
              <span style="font-size:28px;">✅</span>
            </div>
            <h1 style="color:#fff;margin:0;font-size:22px;font-weight:900;">Demande reçue !</h1>
            <p style="color:rgba(255,255,255,0.6);margin:8px 0 0;font-size:14px;">
              Bonjour ${prenom}, votre demande a bien été enregistrée.
            </p>
          </td>
        </tr>

        <!-- Récap -->
        <tr>
          <td style="padding:28px 32px 0;">
            <p style="margin:0 0 16px;font-size:15px;color:#555;line-height:1.6;">
              Notre équipe commerciale vous contactera dans les <strong style="color:#111;">plus brefs délais</strong> pour vous accompagner dans votre projet.
            </p>

            <div style="background:#f8f7f5;border-radius:12px;padding:20px;">
              <p style="margin:0 0 4px;font-size:11px;color:#aaa;text-transform:uppercase;letter-spacing:1px;">Récapitulatif</p>
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:12px;">
                <tr>
                  <td style="padding:6px 0;border-bottom:1px solid #ece9e2;">
                    <span style="font-size:12px;color:#888;">Véhicule</span>
                  </td>
                  <td style="padding:6px 0;border-bottom:1px solid #ece9e2;text-align:right;">
                    <span style="font-size:13px;font-weight:700;color:#CC0000;">${vehicule}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:6px 0;border-bottom:1px solid #ece9e2;">
                    <span style="font-size:12px;color:#888;">Nom</span>
                  </td>
                  <td style="padding:6px 0;border-bottom:1px solid #ece9e2;text-align:right;">
                    <span style="font-size:13px;font-weight:700;color:#111;">${prenom} ${nom}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:6px 0;border-bottom:1px solid #ece9e2;">
                    <span style="font-size:12px;color:#888;">Téléphone</span>
                  </td>
                  <td style="padding:6px 0;border-bottom:1px solid #ece9e2;text-align:right;">
                    <span style="font-size:13px;font-weight:700;color:#111;">${telephone}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:6px 0;">
                    <span style="font-size:12px;color:#888;">Ville</span>
                  </td>
                  <td style="padding:6px 0;text-align:right;">
                    <span style="font-size:13px;font-weight:700;color:#111;">${ville || '—'}</span>
                  </td>
                </tr>
              </table>
            </div>
          </td>
        </tr>

        <!-- Contact -->
        <tr>
          <td style="padding:20px 32px 0;">
            <div style="background:#fff5f5;border:1px solid #fecaca;border-radius:12px;padding:16px 20px;text-align:center;">
              <p style="margin:0;font-size:13px;color:#555;">Besoin d&apos;une réponse rapide ?</p>
              <a href="tel:0524885025" style="display:inline-block;margin-top:10px;background:#CC0000;color:#fff;font-weight:700;font-size:14px;padding:10px 24px;border-radius:99px;text-decoration:none;">
                📞 0524 885 025
              </a>
            </div>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#f8f7f5;padding:20px 32px;border-top:1px solid #ece9e2;margin-top:28px;">
            <p style="margin:0;font-size:11px;color:#aaa;text-align:center;line-height:1.6;">
              CADOZAT — Concessionnaire officiel Isuzu & Karry au Maroc<br/>
              Ouarzazate · Agadir · Tinghir<br/>
              <a href="https://cadozat.ma" style="color:#CC0000;text-decoration:none;">cadozat.ma</a>
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>

</body>
</html>
        `,
      }),
    })

    if (!emailClient.ok) {
      const err = await emailClient.json()
      console.error('Erreur Resend client:', err)
      // On ne bloque pas si l'email client échoue, l'admin est déjà notifié
    }

    return NextResponse.json({
      success: true,
      message: 'Demande envoyée avec succès',
    })

  } catch (error) {
    console.error('Erreur API devis:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

// GET — gardé pour compatibilité (retourne vide sans auth)
export async function GET() {
  return NextResponse.json([])
}