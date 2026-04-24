'use client'

import Link from 'next/link'
import Image from 'next/image'

const agences = [
  {
    ville: 'Ouarzazate',
    role: 'Siège principal',
    adresse: '189, Bd Maghreb Arabi, Ouarzazate',
    tel: '0524 885 025',
    telHref: 'tel:0524885025',
    mapsUrl: 'https://maps.google.com/?q=30.929241,-6.904725',
    color: '#CC0000',
    icon: '🏢',
  },
  {
    ville: 'Agadir',
    role: 'Agence régionale',
    adresse: '18 Bab Al Madina Tilila, Agadir',
    tel: '0524 890 930',
    telHref: 'tel:0524890930',
    mapsUrl: 'https://maps.google.com/?q=30.39542,-9.52030',
    color: '#0057A8',
    icon: '🌊',
  },
  {
    ville: 'Tinghir',
    role: 'Agence régionale',
    adresse: 'Avenue Mohammed V, Tinghir',
    tel: '0524 890 930',
    telHref: 'tel:0524890930',
    mapsUrl: 'https://maps.google.com/?q=31.5134,-5.5342',
    color: '#2D6A4F',
    icon: '🌿',
  },
]

const catalogueLinks = [
  { nom: 'Pick-up Isuzu D-MAX', href: '/catalogue/dmax-tfr' },
  { nom: 'Camions porteurs', href: '/catalogue/camions' },
  { nom: 'Nettoyage & Voirie', href: '/catalogue/nettoyage' },
  { nom: 'Conteneurisation', href: '/catalogue/conteneurisation' },
  { nom: 'Camions citernes', href: '/catalogue/citerne' },
  { nom: 'Véhicules frigorifiques', href: '/catalogue/frigorifique' },
  { nom: 'Pièces détachées', href: '/catalogue/pieces' },
  { nom: 'Karry Q22B', href: '/catalogue/karry-22b' },
  { nom: 'Karry Q22Q', href: '/catalogue/karry-22q' },
]

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100">

      {/* ══ SECTION AGENCES — design ouvert ══ */}
      <div className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">

          {/* Header */}
          <div className="text-center mb-14">
            <p className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: '#CC0000' }}>
              Présents partout pour vous servir
            </p>
            <h2 className="text-3xl font-black text-gray-900 mb-4">Nos 3 agences</h2>
            <div className="w-12 h-1 mx-auto rounded-full" style={{ background: 'linear-gradient(to right, #CC0000, #2D6A4F)' }} />
            <p className="text-gray-400 text-sm mt-5">Même qualité, même service — Ouarzazate · Agadir · Tinghir</p>
          </div>

          {/* Cards agences */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {agences.map(a => (
              <div key={a.ville} className="group flex flex-col">
                <div className="h-1 rounded-t-2xl" style={{ background: a.color }} />
                <div className="flex-1 border border-t-0 border-gray-100 rounded-b-2xl p-6 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="text-xs font-black uppercase tracking-widest mb-1" style={{ color: a.color }}>{a.role}</div>
                      <h3 className="font-black text-gray-900 text-lg">CADOZAT {a.ville}</h3>
                    </div>
                    <span className="text-2xl">{a.icon}</span>
                  </div>
                  <div className="flex items-start gap-2 mb-5 text-gray-400 text-sm">
                    <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" style={{ color: a.color }}>
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                    </svg>
                    {a.adresse}
                  </div>
                  <div className="flex gap-2">
                    <a href={a.telHref}
                      className="flex-1 flex items-center justify-center gap-2 text-white text-sm font-bold py-2.5 rounded-xl transition-all hover:scale-105"
                      style={{ background: a.color }}>
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                      </svg>
                      {a.tel}
                    </a>
                    <a href={a.mapsUrl} target="_blank" rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1 px-4 py-2.5 rounded-xl text-sm font-bold border-2 transition-all hover:scale-105"
                      style={{ borderColor: a.color, color: a.color }}>
                      Maps
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Séparateur ── */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="h-px bg-gray-100" />
      </div>

      {/* ══ FOOTER PRINCIPAL ══ */}
      <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Logo & description */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="relative w-12 h-12 flex-shrink-0 bg-white rounded-xl shadow border border-gray-100">
              <Image src="/images/logo.png" alt="CADOZAT" fill className="object-contain p-1" sizes="48px" />
            </div>
            <div>
              <div className="font-black text-xl text-gray-900 leading-none">CADOZAT</div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="font-black text-[10px] tracking-widest" style={{ color: '#CC0000' }}>ISUZU</span>
                <span className="text-gray-300 text-[10px]">·</span>
                <span className="font-black text-[10px] tracking-widest" style={{ color: '#0057A8' }}>KARRY</span>
              </div>
            </div>
          </div>
          <div className="w-12 h-1 rounded-full mb-4" style={{ background: 'linear-gradient(to right, #CC0000, #2D6A4F)' }} />
          <p className="text-sm leading-relaxed mb-6 text-gray-400">
            Concessionnaire officiel Isuzu & Karry au Maroc.<br />
            3 agences à Ouarzazate, Agadir et Tinghir.
          </p>
          <div className="flex gap-3">
            {['FB', 'LI', 'YT'].map(s => (
              <a key={s} href="#"
                className="w-9 h-9 border border-gray-200 rounded-full flex items-center justify-center text-xs font-bold text-gray-400 hover:border-red-300 hover:text-red-600 transition-all">
                {s}
              </a>
            ))}
          </div>
        </div>

        {/* Catalogue */}
        <div>
          <div className="flex items-center gap-2 mb-6 pb-3 border-b border-gray-100">
            <div className="w-1 h-5 rounded-full" style={{ background: 'linear-gradient(to bottom, #CC0000, #2D6A4F)' }} />
            <h3 className="font-bold text-gray-900 text-base">Catalogue</h3>
          </div>
          <ul className="space-y-2.5 text-sm">
            {catalogueLinks.map(lien => (
              <li key={lien.nom}>
                <Link href={lien.href}
                  className="flex items-center gap-2 text-gray-400 hover:text-gray-900 transition-colors group">
                  <svg className="w-3 h-3 flex-shrink-0 group-hover:translate-x-0.5 transition-transform"
                    fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#CC0000' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  {lien.nom}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Nos agences */}
        <div>
          <div className="flex items-center gap-2 mb-6 pb-3 border-b border-gray-100">
            <div className="w-1 h-5 rounded-full" style={{ background: 'linear-gradient(to bottom, #CC0000, #2D6A4F)' }} />
            <h3 className="font-bold text-gray-900 text-base">Nos agences</h3>
          </div>
          <ul className="space-y-6">
            {agences.map(a => (
              <li key={a.ville}>
                <p className="font-black text-gray-900 text-sm mb-0.5">CADOZAT {a.ville}</p>
                <p className="text-gray-400 text-xs mb-1">{a.adresse}</p>
                <a href={a.telHref} className="text-gray-400 hover:text-red-600 text-xs transition-colors block mb-1">{a.tel}</a>
                <a href={a.mapsUrl} target="_blank" rel="noopener noreferrer"
                  className="text-xs hover:underline font-bold" style={{ color: '#CC0000' }}>
                  Voir sur Google Maps →
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <div className="flex items-center gap-2 mb-6 pb-3 border-b border-gray-100">
            <div className="w-1 h-5 rounded-full" style={{ background: 'linear-gradient(to bottom, #CC0000, #2D6A4F)' }} />
            <h3 className="font-bold text-gray-900 text-base">Contact</h3>
          </div>
          <ul className="space-y-4 text-sm mb-8">
            <li>
              <a href="mailto:contact@cadozat.com"
                className="flex items-center gap-2.5 text-gray-400 hover:text-gray-900 transition-colors">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 bg-red-50">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20" style={{ color: '#CC0000' }}>
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                contact@cadozat.com
              </a>
            </li>
            <li className="flex items-center gap-2.5 text-gray-400 text-xs">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 bg-green-50">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20" style={{ color: '#2D6A4F' }}>
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
              </div>
              Lun — Sam : 8h00 à 18h00
            </li>
            <li className="flex items-center gap-2.5 text-gray-400 text-xs">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 bg-red-50">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20" style={{ color: '#CC0000' }}>
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
              </div>
              0524 885 025
            </li>
          </ul>
          <div className="flex flex-col gap-3">
            <Link href="/contact"
              className="text-center border border-gray-200 text-gray-700 text-sm font-bold px-5 py-3 rounded-xl transition-all hover:border-gray-300 hover:bg-gray-50">
              Nous contacter
            </Link>
            <Link href="/devis"
              className="text-center text-white text-sm font-bold px-5 py-3 rounded-xl transition-all hover:brightness-110"
              style={{ background: 'linear-gradient(135deg,#CC0000,#990000)', boxShadow: '0 4px 16px rgba(204,0,0,0.25)' }}>
              Devis gratuit
            </Link>
          </div>
        </div>
      </div>

      {/* ── Bas du footer ── */}
      <div className="border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © 2025 <span className="text-gray-700 font-semibold">CADOZAT</span> — Concessionnaire officiel Isuzu · Karry — Maroc
          </p>
          <div className="flex gap-6 text-sm text-gray-400">
            <Link href="/mentions-legales" className="hover:text-gray-700 transition-colors">Mentions légales</Link>
            <Link href="/politique-confidentialite" className="hover:text-gray-700 transition-colors">Confidentialité</Link>
          </div>
        </div>
      </div>

      {/* ── Ligne drapeau bas ── */}
      <div className="flex h-1">
        <div className="flex-1" style={{ background: '#CC0000' }} />
        <div className="flex-1" style={{ background: '#2D6A4F' }} />
      </div>

    </footer>
  )
}