'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import BrochureForm from '@/app/components/BrochureForm'


// ── Composant Galerie (identique Q22B) ─────────
function GaleriePhotos() {
  const [onglet, setOnglet] = useState<'exterieur' | 'interieur'>('exterieur')
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null)
  const [activeIdx, setActiveIdx] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const photos = {
    exterieur: [
      { src: '/images/karry/img1.jpg', alt: 'Karry Q22Q — Vue avant' },
      { src: '/images/karry/img2.jpg', alt: 'Karry Q22Q — Vue côté' },
      { src: '/images/karry/karry22q.jpg', alt: 'Karry Q22Q — Plateau long' },
    ],
    interieur: [
      { src: '/images/karry/img3.jpeg', alt: 'Karry Q22Q — Intérieur' },
      { src: '/images/karry/img4.jpg', alt: 'Karry Q22Q — Tableau de bord' },
      { src: '/images/karry/img5.jpg', alt: 'Karry Q22Q — Habitacle' },
    ],
  }

  const current = photos[onglet]

  useEffect(() => {
    const timer = setInterval(() => {
      setIsTransitioning(true)
      setTimeout(() => {
        setActiveIdx(i => (i + 1) % current.length)
        setIsTransitioning(false)
      }, 400)
    }, 3500)
    return () => clearInterval(timer)
  }, [onglet, current.length])

  useEffect(() => { setActiveIdx(0) }, [onglet])

  const goTo = (idx: number) => {
    setIsTransitioning(true)
    setTimeout(() => { setActiveIdx(idx); setIsTransitioning(false) }, 400)
  }

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: '#0057A8' }}>Découvrir le véhicule</p>
            <h2 className="text-3xl font-black text-gray-900">Galerie photos</h2>
            <div className="w-10 h-0.5 mt-3" style={{ background: '#0057A8' }} />
          </div>
          <div className="flex gap-1 p-1 rounded-xl" style={{ background: '#f0f4f8' }}>
            {(['exterieur', 'interieur'] as const).map(o => (
              <button key={o} onClick={() => setOnglet(o)} className="px-6 py-2.5 rounded-lg text-sm font-bold transition-all duration-200"
                style={{ background: onglet === o ? '#0057A8' : 'transparent', color: onglet === o ? 'white' : '#6b7280', boxShadow: onglet === o ? '0 4px 12px rgba(0,87,168,0.25)' : 'none' }}>
                {o === 'exterieur' ? '🚗 Extérieur' : '🪑 Intérieur'}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_180px] gap-4">
          <div className="relative rounded-3xl overflow-hidden cursor-zoom-in bg-gray-100" style={{ height: '520px' }} onClick={() => setLightbox(current[activeIdx])}>
            <img src={current[activeIdx].src} alt={current[activeIdx].alt} className="w-full h-full transition-all duration-500"
              style={{ objectFit: 'contain', background: '#f5f5f5', opacity: isTransitioning ? 0 : 1, transform: isTransitioning ? 'scale(1.03)' : 'scale(1)' }} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-5 left-5 flex items-center gap-2 transition-all duration-500" style={{ opacity: isTransitioning ? 0 : 1 }}>
              <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span className="text-white font-bold text-sm">{current[activeIdx].alt}</span>
            </div>
            <div className="absolute top-5 right-5 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-70 pointer-events-none">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/20">
              <div className="h-full bg-white" style={{ animation: 'progress 3.5s linear infinite', transformOrigin: 'left' }} />
            </div>
          </div>

          <div className="flex flex-row lg:flex-col gap-3">
            {current.map((photo, i) => (
              <button key={i} onClick={() => goTo(i)} className="relative rounded-2xl overflow-hidden flex-1 lg:flex-none transition-all duration-300"
                style={{ height: '120px', outline: activeIdx === i ? '3px solid #0057A8' : '3px solid transparent', outlineOffset: '2px', opacity: activeIdx === i ? 1 : 0.55, transform: activeIdx === i ? 'scale(1)' : 'scale(0.97)' }}>
                <img src={photo.src} alt={photo.alt} className="w-full h-full" style={{ objectFit: 'contain', background: '#f5f5f5' }} />
                {activeIdx === i && <div className="absolute inset-0 bg-[#0057A8]/15" />}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 mt-6">
          {current.map((_, i) => (
            <button key={i} onClick={() => goTo(i)} className="transition-all duration-300 rounded-full"
              style={{ width: activeIdx === i ? '24px' : '8px', height: '8px', background: activeIdx === i ? '#0057A8' : '#d1d5db' }} />
          ))}
        </div>

        {lightbox && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-6" onClick={() => setLightbox(null)}>
            <button className="absolute top-6 right-6 w-11 h-11 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all" onClick={() => setLightbox(null)}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <div className="relative w-full max-w-5xl" onClick={e => e.stopPropagation()}>
              <img src={lightbox.src} alt={lightbox.alt} className="w-full max-h-[85vh] object-contain rounded-2xl" />
              <p className="text-center text-white/50 text-sm mt-4 font-medium">{lightbox.alt}</p>
            </div>
          </div>
        )}
        <style>{`@keyframes progress { from { width: 0%; } to { width: 100%; } }`}</style>
      </div>
    </section>
  )
}


// ── Données Q22Q (= Q22D, plateau long) ──────
const modele = {
  nom: 'Karry Q22Q',
  tag: 'Fourgon Plateau Long',
  soustitre: 'Plus de capacité, plus de performance — pour vos grands chantiers',
  couleur: '#0057A8',
  img: '/images/karry/karry22q.jpg',
  specs: {
    moteur: [
      { label: 'Moteur', value: '1.3L — 4 Cylindres' },
      { label: 'Carburant', value: 'Essence' },
      { label: 'Cylindrée', value: '1 251 cm³' },
      { label: 'Puissance', value: '82 Ch' },
      { label: 'Puissance fiscale', value: '7 CV' },
      { label: 'Transmission', value: '5 MT (Manuelle)' },
      { label: 'Couple', value: '108 Nm' },
      { label: 'Vitesse max', value: '115 km/h' },
    ],
    dimensions: [
      { label: 'Dimensions (L×l×h)', value: '4 873 × 1 603 × 1 890 mm' },
      { label: 'Plateau (L×l×h)', value: '3 000 × 1 500 × 327 mm' },
      { label: 'Empattement', value: '3 050 mm' },
      { label: 'PTAC', value: '2 210 kg' },
      { label: 'Poids à vide', value: '1 175 kg' },
      { label: 'Charge utile', value: '1 035 kg' },
    ],
    equipements: [
      { label: 'Sécurité', value: 'ABS + EBD' },
      { label: 'Système audio', value: 'Radio' },
      { label: 'Sièges', value: '2 places' },
      { label: 'Jantes', value: 'Acier' },
      { label: 'Pneumatiques', value: '175/70/R14' },
    ],
  },
  atouts: [
    { icon: '📦', titre: 'Plateau 3 000 mm', desc: 'Grand plateau long pour les chargements volumineux' },
    { icon: '⚡', titre: '82 Ch — 1.3L', desc: 'Moteur plus puissant pour charges et longues distances' },
    { icon: '🔒', titre: 'ABS + EBD', desc: 'Freinage sécurisé même en charge maximale' },
    { icon: '🛣️', titre: '115 km/h', desc: 'Vitesse maximale confortable sur voie rapide' },
  ],
}

// Comparaison Q22B vs Q22Q
const comparaison = [
  { critere: 'Moteur', q22b: '1.1L — 68 Ch', q22q: '1.3L — 82 Ch' },
  { critere: 'Couple', q22b: '98 Nm', q22q: '108 Nm' },
  { critere: 'Vitesse max', q22b: '110 km/h', q22q: '115 km/h' },
  { critere: 'Longueur totale', q22b: '4 379 mm', q22q: '4 873 mm' },
  { critere: 'Plateau', q22b: '2 500 mm', q22q: '3 000 mm' },
  { critere: 'Empattement', q22b: '2 600 mm', q22q: '3 050 mm' },
  { critere: 'PTAC', q22b: '2 205 kg', q22q: '2 210 kg' },
  { critere: 'Charge utile', q22b: '1 100 kg', q22q: '1 035 kg' },
]

export default function KarryQ22QPage() {
  const [activeTab, setActiveTab] = useState<'moteur' | 'dimensions' | 'equipements'>('moteur')

  return (
    <main className="bg-white min-h-screen">

      {/* ── HERO ── */}
      <section className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #003d78 0%, #0057A8 50%, #0070d8 100%)', minHeight: '90vh' }}>

        {/* Décors */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full opacity-10" style={{ background: 'radial-gradient(circle, white, transparent)', transform: 'translate(30%, -30%)' }} />
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
          {/* Accent long = plateau long */}
          <div className="absolute left-0 top-1/2 w-full h-0.5 opacity-10" style={{ background: 'linear-gradient(90deg, transparent, white, transparent)' }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 pt-24 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Texte */}
            <div>
              <div className="flex items-center gap-2 text-white/40 text-xs mb-6">
                <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
                <span>/</span>
                <Link href="/catalogue" className="hover:text-white transition-colors">Catalogue</Link>
                <span>/</span>
                <span className="text-white/70">Karry Q22Q</span>
              </div>

              <div className="inline-flex items-center gap-2 bg-white/15 border border-white/20 text-white text-[11px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                Karry · Plateau Long
              </div>

              <h1 className="font-black text-white leading-none tracking-tighter mb-4" style={{ fontSize: 'clamp(3.5rem, 8vw, 6.5rem)' }}>
                Q22<span style={{ color: '#7DB8F7' }}>Q</span>
              </h1>

              <p className="text-white/60 text-base mb-8 max-w-md leading-relaxed">
                {modele.soustitre}
              </p>

              {/* 3 stats clés */}
              <div className="grid grid-cols-3 gap-4 mb-10">
                {[
                  { val: '1 035', unit: 'kg', label: 'Charge utile' },
                  { val: '3 000', unit: 'mm', label: 'Plateau long' },
                  { val: '82', unit: 'Ch', label: 'Puissance' },
                ].map((s, i) => (
                  <div key={i} className="bg-white/10 border border-white/15 rounded-2xl p-4 text-center">
                    <div className="font-black text-white text-2xl leading-none">{s.val}<span className="text-sm text-white/50 ml-1">{s.unit}</span></div>
                    <div className="text-white/40 text-[11px] mt-1 uppercase tracking-wide">{s.label}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/devis"
                  className="inline-flex items-center gap-2 text-sm font-bold text-white px-7 py-3.5 rounded-xl transition-all hover:brightness-110"
                  style={{ background: '#CC0000', boxShadow: '0 6px 24px rgba(204,0,0,0.4)' }}
                >
                  Demande de devis
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </Link>
                <a href="tel:0524885025" className="inline-flex items-center gap-2 text-sm font-semibold text-white px-7 py-3.5 rounded-xl border border-white/25 hover:bg-white/10 transition-all">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" /></svg>
                  0524 885 025
                </a>
              </div>
            </div>

            {/* Image */}
            <div className="relative">
              <div className="relative h-80 lg:h-[420px]">
                <Image src={modele.img} alt="Karry Q22Q" fill className="object-contain" style={{ filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.4))' }} />
              </div>
              <div className="absolute top-4 right-4 bg-white rounded-2xl px-5 py-3 shadow-xl text-center">
                <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Plateau jusqu'à</div>
                <div className="font-black text-2xl leading-none" style={{ color: '#0057A8' }}>3 000<span className="text-sm">mm</span></div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" className="w-full" style={{ display: 'block' }}>
            <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* ── GALERIE PHOTOS ── */}
      <GaleriePhotos />

      {/* ── ATOUTS ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: '#0057A8' }}>Pourquoi choisir le Q22Q</p>
            <h2 className="text-3xl font-black text-gray-900">Les points forts</h2>
            <div className="w-10 h-0.5 mx-auto mt-4" style={{ background: '#0057A8' }} />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {modele.atouts.map((a, i) => (
              <div key={i} className="rounded-2xl border border-gray-100 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center">
                <div className="text-4xl mb-4">{a.icon}</div>
                <h3 className="font-black text-gray-900 text-sm mb-2">{a.titre}</h3>
                <p className="text-gray-400 text-xs leading-relaxed">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SPECS ── */}
      <section className="py-20" style={{ background: '#f8faff' }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: '#0057A8' }}>Fiche technique complète</p>
            <h2 className="text-3xl font-black text-gray-900">Caractéristiques</h2>
          </div>
          <div className="flex gap-2 justify-center mb-10 flex-wrap">
            {([
              { key: 'moteur', label: 'Moteur & Transmission' },
              { key: 'dimensions', label: 'Dimensions & Poids' },
              { key: 'equipements', label: 'Équipements' },
            ] as const).map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className="px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200"
                style={{
                  background: activeTab === tab.key ? '#0057A8' : 'white',
                  color: activeTab === tab.key ? 'white' : '#6b7280',
                  boxShadow: activeTab === tab.key ? '0 4px 16px rgba(0,87,168,0.3)' : '0 1px 4px rgba(0,0,0,0.08)',
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100">
            {modele.specs[activeTab].map((row, i) => (
              <div key={i} className="flex items-center justify-between px-8 py-4 border-b border-gray-50 last:border-0 hover:bg-blue-50/30 transition-colors">
                <span className="text-gray-500 text-sm">{row.label}</span>
                <span className="font-black text-gray-900 text-sm text-right">{row.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMPARAISON Q22B vs Q22Q ── */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: '#0057A8' }}>Aide au choix</p>
            <h2 className="text-3xl font-black text-gray-900">Q22B vs Q22Q</h2>
            <div className="w-10 h-0.5 mx-auto mt-4" style={{ background: '#0057A8' }} />
          </div>
          <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
            {/* Header */}
            <div className="grid grid-cols-3 text-center" style={{ background: '#0057A8' }}>
              <div className="py-4 text-white/60 text-xs font-bold uppercase tracking-widest">Critère</div>
              <div className="py-4 text-white font-black text-sm border-x border-white/10">Q22B — Compact</div>
              <div className="py-4 font-black text-sm" style={{ color: '#7DB8F7' }}>Q22Q — Long ✓</div>
            </div>
            {/* Lignes */}
            {comparaison.map((row, i) => (
              <div key={i} className={`grid grid-cols-3 text-center border-b border-gray-50 last:border-0 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                <div className="py-4 px-4 text-gray-500 text-sm">{row.critere}</div>
                <div className="py-4 px-4 text-gray-700 text-sm font-semibold border-x border-gray-100">{row.q22b}</div>
                <div className="py-4 px-4 text-sm font-black" style={{ color: '#0057A8' }}>{row.q22q}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SCHÉMA PLATEAU ── */}
      <section className="py-20" style={{ background: '#f8faff' }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: '#0057A8' }}>Dimensions plateau</p>
            <h2 className="text-3xl font-black text-gray-900">Plateau 3 000 mm</h2>
          </div>
          <div className="rounded-3xl p-10 border-2 border-dashed flex flex-col items-center gap-4" style={{ borderColor: '#0057A820', background: '#f0f6ff' }}>
            <svg viewBox="0 0 560 160" className="w-full max-w-2xl">
              <rect x="60" y="40" width="420" height="60" rx="4" fill="#0057A8" opacity="0.15" stroke="#0057A8" strokeWidth="1.5" />
              <line x1="60" y1="120" x2="480" y2="120" stroke="#0057A8" strokeWidth="1.5" />
              <text x="270" y="138" textAnchor="middle" fill="#0057A8" fontSize="13" fontWeight="800">3 000 mm</text>
              <line x1="20" y1="40" x2="20" y2="100" stroke="#0057A8" strokeWidth="1.5" />
              <text x="8" y="75" textAnchor="middle" fill="#0057A8" fontSize="11" fontWeight="700" transform="rotate(-90 8 75)">1 500 mm</text>
              <line x1="500" y1="40" x2="500" y2="100" stroke="#0057A8" strokeWidth="1.5" />
              <text x="520" y="75" textAnchor="start" fill="#0057A8" fontSize="11" fontWeight="700">327 mm</text>
            </svg>
            <div className="flex gap-8 text-center">
              {[['Longueur', '3 000 mm'], ['Largeur', '1 500 mm'], ['Hauteur ridelles', '327 mm']].map(([l, v]) => (
                <div key={l}>
                  <div className="font-black text-lg" style={{ color: '#0057A8' }}>{v}</div>
                  <div className="text-gray-400 text-xs">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <BrochureForm modele="karry-q22d" marque="karry" nomModele="Karry Q22Q" />
      {/* ── CTA FINAL ── */}
      <section className="py-20" style={{ background: 'linear-gradient(135deg, #003d78, #0057A8)' }}>
        <div className="max-w-2xl mx-auto px-6 text-center">
          <p className="text-xs font-black uppercase tracking-widest text-white/40 mb-3">Intéressé par ce modèle ?</p>
          <h2 className="text-3xl font-black text-white mb-4">Demandez votre devis</h2>
          <div className="w-10 h-0.5 bg-white/30 mx-auto mb-6" />
          <p className="text-white/50 text-sm mb-10">Notre équipe vous répond dans les 24h — Ouarzazate · Agadir · Tinghir</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/devis" className="inline-flex items-center gap-2 bg-[#CC0000] hover:bg-[#aa0000] text-white font-bold px-8 py-3.5 rounded-xl transition-all text-sm" style={{ boxShadow: '0 4px 20px rgba(204,0,0,0.4)' }}>
              Demande de devis gratuit
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
            <Link href="/catalogue/karry-22b" className="inline-flex items-center gap-2 text-white font-bold px-8 py-3.5 rounded-xl border border-white/25 hover:bg-white/10 transition-all text-sm">
              Voir le Q22B (plateau court)
            </Link>
          </div>
        </div>
      </section>

    </main>
  )
}