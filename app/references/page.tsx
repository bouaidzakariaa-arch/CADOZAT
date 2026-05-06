'use client'

import { useState, useEffect, useRef } from 'react'
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

const clients = [
  { nom: 'Coca-Cola',                secteur: 'Boissons & Distribution',  logo: '/images/clients/coca-cola.png',    site: 'https://www.coca-cola.com/ma/fr' },
  { nom: 'Oulmes',                   secteur: 'Distribution',             logo: null,                               site: 'https://www.oulmes.ma/' },
  { nom: 'Rafi3',                    secteur: 'Boissons',                 logo: '/images/clients/Rafii.jpg',        site: null },
  { nom: 'HBS',                      secteur: 'Services industriels',     logo: '/images/clients/HBS.png',          site: 'https://www.hsbmaroc.com/' },
  { nom: 'COPAG',                    secteur: 'Coopérative agricole',     logo: '/images/clients/Copag.png',        site: 'https://www.copag.ma' },
  { nom: 'Soussia des Gaz',          secteur: 'Énergie & Gaz',           logo: '/images/clients/soussiya-gaz.png', site: 'https://soussgaz.com/' },
  { nom: 'Al Ain (Dester)',          secteur: 'Eau minérale',             logo: null,                               site: null },
  { nom: 'M2E — Marocaine des Eaux', secteur: 'Eau minérale',             logo: '/images/clients/m2ea.png',         site: null },
  { nom: 'Aqwa Life',                secteur: 'Eau minérale',             logo: '/images/clients/acwa-life.jpg',    site: 'https://aqualife.ma/' },
]

const SECTEUR_META: Record<string, { color: string; bg: string }> = {
  'Boissons & Distribution': { color: '#CC0000',  bg: '#fff5f5' },
  'Boissons':                { color: '#CC0000',  bg: '#fff5f5' },
  'Distribution':            { color: '#1B2B6B',  bg: '#f0f3ff' },
  'Services industriels':    { color: '#374151',  bg: '#f3f4f6' },
  'Coopérative agricole':    { color: '#16a34a',  bg: '#f0fdf4' },
  'Énergie & Gaz':           { color: '#d97706',  bg: '#fffbeb' },
  'Eau minérale':            { color: '#0057A8',  bg: '#f0f7ff' },
}

export default function ReferencesPage() {
  return (
    <main style={{ background: '#f8faff', minHeight: '100vh' }}>
      <style>{`
        @keyframes floatA { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(30px,-25px) scale(1.07)} }
        @keyframes floatB { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(-20px,30px) scale(1.05)} }
        @keyframes floatC { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(15px,15px) scale(1.08)} }
        @keyframes heroIn { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
        .h-in-1{animation:heroIn 0.7s cubic-bezier(0.22,1,0.36,1) 0.05s both}
        .h-in-2{animation:heroIn 0.7s cubic-bezier(0.22,1,0.36,1) 0.18s both}
        .h-in-3{animation:heroIn 0.7s cubic-bezier(0.22,1,0.36,1) 0.3s both}
        .h-in-4{animation:heroIn 0.7s cubic-bezier(0.22,1,0.36,1) 0.45s both}
      `}</style>

      {/* HERO */}
      <section className="relative overflow-hidden" style={{ paddingTop: '110px', paddingBottom: '0', background: '#f8faff' }}>
        <div style={{ position:'absolute', top:'-80px', right:'-80px', width:'520px', height:'520px', borderRadius:'50%', background:'linear-gradient(135deg, rgba(0,87,168,0.09), rgba(27,43,107,0.07))', animation:'floatA 12s ease-in-out infinite', zIndex:0 }} />
        <div style={{ position:'absolute', bottom:'-60px', left:'-60px', width:'420px', height:'420px', borderRadius:'50%', background:'linear-gradient(135deg, rgba(204,0,0,0.06), rgba(201,168,76,0.05))', animation:'floatB 16s ease-in-out infinite', zIndex:0 }} />
        <div style={{ position:'absolute', top:'30%', left:'35%', width:'300px', height:'300px', borderRadius:'50%', background:'rgba(0,87,168,0.05)', animation:'floatC 20s ease-in-out infinite', zIndex:0 }} />
        <div style={{ position:'absolute', inset:0, zIndex:0, opacity:0.5, backgroundImage:'radial-gradient(circle, rgba(0,87,168,0.08) 1px, transparent 1px)', backgroundSize:'32px 32px' }} />

        <div className="relative max-w-7xl mx-auto px-6" style={{ zIndex:1 }}>
          <div className="h-in-1 flex items-center gap-2 text-xs mb-10" style={{ color:'#aab' }}>
            <Link href="/" style={{ color:'#aab', textDecoration:'none' }}>Accueil</Link>
            <span>›</span>
            <span style={{ color:'#0057A8', fontWeight:700 }}>Références</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-end pb-16">
            <div>
              <div className="h-in-1 inline-flex items-center gap-2 px-4 py-2 rounded-full mb-7"
                style={{ background:'#fff', border:'1px solid #e8e8f0', boxShadow:'0 2px 12px rgba(0,0,0,0.06)' }}>
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ background:'#0057A8' }} />
                <span className="text-xs font-black uppercase tracking-widest" style={{ color:'#0057A8' }}>Nos clients</span>
              </div>

              <div className="h-in-2 mb-5">
                <div className="text-xs font-black uppercase tracking-[0.25em] mb-3 flex items-center gap-2" style={{ color:'#0057A8' }}>
                  <div style={{ width:'20px', height:'2px', background:'#0057A8', borderRadius:'2px' }} />
                  Depuis 1996
                </div>
                <h1 style={{ fontSize:'clamp(44px,7vw,78px)', fontWeight:900, lineHeight:0.95, letterSpacing:'-1.5px', color:'#0f172a', margin:0 }}>Ils nous font</h1>
                <h1 style={{ fontSize:'clamp(44px,7vw,78px)', fontWeight:900, lineHeight:0.95, letterSpacing:'-1.5px', margin:0 }}>
                  <span style={{ background:'linear-gradient(90deg, #0057A8 0%, #1B2B6B 100%)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>confiance</span>
                </h1>
              </div>

              <div className="h-in-3 flex items-center gap-2 mb-6">
                <div style={{ width:'40px', height:'3px', background:'#0057A8', borderRadius:'2px' }} />
                <div style={{ width:'20px', height:'3px', background:'#CC0000', borderRadius:'2px' }} />
                <div style={{ width:'8px', height:'3px', background:'#e2e2e8', borderRadius:'2px' }} />
              </div>

              <p className="h-in-3 mb-9" style={{ color:'#64748b', fontSize:'15px', lineHeight:1.75, maxWidth:'440px' }}>
                CADOZAT accompagne les plus grands comptes du Sud Marocain — industrie, BTP, agroalimentaire et distribution — avec des flottes Isuzu & Karry.
              </p>

              <div className="h-in-4 flex flex-wrap gap-3">
                <Link href="/devis"
                  className="inline-flex items-center gap-2 font-black text-white text-sm px-7 py-3.5 rounded-xl transition-all hover:scale-105 hover:brightness-110"
                  style={{ background:'#0057A8', boxShadow:'0 8px 28px rgba(0,87,168,0.3)' }}>
                  Demander un devis
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </Link>
                <a href="tel:0524885025"
                  className="inline-flex items-center gap-2 font-bold text-sm px-7 py-3.5 rounded-xl transition-all"
                  style={{ color:'#1B2B6B', border:'1.5px solid #c7d2fe', background:'#fff' }}>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" /></svg>
                  0524 885 025
                </a>
              </div>
            </div>

            <div className="h-in-4 grid grid-cols-3 gap-4">
              {[
                { n: 9, s:'+', label:'Clients majeurs',  color:'#0057A8', bg:'#f0f7ff' },
                { n: 3, s:'',  label:'Agences Maroc',    color:'#1B2B6B', bg:'#f0f3ff' },
                { n:28, s:'+', label:"Ans d'expérience", color:'#CC0000', bg:'#fff5f5' },
              ].map((s, i) => (
                <div key={i} className="p-6 rounded-2xl text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  style={{ background:s.bg, border:`1px solid ${s.color}18` }}>
                  <div className="text-3xl font-black mb-1" style={{ color:s.color }}>
                    <Counter target={s.n} suffix={s.s} />
                  </div>
                  <div className="text-xs font-semibold" style={{ color:'#94a3b8' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ height:'4px', background:'linear-gradient(90deg, #0057A8 0%, #1B2B6B 40%, #CC0000 70%, #C9A84C 100%)', borderRadius:'2px 2px 0 0', margin:'0 -24px' }} />
        </div>
      </section>

      {/* CLIENTS GRID */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-xs font-black uppercase tracking-widest mb-3" style={{ color:'#0057A8' }}>Références</p>
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="h-px w-10" style={{ background:'#0057A8' }} />
            <h2 className="text-3xl font-black text-gray-900">Nos partenaires</h2>
            <div className="h-px w-10" style={{ background:'#CC0000' }} />
          </div>
          <p className="text-gray-400 text-sm">Industrie · BTP · Agroalimentaire · Distribution</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clients.map((c, i) => {
            const meta = SECTEUR_META[c.secteur] || { color:'#374151', bg:'#f3f4f6' }
            return (
              <RevealItem key={i} delay={(i % 3) * 100}>
                {/* ✅ Un seul attribut style, onClick géré séparément */}
                <div
                  className="group"
                  onClick={() => c.site && window.open(c.site, '_blank')}
                  style={{
                    cursor: c.site ? 'pointer' : 'default',
                    background: '#fff',
                    border: `1px solid ${meta.color}18`,
                    boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    transition: 'all 0.3s cubic-bezier(0.22,1,0.36,1)',
                  }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.transform='translateY(-4px)'; el.style.boxShadow=`0 16px 48px ${meta.color}20, 0 4px 16px rgba(0,0,0,0.08)` }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.transform=''; el.style.boxShadow='0 2px 16px rgba(0,0,0,0.06)' }}
                >
                  <div style={{ height:'3px', background:`linear-gradient(90deg, ${meta.color}, ${meta.color}88)` }} />

                  <div className="flex items-center justify-center" style={{ height:'120px', background: meta.bg, position:'relative' }}>
                    {c.logo ? (
                      <img src={c.logo} alt={c.nom} style={{ maxHeight:'70px', maxWidth:'160px', objectFit:'contain' }} />
                    ) : (
                      <div className="flex items-center justify-center rounded-2xl text-white text-xl font-black"
                        style={{ width:'64px', height:'64px', background:`linear-gradient(135deg, ${meta.color}, ${meta.color}cc)` }}>
                        {c.nom.slice(0, 2).toUpperCase()}
                      </div>
                    )}
                    {c.site && (
                      <div className="absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ background: meta.color }}>
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                        </svg>
                      </div>
                    )}
                  </div>

                  <div className="p-5">
                    <div className="w-6 h-1 rounded-full mb-3" style={{ background: meta.color }} />
                    <h3 className="font-black text-gray-900 text-sm mb-2">{c.nom}</h3>
                    <span className="inline-flex items-center text-xs font-bold px-2.5 py-1 rounded-full"
                      style={{ background: meta.bg, color: meta.color, border:`1px solid ${meta.color}20` }}>
                      {c.secteur}
                    </span>
                  </div>
                </div>
              </RevealItem>
            )
          })}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding:'80px 0', background:'#0f172a', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, backgroundImage:'radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize:'32px 32px' }} />
        <div style={{ position:'absolute', top:'-100px', right:'-100px', width:'500px', height:'500px', borderRadius:'50%', background:'radial-gradient(circle, rgba(0,87,168,0.15) 0%, transparent 60%)' }} />
        <div style={{ position:'absolute', bottom:'-80px', left:'-80px', width:'400px', height:'400px', borderRadius:'50%', background:'radial-gradient(circle, rgba(204,0,0,0.12) 0%, transparent 60%)' }} />

        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <div style={{ display:'inline-flex', alignItems:'center', gap:'8px', background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:'99px', padding:'6px 16px', marginBottom:'24px' }}>
            <span style={{ width:'6px', height:'6px', borderRadius:'50%', background:'#4ade80', boxShadow:'0 0 8px #4ade80', display:'inline-block' }} />
            <span style={{ fontSize:'11px', color:'rgba(255,255,255,0.5)', fontWeight:700, letterSpacing:'0.15em', textTransform:'uppercase' }}>Rejoignez nos références</span>
          </div>

          <h2 style={{ fontSize:'clamp(24px,4vw,42px)', fontWeight:900, color:'#fff', letterSpacing:'-1px', margin:'0 0 16px' }}>
            Besoin de véhicules pour{' '}
            <span style={{ background:'linear-gradient(90deg, #0057A8, #4a9eff)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>votre entreprise</span> ?
          </h2>
          <p style={{ color:'rgba(255,255,255,0.45)', fontSize:'15px', marginBottom:'36px', maxWidth:'480px', margin:'0 auto 36px', lineHeight:1.7 }}>
            Notre équipe vous accompagne avec des flottes Isuzu & Karry adaptées à vos besoins professionnels.
          </p>

          <div style={{ display:'flex', flexWrap:'wrap', gap:'12px', justifyContent:'center' }}>
            <Link href="/devis"
              style={{ display:'inline-flex', alignItems:'center', gap:'8px', background:'#0057A8', color:'#fff', fontWeight:800, fontSize:'14px', padding:'14px 28px', borderRadius:'14px', textDecoration:'none', boxShadow:'0 12px 40px rgba(0,87,168,0.4)', transition:'all 0.3s ease' }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1.04)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.transform = '' }}>
              Demande de devis →
            </Link>
            <a href="tel:0524885025"
              style={{ display:'inline-flex', alignItems:'center', gap:'8px', background:'#CC0000', color:'#fff', fontWeight:800, fontSize:'14px', padding:'14px 28px', borderRadius:'14px', textDecoration:'none', boxShadow:'0 12px 40px rgba(204,0,0,0.35)', transition:'all 0.3s ease' }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1.04)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.transform = '' }}>
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" /></svg>
              0524 885 025
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}