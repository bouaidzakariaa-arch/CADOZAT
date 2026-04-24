'use client'

import Link from 'next/link'
import BrochureForm from '@/app/components/BrochureForm'

const images = [
  '/images/camions/serie-n/img1.jpg',
  '/images/camions/serie-n/img2.jpg',
  '/images/camions/serie-n/img3.jpg',
]

const specs = [
  {
    categorie: 'Dimensions & Poids',
    icon: '📐',
    items: [
      { label: 'Empattement', valeur: '3 395 mm' },
      { label: 'Longueur carossable', valeur: '4 400 mm' },
      { label: 'Poids total en charge (PTAC)', valeur: '3 500 kg' },
      { label: 'Poids à vide — Avant', valeur: '1 425 kg' },
      { label: 'Poids à vide — Arrière', valeur: '607 kg' },
      { label: 'Poids à vide — Total', valeur: '2 032 kg' },
    ],
  },
  {
    categorie: 'Essieux & Pont',
    icon: '🔩',
    items: [
      { label: 'Cabine', valeur: 'Large' },
      { label: 'Capacité essieu avant', valeur: '1 900 kg' },
      { label: 'Capacité essieu arrière', valeur: '2 200 kg' },
      { label: 'Rapport de pont', valeur: '4.556' },
    ],
  },
  {
    categorie: 'Moteur',
    icon: '⚙️',
    items: [
      { label: 'Modèle', valeur: '4JJ1-TCC' },
      { label: 'Type', valeur: 'Turbo diesel intercooler Common Rail' },
      { label: 'Émission', valeur: 'EURO IV sans filtre à particules' },
      { label: 'Nombre de cylindres', valeur: '4' },
      { label: 'Cylindrée', valeur: '2 999 cc' },
      { label: 'Puissance maxi', valeur: '124 ch (91 kw) / 2 600 tr/min' },
      { label: 'Couple maxi', valeur: '354 Nm / 1 500 tr/min' },
    ],
  },
  {
    categorie: 'Boîte de vitesse',
    icon: '🔄',
    items: [
      { label: 'Modèle', valeur: 'MYY-65' },
      { label: 'Type', valeur: 'Mécanique surmultipliée' },
      { label: 'Nombre de rapports', valeur: '6 AV + 1 AR' },
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
      { label: 'Dimension pneus', valeur: '205/85 R16' },
      { label: 'Nombre de goujons', valeur: '5' },
      { label: 'Capacité réservoir', valeur: '100 litres' },
      { label: 'Alternateur', valeur: '24V — 50A' },
    ],
  },
]

const dimensions = [
  { code: 'OAL', valeur: '6 085', label: 'Longueur totale' },
  { code: 'WB', valeur: '3 395', label: 'Empattement' },
  { code: 'FOH', valeur: '1 110', label: 'Porte-à-faux avant' },
  { code: 'ROH', valeur: '1 580', label: 'Porte-à-faux arrière' },
  { code: 'CE', valeur: '4 400', label: 'Longueur carossable' },
  { code: 'CA', valeur: '2 820', label: 'Longueur cabine' },
  { code: 'OW', valeur: '2 040', label: 'Largeur totale' },
  { code: 'OH', valeur: '2 255', label: 'Hauteur totale' },
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
  { nom: 'NMR 77E', href: '/catalogue/nmr-77e', actif: false },
  { nom: 'NMR 85H', href: '/catalogue/nmr-85h', actif: false },
  { nom: 'NNR 85H', href: '/catalogue/nnr-85h', actif: true },
  { nom: 'NPR 75K', href: '/catalogue/npr-75k', actif: false },
  { nom: 'NPR 75L', href: '/catalogue/npr-75l', actif: false },
  { nom: 'NQR 90K', href: '/catalogue/nqr-90k', actif: false },
  { nom: 'NQR 90M', href: '/catalogue/nqr-90m', actif: false },
]

export default function NNR85HPage() {
  return (
    <main className="bg-white">

      {/* HERO */}
      <section className="relative bg-[#1B2B6B] py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#CC0000] rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute inset-0 opacity-50" style={{backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', backgroundSize: '60px 60px'}}></div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#CC0000] via-[#C9A84C] to-[#1B2B6B]"></div>

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-2 text-white/40 text-sm mb-8 flex-wrap">
            <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
            <span>/</span>
            <Link href="/catalogue" className="hover:text-white transition-colors">Notre gamme</Link>
            <span>/</span>
            <span className="text-white/60">N-Series</span>
            <span>/</span>
            <span className="text-[#C9A84C] font-semibold">NNR 85H</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4 flex-wrap">
                <span className="bg-[#CC0000] text-white text-xs font-bold px-3 py-1 rounded-full">Isuzu</span>
                <span className="bg-white/10 text-white text-xs font-semibold px-3 py-1 rounded-full border border-white/20">N-Series</span>
                <span className="bg-[#C9A84C] text-white text-xs font-bold px-3 py-1 rounded-full">3.5T</span>
                <span className="bg-white/10 text-white text-xs font-semibold px-3 py-1 rounded-full border border-white/20">Châssis long — Cabine Large</span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-black text-white mb-1">
                NNR <span className="text-[#CC0000]">85H</span>
              </h1>
              <p className="text-white/50 text-lg font-semibold mb-4">3.5T — Châssis long</p>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-1 bg-[#CC0000] rounded-full"></div>
                <div className="w-6 h-1 bg-[#C9A84C] rounded-full"></div>
              </div>
              <p className="text-white/70 text-lg leading-relaxed mb-8">
                Le NNR 85H est un camion léger 3.5T sur châssis long avec cabine large,
                offrant plus de confort pour le conducteur et une grande capacité de chargement.
                Boîte 6 rapports pour des performances optimales sur route.
                <span className="text-[#C9A84C] font-bold"> Garantie 3 ans SDAMA.</span>
              </p>
              <a href="tel:0524885025" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-3 rounded-full border border-white/30 transition-all">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                </svg>
                0524 885 025 — CADOZAT
              </a>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: '⚡', label: 'Puissance', valeur: '124 ch / 91 kw' },
                { icon: '🔄', label: 'Couple maxi', valeur: '354 Nm' },
                { icon: '📦', label: 'PTAC', valeur: '3 500 kg' },
                { icon: '📏', label: 'Cylindrée', valeur: '2 999 cc' },
                { icon: '⛽', label: 'Réservoir', valeur: '100 litres' },
                { icon: '🌿', label: 'Émission', valeur: 'EURO IV' },
              ].map((s, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-4 hover:border-[#CC0000]/50 transition-all">
                  <div className="text-2xl mb-2">{s.icon}</div>
                  <div className="text-white/50 text-xs mb-0.5">{s.label}</div>
                  <div className="text-white font-black">{s.valeur}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* GALERIE */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <span className="text-[#CC0000] font-bold text-sm uppercase tracking-widest">Galerie</span>
            <div className="flex items-center justify-center gap-3 mt-3">
              <div className="h-px w-12 bg-[#C9A84C]"></div>
              <h2 className="text-3xl font-black text-[#1B2B6B]">Photos du NNR 85H</h2>
              <div className="h-px w-12 bg-[#C9A84C]"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {images.map((src, i) => (
              <div key={i} className="aspect-video rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all bg-gradient-to-br from-[#1B2B6B] to-[#CC0000]">
                <img src={src} alt={`NNR 85H — Photo ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"/>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FICHE TECHNIQUE */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-[#CC0000] font-bold text-sm uppercase tracking-widest">Données officielles SDAMA</span>
            <div className="flex items-center justify-center gap-3 mt-3">
              <div className="h-px w-12 bg-[#C9A84C]"></div>
              <h2 className="text-3xl font-black text-[#1B2B6B]">Fiche technique complète</h2>
              <div className="h-px w-12 bg-[#C9A84C]"></div>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {specs.map((cat, i) => (
              <div key={i} className="bg-white rounded-3xl border-2 border-gray-100 hover:border-[#CC0000]/20 hover:shadow-lg transition-all overflow-hidden">
                <div className="bg-gray-50 border-b-2 border-gray-100 px-6 py-4 flex items-center gap-3">
                  <span className="text-2xl">{cat.icon}</span>
                  <h3 className="font-black text-[#1B2B6B] text-sm uppercase tracking-wide">{cat.categorie}</h3>
                </div>
                <div className="p-4">
                  {cat.items.map((item, j) => (
                    <div key={j} className={`flex items-start justify-between gap-4 py-2.5 ${j < cat.items.length - 1 ? 'border-b border-gray-100' : ''}`}>
                      <span className="text-gray-500 text-xs font-medium flex-shrink-0">{item.label}</span>
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
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-[#CC0000] font-bold text-sm uppercase tracking-widest">Cotes officielles</span>
            <div className="flex items-center justify-center gap-3 mt-3">
              <div className="h-px w-12 bg-[#C9A84C]"></div>
              <h2 className="text-3xl font-black text-[#1B2B6B]">Dimensions (mm)</h2>
              <div className="h-px w-12 bg-[#C9A84C]"></div>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {dimensions.map((d, i) => (
              <div key={i} className="bg-white rounded-2xl border-2 border-gray-100 hover:border-[#CC0000]/30 p-5 text-center transition-all">
                <div className="text-xl font-black text-[#CC0000] mb-1">{d.code}</div>
                <div className="text-2xl font-black text-[#1B2B6B] mb-1">{d.valeur}</div>
                <div className="text-xs text-gray-400">{d.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ÉQUIPEMENTS */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-[#CC0000] font-bold text-sm uppercase tracking-widest">Inclus de série</span>
            <div className="flex items-center justify-center gap-3 mt-3">
              <div className="h-px w-12 bg-[#C9A84C]"></div>
              <h2 className="text-3xl font-black text-[#1B2B6B]">Équipements</h2>
              <div className="h-px w-12 bg-[#C9A84C]"></div>
            </div>
          </div>
          <div className="bg-white rounded-3xl border-2 border-gray-100 p-8">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {equipements.map((eq, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl hover:bg-red-50 transition-colors">
                  <div className="w-6 h-6 bg-[#CC0000] rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/>
                    </svg>
                  </div>
                  <span className="text-gray-700 text-sm font-medium">{eq}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* NAVIGATION */}
      <section className="py-12 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">Autres modèles N-Series</p>
          <div className="flex flex-wrap gap-3 justify-center">
            {modeles_nseries.map((m) => (
              <Link key={m.nom} href={m.href} className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${m.actif ? 'bg-[#CC0000] text-white shadow-md' : 'bg-white border-2 border-gray-200 text-gray-600 hover:border-[#CC0000] hover:text-[#CC0000]'}`}>
                {m.nom}
              </Link>
            ))}
          </div>
        </div>
      </section>
      <BrochureForm modele="nnr-85h" marque="isuzu" nomModele="NNR 85H" />
      {/* CTA */}
      <section className="py-16 bg-[#1B2B6B] relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#CC0000] via-[#C9A84C] to-[#1B2B6B]"></div>
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-black text-white mb-2">Intéressé par le <span className="text-[#CC0000]">NNR 85H</span> ?</h2>
          <div className="w-16 h-0.5 bg-[#C9A84C] mx-auto my-4"></div>
          <p className="text-white/60 mb-8">Contactez l&apos;une de nos 3 agences — Ouarzazate · Agadir · Tinghir</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="tel:0524885025" className="inline-flex items-center gap-2 bg-[#CC0000] hover:bg-[#aa0000] text-white font-bold px-8 py-4 rounded-full transition-all shadow-lg">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
              </svg>
              0524 885 025
            </a>
            <Link href="/contact" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-8 py-4 rounded-full border border-white/30 transition-all">Nous contacter</Link>
            <Link href="/catalogue" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-8 py-4 rounded-full border border-white/30 transition-all">Voir toute la gamme</Link>
          </div>
        </div>
      </section>

    </main>
  )
}