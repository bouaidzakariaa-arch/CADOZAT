// app/api/auth/login/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    const ADMIN_EMAIL    = process.env.ADMIN_EMAIL
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD
    const JWT_SECRET     = process.env.JWT_SECRET

    if (!ADMIN_EMAIL || !ADMIN_PASSWORD || !JWT_SECRET) {
      return NextResponse.json({ error: 'Configuration serveur manquante' }, { status: 500 })
    }

    // Vérification email + mot de passe
    if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
      // Délai pour éviter les attaques par timing
      await new Promise(r => setTimeout(r, 500))
      return NextResponse.json({ error: 'Email ou mot de passe incorrect' }, { status: 401 })
    }

    // Créer un JWT signé — expire dans 30 jours
    const token = jwt.sign(
      { email, role: 'admin' },
      JWT_SECRET,
      { expiresIn: '30d' }
    )

    // Stocker dans un cookie httpOnly sécurisé
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