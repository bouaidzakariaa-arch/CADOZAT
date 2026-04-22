import Link from 'next/link'

const specs = [
  {
    categorie: 'Motorisation',
    icon: '⚙️',
    items: [
      { label: 'Boîte de vitesses', valeur: 'Manuelle' },
      { label: 'Carburant', valeur: 'Diesel' },
      { label: 'Transmission', valeur: '4×4' },
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
      { label: 'Nombre de portes', valeur: '4 portes' },
      { label: 'Nombre de sièges', valeur: '5 sièges' },
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

export default function DMaxTFSPage() {
  return (
    <main className="bg-white">

      {/* HERO */}
      <section className="relative bg-[#1B2B6B] py-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#CC0000] opacity-10 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
          <div className="absolute inset-0 opacity-5" style={{backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', backgroundSize: '60px 60px'}}></div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#CC0000] via-[#C9A84C] to-[#1B2B6B]"></div>

        <div className="relative max-w-7xl mx-auto px-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-white/40 text-sm mb-8">
            <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
            <span>/</span>
            <Link href="/catalogue" className="hover:text-white transition-colors">Notre gamme</Link>
            <span>/</span>
            <span className="text-[#C9A84C] font-semibold">D-MAX TFS</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-[#CC0000] text-white text-xs font-bold px-3 py-1 rounded-full">Isuzu</span>
                <span className="bg-white/10 text-white text-xs font-semibold px-3 py-1 rounded-full border border-white/20">Pick-up 4×4</span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-black text-white mb-2">
                D-MAX <span className="text-[#CC0000]">TFS</span>
              </h1>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-1 bg-[#CC0000] rounded-full"></div>
                <div className="w-6 h-1 bg-[#C9A84C] rounded-full"></div>
              </div>
              <p className="text-white/70 text-lg leading-relaxed mb-8">
                Le D-MAX TFS en transmission intégrale 4×4 — pour les terrains
                les plus difficiles. Puissance, robustesse et technologies
                avancées pour les professionnels exigeants.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/devis" className="inline-flex items-center gap-2 bg-[#CC0000] hover:bg-[#aa0000] text-white font-bold px-6 py-3 rounded-full transition-all shadow-lg">
                  Demande de devis
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                  </svg>
                </Link>
                <a href="tel:0524885025" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-3 rounded-full border border-white/30 transition-all">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                  </svg>
                  0524 885 025
                </a>
              </div>
            </div>

            {/* Specs rapides */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: '⚡', label: 'Puissance', valeur: '164 cv' },
                { icon: '🔄', label: 'Couple', valeur: '360 Nm' },
                { icon: '⛽', label: 'Consommation', valeur: '8,1 L/100km' },
                { icon: '📏', label: 'Cylindrée', valeur: '1 898 cc' },
                { icon: '🛡️', label: 'Airbags', valeur: '7 airbags' },
                { icon: '🔧', label: 'Transmission', valeur: '4×4' },
              ].map((s, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-4 hover:border-[#CC0000]/50 transition-all">
                  <div className="text-2xl mb-2">{s.icon}</div>
                  <div className="text-white/50 text-xs mb-0.5">{s.label}</div>
                  <div className="text-white font-black text-lg">{s.valeur}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* VARIANTE */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-8">
            <span className="text-[#CC0000] font-bold text-sm uppercase tracking-widest">Version disponible</span>
            <div className="flex items-center justify-center gap-3 mt-3">
              <div className="h-px w-12 bg-[#C9A84C]"></div>
              <h2 className="text-3xl font-black text-[#1B2B6B]">Pick-up DC 4×4</h2>
              <div className="h-px w-12 bg-[#C9A84C]"></div>
            </div>
          </div>

          <div className="max-w-xl mx-auto">
            <div className="bg-white rounded-3xl overflow-hidden shadow-sm border-2 border-gray-100 hover:border-[#CC0000]/30 transition-all">
              <div className="bg-gradient-to-r from-[#990000] to-[#660000] p-6 relative overflow-hidden">
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C9A84C]"></div>
                <span className="bg-[#CC0000] text-white text-xs font-bold px-3 py-1 rounded-full mb-3 inline-block">Double Cabine 4×4</span>
                <h3 className="text-white font-black text-xl">Pick-up DC 4×4</h3>
              </div>
              <div className="p-6">
                <p className="text-gray-500 text-sm leading-relaxed mb-4">
                  La version double cabine 4×4 du D-MAX TFS — 5 places avec
                  transmission intégrale pour tous les terrains. Idéal pour le
                  Sud marocain et les zones difficiles d&apos;accès.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <Link href="/devis" className="flex items-center justify-center gap-2 bg-[#CC0000] hover:bg-[#aa0000] text-white text-sm font-bold py-3 rounded-full transition-all">
                    Demande de devis
                  </Link>
                  <a href="tel:0524885025" className="flex items-center justify-center gap-2 border-2 border-[#1B2B6B] text-[#1B2B6B] hover:bg-[#1B2B6B] hover:text-white text-sm font-bold py-3 rounded-full transition-all">
                    Appeler
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FICHE TECHNIQUE */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-[#CC0000] font-bold text-sm uppercase tracking-widest">Spécifications</span>
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
                    <div key={j} className={`flex items-center justify-between py-2.5 ${j < cat.items.length - 1 ? 'border-b border-gray-100' : ''}`}>
                      <span className="text-gray-500 text-xs font-medium">{item.label}</span>
                      <span className="text-[#1B2B6B] text-xs font-bold text-right ml-4 max-w-[55%]">{item.valeur}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ÉQUIPEMENTS */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-[#CC0000] font-bold text-sm uppercase tracking-widest">Inclus de série</span>
            <div className="flex items-center justify-center gap-3 mt-3">
              <div className="h-px w-12 bg-[#C9A84C]"></div>
              <h2 className="text-3xl font-black text-[#1B2B6B]">Équipements de série</h2>
              <div className="h-px w-12 bg-[#C9A84C]"></div>
            </div>
          </div>
          <div className="bg-white rounded-3xl border-2 border-gray-100 p-8">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {equipements.map((eq, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl hover:bg-red-50 transition-colors group">
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

      {/* CTA */}
      <section className="py-16 bg-[#1B2B6B] relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#CC0000] via-[#C9A84C] to-[#1B2B6B]"></div>
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-black text-white mb-2">
            Intéressé par le <span className="text-[#CC0000]">D-MAX TFS</span> ?
          </h2>
          <div className="w-16 h-0.5 bg-[#C9A84C] mx-auto my-4"></div>
          <p className="text-white/60 mb-8">
            Contactez notre équipe pour plus d&apos;informations ou faites
            une demande de devis personnalisée.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/devis" className="inline-flex items-center gap-2 bg-[#CC0000] hover:bg-[#aa0000] text-white font-bold px-8 py-4 rounded-full transition-all shadow-lg">
              Demande de devis
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </Link>
            <a href="tel:0524885025" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-8 py-4 rounded-full border border-white/30 transition-all">
              0524 885 025
            </a>
            <Link href="/catalogue" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-8 py-4 rounded-full border border-white/30 transition-all">
              Voir toute la gamme
            </Link>
          </div>
        </div>
      </section>

    </main>
  )
}