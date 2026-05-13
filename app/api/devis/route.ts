import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// ─── SCHEMA ZOD ───────────────────────────────────────────────────
const schema = z.object({
  nom:       z.string().min(2).max(50),
  prenom:    z.string().min(2).max(50),
  email:     z.string().email(),
  telephone: z.string().min(8).max(15),
  vehicule:  z.string().min(2).max(100),
  ville:     z.string().max(50).optional(),
  societe:   z.string().max(100).optional(),
  message:   z.string().max(500).optional(),
})

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
const ADMIN_EMAIL    = process.env.ADMIN_EMAIL || 'bouaidzakariaa@gmail.com'
const FROM_EMAIL     = 'noreply@cadozaat.com'

// ─── POST — Créer un devis ────────────────────────────────────────
export async function POST(request: NextRequest) {
  try {
    // ── 1. Rate limiting ──
    const ip = request.headers.get('x-forwarded-for') ?? 'unknown'
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Trop de demandes. Réessayez dans une minute.' },
        { status: 429 }
      )
    }

    // ── 2. Parse & validation ──
    const body = await request.json()
    const parsed = schema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Données invalides' }, { status: 400 })
    }

    const { nom, prenom, societe, telephone, email, ville, vehicule, message } = parsed.data

    const dateFormatee = new Date().toLocaleString('fr-MA', {
      dateStyle: 'full', timeStyle: 'short', timeZone: 'Africa/Casablanca',
    })

    // ── 3. Sauvegarder en base de données ──
    const reference = `DEV-${Date.now()}`
    const devis = await prisma.devis.create({
      data: {
        reference,
        nom:       `${prenom} ${nom}`,
        email,
        telephone,
        societe:   societe || null,
        ville:     ville   || null,
        message:   `Véhicule demandé: ${vehicule}${message ? '\n\n' + message : ''}`,
        statut:    'EN_ATTENTE',
      },
    })

    // ── 4. Vérif clé Resend ──
    if (!RESEND_API_KEY) {
      console.warn('[devis] RESEND_API_KEY manquante — email non envoyé')
      return NextResponse.json({ success: true, id: devis.id, reference })
    }

    // ── 5. Email admin ──
    const resAdmin = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type':  'application/json',
      },
      body: JSON.stringify({
        from:    `CADOZAT Devis <${FROM_EMAIL}>`,
        to:      [ADMIN_EMAIL],
        subject: `🚛 Nouveau devis #${reference} — ${vehicule} — ${prenom} ${nom}`,
        html: `
<div style="font-family:Arial,sans-serif;max-width:620px;margin:0 auto;padding:32px;background:#fff;">
  <div style="height:3px;background:linear-gradient(90deg,#CC0000,#C9A84C,#1B2B6B);border-radius:99px;margin-bottom:28px;"></div>

  <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:24px;">
    <div>
      <h2 style="color:#111;margin:0 0 4px;font-size:22px;">🚛 Nouveau devis reçu</h2>
      <p style="color:#aaa;font-size:12px;margin:0;">${dateFormatee}</p>
    </div>
    <div style="background:#fff5f5;border:1px solid #fecaca;border-radius:10px;padding:8px 14px;text-align:center;">
      <p style="margin:0;font-size:10px;color:#aaa;text-transform:uppercase;letter-spacing:1px;">Réf.</p>
      <p style="margin:0;font-size:13px;font-weight:800;color:#CC0000;">${reference}</p>
    </div>
  </div>

  <div style="background:#fff5f5;border:1px solid #fecaca;border-radius:12px;padding:18px 20px;margin-bottom:20px;">
    <p style="margin:0 0 4px;font-size:11px;color:#aaa;text-transform:uppercase;letter-spacing:1px;">Véhicule demandé</p>
    <p style="margin:0;font-size:20px;font-weight:800;color:#CC0000;">${vehicule}</p>
  </div>

  <div style="background:#f8f9fa;border-radius:12px;padding:18px 20px;margin-bottom:20px;">
    <p style="margin:0 0 12px;font-size:11px;color:#aaa;text-transform:uppercase;letter-spacing:1px;">Informations client</p>
    <table style="width:100%;border-collapse:collapse;">
      <tr>
        <td style="padding:7px 0;border-bottom:1px solid #eee;color:#888;font-size:12px;width:40%;">Nom complet</td>
        <td style="padding:7px 0;border-bottom:1px solid #eee;font-weight:700;color:#111;">${prenom} ${nom}</td>
      </tr>
      ${societe ? `
      <tr>
        <td style="padding:7px 0;border-bottom:1px solid #eee;color:#888;font-size:12px;">Société</td>
        <td style="padding:7px 0;border-bottom:1px solid #eee;font-weight:700;color:#111;">${societe}</td>
      </tr>` : ''}
      <tr>
        <td style="padding:7px 0;border-bottom:1px solid #eee;color:#888;font-size:12px;">Téléphone</td>
        <td style="padding:7px 0;border-bottom:1px solid #eee;font-weight:700;">
          <a href="tel:${telephone}" style="color:#CC0000;text-decoration:none;">${telephone}</a>
        </td>
      </tr>
      <tr>
        <td style="padding:7px 0;border-bottom:1px solid #eee;color:#888;font-size:12px;">Email</td>
        <td style="padding:7px 0;border-bottom:1px solid #eee;font-weight:700;">
          <a href="mailto:${email}" style="color:#1B2B6B;text-decoration:none;">${email}</a>
        </td>
      </tr>
      ${ville ? `
      <tr>
        <td style="padding:7px 0;color:#888;font-size:12px;">Ville</td>
        <td style="padding:7px 0;font-weight:700;color:#111;">${ville}</td>
      </tr>` : ''}
    </table>
  </div>

  ${message ? `
  <div style="background:#f0f4ff;border-radius:12px;padding:16px 18px;margin-bottom:20px;">
    <p style="margin:0 0 6px;font-size:11px;color:#aaa;text-transform:uppercase;letter-spacing:1px;">Message</p>
    <p style="margin:0;font-size:13px;color:#444;line-height:1.7;">${message}</p>
  </div>` : ''}

  <div style="margin-bottom:24px;">
    <a href="tel:${telephone}"
      style="display:inline-block;background:#CC0000;color:#fff;font-weight:700;font-size:13px;padding:11px 22px;border-radius:99px;text-decoration:none;margin-right:8px;">
      📞 Appeler ${prenom}
    </a>
    <a href="mailto:${email}"
      style="display:inline-block;background:#1B2B6B;color:#fff;font-weight:700;font-size:13px;padding:11px 22px;border-radius:99px;text-decoration:none;">
      ✉️ Répondre
    </a>
  </div>

  <div style="background:#fffbeb;border:1px solid #fde68a;border-radius:10px;padding:14px 16px;margin-bottom:24px;">
    <p style="margin:0;font-size:12px;color:#92400e;">
      🔔 <strong>Notification admin :</strong> Nouveau devis <strong>#${reference}</strong> enregistré.
      <a href="https://www.cadozaat.com/admin" style="color:#CC0000;">→ Voir dans l'admin</a>
    </p>
  </div>

  <div style="height:1px;background:#f0f0f0;margin-bottom:16px;"></div>
  <p style="color:#ccc;font-size:11px;text-align:center;margin:0;">
    CADOZAT — Concessionnaire officiel Isuzu & Karry au Maroc
  </p>
</div>`,
      }),
    })

    if (!resAdmin.ok) {
      const err = await resAdmin.json()
      console.error('[devis] Email admin error:', err)
    }

    // ── 6. Email client ──
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type':  'application/json',
      },
      body: JSON.stringify({
        from:    `CADOZAT <${FROM_EMAIL}>`,
        to:      [email],
        subject: `✅ Demande de devis reçue — ${vehicule} | CADOZAT`,
        html: `
<div style="font-family:Arial,sans-serif;max-width:580px;margin:0 auto;padding:32px;background:#fff;">
  <div style="height:3px;background:linear-gradient(90deg,#CC0000,#C9A84C,#1B2B6B);border-radius:99px;margin-bottom:28px;"></div>

  <div style="text-align:center;margin-bottom:28px;">
    <div style="width:56px;height:56px;background:#fff5f5;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;margin-bottom:12px;">
      <span style="font-size:24px;">✅</span>
    </div>
    <h2 style="color:#111;margin:0 0 6px;font-size:22px;">Demande bien reçue !</h2>
    <p style="color:#888;font-size:13px;margin:0;">Bonjour <strong>${prenom}</strong>, nous avons bien enregistré votre demande.</p>
  </div>

  <div style="background:#f8f9fa;border-radius:12px;padding:20px;margin-bottom:24px;">
    <p style="margin:0 0 12px;font-size:11px;color:#aaa;text-transform:uppercase;letter-spacing:1px;">Récapitulatif</p>
    <table style="width:100%;border-collapse:collapse;">
      <tr>
        <td style="padding:7px 0;border-bottom:1px solid #eee;font-size:12px;color:#888;">Référence</td>
        <td style="padding:7px 0;border-bottom:1px solid #eee;font-weight:800;color:#CC0000;text-align:right;">${reference}</td>
      </tr>
      <tr>
        <td style="padding:7px 0;border-bottom:1px solid #eee;font-size:12px;color:#888;">Véhicule</td>
        <td style="padding:7px 0;border-bottom:1px solid #eee;font-weight:700;text-align:right;">${vehicule}</td>
      </tr>
      <tr>
        <td style="padding:7px 0;border-bottom:1px solid #eee;font-size:12px;color:#888;">Nom</td>
        <td style="padding:7px 0;border-bottom:1px solid #eee;font-weight:700;text-align:right;">${prenom} ${nom}</td>
      </tr>
      <tr>
        <td style="padding:7px 0;font-size:12px;color:#888;">Téléphone</td>
        <td style="padding:7px 0;font-weight:700;text-align:right;">${telephone}</td>
      </tr>
    </table>
  </div>

  <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:10px;padding:14px 16px;margin-bottom:24px;">
    <p style="margin:0;font-size:13px;color:#166534;line-height:1.6;">
      Notre équipe commerciale va vous contacter dans les <strong>24 heures</strong> pour vous proposer la meilleure offre.
    </p>
  </div>

  <div style="text-align:center;margin-bottom:24px;">
    <a href="tel:0524885025"
      style="display:inline-block;background:#CC0000;color:#fff;font-weight:700;font-size:14px;padding:13px 30px;border-radius:99px;text-decoration:none;">
      📞 Nous appeler — 0524 885 025
    </a>
    <p style="color:#aaa;font-size:11px;margin-top:10px;">Lun–Ven 8h–18h · Sam 8h–12h</p>
  </div>

  <div style="height:1px;background:#f0f0f0;margin-bottom:16px;"></div>
  <p style="color:#ccc;font-size:11px;text-align:center;margin:0;">
    CADOZAT — Concessionnaire officiel Isuzu & Karry · Ouarzazate · Agadir · Tinghir
  </p>
</div>`,
      }),
    })

    return NextResponse.json({ success: true, id: devis.id, reference })

  } catch (error) {
    console.error('[devis] ❌ Erreur:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Erreur serveur' },
      { status: 500 }
    )
  }
}