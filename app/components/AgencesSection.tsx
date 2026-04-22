'use client'

import { useState } from 'react'

const agences = [
  {
    ville: 'Ouarzazate',
    badge: 'Siège principal',
    badgeColor: 'bg-[#f5a623]',
    adresse: '189, Bd Maghreb Arabi, Ouarzazate',
    tel: '05 24 88 50 25',
    telHref: 'tel:0524885025',
    mapsUrl: 'https://maps.google.com/?q=30.929241,-6.904725',
    images: [
      '/images/ouarzazate/img1.jpg',
      '/images/ouarzazate/img2.jpg',
      '/images/ouarzazate/img3.jpg',
      '/images/ouarzazate/img4.jpg',
    ],
  },
  {
    ville: 'Agadir',
    badge: 'Agence Agadir',
    badgeColor: 'bg-[#1a5c2e]',
    adresse: ', 18 bab al madina tilila Agadir',
    tel: '06 62 12 40 44',
    telHref: 'tel:',
    mapsUrl: 'https://maps.google.com/?q=30.39542, -9.52030',
    images: [
      '/images/agadir/img1.jpg',
      '/images/agadir/img2.jpg',
      '/images/agadir/img3.jpg',
      '/images/agadir/img4.jpg',
    ],
  },
  {
    ville: 'Tinghir',
    badge: 'Agence Tinghir',
    badgeColor: 'bg-[#1a5c2e]',
    adresse: 'Adresse 2, Tinghir',
    tel: '06 62 12 40 44',
    telHref: 'tel:0666666666',
    mapsUrl: 'https://maps.google.com/?q=30.929241,-6.904725',
    images: [
      '/images/tinghir/img1.jpg',
      '/images/tinghir/img2.jpg',
      '/images/tinghir/img3.jpg',
      '/images/tinghir/img4.jpg',
    ],
  },
]

type Agence = typeof agences[0]

function AgenceCard({ agence }: { agence: Agence }) {
  const [current, setCurrent] = useState(0)

  const prev = () => setCurrent((c) => (c === 0 ? agence.images.length - 1 : c - 1))
  const next = () => setCurrent((c) => (c === agence.images.length - 1 ? 0 : c + 1))

  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group">

      {/* Slider images */}
      <div className="relative h-56 overflow-hidden bg-gray-200">
        <img
          src={agence.images[current]}
          alt={`CADOZAT ${agence.ville}`}
          className="w-full h-full object-cover transition-all duration-500"
        />

        {/* Overlay dégradé */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

        {/* Badge */}
        <div className="absolute top-4 left-4">
          <span className={`${agence.badgeColor} text-white text-xs font-bold px-3 py-1.5 rounded-full shadow`}>
            {agence.badge}
          </span>
        </div>

        {/* Nom ville */}
        <div className="absolute bottom-10 left-4">
          <h3 className="text-white font-black text-xl drop-shadow">
            CADOZAT {agence.ville}
          </h3>
        </div>

        {/* Bouton précédent */}
        <button
          onClick={prev}
          className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center transition-all shadow-md"
        >
          <svg className="w-4 h-4 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7"/>
          </svg>
        </button>

        {/* Bouton suivant */}
        <button
          onClick={next}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center transition-all shadow-md"
        >
          <svg className="w-4 h-4 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7"/>
          </svg>
        </button>

        {/* Points navigation */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
          {agence.images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`rounded-full transition-all duration-300 ${
                i === current ? 'w-5 h-2 bg-white' : 'w-2 h-2 bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>

        {/* Compteur */}
        <div className="absolute bottom-3 right-4 text-white/80 text-xs font-medium">
          {current + 1} / {agence.images.length}
        </div>
      </div>

      {/* Infos agence */}
      <div className="p-6">
        <p className="text-gray-400 text-sm mb-4 flex items-center gap-1.5">
          <svg className="w-4 h-4 text-[#f5a623] shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
          </svg>
          {agence.adresse}
        </p>

        <div className="flex items-center gap-3 flex-wrap">
          <a
            href={agence.telHref}
            className="flex items-center gap-2 bg-[#1a5c2e] hover:bg-[#154d26] text-white text-sm font-bold px-4 py-2.5 rounded-full transition-all"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
            </svg>
            {agence.tel}
          </a>
          <a
            href={agence.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 border-2 border-[#1a5c2e] text-[#1a5c2e] hover:bg-[#1a5c2e] hover:text-white text-sm font-bold px-4 py-2.5 rounded-full transition-all"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
            </svg>
            Google Maps
          </a>
        </div>
      </div>
    </div>
  )
}

export default function AgencesSection() {
  return (
    <section className="py-20 bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-[#f5a623] font-bold text-sm uppercase tracking-widest">
            Proximité & service
          </span>
          <h2 className="text-4xl font-black text-gray-900 mt-3 mb-4">
            3 agences à votre service
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            CADOZAT est présent à Ouarzazate, Agadir et Tinghir.
            mêmes produits Isuzu, même qualité de service — partout.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {agences.map((agence) => (
            <AgenceCard key={agence.ville} agence={agence} />
          ))}
        </div>
      </div>
    </section>
  )
}