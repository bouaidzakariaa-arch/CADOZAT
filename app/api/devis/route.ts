import { NextRequest, NextResponse } from 'next/server'

// ─── RATE LIMITING ────────────────────────────────────────────────
const rateLimit = new Map<string, { count: number; resetAt: number }>()

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const limit = rateLimit.get(ip)
  if (!limit || now > limit.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + 60_000 })
    return false
  }
  if (limit.count >= 3) return true
  limit.count++
  return false
}

const RESEND_API_KEY = process.env.RESEND_API_KEY
const ADMIN_EMAIL    = process.env.ADMIN_EMAIL || 'contact@cadozat.com'
const FROM_EMAIL     = 'onboarding@resend.dev'

export async function POST(request: NextRequest) {
  try {
    // ── Log 1 : vérif clé ──
    console.log('[devis] RESEND_API_KEY présente ?', !!RESEND_API_KEY)
    console.log('[devis] ADMIN_EMAIL =', ADMIN_EMAIL)

    const ip = request.headers.get('x-forwarded-for') ?? 'unknown'
    if (isRateLimited(ip)) {
      return NextResponse.json({ error: 'Trop de demandes. Réessayez dans une minute.' }, { status: 429 })
    }

    const body = await request.json()
    console.log('[devis] body reçu :', JSON.stringify(body))

    // ── Validation ──
    if (!body.nom || !body.prenom || !body.telephone || !body.email || !body.vehicule) {
      console.log('[devis] Validation échouée — champs manquants')
      return NextResponse.json({ error: 'Champs obligatoires manquants' }, { status: 400 })
    }

    if (!RESEND_API_KEY) {
      console.error('[devis] ❌ RESEND_API_KEY manquante !')
      return NextResponse.json({ error: 'Configuration email manquante — RESEND_API_KEY introuvable' }, { status: 500 })
    }

    const { nom, prenom, societe, telephone, email, ville, vehicule, message, date } = body

    const dateFormatee = new Date(date || Date.now()).toLocaleString('fr-MA', {
      dateStyle: 'full', timeStyle: 'short', timeZone: 'Africa/Casablanca'
    })

    // ── Email admin ──
    console.log('[devis] Envoi email admin vers', ADMIN_EMAIL)
    const resAdmin = await fetch('https://api.resend.com/emails', {
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
<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:32px;">
  <div style="height:3px;background:linear-gradient(90deg,#CC0000,#C9A84C,#1B2B6B);border-radius:99px;margin-bottom:24px;"></div>
  <h2 style="color:#111;margin:0 0 4px;">🚛 Nouveau devis reçu</h2>
  <p style="color:#aaa;font-size:13px;margin:0 0 24px;">${dateFormatee}</p>

  <div style="background:#fff5f5;border:1px solid #fecaca;border-radius:12px;padding:16px 20px;margin-bottom:20px;">
    <p style="margin:0;font-size:11px;color:#aaa;text-transform:uppercase;letter-spacing:1px;margin-bottom:4px;">Véhicule demandé</p>
    <p style="margin:0;font-size:18px;font-weight:800;color:#CC0000;">${vehicule}</p>
  </div>

  <table style="width:100%;border-collapse:collapse;margin-bottom:20px;">
    <tr><td style="padding:8px 0;border-bottom:1px solid #f0f0f0;color:#888;font-size:12px;">Nom complet</td><td style="padding:8px 0;border-bottom:1px solid #f0f0f0;font-weight:700;color:#111;">${prenom} ${nom}</td></tr>
    <tr><td style="padding:8px 0;border-bottom:1px solid #f0f0f0;color:#888;font-size:12px;">Société</td><td style="padding:8px 0;border-bottom:1px solid #f0f0f0;font-weight:700;color:#111;">${societe || '—'}</td></tr>
    <tr><td style="padding:8px 0;border-bottom:1px solid #f0f0f0;color:#888;font-size:12px;">Téléphone</td><td style="padding:8px 0;border-bottom:1px solid #f0f0f0;font-weight:700;"><a href="tel:${telephone}" style="color:#CC0000;">${telephone}</a></td></tr>
    <tr><td style="padding:8px 0;border-bottom:1px solid #f0f0f0;color:#888;font-size:12px;">Email</td><td style="padding:8px 0;border-bottom:1px solid #f0f0f0;font-weight:700;"><a href="mailto:${email}" style="color:#CC0000;">${email}</a></td></tr>
    <tr><td style="padding:8px 0;color:#888;font-size:12px;">Ville</td><td style="padding:8px 0;font-weight:700;color:#111;">${ville || '—'}</td></tr>
  </table>

  ${message ? `<div style="background:#f8f7f5;border-radius:10px;padding:14px 16px;margin-bottom:20px;"><p style="margin:0 0 6px;font-size:11px;color:#aaa;text-transform:uppercase;">Message</p><p style="margin:0;font-size:13px;color:#555;line-height:1.6;">${message}</p></div>` : ''}

  <div>
    <a href="tel:${telephone}" style="display:inline-block;background:#CC0000;color:#fff;font-weight:700;font-size:13px;padding:10px 20px;border-radius:99px;text-decoration:none;margin-right:8px;">📞 Appeler ${prenom}</a>
    <a href="mailto:${email}" style="display:inline-block;background:#1B2B6B;color:#fff;font-weight:700;font-size:13px;padding:10px 20px;border-radius:99px;text-decoration:none;">✉️ Répondre</a>
  </div>
</div>`,
      }),
    })

    const adminJson = await resAdmin.json()
    console.log('[devis] Réponse Resend admin — status:', resAdmin.status, '— body:', JSON.stringify(adminJson))

    if (!resAdmin.ok) {
      console.error('[devis] ❌ Erreur Resend admin:', JSON.stringify(adminJson))
      throw new Error(`Resend admin error: ${JSON.stringify(adminJson)}`)
    }

    // ── Email client ──
    console.log('[devis] Envoi email client vers', email)
    const resClient = await fetch('https://api.resend.com/emails', {
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
<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:32px;text-align:center;">
  <div style="height:3px;background:linear-gradient(90deg,#CC0000,#C9A84C,#1B2B6B);border-radius:99px;margin-bottom:24px;"></div>
  <h2 style="color:#111;">✅ Demande reçue !</h2>
  <p style="color:#888;font-size:14px;">Bonjour ${prenom}, votre demande a bien été enregistrée.</p>
  <p style="color:#555;font-size:14px;line-height:1.6;">Notre équipe vous contactera dans les <strong>plus brefs délais</strong>.</p>
  <div style="background:#f8f7f5;border-radius:12px;padding:20px;margin:20px 0;text-align:left;">
    <p style="margin:0 0 12px;font-size:11px;color:#aaa;text-transform:uppercase;">Récapitulatif</p>
    <table style="width:100%;border-collapse:collapse;">
      <tr><td style="padding:6px 0;border-bottom:1px solid #ece9e2;font-size:12px;color:#888;">Véhicule</td><td style="padding:6px 0;border-bottom:1px solid #ece9e2;font-weight:700;color:#CC0000;text-align:right;">${vehicule}</td></tr>
      <tr><td style="padding:6px 0;border-bottom:1px solid #ece9e2;font-size:12px;color:#888;">Nom</td><td style="padding:6px 0;border-bottom:1px solid #ece9e2;font-weight:700;text-align:right;">${prenom} ${nom}</td></tr>
      <tr><td style="padding:6px 0;font-size:12px;color:#888;">Téléphone</td><td style="padding:6px 0;font-weight:700;text-align:right;">${telephone}</td></tr>
    </table>
  </div>
  <a href="tel:0524885025" style="display:inline-block;background:#CC0000;color:#fff;font-weight:700;font-size:14px;padding:12px 28px;border-radius:99px;text-decoration:none;">📞 0524 885 025</a>
  <p style="color:#ccc;font-size:11px;margin-top:24px;">CADOZAT — Concessionnaire officiel Isuzu & Karry au Maroc</p>
</div>`,
      }),
    })

    const clientJson = await resClient.json()
    console.log('[devis] Réponse Resend client — status:', resClient.status, '— body:', JSON.stringify(clientJson))

    // On ne bloque pas si email client échoue
    if (!resClient.ok) {
      console.warn('[devis] ⚠️ Email client non envoyé:', JSON.stringify(clientJson))
    }

    return NextResponse.json({ success: true, message: 'Demande envoyée avec succès' })

  } catch (error) {
    console.error('[devis] ❌ Erreur serveur:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Erreur serveur inconnue' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json([])
}