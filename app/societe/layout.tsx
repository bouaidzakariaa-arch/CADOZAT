import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Notre société — Concessionnaire Isuzu & Karry depuis 1996',
  description: 'Fondée en 1996 à Ouarzazate, CADOZAT est concessionnaire officiel Isuzu et Karry au Sud du Maroc. 3 agences : Ouarzazate, Agadir, Tinghir. 28 ans d\'expérience.',
  keywords: ['cadozat société', 'concessionnaire isuzu ouarzazate', 'cadozat sarl', 'isuzu maroc agence'],
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}