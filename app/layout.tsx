import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

const geist = Geist({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CADOZAT — Concessionnaire Isuzu Maroc',
  description: 'Concessionnaire officiel Isuzu au Maroc. Véhicules utilitaires et équipements industriels à Agadir, Ouarzazate, Marrakech.',
}

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