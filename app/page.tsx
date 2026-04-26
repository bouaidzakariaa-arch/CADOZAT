'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'


const heroSlides = [
  { titre: 'Isuzu', soustitre: "D-MAX · Série N · Série F — L'excellence japonaise", couleur: '#CC0000', tag: 'Pick-ups & Camions', img: '/images/camions/dmax/dc-4x4.jpeg' },
  { titre: 'Karry', soustitre: 'Fourgons utilitaires — Robustesse & économie', couleur: '#0057A8', tag: 'Utilitaires', img: '/images/karry/karry22b.jpg' },
]

const marques = [
  {
    id: 'isuzu', nom: 'Isuzu', couleur: '#CC0000',
    bg: '#fff', description: 'Pick-ups & Camions professionnels', tagline: 'La fiabilité japonaise depuis 1916',
    series: [
      { id: 'dmax', serie: 'D-MAX', subtitle: 'Pick-up professionnel', couleur: '#CC0000', modeles: [
        { nom: 'Pick-up SC 4×2 EURO 6', tag: 'Simple Cabine', prix: 'Prix sur demande', img: '/images/camions/dmax/sc-4x2.png', href: '/catalogue/dmax-tfr', specs: ['164 ch', '360 Nm', '4×2'] },
      ]},
      { id: 'nseries', serie: 'Série N', subtitle: 'Camions légers & moyens · 3.5T → 9.5T', couleur: '#1B2B6B', modeles: [
        { nom: 'NMR 77E', tag: '3.5T Court', prix: 'Prix sur demande', img: '/images/camions/serie-n/img1.jpg', href: '/catalogue/nmr-77e', specs: ['3 500 kg', '105 ch', 'EURO IV'] },
        { nom: 'NMR 85H', tag: '3.5T Long', prix: 'Prix sur demande', img: '/images/camions/serie-n/img1.jpg', href: '/catalogue/nmr-85h', specs: ['3 500 kg', '124 ch', 'EURO IV'] },
        { nom: 'NNR 85H', tag: '3.5T Long+', prix: 'Prix sur demande', img: '/images/camions/serie-n/img1.jpg', href: '/catalogue/nnr-85h', specs: ['3 500 kg', '124 ch', '6 rapports'] },
        { nom: 'NPR 75K', tag: '7.5T Court', prix: 'Prix sur demande', img: '/images/camions/serie-n/img2.jpg', href: '/catalogue/npr-75k', specs: ['7 500 kg', '155 ch', 'EURO IV'] },
        { nom: 'NPR 75L', tag: '7.5T Long', prix: 'Prix sur demande', img: '/images/camions/serie-n/img2.jpg', href: '/catalogue/npr-75l', specs: ['7 500 kg', '155 ch', 'EURO IV'] },
        { nom: 'NQR 90K', tag: '9.5T Court', prix: 'Prix sur demande', img: '/images/camions/serie-n/img3.jpg', href: '/catalogue/nqr-90k', specs: ['9 500 kg', '190 ch', 'EURO 5'] },
        { nom: 'NQR 90M', tag: '9.5T Long', prix: 'Prix sur demande', img: '/images/camions/serie-n/img3.jpg', href: '/catalogue/nqr-90m', specs: ['9 500 kg', '190 ch', 'EURO 5'] },
      ]},
      { id: 'fseries', serie: 'Série F', subtitle: 'Camions lourds · 16T — 18T', couleur: '#374151', modeles: [
        { nom: 'FTR 34K', tag: '16T Court', prix: 'Prix sur demande', img: '/images/camions/serie-f/ftr-34k.jpg', href: '/catalogue/ftr-34k', specs: ['16 000 kg', 'Châssis court', '240 ch'] },
        { nom: 'FTR 34M', tag: '16T Intermédiaire', prix: 'Prix sur demande', img: '/images/camions/serie-f/ftr-34m.jpg', href: '/catalogue/ftr-34m', specs: ['16 000 kg', 'Châssis inter.', '240 ch'] },
        { nom: 'FTR 34P', tag: '16T Long', prix: 'Prix sur demande', img: '/images/camions/serie-f/ftr-34p.jpg', href: '/catalogue/ftr-34p', specs: ['16 000 kg', 'Châssis long', '240 ch'] },
        { nom: 'FVR 34K', tag: '18T Court', prix: 'Prix sur demande', img: '/images/camions/serie-f/fvr-34k.jpg', href: '/catalogue/fvr-34k', specs: ['18 000 kg', 'Châssis court', '240 ch'] },
        { nom: 'FVR 34P', tag: '18T Long', prix: 'Prix sur demande', img: '/images/camions/serie-f/fvr-34p.jpg', href: '/catalogue/fvr-34p', specs: ['18 000 kg', 'Châssis long', '240 ch'] },
      ]},
    ],
  },
  {
    id: 'karry', nom: 'Karry', couleur: '#0057A8',
    bg: '#f8faff', description: 'Fourgons utilitaires & véhicules légers', tagline: 'Économique · Fiable · Polyvalent',
    series: [
      { id: 'karry-fourgon', serie: 'Fourgons', subtitle: 'Utilitaires compacts & grande capacité', couleur: '#0057A8', modeles: [
        { nom: 'Karry 22B', tag: 'Fourgon Compact', prix: 'Prix sur demande', img: '/images/karry/karry22b.jpg', href: '/catalogue/karry-22b', specs: ['Compact', 'Économique', 'Utilitaire'] },
        { nom: 'Karry 22Q', tag: 'Fourgon Grande Capa.', prix: 'Prix sur demande', img: '/images/karry/karry22q.jpg', href: '/catalogue/karry-22q', specs: ['Grande capa.', 'Économique', 'Utilitaire'] },
      ]},
    ],
  },
]

/* ── Hook InView ── */
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

/* ── Carte modèle ── */
function ModelCard({ m, couleur, index }: { m: any; couleur: string; index: number }) {
  const ref = useRef<HTMLAnchorElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect() }
    }, { threshold: 0.1 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <Link
      ref={ref}
      href={m.href}
      className="group block bg-white rounded-2xl overflow-hidden"
      style={{
        border: '1px solid rgba(0,0,0,0.07)',
        boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(32px) scale(0.97)',
        transition: `opacity 0.5s cubic-bezier(0.22,1,0.36,1) ${index * 80}ms, transform 0.5s cubic-bezier(0.22,1,0.36,1) ${index * 80}ms, box-shadow 0.2s, border-color 0.2s`,
      }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 40px rgba(0,0,0,0.13)'; (e.currentTarget as HTMLElement).style.borderColor = couleur + '50' }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 16px rgba(0,0,0,0.06)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,0,0,0.07)' }}
    >
      {/* Image */}
      <div className="relative overflow-hidden flex items-center justify-center" style={{ height: 180, background: '#f5f6f8' }}>
        <img
          src={m.img}
          alt={m.nom}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
          style={{ padding: '16px' }}
          onError={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = '0' }}
        />
        {/* Badge */}
        <span className="absolute top-3 left-3 text-white text-[10px] font-bold px-2.5 py-1 rounded-full" style={{ background: couleur }}>
          {m.tag}
        </span>
      </div>

      {/* Séparateur couleur */}
      <div style={{ height: 2, background: `linear-gradient(90deg, ${couleur}, ${couleur}00)` }} />

      {/* Infos */}
      <div className="p-4">
        <p className="font-bold text-gray-900 text-sm mb-2">{m.nom}</p>
        <div className="flex gap-1.5 flex-wrap mb-4">
          {m.specs.map((s: string, j: number) => (
            <span key={j} className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
              style={{ background: couleur + '12', color: couleur }}>{s}</span>
          ))}
        </div>
        <div className="flex items-center justify-between pt-3" style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}>
          <span className="text-xs font-bold" style={{ color: couleur }}>{m.prix}</span>
          <div className="flex items-center gap-1 text-xs font-semibold group-hover:gap-2 transition-all" style={{ color: couleur }}>
            Voir
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </div>
        </div>
      </div>
    </Link>
  )
}

/* ── Section série ── */
function SerieSection({ serie }: { serie: any }) {
  const { ref, inView } = useInView(0.08)

  return (
    <div ref={ref} className="mb-16">
      {/* Header série */}
      <div className="flex items-center justify-between mb-8"
        style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateX(0)' : 'translateX(-24px)', transition: 'all 0.6s cubic-bezier(0.22,1,0.36,1)' }}>
        <div className="flex items-center gap-3">
          <div className="w-1 h-10 rounded-full" style={{ background: serie.couleur }} />
          <div>
            <h3 className="text-xl font-black text-gray-900">{serie.serie}</h3>
            <p className="text-gray-400 text-xs mt-0.5">{serie.subtitle} · {serie.modeles.length} modèle{serie.modeles.length > 1 ? 's' : ''}</p>
          </div>
        </div>
        <Link href="/catalogue" className="text-xs font-bold flex items-center gap-1 hover:gap-2 transition-all" style={{ color: serie.couleur }}>
          Voir tout
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
          </svg>
        </Link>
      </div>

      {/* Grille cartes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {serie.modeles.map((m: any, i: number) => (
          <ModelCard key={i} m={m} couleur={serie.couleur} index={i} />
        ))}
      </div>
    </div>
  )
}

/* ── Particules canvas ── */
function AnimatedBg({ couleur }: { couleur: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let W = canvas.offsetWidth
    let H = canvas.offsetHeight
    canvas.width = W
    canvas.height = H

    const onResize = () => {
      W = canvas.offsetWidth
      H = canvas.offsetHeight
      canvas.width = W
      canvas.height = H
    }
    window.addEventListener('resize', onResize)

    // Parse hex to rgb
    const r = parseInt(couleur.slice(1,3),16)
    const g = parseInt(couleur.slice(3,5),16)
    const b = parseInt(couleur.slice(5,7),16)

    const N = 55
    const pts = Array.from({ length: N }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 2.2 + 0.8,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      op: Math.random() * 0.35 + 0.1,
    }))

    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      pts.forEach(p => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = W
        if (p.x > W) p.x = 0
        if (p.y < 0) p.y = H
        if (p.y > H) p.y = 0
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${r},${g},${b},${p.op})`
        ctx.fill()
      })
      // Draw lines between close pts
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x
          const dy = pts[i].y - pts[j].y
          const dist = Math.sqrt(dx*dx + dy*dy)
          if (dist < 120) {
            ctx.beginPath()
            ctx.moveTo(pts[i].x, pts[i].y)
            ctx.lineTo(pts[j].x, pts[j].y)
            ctx.strokeStyle = `rgba(${r},${g},${b},${0.06 * (1 - dist/120)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }
      animId = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', onResize) }
  }, [couleur])

  return (
    <canvas ref={canvasRef} style={{ position:'absolute', inset:0, width:'100%', height:'100%', zIndex:0, pointerEvents:'none' }}/>
  )
}

/* ── Section marque ── */
function MarqueSection({ marque }: { marque: typeof marques[0] }) {
  const { ref, inView } = useInView(0.05)

  return (
    <section id={marque.id} className="relative" style={{ background: '#fff' }}>
      <AnimatedBg couleur={marque.couleur} />
      {/* En-tête marque */}
      <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-12" style={{ zIndex: 1 }}>
        <div ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(24px)', transition: 'all 0.7s cubic-bezier(0.22,1,0.36,1)' }}>
          <span className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-white px-4 py-1.5 rounded-full mb-5"
            style={{ background: marque.couleur }}>
            <span className="w-1.5 h-1.5 rounded-full bg-white/80 animate-pulse" />
            Gamme {marque.nom}
          </span>
          <h2 className="font-black leading-none tracking-tighter mb-3"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', color: marque.couleur }}>
            {marque.nom}
          </h2>
          <div className="flex items-center gap-4">
            <div className="w-14 h-0.5 rounded-full" style={{ background: marque.couleur }} />
            <div>
              <p className="text-gray-700 font-semibold text-sm">{marque.description}</p>
              <p className="text-gray-400 text-xs">{marque.tagline}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Séries */}
      <div className="relative max-w-7xl mx-auto px-6 pb-16" style={{ zIndex: 1 }}>
        {marque.series.map(serie => (
          <SerieSection key={serie.id} serie={serie} />
        ))}
      </div>

      {/* Séparateur */}
      <div className="relative max-w-7xl mx-auto px-6 pb-8" style={{ zIndex: 1 }}>
        <div className="h-px" style={{ background: `linear-gradient(90deg, transparent, ${marque.couleur}25, transparent)` }} />
      </div>
    </section>
  )
}

/* ── Page principale ── */
export default function HomePage() {
  const [heroIndex, setHeroIndex] = useState(0)
  const [transitioning, setTransitioning] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    setProgress(0)
    let elapsed = 0
    const duration = 5000
    const prog = setInterval(() => { elapsed += 50; setProgress((elapsed / duration) * 100) }, 50)
    const timer = setInterval(() => {
      setTransitioning(true)
      setTimeout(() => { setHeroIndex(i => (i + 1) % heroSlides.length); setTransitioning(false); setProgress(0); elapsed = 0 }, 600)
    }, duration)
    return () => { clearInterval(timer); clearInterval(prog) }
  }, [heroIndex])

  const hero = heroSlides[heroIndex]

  return (
    <main className="bg-white">

      {/* HERO */}
      <section className="relative overflow-hidden" style={{ height: '75vh', minHeight: '520px', maxHeight: '800px' }}>
        {heroSlides.map((s, i) => (
          <div key={i} className="absolute inset-0 transition-all duration-700"
            style={{ opacity: i === heroIndex ? 1 : 0, zIndex: i === heroIndex ? 1 : 0,
              background: i === 0
                ? 'linear-gradient(135deg, #1a0000 0%, #CC0000 40%, #ff6b35 75%, #fff5f0 100%)'
                : 'linear-gradient(135deg, #001428 0%, #0057A8 40%, #0099ff 75%, #f0f8ff 100%)'
            }}>
            {/* Cercles décoratifs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute rounded-full" style={{
                width: 600, height: 600, right: -100, top: -150,
                background: i === 0 ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.06)'
              }}/>
              <div className="absolute rounded-full" style={{
                width: 400, height: 400, right: 80, top: -50,
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.05)'
              }}/>
              <div className="absolute rounded-full" style={{
                width: 200, height: 200, right: 220, top: 80,
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.08)'
              }}/>
              {/* Lignes diagonales décoratives */}
              {[...Array(6)].map((_, j) => (
                <div key={j} className="absolute" style={{
                  width: 1, height: '120%', right: `${15 + j * 8}%`, top: '-10%',
                  background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.06), transparent)',
                  transform: 'rotate(15deg)',
                }}/>
              ))}
            </div>
          </div>
        ))}

        <div className="relative z-[3] h-full flex flex-col justify-center pt-20">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-5 text-white text-xs font-black uppercase tracking-widest"
              style={{ background: hero.couleur, opacity: transitioning ? 0 : 1, transform: transitioning ? 'translateY(10px)' : 'translateY(0)', transition: 'all 0.4s' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              CADOZAT · {hero.tag}
            </div>
            <h1 className="font-black text-white leading-none tracking-tighter"
              style={{ fontSize: 'clamp(4rem, 11vw, 8.5rem)', opacity: transitioning ? 0 : 1, transform: transitioning ? 'translateY(20px)' : 'translateY(0)', transition: 'all 0.45s 0.05s' }}>
              {hero.titre}
            </h1>
            <p className="text-white/60 text-base mt-4 mb-10 max-w-lg leading-relaxed"
              style={{ opacity: transitioning ? 0 : 1, transform: transitioning ? 'translateY(14px)' : 'translateY(0)', transition: 'all 0.45s 0.08s' }}>
              {hero.soustitre}
            </p>
            <div className="flex gap-3 flex-wrap"
              style={{ opacity: transitioning ? 0 : 1, transition: 'all 0.45s 0.1s' }}>
              <Link href="/catalogue" className="inline-flex items-center gap-2 text-sm font-bold text-white px-7 py-3.5 rounded-xl hover:brightness-110 transition-all"
                style={{ background: hero.couleur, boxShadow: `0 6px 28px ${hero.couleur}50` }}>
                Découvrir la gamme
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
              <a href="tel:0524885025" className="inline-flex items-center gap-2 text-sm font-semibold text-white px-7 py-3.5 rounded-xl border border-white/20 hover:bg-white/10 transition-all">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" /></svg>
                0524 885 025
              </a>
            </div>
          </div>
        </div>

        {/* Nav marques + progress */}
        <div className="absolute bottom-7 left-0 right-0 z-[3]">
          <div className="max-w-7xl mx-auto px-6 flex items-center justify-between gap-6">
            <div className="flex gap-2">
              {heroSlides.map((s, i) => (
                <button key={i}
                  onClick={() => { setTransitioning(true); setTimeout(() => { setHeroIndex(i); setTransitioning(false) }, 300) }}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black text-white border transition-all duration-300"
                  style={{ background: i === heroIndex ? s.couleur : 'rgba(255,255,255,0.08)', borderColor: i === heroIndex ? s.couleur : 'rgba(255,255,255,0.15)' }}>
                  {i === heroIndex && <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
                  {s.titre}
                </button>
              ))}
            </div>
            <div className="hidden md:flex items-center gap-3">
              <div className="w-20 h-0.5 bg-white/15 rounded-full overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${progress}%`, background: hero.couleur, transition: 'none' }} />
              </div>
              <span className="text-white/30 text-xs font-mono">{String(heroIndex + 1).padStart(2,'0')}/{String(heroSlides.length).padStart(2,'0')}</span>
            </div>
          </div>
        </div>

        <div className="absolute bottom-7 left-1/2 -translate-x-1/2 z-[3] hidden md:block">
          <div className="flex flex-col items-center gap-1 text-white/25 animate-bounce">
            <span className="text-[9px] uppercase tracking-widest">Scroll</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={{ background: '#0f1c3f' }}>
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 divide-x divide-white/10">
            {[{ v: '3', l: 'Agences au Maroc' }, { v: '25+', l: 'Modèles disponibles' }, { v: '3 ans', l: 'Garantie Isuzu' }, { v: '6j/7', l: 'Service après-vente' }].map((s, i) => (
              <div key={i} className="text-center pl-6 first:pl-0">
                <div className="text-2xl font-black text-white">{s.v}</div>
                <div className="text-white/40 text-xs mt-0.5">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MARQUES */}
      {marques.map(marque => <MarqueSection key={marque.id} marque={marque} />)}

      {/* CTA FINAL */}
      <section className="py-20 relative overflow-hidden" style={{ background: '#0a1428' }}>
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" style={{ background: '#CC0000' }} />
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3" style={{ background: '#C9A84C' }} />
        </div>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, #CC0000, #0057A8, #C9A84C)' }} />
        <div className="relative max-w-2xl mx-auto px-6 text-center">
          <p className="text-xs font-black uppercase tracking-widest mb-4" style={{ color: '#C9A84C' }}>Votre partenaire mobilité au Maroc</p>
          <h2 className="text-4xl font-black text-white mb-3 leading-tight">Trouvez votre<br />véhicule idéal</h2>
          <div className="w-10 h-0.5 mx-auto mb-6" style={{ background: '#C9A84C' }} />
          <p className="text-white/40 text-sm mb-10 leading-relaxed">
            Pick-up, camions, fourgons — notre équipe vous conseille<br />dans nos 3 agences : Ouarzazate · Agadir · Tinghir
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/catalogue" className="inline-flex items-center gap-2 text-white font-bold px-8 py-3.5 rounded-xl text-sm transition-all hover:brightness-110"
              style={{ background: '#CC0000', boxShadow: '0 4px 20px rgba(204,0,0,0.4)' }}>
              Voir toute la gamme
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
            <Link href="/devis" className="inline-flex items-center gap-2 text-white font-bold px-8 py-3.5 rounded-xl border border-white/15 text-sm hover:bg-white/10 transition-all" style={{ background: 'rgba(255,255,255,0.06)' }}>
              Demande de devis
            </Link>
          </div>
        </div>
      </section>

    </main>
  )
}