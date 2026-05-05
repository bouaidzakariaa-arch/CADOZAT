import { Geist } from 'next/font/google'
import './globals.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SocialButtons from './components/WhatsAppButton'
import type { Metadata } from 'next'
import { GoogleAnalytics } from '@next/third-parties/google'

const geist = Geist({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'CADOZAT — Concessionnaire Isuzu & Karry au Maroc',
    template: '%s | CADOZAT',
  },
  description: 'Concessionnaire officiel Isuzu et Karry au Maroc. Pick-ups D-MAX, camions Série N & F, fourgons Karry. 3 agences : Ouarzazate, Agadir, Tinghir.',
  keywords: [
    'concessionnaire isuzu maroc',
    'camion isuzu maroc',
    'karry maroc',
    'cadozat ouarzazate',
    'isuzu dmax maroc',
    'camion utilitaire maroc',
    'pick-up isuzu maroc',
    'concessionnaire camion agadir',
    'camion tinghir',
  ],
  metadataBase: new URL('https://www.cadozaat.com'),
  openGraph: {
    type: 'website',
    locale: 'fr_MA',
    url: 'https://www.cadozaat.com',
    siteName: 'CADOZAT',
    title: 'CADOZAT — Concessionnaire Isuzu & Karry au Maroc',
    description: 'Concessionnaire officiel Isuzu et Karry. Pick-ups, camions et fourgons. 3 agences au Maroc.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <meta name="google-site-verification" content="LfJZbC_Y9f1LNwNL1iIRnn1c29bXb9_L2BUF3LelxrY" />
      </head>
      <body className={geist.className}>
        <Navbar />
        <main className="pt-[112px]">
          {children}
        </main>
        <Footer />
        <SocialButtons />
        <GoogleAnalytics gaId="G-05SWRNEP5Z" />
      </body>
    </html>
  )
}