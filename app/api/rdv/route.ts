// app/api/rdv/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { Resend } from 'resend'

const prisma = new PrismaClient()
const resend = new Resend(process.env.RESEND_API_KEY)

const MARQUES: Record<string, string> = {
  isuzu: 'Isuzu', karry: 'Karry', greatwall: 'Great Wall',
}
const TYPES: Record<string, string> = {
  revision:    'Révision / Entretien',
  reparation:  'Réparation / Panne',
  garantie:    'Intervention sous garantie',
  diagnostic:  'Diagnostic électronique (TOPAZE)',
  pieces:      'Commande pièces de rechange',
  mobile:      'Intervention atelier mobile',
  autre:       'Autre',
}
const ATELIERS: Record<string, string> = {
  ouarzazate: 'Ouarzazate',
  agadir:     'Agadir',
  tinghir:    'Tinghir',
  mobile:     'Intervention mobile (sur site)',
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { nom, tel, marque, vehicule, type, atelier, message, localisation } = body

    if (!nom || !tel) {
      return NextResponse.json({ error: 'Nom et téléphone requis' }, { status: 400 })
    }

    /* ── Détecter si c'est une intervention mobile ── */
    const isMobile = atelier === 'mobile' || type === 'mobile'

    /* ════════════════════════════════════
       1. SAUVEGARDE EN BASE DE DONNÉES
       ════════════════════════════════════ */
    const demande = await prisma.demandeRDV.create({
      data: {
        nom,
        telephone: tel,
        marque:    marque    || 'isuzu',
        vehicule:  vehicule  || null,
        type:      type      || 'revision',
        atelier:   atelier   || 'ouarzazate',
        message:   isMobile && localisation
          ? `${message || ''}\n📍 Localisation : ${localisation}`.trim()
          : message || null,
      },
    })

    /* ════════════════════════════════════
       2. EMAIL À L'ÉQUIPE SAV CADOZAT
       ════════════════════════════════════ */

    /* ── Sujet dynamique selon le type ── */
    const sujet = isMobile
      ? `🚐 Nouveau RDV Atelier Mobile — ${MARQUES[marque] || marque} — ${nom}`
      : `🔧 Nouveau RDV SAV — ${MARQUES[marque] || marque} — ${nom}`

    /* ── Couleur thème selon type ── */
    const themeColor = isMobile ? '#2D6A4F' : '#CC0000'
    const themeDark  = isMobile ? '#1a3d2b' : '#990000'
    const typeLabel  = isMobile ? '🚐 Atelier Mobile' : '🔧 SAV Atelier Fixe'

    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to:   ['tok940642@gmail.com'],
      subject: sujet,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">

          <!-- Header -->
          <div style="background:linear-gradient(135deg,${themeColor},${themeDark});padding:24px 32px;border-radius:12px 12px 0 0;">
            <h1 style="color:white;margin:0;font-size:20px;">${sujet}</h1>
            <p style="color:rgba(255,255,255,.8);margin:6px 0 0;font-size:14px;">
              Reçue le ${new Date().toLocaleDateString('fr-MA', { weekday:'long', year:'numeric', month:'long', day:'numeric' })}
              à ${new Date().toLocaleTimeString('fr-MA', { hour:'2-digit', minute:'2-digit' })}
            </p>
            <span style="display:inline-block;margin-top:10px;padding:4px 12px;background:rgba(255,255,255,.2);border-radius:20px;font-size:12px;font-weight:bold;color:white;">
              ${typeLabel}
            </span>
          </div>

          <!-- Corps -->
          <div style="background:#f9f9f9;padding:32px;border:1px solid #e5e5e5;border-top:none;">

            <!-- Infos client -->
            <h2 style="color:${themeColor};font-size:14px;text-transform:uppercase;letter-spacing:.1em;margin:0 0 16px;">👤 Client</h2>
            <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
              <tr>
                <td style="padding:8px 12px;background:white;border:1px solid #e5e5e5;font-weight:bold;width:40%;color:#555;font-size:13px;">Nom</td>
                <td style="padding:8px 12px;background:white;border:1px solid #e5e5e5;font-size:13px;">${nom}</td>
              </tr>
              <tr>
                <td style="padding:8px 12px;background:#fafafa;border:1px solid #e5e5e5;font-weight:bold;color:#555;font-size:13px;">Téléphone</td>
                <td style="padding:8px 12px;background:#fafafa;border:1px solid #e5e5e5;font-size:13px;">
                  <a href="tel:${tel}" style="color:${themeColor};font-weight:bold;">${tel}</a>
                </td>
              </tr>
            </table>

            <!-- Véhicule -->
            <h2 style="color:${themeColor};font-size:14px;text-transform:uppercase;letter-spacing:.1em;margin:0 0 16px;">🚛 Véhicule</h2>
            <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
              <tr>
                <td style="padding:8px 12px;background:white;border:1px solid #e5e5e5;font-weight:bold;width:40%;color:#555;font-size:13px;">Marque</td>
                <td style="padding:8px 12px;background:white;border:1px solid #e5e5e5;font-size:13px;">${MARQUES[marque] || marque}</td>
              </tr>
              <tr>
                <td style="padding:8px 12px;background:#fafafa;border:1px solid #e5e5e5;font-weight:bold;color:#555;font-size:13px;">Modèle / Immat.</td>
                <td style="padding:8px 12px;background:#fafafa;border:1px solid #e5e5e5;font-size:13px;">${vehicule || '—'}</td>
              </tr>
            </table>

            <!-- Intervention -->
            <h2 style="color:${themeColor};font-size:14px;text-transform:uppercase;letter-spacing:.1em;margin:0 0 16px;">🔩 Intervention</h2>
            <table style="width:100%;border-collapse:collapse;margin-bottom:${isMobile ? '0' : '24px'};">
              <tr>
                <td style="padding:8px 12px;background:white;border:1px solid #e5e5e5;font-weight:bold;width:40%;color:#555;font-size:13px;">Type</td>
                <td style="padding:8px 12px;background:white;border:1px solid #e5e5e5;font-size:13px;">${TYPES[type] || type}</td>
              </tr>
              <tr>
                <td style="padding:8px 12px;background:#fafafa;border:1px solid #e5e5e5;font-weight:bold;color:#555;font-size:13px;">Atelier</td>
                <td style="padding:8px 12px;background:#fafafa;border:1px solid #e5e5e5;font-size:13px;">${ATELIERS[atelier] || atelier}</td>
              </tr>
              ${message ? `
              <tr>
                <td style="padding:8px 12px;background:white;border:1px solid #e5e5e5;font-weight:bold;color:#555;font-size:13px;vertical-align:top;">Description</td>
                <td style="padding:8px 12px;background:white;border:1px solid #e5e5e5;font-size:13px;">${message}</td>
              </tr>` : ''}
            </table>

            ${isMobile && localisation ? `
            <!-- Localisation mobile — bloc spécial -->
            <div style="margin-top:20px;padding:16px 20px;background:#f0faf5;border:2px solid #2D6A4F;border-radius:10px;">
              <h2 style="color:#2D6A4F;font-size:14px;text-transform:uppercase;letter-spacing:.1em;margin:0 0 10px;">📍 Localisation d'intervention</h2>
              <p style="font-size:15px;font-weight:bold;color:#1a3d2b;margin:0;">${localisation}</p>
              <p style="font-size:12px;color:#2D6A4F;margin:6px 0 0;">→ L'atelier mobile Dacia Dokker (74443-13) sera envoyé à cette adresse.</p>
            </div>` : ''}

            <!-- CTA admin -->
            <div style="text-align:center;margin-top:24px;">
              <a href="${process.env.NEXT_PUBLIC_SITE_URL}/admin/rdv"
                style="display:inline-block;background:linear-gradient(135deg,${themeColor},${themeDark});color:white;padding:12px 28px;border-radius:8px;text-decoration:none;font-weight:bold;font-size:14px;">
                Voir dans le tableau admin →
              </a>
            </div>
          </div>

          <!-- Footer -->
          <div style="background:#1a1a1a;padding:16px 32px;border-radius:0 0 12px 12px;text-align:center;">
            <p style="color:rgba(255,255,255,.5);font-size:12px;margin:0;">
              CADOZAT — Concessionnaire Isuzu · Karry · Great Wall — Ouarzazate · Agadir · Tinghir
            </p>
          </div>

        </div>
      `,
    })

    return NextResponse.json({ success: true, id: demande.id }, { status: 201 })

  } catch (error) {
    console.error('[RDV API Error]', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

/* ── GET : liste des demandes pour l'admin ── */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const statut  = searchParams.get('statut')
    const atelier = searchParams.get('atelier')
    const page    = parseInt(searchParams.get('page') || '1')
    const limit   = 20

    const where: Record<string, unknown> = {}
    if (statut)  where.statut  = statut
    if (atelier) where.atelier = atelier

    const [demandes, total] = await Promise.all([
      prisma.demandeRDV.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip:  (page - 1) * limit,
        take:  limit,
      }),
      prisma.demandeRDV.count({ where }),
    ])

    return NextResponse.json({ demandes, total, page, pages: Math.ceil(total / limit) })
  } catch (error) {
    console.error('[RDV GET Error]', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}