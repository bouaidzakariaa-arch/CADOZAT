import Link from 'next/link'
import BrochureForm from '@/app/components/BrochureForm'

export const metadata = {
  title: 'NMR 85H 3.5T — Camion Isuzu Châssis Long',
  description: 'Camion Isuzu NMR 85H 3.5 tonnes châssis long. Moteur 124ch EURO IV. Grande capacité de chargement. CADOZAT Maroc.',
  alternates: { canonical: 'https://cadozat.com/catalogue/nmr-85h' },
}


const images = [
  '/images/camions/serie-n/nmr-85h/img1.jpg',
  '/images/camions/serie-n/nmr-85h/img2.jpg',
  '/images/camions/serie-n/nmr-85h/img3.jpg',
  '/images/camions/serie-n/nmr-85h/img4.jpg',
  '/images/camions/serie-n/nmr-85h/img5.jpg',
  '/images/camions/serie-n/nmr-85h/img6.jpg',
]

const specs = [
  { categorie: 'Dimensions & Poids', icon: '📐',
    items: [
      { label: 'Empattement', valeur: '3 345 mm' },
      { label: 'Longueur carossable', valeur: '4 457 mm' },
      { label: 'PTAC', valeur: '3 500 kg' },
      { label: 'Poids à vide — Avant', valeur: '1 420 kg' },
      { label: 'Poids à vide — Arrière', valeur: '680 kg' },
      { label: 'Poids à vide — Total', valeur: '2 120 kg' },
    ],
  },
  { categorie: 'Essieux & Pont', icon: '🔩',
    items: [
      { label: 'Cabine', valeur: 'Standard' },
      { label: 'Capacité essieu avant', valeur: '2 900 kg' },
      { label: 'Capacité essieu arrière', valeur: '5 000 kg' },
      { label: 'Rapport de pont', valeur: '4.556' },
    ],
  },
  { categorie: 'Moteur', icon: '⚙️',
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
  { categorie: 'Boîte de vitesse', icon: '🔄',
    items: [
      { label: 'Modèle', valeur: 'MYY5M' },
      { label: 'Type', valeur: 'Mécanique surmultipliée' },
      { label: 'Nombre de rapports', valeur: '5 AV + 1 AR' },
    ],
  },
  { categorie: 'Direction & Freinage', icon: '🛡️',
    items: [
      { label: 'Direction', valeur: 'Assistée — écrou bille recirculation' },
      { label: 'Freinage service', valeur: 'Frein hydraulique à tambour' },
      { label: 'Frein stationnement', valeur: 'À tambour sur arbre transmission' },
      { label: 'Frein auxiliaire', valeur: 'Frein sur échappement' },
      { label: 'ABS', valeur: 'Système antiblocage des freins' },
    ],
  },
  { categorie: 'Suspension & Pneus', icon: '🚛',
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
  { code: 'OAL', valeur: '6 020', label: 'Longueur totale' },
  { code: 'WB', valeur: '3 345', label: 'Empattement' },
  { code: 'FOH', valeur: '1 110', label: 'Porte-à-faux avant' },
  { code: 'ROH', valeur: '1 565', label: 'Porte-à-faux arrière' },
  { code: 'CE', valeur: '4 457', label: 'Longueur carossable' },
  { code: 'CA', valeur: '2 892', label: 'Longueur cabine' },
  { code: 'OW', valeur: '1 815', label: 'Largeur totale' },
  { code: 'OH', valeur: '2 190', label: 'Hauteur totale' },
]

const equipements = [
  'Radio AM/FM avec lecteur de CD',
  'Système à 2 haut-parleurs',
  'Siège en tissu',
  'Ceinture de sécurité 3 points',
  'Fermeture centralisée',
  'Cendrier conducteur',
  'Aération par air dynamique',
  'Chauffage et dégivreur',
  'Essuie-glace intermittent',
  'Console supérieure avec pare-soleil',
  'Boîte à gants avec couvercle',
  'Vitre électrique / Lunette arrière avec rétroviseur',
  'Antibrouillard avant / arrière',
]

const modeles_nseries = [
  { nom: 'NMR 77E', href: '/catalogue/nmr-77e', actif: false },
  { nom: 'NMR 85H', href: '/catalogue/nmr-85h', actif: true },
  { nom: 'NNR 85H', href: '/catalogue/nnr-85h', actif: false },
  { nom: 'NPR 75K', href: '/catalogue/npr-75k', actif: false },
  { nom: 'NPR 75L', href: '/catalogue/npr-75l', actif: false },
  { nom: 'NQR 90K', href: '/catalogue/nqr-90k', actif: false },
  { nom: 'NQR 90M', href: '/catalogue/nqr-90m', actif: false },
]

export default function NMR85HPage() {
  return (
    <main className="bg-white">

      {/* HERO */}
      <section className="bg-white pt-32 pb-16 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-8 flex-wrap">
            <Link href="/" className="hover:text-[#CC0000] transition-colors">Accueil</Link>
            <span>/</span>
            <Link href="/catalogue" className="hover:text-[#CC0000] transition-colors">Notre gamme</Link>
            <span>/</span>
            <span className="text-gray-500">N-Series</span>
            <span>/</span>
            <span className="text-[#CC0000] font-semibold">NMR 85H 3.5T</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-2 mb-5 flex-wrap">
                <span className="bg-[#CC0000] text-white text-xs font-bold px-3 py-1 rounded-full">Isuzu</span>
                <span className="bg-gray-100 text-gray-600 text-xs font-semibold px-3 py-1 rounded-full">N-Series</span>
                <span className="bg-[#1B2B6B] text-white text-xs font-bold px-3 py-1 rounded-full">3.5T</span>
                <span className="bg-gray-100 text-gray-600 text-xs font-semibold px-3 py-1 rounded-full">Châssis long</span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-black text-gray-900 mb-2 leading-none">
                NMR <span className="text-[#CC0000]">85H</span>
              </h1>
              <p className="text-gray-400 text-lg font-semibold mb-5">3.5T — Châssis long</p>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-1 bg-[#CC0000] rounded-full" />
                <div className="w-5 h-1 bg-[#C9A84C] rounded-full" />
              </div>
              <p className="text-gray-500 text-base leading-relaxed mb-8 max-w-lg">
                Le NMR 85H est un camion léger 3.5T sur châssis long, offrant une capacité de chargement supérieure. Idéal pour les livraisons régionales nécessitant un grand volume. Moteur Common Rail puissant et économique.
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
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: '⚡', label: 'Puissance', valeur: '124 ch / 91 kw' },
                { icon: '🔄', label: 'Couple maxi', valeur: '354 Nm' },
                { icon: '📦', label: 'PTAC', valeur: '3 500 kg' },
                { icon: '📏', label: 'Cylindrée', valeur: '2 999 cc' },
                { icon: '⛽', label: 'Réservoir', valeur: '100 litres' },
                { icon: '🌿', label: 'Émission', valeur: 'EURO IV' },
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

      {/* GALERIE */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <p className="text-[#CC0000] font-bold text-xs uppercase tracking-widest mb-3">Galerie</p>
            <div className="flex items-center justify-center gap-3">
              <div className="h-px w-10 bg-[#C9A84C]" />
              <h2 className="text-3xl font-black text-gray-900">Photos du NMR 85H</h2>
              <div className="h-px w-10 bg-[#C9A84C]" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {images.map((src, i) => (
              <div key={i} className="aspect-video rounded-2xl overflow-hidden border border-gray-100 bg-white shadow-sm hover:shadow-md transition-all">
                <img src={src} alt={`NMR 85H — Photo ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"/>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FICHE TECHNIQUE */}
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

      {/* DIMENSIONS */}
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

      {/* ÉQUIPEMENTS */}
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

      {/* NAVIGATION N-SERIES */}
      <section className="py-10 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-xs font-bold text-gray-400 uppercase tracking-widest mb-5">Autres modèles N-Series</p>
          <div className="flex flex-wrap gap-3 justify-center">
            {modeles_nseries.map((m) => (
              <Link key={m.nom} href={m.href}
                className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${m.actif ? 'bg-[#CC0000] text-white shadow-md' : 'bg-white border border-gray-200 text-gray-600 hover:border-[#CC0000] hover:text-[#CC0000]'}`}>
                {m.nom}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <BrochureForm modele="nmr-85h" marque="isuzu" nomModele="NMR 85H" />

      {/* CTA FINAL */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-black text-gray-900 mb-2">
            Intéressé par le <span className="text-[#CC0000]">NMR 85H</span> ?
          </h2>
          <div className="w-12 h-0.5 bg-[#C9A84C] mx-auto my-4" />
          <p className="text-gray-400 mb-8 text-sm">Contactez l&apos;une de nos 3 agences — Ouarzazate · Agadir · Tinghir</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="tel:0524885025"
              className="inline-flex items-center gap-2 bg-[#CC0000] hover:bg-[#aa0000] text-white font-bold px-8 py-4 rounded-full transition-all shadow-lg">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
              </svg>
              0524 885 025
            </a>
            <Link href="/contact" className="inline-flex items-center border border-gray-200 hover:border-[#CC0000] hover:text-[#CC0000] text-gray-600 font-bold px-8 py-4 rounded-full transition-all">
              Nous contacter
            </Link>
            <Link href="/catalogue" className="inline-flex items-center border border-gray-200 hover:border-[#CC0000] hover:text-[#CC0000] text-gray-600 font-bold px-8 py-4 rounded-full transition-all">
              Voir toute la gamme
            </Link>
          </div>
        </div>
      </section>

    </main>
  )
}