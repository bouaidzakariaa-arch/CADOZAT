'use client'

import Link from 'next/link'

const agences = [
  { ville: 'Ouarzazate', role: 'Siège principal',   adresse: '189, Bd Maghreb Arabi', tel: '05 24 88 50 25', telHref: 'tel:0524885025', mapsUrl: 'https://maps.google.com/?q=30.929241,-6.904725', color: '#CC0000', icon: '🏢' },
  { ville: 'Agadir',     role: 'Agence succursale', adresse: '18 Bab Al Madina Tilila', tel: '05 24 88 50 25', telHref: 'tel:0524885025', mapsUrl: 'https://maps.google.com/?q=30.39542,-9.52030',  color: '#0057A8', icon: '🌊' },
  { ville: 'Tinghir',   role: 'Agence succursale', adresse: 'Tinghir', tel: '05 24 88 50 25', telHref: 'tel:0524885025', mapsUrl: 'https://maps.google.com/?q=31.5134,-5.5342', color: '#2D6A4F', icon: '🏔️' },
]

const gammeIsuzu = [
  { nom: 'D-MAX Pick-up', href: '/catalogue/dmax-tfr', badge: 'PICK-UP' },
  { nom: 'FTR 34K',       href: '/catalogue/ftr-34k',  badge: null },
  { nom: 'FTR 34M',       href: '/catalogue/ftr-34m',  badge: null },
  { nom: 'FTR 34P',       href: '/catalogue/ftr-34p',  badge: null },
  { nom: 'FVR 34K',       href: '/catalogue/fvr-34k',  badge: null },
  { nom: 'FVR 34P',       href: '/catalogue/fvr-34p',  badge: null },
  { nom: 'NMR 77E',       href: '/catalogue/nmr-77e',  badge: null },
  { nom: 'NMR 85H',       href: '/catalogue/nmr-85h',  badge: null },
  { nom: 'NNR 85H',       href: '/catalogue/nnr-85h',  badge: null },
  { nom: 'NPR 75K',       href: '/catalogue/npr-75k',  badge: null },
  { nom: 'NPR 75L',       href: '/catalogue/npr-75l',  badge: null },
  { nom: 'NQR 90K',       href: '/catalogue/nqr-90k',  badge: null },
  { nom: 'NQR 90M',       href: '/catalogue/nqr-90m',  badge: null },
]

const gammeKarry = [
  { nom: 'Karry Q22B', href: '/catalogue/karry-22b' },
  { nom: 'Karry Q22Q', href: '/catalogue/karry-22q' },
]

export default function Footer() {
  return (
    <footer>

      {/* ── Agences Section (fond clair) ── */}
      <div style={{ padding: '80px 0', background: '#f8faff', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.4, backgroundImage: 'radial-gradient(circle, rgba(0,87,168,0.07) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: '#0057A8' }}>Présents partout pour vous servir</p>
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="h-px w-10" style={{ background: '#0057A8' }} />
              <h2 className="text-3xl font-black text-gray-900">Nos 3 agences</h2>
              <div className="h-px w-10" style={{ background: '#CC0000' }} />
            </div>
            <div className="flex items-center justify-center gap-2 mb-4">
              <div style={{ width: '40px', height: '3px', background: '#CC0000', borderRadius: '2px' }} />
              <div style={{ width: '20px', height: '3px', background: '#0057A8', borderRadius: '2px' }} />
            </div>
            <p className="text-gray-400 text-sm">Même qualité, même service — Ouarzazate · Agadir · Tinghir</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {agences.map(a => (
              <div key={a.ville} className="group rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                style={{ background: '#fff', border: `1px solid ${a.color}22`, boxShadow: '0 2px 16px rgba(0,0,0,0.05)' }}>
                <div style={{ height: '3px', background: `linear-gradient(90deg, ${a.color}, ${a.color}66)` }} />
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="text-xs font-black uppercase tracking-widest mb-1" style={{ color: a.color }}>{a.role}</div>
                      <h3 className="font-black text-gray-900 text-lg">CADOZAT {a.ville}</h3>
                    </div>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl bg-gray-50">{a.icon}</div>
                  </div>
                  <div className="flex items-start gap-2 mb-5 text-sm text-gray-400">
                    <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" style={{ color: a.color }}>
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    {a.adresse}
                  </div>
                  <div className="flex gap-2">
                    <a href={a.telHref} className="flex-1 flex items-center justify-center gap-2 text-white text-sm font-bold py-2.5 rounded-xl transition-all hover:scale-105" style={{ background: a.color }}>
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" /></svg>
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

      {/* ── Footer Principal DARK ── */}
      <div style={{ background: '#0f172a' }}>
        <div className="max-w-7xl mx-auto px-6 py-16">

          {/* Header du footer */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 pb-10"
            style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            <div>
              <div className="text-2xl font-black text-white mb-1 tracking-wide">CADOZAT</div>
              <div className="flex items-center gap-2">
              <a href="https://www.isuzu.co.ma/" target="_blank" rel="noopener noreferrer" className="text-[10px] font-black tracking-widest" style={{ color: '#CC0000' }}>ISUZU</a>                <span style={{ color: 'rgba(255,255,255,0.2)' }}>·</span>
              <a href="https://www.karry.co.ma" target="_blank" rel="noopener noreferrer" className="text-[10px] font-black tracking-widest" style={{ color: '#60a5fa' }}>KARRY</a>              </div>
            </div>
            <p className="text-sm mt-4 md:mt-0 max-w-sm" style={{ color: 'rgba(255,255,255,0.35)', lineHeight: '1.7' }}>
              Concessionnaire officiel Isuzu & Karry.<br />
              Souss-Massa · Drâa-Tafilalt — 3 agences.
            </p>
          </div>

          {/* Grille 4 colonnes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

            {/* Gamme Isuzu + Karry (2 colonnes) */}
            <div className="lg:col-span-2">

              {/* Isuzu */}
              <div className="flex items-center gap-2 mb-5">
                <div style={{ width: '3px', height: '18px', borderRadius: '2px', background: '#CC0000' }} />
                <h3 className="text-xs font-black uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.5)' }}>Gamme Isuzu</h3>
              </div>
              <div className="grid grid-cols-2 gap-x-6 gap-y-2.5 mb-8">
                {gammeIsuzu.map(v => (
                  <Link key={v.nom} href={v.href}
                    className="flex items-center gap-2 text-sm transition-all duration-200 group"
                    style={{ color: 'rgba(255,255,255,0.5)' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#fff' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.5)' }}>
                    <svg className="w-3 h-3 flex-shrink-0 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#CC0000' }}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    {v.nom}
                    {v.badge && (
                      <span className="text-[9px] font-black px-1.5 py-0.5 rounded" style={{ background: '#CC0000', color: '#fff' }}>{v.badge}</span>
                    )}
                  </Link>
                ))}
              </div>

              {/* Karry */}
              <div className="flex items-center gap-2 mb-4">
                <div style={{ width: '3px', height: '18px', borderRadius: '2px', background: '#0057A8' }} />
                <h3 className="text-xs font-black uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.5)' }}>Gamme Karry</h3>
              </div>
              <div className="flex gap-6">
                {gammeKarry.map(v => (
                  <Link key={v.nom} href={v.href}
                    className="flex items-center gap-2 text-sm transition-all duration-200 group"
                    style={{ color: 'rgba(255,255,255,0.5)' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#fff' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.5)' }}>
                    <svg className="w-3 h-3 flex-shrink-0 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#0057A8' }}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    {v.nom}
                  </Link>
                ))}
              </div>
            </div>

            {/* Nos Agences */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div style={{ width: '3px', height: '18px', borderRadius: '2px', background: '#0057A8' }} />
                <h3 className="text-xs font-black uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.5)' }}>Nos agences</h3>
              </div>
              <ul className="space-y-6">
                {agences.map(a => (
                  <li key={a.ville}>
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ background: a.color }} />
                      <p className="font-bold text-white text-sm">CADOZAT {a.ville}</p>
                    </div>
                    <p className="text-xs mb-1 pl-3.5" style={{ color: 'rgba(255,255,255,0.35)' }}>{a.adresse}</p>
                    <a href={a.telHref} className="text-xs block mb-1 pl-3.5 transition-colors" style={{ color: 'rgba(255,255,255,0.35)' }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = a.color }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.35)' }}>
                      {a.tel}
                    </a>
                    <a href={a.mapsUrl} target="_blank" rel="noopener noreferrer"
                      className="text-xs font-bold pl-3.5 hover:underline" style={{ color: a.color }}>
                      Voir sur Maps →
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div style={{ width: '3px', height: '18px', borderRadius: '2px', background: '#CC0000' }} />
                <h3 className="text-xs font-black uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.5)' }}>Contact</h3>
              </div>
              <ul className="space-y-4 mb-8">
                <li>
                  <a href="mailto:CADOZAT99@hotmail.com" className="flex items-center gap-3 transition-colors"
                    style={{ color: 'rgba(255,255,255,0.45)' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#fff' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.45)' }}>
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(204,0,0,0.15)' }}>
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" style={{ color: '#CC0000' }}>
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </div>
                    <span className="text-xs">CADOZAT99@hotmail.com</span>
                  </a>
                </li>
                <li className="flex items-center gap-3" style={{ color: 'rgba(255,255,255,0.35)' }}>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(0,87,168,0.15)' }}>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" style={{ color: '#0057A8' }}>
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-xs">Lun–Ven 8h–18h · Sam 8h–12h</span>
                </li>
                <li className="flex items-center gap-3" style={{ color: 'rgba(255,255,255,0.35)' }}>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(204,0,0,0.15)' }}>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" style={{ color: '#CC0000' }}>
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </div>
                  <span className="text-xs">05 24 88 50 25</span>
                </li>
              </ul>

              <div className="flex flex-col gap-3 mb-6">
                <Link href="/contact"
                  className="text-center text-sm font-bold px-5 py-3 rounded-xl transition-all hover:bg-white hover:text-gray-900"
                  style={{ border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.7)' }}>
                  Nous contacter
                </Link>
                <Link href="/devis"
                  className="text-center text-white text-sm font-bold px-5 py-3 rounded-xl transition-all hover:brightness-110"
                  style={{ background: 'linear-gradient(135deg, #CC0000, #aa0000)', boxShadow: '0 4px 20px rgba(204,0,0,0.3)' }}>
                  Devis gratuit →
                </Link>
              </div>

              
            </div>

          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row justify-between items-center gap-3">
            <div className="flex items-center gap-2">
              <a href="https://www.isuzu.co.ma/" target="_blank" rel="noopener noreferrer" className="text-[10px] font-black tracking-widest" style={{ color: '#CC0000' }}>ISUZU</a>
              <span style={{ color: 'rgba(255,255,255,0.2)' }}>·</span>
              <a href="https://www.karry.co.ma" target="_blank" rel="noopener noreferrer" className="text-[10px] font-black tracking-widest" style={{ color: '#60a5fa' }}>KARRY</a>  </div>
          </div>
        </div>
      </div>
      {/* Ligne drapeau */}
      <div style={{ height: '3px', background: 'linear-gradient(90deg, #CC0000 0%, #0057A8 40%, #1B2B6B 70%, #2D6A4F 100%)' }} />
    </footer>
  )
}