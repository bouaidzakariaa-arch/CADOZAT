import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Références clients — Coca-Cola, COPAG, HDS et plus',
  description: 'CADOZAT accompagne les plus grands comptes du Sud Marocain : Coca-Cola, COPAG, HDS, Soussia des Gaz. Flottes Isuzu & Karry pour industrie et distribution.',
  keywords: ['références cadozat', 'clients isuzu maroc', 'flotte isuzu maroc', 'camion entreprise maroc'],
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}