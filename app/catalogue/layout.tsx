import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Catalogue — Pick-ups, Camions & Fourgons Isuzu Karry',
  description: 'Découvrez toute la gamme CADOZAT : pick-up D-MAX, camions Série N (3.5T à 9.5T), Série F (16T-18T) et fourgons Karry. Disponibles dans nos agences au Maroc.',
  keywords: ['catalogue isuzu maroc', 'gamme isuzu maroc', 'camion isuzu prix maroc'],
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}