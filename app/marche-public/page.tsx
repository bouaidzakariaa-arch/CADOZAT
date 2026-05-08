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

type Cat = 'transport' | 'btp' | 'citerne' | 'environnement'
type Vehicule = { nom: string; desc: string; cat: Cat; img?: string }

const CAT_META: Record<Cat, { label: string; color: string; accent: string; icon: string }> = {
  transport:     { label: 'Transport',     color: '#CC0000', accent: '#ff6b6b', icon: '📦' },
  btp:           { label: 'BTP',           color: '#1B2B6B', accent: '#4a6cf7', icon: '🏗️' },
  citerne:       { label: 'Citerne',       color: '#0057A8', accent: '#00aaff', icon: '💧' },
  environnement: { label: 'Environnement', color: '#2D6A4F', accent: '#40c074', icon: '🌿' },
}

const vehicules: Vehicule[] = [
  { nom: 'Pick-up Benne',              desc: 'Benne 2m³ sur Isuzu 3,5T — livraisons urbaines et rurales',     cat: 'transport',     img: '/images/marche-public/transport/Pick-up Benne 2m-1.png' },
  { nom: 'Camion Caisse',              desc: 'Caisse fermée isotherme ou sèche — Isuzu 3,5T à 7,5T',          cat: 'transport',     img: '/images/marche-public/environnement/Camion-Caisse-2.jpg' },
  { nom: 'Camion Transport de Viande', desc: 'Caisse frigorifique homologuée — Isuzu 3,5T et 7,5T',           cat: 'transport',     img: '/images/marche-public/transport/Camion-viande.jpeg' },
  { nom: 'Pick-up Caisse Frigo',       desc: 'Caisse frigorifique poulet & viande sur châssis pick-up',        cat: 'transport',     img: '/images/marche-public/transport/bickup-frigo.jpg' },
  { nom: 'Camion Benne',               desc: 'Benne basculante 3m³ à 10m³ — Isuzu 3,5T, 7,5T et 18T',         cat: 'btp',           img: '/images/marche-public/btp/camion-benne1.jpeg' },
  { nom: 'Porte-Engin',                desc: 'Transport de gros engins de chantier — tracteurs, tractopelles', cat: 'btp',           img: '/images/marche-public/transport/porte-engin.png' },
  { nom: 'Camion Citerne Eau & Lait',  desc: 'Citerne eau potable ou inox lait — de 1T pick-up à 10T',         cat: 'citerne',       img: '/images/marche-public/citerne/citerne-eau4.png' },
  { nom: 'Camion Benne Tasseuse',      desc: 'Collecte et compactage ordures ménagères — 7m³ à 14m³',          cat: 'environnement', img: '/images/marche-public/environnement/benne-tasseuse1.jpg' },
  { nom: 'Camion Multi-Benne',         desc: 'Collecte sélective et transport de bennes amovibles',            cat: 'environnement', img: '/images/marche-public/environnement/multi-benne3.jpg' },
  { nom: 'Camion Nacelle',             desc: 'Travaux en hauteur — nacelle 10m ou 16m, éclairage public',      cat: 'environnement', img: '/images/marche-public/environnement/nacelle1.jpg' },
]

function VehiculeCard({ v, index }: { v: Vehicule; index: number }) {
  const { ref, visible } = useInView()
  const meta = CAT_META[v.cat]
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(36px)', transition: `all 0.6s cubic-bezier(0.22,1,0.36,1) ${(index % 4) * 80}ms` }}>
      <div style={{ background: '#fff', borderRadius: '18px', overflow: 'hidden', border: '1px solid #eef2ff', boxShadow: '0 2px 14px rgba(0,0,0,0.05)', transition: 'all 0.3s ease' }}
        onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.transform = 'translateY(-5px)'; el.style.boxShadow = `0 18px 44px ${meta.color}16` }}
        onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.transform = ''; el.style.boxShadow = '0 2px 14px rgba(0,0,0,0.05)' }}>
        <div style={{ height: '3px', background: `linear-gradient(90deg, ${meta.color}, ${meta.accent})` }} />
        <div style={{ position: 'relative', height: '196px', background: `${meta.color}07`, overflow: 'hidden' }}>
          {v.img
            ? <Image src={v.img} alt={v.nom} fill sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: 'cover', transition: 'transform 0.5s ease' }} onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.06)' }} onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.transform = '' }} />
            : <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '44px' }}>{meta.icon}</div>
          }
          <div style={{ position: 'absolute', top: '10px', left: '10px', display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '4px 10px', borderRadius: '99px', background: meta.color, color: '#fff', fontSize: '11px', fontWeight: 800 }}>
            {meta.icon} {meta.label}
          </div>
        </div>
        <div style={{ padding: '18px 20px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a', margin: '0 0 5px', lineHeight: 1.3 }}>{v.nom}</h3>
          <p style={{ fontSize: '12px', color: '#94a3b8', lineHeight: 1.6, margin: 0 }}>{v.desc}</p>
          <div style={{ display: 'flex', gap: '5px', marginTop: '14px' }}>
            <div style={{ width: '18px', height: '3px', borderRadius: '2px', background: meta.color }} />
            <div style={{ width: '9px', height: '3px', borderRadius: '2px', background: meta.accent, opacity: 0.5 }} />
            <div style={{ width: '5px', height: '3px', borderRadius: '2px', background: '#e2e8f0' }} />
          </div>
        </div>
      </div>
    </div>
  )
}

function FilterTab({ cat, active, onClick }: { cat: Cat | 'all'; active: boolean; onClick: () => void }) {
  const meta = cat === 'all' ? { label: 'Tous', color: '#0f172a', icon: '🚛' } : CAT_META[cat]
  return (
    <button onClick={onClick} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 16px', borderRadius: '99px', border: 'none', fontSize: '12px', fontWeight: 700, cursor: 'pointer', background: active ? meta.color : '#f1f5f9', color: active ? '#fff' : '#64748b', boxShadow: active ? `0 6px 18px ${meta.color}30` : 'none', transform: active ? 'scale(1.04)' : 'scale(1)', transition: 'all 0.25s ease', whiteSpace: 'nowrap' }}>
      <span>{meta.icon}</span>{meta.label}
    </button>
  )
}

export default function MarchePublicPage() {
  const [filter, setFilter] = useState<Cat | 'all'>('all')
  const filtered = filter === 'all' ? vehicules : vehicules.filter(v => v.cat === filter)

  return (
    <main style={{ background: '#fff', minHeight: '100vh' }}>
      <style>{`
        @keyframes gradientShift {
          0%,100% { background-position: 0% 50%; }
          50%      { background-position: 100% 50%; }
        }
        @keyframes floatA {
          0%,100%{ transform:translate(0,0) rotate(0deg) }
          25%    { transform:translate(28px,-18px) rotate(3deg) }
          75%    { transform:translate(-18px,14px) rotate(-2deg) }
        }
        @keyframes floatB {
          0%,100%{ transform:translate(0,0) }
          33%    { transform:translate(-32px,22px) }
          66%    { transform:translate(22px,-28px) }
        }
        @keyframes floatC {
          0%,100%{ transform:translate(0,0) scale(1) }
          50%    { transform:translate(12px,18px) scale(1.07) }
        }
        @keyframes revealUp {
          from{ opacity:0; transform:translateY(26px) }
          to  { opacity:1; transform:translateY(0) }
        }
        @keyframes lineGrow {
          from{ width:0 }
          to  { width:100% }
        }
        @keyframes pulseDot {
          0%,100%{ opacity:1 }
          50%    { opacity:0.35 }
        }
        @keyframes gridDrift {
          from{ transform:translateY(0) }
          to  { transform:translateY(36px) }
        }
        @keyframes badgePop {
          0%,100%{ box-shadow: 0 0 0 0 rgba(204,0,0,0.25) }
          50%    { box-shadow: 0 0 0 7px rgba(204,0,0,0) }
        }

        .t1{ animation:revealUp 0.75s cubic-bezier(.22,1,.36,1) .05s both }
        .t2{ animation:revealUp 0.75s cubic-bezier(.22,1,.36,1) .17s both }
        .t3{ animation:revealUp 0.75s cubic-bezier(.22,1,.36,1) .29s both }
        .t4{ animation:revealUp 0.75s cubic-bezier(.22,1,.36,1) .41s both }
        .t5{ animation:revealUp 0.75s cubic-bezier(.22,1,.36,1) .53s both }
        .t6{ animation:revealUp 0.75s cubic-bezier(.22,1,.36,1) .65s both }

        @media(max-width:640px){
          .hgrid  { grid-template-columns:1fr !important; gap:36px !important }
          .ctarow { flex-direction:column !important }
          .ctarow a{ width:100% !important; justify-content:center !important }
          .strow  { gap:18px !important }
          .cgrid  { grid-template-columns:repeat(2,1fr) !important }
          .frow   { overflow-x:auto; flex-wrap:nowrap !important; padding-bottom:4px }
          .frow::-webkit-scrollbar{ display:none }
          .sechd  { flex-direction:column !important; align-items:flex-start !important }
        }
      `}</style>

      {/* ══ HERO ══════════════════════════════════════════════════ */}
      <section style={{ position:'relative', overflow:'hidden', background:'#fff', paddingTop:'112px', paddingBottom:'80px' }}>

        {/* Fond dégradé animé — clair et lumineux */}
        <div style={{ position:'absolute', inset:0, zIndex:0, background:'linear-gradient(135deg,#fff8f8 0%,#f8faff 25%,#fff 50%,#f0f7ff 75%,#fff5f5 100%)', backgroundSize:'400% 400%', animation:'gradientShift 14s ease infinite' }} />

        {/* Grille de points animée */}
        <div style={{ position:'absolute', inset:0, zIndex:0, backgroundImage:'radial-gradient(circle, rgba(15,23,42,0.052) 1.5px, transparent 1.5px)', backgroundSize:'30px 30px', animation:'gridDrift 9s ease-in-out infinite alternate' }} />

        {/* Lignes verticales fines */}
        <div style={{ position:'absolute', top:0, left:'17%', width:'1px', height:'100%', background:'linear-gradient(to bottom, transparent, rgba(204,0,0,0.09) 25%, rgba(204,0,0,0.09) 75%, transparent)', zIndex:0 }} />
        <div style={{ position:'absolute', top:0, right:'17%', width:'1px', height:'100%', background:'linear-gradient(to bottom, transparent, rgba(27,43,107,0.08) 25%, rgba(27,43,107,0.08) 75%, transparent)', zIndex:0 }} />

        {/* Blobs flottants — très légers */}
        <div style={{ position:'absolute', top:'-110px', right:'-80px', width:'540px', height:'540px', borderRadius:'42% 58% 55% 45%/45% 55% 45% 55%', background:'linear-gradient(135deg,rgba(204,0,0,0.048),rgba(27,43,107,0.07))', animation:'floatA 20s ease-in-out infinite', zIndex:0 }} />
        <div style={{ position:'absolute', bottom:'-90px', left:'-60px', width:'460px', height:'460px', borderRadius:'55% 45% 40% 60%/60% 40% 60% 40%', background:'linear-gradient(135deg,rgba(0,87,168,0.046),rgba(45,106,79,0.058))', animation:'floatB 25s ease-in-out infinite', zIndex:0 }} />
        <div style={{ position:'absolute', top:'38%', left:'52%', width:'240px', height:'240px', borderRadius:'50%', background:'radial-gradient(circle,rgba(204,0,0,0.046) 0%,transparent 68%)', animation:'floatC 17s ease-in-out infinite', zIndex:0 }} />

        {/* Bande supérieure rouge → bleu */}
        <div style={{ position:'absolute', top:0, left:0, right:0, height:'4px', background:'linear-gradient(90deg,#CC0000 0%,#CC0000 45%,#1B2B6B 100%)', zIndex:2 }} />

        <div style={{ position:'relative', zIndex:1, maxWidth:'1200px', margin:'0 auto', padding:'0 24px' }}>

          {/* Breadcrumb */}
          <div className="t1" style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'40px', fontSize:'12px', color:'#94a3b8' }}>
            <Link href="/" style={{ color:'#94a3b8', textDecoration:'none' }}>Accueil</Link>
            <span style={{ color:'#e2e8f0' }}>›</span>
            <span style={{ color:'#CC0000', fontWeight:700 }}>Marché public</span>
          </div>

          <div className="hgrid" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'60px', alignItems:'center' }}>

            {/* ── Gauche ── */}
            <div>
              {/* Badge animé */}
              <div className="t1" style={{ display:'inline-flex', alignItems:'center', gap:'8px', background:'#fff5f5', border:'1px solid #fecaca', borderRadius:'99px', padding:'6px 16px', marginBottom:'22px', animation:'badgePop 2.5s ease infinite' }}>
                <span style={{ width:'7px', height:'7px', borderRadius:'50%', background:'#CC0000', display:'inline-block', animation:'pulseDot 1.8s ease infinite' }} />
                <span style={{ fontSize:'11px', fontWeight:800, color:'#CC0000', letterSpacing:'0.18em', textTransform:'uppercase' }}>CADOZAT · DEPUIS 1996</span>
              </div>

              {/* Titre — MARCHÉ */}
              <div className="t2" style={{ marginBottom:'2px' }}>
                <h1 style={{ fontSize:'clamp(42px,8.5vw,90px)', fontWeight:900, lineHeight:0.9, letterSpacing:'-2px', color:'#0f172a', margin:0 }}>MARCHÉ</h1>
              </div>
              {/* Titre — PUBLIC en rouge */}
              <div className="t2" style={{ marginBottom:'22px' }}>
                <h1 style={{ fontSize:'clamp(42px,8.5vw,90px)', fontWeight:900, lineHeight:0.9, letterSpacing:'-2px', color:'#CC0000', margin:0 }}>PUBLIC</h1>
                {/* Ligne animée */}
                <div style={{ marginTop:'14px', height:'4px', background:'linear-gradient(90deg,#CC0000,#1B2B6B)', borderRadius:'2px', animation:'lineGrow 1s cubic-bezier(.22,1,.36,1) .55s both' }} />
              </div>

              {/* Description */}
              <p className="t3" style={{ fontSize:'15px', color:'#475569', lineHeight:1.8, maxWidth:'440px', margin:'0 0 32px' }}>
                Véhicules spéciaux carrossés sur mesure pour <strong style={{ color:'#0f172a' }}>communes, collectivités</strong> et administrations du Sud Marocain — homologués et conformes.
              </p>

              {/* Boutons */}
              <div className="t4 ctarow" style={{ display:'flex', flexWrap:'wrap', gap:'12px', marginBottom:'44px' }}>
                <a href="tel:0524885025" style={{ display:'inline-flex', alignItems:'center', gap:'10px', background:'linear-gradient(135deg,#CC0000,#aa0000)', color:'#fff', fontWeight:800, fontSize:'14px', padding:'13px 26px', borderRadius:'12px', textDecoration:'none', boxShadow:'0 8px 26px rgba(204,0,0,0.3)', transition:'all 0.3s ease' }}
                  onMouseEnter={e=>{const el=e.currentTarget as HTMLAnchorElement;el.style.transform='translateY(-2px)';el.style.boxShadow='0 12px 34px rgba(204,0,0,0.42)'}}
                  onMouseLeave={e=>{const el=e.currentTarget as HTMLAnchorElement;el.style.transform='';el.style.boxShadow='0 8px 26px rgba(204,0,0,0.3)'}}>
                  <svg width="15" height="15" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/></svg>
                  0524 885 025
                </a>
                <Link href="/contact" style={{ display:'inline-flex', alignItems:'center', gap:'8px', color:'#1B2B6B', fontWeight:700, fontSize:'14px', padding:'13px 26px', borderRadius:'12px', border:'2px solid #1B2B6B', background:'transparent', textDecoration:'none', transition:'all 0.3s ease' }}
                  onMouseEnter={e=>{const el=e.currentTarget as HTMLAnchorElement;el.style.background='#1B2B6B';el.style.color='#fff'}}
                  onMouseLeave={e=>{const el=e.currentTarget as HTMLAnchorElement;el.style.background='transparent';el.style.color='#1B2B6B'}}>
                  Nous contacter
                  <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                </Link>
              </div>

              {/* Stats */}
              <div className="t5 strow" style={{ display:'flex', gap:'28px', paddingTop:'24px', borderTop:'1.5px solid #f0f4ff' }}>
                {[{n:10,s:'+',label:'Véhicules',c:'#CC0000'},{n:4,s:'',label:'Catégories',c:'#1B2B6B'},{n:100,s:'%',label:'Homologués',c:'#2D6A4F'}].map((s,i)=>(
                  <div key={i}>
                    <div style={{ fontSize:'28px', fontWeight:900, color:s.c, lineHeight:1, letterSpacing:'-1px' }}><Counter target={s.n} suffix={s.s}/></div>
                    <div style={{ fontSize:'10px', color:'#94a3b8', fontWeight:700, marginTop:'3px', textTransform:'uppercase', letterSpacing:'0.08em' }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Droite : cartes catégories ── */}
            <div className="t6 cgrid" style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:'14px' }}>
              {(Object.entries(CAT_META) as [Cat, typeof CAT_META[Cat]][]).map(([key,m])=>(
                <div key={key}
                  onClick={()=>{setFilter(key);document.getElementById('vehicles')?.scrollIntoView({behavior:'smooth'})}}
                  style={{ padding:'22px 18px', borderRadius:'18px', cursor:'pointer', background:'#fff', border:`1.5px solid ${m.color}1a`, boxShadow:`0 3px 16px ${m.color}08`, transition:'all 0.3s cubic-bezier(.22,1,.36,1)' }}
                  onMouseEnter={e=>{const el=e.currentTarget as HTMLDivElement;el.style.transform='translateY(-5px) scale(1.02)';el.style.background=`${m.color}05`;el.style.borderColor=m.color;el.style.boxShadow=`0 14px 34px ${m.color}1e`}}
                  onMouseLeave={e=>{const el=e.currentTarget as HTMLDivElement;el.style.transform='';el.style.background='#fff';el.style.borderColor=`${m.color}1a`;el.style.boxShadow=`0 3px 16px ${m.color}08`}}>
                  <div style={{ width:'46px', height:'46px', borderRadius:'13px', background:`linear-gradient(135deg,${m.color}14,${m.color}26)`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'22px', marginBottom:'13px' }}>{m.icon}</div>
                  <div style={{ fontWeight:800, color:'#0f172a', fontSize:'13px', marginBottom:'10px' }}>{m.label}</div>
                  <div style={{ height:'3px', width:'26px', background:`linear-gradient(90deg,${m.color},${m.accent})`, borderRadius:'2px' }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Séparateur coloré */}
      <div style={{ height:'5px', background:'linear-gradient(90deg,#CC0000 0%,#CC0000 33%,#1B2B6B 66%,#0057A8 100%)' }} />

      {/* ══ VÉHICULES ═════════════════════════════════════════════ */}
      <section id="vehicles" style={{ background:'#f8faff', padding:'72px 0 96px' }}>
        <div style={{ maxWidth:'1200px', margin:'0 auto', padding:'0 24px' }}>

          <div className="sechd" style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', gap:'20px', marginBottom:'44px', flexWrap:'wrap' }}>
            <div>
              <p style={{ fontSize:'11px', fontWeight:800, letterSpacing:'0.28em', color:'#CC0000', textTransform:'uppercase', margin:'0 0 7px' }}>Notre gamme</p>
              <h2 style={{ fontSize:'clamp(22px,3.5vw,36px)', fontWeight:900, color:'#0f172a', letterSpacing:'-1px', margin:'0 0 11px' }}>Véhicules disponibles</h2>
              <div style={{ display:'flex', gap:'6px' }}>
                {Object.values(CAT_META).map((m,i)=>(
                  <div key={i} style={{ height:'4px', width:'36px', background:`linear-gradient(90deg,${m.color},${m.accent})`, borderRadius:'2px' }} />
                ))}
              </div>
            </div>
            <div className="frow" style={{ display:'flex', flexWrap:'wrap', gap:'8px' }}>
              <FilterTab cat="all" active={filter==='all'} onClick={()=>setFilter('all')} />
              {(Object.keys(CAT_META) as Cat[]).map(c=>(
                <FilterTab key={c} cat={c} active={filter===c} onClick={()=>setFilter(c)} />
              ))}
            </div>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(285px,1fr))', gap:'18px' }}>
            {filtered.map((v,i)=><VehiculeCard key={v.nom} v={v} index={i}/>)}
          </div>
        </div>
      </section>

      {/* ══ CTA FINAL ═════════════════════════════════════════════ */}
      <section style={{ background:'linear-gradient(135deg,#0f172a 0%,#1B2B6B 55%,#0f172a 100%)', padding:'76px 0', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, backgroundImage:'radial-gradient(circle,rgba(255,255,255,0.035) 1px,transparent 1px)', backgroundSize:'28px 28px' }} />
        <div style={{ position:'absolute', top:'-60px', right:'-60px', width:'380px', height:'380px', borderRadius:'50%', background:'radial-gradient(circle,rgba(204,0,0,0.14),transparent 65%)' }} />
        <div style={{ position:'absolute', bottom:'-60px', left:'-60px', width:'320px', height:'320px', borderRadius:'50%', background:'radial-gradient(circle,rgba(27,43,107,0.28),transparent 65%)' }} />
        <div style={{ position:'absolute', top:0, left:0, right:0, height:'4px', background:'linear-gradient(90deg,#CC0000,#ff6b6b,#1B2B6B)' }} />

        <div style={{ position:'relative', maxWidth:'680px', margin:'0 auto', padding:'0 24px', textAlign:'center' }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:'8px', background:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.12)', borderRadius:'99px', padding:'6px 16px', marginBottom:'26px' }}>
            <span style={{ width:'6px', height:'6px', borderRadius:'50%', background:'#4ade80', boxShadow:'0 0 8px #4ade80', display:'inline-block', animation:'pulseDot 1.8s ease infinite' }} />
            <span style={{ fontSize:'11px', color:'rgba(255,255,255,0.55)', fontWeight:700, letterSpacing:'0.15em', textTransform:'uppercase' }}>Disponible maintenant</span>
          </div>
          <h2 style={{ fontSize:'clamp(24px,4vw,42px)', fontWeight:900, color:'#fff', letterSpacing:'-1px', margin:'0 0 14px', lineHeight:1.15 }}>
            Un projet de <span style={{ color:'#ff6b6b' }}>marché public</span> ?
          </h2>
          <p style={{ color:'rgba(255,255,255,0.48)', fontSize:'15px', lineHeight:1.75, margin:'0 auto 36px', maxWidth:'460px' }}>
            Notre équipe accompagne collectivités et institutions dans la constitution du dossier et la sélection des véhicules adaptés.
          </p>
          <div style={{ display:'flex', flexWrap:'wrap', gap:'12px', justifyContent:'center' }}>
            <a href="tel:0524885025" style={{ display:'inline-flex', alignItems:'center', gap:'10px', background:'#CC0000', color:'#fff', fontWeight:800, fontSize:'14px', padding:'14px 28px', borderRadius:'12px', textDecoration:'none', boxShadow:'0 10px 34px rgba(204,0,0,0.42)', transition:'all 0.3s ease' }}
              onMouseEnter={e=>{const el=e.currentTarget as HTMLAnchorElement;el.style.transform='translateY(-2px)';el.style.boxShadow='0 14px 42px rgba(204,0,0,0.52)'}}
              onMouseLeave={e=>{const el=e.currentTarget as HTMLAnchorElement;el.style.transform='';el.style.boxShadow='0 10px 34px rgba(204,0,0,0.42)'}}>
              <svg width="15" height="15" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/></svg>
              0524 885 025
            </a>
            <Link href="/contact" style={{ display:'inline-flex', alignItems:'center', gap:'8px', color:'#fff', fontWeight:700, fontSize:'14px', padding:'14px 28px', borderRadius:'12px', border:'1.5px solid rgba(255,255,255,0.22)', textDecoration:'none', transition:'all 0.3s ease' }}
              onMouseEnter={e=>{const el=e.currentTarget as HTMLAnchorElement;el.style.background='rgba(255,255,255,0.1)';el.style.borderColor='rgba(255,255,255,0.4)'}}
              onMouseLeave={e=>{const el=e.currentTarget as HTMLAnchorElement;el.style.background='';el.style.borderColor='rgba(255,255,255,0.22)'}}>
              Nous contacter →
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}