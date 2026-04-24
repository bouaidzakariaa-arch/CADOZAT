'use client'

import { useState } from 'react'

const agences = [
  {
    ville: 'Ouarzazate',
    role: 'Siège principal',
    adresse: '189, Bd Maghreb Arabi, Ouarzazate',
    tel: '05 24 88 50 25',
    telHref: 'tel:0524885025',
    mapsUrl: 'https://maps.google.com/?q=30.929241,-6.904725',
    color: '#CC0000',
    icon: '🏢',
    images: [
      '/images/ouarzazate/img1.jpg',
      '/images/ouarzazate/img2.jpg',
      '/images/ouarzazate/img3.jpg',
      '/images/ouarzazate/img4.jpg',
    ],
  },
  {
    ville: 'Agadir',
    role: 'Agence régionale',
    adresse: '18 Bab Al Madina Tilila, Agadir',
    tel: '06 62 12 40 44',
    telHref: 'tel:0662124044',
    mapsUrl: 'https://maps.google.com/?q=30.39542,-9.52030',
    color: '#0057A8',
    icon: '🌊',
    images: [
      '/images/agadir/img1.jpg',
      '/images/agadir/img2.jpg',
      '/images/agadir/img3.jpg',
      '/images/agadir/img4.jpg',
    ],
  },
  {
    ville: 'Tinghir',
    role: 'Agence régionale',
    adresse: 'Avenue Mohammed V, Tinghir',
    tel: '06 62 12 40 44',
    telHref: 'tel:0662124044',
    mapsUrl: 'https://maps.google.com/?q=31.5134,-5.5342',
    color: '#2D6A4F',
    icon: '🏔️',
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
  const prev = () => setCurrent(c => c === 0 ? agence.images.length - 1 : c - 1)
  const next = () => setCurrent(c => c === agence.images.length - 1 ? 0 : c + 1)

  return (
    <div className="group flex flex-col">
      {/* Barre couleur */}
      <div className="h-1 rounded-t-3xl" style={{ background: agence.color }} />

      <div className="flex-1 border border-t-0 border-gray-100 rounded-b-3xl overflow-hidden hover:shadow-lg transition-all duration-300 bg-white">

        {/* Slider */}
        <div className="relative h-52 overflow-hidden bg-gray-100">
          <img
            src={agence.images[current]}
            alt={`CADOZAT ${agence.ville}`}
            className="w-full h-full object-cover transition-all duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

          {/* Navigation */}
          <button onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-7 h-7 bg-white/80 hover:bg-white rounded-full flex items-center justify-center transition-all shadow">
            <svg className="w-3.5 h-3.5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7"/>
            </svg>
          </button>
          <button onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7 bg-white/80 hover:bg-white rounded-full flex items-center justify-center transition-all shadow">
            <svg className="w-3.5 h-3.5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7"/>
            </svg>
          </button>

          {/* Dots */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {agence.images.map((_, i) => (
              <button key={i} onClick={() => setCurrent(i)}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === current ? '18px' : '6px',
                  height: '6px',
                  background: i === current ? 'white' : 'rgba(255,255,255,0.5)',
                }} />
            ))}
          </div>
        </div>

        {/* Infos */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="text-xs font-black uppercase tracking-widest mb-1" style={{ color: agence.color }}>
                {agence.role}
              </div>
              <h3 className="font-black text-gray-900 text-xl">CADOZAT {agence.ville}</h3>
            </div>
            <span className="text-2xl">{agence.icon}</span>
          </div>

          <div className="flex items-start gap-2 mb-6 text-gray-400 text-sm">
            <svg className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: agence.color }} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
            </svg>
            {agence.adresse}
          </div>

          <div className="flex gap-3">
            <a href={agence.telHref}
              className="flex-1 flex items-center justify-center gap-2 text-white text-sm font-bold py-2.5 rounded-xl transition-all hover:scale-105"
              style={{ background: agence.color }}>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
              </svg>
              {agence.tel}
            </a>
            <a href={agence.mapsUrl} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold border-2 transition-all hover:scale-105"
              style={{ borderColor: agence.color, color: agence.color }}>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
              </svg>
              Maps
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function AgencesSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: '#CC0000' }}>
            Présents partout pour vous servir
          </p>
          <h2 className="text-4xl font-black text-gray-900 mb-4">Nos 3 agences</h2>
          <div className="w-12 h-1 mx-auto rounded-full" style={{ background: 'linear-gradient(to right, #CC0000, #2D6A4F)' }} />
          <p className="text-gray-400 text-sm mt-6 max-w-md mx-auto">
            Même qualité, même service — Ouarzazate · Agadir · Tinghir
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {agences.map(agence => (
            <AgenceCard key={agence.ville} agence={agence} />
          ))}
        </div>
      </div>
    </section>
  )
}