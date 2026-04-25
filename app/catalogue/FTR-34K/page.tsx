'use client'

import { useState } from 'react'
import Link from 'next/link'
import BrochureForm from '@/app/components/BrochureForm'

const images = [
  '/images/camions/serie-f/ftr-34k/img1.jpg',
  '/images/camions/serie-f/ftr-34k/img2.jpg',
  '/images/camions/serie-f/ftr-34k/img3.jpg',
  '/images/camions/serie-f/ftr-34k/img4.jpg',
  '/images/camions/serie-f/ftr-34k/img5.jpg',
  '/images/camions/serie-f/ftr-34k/img6.jpg',
]

const specs = [
  {
    categorie: 'Dimensions & Poids', icon: '📐',
    items: [
      { label: 'Empattement',                  valeur: '3 900 mm' },
      { label: 'Longueur carossable',          valeur: '4 870 mm' },
      { label: 'Poids total en charge (PTAC)', valeur: '16 000 kg' },
      { label: 'Poids à vide — Avant',         valeur: '2 940 kg' },
      { label: 'Poids à vide — Arrière',       valeur: '1 595 kg' },
      { label: 'Poids à vide — Total',         valeur: '4 535 kg' },
    ],
  },
  {
    categorie: 'Essieux & Pont', icon: '🔩',
    items: [
      { label: 'Cabine',                  valeur: 'Large' },
      { label: 'Capacité essieu avant',   valeur: '6 500 kg' },
      { label: 'Capacité essieu arrière', valeur: '11 500 kg' },
      { label: 'Rapport de pont',         valeur: '6.143' },
    ],
  },
  {
    categorie: 'Moteur', icon: '⚙️',
    items: [
      { label: 'Modèle',              valeur: '6HK1-TCN' },
      { label: 'Type',                valeur: 'Turbo diesel intercooler Common Rail' },
      { label: 'Émission',           valeur: 'EURO IV' },
      { label: 'Nombre de cylindres', valeur: '6' },
      { label: 'Cylindrée',           valeur: '7 790 cc' },
      { label: 'Puissance maxi',      valeur: '240 ch (177 kw) / 2 400 tr/min' },
      { label: 'Couple maxi',         valeur: '706 Nm / 1 450 tr/min' },
    ],
  },
  {
    categorie: 'Boîte de vitesse', icon: '🔄',
    items: [
      { label: 'Modèle',             valeur: 'MZW6P' },
      { label: 'Type',               valeur: 'Mécanique surmultipliée' },
      { label: 'Nombre de rapports', valeur: '6 AV + 1 AR' },
    ],
  },
  {
    categorie: 'Direction & Freinage', icon: '🛡️',
    items: [
      { label: 'Direction',           valeur: 'Assistée — écrou bille recirculation' },
      { label: 'Freinage service',    valeur: 'Frein pneumatique à tambours' },
      { label: 'Frein stationnement', valeur: 'À ressort sur roues arrières' },
      { label: 'Frein auxiliaire',    valeur: 'Frein sur échappement' },
      { label: 'ABS',                 valeur: 'Avec système antiblocage des freins' },
    ],
  },
  {
    categorie: 'Suspension & Pneus', icon: '🚛',
    items: [
      { label: 'Suspension',         valeur: 'Ressorts à lames AV et AR' },
      { label: 'Dimension pneus',    valeur: '11R22,5-14' },
      { label: 'Nombre de goujons',  valeur: '10' },
      { label: 'Capacité réservoir', valeur: '200 litres' },
      { label: 'Alternateur',        valeur: '24V — 50A' },
    ],
  },
]

const dimensions = [
  { code: 'OAL', valeur: '6 755', label: 'Longueur totale' },
  { code: 'WB',  valeur: '3 900', label: 'Empattement' },
  { code: 'FOH', valeur: '1 440', label: 'Porte-à-faux avant' },
  { code: 'ROH', valeur: '1 415', label: 'Porte-à-faux arrière' },
  { code: 'CA',  valeur: '3 274', label: 'Long. cabine-essieu' },
  { code: 'CE',  valeur: '4 689', label: 'Longueur carossable' },
  { code: 'OW',  valeur: '2 400', label: 'Largeur totale' },
  { code: 'OH',  valeur: '2 815', label: 'Hauteur totale' },
  { code: 'AW',  valeur: '1 965', label: 'Voie avant' },
  { code: 'BW',  valeur: '2 425', label: 'Voie arrière ext.' },
  { code: 'CW',  valeur: '1 820', label: 'Voie arrière int.' },
  { code: 'EH',  valeur: '1 054', label: 'Hauteur châssis' },
]

const equipements = [
  'Radio AM/FM avec lecteur de CD',
  'Système à 2 haut-parleurs',
  'Siège en tissu',
  'Ceinture de sécurité 3 points conducteur/assistant',
  'Ceinture 2 points siège central',
  'Siège à suspension pneumatique',
  'Cendrier conducteur et assistant',
  'Aération par air dynamique',
  'Chauffage et dégivreur',
  'Tachygraphe',
  'Console supérieure avec pare-soleil',
  'Boîte à gants avec couvercle',
  'Rail de rideaux',
  'Tapis-lit',
  'Lunette arrière avec rétroviseur intérieur',
  'Antibrouillard avant',
  'Essuie-glace intermittent',
  'Prise de force (PTO)',
]

const modeles_fseries = [
  { nom: 'FTR 34K 16T', href: '/catalogue/ftr-34k', actif: true  },
  { nom: 'FTR 34M 16T', href: '/catalogue/ftr-34m', actif: false },
  { nom: 'FTR 34P 16T', href: '/catalogue/ftr-34p', actif: false },
  { nom: 'FVR 34K 18T', href: '/catalogue/fvr-34k', actif: false },
  { nom: 'FVR 34P 18T', href: '/catalogue/fvr-34p', actif: false },
]


function GalerieSlider({ images, titre }: { images: string[]; titre: string }) {
  const [active, setActive] = useState(0)

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-10">
          <p className="text-[#CC0000] font-bold text-xs uppercase tracking-widest mb-3">Galerie</p>
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-10 bg-[#C9A84C]" />
            <h2 className="text-3xl font-black text-gray-900">Photos du {titre}</h2>
            <div className="h-px w-10 bg-[#C9A84C]" />
          </div>
        </div>

        {/* Image principale */}
        <div className="relative rounded-3xl overflow-hidden border border-gray-100 bg-white shadow-md mb-4" style={{ height: '480px' }}>
          <img
            key={active}
            src={images[active]}
            alt={`${titre} — Photo ${active + 1}`}
            className="w-full h-full object-contain"
            style={{ animation: 'fadeIn .3s ease' }}
          />
          {/* Numéro */}
          <div className="absolute bottom-4 right-4 bg-black/50 text-white text-xs font-bold px-3 py-1 rounded-full">
            {active + 1} / {images.length}
          </div>
          {/* Flèche gauche */}
          {active > 0 && (
            <button
              onClick={() => setActive(active - 1)}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-md flex items-center justify-center transition-all hover:scale-110">
              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7"/>
              </svg>
            </button>
          )}
          {/* Flèche droite */}
          {active < images.length - 1 && (
            <button
              onClick={() => setActive(active + 1)}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-md flex items-center justify-center transition-all hover:scale-110">
              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7"/>
              </svg>
            </button>
          )}
        </div>

        {/* Miniatures */}
        <div className="flex gap-3 overflow-x-auto pb-2">
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className="flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all"
              style={{
                width: 120, height: 80,
                borderColor: active === i ? '#CC0000' : 'transparent',
                opacity: active === i ? 1 : 0.55,
                transform: active === i ? 'scale(1.05)' : 'scale(1)',
              }}>
              <img src={src} alt={`Miniature ${i + 1}`} className="w-full h-full object-contain bg-white"/>
            </button>
          ))}
        </div>

        <style>{`@keyframes fadeIn { from{opacity:0} to{opacity:1} }`}</style>
      </div>
    </section>
  )
}

export default function FTR34KPage() {
  return (
    <main className="bg-white">

      {/* ── HERO — fond blanc, ouvert ── */}
      <section className="bg-white pt-32 pb-16 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6">

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-8 flex-wrap">
            <Link href="/" className="hover:text-[#CC0000] transition-colors">Accueil</Link>
            <span>/</span>
            <Link href="/catalogue" className="hover:text-[#CC0000] transition-colors">Notre gamme</Link>
            <span>/</span>
            <span className="text-gray-500">F-Series</span>
            <span>/</span>
            <span className="text-[#CC0000] font-semibold">FTR 34K 16T</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-2 mb-5 flex-wrap">
                <span className="bg-[#CC0000] text-white text-xs font-bold px-3 py-1 rounded-full">Isuzu</span>
                <span className="bg-gray-100 text-gray-600 text-xs font-semibold px-3 py-1 rounded-full">F-Series</span>
                <span className="bg-[#1B2B6B] text-white text-xs font-bold px-3 py-1 rounded-full">16T</span>
                <span className="bg-gray-100 text-gray-600 text-xs font-semibold px-3 py-1 rounded-full">Empattement standard</span>
              </div>

              <h1 className="text-5xl lg:text-6xl font-black text-gray-900 mb-2 leading-none">
                FTR <span className="text-[#CC0000]">34K</span>
              </h1>
              <p className="text-gray-400 text-lg font-semibold mb-5">16T — Empattement standard</p>

              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-1 bg-[#CC0000] rounded-full" />
                <div className="w-5 h-1 bg-[#C9A84C] rounded-full" />
              </div>

              <p className="text-gray-500 text-base leading-relaxed mb-8 max-w-lg">
                Le FTR 34K est le camion 16 tonnes de la gamme F-Series Isuzu, alliant puissance
                et polyvalence pour les transports sur longs parcours et les applications sévères.
                Équipé du moteur 6 cylindres 6HK1-TCN à injection Common Rail, il offre
                une longueur carossable de 4 870 mm et une cabine large confortable.
                <span className="text-[#C9A84C] font-bold"> Garantie 3 ans SDAMA.</span>
              </p>

              <a href="tel:0524885025"
                className="inline-flex items-center gap-2 bg-[#CC0000] hover:bg-[#aa0000] text-white font-bold px-6 py-3 rounded-full transition-all shadow-md">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                </svg>
                0524 885 025 — CADOZAT
              </a>
            </div>

            {/* Specs rapides */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: '⚡', label: 'Puissance',   valeur: '240 ch / 177 kw' },
                { icon: '🔄', label: 'Couple maxi', valeur: '706 Nm' },
                { icon: '📦', label: 'PTAC',         valeur: '16 000 kg' },
                { icon: '📏', label: 'Cylindrée',   valeur: '7 790 cc' },
                { icon: '⛽', label: 'Réservoir',   valeur: '200 L' },
                { icon: '🌿', label: 'Émission',    valeur: 'EURO IV' },
              ].map((s, i) => (
                <div key={i} className="bg-gray-50 border border-gray-100 rounded-2xl p-4 hover:border-[#CC0000]/30 hover:shadow-sm transition-all">
                  <div className="text-2xl mb-2">{s.icon}</div>
                  <div className="text-gray-400 text-xs mb-1">{s.label}</div>
                  <div className="text-gray-900 font-black text-sm">{s.valeur}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── GALERIE ── */}
      <GalerieSlider images={images} titre="FTR 34K" />

      {/* ── FICHE TECHNIQUE ── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-[#CC0000] font-bold text-xs uppercase tracking-widest mb-3">Données officielles SDAMA</p>
            <div className="flex items-center justify-center gap-3">
              <div className="h-px w-10 bg-[#C9A84C]" />
              <h2 className="text-3xl font-black text-gray-900">Fiche technique complète</h2>
              <div className="h-px w-10 bg-[#C9A84C]" />
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {specs.map((cat, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 hover:border-[#CC0000]/20 hover:shadow-md transition-all overflow-hidden">
                <div className="bg-gray-50 border-b border-gray-100 px-5 py-3 flex items-center gap-3">
                  <span className="text-xl">{cat.icon}</span>
                  <h3 className="font-black text-gray-700 text-xs uppercase tracking-wide">{cat.categorie}</h3>
                </div>
                <div className="p-4">
                  {cat.items.map((item, j) => (
                    <div key={j} className={`flex justify-between gap-4 py-2.5 ${j < cat.items.length - 1 ? 'border-b border-gray-50' : ''}`}>
                      <span className="text-gray-400 text-xs">{item.label}</span>
                      <span className="text-gray-800 text-xs font-bold text-right">{item.valeur}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DIMENSIONS ── */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-[#CC0000] font-bold text-xs uppercase tracking-widest mb-3">Cotes officielles</p>
            <div className="flex items-center justify-center gap-3">
              <div className="h-px w-10 bg-[#C9A84C]" />
              <h2 className="text-3xl font-black text-gray-900">Dimensions (mm)</h2>
              <div className="h-px w-10 bg-[#C9A84C]" />
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {dimensions.map((d, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 hover:border-[#CC0000]/30 p-5 text-center transition-all">
                <div className="text-sm font-black text-[#CC0000] mb-1">{d.code}</div>
                <div className="text-2xl font-black text-gray-900 mb-1">{d.valeur}</div>
                <div className="text-xs text-gray-400">{d.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ÉQUIPEMENTS ── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-[#CC0000] font-bold text-xs uppercase tracking-widest mb-3">Inclus de série</p>
            <div className="flex items-center justify-center gap-3">
              <div className="h-px w-10 bg-[#C9A84C]" />
              <h2 className="text-3xl font-black text-gray-900">Équipements</h2>
              <div className="h-px w-10 bg-[#C9A84C]" />
            </div>
          </div>
          <div className="bg-gray-50 rounded-2xl border border-gray-100 p-8">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {equipements.map((eq, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl hover:bg-white transition-colors">
                  <div className="w-5 h-5 bg-[#CC0000] rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/>
                    </svg>
                  </div>
                  <span className="text-gray-600 text-sm font-medium">{eq}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── NAVIGATION F-SERIES ── */}
      <section className="py-10 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-xs font-bold text-gray-400 uppercase tracking-widest mb-5">Autres modèles F-Series</p>
          <div className="flex flex-wrap gap-3 justify-center">
            {modeles_fseries.map((m) => (
              <Link key={m.nom} href={m.href}
                className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
                  m.actif
                    ? 'bg-[#CC0000] text-white shadow-md'
                    : 'bg-white border border-gray-200 text-gray-600 hover:border-[#CC0000] hover:text-[#CC0000]'
                }`}>
                {m.nom}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <BrochureForm modele="FTR34K" marque="isuzu" nomModele="FTR 34K" />

      {/* ── CTA FINAL ── */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-black text-gray-900 mb-2">
            Intéressé par le <span className="text-[#CC0000]">FTR 34K</span> ?
          </h2>
          <div className="w-12 h-0.5 bg-[#C9A84C] mx-auto my-4" />
          <p className="text-gray-400 mb-8 text-sm">
            Contactez l&apos;une de nos 3 agences — Ouarzazate · Agadir · Tinghir
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="tel:0524885025"
              className="inline-flex items-center gap-2 bg-[#CC0000] hover:bg-[#aa0000] text-white font-bold px-8 py-4 rounded-full transition-all shadow-lg">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
              </svg>
              0524 885 025
            </a>
            <Link href="/contact"
              className="inline-flex items-center border border-gray-200 hover:border-[#CC0000] hover:text-[#CC0000] text-gray-600 font-bold px-8 py-4 rounded-full transition-all">
              Nous contacter
            </Link>
            <Link href="/catalogue"
              className="inline-flex items-center border border-gray-200 hover:border-[#CC0000] hover:text-[#CC0000] text-gray-600 font-bold px-8 py-4 rounded-full transition-all">
              Voir toute la gamme
            </Link>
          </div>
        </div>
      </section>

    </main>
  )
}