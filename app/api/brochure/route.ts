// app/api/brochure/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { Resend } from 'resend'

const prisma = new PrismaClient()

const MARQUES: Record<string, { label: string; color: string }> = {
  isuzu:     { label: 'Isuzu',      color: '#CC0000' },
  karry:     { label: 'Karry',      color: '#0057A8' },
  greatwall: { label: 'Great Wall', color: '#4A4A4A' },
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { nom, prenom, email, telephone, societe, modele, marque, brochure } = body

    if (!nom || !prenom || !email || !modele) {
      return NextResponse.json({ error: 'Champs requis manquants' }, { status: 400 })
    }

    // Initialisation Resend ici — pas au niveau du module
    const resend = new Resend(process.env.RESEND_API_KEY)

    const lead = await prisma.leadBrochure.create({
      data: {
        nom,
        prenom,
        email,
        telephone: telephone || null,
        societe:   societe   || null,
        modele,
        marque:    marque    || 'isuzu',
        brochure:  brochure  || `/brochures/${modele}.pdf`,
      },
    })

    const m = MARQUES[marque] || { label: marque, color: '#CC0000' }

    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to:   ['tok940642@gmail.com'],
      subject: `📄 Brochure téléchargée — ${modele.toUpperCase()} — ${prenom} ${nom}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
          <div style="background:linear-gradient(135deg,${m.color},${m.color}cc);padding:24px 32px;border-radius:12px 12px 0 0;">
            <h1 style="color:white;margin:0;font-size:20px;">📄 Nouvelle demande de brochure</h1>
            <p style="color:rgba(255,255,255,.8);margin:6px 0 0;font-size:14px;">
              ${new Date().toLocaleDateString('fr-MA', { weekday:'long', year:'numeric', month:'long', day:'numeric' })}
              à ${new Date().toLocaleTimeString('fr-MA', { hour:'2-digit', minute:'2-digit' })}
            </p>
          </div>
          <div style="background:#f9f9f9;padding:32px;border:1px solid #e5e5e5;border-top:none;">
            <h2 style="color:${m.color};font-size:14px;text-transform:uppercase;letter-spacing:.1em;margin:0 0 16px;">👤 Contact</h2>
            <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
              <tr>
                <td style="padding:8px 12px;background:white;border:1px solid #e5e5e5;font-weight:bold;width:40%;color:#555;font-size:13px;">Nom complet</td>
                <td style="padding:8px 12px;background:white;border:1px solid #e5e5e5;font-size:13px;font-weight:bold;">${prenom} ${nom}</td>
              </tr>
              <tr>
                <td style="padding:8px 12px;background:#fafafa;border:1px solid #e5e5e5;font-weight:bold;color:#555;font-size:13px;">Email</td>
                <td style="padding:8px 12px;background:#fafafa;border:1px solid #e5e5e5;font-size:13px;">
                  <a href="mailto:${email}" style="color:${m.color};font-weight:bold;">${email}</a>
                </td>
              </tr>
              ${telephone ? `
              <tr>
                <td style="padding:8px 12px;background:white;border:1px solid #e5e5e5;font-weight:bold;color:#555;font-size:13px;">Téléphone</td>
                <td style="padding:8px 12px;background:white;border:1px solid #e5e5e5;font-size:13px;">
                  <a href="tel:${telephone}" style="color:${m.color};font-weight:bold;">${telephone}</a>
                </td>
              </tr>` : ''}
              ${societe ? `
              <tr>
                <td style="padding:8px 12px;background:#fafafa;border:1px solid #e5e5e5;font-weight:bold;color:#555;font-size:13px;">Société</td>
                <td style="padding:8px 12px;background:#fafafa;border:1px solid #e5e5e5;font-size:13px;">${societe}</td>
              </tr>` : ''}
            </table>
            <h2 style="color:${m.color};font-size:14px;text-transform:uppercase;letter-spacing:.1em;margin:0 0 16px;">📋 Brochure téléchargée</h2>
            <div style="padding:16px 20px;background:white;border:2px solid ${m.color}33;border-radius:10px;margin-bottom:24px;">
              <p style="margin:0;font-size:15px;font-weight:bold;color:#1a1a1a;">
                ${m.label} — ${modele.toUpperCase().replace(/-/g, ' ')}
              </p>
              <p style="margin:6px 0 0;font-size:13px;color:#666;">Fichier : /brochures/${modele}.pdf</p>
            </div>
          </div>
          <div style="background:#1a1a1a;padding:16px 32px;border-radius:0 0 12px 12px;text-align:center;">
            <p style="color:rgba(255,255,255,.5);font-size:12px;margin:0;">
              CADOZAT — Concessionnaire Isuzu · Karry
            </p>
          </div>
        </div>
      `,
    })

    return NextResponse.json({ success: true, id: lead.id }, { status: 201 })

  } catch (error) {
    console.error('[Brochure API Error]', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const marque = searchParams.get('marque')
    const page   = parseInt(searchParams.get('page') || '1')
    const limit  = 20

    const where: Record<string, unknown> = {}
    if (marque) where.marque = marque

    const [leads, total] = await Promise.all([
      prisma.leadBrochure.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.leadBrochure.count({ where }),
    ])

    return NextResponse.json({ leads, total, page, pages: Math.ceil(total / limit) })
  } catch (error) {
    console.error('[Brochure GET Error]', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}