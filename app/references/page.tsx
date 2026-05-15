'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'

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

function RevealItem({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, visible } = useInView()
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(28px)',
      transition: `all 0.6s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
    }}>
      {children}
    </div>
  )
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

const IcWrench = () => (<svg width="28" height="28" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg>)
const IcShield = () => (<svg width="28" height="28" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>)
const IcBox = () => (<svg width="28" height="28" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>)
const IcTruck = () => (<svg width="28" height="28" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"/></svg>)
const IcClip = () => (<svg width="28" height="28" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/></svg>)
const IcPhone = () => (<svg width="18" height="18" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/></svg>)
const IcArrow = () => (<svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>)
const IcCheck = () => (<svg width="15" height="15" style={{ flexShrink: 0 }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/></svg>)
const IcPin = () => (<svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>)
const IcClock = () => (<svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>)

function AtelierCarousel({ images, alt }: { images: string[]; alt: string }) {
  const [current, setCurrent] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => setCurrent(p => (p + 1) % images.length), 4500)
  }, [images.length])
  useEffect(() => { startTimer(); return () => { if (timerRef.current) clearInterval(timerRef.current) } }, [startTimer])
  const goTo = (i: number) => { setCurrent(i); startTimer() }
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      <div style={{ display: 'flex', width: `${images.length * 100}%`, height: '100%', transform: `translateX(-${current * (100 / images.length)}%)`, transition: 'transform 0.8s cubic-bezier(0.77,0,0.175,1)' }}>
        {images.map((src, i) => (
          <div key={i} style={{ width: `${100 / images.length}%`, flexShrink: 0, height: '100%' }}>
            <img src={src} alt={`${alt} ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        ))}
      </div>
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '80px', background: 'linear-gradient(to top, rgba(0,0,0,0.3), transparent)', pointerEvents: 'none' }} />
      {[-1, 1].map(dir => (
        <button key={dir} onClick={() => goTo((current + dir + images.length) % images.length)}
          style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', [dir === -1 ? 'left' : 'right']: '14px', zIndex: 20, width: '38px', height: '38px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.15)', color: '#fff', border: '1px solid rgba(255,255,255,0.3)', cursor: 'pointer' }}>
          <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d={dir === -1 ? 'M15 19l-7-7 7-7' : 'M9 5l7 7-7 7'} /></svg>
        </button>
      ))}
      <div style={{ position: 'absolute', bottom: '14px', left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: '7px', zIndex: 20 }}>
        {images.map((_, i) => (
          <button key={i} onClick={() => goTo(i)} style={{ height: '2px', width: i === current ? '28px' : '10px', background: i === current ? '#fff' : 'rgba(255,255,255,0.38)', borderRadius: '2px', transition: 'all 0.4s ease', border: 'none', padding: 0, cursor: 'pointer' }} />
        ))}
      </div>
    </div>
  )
}

const ENGAGEMENTS = [
  { icon: <IcWrench />, color: '#0057A8', bg: '#f0f7ff', titre: 'Atelier fixe', desc: "Atelier de réparation et d'entretien équipé de ponts élévateurs, station pneumatique et outillage aux normes constructeur." },
  { icon: <IcShield />, color: '#1B2B6B', bg: '#f0f3ff', titre: 'Garantie constructeur', desc: 'Tous nos véhicules bénéficient de la garantie officielle Isuzu. Traitement prioritaire pour tout véhicule sous garantie.' },
  { icon: <IcBox />,    color: '#CC0000', bg: '#fff5f5', titre: "Pièces d'origine", desc: "Stock permanent de pièces de rechange 100% d'origine géré via le logiciel TOPAZE. Approvisionnement rapide si rupture." },
  { icon: <IcTruck />,  color: '#0057A8', bg: '#f0f7ff', titre: 'Atelier mobile sur site', desc: "Atelier mobile Dacia Dokker équipé d'outillage complet et pièces de rechange. Intervention directement chez vous." },
  { icon: <IcClip />,   color: '#1B2B6B', bg: '#f0f3ff', titre: 'Diagnostic TOPAZE', desc: "Scanner de diagnostic homologué et logiciel TOPAZE pour la gestion de l'entretien, du stock et du suivi de chaque véhicule." },
]

function AtelierCard({ img, imgs, ville, couleur, titre, desc, infos, services, badge, reverse = false, height = 420 }: {
  img?: string; imgs?: string[]; ville: string; couleur: string; titre: string; desc: string
  infos: { icon: React.ReactNode; label: string; val: string }[]
  services: string[]; badge: string; reverse?: boolean; height?: number
}) {
  const { ref, visible } = useInView()
  return (
    <div ref={ref} style={{
      display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '48px', alignItems: 'center', marginBottom: '80px',
      opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(40px)',
      transition: 'all 0.7s cubic-bezier(0.22,1,0.36,1)',
    }}>
      <div style={{ position: 'relative', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.13)', height, order: reverse ? 2 : 1 }}>
        {imgs && imgs.length > 1
          ? <AtelierCarousel images={imgs} alt={`Atelier CADOZAT ${ville}`} />
          : <img src={img} alt={`Atelier CADOZAT ${ville}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        }
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: `linear-gradient(90deg,${couleur},${couleur === '#0057A8' ? '#1B2B6B' : couleur === '#1B2B6B' ? '#CC0000' : '#0057A8'})` }} />
        <div style={{ position: 'absolute', bottom: '18px', left: '18px', padding: '7px 14px', borderRadius: '10px', color: '#fff', fontSize: '13px', fontWeight: 800, zIndex: 30, background: `linear-gradient(135deg,${couleur},${couleur}cc)`, boxShadow: `0 4px 16px ${couleur}55` }}>
          {badge}
        </div>
      </div>

      <div style={{ order: reverse ? 1 : 2 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
          <div style={{ height: '1px', width: '28px', background: couleur }} />
          <span style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '0.25em', textTransform: 'uppercase', color: couleur }}>{ville}</span>
        </div>
        <h3 style={{ fontSize: 'clamp(18px,2.5vw,24px)', fontWeight: 900, color: '#0f172a', marginBottom: '12px', lineHeight: 1.2 }}>{titre}</h3>
        <p style={{ color: '#64748b', fontSize: '14px', lineHeight: 1.75, marginBottom: '22px' }}>{desc}</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '22px' }}>
          {infos.map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '11px 14px', borderRadius: '12px', background: '#fff', border: `1px solid ${couleur}20` }}>
              <div style={{ padding: '7px', borderRadius: '9px', background: `${couleur}12`, color: couleur, flexShrink: 0 }}>{item.icon}</div>
              <div>
                <div style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#94a3b8' }}>{item.label}</div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#1e293b' }}>{item.val}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '8px' }}>
          {services.map(s => (
            <div key={s} style={{ display: 'flex', alignItems: 'center', gap: '7px', fontSize: '13px', color: '#475569' }}>
              <span style={{ color: couleur }}><IcCheck /></span>
              <span style={{ fontWeight: 600 }}>{s}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function ServicesPage() {
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

        @media(max-width:768px){
          .hero-grid{ grid-template-columns:1fr !important }
          .cta-row  { flex-direction:column !important }
          .cta-row > *{ width:100% !important; justify-content:center !important }
          .eng-grid { grid-template-columns:1fr !important }
        }
      `}</style>

      {/* ═══ HERO — même style que Références ══════════════════════ */}
      <section style={{ position: 'relative', overflow: 'hidden', paddingTop: '110px', paddingBottom: 0, background: '#f8faff' }}>

        {/* Blobs animés — bleu dominant comme Références */}
        <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: '520px', height: '520px', borderRadius: '50%', background: 'linear-gradient(135deg,rgba(0,87,168,0.09),rgba(27,43,107,0.07))', animation: 'floatA 12s ease-in-out infinite', zIndex: 0 }} />
        <div style={{ position: 'absolute', bottom: '-60px', left: '-60px', width: '420px', height: '420px', borderRadius: '50%', background: 'linear-gradient(135deg,rgba(204,0,0,0.06),rgba(27,43,107,0.05))', animation: 'floatB 16s ease-in-out infinite', zIndex: 0 }} />
        <div style={{ position: 'absolute', top: '30%', left: '35%', width: '300px', height: '300px', borderRadius: '50%', background: 'rgba(0,87,168,0.05)', animation: 'floatC 20s ease-in-out infinite', zIndex: 0 }} />

        {/* Grille de points */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, opacity: 0.5, backgroundImage: 'radial-gradient(circle,rgba(0,87,168,0.08) 1px,transparent 1px)', backgroundSize: '32px 32px' }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>

          {/* Breadcrumb */}
          <div className="h1" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#94a3b8', marginBottom: '40px' }}>
            <Link href="/" style={{ color: '#94a3b8', textDecoration: 'none' }}>Accueil</Link>
            <span>›</span>
            <span style={{ color: '#0057A8', fontWeight: 700 }}>Services après-vente</span>
          </div>

          <div className="hero-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'end', paddingBottom: '64px' }}>

            {/* ── Gauche ── */}
            <div>
              {/* Badge bleu — identique à Références */}
              <div className="h1" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 18px', borderRadius: '99px', marginBottom: '28px', background: '#fff', border: '1px solid #e8e8f0', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4ade80', display: 'inline-block', animation: 'floatC 1.5s ease-in-out infinite' }} />
                <span style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#0057A8' }}>Service après-vente</span>
              </div>

              <div className="h2" style={{ marginBottom: '10px' }}>
                {/* Eyebrow bleu */}
                <div style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '0.25em', color: '#0057A8', textTransform: 'uppercase', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '20px', height: '2px', background: '#0057A8', borderRadius: '2px' }} />
                  8 techniciens certifiés
                </div>
                {/* Titre en gradient bleu — identique à "Ils nous font confiance" */}
                <h1 style={{ fontSize: 'clamp(40px,6vw,72px)', fontWeight: 900, lineHeight: 0.95, letterSpacing: '-1.5px', color: '#0f172a', margin: '0 0 4px' }}>
                  Votre véhicule
                </h1>
                <h1 style={{ fontSize: 'clamp(40px,6vw,72px)', fontWeight: 900, lineHeight: 0.95, letterSpacing: '-1.5px', margin: 0, background: 'linear-gradient(90deg,#0057A8 0%,#1B2B6B 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  mérite le meilleur
                </h1>
              </div>

              {/* Traits déco bleu + rouge + gris — identique à Références */}
              <div className="h3" style={{ display: 'flex', alignItems: 'center', gap: '6px', margin: '20px 0' }}>
                <div style={{ width: '40px', height: '3px', background: '#0057A8', borderRadius: '2px' }} />
                <div style={{ width: '20px', height: '3px', background: '#CC0000', borderRadius: '2px' }} />
                <div style={{ width: '8px', height: '3px', background: '#e2e2e8', borderRadius: '2px' }} />
              </div>

              {/* Boutons — bleu primaire + blanc/bleu secondaire — identique à Références */}
              <div className="h4 cta-row" style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                <a href="tel:0524885025" style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  background: '#0057A8', color: '#fff', fontWeight: 800, fontSize: '14px',
                  padding: '14px 26px', borderRadius: '12px', textDecoration: 'none',
                  boxShadow: '0 8px 28px rgba(0,87,168,0.3)', transition: 'all 0.3s ease',
                }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.transform = 'scale(1.04)'; el.style.filter = 'brightness(1.1)' }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.transform = ''; el.style.filter = '' }}>
                  <IcPhone /> Appeler le SAV
                </a>
                <Link href="/devis" style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  color: '#1B2B6B', fontWeight: 700, fontSize: '14px',
                  padding: '14px 26px', borderRadius: '12px',
                  border: '1.5px solid #c7d2fe', background: '#fff',
                  textDecoration: 'none', transition: 'all 0.3s ease',
                }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = '#f0f4ff'; el.style.borderColor = '#1B2B6B' }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = '#fff'; el.style.borderColor = '#c7d2fe' }}>
                  Demande de devis <IcArrow />
                </Link>
              </div>
            </div>

            {/* ── Droite : stats — identique au style Références ── */}
            <div className="h4" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '14px' }}>
              {[
                { n: 2,   s: '',    label: 'Ateliers fixes',   color: '#0057A8', bg: '#f0f7ff' },
                { n: 100, s: '%',   label: "Pièces d'origine", color: '#1B2B6B', bg: '#f0f3ff' },
                { n: 28,  s: '+',   label: "Ans d'expérience", color: '#CC0000', bg: '#fff5f5' },
              ].map((s, i) => (
                <div key={i} style={{ padding: '24px 16px', borderRadius: '18px', textAlign: 'center', background: s.bg, border: `1px solid ${s.color}18`, transition: 'all 0.3s ease' }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.transform = 'translateY(-4px)'; el.style.boxShadow = `0 12px 32px ${s.color}20` }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.transform = ''; el.style.boxShadow = '' }}>
                  <div style={{ fontSize: '28px', fontWeight: 900, color: s.color, marginBottom: '4px' }}>
                    <Counter target={s.n} suffix={s.s} />
                  </div>
                  <div style={{ fontSize: '11px', fontWeight: 600, color: '#94a3b8' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Barre bas du hero — identique à Références */}
          <div style={{ height: '4px', background: 'linear-gradient(90deg,#0057A8 0%,#1B2B6B 40%,#CC0000 70%,#C9A84C 100%)', borderRadius: '2px 2px 0 0', margin: '0 -24px' }} />
        </div>
      </section>

      {/* ═══ ENGAGEMENTS ═══════════════════════════════════════════ */}
      <section style={{ padding: '80px 0', background: '#fff' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>

          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <p style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '0.28em', color: '#0057A8', textTransform: 'uppercase', margin: '0 0 10px' }}>Nos engagements</p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px', marginBottom: '8px' }}>
              <div style={{ height: '1px', width: '40px', background: '#0057A8' }} />
              <h2 style={{ fontSize: 'clamp(22px,3vw,34px)', fontWeight: 900, color: '#0f172a', letterSpacing: '-1px', margin: 0 }}>Un service complet</h2>
              <div style={{ height: '1px', width: '40px', background: '#CC0000' }} />
            </div>
            <p style={{ color: '#94a3b8', fontSize: '14px' }}>À la hauteur de vos exigences depuis 1996</p>
          </div>

          <div className="eng-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: '16px' }}>
            {ENGAGEMENTS.map((eng, i) => (
              <RevealItem key={i} delay={(i % 3) * 100}>
                <div style={{ padding: '24px', borderRadius: '16px', background: eng.bg, border: `1px solid ${eng.color}22`, transition: 'all 0.3s ease', cursor: 'default' }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.transform = 'translateY(-4px)'; el.style.boxShadow = `0 16px 40px ${eng.color}14` }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.transform = ''; el.style.boxShadow = '' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                    <div style={{ padding: '11px', borderRadius: '13px', background: `${eng.color}14`, color: eng.color, flexShrink: 0 }}>{eng.icon}</div>
                    <div>
                      <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a', marginBottom: '7px' }}>{eng.titre}</h3>
                      <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.65, margin: 0 }}>{eng.desc}</p>
                    </div>
                  </div>
                  <div style={{ marginTop: '16px', height: '3px', width: '28px', background: `linear-gradient(90deg,${eng.color},${eng.color === '#CC0000' ? '#0057A8' : '#CC0000'})`, borderRadius: '2px' }} />
                </div>
              </RevealItem>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ ATELIERS ══════════════════════════════════════════════ */}
      <section style={{ padding: '80px 0', background: '#f8faff', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.4, backgroundImage: 'radial-gradient(circle,rgba(0,87,168,0.06) 1px,transparent 1px)', backgroundSize: '28px 28px' }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>

          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <p style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '0.28em', color: '#0057A8', textTransform: 'uppercase', margin: '0 0 10px' }}>Nos ateliers</p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px', marginBottom: '8px' }}>
              <div style={{ height: '1px', width: '40px', background: '#0057A8' }} />
              <h2 style={{ fontSize: 'clamp(22px,3vw,34px)', fontWeight: 900, color: '#0f172a', letterSpacing: '-1px', margin: 0 }}>À votre service</h2>
              <div style={{ height: '1px', width: '40px', background: '#CC0000' }} />
            </div>
            <p style={{ color: '#94a3b8', fontSize: '14px' }}>Deux ateliers fixes + atelier mobile pour interventions sur site</p>
          </div>

          <AtelierCard
            img="/images/ateliers/atelier1.jpg"
            ville="Agadir" couleur="#0057A8"
            titre="Atelier CADOZAT Agadir"
            desc="Notre atelier Agadir dispose de ponts élévateurs, d'une station pneumatique, d'un scanner de diagnostic homologué et du logiciel TOPAZE pour le suivi complet de chaque véhicule."
            badge="🔧 Atelier fixe — Agadir"
            infos={[
              { icon: <IcClock />, label: 'Horaires',    val: 'Lun – Sam : 8h à 18h' },
              { icon: <IcPhone />, label: 'Contact SAV', val: '06 61 43 76 82' },
              { icon: <IcPin />,   label: 'Ville',       val: 'Agadir' },
            ]}
            services={['Entretien & révision', 'Réparation toutes pannes', "Pièces d'origine", 'Diagnostic TOPAZE', 'Station pneumatique', 'Garantie constructeur']}
          />

          <AtelierCard
            imgs={['/images/ateliers/atelier1.jpg', '/images/ateliers/atelier2.jpg']}
            height={280}
            ville="Ouarzazate" couleur="#1B2B6B"
            titre="Atelier CADOZAT Ouarzazate"
            desc="Notre atelier Ouarzazate, siège social de CADOZAT depuis 1996, est équipé de tout le matériel nécessaire pour l'entretien et la réparation de vos véhicules Isuzu et Karry."
            badge="🔧 Atelier fixe — Ouarzazate"
            reverse
            infos={[
              { icon: <IcClock />, label: 'Horaires',    val: 'Lun – Sam : 8h à 18h' },
              { icon: <IcPhone />, label: 'Contact SAV', val: '06 62 77 54 11' },
              { icon: <IcPin />,   label: 'Ville',       val: 'Ouarzazate' },
            ]}
            services={['Entretien & révision', 'Réparation toutes pannes', "Pièces d'origine", 'Diagnostic TOPAZE', 'Station pneumatique', 'Garantie constructeur']}
          />

          <AtelierCard
            imgs={['/images/ateliers/atelier-mobile1.jpg', '/images/ateliers/atelier-mobile2.jpg', '/images/ateliers/atelier-mobile3.jpg']}
            ville="Atelier mobile" couleur="#CC0000"
            titre="Nous venons à vous — partout au Sud du Maroc"
            desc="Notre atelier mobile Dacia Dokker est équipé de tous les outils et pièces de rechange nécessaires. Nos techniciens interviennent directement sur site."
            badge="🚐 Atelier mobile ISUZU SERVICE"
            infos={[
              { icon: <IcTruck />, label: 'Véhicule',   val: 'Dacia Dokker' },
              { icon: <IcBox />,   label: 'Équipement', val: 'Outillage complet + stock pièces' },
              { icon: <IcPin />,   label: 'Zone',       val: 'Sud du Maroc — Ouarzazate, Agadir' },
            ]}
            services={['Intervention sur site', "Dépannage d'urgence", 'Flottes & grands comptes', 'Marchés publics', 'Zones rurales', 'Sans déplacement client']}
          />
        </div>
      </section>

      {/* ═══ CTA FINAL — identique à Références ═══════════════════ */}
      <section style={{ padding: '80px 0', background: '#0f172a', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle,rgba(255,255,255,0.03) 1px,transparent 1px)', backgroundSize: '32px 32px' }} />
        <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle,rgba(0,87,168,0.15) 0%,transparent 60%)' }} />
        <div style={{ position: 'absolute', bottom: '-80px', left: '-80px', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle,rgba(204,0,0,0.12) 0%,transparent 60%)' }} />

        <div style={{ position: 'relative', maxWidth: '800px', margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '99px', padding: '6px 16px', marginBottom: '24px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 8px #4ade80', display: 'inline-block' }} />
            <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>Disponible 6j/7</span>
          </div>

          <h2 style={{ fontSize: 'clamp(24px,4vw,42px)', fontWeight: 900, color: '#fff', letterSpacing: '-1px', margin: '0 0 16px' }}>
            Votre véhicule a besoin d'
            <span style={{ background: 'linear-gradient(90deg,#0057A8,#4a9eff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>entretien</span> ?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '15px', marginBottom: '36px', maxWidth: '480px', margin: '0 auto 36px', lineHeight: 1.7 }}>
            Atelier fixe ou mobile — nos 8 techniciens certifiés sont à votre service 6 jours sur 7.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
            <a href="tel:0524885025" style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: '#CC0000', color: '#fff', fontWeight: 800, fontSize: '14px',
              padding: '14px 28px', borderRadius: '14px', textDecoration: 'none',
              boxShadow: '0 12px 40px rgba(204,0,0,0.35)', transition: 'all 0.3s ease',
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1.04)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.transform = '' }}>
              <IcPhone /> 0524 885 025
            </a>
            <Link href="/devis" style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: '#0057A8', color: '#fff', fontWeight: 800, fontSize: '14px',
              padding: '14px 28px', borderRadius: '14px', textDecoration: 'none',
              boxShadow: '0 12px 40px rgba(0,87,168,0.4)', transition: 'all 0.3s ease',
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1.04)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.transform = '' }}>
              Demande de devis →
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}