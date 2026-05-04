'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

// ─── Scroll Reveal ────────────────────────────────────────────────────────────
function useInView(threshold = 0.1) {
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
      transform: visible ? 'translateY(0) scale(1)' : 'translateY(32px) scale(0.97)',
      transition: `all 0.6s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
    }}>
      {children}
    </div>
  )
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const gammes = [
  {
    serie: 'D-MAX',
    soustitre: 'Isuzu D-MAX',
    accentColor: '#CC0000',
    accentLight: '#fff5f5',
    icon: '🏎️',
    modeles: [
      { nom: 'D-MAX TFR', slug: 'dmax-tfr', variantes: [{ nom: 'Pick-up SC 4×2 EURO 6', desc: 'Simple cabine — Transmission 4×2' }] },
    ],
  },
  {
    serie: 'N-Series',
    soustitre: 'Isuzu N-Series',
    accentColor: '#1B2B6B',
    accentLight: '#f0f3ff',
    icon: '🚛',
    modeles: [
      { nom: 'NMR 77E', slug: 'nmr-77e', variantes: [{ nom: '3.5T Châssis court', desc: 'Empattement court — Zones urbaines' }] },
      { nom: 'NMR 85H', slug: 'nmr-85h', variantes: [{ nom: '3.5T Châssis long',  desc: 'Empattement long — Plus de capacité' }] },
      { nom: 'NNR 85H', slug: 'nnr-85h', variantes: [{ nom: '3.5T Châssis long',  desc: 'Châssis long renforcé' }] },
      { nom: 'NPR 75K', slug: 'npr-75k', variantes: [{ nom: '7.5T Châssis court', desc: 'Moteur 4HK1 — EURO IV' }] },
      { nom: 'NPR 75L', slug: 'npr-75l', variantes: [{ nom: '7.5T Châssis long',  desc: 'Moteur 4HK1 — EURO IV' }] },
      { nom: 'NQR 90K', slug: 'nqr-90k', variantes: [{ nom: '9.5T Châssis court', desc: 'Moteur 4HK1 — EURO 5' }] },
      { nom: 'NQR 90M', slug: 'nqr-90m', variantes: [{ nom: '9.5T Châssis long',  desc: 'Moteur 4HK1 — EURO 5' }] },
    ],
  },
  {
    serie: 'F-Series',
    soustitre: 'Isuzu F-Series',
    accentColor: '#0057A8',
    accentLight: '#f0f7ff',
    icon: '🚚',
    modeles: [
      { nom: 'FTR 34K', slug: 'ftr-34k', variantes: [{ nom: '16T Châssis court',          desc: 'Poids lourd — Châssis court' }] },
      { nom: 'FTR 34M', slug: 'ftr-34m', variantes: [{ nom: '16T Châssis intermédiaire',  desc: 'Poids lourd — Châssis intermédiaire' }] },
      { nom: 'FTR 34P', slug: 'ftr-34p', variantes: [{ nom: '16T Châssis long',           desc: 'Poids lourd — Châssis long' }] },
      { nom: 'FVR 34K', slug: 'fvr-34k', variantes: [{ nom: '18T Châssis court',          desc: 'Très poids lourd — Châssis court' }] },
      { nom: 'FVR 34P', slug: 'fvr-34p', variantes: [{ nom: '18T Châssis long',           desc: 'Très poids lourd — Châssis long' }] },
    ],
  },
]

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function CataloguePage() {
  return (
    <main style={{ background: '#f8faff', minHeight: '100vh' }}>
      <style>{`
        @keyframes floatA { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(30px,-25px) scale(1.07)} }
        @keyframes floatB { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(-20px,30px) scale(1.05)} }
        @keyframes floatC { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(15px,15px) scale(1.08)} }
        @keyframes heroIn { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
        .h-in-1{animation:heroIn 0.7s cubic-bezier(0.22,1,0.36,1) 0.05s both}
        .h-in-2{animation:heroIn 0.7s cubic-bezier(0.22,1,0.36,1) 0.2s both}
        .h-in-3{animation:heroIn 0.7s cubic-bezier(0.22,1,0.36,1) 0.35s both}
        .h-in-4{animation:heroIn 0.7s cubic-bezier(0.22,1,0.36,1) 0.5s both}
      `}</style>

      {/* ── HERO ── */}
      <section className="relative overflow-hidden" style={{ paddingTop: '110px', paddingBottom: '0', background: '#f8faff' }}>
        {/* Blobs */}
        <div style={{ position:'absolute', top:'-80px', right:'-80px', width:'520px', height:'520px', borderRadius:'50%', background:'linear-gradient(135deg, rgba(204,0,0,0.07), rgba(27,43,107,0.06))', animation:'floatA 12s ease-in-out infinite', zIndex:0 }} />
        <div style={{ position:'absolute', bottom:'-60px', left:'-60px', width:'420px', height:'420px', borderRadius:'50%', background:'linear-gradient(135deg, rgba(0,87,168,0.07), rgba(27,43,107,0.05))', animation:'floatB 16s ease-in-out infinite', zIndex:0 }} />
        <div style={{ position:'absolute', top:'35%', left:'40%', width:'280px', height:'280px', borderRadius:'50%', background:'rgba(201,168,76,0.05)', animation:'floatC 20s ease-in-out infinite', zIndex:0 }} />
        <div style={{ position:'absolute', inset:0, zIndex:0, opacity:0.45, backgroundImage:'radial-gradient(circle, rgba(0,87,168,0.08) 1px, transparent 1px)', backgroundSize:'32px 32px' }} />

        <div className="relative max-w-7xl mx-auto px-6" style={{ zIndex:1 }}>
          {/* Breadcrumb */}
          <div className="h-in-1 flex items-center gap-2 text-xs mb-10" style={{ color:'#aab' }}>
            <Link href="/" style={{ color:'#aab', textDecoration:'none' }}>Accueil</Link>
            <span>›</span>
            <span style={{ color:'#0057A8', fontWeight:700 }}>Catalogue</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-end pb-16">
            {/* Left */}
            <div>
              <div className="h-in-1 inline-flex items-center gap-2 px-4 py-2 rounded-full mb-7"
                style={{ background:'#fff', border:'1px solid #e8e8f0', boxShadow:'0 2px 12px rgba(0,0,0,0.06)' }}>
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ background:'#CC0000' }} />
                <span className="text-xs font-black uppercase tracking-widest" style={{ color:'#1B2B6B' }}>Concessionnaire officiel Isuzu</span>
              </div>

              <div className="h-in-2 mb-5">
                <div className="text-xs font-black uppercase tracking-[0.25em] mb-3 flex items-center gap-2" style={{ color:'#CC0000' }}>
                  <div style={{ width:'20px', height:'2px', background:'#CC0000', borderRadius:'2px' }} />
                  Ouarzazate · Agadir · Tinghir
                </div>
                <h1 style={{ fontSize:'clamp(44px,7vw,80px)', fontWeight:900, lineHeight:0.92, letterSpacing:'-1.5px', color:'#0f172a', margin:0 }}>
                  Notre
                </h1>
                <h1 style={{ fontSize:'clamp(44px,7vw,80px)', fontWeight:900, lineHeight:0.92, letterSpacing:'-1.5px', margin:0 }}>
                  <span style={{ background:'linear-gradient(90deg, #CC0000 0%, #0057A8 100%)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>Gamme</span>
                </h1>
              </div>

              <div className="h-in-3 flex items-center gap-2 mb-6">
                <div style={{ width:'40px', height:'3px', background:'#CC0000', borderRadius:'2px' }} />
                <div style={{ width:'20px', height:'3px', background:'#0057A8', borderRadius:'2px' }} />
                <div style={{ width:'8px', height:'3px', background:'#e2e2e8', borderRadius:'2px' }} />
              </div>

              <p className="h-in-3 mb-9" style={{ color:'#64748b', fontSize:'15px', lineHeight:1.75, maxWidth:'440px' }}>
                De 3.5T à 18T — pick-up, camions légers, moyens et lourds. Toute la gamme Isuzu disponible dans nos agences.
              </p>

              <div className="h-in-4 flex flex-wrap gap-3">
                <Link href="/devis"
                  className="inline-flex items-center gap-2 font-black text-white text-sm px-7 py-3.5 rounded-xl transition-all hover:scale-105"
                  style={{ background:'#CC0000', boxShadow:'0 8px 28px rgba(204,0,0,0.3)' }}>
                  Demande de devis
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

            {/* Right — stats */}
            <div className="h-in-4 grid grid-cols-3 gap-4">
              {[
                { nb:'14', label:'Modèles Isuzu', color:'#CC0000',  bg:'#fff5f5' },
                { nb:'3',  label:'Séries',         color:'#0057A8', bg:'#f0f7ff' },
                { nb:'3T→18T', label:'Gamme PTAC', color:'#1B2B6B', bg:'#f0f3ff' },
              ].map((s, i) => (
                <div key={i} className="p-6 rounded-2xl text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  style={{ background:s.bg, border:`1px solid ${s.color}18` }}>
                  <div className="font-black mb-1" style={{ color:s.color, fontSize: s.nb.length > 3 ? '18px' : '28px' }}>{s.nb}</div>
                  <div className="text-xs font-semibold" style={{ color:'#94a3b8' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom bar */}
          <div style={{ height:'4px', background:'linear-gradient(90deg, #CC0000 0%, #1B2B6B 40%, #0057A8 70%, #C9A84C 100%)', borderRadius:'2px 2px 0 0', margin:'0 -24px' }} />
        </div>
      </section>

      {/* ── GAMMES ── */}
      <section style={{ padding:'80px 0' }}>
        <div className="max-w-7xl mx-auto px-6 space-y-24">
          {gammes.map((gamme) => {
            const cols = gamme.modeles.length <= 2 ? 'md:grid-cols-2'
              : gamme.modeles.length <= 4 ? 'md:grid-cols-2 lg:grid-cols-4'
              : 'md:grid-cols-3 lg:grid-cols-4'

            return (
              <section key={gamme.serie} id={gamme.serie.toLowerCase().replace(' ', '-')}>

                {/* Section header */}
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                    style={{ background: gamme.accentLight, border:`1px solid ${gamme.accentColor}20` }}>
                    {gamme.icon}
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest mb-0.5" style={{ color: gamme.accentColor }}>{gamme.soustitre}</p>
                    <h2 className="text-2xl font-black" style={{ color: '#0f172a' }}>{gamme.serie}</h2>
                  </div>
                  <div className="flex-1 h-px ml-4" style={{ background:`linear-gradient(90deg, ${gamme.accentColor}30, transparent)` }} />
                  <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ background: gamme.accentLight, color: gamme.accentColor }}>
                    {gamme.modeles.length} modèle{gamme.modeles.length > 1 ? 's' : ''}
                  </span>
                </div>

                {/* Cards */}
                <div className={`grid gap-5 ${cols}`}>
                  {gamme.modeles.map((modele, idx) => (
                    <RevealItem key={modele.slug} delay={idx * 70}>
                      <Link
                        href={`/catalogue/${modele.slug}`}
                        className="group block rounded-2xl overflow-hidden transition-all duration-300"
                        style={{ background:'#fff', border:`1px solid ${gamme.accentColor}18`, boxShadow:'0 2px 16px rgba(0,0,0,0.05)' }}
                        onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform='translateY(-5px)'; el.style.boxShadow=`0 16px 48px ${gamme.accentColor}20, 0 4px 16px rgba(0,0,0,0.08)` }}
                        onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform=''; el.style.boxShadow='0 2px 16px rgba(0,0,0,0.05)' }}
                      >
                        {/* Top stripe */}
                        <div style={{ height:'3px', background:`linear-gradient(90deg, ${gamme.accentColor}, ${gamme.accentColor}55)` }} />

                        {/* Header */}
                        <div className="p-5" style={{ background: gamme.accentLight }}>
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-black text-base" style={{ color: gamme.accentColor }}>{modele.nom}</h3>
                            <span className="text-xs font-bold px-2 py-0.5 rounded-full text-white" style={{ background: gamme.accentColor }}>
                              {modele.variantes.length} var.
                            </span>
                          </div>
                          <p className="text-xs" style={{ color: gamme.accentColor + 'aa' }}>{gamme.soustitre}</p>
                        </div>

                        {/* Variantes */}
                        <div className="p-4">
                          <div className="space-y-2 mb-4">
                            {modele.variantes.map((v, vi) => (
                              <div key={vi} className="flex items-start gap-2.5 p-3 rounded-xl transition-colors"
                                style={{ background:'#f8faff', border:'1px solid rgba(0,0,0,0.04)' }}>
                                <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5" style={{ background: gamme.accentColor }} />
                                <div>
                                  <p className="text-sm font-bold text-gray-800">{v.nom}</p>
                                  <p className="text-xs text-gray-400 mt-0.5">{v.desc}</p>
                                </div>
                              </div>
                            ))}
                          </div>

                          <div className="flex items-center justify-between pt-3" style={{ borderTop:`1px solid ${gamme.accentColor}12` }}>
                            <span className="text-xs font-bold" style={{ color: gamme.accentColor }}>Fiche technique</span>
                            <div className="w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                              style={{ background: gamme.accentColor }}>
                              <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7"/>
                              </svg>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </RevealItem>
                  ))}
                </div>
              </section>
            )
          })}
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding:'80px 0', background:'#0f172a', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, backgroundImage:'radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize:'32px 32px' }} />
        <div style={{ position:'absolute', top:'-100px', right:'-100px', width:'500px', height:'500px', borderRadius:'50%', background:'radial-gradient(circle, rgba(204,0,0,0.14) 0%, transparent 60%)' }} />
        <div style={{ position:'absolute', bottom:'-80px', left:'-80px', width:'400px', height:'400px', borderRadius:'50%', background:'radial-gradient(circle, rgba(0,87,168,0.2) 0%, transparent 60%)' }} />
        <div style={{ position:'absolute', top:0, left:0, right:0, height:'2px', background:'linear-gradient(90deg, #CC0000, #0057A8, #C9A84C)' }} />

        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <div style={{ display:'inline-flex', alignItems:'center', gap:'8px', background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:'99px', padding:'6px 16px', marginBottom:'24px' }}>
            <span style={{ width:'6px', height:'6px', borderRadius:'50%', background:'#4ade80', boxShadow:'0 0 8px #4ade80', display:'inline-block' }} />
            <span style={{ fontSize:'11px', color:'rgba(255,255,255,0.5)', fontWeight:700, letterSpacing:'0.15em', textTransform:'uppercase' }}>Besoin d'un conseil ?</span>
          </div>

          <h2 style={{ fontSize:'clamp(24px,4vw,42px)', fontWeight:900, color:'#fff', letterSpacing:'-1px', margin:'0 0 16px' }}>
            Choisissez le véhicule adapté<br/>
            <span style={{ background:'linear-gradient(90deg, #CC0000, #0057A8)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>à votre activité</span>
          </h2>

          <p style={{ color:'rgba(255,255,255,0.45)', fontSize:'15px', marginBottom:'36px', maxWidth:'480px', margin:'0 auto 36px', lineHeight:1.7 }}>
            Notre équipe vous aide à sélectionner le modèle le plus adapté à vos besoins et votre budget.
          </p>

          <div style={{ display:'flex', flexWrap:'wrap', gap:'12px', justifyContent:'center' }}>
            <Link href="/devis"
              style={{ display:'inline-flex', alignItems:'center', gap:'8px', background:'#CC0000', color:'#fff', fontWeight:800, fontSize:'14px', padding:'14px 28px', borderRadius:'14px', textDecoration:'none', boxShadow:'0 12px 40px rgba(204,0,0,0.4)', transition:'all 0.3s ease' }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.transform='scale(1.04)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.transform='' }}>
              Demande de devis →
            </Link>
            <Link href="/contact"
              style={{ display:'inline-flex', alignItems:'center', gap:'8px', background:'rgba(0,87,168,0.25)', color:'rgba(255,255,255,0.8)', fontWeight:700, fontSize:'14px', padding:'14px 28px', borderRadius:'14px', border:'1px solid rgba(0,87,168,0.4)', textDecoration:'none', transition:'all 0.3s ease' }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background='rgba(0,87,168,0.4)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background='rgba(0,87,168,0.25)' }}>
              Nous contacter
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}