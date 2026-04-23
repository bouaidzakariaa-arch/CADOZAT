// middleware.ts
import { NextRequest, NextResponse } from 'next/server'

const SECRET_KEY = 'cadozat-secret-key-2024'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Protéger toutes les routes /admin sauf /admin/login
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    const token = request.cookies.get('admin-token')?.value

    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }

    try {
      const payload = JSON.parse(Buffer.from(token, 'base64').toString())
      // Vérifier la clé et l'expiration
      if (payload.key !== SECRET_KEY || payload.exp < Date.now()) {
        return NextResponse.redirect(new URL('/admin/login', request.url))
      }
    } catch {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}