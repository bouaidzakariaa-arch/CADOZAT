import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Véhicules Marché Public — Bennes, Nacelles, Citernes',
  description: 'Véhicules spéciaux carrossés pour communes et collectivités : bennes tasseuses, nacelles élévatrices, citernes eau, camions frigorifiques. Homologués Maroc.',
  keywords: ['marché public camion maroc', 'benne tasseuse maroc', 'nacelle isuzu maroc', 'véhicule collectivité maroc', 'citerne eau maroc'],
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}