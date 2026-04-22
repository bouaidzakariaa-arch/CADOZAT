import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { cookies } from 'next/headers'

const SECRET_KEY = 'cadozat-secret-key-2024'

function verifyToken(token: string): boolean {
  try {
    const payload = JSON.parse(Buffer.from(token, 'base64').toString())
    if (payload.key !== SECRET_KEY) return false
    if (payload.exp < Date.now()) return false
    return true
  } catch {
    return false
  }
}

async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies()
  const token = cookieStore.get('admin-token')?.value
  if (!token) return false
  return verifyToken(token)
}

export async function POST(request: NextRequest) {
  try {
    if (!(await isAuthenticated())) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }

    const formData = await request.formData()
    const toEmail = formData.get('email') as string
    const toName = formData.get('name') as string
    const vehicule = formData.get('vehicule') as string
    const message = formData.get('message') as string
    const file = formData.get('file') as File | null

    if (!toEmail || !toName) {
      return NextResponse.json({ error: 'Email ou nom manquant' }, { status: 400 })
    }

    // Config Gmail
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    })

    // Préparer les pièces jointes
    const attachments = []
    if (file && file.size > 0) {
      const buffer = Buffer.from(await file.arrayBuffer())
      attachments.push({
        filename: file.name,
        content: buffer,
      })
    }

    // Envoyer l'email
    await transporter.sendMail({
      from: `"CADOZAT" <${process.env.GMAIL_USER}>`,
      to: toEmail,
      subject: `Votre devis CADOZAT — ${vehicule}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #1B2B6B; padding: 30px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px;">CADOZAT</h1>
            <p style="color: rgba(255,255,255,0.6); margin: 5px 0 0;">Concessionnaire officiel Isuzu · Karry · Great Wall</p>
          </div>
          
          <div style="background: #CC0000; height: 4px;"></div>
          
          <div style="padding: 40px 30px; background: #ffffff;">
            <p style="color: #333; font-size: 16px;">Bonjour <strong>${toName}</strong>,</p>
            
            <p style="color: #555; line-height: 1.6;">
              Suite à votre demande de devis pour le véhicule <strong>${vehicule}</strong>, 
              veuillez trouver ci-joint votre devis personnalisé.
            </p>

            ${message ? `
            <div style="background: #f8f8f8; border-left: 4px solid #CC0000; padding: 15px 20px; margin: 20px 0; border-radius: 0 8px 8px 0;">
              <p style="color: #333; margin: 0; line-height: 1.6;">${message}</p>
            </div>
            ` : ''}

            <p style="color: #555; line-height: 1.6;">
              Pour toute question, n'hésitez pas à nous contacter :
            </p>
            
            <div style="background: #f8f8f8; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 5px 0; color: #333;">📞 <strong>0524 885 025</strong></p>
              <p style="margin: 5px 0; color: #333;">✉️ <strong>contact@cadozat.com</strong></p>
              <p style="margin: 5px 0; color: #333;">🕐 Lun - Sam : 8h00 - 18h00</p>
            </div>

            <p style="color: #555;">Cordialement,<br><strong>L'équipe commerciale CADOZAT</strong></p>
          </div>

          <div style="background: #1B2B6B; padding: 20px; text-align: center;">
            <p style="color: rgba(255,255,255,0.5); font-size: 12px; margin: 0;">
              CADOZAT — 189, Bd Maghreb Arabi, Ouarzazate · Agadir · Tinghir
            </p>
          </div>
        </div>
      `,
      attachments,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Erreur envoi email:', error)
    return NextResponse.json({ error: 'Erreur envoi email' }, { status: 500 })
  }
}