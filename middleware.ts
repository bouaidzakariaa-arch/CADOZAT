// middleware.ts
import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Protéger toutes les routes /admin sauf /admin/login
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    const token     = request.cookies.get('admin-token')?.value
    const JWT_SECRET = process.env.JWT_SECRET

    if (!token || !JWT_SECRET) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }

    try {
      // Vérifier le JWT avec jose (compatible Edge Runtime)
      await jwtVerify(token, new TextEncoder().encode(JWT_SECRET))
      return NextResponse.next()
    } catch {
      // Token invalide ou expiré
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}