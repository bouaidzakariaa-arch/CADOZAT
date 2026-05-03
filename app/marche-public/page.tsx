'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'

// ─── Scroll Reveal Hook ───────────────────────────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, visible }
}

// ─── Animated Card Wrapper ────────────────────────────────────────────────────
function RevealCard({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, visible } = useInView()
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(36px)',
      transition: `opacity 0.65s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.65s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
    }}>
      {children}
    </div>
  )
}

// ─── Carousel ─────────────────────────────────────────────────────────────────
function ImageCarousel({ images, alt, couleur }: {
  images: string[]; alt: string; couleur: string
}) {
  const [current, setCurrent] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setCurrent(p => (p + 1) % images.length)
    }, 4000)
  }, [images.length])

  useEffect(() => {
    startTimer()
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [startTimer])

  const goTo = (i: number) => { setCurrent(i); startTimer() }

  return (
    <div className="relative overflow-hidden" style={{ height: '185px', borderRadius: 'inherit' }}>
      <div style={{
        display: 'flex',
        width: `${images.length * 100}%`,
        height: '100%',
        transform: `translateX(-${current * (100 / images.length)}%)`,
        transition: 'transform 0.75s cubic-bezier(0.77,0,0.175,1)',
      }}>
        {images.map((img, i) => (
          <div key={i} style={{ width: `${100 / images.length}%`, flexShrink: 0, position: 'relative', height: '100%' }}>
            <Image src={img} alt={`${alt} ${i + 1}`} fill sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: 'cover' }} />
          </div>
        ))}
      </div>
      <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10">
        {images.map((_, i) => (
          <button key={i} onClick={() => goTo(i)} style={{
            height: '2px', width: i === current ? '28px' : '10px',
            background: i === current ? '#fff' : 'rgba(255,255,255,0.4)',
            borderRadius: '2px', transition: 'width 0.45s ease, background 0.45s ease',
            cursor: 'pointer', border: 'none', padding: 0,
          }} />
        ))}
      </div>
    </div>
  )
}

// ─── Placeholder ──────────────────────────────────────────────────────────────
function Placeholder({ couleur }: { couleur: string }) {
  return (
    <div style={{ height: '185px', background: `linear-gradient(135deg, ${couleur}08, ${couleur}18)` }}
      className="flex flex-col items-center justify-center gap-2">
      <svg className="w-12 h-12" style={{ color: couleur, opacity: 0.2 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
      <span className="text-xs font-semibold" style={{ color: couleur, opacity: 0.3 }}>Photo bientôt disponible</span>
    </div>
  )
}

// ─── Data ─────────────────────────────────────────────────────────────────────
type Vehicule = { nom: string; desc: string; couleur: string; img?: string; imgs?: string[] }

const vehicules: Vehicule[] = [
  // ── Transport ──
  { nom: 'Pick-up Benne 2m³', desc: 'Pick-up avec benne 2m³ sur châssis Isuzu 3,5T — livraisons urbaines et rurales', couleur: '#CC0000', img: '/images/marche-public/transport/pickup-caisse.jpg' },
  { nom: 'Camion Caisse', desc: 'Transport sécurisé de marchandises — caisse fermée isotherme ou sèche sur Isuzu 3,5T à 7,5T', couleur: '#CC0000', img: '/images/marche-public/transport/camion-caisse.jpg' },
  { nom: 'Camion Transport de Viande 3,5T', desc: 'Caisse frigorifique homologuée transport de viande sur Isuzu 3,5T', couleur: '#CC0000' },
  { nom: 'Camion Transport de Viande 7,5T', desc: 'Caisse frigorifique grande capacité transport de viande sur Isuzu 7,5T', couleur: '#CC0000' },
  { nom: 'Pick-up Caisse Frigo Poulet & Viande', desc: 'Pick-up caisse frigorifique pour transport de poulet et viande', couleur: '#CC0000' },

  // ── BTP ──
  { nom: 'Camion Benne 3m³ — Isuzu 3,5T', desc: 'Benne basculante 3m³ — transport de matériaux légers, terre et gravats', couleur: '#1B2B6B', img: '/images/marche-public/btp/camion-benne.jpg' },
  { nom: 'Camion Benne 6m³ — Isuzu 7,5T', desc: 'Benne basculante 6m³ — chantiers de construction et travaux publics', couleur: '#1B2B6B' },
  { nom: 'Camion Benne 10m³ — Isuzu 18T', desc: 'Grande benne 10m³ sur porteur 18T — travaux lourds et grands chantiers', couleur: '#1B2B6B' },
  { nom: 'Camion Benne Satellite 3m³', desc: 'Benne satellite 3m³ sur Isuzu 3,5T — collecte et tri de matériaux en zone urbaine', couleur: '#1B2B6B' },
  { nom: 'Camion Benne Satellite 5m³', desc: "Benne satellite 5m³ sur Isuzu 7,5T — chantiers et zones difficiles d'accès", couleur: '#1B2B6B' },
  { nom: 'Porte-Engin', desc: 'Transport de gros engins de chantier — tracteurs, tractopelles, chargeuses', couleur: '#1B2B6B', img: '/images/marche-public/btp/porte-engin.jpg' },
  { nom: 'Tractopelle', desc: 'Engin polyvalent creusement et chargement sur chantier', couleur: '#1B2B6B', img: '/images/marche-public/btp/tractopelle.jpg' },
  { nom: 'Véhicules G.T.P', desc: 'Chargeuses, pelles hydrauliques, bulldozers — gros travaux publics et terrassement', couleur: '#1B2B6B' },

  // ── Citerne ──
  { nom: 'Camion Citerne Eau & Lait', desc: 'Citerne eau potable ou inox alimentaire lait — de 1T (Pick-up) à 10T (Isuzu 18T)', couleur: '#0057A8', imgs: ['/images/marche-public/citerne/citerne-eau1.jpg','/images/marche-public/citerne/citerne-eau2.png','/images/marche-public/citerne/citerne-eau3.png','/images/marche-public/citerne/citerne-eau4.png'] },
  { nom: 'Camion Citerne Équipé Distribution', desc: "Citerne équipée d'un système de distribution — commune, chantier, site isolé sur Isuzu 3,5T", couleur: '#0057A8' },
  { nom: 'Camion Hydro-Cureur 5m', desc: "Hydrocureur haute pression 5m³ pour curage de réseaux d'assainissement sur Isuzu 7,5T", couleur: '#0057A8' },
  { nom: 'Aspiratrice 1000L / 6000L / 10000L', desc: 'Camion aspirateur pour vidange fosses septiques, curage et aspiration de boues', couleur: '#0057A8' },
  { nom: 'Camion Ampli-Rolo 5T', desc: 'Amplirolo citerne 5T sur Isuzu 7,5T — collecte et transport de liquides industriels', couleur: '#0057A8' },
  { nom: 'Camion Ampli-Rolo 10T', desc: 'Amplirolo citerne 10T sur Isuzu 16T — grandes capacités de transport de liquides', couleur: '#0057A8' },

  // ── Environnement ──
  { nom: 'Camion Benne Tasseuse', desc: 'Collecte et compactage des ordures ménagères — 7m³ à 14m³ sur Isuzu 7,5T à 16T', couleur: '#2D6A4F', imgs: ['/images/marche-public/environnement/benne-tasseuse1.jpg','/images/marche-public/environnement/benne-tasseuse2.png','/images/marche-public/environnement/benne-tasseuse3.jpeg','/images/marche-public/environnement/benne-tasseuse4.jpg'] },
  { nom: 'Camion Multi-Benne', desc: 'Collecte sélective et transport de bennes amovibles', couleur: '#2D6A4F', imgs: ['/images/marche-public/environnement/multi-benne.jpg','/images/marche-public/environnement/multi-benne2.jpg','/images/marche-public/environnement/multi-benne3.jpg'] },
  { nom: 'Camion Nacelle', desc: 'Travaux en hauteur — nacelle 10m ou 16m pour éclairage public, émondage, maintenance', couleur: '#2D6A4F', imgs: ['/images/marche-public/environnement/nacelle.jpg','/images/marche-public/environnement/nacelle1.jpg','/images/marche-public/environnement/nacelle2.jpg','/images/marche-public/environnement/nacelle3.png'] },
  { nom: 'Camion Balayeur 5m', desc: 'Balayeuse mécanique 5m³ sur Isuzu 7,5T — nettoiement des voiries urbaines et rurales', couleur: '#2D6A4F' },
  { nom: 'Véhicule Ramassage Chiens Errants', desc: 'Véhicule municipal spécialisé pour la capture et le transport des animaux errants', couleur: '#2D6A4F' },
]

// ─── Vehicle Card ──────────────────────────────────────────────────────────────
function VehiculeCard({ v }: { v: Vehicule }) {
  return (
    <div
      className="group rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
      style={{ border: `1px solid ${v.couleur}22`, boxShadow: '0 2px 16px rgba(0,0,0,0.06)', background: '#fff' }}
    >
      {v.imgs && v.imgs.length > 1 ? (
        <ImageCarousel images={v.imgs} alt={v.nom} couleur={v.couleur} />
      ) : v.img ? (
        <div className="relative overflow-hidden" style={{ height: '185px' }}>
          <Image src={v.img} alt={v.nom} fill sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: 'cover' }}
            className="transition-transform duration-500 group-hover:scale-105" />
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ background: `linear-gradient(to top, ${v.couleur}50, transparent)` }} />
        </div>
      ) : (
        <Placeholder couleur={v.couleur} />
      )}

      <div className="p-6">
        <div className="w-8 h-1 rounded-full mb-4" style={{ background: v.couleur }} />
        <h3 className="font-black text-gray-900 text-base mb-2 leading-snug">{v.nom}</h3>
        <p className="text-sm text-gray-400 leading-relaxed mb-5">{v.desc}</p>
        <div className="flex items-center justify-end pt-4" style={{ borderTop: `1px solid ${v.couleur}15` }}>
          <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: v.couleur + '12' }}>
            <svg className="w-3.5 h-3.5" style={{ color: v.couleur }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function MarchePublicPage() {
  // Pair up vehicles for staggered 2-col animation
  const pairs = vehicules.reduce<Vehicule[][]>((acc, v, i) => {
    if (i % 2 === 0) acc.push([v])
    else acc[acc.length - 1].push(v)
    return acc
  }, [])

  return (
    <main className="bg-white">

      {/* HERO */}
      <section className="relative overflow-hidden" style={{ background: '#f7f8fc', paddingTop: '110px', paddingBottom: '0' }}>
        <style>{`
          @keyframes floatA { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(30px,-25px) scale(1.07)} }
          @keyframes floatB { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(-20px,30px) scale(1.05)} }
          @keyframes floatC { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(15px,15px) scale(1.08)} }
          @keyframes heroIn { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
          .h-in-1{animation:heroIn 0.7s cubic-bezier(0.22,1,0.36,1) 0.05s both}
          .h-in-2{animation:heroIn 0.7s cubic-bezier(0.22,1,0.36,1) 0.18s both}
          .h-in-3{animation:heroIn 0.7s cubic-bezier(0.22,1,0.36,1) 0.3s both}
          .h-in-4{animation:heroIn 0.7s cubic-bezier(0.22,1,0.36,1) 0.42s both}
          .h-in-5{animation:heroIn 0.7s cubic-bezier(0.22,1,0.36,1) 0.54s both}
        `}</style>

        <div style={{ position:'absolute', top:'-80px', right:'-80px', width:'520px', height:'520px', borderRadius:'50%', background:'linear-gradient(135deg, rgba(204,0,0,0.07), rgba(201,168,76,0.06))', animation:'floatA 12s ease-in-out infinite', zIndex:0 }} />
        <div style={{ position:'absolute', bottom:'-60px', left:'-60px', width:'420px', height:'420px', borderRadius:'50%', background:'linear-gradient(135deg, rgba(27,43,107,0.06), rgba(0,87,168,0.05))', animation:'floatB 16s ease-in-out infinite', zIndex:0 }} />
        <div style={{ position:'absolute', top:'30%', left:'35%', width:'300px', height:'300px', borderRadius:'50%', background:'rgba(201,168,76,0.05)', animation:'floatC 20s ease-in-out infinite', zIndex:0 }} />
        <div style={{ position:'absolute', inset:0, zIndex:0, opacity:0.5, backgroundImage:'radial-gradient(circle, rgba(27,43,107,0.08) 1px, transparent 1px)', backgroundSize:'32px 32px' }} />

        <div className="relative max-w-7xl mx-auto px-6" style={{ zIndex:1 }}>
          <div className="h-in-1 flex items-center gap-2 text-xs mb-10" style={{ color:'#aab' }}>
            <Link href="/" style={{ color:'#aab', textDecoration:'none' }}>Accueil</Link>
            <span>›</span>
            <span style={{ color:'#CC0000', fontWeight:700 }}>Marché public</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-end pb-16">
            <div>
              <div className="h-in-1 inline-flex items-center gap-2 px-4 py-2 rounded-full mb-7"
                style={{ background:'#fff', border:'1px solid #e8e8f0', boxShadow:'0 2px 12px rgba(0,0,0,0.06)' }}>
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs font-black uppercase tracking-widest" style={{ color:'#1B2B6B' }}>Collectivités & Administrations</span>
              </div>

              <div className="h-in-2 mb-5">
                <div className="text-xs font-black uppercase tracking-[0.25em] mb-3 flex items-center gap-2" style={{ color:'#CC0000' }}>
                  <div style={{ width:'20px', height:'2px', background:'#CC0000', borderRadius:'2px' }} />
                  CADOZAT depuis 1996
                </div>
                <h1 style={{ fontSize:'clamp(48px,7vw,82px)', fontWeight:900, lineHeight:0.95, letterSpacing:'-1.5px', color:'#0f172a', margin:0 }}>Marché</h1>
                <h1 style={{ fontSize:'clamp(48px,7vw,82px)', fontWeight:900, lineHeight:0.95, letterSpacing:'-1.5px', margin:0 }}>
                  <span style={{ background:'linear-gradient(90deg, #CC0000 0%, #1B2B6B 100%)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>Public</span>
                </h1>
              </div>

              <div className="h-in-3 flex items-center gap-2 mb-6">
                <div style={{ width:'40px', height:'3px', background:'#CC0000', borderRadius:'2px' }} />
                <div style={{ width:'20px', height:'3px', background:'#C9A84C', borderRadius:'2px' }} />
                <div style={{ width:'8px', height:'3px', background:'#e2e2e8', borderRadius:'2px' }} />
              </div>

              <p className="h-in-3 mb-9" style={{ color:'#64748b', fontSize:'15px', lineHeight:1.75, maxWidth:'440px' }}>
                Véhicules spéciaux carrossés sur mesure pour communes, collectivités et administrations du Sud Marocain.
                Homologués et conformes aux normes marocaines.
              </p>

              <div className="h-in-4 flex flex-wrap gap-3">
                <a href="tel:0524885025"
                  className="inline-flex items-center gap-2 font-black text-white text-sm px-7 py-3.5 rounded-xl transition-all hover:scale-105 hover:brightness-110"
                  style={{ background:'#CC0000', boxShadow:'0 8px 28px rgba(204,0,0,0.3)' }}>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" /></svg>
                  0524 885 025
                </a>
                <Link href="/contact"
                  className="inline-flex items-center gap-2 font-bold text-sm px-7 py-3.5 rounded-xl transition-all hover:border-gray-400"
                  style={{ color:'#1B2B6B', border:'1.5px solid #d1d5e8', background:'#fff' }}>
                  Nous contacter
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </Link>
              </div>
            </div>

            <div className="h-in-5 grid grid-cols-2 gap-4">
              {[
                { nb:'25+',  label:'Types de véhicules', color:'#CC0000', bg:'#fff5f5' },
                { nb:'4',    label:'Catégories',          color:'#1B2B6B', bg:'#f0f3ff' },
                { nb:'1996', label:'Fondé en',            color:'#0057A8', bg:'#f0f7ff' },
                { nb:'100%', label:'Homologués',          color:'#2D6A4F', bg:'#f0fff8' },
              ].map((s, i) => (
                <div key={i} className="p-7 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  style={{ background:s.bg, border:`1px solid ${s.color}18` }}>
                  <div className="text-4xl font-black mb-1" style={{ color:s.color }}>{s.nb}</div>
                  <div className="text-xs font-semibold" style={{ color:'#94a3b8' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ height:'4px', background:'linear-gradient(90deg, #CC0000 0%, #1B2B6B 33%, #0057A8 66%, #2D6A4F 100%)', borderRadius:'2px 2px 0 0', margin:'0 -24px' }} />
        </div>
      </section>

      {/* GRILLE VÉHICULES */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-xs font-black uppercase tracking-widest mb-3" style={{ color:'#CC0000' }}>Notre gamme complète</p>
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="h-px w-10" style={{ background:'#C9A84C' }} />
            <h2 className="text-3xl font-black text-gray-900">Véhicules disponibles</h2>
            <div className="h-px w-10" style={{ background:'#C9A84C' }} />
          </div>
          <p className="text-gray-400 text-sm">Carrossés sur mesure · Homologués · Conformes aux normes marocaines</p>
        </div>

        {/* Grille avec animation par paire */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {pairs.map((pair, rowIndex) =>
            pair.map((v, colIndex) => (
              <RevealCard key={`${rowIndex}-${colIndex}`} delay={colIndex * 120}>
                <VehiculeCard v={v} />
              </RevealCard>
            ))
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-black text-gray-900 mb-2">
            Un projet de <span style={{ color:'#CC0000' }}>marché public</span> ?
          </h2>
          <div className="w-12 h-0.5 mx-auto my-4" style={{ background:'#C9A84C' }} />
          <p className="text-gray-400 text-sm mb-8 leading-relaxed">
            Notre équipe commerciale vous accompagne dans la constitution de votre dossier<br />
            et vous propose les véhicules adaptés à vos cahiers des charges.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="tel:0524885025"
              className="inline-flex items-center gap-2 font-bold text-white px-8 py-4 rounded-full transition-all shadow-lg hover:brightness-110"
              style={{ background:'#CC0000' }}>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" /></svg>
              0524 885 025
            </a>
            <Link href="/contact"
              className="inline-flex items-center gap-2 font-bold text-gray-600 px-8 py-4 rounded-full transition-all border border-gray-200 hover:border-red-500 hover:text-red-600">
              Nous contacter
            </Link>
          </div>
        </div>
      </section>

    </main>
  )
}