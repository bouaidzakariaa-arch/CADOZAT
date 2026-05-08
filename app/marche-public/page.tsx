'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'

// ─── Scroll Reveal ────────────────────────────────────────────────────────────
function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } }, { threshold })
    obs.observe(el); return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

// ─── Counter animation ────────────────────────────────────────────────────────
function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [val, setVal] = useState(0)
  const { ref, visible } = useInView(0.5)
  useEffect(() => {
    if (!visible) return
    let start = 0
    const step = Math.ceil(target / 40)
    const t = setInterval(() => {
      start += step
      if (start >= target) { setVal(target); clearInterval(t) } else setVal(start)
    }, 30)
    return () => clearInterval(t)
  }, [visible, target])
  return <span ref={ref}>{val}{suffix}</span>
}

// ─── Data ─────────────────────────────────────────────────────────────────────
type Cat = 'transport' | 'btp' | 'citerne' | 'environnement'
type Vehicule = { nom: string; desc: string; cat: Cat; img?: string }

const CAT_META: Record<Cat, { label: string; color: string; accent: string; icon: string }> = {
  transport:    { label: 'Transport',    color: '#CC0000', accent: '#ff6b6b', icon: '📦' },
  btp:          { label: 'BTP',          color: '#1B2B6B', accent: '#4a6cf7', icon: '🏗️' },
  citerne:      { label: 'Citerne',      color: '#0057A8', accent: '#00aaff', icon: '💧' },
  environnement:{ label: 'Environnement',color: '#2D6A4F', accent: '#40c074', icon: '🌿' },
}

const vehicules: Vehicule[] = [
  { nom: 'Pick-up Benne',              desc: 'Benne 2m³ sur Isuzu 3,5T — livraisons urbaines et rurales',                              cat: 'transport',     img: '/images/marche-public/transport/Pick-up Benne 2m-1.png' },
  { nom: 'Camion Caisse',              desc: 'Caisse fermée isotherme ou sèche — Isuzu 3,5T à 7,5T',                                   cat: 'transport',     img: '/images/marche-public/environnement/Camion-Caisse-2.jpg' },
  { nom: 'Camion Transport de Viande', desc: 'Caisse frigorifique homologuée — disponible sur Isuzu 3,5T et 7,5T',                     cat: 'transport',     img: '/images/marche-public/transport/Camion-viande.jpeg'},
  { nom: 'Pick-up Caisse Frigo',       desc: 'Caisse frigorifique poulet & viande sur châssis pick-up',                                cat: 'transport',     img: '/images/marche-public/transport/bickup-frigo.jpg'},
  { nom: 'Camion Benne',               desc: 'Benne basculante 3m³ à 10m³ — Isuzu 3,5T, 7,5T et 18T',                                 cat: 'btp',            img: '/images/marche-public/btp/camion-benne1.jpeg' },
  { nom: 'Porte-Engin',                desc: 'Transport de gros engins de chantier — tracteurs, tractopelles',                         cat: 'btp',           img: '/images/marche-public/transport/porte-engin.png' },
  { nom: 'Camion Citerne Eau & Lait',  desc: 'Citerne eau potable ou inox lait — de 1T pick-up à 10T Isuzu 18T',                      cat: 'citerne',        img: '/images/marche-public/citerne/citerne-eau4.png' },
  { nom: 'Camion Benne Tasseuse',      desc: 'Collecte et compactage ordures ménagères — 7m³ à 14m³',                                  cat: 'environnement', img: '/images/marche-public/environnement/benne-tasseuse1.jpg' },
  { nom: 'Camion Multi-Benne',         desc: 'Collecte sélective et transport de bennes amovibles',                                    cat: 'environnement', img: '/images/marche-public/environnement/multi-benne3.jpg' },
  { nom: 'Camion Nacelle',             desc: 'Travaux en hauteur — nacelle 10m ou 16m, éclairage public',                              cat: 'environnement', img: '/images/marche-public/environnement/nacelle1.jpg' },
]

// ─── Vehicle Card ─────────────────────────────────────────────────────────────
function VehiculeCard({ v, index }: { v: Vehicule; index: number }) {
  const { ref, visible } = useInView()
  const meta = CAT_META[v.cat]
  const col = index % 2

  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'none' : `translateY(48px) translateX(${col === 0 ? '-' : ''}16px)`,
      transition: `all 0.7s cubic-bezier(0.22,1,0.36,1) ${(index % 4) * 80}ms`,
    }}>
      <div className="group relative rounded-3xl overflow-hidden cursor-default"
        style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.07)', boxShadow: '0 4px 24px rgba(0,0,0,0.06)', transition: 'all 0.4s cubic-bezier(0.22,1,0.36,1)' }}
        onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-6px)'; (e.currentTarget as HTMLDivElement).style.boxShadow = `0 20px 60px ${meta.color}20, 0 8px 32px rgba(0,0,0,0.1)` }}
        onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = ''; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 24px rgba(0,0,0,0.06)' }}
      >
        {/* Category stripe */}
        <div style={{ height: '3px', background: `linear-gradient(90deg, ${meta.color}, ${meta.accent})` }} />

        {/* Image zone */}
        <div className="relative overflow-hidden" style={{ height: '200px', background: `linear-gradient(135deg, ${meta.color}08, ${meta.color}15)` }}>
          {v.img ? (
            <>
              <Image src={v.img} alt={v.nom} fill sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: 'cover', transition: 'transform 0.6s cubic-bezier(0.22,1,0.36,1)' }}
                className="group-hover:scale-110" />
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `linear-gradient(to top, ${meta.color}cc 0%, transparent 60%)` }} />
            </>
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <div style={{ fontSize: '52px', filter: 'grayscale(0.3)' }}>{meta.icon}</div>
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: meta.color, opacity: 0.4 }}>Photo bientôt</span>
            </div>
          )}

          {/* Category badge */}
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-white text-xs font-black"
              style={{ background: meta.color, boxShadow: `0 4px 12px ${meta.color}50` }}>
              {meta.icon} {meta.label}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Animated underline title */}
          <h3 className="font-black text-gray-900 mb-2 leading-tight" style={{ fontSize: '15px' }}>
            <span style={{
              backgroundImage: `linear-gradient(${meta.color}, ${meta.color})`,
              backgroundSize: '0% 2px',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: '0 100%',
              transition: 'background-size 0.4s ease',
              paddingBottom: '2px',
            }}
              className="group-hover:[background-size:100%_2px]">
              {v.nom}
            </span>
          </h3>
          <p className="text-xs leading-relaxed" style={{ color: '#94a3b8' }}>{v.desc}</p>

          {/* Bottom dot indicator */}
          <div className="flex items-center gap-1.5 mt-4">
            <div className="w-2 h-2 rounded-full" style={{ background: meta.color }} />
            <div className="w-2 h-2 rounded-full" style={{ background: meta.accent, opacity: 0.5 }} />
            <div className="w-2 h-2 rounded-full" style={{ background: '#e2e8f0' }} />
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Filter Tab ───────────────────────────────────────────────────────────────
function FilterTab({ cat, active, onClick }: { cat: Cat | 'all'; active: boolean; onClick: () => void }) {
  const meta = cat === 'all' ? { label: 'Tous', color: '#0f172a', accent: '#334155', icon: '🚛' } : CAT_META[cat]
  return (
    <button onClick={onClick}
      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-300"
      style={{
        background: active ? meta.color : '#f1f5f9',
        color: active ? '#fff' : '#64748b',
        boxShadow: active ? `0 8px 24px ${meta.color}40` : 'none',
        transform: active ? 'scale(1.05)' : 'scale(1)',
      }}>
      <span>{meta.icon}</span>
      {meta.label}
    </button>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function MarchePublicPage() {
  const [filter, setFilter] = useState<Cat | 'all'>('all')
  const filtered = filter === 'all' ? vehicules : vehicules.filter(v => v.cat === filter)

  return (
    <main style={{ background: '#f8faff', minHeight: '100vh' }}>
      <style>{`
        /* Mesh gradient animation */
        @keyframes meshMove {
          0%,100% { background-position: 0% 50%; }
          50%      { background-position: 100% 50%; }
        }
        @keyframes float1 { 0%,100%{transform:translate(0,0) rotate(0deg)} 33%{transform:translate(40px,-30px) rotate(5deg)} 66%{transform:translate(-20px,20px) rotate(-3deg)} }
        @keyframes float2 { 0%,100%{transform:translate(0,0) rotate(0deg)} 33%{transform:translate(-50px,20px) rotate(-6deg)} 66%{transform:translate(30px,-40px) rotate(4deg)} }
        @keyframes float3 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(20px,30px) scale(1.1)} }
        @keyframes heroReveal { from{opacity:0;transform:translateY(40px) skewY(1deg)} to{opacity:1;transform:translateY(0) skewY(0)} }
        @keyframes lineGrow { from{width:0} to{width:100%} }
        @keyframes scanline { 0%{transform:translateY(-100%)} 100%{transform:translateY(100vh)} }

        .hero-t1 { animation: heroReveal 0.9s cubic-bezier(0.22,1,0.36,1) 0.1s both; }
        .hero-t2 { animation: heroReveal 0.9s cubic-bezier(0.22,1,0.36,1) 0.22s both; }
        .hero-t3 { animation: heroReveal 0.9s cubic-bezier(0.22,1,0.36,1) 0.34s both; }
        .hero-t4 { animation: heroReveal 0.9s cubic-bezier(0.22,1,0.36,1) 0.46s both; }
        .hero-t5 { animation: heroReveal 0.9s cubic-bezier(0.22,1,0.36,1) 0.58s both; }


                .card-hover-title {
          background-image: linear-gradient(currentColor, currentColor);
          background-size: 0% 2px;
          background-repeat: no-repeat;
          background-position: 0 100%;
          transition: background-size 0.4s ease;
        }
        .group:hover .card-hover-title { background-size: 100% 2px; }
      `}</style>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>

        {/* Animated mesh background */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0,
          background: 'linear-gradient(135deg, #f0f4ff 0%, #fff8f8 35%, #f0f9ff 65%, #f5fff8 100%)',
          backgroundSize: '400% 400%',
          animation: 'meshMove 12s ease infinite',
        }} />

        {/* Large abstract shapes */}
        <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '700px', height: '700px', borderRadius: '40% 60% 55% 45% / 45% 55% 45% 55%', background: 'linear-gradient(135deg, rgba(204,0,0,0.06) 0%, rgba(27,43,107,0.08) 100%)', animation: 'float1 18s ease-in-out infinite', zIndex: 0 }} />
        <div style={{ position: 'absolute', bottom: '-80px', left: '-80px', width: '600px', height: '600px', borderRadius: '55% 45% 40% 60% / 60% 40% 60% 40%', background: 'linear-gradient(135deg, rgba(0,87,168,0.06) 0%, rgba(45,106,79,0.07) 100%)', animation: 'float2 22s ease-in-out infinite', zIndex: 0 }} />
        <div style={{ position: 'absolute', top: '40%', left: '45%', width: '350px', height: '350px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)', animation: 'float3 15s ease-in-out infinite', zIndex: 0 }} />

        {/* Dot grid */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, backgroundImage: 'radial-gradient(circle, rgba(15,23,42,0.06) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

        {/* Diagonal accent lines */}
        <div style={{ position: 'absolute', top: 0, left: '20%', width: '1px', height: '100%', background: 'linear-gradient(to bottom, transparent 0%, rgba(204,0,0,0.12) 30%, rgba(204,0,0,0.12) 70%, transparent 100%)', zIndex: 0 }} />
        <div style={{ position: 'absolute', top: 0, right: '20%', width: '1px', height: '100%', background: 'linear-gradient(to bottom, transparent 0%, rgba(27,43,107,0.1) 30%, rgba(27,43,107,0.1) 70%, transparent 100%)', zIndex: 0 }} />

        <div className="relative w-full max-w-7xl mx-auto px-6" style={{ zIndex: 1, paddingTop: '120px', paddingBottom: '80px' }}>

          {/* Breadcrumb */}
          <div className="hero-t1 flex items-center gap-2 mb-12" style={{ color: '#94a3b8', fontSize: '12px', letterSpacing: '0.05em' }}>
            <Link href="/" style={{ color: '#94a3b8', textDecoration: 'none' }}>Accueil</Link>
            <span style={{ color: '#cbd5e1' }}>—</span>
            <span style={{ color: '#CC0000', fontWeight: 700 }}>Marché public</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-20 items-center">

            {/* Left column */}
            <div>
              {/* Eyebrow */}
              <div className="hero-t1 flex items-center gap-3 mb-6">
                <div style={{ width: '32px', height: '2px', background: 'linear-gradient(90deg, #CC0000, #1B2B6B)' }} />
                <span style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '0.25em', color: '#CC0000', textTransform: 'uppercase' }}>CADOZAT · depuis 1996</span>
              </div>

              {/* Main title */}
              <div className="hero-t2 mb-2 overflow-hidden">
                <h1 style={{ fontSize: 'clamp(56px, 8vw, 96px)', fontWeight: 900, lineHeight: 0.88, letterSpacing: '-3px', color: '#0f172a', margin: 0 }}>
                  MARCHÉ
                </h1>
              </div>
              <div className="hero-t2 mb-8 overflow-hidden">
                <h1 style={{ fontSize: 'clamp(56px, 8vw, 96px)', fontWeight: 900, lineHeight: 0.88, letterSpacing: '-3px', margin: 0 }}>
                  PUBLIC
                </h1>
              </div>

              {/* Description */}
              <p className="hero-t3 mb-10" style={{ color: '#64748b', fontSize: '15px', lineHeight: 1.8, maxWidth: '420px' }}>
                Véhicules spéciaux carrossés sur mesure pour communes, collectivités et administrations du Sud Marocain — homologués et conformes.
              </p>

              {/* CTAs */}
              <div className="hero-t4 flex flex-wrap gap-3 mb-10">
                <a href="tel:0524885025"
                  className="inline-flex items-center gap-2.5 font-black text-white px-7 py-4 text-sm"
                  style={{ background: '#CC0000', borderRadius: '14px', boxShadow: '0 12px 40px rgba(204,0,0,0.35)', letterSpacing: '0.02em', transition: 'all 0.3s ease' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1.04)'; (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 16px 48px rgba(204,0,0,0.45)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.transform = ''; (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 12px 40px rgba(204,0,0,0.35)' }}>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" /></svg>
                  0524 885 025
                </a>
                <Link href="/contact"
                  className="inline-flex items-center gap-2 font-bold text-sm px-7 py-4"
                  style={{ color: '#1B2B6B', border: '1.5px solid #c7d2fe', background: '#fff', borderRadius: '14px', letterSpacing: '0.02em', transition: 'all 0.3s ease' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = '#1B2B6B'; (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1.02)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = '#c7d2fe'; (e.currentTarget as HTMLAnchorElement).style.transform = '' }}>
                  Nous contacter
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </Link>
              </div>

              {/* Inline stats row */}
              <div className="hero-t5 flex items-center gap-6 pt-8" style={{ borderTop: '1px solid #e2e8f0' }}>
                {[
                  { n: 19, s: '+', label: 'Véhicules', color: '#CC0000' },
                  { n: 4, s: '', label: 'Catégories', color: '#1B2B6B' },
                  { n: 100, s: '%', label: 'Homologués', color: '#2D6A4F' },
                ].map((s, i) => (
                  <div key={i}>
                    <div style={{ fontSize: '28px', fontWeight: 900, color: s.color, lineHeight: 1 }}>
                      <Counter target={s.n} suffix={s.s} />
                    </div>
                    <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 600, marginTop: '2px' }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right column — category cards */}
            <div className="hero-t5 grid grid-cols-2 gap-4">
              {(Object.entries(CAT_META) as [Cat, typeof CAT_META[Cat]][]).map(([key, m], i) => (
                <div key={key}
                  className="p-6 rounded-3xl cursor-pointer"
                  style={{ background: '#fff', border: `1px solid ${m.color}18`, boxShadow: `0 4px 20px ${m.color}10`, transition: 'all 0.35s cubic-bezier(0.22,1,0.36,1)', animationDelay: `${0.6 + i * 0.1}s` }}
                  onClick={() => setFilter(key)}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.transform = 'translateY(-4px) scale(1.02)'; el.style.boxShadow = `0 16px 40px ${m.color}25` }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.transform = ''; el.style.boxShadow = `0 4px 20px ${m.color}10` }}>
                  {/* Icon circle */}
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-4"
                    style={{ background: `linear-gradient(135deg, ${m.color}15, ${m.color}25)` }}>
                    {m.icon}
                  </div>
                  <div className="font-black text-gray-900 text-sm mb-1">{m.label}</div>
                  <div style={{ height: '2px', width: '24px', background: `linear-gradient(90deg, ${m.color}, ${m.accent})`, borderRadius: '2px' }} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '80px', background: 'linear-gradient(to bottom, transparent, #f8faff)', zIndex: 1 }} />
      </section>

      {/* ── VEHICLES SECTION ──────────────────────────────────────────────── */}
      <section style={{ paddingTop: '80px', paddingBottom: '100px' }}>
        <div className="max-w-7xl mx-auto px-6">

          {/* Section header */}
          <div style={{ marginBottom: '56px' }}>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div>
                <p style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '0.3em', color: '#CC0000', textTransform: 'uppercase', marginBottom: '8px' }}>Notre gamme</p>
                <h2 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 900, color: '#0f172a', letterSpacing: '-1px', margin: 0 }}>
                  Véhicules disponibles
                </h2>
                <div style={{ display: 'flex', gap: '6px', marginTop: '10px' }}>
                  {Object.values(CAT_META).map((m, i) => (
                    <div key={i} style={{ height: '3px', flex: 1, background: `linear-gradient(90deg, ${m.color}, ${m.accent})`, borderRadius: '2px' }} />
                  ))}
                </div>
              </div>

              {/* Filter tabs */}
              <div className="flex flex-wrap gap-2">
                <FilterTab cat="all" active={filter === 'all'} onClick={() => setFilter('all')} />
                {(Object.keys(CAT_META) as Cat[]).map(c => (
                  <FilterTab key={c} cat={c} active={filter === c} onClick={() => setFilter(c)} />
                ))}
              </div>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtered.map((v, i) => (
              <VehiculeCard key={v.nom} v={v} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ─────────────────────────────────────────────────────── */}
      <section style={{ padding: '80px 0', background: '#0f172a', position: 'relative', overflow: 'hidden' }}>
        {/* Background pattern */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(204,0,0,0.12) 0%, transparent 60%)' }} />
        <div style={{ position: 'absolute', bottom: '-80px', left: '-80px', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(27,43,107,0.2) 0%, transparent 60%)' }} />

        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '99px', padding: '6px 16px', marginBottom: '24px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 8px #4ade80', display: 'inline-block' }} />
            <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>Disponible maintenant</span>
          </div>

          <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 900, color: '#fff', letterSpacing: '-1.5px', margin: '0 0 16px' }}>
            Un projet de <span style={{ background: 'linear-gradient(90deg, #CC0000, #ff6b6b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>marché public</span> ?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '15px', lineHeight: 1.7, marginBottom: '36px', maxWidth: '480px', margin: '0 auto 36px' }}>
            Notre équipe accompagne les collectivités dans la constitution de leur dossier et la sélection des véhicules adaptés.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
            <a href="tel:0524885025"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: '#CC0000', color: '#fff', fontWeight: 800, fontSize: '14px', padding: '14px 28px', borderRadius: '14px', textDecoration: 'none', boxShadow: '0 12px 40px rgba(204,0,0,0.4)', transition: 'all 0.3s ease', letterSpacing: '0.02em' }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1.04)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.transform = '' }}>
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" /></svg>
              0524 885 025
            </a>
            <Link href="/contact"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'rgba(255,255,255,0.7)', fontWeight: 700, fontSize: '14px', padding: '14px 28px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.15)', textDecoration: 'none', transition: 'all 0.3s ease' }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.08)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = '' }}>
              Nous contacter →
            </Link>
          </div>
        </div>
      </section>

    </main>
  )
}