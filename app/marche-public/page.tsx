'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'

function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect() }
    }, { threshold })
    obs.observe(el); return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [val, setVal] = useState(0)
  const { ref, visible } = useInView(0.5)
  useEffect(() => {
    if (!visible) return
    let start = 0; const step = Math.ceil(target / 40)
    const t = setInterval(() => { start += step; if (start >= target) { setVal(target); clearInterval(t) } else setVal(start) }, 30)
    return () => clearInterval(t)
  }, [visible, target])
  return <span ref={ref}>{val}{suffix}</span>
}

type Cat = 'benne' | 'citerne' | 'frigorifique' | 'voirie' | 'ampliroll' | 'medical' | 'transport'

type Vehicule = {
  nom: string
  desc: string
  cat: Cat
  specs?: string[]
  img?: string
}

const CAT_META: Record<Cat, { label: string; color: string; accent: string; icon: string }> = {
  benne:        { label: 'Bennes',              color: '#CC0000', accent: '#ff6b6b', icon: '🗑️' },
  citerne:      { label: 'Citernes',            color: '#0057A8', accent: '#00aaff', icon: '💧' },
  frigorifique: { label: 'Frigorifique',        color: '#0891b2', accent: '#38bdf8', icon: '❄️' },
  voirie:       { label: 'Nettoyage & Voirie',  color: '#2D6A4F', accent: '#40c074', icon: '🌿' },
  ampliroll:    { label: 'Ampliroll',           color: '#1B2B6B', accent: '#4a6cf7', icon: '🏗️' },
  medical:      { label: 'Véhicules médicaux',  color: '#dc2626', accent: '#f87171', icon: '🚑' },
  transport:    { label: 'Transport scolaire',  color: '#7c3aed', accent: '#a78bfa', icon: '🚌' },
}

const vehicules: Vehicule[] = [
  // ── BENNES ──
  { nom: 'Pick-up avec benne',           desc: 'Benne 1 m³ sur châssis pick-up Isuzu',                    cat: 'benne',        specs: ['1 m³', 'Pick-up', 'Isuzu'] },
  { nom: 'Camion benne 3 m³',            desc: 'Benne basculante 3 m³ sur Isuzu 3,5 T',                   cat: 'benne',        specs: ['3 m³', '3,5 T', 'Isuzu'],    img: '/images/marche-public/btp/camion-benne1.jpeg' },
  { nom: 'Camion benne 5 m³',            desc: 'Benne basculante 5 m³ sur Isuzu 7,5 T',                   cat: 'benne',        specs: ['5 m³', '7,5 T', 'Isuzu'],    img: '/images/marche-public/btp/camion-benne1.jpeg' },
  { nom: 'Camion benne 8 m³',            desc: 'Benne basculante 8 m³ sur Isuzu 16 T',                    cat: 'benne',        specs: ['8 m³', '16 T', 'Isuzu'] },
  { nom: 'Camion benne 10 m³',           desc: 'Benne basculante 10 m³ sur Isuzu 18 T',                   cat: 'benne',        specs: ['10 m³', '18 T', 'Isuzu'] },
  { nom: 'Camion benne salité 3 m³',     desc: 'Benne salité 3 m³ sur Iveco 3,5 T',                       cat: 'benne',        specs: ['3 m³', '3,5 T', 'Iveco'] },
  { nom: 'Camion benne salité 5 m³',     desc: 'Benne salité 5 m³ sur Iveco 7,5 T',                       cat: 'benne',        specs: ['5 m³', '7,5 T', 'Iveco'] },
  { nom: 'Benne tasseuse 7 m³',          desc: 'Collecte & compactage ordures 7 m³ sur Isuzu 7,5 T',      cat: 'benne',        specs: ['7 m³', '7,5 T', 'Isuzu'],    img: '/images/marche-public/environnement/benne-tasseuse1.jpg' },
  { nom: 'Benne tasseuse 9 m³',          desc: 'Collecte & compactage ordures 9 m³ sur 9,5 T',            cat: 'benne',        specs: ['9 m³', '9,5 T', 'Isuzu'],    img: '/images/marche-public/environnement/benne-tasseuse1.jpg' },
  { nom: 'Benne tasseuse 12 m³',         desc: 'Collecte & compactage ordures 12 m³ sur 16 T',            cat: 'benne',        specs: ['12 m³', '16 T', 'Isuzu'],    img: '/images/marche-public/environnement/benne-tasseuse1.jpg' },
  { nom: 'Benne tasseuse 14 m³',         desc: 'Collecte & compactage ordures 14 m³ sur Isuzu 18 T',      cat: 'benne',        specs: ['14 m³', '18 T', 'Isuzu'],    img: '/images/marche-public/environnement/benne-tasseuse1.jpg' },

  // ── CITERNES ──
  { nom: 'Citerne pick-up 1 T',          desc: 'Citerne eau/lait 1 T sur pick-up Isuzu',                  cat: 'citerne',      specs: ['1 T', 'Pick-up', 'Isuzu'],   img: '/images/marche-public/citerne/citerne-eau4.png' },
  { nom: 'Camion citerne 3 T',           desc: 'Camion citerne eau/lait 3 T sur 3,5 T',                   cat: 'citerne',      specs: ['3 T', '3,5 T', 'Isuzu'],     img: '/images/marche-public/citerne/citerne-eau4.png' },
  { nom: 'Camion citerne 4 T',           desc: 'Camion citerne eau/lait 4 T sur 7,5 T',                   cat: 'citerne',      specs: ['4 T', '7,5 T', 'Isuzu'],     img: '/images/marche-public/citerne/citerne-eau4.png' },
  { nom: 'Camion citerne 5 T',           desc: 'Camion citerne eau/lait 5 T sur 9,5 T',                   cat: 'citerne',      specs: ['5 T', '9,5 T', 'Isuzu'],     img: '/images/marche-public/citerne/citerne-eau4.png' },
  { nom: 'Camion citerne 8 T',           desc: 'Camion citerne eau/lait 8 T sur 16 T',                    cat: 'citerne',      specs: ['8 T', '16 T', 'Isuzu'],      img: '/images/marche-public/citerne/citerne-eau4.png' },
  { nom: 'Camion citerne 10 T',          desc: 'Camion citerne eau/lait 10 T sur 18 T',                   cat: 'citerne',      specs: ['10 T', '18 T', 'Isuzu'],     img: '/images/marche-public/citerne/citerne-eau4.png' },

  // ── FRIGORIFIQUE ──
  { nom: 'Camion frigo viande 3,5 T',    desc: 'Transport viande — caisse frigorifique sur 3,5 T',         cat: 'frigorifique', specs: ['3,5 T', 'Frigo', 'Isuzu'],   img: '/images/marche-public/transport/Camion-viande.jpeg' },
  { nom: 'Camion frigo viande 7,5 T',    desc: 'Transport viande — caisse frigorifique sur 7,5 T',         cat: 'frigorifique', specs: ['7,5 T', 'Frigo', 'Isuzu'],   img: '/images/marche-public/transport/Camion-viande.jpeg' },
  { nom: 'Pick-up caisse frigorifique',  desc: 'Pick-up avec caisse frigorifique pour viande et poulet',   cat: 'frigorifique', specs: ['Pick-up', 'Frigo', 'Isuzu'],  img: '/images/marche-public/transport/bickup-frigo.jpg' },

  // ── NETTOYAGE & VOIRIE ──
  { nom: 'Camion nacelle 12 m',          desc: 'Travaux en hauteur — nacelle 12 m sur Iveco 3,5 T',        cat: 'voirie',       specs: ['12 m', '3,5 T', 'Iveco'],    img: '/images/marche-public/environnement/nacelle1.jpg' },
  { nom: 'Camion nacelle 16 m',          desc: 'Éclairage public & travaux — nacelle 16 m sur Isuzu 7,5 T',cat: 'voirie',       specs: ['16 m', '7,5 T', 'Isuzu'],    img: '/images/marche-public/environnement/nacelle1.jpg' },
  { nom: 'Camion hydrocureur 5 m³',      desc: 'Curage & nettoyage réseaux — hydrocureur 5 m³ sur 7,5 T', cat: 'voirie',       specs: ['5 m³', '7,5 T', 'Isuzu'] },

  // ── AMPLIROLL ──
  { nom: 'Camion Ampliroll 5 T',         desc: 'Transport bennes amovibles — Ampliroll 5 T sur 7,5 T',     cat: 'ampliroll',    specs: ['5 T', '7,5 T', 'Isuzu'],     img: '/images/marche-public/environnement/multi-benne3.jpg' },
  { nom: 'Camion Ampliroll 10 T',        desc: 'Transport bennes amovibles — Ampliroll 10 T sur 16 T',     cat: 'ampliroll',    specs: ['10 T', '16 T', 'Isuzu'],     img: '/images/marche-public/environnement/multi-benne3.jpg' },

  // ── MÉDICAL ──
  { nom: 'Ambulance fourgonnée',         desc: 'Ambulance équipée sur base fourgonnée',                    cat: 'medical',      specs: ['Fourgon', 'Équipée', 'Méd.'] },
  { nom: 'Ambulance 4×4',                desc: 'Ambulance tout-terrain sur châssis 4×4',                   cat: 'medical',      specs: ['4×4', 'Tout-terrain', 'Méd.'] },
  { nom: 'Unité mobile 3,5 T',           desc: 'Unité médicale mobile sur châssis 3,5 T',                  cat: 'medical',      specs: ['3,5 T', 'Mobile', 'Méd.'] },

  // ── TRANSPORT SCOLAIRE ──
  { nom: 'Transport scolaire 17 places', desc: 'Minibus scolaire 17 places homologué',                     cat: 'transport',    specs: ['17 places', 'Scolaire', 'Homologué'] },
  { nom: 'Transport scolaire 23 places', desc: 'Minibus scolaire 23 places homologué',                     cat: 'transport',    specs: ['23 places', 'Scolaire', 'Homologué'] },
  { nom: 'Transport personnel 15 places',desc: 'Véhicule transport de personnel 15 places',                cat: 'transport',    specs: ['15 places', 'Personnel', 'Homologué'] },
]

function VehiculeCard({ v, index }: { v: Vehicule; index: number }) {
  const { ref, visible } = useInView()
  const meta = CAT_META[v.cat]
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(36px)', transition: `all 0.6s cubic-bezier(0.22,1,0.36,1) ${(index % 4) * 80}ms` }}>
      <div style={{ background: '#fff', borderRadius: '18px', overflow: 'hidden', border: '1px solid #eef2ff', boxShadow: '0 2px 14px rgba(0,0,0,0.05)', transition: 'all 0.3s ease', height: '100%' }}
        onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.transform = 'translateY(-5px)'; el.style.boxShadow = `0 18px 44px ${meta.color}16` }}
        onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.transform = ''; el.style.boxShadow = '0 2px 14px rgba(0,0,0,0.05)' }}>
        <div style={{ height: '3px', background: `linear-gradient(90deg,${meta.color},${meta.accent})` }} />
        <div style={{ position: 'relative', height: '180px', background: `${meta.color}07`, overflow: 'hidden' }}>
          {v.img
            ? <Image src={v.img} alt={v.nom} fill sizes="(max-width:768px) 100vw,50vw" style={{ objectFit: 'cover', transition: 'transform 0.5s ease' }}
                onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.06)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.transform = '' }} />
            : <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '52px' }}>{meta.icon}</div>
          }
          <div style={{ position: 'absolute', top: '10px', left: '10px', display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '4px 10px', borderRadius: '99px', background: meta.color, color: '#fff', fontSize: '11px', fontWeight: 800 }}>
            {meta.icon} {meta.label}
          </div>
        </div>
        <div style={{ padding: '16px 18px' }}>
          <h3 style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a', margin: '0 0 5px', lineHeight: 1.3 }}>{v.nom}</h3>
          <p style={{ fontSize: '11px', color: '#94a3b8', lineHeight: 1.6, margin: '0 0 10px' }}>{v.desc}</p>
          {v.specs && (
            <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
              {v.specs.map((s, i) => (
                <span key={i} style={{ fontSize: '10px', fontWeight: 700, padding: '2px 8px', borderRadius: '99px', background: meta.color + '12', color: meta.color }}>{s}</span>
              ))}
            </div>
          )}
          <div style={{ display: 'flex', gap: '5px', marginTop: '12px' }}>
            <div style={{ width: '18px', height: '3px', borderRadius: '2px', background: meta.color }} />
            <div style={{ width: '9px', height: '3px', borderRadius: '2px', background: meta.accent, opacity: 0.5 }} />
          </div>
        </div>
      </div>
    </div>
  )
}

function FilterTab({ cat, active, onClick }: { cat: Cat | 'all'; active: boolean; onClick: () => void }) {
  const meta = cat === 'all' ? { label: 'Tous', color: '#0f172a', icon: '🚛' } : CAT_META[cat]
  return (
    <button onClick={onClick} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '7px 14px', borderRadius: '99px', border: 'none', fontSize: '12px', fontWeight: 700, cursor: 'pointer', background: active ? meta.color : '#f1f5f9', color: active ? '#fff' : '#64748b', boxShadow: active ? `0 6px 18px ${meta.color}30` : 'none', transform: active ? 'scale(1.04)' : 'scale(1)', transition: 'all 0.25s ease', whiteSpace: 'nowrap' }}>
      <span>{meta.icon}</span>{meta.label}
    </button>
  )
}

export default function MarchePublicPage() {
  const [filter, setFilter] = useState<Cat | 'all'>('all')
  const filtered = filter === 'all' ? vehicules : vehicules.filter(v => v.cat === filter)

  return (
    <main style={{ background: '#f8faff', minHeight: '100vh' }}>
      <style>{`
        @keyframes floatA { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(30px,-25px) scale(1.07)} }
        @keyframes floatB { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(-20px,30px) scale(1.05)} }
        @keyframes floatC { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(15px,15px) scale(1.08)} }
        @keyframes heroIn { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
        .h1{animation:heroIn 0.7s cubic-bezier(0.22,1,0.36,1) 0.05s both}
        .h2{animation:heroIn 0.7s cubic-bezier(0.22,1,0.36,1) 0.18s both}
        .h3{animation:heroIn 0.7s cubic-bezier(0.22,1,0.36,1) 0.30s both}
        .h4{animation:heroIn 0.7s cubic-bezier(0.22,1,0.36,1) 0.44s both}
        .h5{animation:heroIn 0.7s cubic-bezier(0.22,1,0.36,1) 0.58s both}
        @media(max-width:768px){
          .hgrid { grid-template-columns:1fr !important; gap:32px !important }
          .ctarow{ flex-direction:column !important }
          .ctarow > *{ width:100% !important; justify-content:center !important }
          .frow  { overflow-x:auto; flex-wrap:nowrap !important; padding-bottom:4px }
          .frow::-webkit-scrollbar{ display:none }
          .sechd { flex-direction:column !important; align-items:flex-start !important }
        }
      `}</style>

      {/* ═══ HERO ════════════════════════════════════════════════ */}
      <section style={{ position: 'relative', overflow: 'hidden', paddingTop: '110px', paddingBottom: 0, background: '#f8faff' }}>
        <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: '520px', height: '520px', borderRadius: '50%', background: 'linear-gradient(135deg,rgba(0,87,168,0.09),rgba(27,43,107,0.07))', animation: 'floatA 12s ease-in-out infinite', zIndex: 0 }} />
        <div style={{ position: 'absolute', bottom: '-60px', left: '-60px', width: '420px', height: '420px', borderRadius: '50%', background: 'linear-gradient(135deg,rgba(204,0,0,0.06),rgba(27,43,107,0.05))', animation: 'floatB 16s ease-in-out infinite', zIndex: 0 }} />
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, opacity: 0.5, backgroundImage: 'radial-gradient(circle,rgba(0,87,168,0.08) 1px,transparent 1px)', backgroundSize: '32px 32px' }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div className="h1" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#94a3b8', marginBottom: '40px' }}>
            <Link href="/" style={{ color: '#94a3b8', textDecoration: 'none' }}>Accueil</Link>
            <span>›</span>
            <span style={{ color: '#0057A8', fontWeight: 700 }}>Marché public</span>
          </div>

          <div className="hgrid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'end', paddingBottom: '64px' }}>
            <div>
              <div className="h1" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 18px', borderRadius: '99px', marginBottom: '28px', background: '#fff', border: '1px solid #e8e8f0', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#CC0000', display: 'inline-block' }} />
                <span style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#1B2B6B' }}>Marché public</span>
              </div>
              <div className="h2">
                <div style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '0.25em', color: '#0057A8', textTransform: 'uppercase', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '20px', height: '2px', background: '#0057A8', borderRadius: '2px' }} />
                  Depuis 1996
                </div>
                <h1 style={{ fontSize: 'clamp(44px,7vw,78px)', fontWeight: 900, lineHeight: 0.95, letterSpacing: '-1.5px', color: '#0f172a', margin: '0 0 4px' }}>Véhicules</h1>
                <h1 style={{ fontSize: 'clamp(44px,7vw,78px)', fontWeight: 900, lineHeight: 0.95, letterSpacing: '-1.5px', margin: 0, background: 'linear-gradient(90deg,#0057A8 0%,#1B2B6B 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>spéciaux</h1>
              </div>
              <div className="h3" style={{ display: 'flex', alignItems: 'center', gap: '6px', margin: '20px 0' }}>
                <div style={{ width: '40px', height: '3px', background: '#0057A8', borderRadius: '2px' }} />
                <div style={{ width: '20px', height: '3px', background: '#CC0000', borderRadius: '2px' }} />
                <div style={{ width: '8px', height: '3px', background: '#e2e2e8', borderRadius: '2px' }} />
              </div>
              <p className="h3" style={{ color: '#64748b', fontSize: '15px', lineHeight: 1.75, maxWidth: '440px', marginBottom: '32px' }}>
                Véhicules spéciaux carrossés sur mesure pour <strong style={{ color: '#0f172a' }}>communes, collectivités</strong> et administrations du Sud Marocain — homologués et conformes aux normes marocaines.
              </p>
              <div className="h4 ctarow" style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                <a href="tel:0524885025" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: '#0057A8', color: '#fff', fontWeight: 800, fontSize: '14px', padding: '14px 26px', borderRadius: '12px', textDecoration: 'none', boxShadow: '0 8px 28px rgba(0,87,168,0.3)', transition: 'all 0.3s ease' }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.transform = 'scale(1.04)' }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.transform = '' }}>
                  <svg width="15" height="15" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/></svg>
                  0524 885 025
                </a>
                <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#1B2B6B', fontWeight: 700, fontSize: '14px', padding: '14px 26px', borderRadius: '12px', border: '1.5px solid #c7d2fe', background: '#fff', textDecoration: 'none', transition: 'all 0.3s ease' }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = '#f0f4ff' }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = '#fff' }}>
                  Nous contacter →
                </Link>
              </div>
            </div>

            {/* Stats */}
            <div className="h5" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '14px' }}>
              {[
                { n: 30, s: '+', label: 'Véhicules',   color: '#0057A8', bg: '#f0f7ff' },
                { n: 7,  s: '',  label: 'Catégories',  color: '#1B2B6B', bg: '#f0f3ff' },
                { n: 100,s: '%', label: 'Homologués',  color: '#CC0000', bg: '#fff5f5' },
              ].map((s, i) => (
                <div key={i} style={{ padding: '24px 16px', borderRadius: '18px', textAlign: 'center', background: s.bg, border: `1px solid ${s.color}18`, transition: 'all 0.3s ease' }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.transform = 'translateY(-4px)'; el.style.boxShadow = `0 12px 32px ${s.color}20` }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.transform = ''; el.style.boxShadow = '' }}>
                  <div style={{ fontSize: '28px', fontWeight: 900, color: s.color, marginBottom: '4px', letterSpacing: '-1px' }}>
                    <Counter target={s.n} suffix={s.s} />
                  </div>
                  <div style={{ fontSize: '11px', fontWeight: 600, color: '#94a3b8' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ height: '4px', background: 'linear-gradient(90deg,#0057A8 0%,#1B2B6B 40%,#CC0000 70%,#C9A84C 100%)', borderRadius: '2px 2px 0 0', margin: '0 -24px' }} />
        </div>
      </section>

      {/* ═══ CATÉGORIES ══════════════════════════════════════════ */}
      <section style={{ background: '#fff', padding: '72px 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <p style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '0.28em', color: '#0057A8', textTransform: 'uppercase', margin: '0 0 10px' }}>Notre gamme</p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px', marginBottom: '8px' }}>
              <div style={{ height: '1px', width: '40px', background: '#0057A8' }} />
              <h2 style={{ fontSize: 'clamp(22px,3vw,34px)', fontWeight: 900, color: '#0f172a', letterSpacing: '-1px', margin: 0 }}>Catégories de véhicules</h2>
              <div style={{ height: '1px', width: '40px', background: '#CC0000' }} />
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(180px,1fr))', gap: '14px' }}>
            {(Object.entries(CAT_META) as [Cat, typeof CAT_META[Cat]][]).map(([key, m]) => (
              <div key={key}
                onClick={() => { setFilter(key); document.getElementById('vehicles')?.scrollIntoView({ behavior: 'smooth' }) }}
                style={{ padding: '20px 16px', borderRadius: '16px', cursor: 'pointer', background: '#fff', border: `1.5px solid ${m.color}1a`, boxShadow: `0 3px 16px ${m.color}08`, transition: 'all 0.3s ease' }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.transform = 'translateY(-5px)'; el.style.background = `${m.color}05`; el.style.borderColor = m.color; el.style.boxShadow = `0 14px 34px ${m.color}1e` }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.transform = ''; el.style.background = '#fff'; el.style.borderColor = `${m.color}1a`; el.style.boxShadow = `0 3px 16px ${m.color}08` }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: `linear-gradient(135deg,${m.color}14,${m.color}26)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', marginBottom: '12px' }}>{m.icon}</div>
                <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '13px', marginBottom: '8px' }}>{m.label}</div>
                <div style={{ fontSize: '11px', color: '#94a3b8' }}>
                  {vehicules.filter(v => v.cat === key).length} véhicule{vehicules.filter(v => v.cat === key).length > 1 ? 's' : ''}
                </div>
                <div style={{ height: '3px', width: '24px', background: `linear-gradient(90deg,${m.color},${m.accent})`, borderRadius: '2px', marginTop: '10px' }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ VÉHICULES ═══════════════════════════════════════════ */}
      <section id="vehicles" style={{ background: '#f8faff', padding: '72px 0 96px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div className="sechd" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '20px', marginBottom: '44px', flexWrap: 'wrap' }}>
            <div>
              <p style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '0.28em', color: '#0057A8', textTransform: 'uppercase', margin: '0 0 7px' }}>Notre gamme</p>
              <h2 style={{ fontSize: 'clamp(22px,3.5vw,36px)', fontWeight: 900, color: '#0f172a', letterSpacing: '-1px', margin: '0 0 4px' }}>
                {filter === 'all' ? 'Tous les véhicules' : CAT_META[filter].label}
              </h2>
              <p style={{ fontSize: '13px', color: '#94a3b8', margin: 0 }}>{filtered.length} véhicule{filtered.length > 1 ? 's' : ''} disponible{filtered.length > 1 ? 's' : ''}</p>
            </div>
            <div className="frow" style={{ display: 'flex', flexWrap: 'wrap', gap: '7px' }}>
              <FilterTab cat="all" active={filter === 'all'} onClick={() => setFilter('all')} />
              {(Object.keys(CAT_META) as Cat[]).map(c => (
                <FilterTab key={c} cat={c} active={filter === c} onClick={() => setFilter(c)} />
              ))}
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(270px,1fr))', gap: '16px' }}>
            {filtered.map((v, i) => <VehiculeCard key={v.nom} v={v} index={i} />)}
          </div>
        </div>
      </section>

      {/* ═══ CTA FINAL ═══════════════════════════════════════════ */}
      <section style={{ padding: '80px 0', background: '#0f172a', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle,rgba(255,255,255,0.03) 1px,transparent 1px)', backgroundSize: '32px 32px' }} />
        <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle,rgba(0,87,168,0.15) 0%,transparent 60%)' }} />
        <div style={{ position: 'absolute', bottom: '-80px', left: '-80px', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle,rgba(204,0,0,0.12) 0%,transparent 60%)' }} />
        <div style={{ position: 'relative', maxWidth: '800px', margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '99px', padding: '6px 16px', marginBottom: '24px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4ade80', display: 'inline-block' }} />
            <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>Disponible maintenant</span>
          </div>
          <h2 style={{ fontSize: 'clamp(24px,4vw,42px)', fontWeight: 900, color: '#fff', letterSpacing: '-1px', margin: '0 0 16px' }}>
            Un projet de{' '}
            <span style={{ background: 'linear-gradient(90deg,#0057A8,#4a9eff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>marché public</span> ?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '15px', margin: '0 auto 36px', maxWidth: '480px', lineHeight: 1.7 }}>
            Notre équipe accompagne collectivités et institutions dans la constitution du dossier et la sélection des véhicules adaptés.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
            <Link href="/devis" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#0057A8', color: '#fff', fontWeight: 800, fontSize: '14px', padding: '14px 28px', borderRadius: '14px', textDecoration: 'none', boxShadow: '0 12px 40px rgba(0,87,168,0.4)', transition: 'all 0.3s ease' }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1.04)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.transform = '' }}>
              Demande de devis →
            </Link>
            <a href="tel:0524885025" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#CC0000', color: '#fff', fontWeight: 800, fontSize: '14px', padding: '14px 28px', borderRadius: '14px', textDecoration: 'none', boxShadow: '0 12px 40px rgba(204,0,0,0.35)', transition: 'all 0.3s ease' }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1.04)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.transform = '' }}>
              <svg width="15" height="15" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/></svg>
              0524 885 025
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}