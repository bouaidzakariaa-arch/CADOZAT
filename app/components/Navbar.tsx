'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const BRANDS = {
  isuzu: {
    primary:      '#CC0000',
    primaryDark:  '#990000',
    primaryLight: '#fff5f5',
    primaryFaint: 'rgba(204,0,0,0.07)',
    logo: '/images/logos/Isuzu.png',
    tabW: 100, tabH: 48,
    headerW: 160, headerH: 64,
    footerW: 80, footerH: 40,
  },
  karry: {
    primary:      '#0057A8',
    primaryDark:  '#003f7a',
    primaryLight: '#f0f6ff',
    primaryFaint: 'rgba(0,87,168,0.07)',
    logo: '/images/logos/Karry.png',
    tabW: 100, tabH: 48,
    headerW: 160, headerH: 64,
    footerW: 80, footerH: 40,
  },
} as const

type BrandId = keyof typeof BRANDS

const ZELLIGE = `data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23CC0000' fill-opacity='0.025'%3E%3Cpath d='M30 0l8.66 5v10L30 20l-8.66-5V5L30 0zm0 40l8.66 5v10L30 60l-8.66-5V45L30 40zM0 20l8.66 5v10L0 40l-8.66-5V25L0 20zm60 0l8.66 5v10L60 40l-8.66-5V25L60 20zM15 10l8.66 5v10L15 30l-8.66-5V15L15 10zm30 0l8.66 5v10L45 30l-8.66-5V15L45 10zm-30 30l8.66 5v10L15 60l-8.66-5V45L15 40zm30 0l8.66 5v10L45 60l-8.66-5V45L45 40z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E`

const TICKER = [
  { icon: '🚛', text: 'Concessionnaire officiel Isuzu · Karry au Maroc' },
  { icon: '📞', text: 'Service après-vente 6j/7 — Lundi au Samedi, 8h à 18h' },
  { icon: '📍', text: 'Présents à Ouarzazate · Agadir · Tinghir' },
  { icon: '🏆', text: 'Leader des véhicules utilitaires & industriels au Sud du Maroc' },
  { icon: '📋', text: "Marchés publics & appels d'offres — Solutions sur mesure pour collectivités" },
  { icon: '✉️', text: 'contact@cadozat.com · 0524 885 025' },
]

const menuMarques = [
  {
    id: 'isuzu' as BrandId,
    nom: 'Isuzu',
    tag: 'Pick-up & Camions',
    sections: [
      {
        titre: 'D-MAX TFR', subtitle: 'Pick-up EURO 6', href: '/catalogue/dmax-tfr',
        items: [
          { nom: 'Pick-up SC 4×2 EURO 6', href: '/catalogue/dmax-tfr' },
        ],
      },
      {
        titre: 'Série N', subtitle: '3.5T — 9.5T', href: '/catalogue',
        items: [
          { nom: 'NMR 77E', href: '/catalogue/nmr-77e' },
          { nom: 'NMR 85H', href: '/catalogue/nmr-85h' },
          { nom: 'NNR 85H', href: '/catalogue/nnr-85h' },
          { nom: 'NPR 75K', href: '/catalogue/npr-75k' },
          { nom: 'NPR 75L', href: '/catalogue/npr-75l' },
          { nom: 'NQR 90K', href: '/catalogue/nqr-90k' },
          { nom: 'NQR 90M', href: '/catalogue/nqr-90m' },
        ],
      },
      {
        titre: 'Série F', subtitle: '16T — 18T', href: '/catalogue',
        items: [
          { nom: 'FTR 34K', href: '/catalogue/ftr-34k' },
          { nom: 'FTR 34M', href: '/catalogue/ftr-34m' },
          { nom: 'FTR 34P', href: '/catalogue/ftr-34p' },
          { nom: 'FVR 34K', href: '/catalogue/fvr-34k' },
          { nom: 'FVR 34P', href: '/catalogue/fvr-34p' },
        ],
      },
    ],
  },
  {
    id: 'karry' as BrandId,
    nom: 'Karry',
    tag: 'Véhicules utilitaires',
    sections: [
      {
        titre: 'Fourgons', subtitle: 'Utilitaires', href: '/catalogue',
        items: [
          { nom: 'Karry Q22B', href: '/catalogue/karry-22b' },
          { nom: 'Karry Q22Q', href: '/catalogue/karry-22q' },
        ],
      },
    ],
  },
]

// ── Liens simples de la navbar ──────────────────────────────────────
const NAV_LINKS = [
  { label: 'Accueil',            href: '/' },
  { label: 'Société',            href: '/societe' },
  // "Notre gamme" est géré séparément (mega menu)
  { label: 'Marché public',      href: '/marche-public' },
  { label: 'Services après-vente', href: '/services' },
  { label: 'Références',         href: '/references' },
  { label: 'Contact',            href: '/contact' },
]

function BrandLogo({ id, zone, className = '' }: { id: BrandId; zone: 'tab' | 'header' | 'footer'; className?: string }) {
  const [imgError, setImgError] = useState(false)
  const b = BRANDS[id]
  const w = zone === 'tab' ? b.tabW : zone === 'header' ? b.headerW : b.footerW
  const h = zone === 'tab' ? b.tabH : zone === 'header' ? b.headerH : b.footerH
  const gradient = `linear-gradient(135deg, ${b.primary}, ${b.primaryDark})`
  const fontSize = zone === 'header' ? 11 : zone === 'tab' ? 9 : 8
  return (
    <div className={`relative flex-shrink-0 flex items-center justify-center overflow-hidden rounded-lg ${className}`}
      style={{ width: w, height: h, background: imgError ? gradient : 'transparent' }}>
      {!imgError && (
        <Image src={b.logo} alt={`Logo ${id}`} fill className="object-contain p-1" onError={() => setImgError(true)} />
      )}
      {imgError && (
        <span className="font-black text-white text-center leading-none px-1 select-none" style={{ fontSize, letterSpacing: '0.05em' }}>
          {id.toUpperCase()}
        </span>
      )}
    </div>
  )
}

export default function Navbar() {
  const [ouvert, setOuvert]             = useState(false)
  const [gammeOuverte, setGammeOuverte] = useState(false)
  const [activeMarque, setActiveMarque] = useState<BrandId>('isuzu')
  const [mobileGamme, setMobileGamme]   = useState(false)
  const [mobileMarque, setMobileMarque] = useState<BrandId | null>(null)
  const [scrolled, setScrolled]         = useState(false)
  const [tickerPaused, setTickerPaused] = useState(false)

  const active = menuMarques.find(m => m.id === activeMarque)!
  const brand  = BRANDS[activeMarque]
  const fermer = () => setGammeOuverte(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const grad = (id: BrandId) => `linear-gradient(135deg, ${BRANDS[id].primary}, ${BRANDS[id].primaryDark})`

  const CSS = `
    @keyframes ticker-scroll { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
    .ticker-track { display:flex; width:max-content; animation:ticker-scroll 38s linear infinite; }
    .ticker-track.paused { animation-play-state:paused; }
    @keyframes megamenu-in { from{opacity:0;transform:translateY(-6px)} to{opacity:1;transform:translateY(0)} }
    .megamenu-enter { animation:megamenu-in .22s cubic-bezier(.16,1,.3,1) both; }

    /* ── Animations liens navbar ── */
    @keyframes navUnderline {
      from { transform: scaleX(0); }
      to   { transform: scaleX(1); }
    }
    @keyframes navFadeIn {
      from { opacity:0; transform:translateY(-4px); }
      to   { opacity:1; transform:translateY(0); }
    }

    .nav-link {
      position: relative;
      color: #374151;
      font-size: 14px;
      font-weight: 700;
      padding: 6px 14px;
      border-radius: 8px;
      transition: color .2s;
      white-space: nowrap;
    }
    /* Ligne animée en dessous */
    .nav-link::after {
      content: '';
      position: absolute;
      bottom: 0px;
      left: 14px;
      right: 14px;
      height: 2px;
      background: #CC0000;
      border-radius: 99px;
      transform: scaleX(0);
      transform-origin: left;
      transition: transform .25s cubic-bezier(.4,0,.2,1);
    }
    .nav-link:hover {
      color: #CC0000;
    }
    .nav-link:hover::after {
      transform: scaleX(1);
    }

    .nav-link-gamme {
      display: flex;
      align-items: center;
      gap: 5px;
      position: relative;
      color: #374151;
      font-size: 14px;
      font-weight: 700;
      padding: 6px 14px;
      border-radius: 8px;
      transition: color .2s;
      white-space: nowrap;
      border: none;
      background: transparent;
      cursor: pointer;
    }
    .nav-link-gamme::after {
      content: '';
      position: absolute;
      bottom: 0px;
      left: 14px;
      right: 14px;
      height: 2px;
      background: #CC0000;
      border-radius: 99px;
      transform: scaleX(0);
      transform-origin: left;
      transition: transform .25s cubic-bezier(.4,0,.2,1);
    }
    .nav-link-gamme:hover,
    .nav-link-gamme.active {
      color: #CC0000;
    }
    .nav-link-gamme:hover::after,
    .nav-link-gamme.active::after {
      transform: scaleX(1);
    }
  `

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <header className="w-full fixed top-0 z-50 transition-all duration-300"
        style={{ filter: scrolled ? 'drop-shadow(0 4px 24px rgba(0,0,0,0.13))' : 'none' }}>

        {/* ── Ticker ── */}
        <div className="relative overflow-hidden text-white text-xs"
          style={{
            background: 'linear-gradient(135deg,#1a3d2b 0%,#0f2419 50%,#1a1a2e 100%)',
            height: scrolled ? '0px' : '36px',
            transition: 'height .35s cubic-bezier(.4,0,.2,1)',
          }}>
          <div className="absolute left-0 top-0 bottom-0 z-10 flex items-center px-4"
            style={{ background: 'linear-gradient(90deg,#0f2419 60%,transparent)' }}>
            <span className="text-[9px] font-black tracking-[.2em] uppercase px-2 py-0.5 rounded"
              style={{ color: '#e8c84a', border: '1px solid rgba(232,200,74,.3)' }}>CADOZAT</span>
          </div>
          <div className="absolute right-0 top-0 bottom-0 z-10 w-16"
            style={{ background: 'linear-gradient(270deg,#0f2419 60%,transparent)' }} />
          <div className="flex items-center h-full pl-24">
            <div className={`ticker-track${tickerPaused ? ' paused' : ''}`}
              onMouseEnter={() => setTickerPaused(true)}
              onMouseLeave={() => setTickerPaused(false)}>
              {[...TICKER, ...TICKER].map((item, i) => (
                <span key={i} className="flex items-center gap-2 px-8 whitespace-nowrap font-medium"
                  style={{ color: 'rgba(255,255,255,.82)' }}>
                  <span className="text-base leading-none">{item.icon}</span>
                  <span>{item.text}</span>
                  <span className="mx-2 opacity-30" style={{ color: '#CC0000' }}>◆</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── Bande drapeau ── */}
        <div className="flex" style={{ height: scrolled ? '2px' : '3px', transition: 'height .3s' }}>
          <div className="flex-1" style={{ background: '#CC0000' }} />
          <div className="flex-1" style={{ background: '#2D6A4F' }} />
        </div>

        {/* ── Navbar principale ── */}
        <nav className="relative bg-white transition-all duration-300"
          style={{
            backgroundImage: `url("${ZELLIGE}")`,
            backgroundSize: '60px 60px',
            boxShadow: scrolled ? '0 2px 0 rgba(204,0,0,.06),0 4px 30px rgba(0,0,0,.09)' : '0 1px 0 rgba(0,0,0,.05)',
          }}>
          <div className="absolute inset-0 bg-white/94 pointer-events-none" />
          <div className="relative max-w-7xl mx-auto px-6">
            <div className="flex justify-between items-center transition-all duration-300"
              style={{ height: scrolled ? '60px' : '72px' }}>

              {/* Logo */}
              <Link href="/" className="flex items-center gap-3 flex-shrink-0 group" onClick={fermer}>
                <div className="relative transition-all duration-300 overflow-hidden rounded-xl"
                  style={{ width: scrolled ? 40 : 48, height: scrolled ? 40 : 48 }}>
                  <Image src="/images/logo.png" alt="CADOZAT" fill className="object-contain" sizes="48px" priority />
                </div>
                <div className="hidden sm:block">
                  <div className="font-black tracking-tight leading-none transition-all duration-300 group-hover:opacity-75"
                    style={{ color: '#2D6A4F', fontSize: scrolled ? '18px' : '21px' }}>CADOZAT</div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="font-black text-[10px] tracking-widest" style={{ color: '#CC0000' }}>ISUZU</span>
                    <span className="text-gray-300 text-[10px]">·</span>
                    <span className="font-black text-[10px] tracking-widest" style={{ color: '#0057A8' }}>KARRY</span>
                  </div>
                </div>
              </Link>

              {/* ── Nav links desktop ── */}
              <ul className="hidden lg:flex items-center gap-0.5">

                {/* Accueil & Société */}
                <li><Link href="/" className="nav-link" onClick={fermer}>Accueil</Link></li>
                <li><Link href="/societe" className="nav-link" onClick={fermer}>Société</Link></li>

                {/* Notre gamme — mega menu */}
                <li onMouseEnter={() => setGammeOuverte(true)}>
                  <button
                    onClick={() => setGammeOuverte(!gammeOuverte)}
                    className={`nav-link-gamme${gammeOuverte ? ' active' : ''}`}>
                    Notre gamme
                    <svg className={`w-3.5 h-3.5 transition-transform duration-200 ${gammeOuverte ? 'rotate-180' : ''}`}
                      fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </li>

                {/* Autres liens */}
                <li><Link href="/marche-public" className="nav-link" onClick={fermer}>Marché public</Link></li>
                <li><Link href="/services" className="nav-link" onClick={fermer}>Services après-vente</Link></li>
                <li>
                  <Link href="/references" className="nav-link" onClick={fermer}
                    style={{ color: '#CC0000', fontWeight: 800 }}>
                    Références
                  </Link>
                </li>
              </ul>

              {/* ── CTAs desktop ── */}
              <div className="hidden lg:flex items-center gap-2">
                <Link href="/admin"
                  className="flex items-center gap-2 px-4 py-2 text-sm font-bold rounded-lg transition-all"
                  style={{ color: '#2D6A4F', border: '1.5px solid rgba(45,106,79,.4)' }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = '#2D6A4F'; el.style.color = 'white' }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = ''; el.style.color = '#2D6A4F' }}>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                  </svg>
                  Admin
                </Link>

                <a href="tel:0524885025"
                  className="flex items-center gap-2 px-4 py-2 text-sm font-bold rounded-lg transition-all"
                  style={{ color: '#374151', border: '1.5px solid rgba(0,0,0,.15)' }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = '#f3f4f6'; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = ''; }}>
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  Appeler
                </a>

                <Link href="/devis"
                  className="flex items-center gap-2 px-5 py-2 text-sm font-extrabold text-white rounded-lg transition-all hover:scale-[1.02] active:scale-[.98]"
                  onClick={fermer}
                  style={{ background: 'linear-gradient(135deg,#CC0000,#aa0000)', boxShadow: '0 2px 12px rgba(204,0,0,.35)' }}>
                  Demande de devis
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>

              {/* Burger mobile */}
              <button className="lg:hidden p-2 rounded-lg transition-all"
                style={{ background: ouvert ? 'rgba(204,0,0,.06)' : 'transparent' }}
                onClick={() => { setOuvert(!ouvert); setGammeOuverte(false) }}>
                <div className="w-5 space-y-1.5">
                  <span className={`block h-0.5 transition-all duration-300 ${ouvert ? 'rotate-45 translate-y-2' : ''}`} style={{ background: '#CC0000' }} />
                  <span className={`block h-0.5 transition-all duration-300 ${ouvert ? 'opacity-0' : ''}`} style={{ background: '#2D6A4F' }} />
                  <span className={`block h-0.5 transition-all duration-300 ${ouvert ? '-rotate-45 -translate-y-2' : ''}`} style={{ background: '#CC0000' }} />
                </div>
              </button>
            </div>
          </div>
        </nav>

        {/* ══ MEGA MENU DESKTOP ══ */}
        {gammeOuverte && (
          <div className="hidden lg:block w-full bg-white z-40 megamenu-enter"
            style={{ boxShadow: '0 16px 60px rgba(0,0,0,.14)', backgroundImage: `url("${ZELLIGE}")`, backgroundSize: '60px 60px' }}
            onMouseLeave={fermer}>
            <div className="absolute inset-0 bg-white/96 pointer-events-none" />
            <div className="relative max-w-7xl mx-auto flex flex-col" style={{ minHeight: '420px' }}>

              {/* Onglets marques */}
              <div className="flex border-b justify-center gap-8"
                style={{ borderColor: 'rgba(0,0,0,.07)', background: 'rgba(250,248,248,.95)' }}>
                {menuMarques.map(marque => {
                  const isActive = activeMarque === marque.id
                  const b = BRANDS[marque.id]
                  return (
                    <button key={marque.id}
                      onMouseEnter={() => setActiveMarque(marque.id)}
                      onClick={() => setActiveMarque(marque.id)}
                      className="flex items-center gap-3 px-6 py-3.5 transition-all relative flex-shrink-0"
                      style={{ background: isActive ? 'white' : 'transparent' }}>
                      <span className="absolute bottom-0 left-0 right-0 transition-all duration-300"
                        style={{
                          height: '3px',
                          background: `linear-gradient(to right,${b.primary},${b.primaryDark})`,
                          transform: isActive ? 'scaleX(1)' : 'scaleX(0)',
                          transformOrigin: 'left',
                        }} />
                      <div className="flex items-center justify-center rounded-lg overflow-hidden flex-shrink-0 transition-all duration-200"
                        style={{
                          width: b.tabW, height: b.tabH,
                          background: isActive ? b.primaryFaint : 'transparent',
                          border: isActive ? `1px solid ${b.primary}22` : '1px solid transparent',
                          transform: isActive ? 'scale(1.04)' : 'scale(1)',
                        }}>
                        <BrandLogo id={marque.id} zone="tab" />
                      </div>
                      <div className="text-left">
                        <div className="text-sm font-extrabold leading-none mb-0.5 transition-colors duration-200"
                          style={{ color: isActive ? b.primary : '#374151' }}>{marque.nom}</div>
                        <div className="text-[10px] font-bold leading-none transition-colors duration-200"
                          style={{ color: isActive ? b.primaryDark : '#9ca3af' }}>{marque.tag}</div>
                      </div>
                    </button>
                  )
                })}
              </div>

              {/* Contenu marque active */}
              <div className="flex-1 flex flex-col">
                <div className="px-8 py-5 flex items-center justify-between border-b"
                  style={{ borderColor: 'rgba(0,0,0,.06)', background: `linear-gradient(135deg,${brand.primaryLight} 0%,rgba(240,250,245,.9) 100%)` }}>
                  <div className="flex items-center gap-5">
                    <div className="flex items-center justify-center rounded-xl overflow-hidden flex-shrink-0"
                      style={{ width: brand.headerW + 16, height: brand.headerH + 8, background: brand.primaryFaint, border: `1px solid ${brand.primary}22`, padding: '6px 8px' }}>
                      <BrandLogo id={activeMarque} zone="header" />
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-gray-900 leading-none">{active.nom}</h3>
                      <p className="text-xs font-bold mt-0.5" style={{ color: brand.primaryDark }}>{active.tag}</p>
                    </div>
                    <div className="ml-2 px-3 py-1 rounded-full text-xs font-extrabold text-white"
                      style={{ background: grad(activeMarque), boxShadow: `0 2px 8px ${brand.primary}33` }}>
                      {active.sections.reduce((a, s) => a + s.items.length, 0)} modèles
                    </div>
                  </div>
                  <Link href="/catalogue" onClick={fermer}
                    className="flex items-center gap-1.5 text-xs font-extrabold hover:underline transition-all hover:gap-2.5"
                    style={{ color: brand.primary }}>
                    Voir tout le catalogue
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>

                {/* Grille sections */}
                <div className="flex-1 p-8 grid gap-8 relative"
                  style={{
                    gridTemplateColumns: `repeat(${Math.min(active.sections.length, 4)}, 1fr)`,
                    background: `linear-gradient(160deg,${brand.primaryLight}cc 0%,rgba(240,250,245,.7) 50%,rgba(255,251,245,.6) 100%)`,
                    borderLeft: `3px solid ${brand.primary}`,
                    borderRight: `3px solid ${brand.primaryDark}`,
                  }}>
                  <div className="absolute bottom-0 left-0 right-0 flex" style={{ height: '2px' }}>
                    <div className="flex-1" style={{ background: brand.primary }} />
                    <div className="flex-1" style={{ background: brand.primaryDark }} />
                  </div>
                  {active.sections.map((section, si) => (
                    <div key={si}>
                      <div className="mb-4">
                        <Link href={section.href} onClick={fermer}
                          className="text-sm font-black text-gray-900 hover:underline block leading-none mb-2">{section.titre}</Link>
                        <span className="inline-block text-[10px] font-extrabold px-2.5 py-0.5 rounded-full text-white"
                          style={{ background: grad(activeMarque) }}>{section.subtitle}</span>
                      </div>
                      <div className="flex mb-4" style={{ height: '2px', width: '44px', borderRadius: '1px', overflow: 'hidden' }}>
                        <div className="flex-1" style={{ background: brand.primary }} />
                        <div className="flex-1" style={{ background: brand.primaryDark }} />
                      </div>
                      <div className="space-y-0.5">
                        {section.items.map((item, ii) => (
                          <Link key={ii} href={item.href} onClick={fermer}
                            className="flex items-center gap-2.5 py-1.5 px-2 rounded-lg text-sm text-gray-500 hover:text-gray-900 transition-all group/item"
                            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = brand.primaryFaint }}
                            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '' }}>
                            <svg className="w-3 h-3 flex-shrink-0 transition-transform group-hover/item:translate-x-0.5"
                              fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: brand.primaryDark }}>
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                            </svg>
                            <span className="font-bold group-hover/item:text-gray-900">{item.nom}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer mega menu */}
                <div className="px-8 py-3 border-t flex items-center justify-between"
                  style={{ borderColor: 'rgba(0,0,0,.06)', background: 'rgba(250,248,248,.85)' }}>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-400">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    Ouarzazate · Agadir · Tinghir
                  </div>
                  <div className="flex items-center gap-4">
                    {menuMarques.map(m => (
                      <button key={m.id} onMouseEnter={() => setActiveMarque(m.id)}
                        className="flex items-center gap-1.5 transition-all hover:opacity-80">
                        <div className="overflow-hidden rounded transition-all duration-200"
                          style={{
                            width: BRANDS[m.id].footerW, height: BRANDS[m.id].footerH,
                            opacity: activeMarque === m.id ? 1 : 0.45,
                            transform: activeMarque === m.id ? 'scale(1.06)' : 'scale(1)',
                          }}>
                          <BrandLogo id={m.id} zone="footer" />
                        </div>
                      </button>
                    ))}
                    <button onClick={fermer}
                      className="w-6 h-6 rounded-full flex items-center justify-center ml-2 transition-all hover:rotate-90"
                      style={{ background: 'rgba(0,0,0,.08)' }}>
                      <svg className="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ══ MENU MOBILE ══ */}
        {ouvert && (
          <div className="lg:hidden bg-white border-t max-h-[85vh] overflow-y-auto relative z-50"
            style={{ borderColor: 'rgba(0,0,0,.07)', boxShadow: '0 12px 40px rgba(0,0,0,.12)', backgroundImage: `url("${ZELLIGE}")`, backgroundSize: '60px 60px' }}>
            <div className="absolute inset-0 bg-white/96 pointer-events-none" />
            <div className="relative">
              <div className="h-0.5 flex">
                <div className="flex-1" style={{ background: '#CC0000' }} />
                <div className="flex-1" style={{ background: '#2D6A4F' }} />
              </div>
              <div className="px-4 py-4 space-y-1">

                {/* Liens simples mobile */}
                {[
                  { label: 'Accueil',   href: '/' },
                  { label: 'Société',   href: '/societe' },
                ].map(item => (
                  <Link key={item.href} href={item.href}
                    className="block py-3 px-4 text-sm font-bold text-gray-700 hover:text-[#CC0000] rounded-lg hover:bg-red-50/60 transition-all"
                    onClick={() => setOuvert(false)}>
                    {item.label}
                  </Link>
                ))}

                {/* Gamme mobile */}
                <div>
                  <div className="flex items-center justify-between">
                    <Link href="/catalogue" className="flex-1 py-3 px-4 text-sm font-bold text-gray-700 rounded-l-lg"
                      onClick={() => setOuvert(false)}>Notre gamme</Link>
                    <button onClick={() => setMobileGamme(!mobileGamme)}
                      className="py-3 px-4 transition-colors"
                      style={{ color: mobileGamme ? '#CC0000' : '#9ca3af' }}>
                      <svg className={`w-4 h-4 transition-transform ${mobileGamme ? 'rotate-180' : ''}`}
                        fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>

                  {mobileGamme && (
                    <div className="mx-2 mb-2 space-y-2">
                      {menuMarques.map(marque => {
                        const b = BRANDS[marque.id]
                        return (
                          <div key={marque.id} className="rounded-xl overflow-hidden border" style={{ borderColor: 'rgba(0,0,0,.07)' }}>
                            <button onClick={() => setMobileMarque(mobileMarque === marque.id ? null : marque.id)}
                              className="w-full flex items-center justify-between px-4 py-3 text-left"
                              style={{ background: b.primaryLight }}>
                              <div className="flex items-center gap-3">
                                <div className="overflow-hidden rounded-lg flex-shrink-0"
                                  style={{ width: b.tabW * 0.75, height: b.tabH * 0.75 }}>
                                  <BrandLogo id={marque.id} zone="tab" />
                                </div>
                                <span className="text-sm font-extrabold text-gray-800">{marque.nom}</span>
                              </div>
                              <svg className={`w-4 h-4 transition-transform ${mobileMarque === marque.id ? 'rotate-180' : ''}`}
                                fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                style={{ color: mobileMarque === marque.id ? b.primary : '#9ca3af' }}>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </button>
                            {mobileMarque === marque.id && (
                              <div className="bg-white px-4 py-3 space-y-4">
                                {marque.sections.map((section, si) => (
                                  <div key={si}>
                                    <p className="text-[10px] font-black uppercase tracking-widest mb-1" style={{ color: b.primary }}>{section.titre}</p>
                                    <p className="text-[10px] font-bold mb-2" style={{ color: b.primaryDark }}>{section.subtitle}</p>
                                    <div className="space-y-0.5">
                                      {section.items.map((item, ii) => (
                                        <Link key={ii} href={item.href}
                                          className="flex items-center gap-2 py-2 px-3 rounded-lg text-sm font-bold text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all"
                                          onClick={() => { setOuvert(false); setMobileGamme(false); setMobileMarque(null) }}>
                                          <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                            style={{ color: b.primaryDark }}>
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                          </svg>
                                          {item.nom}
                                        </Link>
                                      ))}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>

                {/* Liens restants mobile */}
                {[
                  { label: 'Marché public',       href: '/marche-public' },
                  { label: 'Services après-vente', href: '/services' },
                  { label: 'Références',           href: '/references' },
                  { label: 'Contact',              href: '/contact' },
                ].map(item => (
                  <Link key={item.href} href={item.href}
                    className="block py-3 px-4 text-sm font-bold rounded-lg transition-all"
                    style={{ color: item.href === '/references' ? '#CC0000' : '#374151' }}
                    onClick={() => setOuvert(false)}>
                    {item.label}
                  </Link>
                ))}

                {/* CTAs mobile */}
                <div className="pt-3 space-y-2 border-t" style={{ borderColor: 'rgba(0,0,0,.07)' }}>
                  <Link href="/admin"
                    className="flex items-center justify-center gap-2 py-3 text-sm font-extrabold rounded-xl transition-all"
                    style={{ color: '#2D6A4F', border: '1.5px solid rgba(45,106,79,.4)' }}
                    onClick={() => setOuvert(false)}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                    </svg>
                    Admin
                  </Link>
                  <a href="tel:0524885025"
                    className="flex items-center justify-center gap-2 py-3 text-sm font-extrabold rounded-xl transition-all"
                    style={{ color: '#374151', border: '1.5px solid rgba(0,0,0,.15)' }}>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    Appeler maintenant
                  </a>
                  <Link href="/devis"
                    className="flex items-center justify-center gap-2 py-3 text-sm font-extrabold text-white rounded-xl transition-all hover:opacity-90"
                    style={{ background: 'linear-gradient(135deg,#CC0000,#990000)', boxShadow: '0 2px 12px rgba(204,0,0,.35)' }}
                    onClick={() => setOuvert(false)}>
                    Demande de devis
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  )
}