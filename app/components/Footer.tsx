'use client'

import Link from 'next/link'
import Image from 'next/image'

const agences = [
  { ville: 'Ouarzazate', role: 'Siège principal',   adresse: '189, Bd Maghreb Arabi, Ouarzazate', tel: '05 24 88 50 25', telHref: 'tel:05 24 88 50 25', mapsUrl: 'https://maps.google.com/?q=30.929241,-6.904725', color: '#CC0000', bg: '#fff5f5', icon: '🏢' },
  { ville: 'Agadir',     role: 'Agence régionale',   adresse: '18 Bab Al Madina Tilila, Agadir',  tel: '05 24 88 50 25', telHref: 'tel:05 24 89 09 30', mapsUrl: 'https://maps.google.com/?q=30.39542,-9.52030',  color: '#0057A8', bg: '#f0f7ff', icon: '🌊' },
  { ville: 'Tinghir',   role: 'Agence régionale',   adresse: 'Tinghir',        tel: '05 24 88 50 25', telHref: 'tel:05 24 89 09 30', mapsUrl: 'https://maps.google.com/?q=31.5134,-5.5342',   color: '#2D6A4F', bg: '#f0fdf4', icon: '🏔️' },
]

const catalogueLinks = [
  { nom: 'Pick-up Isuzu D-MAX',      href: '/catalogue/dmax-tfr' },
  { nom: 'Camions porteurs',          href: '/catalogue/camions' },
  { nom: 'Nettoyage & Voirie',        href: '/catalogue/nettoyage' },
  { nom: 'Conteneurisation',          href: '/catalogue/conteneurisation' },
  { nom: 'Camions citernes',          href: '/catalogue/citerne' },
  { nom: 'Véhicules frigorifiques',   href: '/catalogue/frigorifique' },
  { nom: "Pièces détachées",          href: '/catalogue/pieces' },
  { nom: 'Karry Q22B',               href: '/catalogue/karry-22b' },
  { nom: 'Karry Q22Q',               href: '/catalogue/karry-22q' },
]

export default function Footer() {
  return (
    <footer style={{ background:'#fff', borderTop:'1px solid #f0f0f8' }}>

      {/* ── Agences Section ── */}
      <div style={{ padding:'80px 0', background:'#f8faff', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, opacity:0.4, backgroundImage:'radial-gradient(circle, rgba(0,87,168,0.07) 1px, transparent 1px)', backgroundSize:'32px 32px' }} />

        <div className="relative max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-14">
            <p className="text-xs font-black uppercase tracking-widest mb-3" style={{ color:'#0057A8' }}>Présents partout pour vous servir</p>
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="h-px w-10" style={{ background:'#0057A8' }} />
              <h2 className="text-3xl font-black text-gray-900">Nos 3 agences</h2>
              <div className="h-px w-10" style={{ background:'#CC0000' }} />
            </div>
            <div className="flex items-center justify-center gap-2 mb-4">
              <div style={{ width:'40px', height:'3px', background:'#CC0000', borderRadius:'2px' }} />
              <div style={{ width:'20px', height:'3px', background:'#0057A8', borderRadius:'2px' }} />
            </div>
            <p className="text-gray-400 text-sm">Même qualité, même service — Ouarzazate · Agadir · Tinghir</p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {agences.map(a => (
              <div key={a.ville} className="group rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                style={{ background:'#fff', border:`1px solid ${a.color}18`, boxShadow:'0 2px 16px rgba(0,0,0,0.05)' }}>
                <div style={{ height:'3px', background:`linear-gradient(90deg, ${a.color}, ${a.color}66)` }} />
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="text-xs font-black uppercase tracking-widest mb-1" style={{ color: a.color }}>{a.role}</div>
                      <h3 className="font-black text-gray-900 text-lg">CADOZAT {a.ville}</h3>
                    </div>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: a.bg }}>{a.icon}</div>
                  </div>
                  <div className="flex items-start gap-2 mb-5 text-sm" style={{ color:'#94a3b8' }}>
                    <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" style={{ color: a.color }}>
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                    </svg>
                    {a.adresse}
                  </div>
                  <div className="flex gap-2">
                    <a href={a.telHref}
                      className="flex-1 flex items-center justify-center gap-2 text-white text-sm font-bold py-2.5 rounded-xl transition-all hover:scale-105"
                      style={{ background: a.color }}>
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/></svg>
                      {a.tel}
                    </a>
                    <a href={a.mapsUrl} target="_blank" rel="noopener noreferrer"
                      className="flex items-center justify-center px-4 py-2.5 rounded-xl text-sm font-bold border-2 transition-all hover:scale-105"
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

      {/* ── Footer Principal ── */}
      <div style={{ borderTop:'1px solid #eef0f8' }}>
        <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Logo & desc */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div>
                <div className="font-black text-xl text-gray-900 leading-none">CADOZAT</div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="font-black text-[10px] tracking-widest" style={{ color:'#CC0000' }}>ISUZU</span>
                  <span className="text-gray-300 text-[10px]">·</span>
                  <span className="font-black text-[10px] tracking-widest" style={{ color:'#0057A8' }}>KARRY</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <div style={{ width:'32px', height:'3px', background:'#CC0000', borderRadius:'2px' }} />
              <div style={{ width:'16px', height:'3px', background:'#0057A8', borderRadius:'2px' }} />
            </div>
            <p className="text-sm leading-relaxed mb-6 text-gray-400">
              Concessionnaire officiel des marques Isuzu et Karry dans la région de Souss-Massa et Drâa-Tafilalt.<br/>3 agences à Ouarzazate, Agadir et Tinghir.
            </p>
          </div>

          {/* Catalogue */}
          <div>
            <div className="flex items-center gap-2 mb-6 pb-3" style={{ borderBottom:'1px solid #eef0f8' }}>
              <div style={{ width:'3px', height:'20px', borderRadius:'2px', background:'linear-gradient(to bottom, #CC0000, #0057A8)' }} />
              <h3 className="font-bold text-gray-900 text-base">Catalogue</h3>
            </div>
            <ul className="space-y-2.5 text-sm">
              {catalogueLinks.map(lien => (
                <li key={lien.nom}>
                  <Link href={lien.href}
                    className="flex items-center gap-2 text-gray-400 hover:text-gray-900 transition-colors group">
                    <svg className="w-3 h-3 flex-shrink-0 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color:'#CC0000' }}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                    </svg>
                    {lien.nom}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Nos agences */}
          <div>
            <div className="flex items-center gap-2 mb-6 pb-3" style={{ borderBottom:'1px solid #eef0f8' }}>
              <div style={{ width:'3px', height:'20px', borderRadius:'2px', background:'linear-gradient(to bottom, #0057A8, #2D6A4F)' }} />
              <h3 className="font-bold text-gray-900 text-base">Nos agences</h3>
            </div>
            <ul className="space-y-5">
              {agences.map(a => (
                <li key={a.ville}>
                  <div className="flex items-center gap-1.5 mb-1">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: a.color }} />
                    <p className="font-black text-gray-900 text-sm">CADOZAT {a.ville}</p>
                  </div>
                  <p className="text-gray-400 text-xs mb-1 pl-3">{a.adresse}</p>
                  <a href={a.telHref} className="text-xs transition-colors block mb-1 pl-3" style={{ color:'#94a3b8' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = a.color }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#94a3b8' }}>
                    {a.tel}
                  </a>
                  <a href={a.mapsUrl} target="_blank" rel="noopener noreferrer"
                    className="text-xs font-bold pl-3 hover:underline" style={{ color: a.color }}>
                    Voir sur Google Maps →
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <div className="flex items-center gap-2 mb-6 pb-3" style={{ borderBottom:'1px solid #eef0f8' }}>
              <div style={{ width:'3px', height:'20px', borderRadius:'2px', background:'linear-gradient(to bottom, #CC0000, #1B2B6B)' }} />
              <h3 className="font-bold text-gray-900 text-base">Contact</h3>
            </div>
            <ul className="space-y-4 text-sm mb-8">
              <li>
                <a href="mailto:CADOZAT99@hotmail.com"
                  className="flex items-center gap-2.5 text-gray-400 hover:text-gray-900 transition-colors">
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background:'#fff5f5' }}>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" style={{ color:'#CC0000' }}>
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                    </svg>
                  </div>
                  CADOZAT99@hotmail.com
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-gray-400 text-xs">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background:'#f0f7ff' }}>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" style={{ color:'#0057A8' }}>
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
                  </svg>
                </div>
                Lun — Ven 8h00 à 18h00 et Sam : 8h00 à 12h00
              </li>
              <li className="flex items-center gap-2.5 text-gray-400 text-xs">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background:'#fff5f5' }}>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" style={{ color:'#CC0000' }}>
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                  </svg>
                </div>
                05 24 88 50 25
              </li>
            </ul>
            <div className="flex flex-col gap-3">
              <Link href="/contact"
                className="text-center border text-sm font-bold px-5 py-3 rounded-xl transition-all"
                style={{ borderColor:'#e2e8f0', color:'#374151' }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor='#0057A8'; el.style.color='#0057A8' }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor='#e2e8f0'; el.style.color='#374151' }}>
                Nous contacter
              </Link>
              <Link href="/devis"
                className="text-center text-white text-sm font-bold px-5 py-3 rounded-xl transition-all hover:brightness-110"
                style={{ background:'linear-gradient(135deg, #CC0000, #aa0000)', boxShadow:'0 4px 16px rgba(204,0,0,0.25)' }}>
                Devis gratuit
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div style={{ borderTop:'1px solid #eef0f8' }}>
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © 2025 <span className="text-gray-700 font-semibold">CADOZAT</span> — Concessionnaire officiel des marques Isuzu et Karry dans la région de Souss-Massa et Drâa-Tafilalt
          </p>
        </div>
      </div>

      {/* Ligne drapeau bas */}
      <div style={{ height:'3px', background:'linear-gradient(90deg, #CC0000 0%, #0057A8 40%, #1B2B6B 70%, #2D6A4F 100%)' }} />
    </footer>
  )
}