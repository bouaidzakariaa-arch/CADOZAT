'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

// ─── Scroll Reveal ────────────────────────────────────────────────────────────
function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); obs.disconnect() }
    }, { threshold })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, inView }
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, inView } = useInView()
  return (
    <div ref={ref} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? 'translateY(0)' : 'translateY(32px)',
      transition: `all 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
    }}>
      {children}
    </div>
  )
}

// ─── Counter ─────────────────────────────────────────────────────────────────
function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [val, setVal] = useState(0)
  const { ref, inView } = useInView(0.5)
  useEffect(() => {
    if (!inView) return
    let start = 0; const step = Math.ceil(target / 40)
    const t = setInterval(() => { start += step; if (start >= target) { setVal(target); clearInterval(t) } else setVal(start) }, 30)
    return () => clearInterval(t)
  }, [inView, target])
  return <span ref={ref}>{val}{suffix}</span>
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const ACTIVITES = [
  { icon: '🚛', color: '#CC0000',  titre: 'Vente de véhicules',     desc: "Pick-up, camions porteurs, engins de BTP et véhicules utilitaires Isuzu & Karry" },
  { icon: '🔧', color: '#0057A8', titre: 'Service après-vente',     desc: "Atelier fixe et atelier mobile pour interventions sur site dans toute la région" },
  { icon: '📋', color: '#1B2B6B', titre: 'Marchés publics',         desc: "Réponse aux appels d'offres et bons de commande pour collectivités et institutions" },
  { icon: '📦', color: '#CC0000',  titre: 'Pièces de rechange',      desc: "Distribution de pièces d'origine et accessoires pour tous les modèles de la gamme" },
  { icon: '🚜', color: '#2D6A4F', titre: 'Machines agricoles',       desc: "Vente et maintenance d'équipements agricoles adaptés aux besoins du terrain" },
]

const AGENCES = [
  { ville: 'Ouarzazate', role: 'Siège social',    desc: 'Agence principale — showroom, atelier, administration', icon: '🏢', color: '#CC0000',  bg: '#fff5f5' },
  { ville: 'Agadir',     role: 'Agence régionale', desc: 'Couverture du Souss-Massa et des provinces du Sud',    icon: '🌊', color: '#0057A8', bg: '#f0f7ff' },
  { ville: 'Tinghir',    role: 'Agence régionale', desc: 'Présence au cœur du Drâa-Tafilalet',                  icon: '🏔️', color: '#2D6A4F', bg: '#f0fdf4' },
]

const MOYENS = [
  { icon: '🏢', color: '#CC0000',  titre: "Espaces d'exposition",     desc: 'Showrooms dans chacune de nos 3 agences' },
  { icon: '🔩', color: '#0057A8', titre: 'Ateliers de réparation',    desc: 'Équipés pour l\'entretien et la réparation de tous véhicules' },
  { icon: '📦', color: '#1B2B6B', titre: 'Magasins pièces rechange',  desc: "Stock de pièces d'origine pour intervention rapide" },
  { icon: '🚐', color: '#CC0000',  titre: 'Atelier mobile',           desc: 'Dacia Dokker équipé — intervention sur site partout dans la région' },
  { icon: '💻', color: '#0057A8', titre: 'Logiciel TOPAZE',           desc: 'Gestion stock, comptabilité et diagnostic électronique' },
  { icon: '🔵', color: '#2D6A4F', titre: 'Station pneumatique',       desc: 'Équipement complet pour les véhicules lourds et utilitaires' },
]

export default function SocietePage() {
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
        .h-in-4{animation:heroIn 0.7s cubic-bezier(0.22,1,0.36,1) 0.44s both}
        .h-in-5{animation:heroIn 0.7s cubic-bezier(0.22,1,0.36,1) 0.58s both}
      `}</style>

      {/* ── HERO ── */}
      <section className="relative overflow-hidden" style={{ paddingTop: '110px', paddingBottom: '0', background: '#f8faff' }}>
        {/* Blobs */}
        <div style={{ position:'absolute', top:'-80px', right:'-80px', width:'560px', height:'560px', borderRadius:'50%', background:'linear-gradient(135deg, rgba(0,87,168,0.09), rgba(27,43,107,0.07))', animation:'floatA 12s ease-in-out infinite', zIndex:0 }} />
        <div style={{ position:'absolute', bottom:'-60px', left:'-60px', width:'440px', height:'440px', borderRadius:'50%', background:'linear-gradient(135deg, rgba(204,0,0,0.06), rgba(45,106,79,0.05))', animation:'floatB 16s ease-in-out infinite', zIndex:0 }} />
        <div style={{ position:'absolute', top:'35%', left:'40%', width:'280px', height:'280px', borderRadius:'50%', background:'rgba(201,168,76,0.05)', animation:'floatC 20s ease-in-out infinite', zIndex:0 }} />
        <div style={{ position:'absolute', inset:0, zIndex:0, opacity:0.45, backgroundImage:'radial-gradient(circle, rgba(0,87,168,0.08) 1px, transparent 1px)', backgroundSize:'32px 32px' }} />

        <div className="relative max-w-7xl mx-auto px-6" style={{ zIndex:1 }}>
          {/* Breadcrumb */}
          <div className="h-in-1 flex items-center gap-2 text-xs mb-10" style={{ color:'#aab' }}>
            <Link href="/" style={{ color:'#aab', textDecoration:'none' }}>Accueil</Link>
            <span>›</span>
            <span style={{ color:'#0057A8', fontWeight:700 }}>Société</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-end pb-16">
            {/* Left */}
            <div>
              {/* Badge */}
              <div className="h-in-1 inline-flex items-center gap-2 px-4 py-2 rounded-full mb-7"
                style={{ background:'#fff', border:'1px solid #e8e8f0', boxShadow:'0 2px 12px rgba(0,0,0,0.06)' }}>
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ background:'#CC0000' }} />
                <span className="text-xs font-black uppercase tracking-widest" style={{ color:'#1B2B6B' }}>Depuis 1996 — Ouarzazate, Maroc</span>
              </div>

              {/* Title */}
              <div className="h-in-2 mb-5">
                <div className="text-xs font-black uppercase tracking-[0.25em] mb-3 flex items-center gap-2" style={{ color:'#CC0000' }}>
                  <div style={{ width:'20px', height:'2px', background:'#CC0000', borderRadius:'2px' }} />
                  Concessionnaire officiel Isuzu & Karry
                </div>
                <h1 style={{ fontSize:'clamp(44px,7vw,80px)', fontWeight:900, lineHeight:0.92, letterSpacing:'-2px', color:'#0f172a', margin:0 }}>
                  STE CADOZAT
                </h1>
                <h1 style={{ fontSize:'clamp(44px,7vw,80px)', fontWeight:900, lineHeight:0.92, letterSpacing:'-2px', margin:0 }}>
                  <span style={{ background:'linear-gradient(90deg, #CC0000 0%, #0057A8 100%)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>SARL</span>
                </h1>
              </div>

              {/* Divider */}
              <div className="h-in-3 flex items-center gap-2 mb-6">
                <div style={{ width:'40px', height:'3px', background:'#CC0000', borderRadius:'2px' }} />
                <div style={{ width:'20px', height:'3px', background:'#0057A8', borderRadius:'2px' }} />
                <div style={{ width:'8px', height:'3px', background:'#e2e2e8', borderRadius:'2px' }} />
              </div>

              <p className="h-in-3 mb-9" style={{ color:'#64748b', fontSize:'15px', lineHeight:1.8, maxWidth:'460px' }}>
                Concessionnaire officiel des marques <strong style={{ color:'#CC0000' }}>Isuzu</strong> et <strong style={{ color:'#0057A8' }}>Karry</strong> dans la région de Souss-Massa et Drâa-Tafilalt, CADOZAT s'est imposé comme le leader des véhicules utilitaires et industriels au Sud du Maroc depuis plus de <strong style={{ color:'#0f172a' }}>28 ans</strong>.
              </p>

              {/* CTAs */}
              <div className="h-in-4 flex flex-wrap gap-3">
                <Link href="/devis"
                  className="inline-flex items-center gap-2 font-black text-white text-sm px-7 py-3.5 rounded-xl transition-all hover:scale-105"
                  style={{ background:'#CC0000', boxShadow:'0 8px 28px rgba(204,0,0,0.3)' }}>
                  Demande de devis
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </Link>
                <Link href="/contact"
                  className="inline-flex items-center gap-2 font-bold text-sm px-7 py-3.5 rounded-xl transition-all"
                  style={{ color:'#1B2B6B', border:'1.5px solid #c7d2fe', background:'#fff' }}>
                  Nous contacter
                </Link>
              </div>
            </div>

            {/* Right — stats */}
            <div className="h-in-5 grid grid-cols-3 gap-4">
              {[
                { n:28, s:'+', label:"Années d'expérience", color:'#CC0000',  bg:'#fff5f5' },
                { n:3,  s:'',  label:'Agences au Maroc',    color:'#0057A8', bg:'#f0f7ff' },
                { n:1996,s:'', label:'Année de création',   color:'#2D6A4F', bg:'#f0fdf4' },
              ].map((s, i) => (
                <div key={i} className="p-6 rounded-2xl text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  style={{ background:s.bg, border:`1px solid ${s.color}18` }}>
                  <div className="text-2xl font-black mb-1" style={{ color:s.color, fontSize: s.n > 999 ? '20px' : undefined }}>
                    <Counter target={s.n} suffix={s.s} />
                  </div>
                  <div className="text-xs font-semibold" style={{ color:'#94a3b8' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom bar */}
          <div style={{ height:'4px', background:'linear-gradient(90deg, #CC0000 0%, #0057A8 40%, #1B2B6B 70%, #2D6A4F 100%)', borderRadius:'2px 2px 0 0', margin:'0 -24px' }} />
        </div>
      </section>

      {/* ── PRÉSENTATION ── */}
      <section style={{ padding:'80px 0', background:'#fff' }}>
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
              <div>
                <p className="text-xs font-black uppercase tracking-widest mb-4" style={{ color:'#CC0000' }}>Notre histoire</p>
                <h2 className="text-4xl font-black text-gray-900 mb-6 leading-tight">
                  Une entreprise<br/>marocaine enracinée
                </h2>
                <div className="space-y-5 text-gray-500 leading-relaxed text-sm">
                  <p>Fondée en <strong className="text-gray-800">1996</strong> à Ouarzazate, la société CADOZAT est un concessionnaire agréé de véhicules industriels et utilitaires, représentant officiellement les marques <strong style={{ color:'#CC0000' }}>Isuzu</strong> et <strong style={{ color:'#0057A8' }}>Karry</strong> sur le marché marocain.</p>
                  <p>Grâce à une expertise accumulée sur plus de deux décennies, CADOZAT s'est imposée comme le <strong className="text-gray-800">leader des véhicules utilitaires et industriels au Sud du Maroc</strong>, avec des agences à Ouarzazate, Agadir et Tinghir.</p>
                  <p>L'entreprise accompagne une clientèle variée — professionnels, entreprises, collectivités territoriales et institutions publiques — avec des solutions adaptées à chaque besoin.</p>
                </div>
              </div>

              <div>
                <p className="text-xs font-black uppercase tracking-widest mb-6" style={{ color:'#0057A8' }}>Domaines d'activité</p>
                <div className="space-y-1">
                  {ACTIVITES.map((a, i) => (
                    <div key={i} className="group flex items-start gap-4 py-4 px-4 rounded-xl transition-all hover:shadow-sm"
                      style={{ borderBottom:'1px solid #f0f4ff' }}
                      onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = a.color + '06' }}
                      onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = '' }}>
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                        style={{ background: a.color + '12' }}>
                        {a.icon}
                      </div>
                      <div>
                        <div className="font-black text-gray-900 text-sm mb-0.5">{a.titre}</div>
                        <div className="text-gray-400 text-xs leading-relaxed">{a.desc}</div>
                      </div>
                      <div className="ml-auto w-1.5 h-1.5 rounded-full mt-3 flex-shrink-0" style={{ background: a.color }} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── NOS AGENCES ── */}
      <section style={{ padding:'80px 0', background:'#f8faff', position:'relative' }}>
        <div style={{ position:'absolute', inset:0, opacity:0.4, backgroundImage:'radial-gradient(circle, rgba(0,87,168,0.07) 1px, transparent 1px)', backgroundSize:'28px 28px' }} />
        <div className="relative max-w-7xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-14">
              <p className="text-xs font-black uppercase tracking-widest mb-3" style={{ color:'#0057A8' }}>Présence nationale</p>
              <div className="flex items-center justify-center gap-3 mb-3">
                <div className="h-px w-10" style={{ background:'#0057A8' }} />
                <h2 className="text-3xl font-black text-gray-900">Nos agences</h2>
                <div className="h-px w-10" style={{ background:'#CC0000' }} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {AGENCES.map((a, i) => (
                <div key={i} className="group rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl bg-white"
                  style={{ border:`1px solid ${a.color}18` }}>
                  <div style={{ height:'4px', background:`linear-gradient(90deg, ${a.color}, ${a.color}88)` }} />
                  <div className="p-8">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-5"
                      style={{ background: a.bg }}>
                      {a.icon}
                    </div>
                    <h3 className="text-xl font-black text-gray-900 mb-1">{a.ville}</h3>
                    <div className="text-xs font-black uppercase tracking-wider mb-4" style={{ color:a.color }}>{a.role}</div>
                    <p className="text-gray-400 text-sm leading-relaxed">{a.desc}</p>
                    <div className="mt-5 pt-4" style={{ borderTop:`1px solid ${a.color}15` }}>
                      <div className="flex gap-1">
                        {[0,1,2].map(j => <div key={j} className="w-1.5 h-1.5 rounded-full" style={{ background: j === 0 ? a.color : a.color + '30' }} />)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── MOYENS TECHNIQUES ── */}
      <section style={{ padding:'80px 0', background:'#fff' }}>
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
              <div>
                <p className="text-xs font-black uppercase tracking-widest mb-4" style={{ color:'#0057A8' }}>Infrastructure</p>
                <h2 className="text-4xl font-black text-gray-900 mb-6 leading-tight">Moyens techniques</h2>
                <div className="flex items-center gap-2 mb-8">
                  <div style={{ width:'40px', height:'3px', background:'#0057A8', borderRadius:'2px' }} />
                  <div style={{ width:'20px', height:'3px', background:'#CC0000', borderRadius:'2px' }} />
                </div>
                <div className="space-y-5 text-gray-500 leading-relaxed text-sm">
                  <p>CADOZAT dispose d'une infrastructure complète répartie sur ses trois agences : espaces d'exposition, ateliers d'entretien et de réparation, magasins de pièces de rechange.</p>
                  <p>L'entreprise est équipée d'outils de diagnostic modernes, notamment le logiciel <strong className="text-gray-800">TOPAZE</strong> pour la gestion du stock et la comptabilité, ainsi qu'un scanner embarqué pour le diagnostic électronique.</p>
                  <p>Un <strong className="text-gray-800">atelier mobile Dacia Dokker</strong> permet d'intervenir directement sur site, garantissant un service rapide et efficace même dans les zones éloignées.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {MOYENS.map((t, i) => (
                  <div key={i} className="group flex items-center gap-4 p-4 rounded-xl transition-all hover:shadow-sm"
                    style={{ background:`${t.color}06`, border:`1px solid ${t.color}15` }}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                      style={{ background: t.color + '15' }}>
                      {t.icon}
                    </div>
                    <div>
                      <div className="font-black text-gray-900 text-sm">{t.titre}</div>
                      <div className="text-gray-400 text-xs mt-0.5">{t.desc}</div>
                    </div>
                    <div className="ml-auto w-2 h-2 rounded-full flex-shrink-0" style={{ background: t.color }} />
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section style={{ padding:'80px 0', background:'#0f172a', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, backgroundImage:'radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize:'32px 32px' }} />
        <div style={{ position:'absolute', top:'-100px', right:'-100px', width:'500px', height:'500px', borderRadius:'50%', background:'radial-gradient(circle, rgba(0,87,168,0.18) 0%, transparent 60%)' }} />
        <div style={{ position:'absolute', bottom:'-80px', left:'-80px', width:'400px', height:'400px', borderRadius:'50%', background:'radial-gradient(circle, rgba(204,0,0,0.12) 0%, transparent 60%)' }} />

        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <div style={{ display:'inline-flex', alignItems:'center', gap:'8px', background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:'99px', padding:'6px 16px', marginBottom:'24px' }}>
            <span style={{ width:'6px', height:'6px', borderRadius:'50%', background:'#4ade80', boxShadow:'0 0 8px #4ade80', display:'inline-block' }} />
            <span style={{ fontSize:'11px', color:'rgba(255,255,255,0.5)', fontWeight:700, letterSpacing:'0.15em', textTransform:'uppercase' }}>Votre partenaire de confiance</span>
          </div>

          <h2 style={{ fontSize:'clamp(24px,4vw,42px)', fontWeight:900, color:'#fff', letterSpacing:'-1px', margin:'0 0 16px' }}>
            Travaillons <span style={{ background:'linear-gradient(90deg, #CC0000, #ff6b6b)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>ensemble</span>
          </h2>
          <p style={{ color:'rgba(255,255,255,0.45)', fontSize:'15px', marginBottom:'36px', maxWidth:'480px', margin:'0 auto 36px', lineHeight:1.7 }}>
            Nos équipes sont disponibles dans nos agences de Ouarzazate, Agadir et Tinghir pour répondre à toutes vos demandes.
          </p>

          <div style={{ display:'flex', flexWrap:'wrap', gap:'12px', justifyContent:'center' }}>
            <Link href="/devis"
              style={{ display:'inline-flex', alignItems:'center', gap:'10px', background:'#CC0000', color:'#fff', fontWeight:800, fontSize:'14px', padding:'14px 28px', borderRadius:'14px', textDecoration:'none', boxShadow:'0 12px 40px rgba(204,0,0,0.4)', transition:'all 0.3s ease' }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1.04)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.transform = '' }}>
              Demande de devis →
            </Link>
            <Link href="/contact"
              style={{ display:'inline-flex', alignItems:'center', gap:'8px', background:'rgba(255,255,255,0.08)', color:'rgba(255,255,255,0.8)', fontWeight:700, fontSize:'14px', padding:'14px 28px', borderRadius:'14px', border:'1px solid rgba(255,255,255,0.15)', textDecoration:'none' }}>
              Nous contacter
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}