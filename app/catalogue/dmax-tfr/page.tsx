'use client'

import Link from 'next/link'
import BrochureForm from '@/app/components/BrochureForm'

const variantes = [
  {
    nom: 'Pick-up SC 4×2 EURO 6',
    badge: 'Simple Cabine',
    badgeColor: 'bg-red-600',
    description: 'Pick-up simple cabine 4×2 — La solution idéale pour les professionnels exigeant robustesse et polyvalence. Motorisation diesel puissante et économique.',
    points: ['2 portes · 2 sièges', 'Transmission 4×2', 'Moteur 1 898 cc Diesel', '164 cv @ 3 800 tr/min'],
    accent: '#CC0000',
  },
]

const specs = [
  {
    categorie: 'Motorisation',
    icon: '⚙️',
    items: [
      { label: 'Boîte de vitesses', valeur: 'Manuelle' },
      { label: 'Carburant', valeur: 'Diesel' },
      { label: 'Transmission', valeur: '4×2' },
      { label: 'Cylindrée', valeur: '1 898 cc' },
      { label: 'Puissance', valeur: '164 cv @ 3 800 tr/min' },
      { label: 'Couple', valeur: '360 Nm @ 2 000-2 500 tr/min' },
      { label: 'Consommation', valeur: '8,1 L/100 km' },
    ],
  },
  {
    categorie: 'Dimensions & Cabine',
    icon: '📐',
    items: [
      { label: 'Dimensions (L×l×H)', valeur: '5 310 × 1 760 × 1 770 mm' },
      { label: 'Nombre de portes', valeur: '2 portes' },
      { label: 'Nombre de sièges', valeur: '2 sièges' },
    ],
  },
  {
    categorie: 'Sécurité active',
    icon: '🛡️',
    items: [
      { label: 'Freinage', valeur: 'ABS de série' },
      { label: 'Aide à la descente', valeur: 'HDC' },
      { label: 'Aide à la montée', valeur: 'HSA' },
      { label: 'Contrôle traction', valeur: 'TCS' },
      { label: 'Freinage autonome', valeur: 'AEB' },
      { label: 'Signal urgence', valeur: 'ESS' },
      { label: 'Limiteur vitesse', valeur: 'ISL / MSL' },
      { label: 'Frein multi-collision', valeur: 'Oui' },
      { label: 'Appel urgence', valeur: 'Oui' },
    ],
  },
  {
    categorie: 'Suspensions & Freins',
    icon: '🔩',
    items: [
      { label: 'Suspensions avant', valeur: 'Indépendantes' },
      { label: 'Suspensions arrière', valeur: 'Ressort à lame' },
      { label: 'Freins avant', valeur: 'Disque ventilé' },
      { label: 'Freins arrière', valeur: 'Tambour' },
    ],
  },
  {
    categorie: 'Aide à la conduite',
    icon: '🚗',
    items: [
      { label: 'Direction', valeur: 'Assistance variable électrique' },
      { label: 'Volant', valeur: 'Réglable hauteur & profondeur' },
      { label: 'Reconnaissance panneaux', valeur: 'Oui' },
      { label: 'Surveillance vigilance', valeur: 'Oui' },
      { label: 'Avertisseur sortie voie', valeur: 'Oui' },
      { label: 'Prévention sortie voie', valeur: 'Oui' },
      { label: 'Indicateur changement voie', valeur: 'Oui' },
    ],
  },
  {
    categorie: 'Confort & Équipements',
    icon: '✨',
    items: [
      { label: 'Climatisation', valeur: 'Oui' },
      { label: 'Airbags', valeur: '7 airbags' },
      { label: 'Autoradio', valeur: 'Kit main libre Bluetooth' },
      { label: 'Régulateur/limiteur', valeur: 'Commandes au volant' },
      { label: 'Siège conducteur', valeur: '6 positions + réglage lombaire' },
      { label: 'Rétroviseurs', valeur: 'Électriques' },
      { label: 'Fermeture portes', valeur: 'Télécommande' },
      { label: 'Économie batterie', valeur: 'Fonction dédiée' },
      { label: 'Follow me home', valeur: 'Oui' },
      { label: 'Essuie-glace', valeur: 'Capteur de pluie' },
      { label: 'Feux antibrouillard', valeur: 'Arrière' },
      { label: 'Allumage phares', valeur: 'Automatique' },
      { label: 'Poignée montée avant', valeur: 'Oui' },
    ],
  },
]

const equipements = [
  '7 airbags de série',
  'Freinage AEB autonome',
  'Contrôle de traction TCS',
  'Aide montée HSA & descente HDC',
  'Direction assistance électrique',
  'Climatisation',
  'Kit main libre Bluetooth',
  'Régulateur/limiteur de vitesse',
  'Reconnaissance panneaux',
  'Surveillance vigilance conducteur',
  'Essuie-glace capteur de pluie',
  'Fermeture télécommande',
]

const quickSpecs = [
  { icon: '⚡', label: 'Puissance', valeur: '164 cv' },
  { icon: '🔄', label: 'Couple', valeur: '360 Nm' },
  { icon: '⛽', label: 'Consommation', valeur: '8,1 L/100km' },
  { icon: '📏', label: 'Cylindrée', valeur: '1 898 cc' },
  { icon: '🛡️', label: 'Airbags', valeur: '7 airbags' },
  { icon: '🔧', label: 'Transmission', valeur: '4×2' },
]

export default function DMaxTFRPage() {
  return (
    <main className="bg-white font-sans">

      {/* ── HERO ── light, open, professional */}
      <section className="bg-white border-b border-gray-100 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-gray-400 text-sm mb-10">
            <Link href="/" className="hover:text-gray-700 transition-colors">Accueil</Link>
            <span className="text-gray-300">/</span>
            <Link href="/catalogue" className="hover:text-gray-700 transition-colors">Notre gamme</Link>
            <span className="text-gray-300">/</span>
            <span className="text-[#CC0000] font-semibold">D-MAX TFR</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left — Title & intro */}
            <div>
              <div className="flex items-center gap-2 mb-5">
                <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full tracking-wide">Isuzu</span>
                <span className="border border-gray-200 text-gray-500 text-xs font-medium px-3 py-1 rounded-full">Pick-up</span>
              </div>

              <h1 className="text-5xl lg:text-6xl font-black text-gray-900 leading-none mb-3 tracking-tight">
                D-MAX <span className="text-[#CC0000]">TFR</span>
              </h1>

              {/* Underline accent */}
              <div className="flex items-center gap-2 mb-7">
                <div className="w-10 h-[3px] bg-[#CC0000] rounded-full"></div>
                <div className="w-5 h-[3px] bg-[#C9A84C] rounded-full"></div>
              </div>

              <p className="text-gray-500 text-lg leading-relaxed mb-8 max-w-md">
                Robustesse légendaire, fiabilité prouvée et technologies de sécurité avancées.
                Disponible en 3 variantes adaptées à tous vos besoins professionnels.
              </p>

              <a
                href="tel:0524885025"
                className="inline-flex items-center gap-2 bg-[#CC0000] hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-full transition-colors text-sm shadow-sm"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                </svg>
                Nous contacter — 0524 885 025
              </a>
            </div>

            {/* Right — Quick specs grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {quickSpecs.map((s, i) => (
                <div key={i} className="bg-gray-50 border border-gray-100 rounded-2xl p-5 hover:border-red-200 hover:bg-red-50/30 transition-all">
                  <div className="text-xl mb-3">{s.icon}</div>
                  <div className="text-gray-400 text-xs mb-1">{s.label}</div>
                  <div className="text-gray-900 font-bold text-base">{s.valeur}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION LABEL helper ── */}
      {/* reusable pattern below */}

      {/* ── 3 VARIANTES ── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">

          <div className="mb-12">
            <p className="text-[#CC0000] text-xs font-bold uppercase tracking-widest mb-2">Versions disponibles</p>
            <div className="w-12 h-[3px] bg-[#C9A84C] mt-3 rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {variantes.map((v, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all flex flex-col">

                {/* Top bar */}
                <div className="h-1 w-full" style={{ background: v.accent }}></div>

                <div className="p-6 flex-1 flex flex-col">
                  <span className={`inline-block ${v.badgeColor} text-white text-xs font-bold px-3 py-1 rounded-full mb-4 self-start`}>
                    {v.badge}
                  </span>
                  <h3 className="text-gray-900 font-bold text-lg mb-3">{v.nom}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-5 flex-1">{v.description}</p>

                  <ul className="space-y-2 mb-6">
                    {v.points.map((pt, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm text-gray-600">
                        <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: v.accent }}></span>
                        {pt}
                      </li>
                    ))}
                  </ul>

                  <a
                    href="tel:0524885025"
                    className="flex items-center justify-center gap-2 border border-gray-200 text-gray-700 hover:bg-gray-50 text-sm font-semibold py-3 rounded-xl transition-colors"
                  >
                    <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                    </svg>
                    Nous contacter pour infos
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BROCHURE FORM ── */}
      <BrochureForm modele="dmax-tfr" marque="isuzu" nomModele="D-MAX TFR" />

      {/* ── CTA FINAL ── light version */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-6 text-center">

          <p className="text-[#CC0000] text-xs font-bold uppercase tracking-widest mb-3">Intéressé ?</p>
          <h2 className="text-3xl font-black text-gray-900 mb-2">
            Parlez-nous du <span className="text-[#CC0000]">D-MAX TFR</span>
          </h2>
          <div className="w-12 h-[3px] bg-[#C9A84C] mx-auto mt-3 mb-6 rounded-full"></div>
          <p className="text-gray-400 text-base mb-10">
            Contactez notre équipe dans l&apos;une de nos 3 agences pour
            plus d&apos;informations sur le D-MAX TFR.
          </p>

          <div className="flex flex-wrap gap-3 justify-center">
            <a
              href="tel:0524885025"
              className="inline-flex items-center gap-2 bg-[#CC0000] hover:bg-red-700 text-white font-semibold px-7 py-3.5 rounded-full transition-colors text-sm shadow-sm"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
              </svg>
              0524 885 025
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 border border-gray-200 text-gray-700 hover:bg-gray-50 font-semibold px-7 py-3.5 rounded-full transition-colors text-sm"
            >
              Nous contacter
            </Link>
            <Link
              href="/catalogue"
              className="inline-flex items-center gap-2 border border-gray-200 text-gray-700 hover:bg-gray-50 font-semibold px-7 py-3.5 rounded-full transition-colors text-sm"
            >
              Voir toute la gamme
            </Link>
          </div>
        </div>
      </section>

    </main>
  )
}