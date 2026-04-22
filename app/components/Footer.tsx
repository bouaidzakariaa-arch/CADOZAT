'use client'

import Link from 'next/link'
import Image from 'next/image'

const agences = [
  {
    ville: 'Ouarzazate',
    badge: 'Siège principal',
    adresse: '189, Bd Maghreb Arabi, Ouarzazate',
    tel: '0524 885 025',
    telHref: 'tel:0524885025',
    mapsUrl: 'https://maps.google.com/?q=30.929241,-6.904725',
  },
  {
    ville: 'Agadir',
    badge: 'Agence',
    adresse: '18 bab al madina tilila',
    tel: '0524 890 930',
    telHref: 'tel:0524890930',
    mapsUrl: 'https://maps.google.com/?q=30.929241,-6.904725',
  },
  {
    ville: 'Tinghir',
    badge: 'Agence',
    adresse: 'Adresse 2, Tinghir',
    tel: '0524 890 930',
    telHref: 'tel:0524890930',
    mapsUrl: 'https://maps.google.com/?q=30.929241,-6.904725',
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
    <footer
      className="relative text-white overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0f1c2e 0%, #1a2d1a 50%, #0f1c2e 100%)' }}
    >
      {/* ── Décors lumineux identiques à la page société ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full opacity-[0.08]"
          style={{ background: 'radial-gradient(circle, #CC0000, transparent)', transform: 'translate(-30%, -30%)' }} />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full opacity-[0.08]"
          style={{ background: 'radial-gradient(circle, #2D6A4F, transparent)', transform: 'translate(30%, 30%)' }} />
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      </div>

      {/* ── Ligne drapeau haut ── */}
      <div className="relative flex h-1">
        <div className="flex-1" style={{ background: '#CC0000' }} />
        <div className="flex-1" style={{ background: '#2D6A4F' }} />
      </div>

      {/* ══════════════════════════════════════
          BANDE AGENCES — style société
      ══════════════════════════════════════ */}
      <div className="relative max-w-7xl mx-auto px-6 py-20">

        <div className="text-center mb-14">
          <p className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: '#C9A84C' }}>
            Présents partout pour vous servir
          </p>
          <h2 className="text-3xl font-black text-white leading-tight mb-3">Nos 3 agences</h2>
          <div className="w-10 h-0.5 mx-auto mb-4"
            style={{ background: 'linear-gradient(to right, #CC0000, #2D6A4F)' }} />
          <p className="text-white/40 text-sm">Même qualité, même service — Ouarzazate · Agadir · Tinghir</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {agences.map((a) => (
            <div
              key={a.ville}
              className="group rounded-2xl p-7 border border-white/10 hover:border-white/25 hover:-translate-y-1 transition-all duration-300"
              style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(12px)' }}
            >
              <div className="flex items-start gap-3 mb-6">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
                  style={{ background: 'linear-gradient(135deg, #CC0000, #990000)' }}
                >
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <div className="font-black text-white text-base leading-tight">CADOZAT {a.ville}</div>
                  <div className="text-[11px] font-bold uppercase tracking-widest mt-0.5" style={{ color: '#C9A84C' }}>{a.badge}</div>
                </div>
              </div>
              <div className="h-px bg-white/10 mb-6" />
              <p className="text-white/50 text-sm leading-relaxed mb-6">{a.adresse}</p>
              <div className="flex items-center justify-between">
                <a href={a.telHref} className="text-white font-black text-sm hover:text-[#CC0000] transition-colors">{a.tel}</a>
                <a href={a.mapsUrl} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-bold hover:underline underline-offset-2"
                  style={{ color: '#C9A84C' }}>
                  Maps
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Séparateur ── */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)' }} />
      </div>

      {/* ══════════════════════════════════════
          FOOTER PRINCIPAL
      ══════════════════════════════════════ */}
      <div className="relative max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Logo & description */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="relative w-12 h-12 flex-shrink-0 bg-white rounded-xl shadow-lg">
              <Image src="/images/logo.png" alt="CADOZAT" fill className="object-contain p-1" />
            </div>
            <div>
              <div className="text-white font-black text-xl leading-none">CADOZAT</div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="font-black text-[10px] tracking-widest" style={{ color: '#CC0000' }}>ISUZU</span>
                <span className="text-white/30 text-[10px]">·</span>
                <span className="font-black text-[10px] tracking-widest" style={{ color: '#0057A8' }}>KARRY</span>
              </div>
            </div>
          </div>
          <div className="w-12 h-0.5 rounded-full mb-4"
            style={{ background: 'linear-gradient(to right, #CC0000, #2D6A4F)' }} />
          <p className="text-sm leading-relaxed mb-6 text-white/50">
            Concessionnaire officiel Isuzu & Karry au Maroc.<br />
            3 agences à Ouarzazate, Agadir et Tinghir.
          </p>
          <div className="flex gap-3">
            {['FB', 'LI', 'YT'].map((s) => (
              <a key={s} href="#"
                className="w-9 h-9 border border-white/15 rounded-full flex items-center justify-center transition-all text-xs font-bold text-white hover:border-[#CC0000] hover:text-[#CC0000]"
                style={{ background: 'rgba(255,255,255,0.06)' }}>
                {s}
              </a>
            ))}
          </div>
        </div>

        {/* Catalogue */}
        <div>
          <div className="flex items-center gap-2 mb-6 pb-3 border-b border-white/10">
            <div className="w-1 h-5 rounded-full" style={{ background: 'linear-gradient(to bottom, #CC0000, #2D6A4F)' }} />
            <h3 className="text-white font-bold text-base">Catalogue</h3>
          </div>
          <ul className="space-y-2.5 text-sm">
            {catalogueLinks.map((lien) => (
              <li key={lien.nom}>
                <Link href={lien.href}
                  className="flex items-center gap-2 text-white/50 hover:text-white transition-colors group">
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
          <div className="flex items-center gap-2 mb-6 pb-3 border-b border-white/10">
            <div className="w-1 h-5 rounded-full" style={{ background: 'linear-gradient(to bottom, #CC0000, #2D6A4F)' }} />
            <h3 className="text-white font-bold text-base">Nos agences</h3>
          </div>
          <ul className="space-y-6">
            {agences.map((a) => (
              <li key={a.ville}>
                <p className="text-white font-black text-sm mb-0.5">CADOZAT {a.ville}</p>
                <p className="text-white/40 text-xs mb-1">{a.adresse}</p>
                <a href={a.telHref} className="text-white/50 hover:text-[#CC0000] text-xs transition-colors block mb-1">{a.tel}</a>
                <a href={a.mapsUrl} target="_blank" rel="noopener noreferrer"
                  className="text-xs hover:underline font-bold" style={{ color: '#C9A84C' }}>
                  Voir sur Google Maps →
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <div className="flex items-center gap-2 mb-6 pb-3 border-b border-white/10">
            <div className="w-1 h-5 rounded-full" style={{ background: 'linear-gradient(to bottom, #CC0000, #2D6A4F)' }} />
            <h3 className="text-white font-bold text-base">Contact</h3>
          </div>
          <ul className="space-y-4 text-sm mb-8">
            <li>
              <a href="mailto:CADOZAT99@hotmail.com"
                className="flex items-center gap-2.5 text-white/50 hover:text-white transition-colors">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(204,0,0,0.2)' }}>
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20" style={{ color: '#CC0000' }}>
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                CADOZAT99@hotmail.com
              </a>
            </li>
            <li className="flex items-center gap-2.5 text-white/50 text-xs">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(45,106,79,0.2)' }}>
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20" style={{ color: '#2D6A4F' }}>
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
              </div>
              Lun — Sam : 8h00 à 18h00
            </li>
            <li className="flex items-center gap-2.5 text-white/50 text-xs">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(204,0,0,0.2)' }}>
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20" style={{ color: '#CC0000' }}>
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
              </div>
              0524 885 025
            </li>
          </ul>
          <div className="flex flex-col gap-3">
            <Link href="/contact"
              className="text-center border border-white/15 text-white text-sm font-bold px-5 py-3 rounded-xl transition-all hover:border-white/30 hover:bg-white/5"
              style={{ background: 'rgba(255,255,255,0.06)' }}>
              Nous contacter
            </Link>
            <Link href="/devis"
              className="text-center text-white text-sm font-bold px-5 py-3 rounded-xl transition-all hover:brightness-110"
              style={{ background: 'linear-gradient(135deg,#CC0000,#990000)', boxShadow: '0 4px 16px rgba(204,0,0,0.35)' }}>
              Devis gratuit
            </Link>
          </div>
        </div>
      </div>

      {/* ── Bas du footer ── */}
      <div className="relative border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/30 text-sm">
            © 2025 <span className="text-white font-semibold">CADOZAT</span> — Concessionnaire officiel Isuzu · Karry — Maroc
          </p>
          <div className="flex gap-6 text-sm text-white/30">
            <Link href="/mentions-legales" className="hover:text-white transition-colors">Mentions légales</Link>
            <Link href="/politique-confidentialite" className="hover:text-white transition-colors">Confidentialité</Link>
          </div>
        </div>
      </div>

      {/* ── Ligne drapeau bas ── */}
      <div className="relative flex h-1">
        <div className="flex-1" style={{ background: '#CC0000' }} />
        <div className="flex-1" style={{ background: '#2D6A4F' }} />
      </div>

    </footer>
  )
}