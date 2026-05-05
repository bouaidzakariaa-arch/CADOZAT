import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Service après-vente Isuzu & Karry — Atelier fixe & mobile',
  description: '8 techniciens certifiés, atelier fixe à Agadir et Ouarzazate + atelier mobile sur site. Pièces d\'origine, diagnostic TOPAZE. Ouvert 6j/7.',
  keywords: ['service après-vente isuzu maroc', 'atelier isuzu agadir', 'réparation camion maroc', 'pièces isuzu maroc'],
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}