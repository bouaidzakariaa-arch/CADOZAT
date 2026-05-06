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
      transform: visible ? 'translateY(0)' : 'translateY(36px)',
      transition: `all 0.65s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
    }}>
      {children}
    </div>
  )
}

const IcWrench = () => (<svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg>)
const IcShield = () => (<svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>)
const IcBox = () => (<svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>)
const IcTruck = () => (<svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"/></svg>)
const IcClip = () => (<svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/></svg>)
const IcPhone = () => (<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 7V5z"/></svg>)
const IcCheck = () => (<svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/></svg>)
const IcPin = () => (<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>)
const IcClock = () => (<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>)
const IcArrow = () => (<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>)

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
    <div className="relative w-full h-full overflow-hidden">
      <div style={{ display:'flex', width:`${images.length * 100}%`, height:'100%', transform:`translateX(-${current * (100 / images.length)}%)`, transition:'transform 0.8s cubic-bezier(0.77,0,0.175,1)' }}>
        {images.map((src, i) => (
          <div key={i} style={{ width:`${100 / images.length}%`, flexShrink:0, position:'relative', height:'100%' }}>
            <img src={src} alt={`${alt} ${i + 1}`} style={{ width:'100%', height:'100%', objectFit:'cover' }}/>
          </div>
        ))}
      </div>
      <div className="absolute inset-x-0 bottom-0 h-24 pointer-events-none" style={{ background:'linear-gradient(to top, rgba(0,0,0,0.35), transparent)' }}/>
      {[-1, 1].map(dir => (
        <button key={dir} onClick={() => goTo((current + dir + images.length) % images.length)}
          className="absolute top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
          style={{ [dir === -1 ? 'left' : 'right']:'16px', background:'rgba(255,255,255,0.15)', color:'#fff', backdropFilter:'blur(10px)', border:'1px solid rgba(255,255,255,0.3)' }}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d={dir === -1 ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"}/>
          </svg>
        </button>
      ))}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
        {images.map((_, i) => (
          <button key={i} onClick={() => goTo(i)} style={{ height:'2px', width:i===current?'32px':'12px', background:i===current?'#fff':'rgba(255,255,255,0.38)', borderRadius:'2px', transition:'all 0.45s ease', border:'none', padding:0, cursor:'pointer' }} />
        ))}
      </div>
    </div>
  )
}

const ENGAGEMENTS = [
  { icon: <IcWrench/>, color:'#CC0000', bg:'#fff5f5', titre:'Atelier fixe', desc:"Atelier de réparation et d'entretien équipé de ponts élévateurs, station pneumatique et outillage aux normes constructeur." },
  { icon: <IcShield/>, color:'#0057A8', bg:'#f0f7ff', titre:'Garantie constructeur', desc:'Tous nos véhicules bénéficient de la garantie officielle Isuzu. Traitement prioritaire pour tout véhicule sous garantie.' },
  { icon: <IcBox/>, color:'#CC0000', bg:'#fff5f5', titre:"Pièces d'origine", desc:"Stock permanent de pièces de rechange 100% d'origine géré via le logiciel TOPAZE. Approvisionnement rapide si rupture." },
  { icon: <IcTruck/>, color:'#CC0000', bg:'#fff5f5', titre:'Atelier mobile sur site', desc:"Atelier mobile Dacia Dokker équipé d'outillage complet et pièces de rechange. Intervention directement chez vous." },
  { icon: <IcClip/>, color:'#0057A8', bg:'#f0f7ff', titre:'Diagnostic TOPAZE', desc:"Scanner de diagnostic homologué et logiciel TOPAZE pour la gestion de l'entretien, du stock et du suivi de chaque véhicule." },
]

function AtelierCard({ img, imgs, ville, couleur, titre, desc, infos, services, badge, reverse = false, height = 420 }: {
  img?: string; imgs?: string[]; ville: string; couleur: string; titre: string; desc: string
  infos: { icon: React.ReactNode; label: string; val: string }[]
  services: string[]; badge: string; reverse?: boolean; height?: number
}) {
  const { ref, visible } = useInView()
  return (
    <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20"
      style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(40px)', transition:'all 0.7s cubic-bezier(0.22,1,0.36,1)' }}>
      <div className={`group relative rounded-3xl overflow-hidden shadow-2xl ${reverse ? 'order-1 lg:order-2' : ''}`} style={{ height }}>
        {imgs && imgs.length > 1
          ? <AtelierCarousel images={imgs} alt={`Atelier CADOZAT ${ville}`}/>
          : <img src={img} alt={`Atelier CADOZAT ${ville}`} className="w-full h-full object-cover"/>
        }
        <div className="absolute bottom-5 left-5 px-4 py-2 rounded-xl text-white text-sm font-extrabold z-30"
          style={{ background:`linear-gradient(135deg,${couleur},${couleur}cc)`, boxShadow:`0 4px 16px ${couleur}55` }}>
          {badge}
        </div>
      </div>

      <div className={reverse ? 'order-2 lg:order-1' : ''}>
        <div className="flex items-center gap-3 mb-5">
          <div className="h-px w-8" style={{ background:couleur }}/>
          <span className="text-xs font-black tracking-[.25em] uppercase" style={{ color:couleur }}>{ville}</span>
        </div>
        <h3 className="text-2xl font-black text-gray-900 mb-4 leading-tight">{titre}</h3>
        <p className="text-gray-500 text-sm leading-relaxed mb-7">{desc}</p>
        <div className="space-y-3 mb-7">
          {infos.map((item, i) => (
            <div key={i} className="flex items-center gap-4 p-3 rounded-xl" style={{ background:'white', border:`1px solid ${couleur}20` }}>
              <div className="p-2 rounded-lg flex-shrink-0" style={{ background:couleur+'12', color:couleur }}>{item.icon}</div>
              <div>
                <p className="text-xs font-black uppercase tracking-wider text-gray-400">{item.label}</p>
                <p className="text-sm font-bold text-gray-800">{item.val}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-2">
          {services.map(s => (
            <div key={s} className="flex items-center gap-2 text-sm text-gray-600">
              <span style={{ color:couleur }}><IcCheck/></span>
              <span className="font-medium">{s}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function ServicesPage() {
  return (
    <main style={{ background:'#f8faff', minHeight:'100vh' }}>
      <style>{`
        @keyframes floatA { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(30px,-25px) scale(1.07)} }
        @keyframes floatB { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(-20px,30px) scale(1.05)} }
        @keyframes heroIn { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
        .h-in-1{animation:heroIn 0.7s cubic-bezier(0.22,1,0.36,1) 0.05s both}
        .h-in-2{animation:heroIn 0.7s cubic-bezier(0.22,1,0.36,1) 0.2s both}
        .h-in-3{animation:heroIn 0.7s cubic-bezier(0.22,1,0.36,1) 0.35s both}
        .h-in-4{animation:heroIn 0.7s cubic-bezier(0.22,1,0.36,1) 0.5s both}
      `}</style>

      {/* HERO */}
      <section className="relative overflow-hidden" style={{ paddingTop:'110px', paddingBottom:'0', background:'#f8faff' }}>
        <div style={{ position:'absolute', top:'-80px', right:'-80px', width:'520px', height:'520px', borderRadius:'50%', background:'linear-gradient(135deg, rgba(204,0,0,0.07), rgba(0,87,168,0.06))', animation:'floatA 12s ease-in-out infinite', zIndex:0 }} />
        <div style={{ position:'absolute', bottom:'-60px', left:'-60px', width:'420px', height:'420px', borderRadius:'50%', background:'linear-gradient(135deg, rgba(27,43,107,0.06), rgba(0,87,168,0.05))', animation:'floatB 16s ease-in-out infinite', zIndex:0 }} />
        <div style={{ position:'absolute', inset:0, zIndex:0, opacity:0.5, backgroundImage:'radial-gradient(circle, rgba(0,87,168,0.07) 1px, transparent 1px)', backgroundSize:'32px 32px' }} />

        <div className="relative max-w-7xl mx-auto px-6" style={{ zIndex:1 }}>
          <div className="h-in-1 flex items-center gap-2 text-xs mb-10" style={{ color:'#aab' }}>
            <Link href="/" style={{ color:'#aab', textDecoration:'none' }}>Accueil</Link>
            <span>›</span>
            <span style={{ color:'#CC0000', fontWeight:700 }}>Services après-vente</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-end pb-16">
            <div>
              <div className="h-in-1 inline-flex items-center gap-2 px-4 py-2 rounded-full mb-7"
                style={{ background:'#fff', border:'1px solid #e8e8f0', boxShadow:'0 2px 12px rgba(0,0,0,0.06)' }}>
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs font-black uppercase tracking-widest" style={{ color:'#1B2B6B' }}>Service après-vente</span>
              </div>

              <div className="h-in-2 mb-5">
                <div className="text-xs font-black uppercase tracking-[0.25em] mb-3 flex items-center gap-2" style={{ color:'#CC0000' }}>
                  <div style={{ width:'20px', height:'2px', background:'#CC0000', borderRadius:'2px' }} />
                  8 techniciens certifiés
                </div>
                <h1 style={{ fontSize:'clamp(40px,6vw,72px)', fontWeight:900, lineHeight:0.95, letterSpacing:'-1.5px', color:'#0f172a', margin:0 }}>
                  Votre véhicule
                </h1>
                <h1 style={{ fontSize:'clamp(40px,6vw,72px)', fontWeight:900, lineHeight:0.95, letterSpacing:'-1.5px', margin:0 }}>
                  <span style={{ background:'linear-gradient(90deg, #CC0000 0%, #0057A8 100%)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>mérite le meilleur</span>
                </h1>
              </div>

              <div className="h-in-3 flex items-center gap-2 mb-6">
                <div style={{ width:'40px', height:'3px', background:'#CC0000', borderRadius:'2px' }} />
                <div style={{ width:'20px', height:'3px', background:'#0057A8', borderRadius:'2px' }} />
                <div style={{ width:'8px', height:'3px', background:'#e2e2e8', borderRadius:'2px' }} />
              </div>

              <p className="h-in-3 mb-9" style={{ color:'#64748b', fontSize:'15px', lineHeight:1.75, maxWidth:'440px' }}>
                3 ingénieurs, 3 techniciens électromécaniciens et 2 mécaniciens certifiés. Atelier fixe + atelier mobile. Pièces d'origine. 6 jours sur 7.
              </p>

              <div className="h-in-4 flex flex-wrap gap-3">
                <a href="tel:0524885025"
                  className="inline-flex items-center gap-2 font-black text-white text-sm px-7 py-3.5 rounded-xl transition-all hover:scale-105"
                  style={{ background:'#CC0000', boxShadow:'0 8px 28px rgba(204,0,0,0.3)' }}>
                  <IcPhone/> Appeler le SAV
                </a>
                <Link href="/devis"
                  className="inline-flex items-center gap-2 font-bold text-sm px-7 py-3.5 rounded-xl transition-all"
                  style={{ color:'#1B2B6B', border:'1.5px solid #c7d2fe', background:'#fff' }}>
                  Demande de devis <IcArrow/>
                </Link>
              </div>
            </div>

            <div className="h-in-4 grid grid-cols-2 gap-4">
              {[
                { nb:'2',    label:'Ateliers fixes',    color:'#0057A8', bg:'#f0f7ff' },
                { nb:'100%', label:"Pièces d'origine",  color:'#1B2B6B', bg:'#f0f3ff' },
                { nb:'6j/7', label:'Disponibilité',     color:'#2D6A4F', bg:'#f0fdf4' },
              ].map((s, i) => (
                <div key={i} className="p-7 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  style={{ background:s.bg, border:`1px solid ${s.color}18` }}>
                  <div className="text-3xl font-black mb-1" style={{ color:s.color }}>{s.nb}</div>
                  <div className="text-xs font-semibold" style={{ color:'#94a3b8' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ height:'4px', background:'linear-gradient(90deg, #CC0000 0%, #0057A8 40%, #1B2B6B 70%, #2D6A4F 100%)', borderRadius:'2px 2px 0 0', margin:'0 -24px' }} />
        </div>
      </section>

      {/* ENGAGEMENTS */}
      <section style={{ padding:'80px 0', background:'#fff' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-xs font-black uppercase tracking-widest mb-3" style={{ color:'#0057A8' }}>Nos engagements</p>
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="h-px w-10" style={{ background:'#0057A8' }} />
              <h2 className="text-3xl font-black text-gray-900">Un service complet</h2>
              <div className="h-px w-10" style={{ background:'#CC0000' }} />
            </div>
            <p className="text-gray-400 text-sm max-w-md mx-auto">À la hauteur de vos exigences depuis 1996</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ENGAGEMENTS.map((eng, i) => (
              <RevealItem key={i} delay={(i % 3) * 100}>
                <div className="group relative p-7 rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  style={{ background:eng.bg, borderColor:`${eng.color}22`, cursor:'default' }}>
                  <div className="absolute top-0 left-6 right-6 h-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background:`linear-gradient(to right,${eng.color},transparent)` }}/>
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl flex-shrink-0 mt-0.5" style={{ background:`${eng.color}15`, color:eng.color }}>
                      {eng.icon}
                    </div>
                    <div>
                      <h3 className="font-extrabold text-gray-900 mb-2">{eng.titre}</h3>
                      <p className="text-sm text-gray-500 leading-relaxed">{eng.desc}</p>
                    </div>
                  </div>
                </div>
              </RevealItem>
            ))}
          </div>
        </div>
      </section>

      {/* ATELIERS */}
      <section style={{ padding:'80px 0', background:'#f8faff', position:'relative' }}>
        <div style={{ position:'absolute', inset:0, opacity:0.4, backgroundImage:'radial-gradient(circle, rgba(0,87,168,0.06) 1px, transparent 1px)', backgroundSize:'28px 28px' }} />
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-xs font-black uppercase tracking-widest mb-3" style={{ color:'#0057A8' }}>Nos ateliers</p>
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="h-px w-10" style={{ background:'#0057A8' }} />
              <h2 className="text-3xl font-black text-gray-900">À votre service</h2>
              <div className="h-px w-10" style={{ background:'#CC0000' }} />
            </div>
            <p className="text-gray-400 text-sm">Deux ateliers fixes + atelier mobile pour interventions sur site</p>
          </div>

          <AtelierCard
            img="/images/ateliers/atelier1.jpg"
            ville="Agadir" couleur="#CC0000"
            titre="Atelier CADOZAT Agadir"
            desc="Notre atelier Agadir dispose de ponts élévateurs, d'une station pneumatique, d'un scanner de diagnostic homologué et du logiciel TOPAZE pour le suivi complet de chaque véhicule."
            badge="🔧 Atelier fixe — Agadir"
            infos={[
              { icon:<IcClock/>, label:'Horaires',    val:'Lun – Sam : 8h à 18h' },
              { icon:<IcPhone/>, label:'Contact SAV', val:'0524 885 025' },
              { icon:<IcPin/>,   label:'Ville',       val:'Agadir' },
            ]}
            services={['Entretien & révision','Réparation toutes pannes',"Pièces d'origine",'Diagnostic TOPAZE','Station pneumatique','Garantie constructeur']}
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
              { icon:<IcClock/>, label:'Horaires',    val:'Lun – Sam : 8h à 18h' },
              { icon:<IcPhone/>, label:'Contact SAV', val:'0524 885 025' },
              { icon:<IcPin/>,   label:'Ville',       val:'Ouarzazate' },
            ]}
            services={['Entretien & révision','Réparation toutes pannes',"Pièces d'origine",'Diagnostic TOPAZE','Station pneumatique','Garantie constructeur']}
          />

          <AtelierCard
            imgs={['/images/ateliers/atelier-mobile1.jpg','/images/ateliers/atelier-mobile2.jpg','/images/ateliers/atelier-mobile3.jpg']}
            ville="Atelier mobile" couleur="#0057A8"
            titre="Nous venons à vous — partout au Sud du Maroc"
            desc="Notre atelier mobile Dacia Dokker est équipé de tous les outils et pièces de rechange nécessaires. Nos techniciens interviennent directement sur site."
            badge="🚐 Atelier mobile ISUZU SERVICE"
            infos={[
              { icon:<IcTruck/>, label:'Véhicule',   val:'Dacia Dokker' },
              { icon:<IcBox/>,   label:'Équipement', val:'Outillage complet + stock pièces' },
              { icon:<IcPin/>,   label:'Zone',       val:'Sud du Maroc — Ouarzazate, Agadir' },
            ]}
            services={['Intervention sur site',"Dépannage d'urgence",'Flottes & grands comptes','Marchés publics','Zones rurales','Sans déplacement client']}
          />
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding:'80px 0', background:'#0f172a', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, backgroundImage:'radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize:'32px 32px' }} />
        <div style={{ position:'absolute', top:'-100px', right:'-100px', width:'500px', height:'500px', borderRadius:'50%', background:'radial-gradient(circle, rgba(204,0,0,0.12) 0%, transparent 60%)' }} />
        <div style={{ position:'absolute', bottom:'-80px', left:'-80px', width:'400px', height:'400px', borderRadius:'50%', background:'radial-gradient(circle, rgba(0,87,168,0.18) 0%, transparent 60%)' }} />

        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <h2 style={{ fontSize:'clamp(24px,4vw,42px)', fontWeight:900, color:'#fff', letterSpacing:'-1px', margin:'0 0 16px' }}>
            Votre véhicule a besoin d'<span style={{ background:'linear-gradient(90deg, #CC0000, #ff6b6b)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>entretien</span> ?
          </h2>
          <p style={{ color:'rgba(255,255,255,0.45)', fontSize:'15px', marginBottom:'36px', maxWidth:'480px', margin:'0 auto 36px', lineHeight:1.7 }}>
            Atelier fixe ou mobile — nos 8 techniciens certifiés sont à votre service 6 jours sur 7.
          </p>
          <div style={{ display:'flex', flexWrap:'wrap', gap:'12px', justifyContent:'center' }}>
            <a href="tel:0524885025"
              style={{ display:'inline-flex', alignItems:'center', gap:'10px', background:'#CC0000', color:'#fff', fontWeight:800, fontSize:'14px', padding:'14px 28px', borderRadius:'14px', textDecoration:'none', boxShadow:'0 12px 40px rgba(204,0,0,0.4)' }}>
              <IcPhone/> 0524 885 025
            </a>
            <Link href="/devis"
              style={{ display:'inline-flex', alignItems:'center', gap:'8px', background:'rgba(255,255,255,0.08)', color:'rgba(255,255,255,0.8)', fontWeight:700, fontSize:'14px', padding:'14px 28px', borderRadius:'14px', border:'1px solid rgba(255,255,255,0.15)', textDecoration:'none' }}>
              Demande de devis <IcArrow/>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}