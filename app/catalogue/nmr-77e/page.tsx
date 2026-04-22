'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const imagesExt = [
  '/images/camions/nmr-77e/ext1.jpg',
  '/images/camions/nmr-77e/ext2.jpg',
  '/images/camions/nmr-77e/ext3.jpg',
]

const imagesInt = [
  '/images/camions/nmr-77e/int1.png',
  '/images/camions/nmr-77e/int2.png',
]

const specs = [
  {
    categorie: 'Dimensions & Poids',
    icon: '📐',
    items: [
      { label: 'Empattement', valeur: '2 490 mm' },
      { label: 'Longueur carossable', valeur: '3 200 mm' },
      { label: 'Poids total en charge (PTAC)', valeur: '3 500 kg' },
      { label: 'Poids à vide — Avant', valeur: '1 390 kg' },
      { label: 'Poids à vide — Arrière', valeur: '595 kg' },
      { label: 'Poids à vide — Total', valeur: '1 985 kg' },
    ],
  },
  {
    categorie: 'Essieux & Pont',
    icon: '🔩',
    items: [
      { label: 'Cabine', valeur: 'Standard' },
      { label: 'Capacité essieu avant', valeur: '1 800 kg' },
      { label: 'Capacité essieu arrière', valeur: '2 200 kg' },
      { label: 'Rapport de pont', valeur: '5.125' },
    ],
  },
  {
    categorie: 'Moteur',
    icon: '⚙️',
    items: [
      { label: 'Modèle', valeur: '4JH1-TC' },
      { label: 'Type', valeur: 'Turbo diesel intercooler Common Rail' },
      { label: 'Émission', valeur: 'EURO IV sans filtre à particules' },
      { label: 'Nombre de cylindres', valeur: '4' },
      { label: 'Cylindrée', valeur: '2 999 cc' },
      { label: 'Puissance maxi', valeur: '105 ch (77 kw) / 3 200 tr/min' },
      { label: 'Couple maxi', valeur: '230 Nm / 1 400 tr/min' },
    ],
  },
  {
    categorie: 'Boîte de vitesse',
    icon: '🔄',
    items: [
      { label: 'Modèle', valeur: 'MSB-5S' },
      { label: 'Type', valeur: 'Mécanique surmultipliée' },
      { label: 'Nombre de rapports', valeur: '5 AV + 1 AR' },
    ],
  },
  {
    categorie: 'Direction & Freinage',
    icon: '🛡️',
    items: [
      { label: 'Direction', valeur: 'Assistée — écrou bille recirculation' },
      { label: 'Freinage service', valeur: 'Frein hydraulique à tambour' },
      { label: 'Frein stationnement', valeur: 'À tambour sur arbre transmission' },
      { label: 'Frein auxiliaire', valeur: 'Frein sur échappement' },
      { label: 'LSPV', valeur: 'Répartition force de freinage' },
    ],
  },
  {
    categorie: 'Suspension & Pneus',
    icon: '🚛',
    items: [
      { label: 'Suspension', valeur: 'Ressorts à lames AV et AR' },
      { label: 'Dimension pneus', valeur: '195/85 R16' },
      { label: 'Nombre de goujons', valeur: '5' },
      { label: 'Capacité réservoir', valeur: '75 litres' },
      { label: 'Alternateur', valeur: '12V — 60A' },
    ],
  },
]

const dimensions = [
  { code: 'OAL', valeur: '4 745', label: 'Longueur totale' },
  { code: 'WB', valeur: '2 490', label: 'Empattement' },
  { code: 'FOH', valeur: '1 110', label: 'Porte-à-faux avant' },
  { code: 'ROH', valeur: '1 160', label: 'Porte-à-faux arrière' },
  { code: 'CE', valeur: '3 200', label: 'Longueur carossable' },
  { code: 'CA', valeur: '2 043', label: 'Longueur cabine' },
  { code: 'OW', valeur: '1 815', label: 'Largeur totale' },
  { code: 'OH', valeur: '2 160', label: 'Hauteur totale' },
]

const equipements = [
  'Radio AM/FM avec lecteur de CD',
  'Système à 2 haut-parleurs',
  'Siège en tissu',
  'Ceinture de sécurité 3 points',
  'Cendrier conducteur',
  'Aération par air dynamique',
  'Chauffage et dégivreur',
  'Essuie-glace intermittent',
  'Console supérieure avec pare-soleil',
  'Boîte à gants avec couvercle',
  'Lunette arrière avec rétroviseur intérieur',
  'Antibrouillard avant',
]

const modeles_nseries = [
  { nom: 'NMR 77E', href: '/catalogue/nmr-77e', actif: true },
  { nom: 'NMR 85H', href: '/catalogue/nmr-85h', actif: false },
  { nom: 'NNR 85H', href: '/catalogue/nnr-85h', actif: false },
  { nom: 'NPR 75K', href: '/catalogue/npr-75k', actif: false },
  { nom: 'NPR 75L', href: '/catalogue/npr-75l', actif: false },
  { nom: 'NQR 90K', href: '/catalogue/nqr-90k', actif: false },
  { nom: 'NQR 90M', href: '/catalogue/nqr-90m', actif: false },
]

function Carrousel({ images, label }: { images: string[], label: string }) {
  const [actif, setActif] = useState(0)
  const prev = () => setActif((a) => (a - 1 + images.length) % images.length)
  const next = () => setActif((a) => (a + 1) % images.length)

  useEffect(() => {
    const timer = setInterval(() => {
      setActif((a) => (a + 1) % images.length)
    }, 3500)
    return () => clearInterval(timer)
  }, [images.length])

  return (
    <div className="relative w-full rounded-2xl overflow-hidden bg-gray-50 border border-gray-200 shadow-sm" style={{aspectRatio: '16/10'}}>
      {images.map((src, i) => (
        <img key={i} src={src} alt={`${label} ${i + 1}`}
          className="absolute inset-0 w-full h-full object-contain transition-opacity duration-500"
          style={{ opacity: i === actif ? 1 : 0 }}
        />
      ))}
      {images.length > 1 && (
        <>
          <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow border border-gray-200 transition-all">
            <svg className="w-3.5 h-3.5 text-[#1B2B6B]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7"/></svg>
          </button>
          <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow border border-gray-200 transition-all">
            <svg className="w-3.5 h-3.5 text-[#1B2B6B]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7"/></svg>
          </button>
          <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, i) => (
              <button key={i} onClick={() => setActif(i)} className="rounded-full transition-all"
                style={{ width: i === actif ? '20px' : '7px', height: '7px', background: i === actif ? '#CC0000' : 'rgba(0,0,0,0.2)' }}
              />
            ))}
          </div>
          <div className="absolute top-2.5 right-2.5 bg-[#1B2B6B]/60 text-white text-xs font-bold px-2 py-0.5 rounded-full backdrop-blur-sm">
            {actif + 1} / {images.length}
          </div>
        </>
      )}
    </div>
  )
}

export default function NMR77EPage() {
  return (
    <main className="bg-white">

      {/* HERO */}
      <section className="relative bg-[#1B2B6B] overflow-hidden pt-24 pb-16">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#CC0000] rounded-full blur-3xl translate-x-1/3 -translate-y-1/3"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#C9A84C] rounded-full blur-3xl -translate-x-1/3 translate-y-1/3"></div>
        </div>
        <div className="absolute inset-0 opacity-[0.04]" style={{backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)', backgroundSize: '40px 40px'}}></div>
        <div className="absolute bottom-0 left-0 right-0 h-px" style={{background: 'linear-gradient(90deg, transparent, #C9A84C, transparent)'}}></div>

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-2 text-white/30 text-xs mb-8">
            <Link href="/" className="hover:text-white/60 transition-colors">Accueil</Link>
            <span>/</span>
            <Link href="/catalogue" className="hover:text-white/60 transition-colors">Notre gamme</Link>
            <span>/</span>
            <span className="text-white/50">N-Series</span>
            <span>/</span>
            <span className="text-[#C9A84C]">NMR 77E</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-2 mb-5 flex-wrap">
                <span className="bg-[#CC0000] text-white text-xs font-bold px-3 py-1 rounded-full">Isuzu</span>
                <span className="bg-white/10 text-white/80 text-xs px-3 py-1 rounded-full border border-white/15">N-Series</span>
                <span className="text-[#C9A84C] text-xs font-bold px-3 py-1 rounded-full border border-[#C9A84C]/40">3.5T</span>
                <span className="bg-white/10 text-white/80 text-xs px-3 py-1 rounded-full border border-white/15">Châssis court</span>
              </div>
              <h1 className="text-6xl font-black text-white leading-none tracking-tight mb-1">NMR <span className="text-[#CC0000]">77E</span></h1>
              <p className="text-white/40 text-xs font-bold tracking-widest uppercase mb-6">3.5T — Châssis court</p>
              <div className="w-10 h-0.5 bg-[#CC0000] mb-6"></div>
              <p className="text-white/55 text-sm leading-relaxed mb-8 max-w-md">
                Camion léger 3.5T sur châssis court, conçu pour les livraisons urbaines. Cabine aérodynamique, moteur Common Rail économique et maniabilité optimale.
                <span className="text-[#C9A84C]"> Garantie 3 ans SDAMA.</span>
              </p>
              <a href="tel:0524885025" className="inline-flex items-center gap-2.5 bg-white/8 hover:bg-white/14 text-white text-sm font-semibold px-5 py-2.5 rounded-lg border border-white/15 transition-all">
                <svg className="w-4 h-4 text-[#C9A84C]" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/></svg>
                0524 885 025 — CADOZAT
              </a>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'Puissance', valeur: '105 ch', sub: '77 kw' },
                { label: 'Couple', valeur: '230 Nm', sub: '1 400 tr/min' },
                { label: 'PTAC', valeur: '3 500', sub: 'kg' },
                { label: 'Cylindrée', valeur: '2 999', sub: 'cc' },
                { label: 'Réservoir', valeur: '75', sub: 'litres' },
                { label: 'Émission', valeur: 'EURO', sub: 'IV' },
              ].map((s, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/8 transition-all">
                  <div className="text-white/35 text-xs mb-1">{s.label}</div>
                  <div className="text-white font-black text-xl leading-none">{s.valeur}</div>
                  <div className="text-white/35 text-xs mt-0.5">{s.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* GALERIE */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-16">
            <p className="text-xs font-black text-[#CC0000] uppercase tracking-widest mb-2">Découvrez le véhicule</p>
            <h2 className="text-3xl font-black text-[#1B2B6B]">Galerie photos</h2>
            <div className="w-10 h-0.5 bg-[#C9A84C] mx-auto mt-4"></div>
          </div>

          {/* 1 — Photo gauche / Texte droite */}
          <div className="grid md:grid-cols-2 gap-14 items-center mb-16 pb-16 border-b border-gray-100">
            <Carrousel images={imagesExt} label="NMR 77E Extérieur" />
            <div>
              <p className="text-xs font-black text-[#CC0000] uppercase tracking-widest mb-2">Extérieur</p>
              <h3 className="text-2xl font-black text-[#1B2B6B] mb-4">Cabine aérodynamique & fonctionnelle</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-5">La cabine carrée du NMR 77E combine fonctionnalité et aérodynamisme pour offrir plus de confort au conducteur et une moindre consommation de carburant. Les faces avant et le toit aérodynamique réduisent la résistance à l&apos;air.</p>
              <div className="space-y-2">
                {["Châssis court — Empattement 2 490 mm","PTAC 3 500 kg — Garantie 3 ans","Moteur 4JH1-TC EURO IV"].map((pt, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#CC0000] flex-shrink-0"></div>
                    <span className="text-sm text-gray-600">{pt}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 2 — Texte gauche / Photo droite */}
          <div className="grid md:grid-cols-2 gap-14 items-center mb-16 pb-16 border-b border-gray-100">
            <div className="order-2 md:order-1">
              <p className="text-xs font-black text-[#1B2B6B] uppercase tracking-widest mb-2">Extérieur</p>
              <h3 className="text-2xl font-black text-[#1B2B6B] mb-4">Châssis rigide & haute fiabilité</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-5">Le châssis rigide avec disposition de l&apos;essieu avant légèrement en arrière assure une capacité et fiabilité optimum. Les tambours extra-larges à l&apos;avant comme à l&apos;arrière améliorent les performances de freinage.</p>
              <div className="space-y-2">
                {["Moteur 105 ch / 230 Nm","Suspension ressorts à lames AV et AR","Freins hydrauliques à tambour"].map((pt, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#1B2B6B] flex-shrink-0"></div>
                    <span className="text-sm text-gray-600">{pt}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="order-1 md:order-2">
              <Carrousel images={imagesExt} label="NMR 77E Extérieur" />
            </div>
          </div>

          {/* Séparateur intérieur */}
          <div className="flex items-center gap-6 mb-16">
            <div className="flex-1 h-px bg-gray-100"></div>
            <div className="flex items-center gap-2.5 px-5 py-2 bg-[#1B2B6B] rounded-full">
              <div className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]"></div>
              <span className="text-white text-xs font-black uppercase tracking-widest">Intérieur Cabine</span>
              <div className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]"></div>
            </div>
            <div className="flex-1 h-px bg-gray-100"></div>
          </div>

          {/* 3 — Photo gauche / Texte droite */}
          <div className="grid md:grid-cols-2 gap-14 items-center mb-16 pb-16 border-b border-gray-100">
            <Carrousel images={imagesInt} label="NMR 77E Intérieur" />
            <div>
              <p className="text-xs font-black text-[#CC0000] uppercase tracking-widest mb-2">Intérieur</p>
              <h3 className="text-2xl font-black text-[#1B2B6B] mb-4">Poste de conduite ergonomique</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-5">Cabine avec espaces de rangements optimisés, entièrement équipée pour un service, sécurité et confort maximum. Volant télescopique et inclinable avec direction assistée.</p>
              <div className="grid grid-cols-2 gap-2">
                {["Radio AM/FM + CD","Siège en tissu","Ceinture 3 points","Boîte à gants","Chauffage & dégivrage","Console pare-soleil"].map((eq, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#1B2B6B] flex-shrink-0"></div>
                    <span className="text-xs text-gray-500">{eq}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 4 — Texte gauche / Photo droite */}
          <div className="grid md:grid-cols-2 gap-14 items-center">
            <div className="order-2 md:order-1">
              <p className="text-xs font-black text-[#1B2B6B] uppercase tracking-widest mb-2">Intérieur</p>
              <h3 className="text-2xl font-black text-[#1B2B6B] mb-4">Tableau de bord & commandes</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-5">Sièges inclinables pour une position de pilotage optimale. Volant télescopique avec direction assistée de type écrou avec bille de recirculation pour un contrôle total du véhicule.</p>
              <div className="space-y-2">
                {["Direction assistée écrou bille recirculation","Volant télescopique & inclinable","Sièges inclinables ergonomiques"].map((pt, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#CC0000] flex-shrink-0"></div>
                    <span className="text-sm text-gray-600">{pt}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="order-1 md:order-2">
              <Carrousel images={imagesInt} label="NMR 77E Intérieur" />
            </div>
          </div>

        </div>
      </section>

      {/* FICHE TECHNIQUE */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-black text-[#CC0000] uppercase tracking-widest mb-2">Données officielles SDAMA</p>
            <h2 className="text-3xl font-black text-[#1B2B6B]">Fiche technique complète</h2>
            <div className="w-10 h-0.5 bg-[#C9A84C] mx-auto mt-4"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {specs.map((cat, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all">
                <div className="px-5 py-3 flex items-center gap-3 border-b border-gray-100 bg-gray-50/80">
                  <span className="text-lg">{cat.icon}</span>
                  <h3 className="font-black text-[#1B2B6B] text-xs uppercase tracking-wider">{cat.categorie}</h3>
                </div>
                <div className="p-4">
                  {cat.items.map((item, j) => (
                    <div key={j} className={`flex justify-between gap-4 py-2 ${j < cat.items.length - 1 ? 'border-b border-gray-50' : ''}`}>
                      <span className="text-gray-400 text-xs">{item.label}</span>
                      <span className="text-[#1B2B6B] text-xs font-bold text-right">{item.valeur}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DIMENSIONS */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <p className="text-xs font-black text-[#CC0000] uppercase tracking-widest mb-2">Cotes officielles</p>
            <h2 className="text-3xl font-black text-[#1B2B6B]">Dimensions (mm)</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {dimensions.map((d, i) => (
              <div key={i} className="group bg-gray-50 hover:bg-[#1B2B6B] rounded-xl p-5 text-center transition-all border border-gray-100 hover:border-[#1B2B6B] cursor-default">
                <div className="text-sm font-black text-[#CC0000] group-hover:text-[#C9A84C] transition-colors mb-1">{d.code}</div>
                <div className="text-2xl font-black text-[#1B2B6B] group-hover:text-white transition-colors mb-1">{d.valeur}</div>
                <div className="text-xs text-gray-400 group-hover:text-white/50 transition-colors">{d.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ÉQUIPEMENTS */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <p className="text-xs font-black text-[#CC0000] uppercase tracking-widest mb-2">Inclus de série</p>
            <h2 className="text-3xl font-black text-[#1B2B6B]">Équipements</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {equipements.map((eq, i) => (
              <div key={i} className="flex items-center gap-3 bg-white p-4 rounded-xl border border-gray-100 hover:border-[#1B2B6B]/20 hover:shadow-sm transition-all">
                <div className="w-6 h-6 bg-[#1B2B6B] rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/></svg>
                </div>
                <span className="text-gray-700 text-sm">{eq}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NAVIGATION N-SERIES */}
      <section className="py-10 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-xs font-black text-gray-300 uppercase tracking-widest mb-5">Autres modèles N-Series</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {modeles_nseries.map((m) => (
              <Link key={m.nom} href={m.href}
                className="px-5 py-2.5 rounded-xl text-sm font-bold transition-all"
                style={{
                  background: m.actif ? '#1B2B6B' : 'white',
                  color: m.actif ? 'white' : '#9ca3af',
                  border: m.actif ? '2px solid #1B2B6B' : '2px solid #f3f4f6',
                }}
              >
                {m.nom}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#1B2B6B] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#CC0000] rounded-full blur-3xl translate-x-1/3 -translate-y-1/3"></div>
        </div>
        <div className="absolute top-0 left-0 right-0 h-px" style={{background: 'linear-gradient(90deg, transparent, #C9A84C, transparent)'}}></div>

        <div className="relative max-w-2xl mx-auto px-6 text-center">
          <p className="text-xs font-black text-[#C9A84C] uppercase tracking-widest mb-4">Intéressé par ce modèle ?</p>
          <h2 className="text-4xl font-black text-white mb-2">NMR <span className="text-[#CC0000]">77E</span></h2>
          <div className="w-10 h-0.5 bg-[#C9A84C] mx-auto mb-6"></div>
          <p className="text-white/40 text-sm mb-10">Contactez l&apos;une de nos 3 agences — Ouarzazate · Agadir · Tinghir</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a href="tel:0524885025" className="inline-flex items-center gap-2 bg-[#CC0000] hover:bg-[#aa0000] text-white font-bold px-7 py-3.5 rounded-xl transition-all shadow-lg text-sm">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/></svg>
              0524 885 025
            </a>
            <Link href="/contact" className="inline-flex items-center gap-2 bg-white/8 hover:bg-white/14 text-white font-bold px-7 py-3.5 rounded-xl border border-white/15 transition-all text-sm">Nous contacter</Link>
            <Link href="/catalogue" className="inline-flex items-center gap-2 bg-white/8 hover:bg-white/14 text-white font-bold px-7 py-3.5 rounded-xl border border-white/15 transition-all text-sm">Voir toute la gamme</Link>
          </div>
        </div>
      </section>

    </main>
  )
}