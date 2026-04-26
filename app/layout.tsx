import { Geist } from 'next/font/google'
import './globals.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: 'CADOZAT — Concessionnaire Isuzu & Karry au Maroc',
    template: '%s | CADOZAT',
  },
  description: 'Concessionnaire officiel Isuzu et Karry au Maroc. Pick-ups D-MAX, camions Série N & F, fourgons Karry. 3 agences : Ouarzazate, Agadir, Tinghir.',
  keywords: ['concessionnaire isuzu maroc', 'camion isuzu maroc', 'karry maroc', 'cadozat ouarzazate'],
  metadataBase: new URL('https://cadozat.com'),
}

const geist = Geist({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={geist.className}>
        <Navbar />
        <main className="pt-[112px]">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}