'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

// ============================================
// DONNÉES — Structure : Marque → Séries → Modèles
// ============================================

const heroSlides = [
  {
    titre: 'Isuzu',
    soustitre: 'D-MAX · Série N · Série F — L\'excellence japonaise',
    img: '/images/camions/dmax/dc-4x4.jpeg',
    couleur: '#CC0000',
    tag: 'Pick-ups & Camions',
  },
  {
    titre: 'Karry',
    soustitre: 'Fourgons utilitaires — Robustesse & économie',
    img: '/images/karry/karry22b.jpg',
    couleur: '#0057A8',
    tag: 'Utilitaires',
  },
]

const marques = [
  // ─── ISUZU ───────────────────────────────────────
  {
    id: 'isuzu',
    nom: 'Isuzu',
    couleur: '#CC0000',
    accentCouleur: '#FF2222',
    bg: 'linear-gradient(160deg, #fff 0%, #fdf5f5 100%)',
    description: 'Pick-ups & Camions professionnels',
    logo: 'I',
    tagline: 'La fiabilité japonaise depuis 1916',
    series: [
      {
        id: 'dmax',
        serie: 'D-MAX',
        subtitle: 'Pick-up professionnel',
        couleur: '#CC0000',
        modeles: [
          { nom: 'Pick-up SC 4×2', tag: 'Simple Cabine', prix: 'Prix sur demande', img: '/images/camions/dmax/sc-4x2.jpg', href: '/catalogue/dmax-tfr', specs: ['164 ch', '360 Nm', '4×2'] },
          { nom: 'SC 4×2 Clim', tag: 'Climatisation', prix: 'Prix sur demande', img: '/images/camions/dmax/sc-4x2-clim.jpg', href: '/catalogue/dmax-tfr', specs: ['164 ch', '360 Nm', 'Clim'] },
          { nom: 'Pick-up DC 4×2', tag: 'Double Cabine', prix: 'Prix sur demande', img: '/images/camions/dmax/dc-4x2.jpeg', href: '/catalogue/dmax-tfr', specs: ['5 places', '7 airbags', '4×2'] },
          { nom: 'Pick-up DC 4×4', tag: 'Tout-terrain', prix: 'Prix sur demande', img: '/images/camions/dmax/dc-4x4.jpeg', href: '/catalogue/dmax-tfs', specs: ['5 places', '4×4', 'HDC/HSA'] },
        ],
      },
      {
        id: 'nseries',
        serie: 'Série N',
        subtitle: 'Camions légers & moyens · 3.5T → 9.5T',
        couleur: '#1B2B6B',
        modeles: [
          { nom: 'NMR 77E', tag: '3.5T Court', prix: 'Prix sur demande', img: '/images/camions/serie-n/img1.jpg', href: '/catalogue/nmr-77e', specs: ['3 500 kg', '105 ch', 'EURO IV'] },
          { nom: 'NMR 85H', tag: '3.5T Long', prix: 'Prix sur demande', img: '/images/camions/serie-n/img1.jpg', href: '/catalogue/nmr-85h', specs: ['3 500 kg', '124 ch', 'EURO IV'] },
          { nom: 'NNR 85H', tag: '3.5T Long+', prix: 'Prix sur demande', img: '/images/camions/serie-n/img1.jpg', href: '/catalogue/nnr-85h', specs: ['3 500 kg', '124 ch', '6 rapports'] },
          { nom: 'NPR 75K', tag: '7.5T Court', prix: 'Prix sur demande', img: '/images/camions/serie-n/img2.jpg', href: '/catalogue/npr-75k', specs: ['7 500 kg', '155 ch', 'EURO IV'] },
          { nom: 'NPR 75L', tag: '7.5T Long', prix: 'Prix sur demande', img: '/images/camions/serie-n/img2.jpg', href: '/catalogue/npr-75l', specs: ['7 500 kg', '155 ch', 'EURO IV'] },
          { nom: 'NQR 90K', tag: '9.5T Court', prix: 'Prix sur demande', img: '/images/camions/serie-n/img3.jpg', href: '/catalogue/nqr-90k', specs: ['9 500 kg', '190 ch', 'EURO 5'] },
          { nom: 'NQR 90M', tag: '9.5T Long', prix: 'Prix sur demande', img: '/images/camions/serie-n/img3.jpg', href: '/catalogue/nqr-90m', specs: ['9 500 kg', '190 ch', 'EURO 5'] },
        ],
      },
      {
        id: 'fseries',
        serie: 'Série F',
        subtitle: 'Camions lourds · 16T — 18T',
        couleur: '#333333',
        modeles: [
          { nom: 'FTR 34K', tag: '16T Court', prix: 'Prix sur demande', img: '/images/camions/serie-f/img1.jpg', href: '/catalogue/ftr-34k', specs: ['16 000 kg', 'Châssis court', 'Isuzu F'] },
          { nom: 'FTR 34M', tag: '16T Intermédiaire', prix: 'Prix sur demande', img: '/images/camions/serie-f/img1.jpg', href: '/catalogue/ftr-34m', specs: ['16 000 kg', 'Châssis inter.', 'Isuzu F'] },
          { nom: 'FTR 34P', tag: '16T Long', prix: 'Prix sur demande', img: '/images/camions/serie-f/img2.jpg', href: '/catalogue/ftr-34p', specs: ['16 000 kg', 'Châssis long', 'Isuzu F'] },
          { nom: 'FVR 34K', tag: '18T Court', prix: 'Prix sur demande', img: '/images/camions/serie-f/img2.jpg', href: '/catalogue/fvr-34k', specs: ['18 000 kg', 'Châssis court', 'Isuzu F'] },
          { nom: 'FVR 34P', tag: '18T Long', prix: 'Prix sur demande', img: '/images/camions/serie-f/img3.jpg', href: '/catalogue/fvr-34p', specs: ['18 000 kg', 'Châssis long', 'Isuzu F'] },
        ],
      },
    ],
  },

  // ─── KARRY ───────────────────────────────────────
  {
    id: 'karry',
    nom: 'Karry',
    couleur: '#0057A8',
    accentCouleur: '#0070D8',
    bg: 'linear-gradient(160deg, #f0f6ff 0%, #e8f2ff 100%)',
    description: 'Fourgons utilitaires & véhicules légers',
    logo: 'K',
    tagline: 'Économique · Fiable · Polyvalent',
    series: [
      {
        id: 'karry-fourgon',
        serie: 'Fourgons',
        subtitle: 'Utilitaires compacts & grande capacité',
        couleur: '#0057A8',
        modeles: [
          { nom: 'Karry 22B', tag: 'Fourgon Compact', prix: 'Prix sur demande', img: '/images/karry/karry22b.jpg', href: '/catalogue/karry-22b', specs: ['Compact', 'Économique', 'Utilitaire'] },
          { nom: 'Karry 22Q', tag: 'Fourgon Grande Capa.', prix: 'Prix sur demande', img: '/images/karry/karry22q.jpg', href: '/catalogue/karry-22q', specs: ['Grande capa.', 'Économique', 'Utilitaire'] },
        ],
      },
    ],
  },
]

// ============================================
// HOOK — Animation au scroll
// ============================================
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect() } }, { threshold })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, inView }
}

// ============================================
// COMPOSANT SCROLL HORIZONTAL
// ============================================
function HorizontalScroll({ modeles, couleur }: { modeles: any[]; couleur: string }) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canLeft, setCanLeft] = useState(false)
  const [canRight, setCanRight] = useState(true)

  const checkScroll = () => {
    if (!scrollRef.current) return
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
    setCanLeft(scrollLeft > 0)
    setCanRight(scrollLeft < scrollWidth - clientWidth - 10)
  }

  const scroll = (dir: 'left' | 'right') => {
    scrollRef.current?.scrollBy({ left: dir === 'right' ? 340 : -340, behavior: 'smooth' })
  }

  return (
    <div className="relative group/scroll">
      {canLeft && (
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 z-10 w-11 h-11 bg-white rounded-full shadow-xl border border-gray-100 flex items-center justify-center hover:shadow-2xl hover:scale-110 transition-all duration-200"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </button>
      )}
      <div
        ref={scrollRef}
        onScroll={checkScroll}
        className="flex gap-5 overflow-x-auto pb-4 scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {modeles.map((m, i) => (
          <Link
            key={i}
            href={m.href}
            className="flex-shrink-0 group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-2xl hover:border-transparent hover:-translate-y-1 transition-all duration-300"
            style={{ width: '280px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
          >
            <div className="relative h-48 bg-gray-50 overflow-hidden flex items-center justify-center">
              <img
                src={m.img}
                alt={m.nom}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                style={{ objectFit: 'cover' }}
                onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
              />
              <div className="absolute top-3 left-3 text-white text-[10px] font-black px-2.5 py-1 rounded-full tracking-wide" style={{ background: couleur }}>
                {m.tag}
              </div>
              {/* Shine effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{ background: `linear-gradient(135deg, ${couleur}08 0%, transparent 60%)` }} />
            </div>
            <div className="p-5">
              <h3 className="font-black text-gray-900 text-sm mb-2 tracking-tight">{m.nom}</h3>
              <div className="flex gap-1.5 mb-4 flex-wrap">
                {m.specs.map((spec: string, j: number) => (
                  <span key={j} className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">{spec}</span>
                ))}
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <div>
                  <div className="text-[10px] text-gray-400">Prix indicatif</div>
                  <div className="text-xs font-black" style={{ color: couleur }}>{m.prix}</div>
                </div>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white group-hover:scale-110 group-hover:brightness-90 transition-all" style={{ background: couleur }}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      {canRight && (
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 z-10 w-11 h-11 bg-white rounded-full shadow-xl border border-gray-100 flex items-center justify-center hover:shadow-2xl hover:scale-110 transition-all duration-200"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </button>
      )}
    </div>
  )
}

// ============================================
// COMPOSANT GRILLE (2-3 par ligne)
// ============================================
function GridDisplay({ modeles, couleur }: { modeles: any[]; couleur: string }) {
  return (
    <div className="grid grid-cols-2 gap-8">
      {modeles.map((m, i) => (
        <Link
          key={i}
          href={m.href}
          className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-2xl hover:border-transparent hover:-translate-y-1 transition-all duration-300"
          style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
        >
          <div className="relative h-48 bg-gray-50 overflow-hidden flex items-center justify-center">
            <img
              src={m.img}
              alt={m.nom}
              className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
              onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
            />
            <div className="absolute top-3 left-3 text-white text-[10px] font-black px-2.5 py-1 rounded-full tracking-wide" style={{ background: couleur }}>
              {m.tag}
            </div>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{ background: `linear-gradient(135deg, ${couleur}08 0%, transparent 60%)` }} />
          </div>
          <div className="p-5">
            <h3 className="font-black text-gray-900 text-sm mb-2 tracking-tight">{m.nom}</h3>
            <div className="flex gap-1.5 mb-4 flex-wrap">
              {m.specs.map((spec: string, j: number) => (
                <span key={j} className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">{spec}</span>
              ))}
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <div>
                <div className="text-[10px] text-gray-400">Prix indicatif</div>
                <div className="text-xs font-black" style={{ color: couleur }}>{m.prix}</div>
              </div>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white group-hover:scale-110 group-hover:brightness-90 transition-all" style={{ background: couleur }}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

// ============================================
// COMPOSANT — SECTION SÉRIE
// ============================================
function SerieSection({ serie, delay = 0, useGrid = false }: { serie: any; delay?: number; useGrid?: boolean }) {
  const { ref, inView } = useInView(0.1)
  return (
    <div
      ref={ref}
      className="transition-all pb-8"
      style={{
        borderBottom: '1px solid rgba(0,0,0,0.06)',
        transitionDuration: '2000ms',
        transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(30px)',
        transitionDelay: `${delay}ms`,
      }}
    >
      {/* Header série */}
      <div className="flex items-end justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-1 h-8 rounded-full" style={{ background: serie.couleur }} />
          <div>
            <h3 className="text-lg font-black text-gray-900 leading-none">{serie.serie}</h3>
            <p className="text-gray-400 text-xs mt-0.5">{serie.subtitle} · {serie.modeles.length} modèle{serie.modeles.length > 1 ? 's' : ''}</p>
          </div>
        </div>
        <Link
          href="/catalogue"
          className="hidden md:flex items-center gap-1 text-xs font-bold hover:underline underline-offset-2 transition-all"
          style={{ color: serie.couleur }}
        >
          Voir tout
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
        </Link>
      </div>
      {useGrid
        ? <GridDisplay modeles={serie.modeles} couleur={serie.couleur} />
        : <HorizontalScroll modeles={serie.modeles} couleur={serie.couleur} />
      }
    </div>
  )
}

// ============================================
// COMPOSANT — SECTION MARQUE (grand titre)
// ============================================
function MarqueSection({ marque }: { marque: typeof marques[0] }) {
  const { ref, inView } = useInView(0.08)

  return (
    <section id={marque.id} style={{ background: marque.bg }}>
      {/* ── En-tête marque ── */}
      <div className="relative overflow-hidden">
        {/* Décor fond grand texte */}
        <div
          className="absolute right-0 top-1/2 -translate-y-1/2 font-black text-[12rem] leading-none select-none pointer-events-none opacity-[0.04] tracking-tighter"
          style={{ color: marque.couleur }}
        >
          {marque.nom}
        </div>

        <div
          ref={ref}
          className="max-w-7xl mx-auto px-6 py-16 relative"
        >
          <div
            className="transition-all"
            style={{
              transitionDuration: '2000ms',
              transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateX(0)' : 'translateX(-40px)',
            }}
          >
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-white text-[11px] font-black uppercase tracking-widest mb-5"
              style={{ background: marque.couleur }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white/80 animate-pulse" />
              Gamme {marque.nom}
            </div>

            {/* Nom marque */}
            <h2
              className="font-black leading-none mb-2 tracking-tighter"
              style={{
                fontSize: 'clamp(3rem, 7vw, 5.5rem)',
                color: marque.couleur,
              }}
            >
              {marque.nom}
            </h2>

            {/* Description + tagline */}
            <div className="flex items-center gap-4 mt-3">
              <div className="w-16 h-0.5 rounded-full" style={{ background: marque.couleur }} />
              <div>
                <p className="text-gray-700 font-semibold text-sm">{marque.description}</p>
                <p className="text-gray-400 text-xs mt-0.5">{marque.tagline}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Ligne basse colorée */}
        <div className="h-px w-full" style={{ background: `linear-gradient(90deg, ${marque.couleur}80, transparent)` }} />
      </div>

      {/* ── Séries ── */}
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col gap-20">
        {marque.series.map((serie, i) => (
          <SerieSection key={serie.id} serie={serie} delay={i * 100} useGrid={true} />
        ))}
      </div>

      {/* Séparateur bas */}
      <div className="max-w-7xl mx-auto px-6 pb-6">
        <div className="h-px" style={{ background: `linear-gradient(90deg, transparent, ${marque.couleur}30, transparent)` }} />
      </div>
    </section>
  )
}

// ============================================
// PAGE PRINCIPALE
// ============================================
export default function HomePage() {
  const [heroIndex, setHeroIndex] = useState(0)
  const [transitioning, setTransitioning] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    setProgress(0)
    const duration = 5000
    const interval = 50
    let elapsed = 0

    const prog = setInterval(() => {
      elapsed += interval
      setProgress((elapsed / duration) * 100)
    }, interval)

    const timer = setInterval(() => {
      setTransitioning(true)
      setTimeout(() => {
        setHeroIndex(i => (i + 1) % heroSlides.length)
        setTransitioning(false)
        setProgress(0)
        elapsed = 0
      }, 600)
    }, duration)

    return () => { clearInterval(timer); clearInterval(prog) }
  }, [heroIndex])

  const hero = heroSlides[heroIndex]

  return (
    <main className="bg-white">

      {/* ══════════════════════════════════
          HERO
      ══════════════════════════════════ */}
      <section className="relative overflow-hidden" style={{ height: '75vh', minHeight: '500px', maxHeight: '800px' }}>

        {/* Slides backgrounds */}
        {heroSlides.map((s, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-all duration-700 ease-in-out"
            style={{ opacity: i === heroIndex ? 1 : 0, zIndex: i === heroIndex ? 1 : 0 }}
          >
            <img src={s.img} alt={s.titre} className="absolute inset-0 w-full h-full object-cover" style={{ filter: 'brightness(0.3) saturate(1.3)' }} />
            <div className="absolute inset-0" style={{ background: `linear-gradient(115deg, ${s.couleur}cc 0%, ${s.couleur}44 40%, transparent 70%)` }} />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 55%)' }} />
          </div>
        ))}

        {/* Décors animés */}
        <div className="absolute inset-0 z-[2] pointer-events-none overflow-hidden">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="absolute w-px opacity-10"
              style={{
                right: `${8 + i * 6}%`,
                top: '20%',
                height: '45%',
                background: 'linear-gradient(to bottom, transparent, white, transparent)',
                animation: `pulse ${2.5 + i * 0.8}s ease-in-out ${i * 0.4}s infinite`,
              }}
            />
          ))}
          {/* Cercle décoratif */}
          <div
            className="absolute right-10 top-1/2 -translate-y-1/2 rounded-full border border-white/5 transition-all duration-700"
            style={{ width: '400px', height: '400px', animation: 'spin 30s linear infinite' }}
          />
        </div>

        {/* Contenu hero */}
        <div className="relative z-[3] h-full flex flex-col justify-center pt-20">
          <div className="max-w-7xl mx-auto px-6 w-full">

            {/* Tag */}
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-5 text-white text-xs font-black uppercase tracking-widest transition-all duration-600"
              style={{
                background: hero.couleur,
                opacity: transitioning ? 0 : 1,
                transform: transitioning ? 'translateY(12px)' : 'translateY(0)',
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              CADOZAT · {hero.tag}
            </div>

            {/* Grand titre */}
            <h1
              className="font-black text-white leading-none tracking-tighter transition-all duration-600"
              style={{
                fontSize: 'clamp(4rem, 12vw, 9rem)',
                opacity: transitioning ? 0 : 1,
                transform: transitioning ? 'translateY(24px) scale(0.97)' : 'translateY(0) scale(1)',
              }}
            >
              {hero.titre}
            </h1>

            {/* Sous-titre */}
            <p
              className="text-white/65 text-base mb-10 max-w-xl mt-4 leading-relaxed transition-all duration-600"
              style={{
                transitionDelay: '60ms',
                opacity: transitioning ? 0 : 1,
                transform: transitioning ? 'translateY(16px)' : 'translateY(0)',
              }}
            >
              {hero.soustitre}
            </p>

            {/* CTAs */}
            <div
              className="flex items-center gap-3 flex-wrap transition-all duration-600"
              style={{
                transitionDelay: '100ms',
                opacity: transitioning ? 0 : 1,
                transform: transitioning ? 'translateY(10px)' : 'translateY(0)',
              }}
            >
              <Link
                href="/catalogue"
                className="inline-flex items-center gap-2 text-sm font-bold text-white px-7 py-3.5 rounded-xl hover:brightness-110 transition-all"
                style={{ background: hero.couleur, boxShadow: `0 6px 30px ${hero.couleur}50` }}
              >
                Découvrir la gamme
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
              <a
                href="tel:0524885025"
                className="inline-flex items-center gap-2 text-sm font-semibold text-white px-7 py-3.5 rounded-xl border border-white/25 hover:bg-white/10 transition-all"
                style={{ backdropFilter: 'blur(8px)' }}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" /></svg>
                0524 885 025
              </a>
            </div>
          </div>
        </div>

        {/* Bas : navigation marques + progress */}
        <div className="absolute bottom-8 left-0 right-0 z-[3]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-between gap-6">

              {/* Boutons marques */}
              <div className="flex items-center gap-2 flex-wrap">
                {heroSlides.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => { setTransitioning(true); setTimeout(() => { setHeroIndex(i); setTransitioning(false) }, 300) }}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black text-white transition-all duration-300 border"
                    style={{
                      background: i === heroIndex ? s.couleur : 'rgba(255,255,255,0.08)',
                      borderColor: i === heroIndex ? s.couleur : 'rgba(255,255,255,0.15)',
                      backdropFilter: 'blur(8px)',
                    }}
                  >
                    {i === heroIndex && <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
                    {s.titre}
                  </button>
                ))}
              </div>

              {/* Barre de progression */}
              <div className="hidden md:flex items-center gap-3">
                <div className="w-24 h-0.5 bg-white/15 rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-none" style={{ width: `${progress}%`, background: hero.couleur }} />
                </div>
                <span className="text-white/35 text-xs font-mono">
                  {String(heroIndex + 1).padStart(2, '0')}/{String(heroSlides.length).padStart(2, '0')}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Flèche scroll */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[3] hidden md:block">
          <div className="flex flex-col items-center gap-1 text-white/30 animate-bounce">
            <span className="text-[9px] uppercase tracking-widest">Scroll</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          BANDE STATS
      ══════════════════════════════════ */}
      <section className="bg-[#0f1c3f]">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 divide-x divide-white/10">
            {[
              { v: '3', l: 'Agences au Maroc' },
              { v: '25+', l: 'Modèles disponibles' },
              { v: '3 ans', l: 'Garantie Isuzu' },
              { v: '6j/7', l: 'Service après-vente' },
            ].map((s, i) => (
              <div key={i} className="text-center pl-6 first:pl-0">
                <div className="text-2xl font-black text-white">{s.v}</div>
                <div className="text-white/40 text-xs mt-0.5">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          MARQUES — Isuzu · Karry
      ══════════════════════════════════ */}
      {marques.map(marque => (
        <MarqueSection key={marque.id} marque={marque} />
      ))}

      {/* ══════════════════════════════════
          CTA FINAL
      ══════════════════════════════════ */}
      <section className="py-20 bg-[#0a1428] relative overflow-hidden">
        <div className="absolute inset-0 opacity-25 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#CC0000] rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#C9A84C] rounded-full blur-3xl -translate-x-1/3 translate-y-1/3" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#0057A8] rounded-full blur-3xl" />
        </div>

        {/* Ligne arc-en-ciel */}
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, #CC0000, #0057A8, #C9A84C, #2D9E6B)' }} />

        <div className="relative max-w-2xl mx-auto px-6 text-center">
          <p className="text-xs font-black text-[#C9A84C] uppercase tracking-widest mb-4">Votre partenaire mobilité au Maroc</p>
          <h2 className="text-4xl font-black text-white mb-3 leading-tight">Trouvez votre<br />véhicule idéal</h2>
          <div className="w-10 h-0.5 bg-[#C9A84C] mx-auto mb-6" />
          <p className="text-white/40 text-sm mb-10 leading-relaxed">
            Pick-up, camions, fourgons ou SUV — notre équipe vous conseille<br />dans nos 3 agences : Ouarzazate · Agadir · Tinghir
          </p>
          {/* Mini logos marques */}
          <div className="flex items-center justify-center gap-4 mb-10">
            {[
              { nom: 'Isuzu', c: '#CC0000' },
              { nom: 'Karry', c: '#0057A8' },
              
            ].map(m => (
              <div key={m.nom} className="px-4 py-1.5 rounded-lg border text-xs font-black" style={{ borderColor: m.c + '50', color: m.c, background: m.c + '12' }}>
                {m.nom}
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/catalogue" className="inline-flex items-center gap-2 bg-[#CC0000] hover:bg-[#aa0000] text-white font-bold px-8 py-3.5 rounded-xl transition-all text-sm" style={{ boxShadow: '0 4px 20px rgba(204,0,0,0.4)' }}>
              Voir toute la gamme
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
            <Link href="/devis" className="inline-flex items-center gap-2 hover:bg-white/15 text-white font-bold px-8 py-3.5 rounded-xl border border-white/15 transition-all text-sm" style={{ background: 'rgba(255,255,255,0.08)' }}>
              Demande de devis
            </Link>
            <Link href="/contact" className="inline-flex items-center gap-2 hover:bg-white/15 text-white font-bold px-8 py-3.5 rounded-xl border border-white/15 transition-all text-sm" style={{ background: 'rgba(255,255,255,0.08)' }}>
              Nos agences
            </Link>
          </div>
        </div>
      </section>

    </main>
  )
}