// app/api/auth/login/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

// ✅ Identifiants admin — changez ces valeurs !
const ADMIN_EMAIL    = 'admin@cadozat.com'
const ADMIN_PASSWORD = 'Cadozat@2024!'
const SECRET_KEY     = 'cadozat-secret-key-2024'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // Vérifier email ET mot de passe
    if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Email ou mot de passe incorrect' }, { status: 401 })
    }

    // Créer un token valable 30 jours
    const payload = {
      key:   SECRET_KEY,
      email: ADMIN_EMAIL,
      exp:   Date.now() + 30 * 24 * 60 * 60 * 1000,
    }
    const token = Buffer.from(JSON.stringify(payload)).toString('base64')

    const cookieStore = await cookies()
    cookieStore.set('admin-token', token, {
      httpOnly: true,
      secure:   process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge:   30 * 24 * 60 * 60,
      path:     '/',
    })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}