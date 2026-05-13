import { Geist } from 'next/font/google'
import './globals.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import ChatBot from './components/ChatBot'
import type { Metadata } from 'next'
import { GoogleAnalytics } from '@next/third-parties/google'
import { headers } from 'next/headers'

const geist = Geist({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://www.cadozaat.com'),
  title: {
    default: 'CADOZAT — Concessionnaire Isuzu & Karry au Maroc',
    template: '%s | CADOZAT',
  },
  description: 'Concessionnaire officiel Isuzu et Karry au Maroc. Pick-ups D-MAX, camions Série N & F, fourgons Karry. 3 agences : Ouarzazate, Agadir, Tinghir.',
  keywords: ['concessionnaire isuzu maroc','camion isuzu maroc','karry maroc','cadozat ouarzazate','isuzu dmax maroc','camion utilitaire maroc','pick-up isuzu maroc','concessionnaire camion agadir','camion tinghir'],
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'fr_MA',
    url: 'https://www.cadozaat.com',
    siteName: 'CADOZAT',
    title: 'CADOZAT — Concessionnaire Isuzu & Karry au Maroc',
    description: 'Concessionnaire officiel Isuzu et Karry. Pick-ups, camions et fourgons. 3 agences au Maroc.',
  },
  robots: { index: true, follow: true },
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const headersList = await headers()
  const pathname = headersList.get('x-invoke-path') || headersList.get('x-pathname') || ''
  const isAdmin = pathname.startsWith('/admin')

  return (
    <html lang="fr">
      <head>
        <meta name="google-site-verification" content="LfJZbC_Y9f1LNwNL1iIRnn1c29bXb9_L2BUF3LelxrY" />
      </head>
      <body className={geist.className}>
        {!isAdmin && <Navbar />}
        <main className={!isAdmin ? 'pt-[112px]' : ''}>
          {children}
        </main>
        {!isAdmin && <Footer />}
        {!isAdmin && <WhatsAppButton />}
        {!isAdmin && <ChatBot />}
        <GoogleAnalytics gaId="G-05SWRNEP5Z" />
      </body>
    </html>
  )
}