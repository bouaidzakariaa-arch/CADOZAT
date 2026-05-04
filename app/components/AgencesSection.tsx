'use client'

import { useState, useEffect, useRef } from 'react'

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

const agences = [
  {
    ville: 'Ouarzazate',
    role: 'Siège principal',
    adresse: '189, Bd Maghreb Arabi, Ouarzazate',
    tel: '05 24 88 50 25',
    telHref: 'tel:0524885025',
    mapsUrl: 'https://maps.google.com/?q=30.929241,-6.904725',
    color: '#CC0000',
    bg: '#fff5f5',
    icon: '🏢',
    images: ['/images/ouarzazate/img1.jpg','/images/ouarzazate/img2.jpg','/images/ouarzazate/img3.jpg','/images/ouarzazate/img4.jpg'],
  },
  {
    ville: 'Agadir',
    role: 'Agence régionale',
    adresse: '18 Bab Al Madina Tilila, Agadir',
    tel: '06 62 12 40 44',
    telHref: 'tel:0662124044',
    mapsUrl: 'https://maps.google.com/?q=30.39542,-9.52030',
    color: '#0057A8',
    bg: '#f0f7ff',
    icon: '🌊',
    images: ['/images/agadir/img1.jpg','/images/agadir/img2.jpg','/images/agadir/img3.jpg','/images/agadir/img4.jpg'],
  },
  {
    ville: 'Tinghir',
    role: 'Agence régionale',
    adresse: 'Avenue Mohammed V, Tinghir',
    tel: '06 62 12 40 44',
    telHref: 'tel:0662124044',
    mapsUrl: 'https://maps.google.com/?q=31.5134,-5.5342',
    color: '#2D6A4F',
    bg: '#f0fdf4',
    icon: '🏔️',
    images: ['/images/tinghir/img1.jpg','/images/tinghir/img2.jpg','/images/tinghir/img3.jpg','/images/tinghir/img4.jpg'],
  },
]

type Agence = typeof agences[0]

function AgenceCard({ agence, delay }: { agence: Agence; delay: number }) {
  const [current, setCurrent] = useState(0)
  const { ref, visible } = useInView()
  const prev = () => setCurrent(c => c === 0 ? agence.images.length - 1 : c - 1)
  const next = () => setCurrent(c => c === agence.images.length - 1 ? 0 : c + 1)

  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(36px)',
      transition: `all 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
    }}>
      <div className="group rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
        style={{ background:'#fff', border:`1px solid ${agence.color}18`, boxShadow:'0 2px 16px rgba(0,0,0,0.06)' }}>

        {/* Top stripe */}
        <div style={{ height:'3px', background:`linear-gradient(90deg, ${agence.color}, ${agence.color}66)` }} />

        {/* Slider */}
        <div className="relative overflow-hidden" style={{ height:'200px' }}>
          <img src={agence.images[current]} alt={`CADOZAT ${agence.ville}`}
            className="w-full h-full object-cover transition-all duration-500"/>
          <div className="absolute inset-0" style={{ background:'linear-gradient(to top, rgba(0,0,0,0.4), transparent)' }} />

          {/* Nav arrows */}
          {[-1,1].map(dir => (
            <button key={dir} onClick={dir === -1 ? prev : next}
              className="absolute top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 hover:scale-110"
              style={{ [dir === -1 ? 'left' : 'right']:'12px', background:'rgba(255,255,255,0.85)', backdropFilter:'blur(8px)' }}>
              <svg className="w-3.5 h-3.5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d={dir === -1 ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"}/>
              </svg>
            </button>
          ))}

          {/* Dots */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {agence.images.map((_, i) => (
              <button key={i} onClick={() => setCurrent(i)}
                className="rounded-full transition-all duration-300"
                style={{ width: i === current ? '18px' : '6px', height:'6px', background: i === current ? 'white' : 'rgba(255,255,255,0.5)' }} />
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="text-xs font-black uppercase tracking-widest mb-1" style={{ color: agence.color }}>{agence.role}</div>
              <h3 className="font-black text-gray-900 text-lg">CADOZAT {agence.ville}</h3>
            </div>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
              style={{ background: agence.bg }}>
              {agence.icon}
            </div>
          </div>

          <div className="flex items-start gap-2 mb-5 text-sm" style={{ color:'#94a3b8' }}>
            <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" style={{ color: agence.color }}>
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
            </svg>
            {agence.adresse}
          </div>

          <div className="flex gap-3">
            <a href={agence.telHref}
              className="flex-1 flex items-center justify-center gap-2 text-white text-sm font-bold py-2.5 rounded-xl transition-all hover:scale-105"
              style={{ background: agence.color, boxShadow:`0 4px 16px ${agence.color}35` }}>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/></svg>
              {agence.tel}
            </a>
            <a href={agence.mapsUrl} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold border-2 transition-all hover:scale-105"
              style={{ borderColor: agence.color, color: agence.color }}>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/></svg>
              Maps
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function AgencesSection() {
  return (
    <section className="py-20 relative overflow-hidden" style={{ background:'#f8faff' }}>
      <div style={{ position:'absolute', inset:0, opacity:0.4, backgroundImage:'radial-gradient(circle, rgba(0,87,168,0.07) 1px, transparent 1px)', backgroundSize:'32px 32px' }} />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-xs font-black uppercase tracking-widest mb-3" style={{ color:'#0057A8' }}>Présents partout pour vous servir</p>
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="h-px w-10" style={{ background:'#0057A8' }} />
            <h2 className="text-3xl font-black text-gray-900">Nos 3 agences</h2>
            <div className="h-px w-10" style={{ background:'#CC0000' }} />
          </div>
          <div className="flex items-center justify-center gap-2 mb-4">
            <div style={{ width:'40px', height:'3px', background:'#CC0000', borderRadius:'2px' }} />
            <div style={{ width:'20px', height:'3px', background:'#0057A8', borderRadius:'2px' }} />
            <div style={{ width:'8px', height:'3px', background:'#e2e2e8', borderRadius:'2px' }} />
          </div>
          <p className="text-gray-400 text-sm">Même qualité, même service — Ouarzazate · Agadir · Tinghir</p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {agences.map((agence, i) => (
            <AgenceCard key={agence.ville} agence={agence} delay={i * 120} />
          ))}
        </div>
      </div>
    </section>
  )
}