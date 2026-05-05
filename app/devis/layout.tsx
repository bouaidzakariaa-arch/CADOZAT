import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Demande de devis — Pick-up, Camions & Fourgons',
  description: 'Demandez un devis pour votre véhicule Isuzu ou Karry. D-MAX, Série N, Série F, fourgons Karry. Notre équipe vous répond rapidement.',
  keywords: ['devis isuzu maroc', 'devis camion maroc', 'prix isuzu dmax maroc', 'acheter camion maroc'],
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}