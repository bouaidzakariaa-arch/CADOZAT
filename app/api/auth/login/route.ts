import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

const PASSWORD = 'cadozat2024'
const SECRET_KEY = 'cadozat-secret-key-2024'

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json()

    if (password !== PASSWORD) {
      return NextResponse.json({ error: 'Mot de passe incorrect' }, { status: 401 })
    }

    // Créer un token valable 30 jours
    const payload = {
      key: SECRET_KEY,
      exp: Date.now() + 30 * 24 * 60 * 60 * 1000, // 30 jours
    }
    const token = Buffer.from(JSON.stringify(payload)).toString('base64')

    const cookieStore = await cookies()
    cookieStore.set('admin-token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60, // 30 jours
      path: '/',
    })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}