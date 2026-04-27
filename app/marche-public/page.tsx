import Link from 'next/link'

const categories = [
  {
    id: 'transport',
    titre: 'Transport de marchandises',
    icon: '📦',
    couleur: '#CC0000',
    desc: 'Solutions de transport et livraison pour collectivités et entreprises.',
    vehicules: [
      { nom: 'Camion Caisse', desc: 'Transport sécurisé de marchandises — caisse fermée isotherme ou sèche' },
      { nom: 'Pick-up Caisse', desc: 'Véhicule léger polyvalent pour livraisons urbaines et rurales' },
    ],
  },
  {
    id: 'btp',
    titre: 'BTP & Travaux publics',
    icon: '🏗️',
    couleur: '#1B2B6B',
    desc: 'Engins et camions pour chantiers, routes et travaux d\'aménagement.',
    vehicules: [
      { nom: 'Camion Benne', desc: 'Transport de matériaux de construction — terre, gravats, sable' },
      { nom: 'Porte-Engin', desc: 'Transport de gros engins de chantier — tracteurs, tractopelles' },
      { nom: 'Tractopelle', desc: 'Engin polyvalent creusement et chargement sur chantier' },
      { nom: 'Tracteur Agricole', desc: 'Travaux agricoles et aménagement de terrain' },
      { nom: 'Pont à Temps', desc: 'Véhicule de travaux et maintenance sur site' },
    ],
  },
  {
    id: 'citerne',
    titre: 'Citerne & Liquides',
    icon: '💧',
    couleur: '#0057A8',
    desc: 'Transport et distribution de liquides — eau, lait, carburant.',
    vehicules: [
      { nom: 'Camion Citerne Eau', desc: 'Distribution d\'eau potable pour communes et chantiers' },
      { nom: 'Camion Citerne Lait', desc: 'Citerne inox alimentaire pour collecte et transport du lait' },
      { nom: 'Camion Benne Citerne', desc: 'Véhicule mixte benne et citerne multi-usages' },
    ],
  },
  {
    id: 'environnement',
    titre: 'Collecte & Environnement',
    icon: '🌿',
    couleur: '#2D6A4F',
    desc: 'Véhicules de collecte des déchets et nettoiement urbain.',
    vehicules: [
      { nom: 'Camion Benne Tasseuse', desc: 'Collecte et compactage des ordures ménagères' },
      { nom: 'Camion Multi-Benne', desc: 'Collecte sélective et transport de bennes amovibles' },
      { nom: 'Camion Benne Satellite', desc: 'Collecte en zones difficiles d\'accès — ruelles et quartiers' },
      { nom: 'Camion Nacelle', desc: 'Travaux en hauteur — éclairage public, émondage, maintenance' },
    ],
  },
  {
    id: 'personnes',
    titre: 'Transport de personnes',
    icon: '🚌',
    couleur: '#d97706',
    desc: 'Minibus scolaires et transport du personnel pour collectivités.',
    vehicules: [
      { nom: 'Transport Scolaire', desc: 'Minibus jaune homologué — normes sécurité enfants respectées' },
      { nom: 'Transport du Personnel', desc: 'Minibus blanc pour navettes entreprises et administrations' },
    ],
  },
  {
    id: 'speciaux',
    titre: 'Véhicules spéciaux',
    icon: '🚑',
    couleur: '#7c3aed',
    desc: 'Véhicules d\'urgence et d\'intervention médicale.',
    vehicules: [
      { nom: 'Ambulance', desc: 'Véhicule médicalisé équipé — hôpitaux, communes, protection civile' },
      { nom: 'Ambulance 4×4', desc: 'Ambulance tout-terrain pour zones rurales et montagneuses' },
    ],
  },
]

const references = [
  'Communes de Ouarzazate, Agadir et Tinghir',
  'Provinces du Sud Marocain',
  'RADEEO — Régie autonome distribution eau',
  'Collectivités territoriales',
  'Entreprises BTP régionales',
  'Coopératives agricoles',
]

export default function MarchePublicPage() {
  return (
    <main className="bg-white">

      {/* HERO */}
      <section className="pt-32 pb-16 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1B2B6B 50%, #CC0000 100%)' }}>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M30 0l8.66 5v10L30 20l-8.66-5V5L30 0z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")", backgroundSize: '60px 60px' }}/>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-white" style={{ clipPath: 'ellipse(55% 100% at 50% 100%)' }}/>

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-2 text-sm mb-8" style={{ color: 'rgba(255,255,255,0.5)' }}>
            <Link href="/" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }} className="hover:text-white transition-colors">Accueil</Link>
            <span>/</span>
            <span style={{ color: '#C9A84C', fontWeight: 700 }}>Marché public</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-white text-xs font-black uppercase tracking-widest mb-6" style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)' }}>
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"/>
                Collectivités & Administrations
              </div>
              <h1 className="text-5xl lg:text-6xl font-black text-white leading-none mb-4">
                Marché<br/><span style={{ color: '#C9A84C' }}>Public</span>
              </h1>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-1 bg-red-500 rounded-full"/>
                <div className="w-5 h-1 rounded-full" style={{ background: '#C9A84C' }}/>
              </div>
              <p className="text-base leading-relaxed mb-8 max-w-lg" style={{ color: 'rgba(255,255,255,0.7)' }}>
                CADOZAT équipe les communes, collectivités et administrations du Sud Marocain depuis 1996.
                Camions spéciaux, bennes, citernes, ambulances et transport scolaire — 6 catégories de véhicules carrossés sur mesure.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="tel:0524885025" className="inline-flex items-center gap-2 font-bold text-white px-7 py-3.5 rounded-xl transition-all hover:brightness-110"
                  style={{ background: '#CC0000', boxShadow: '0 6px 24px rgba(204,0,0,0.4)' }}>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/></svg>
                  0524 885 025
                </a>
                <Link href="/devis" className="inline-flex items-center gap-2 font-bold text-white px-7 py-3.5 rounded-xl transition-all hover:bg-white/20"
                  style={{ border: '2px solid rgba(255,255,255,0.25)' }}>
                  Demande de devis
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                </Link>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { nb: '6', label: 'Catégories\nde véhicules' },
                { nb: '15+', label: 'Types de\ncarrosseries' },
                { nb: '1996', label: 'Année de\ncréation' },
                { nb: '100%', label: 'Véhicules\nhomologués' },
              ].map((s, i) => (
                <div key={i} className="text-center p-5 rounded-2xl" style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)' }}>
                  <div className="text-3xl font-black mb-1" style={{ color: '#C9A84C' }}>{s.nb}</div>
                  <div className="text-xs font-bold whitespace-pre-line" style={{ color: 'rgba(255,255,255,0.5)' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CATÉGORIES */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: '#CC0000' }}>Notre gamme</p>
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-10" style={{ background: '#C9A84C' }}/>
            <h2 className="text-3xl font-black text-gray-900">Véhicules carrossés sur mesure</h2>
            <div className="h-px w-10" style={{ background: '#C9A84C' }}/>
          </div>
          <p className="text-gray-400 text-sm max-w-xl mx-auto">
            Tous nos véhicules sont carrossés selon vos besoins spécifiques, homologués et conformes aux normes marocaines.
          </p>
        </div>

        <div className="space-y-16">
          {categories.map((cat, ci) => (
            <div key={cat.id} className={`grid lg:grid-cols-2 gap-12 items-start ${ci % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}>

              {/* Infos catégorie */}
              <div className={ci % 2 === 1 ? 'lg:col-start-2' : ''}>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                    style={{ background: cat.couleur + '15', border: `1px solid ${cat.couleur}30` }}>
                    {cat.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-gray-900">{cat.titre}</h3>
                    <p className="text-sm text-gray-400 mt-0.5">{cat.desc}</p>
                  </div>
                </div>

                {/* Liste véhicules */}
                <div className="space-y-3">
                  {cat.vehicules.map((v, vi) => (
                    <div key={vi} className="flex items-start gap-4 p-4 rounded-2xl border transition-all hover:shadow-md"
                      style={{ background: cat.couleur + '05', borderColor: cat.couleur + '20' }}>
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ background: cat.couleur, color: '#fff' }}>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/>
                        </svg>
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 text-sm">{v.nom}</p>
                        <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">{v.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <Link href="/devis"
                  className="inline-flex items-center gap-2 mt-6 text-sm font-bold px-5 py-2.5 rounded-full transition-all hover:gap-3"
                  style={{ color: cat.couleur, background: cat.couleur + '10', border: `1px solid ${cat.couleur}30` }}>
                  Demander un devis {cat.titre.toLowerCase()}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                  </svg>
                </Link>
              </div>

              {/* Visuel catégorie */}
              <div className={ci % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}>
                <div className="rounded-3xl p-8 h-72 flex items-center justify-center relative overflow-hidden"
                  style={{ background: `linear-gradient(135deg, ${cat.couleur}15, ${cat.couleur}05)`, border: `1px solid ${cat.couleur}20` }}>
                  {/* Pattern */}
                  <div className="absolute inset-0 opacity-5" style={{ backgroundImage: `radial-gradient(${cat.couleur} 1px, transparent 1px)`, backgroundSize: '20px 20px' }}/>
                  {/* Icône centrale grande */}
                  <div className="text-center relative z-10">
                    <div className="text-8xl mb-4">{cat.icon}</div>
                    <p className="font-black text-lg" style={{ color: cat.couleur }}>{cat.titre}</p>
                    <p className="text-xs text-gray-400 mt-1">{cat.vehicules.length} véhicule{cat.vehicules.length > 1 ? 's' : ''} disponible{cat.vehicules.length > 1 ? 's' : ''}</p>
                  </div>
                  {/* Cercles décoratifs */}
                  <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full opacity-20" style={{ background: cat.couleur }}/>
                  <div className="absolute -top-4 -left-4 w-20 h-20 rounded-full opacity-10" style={{ background: cat.couleur }}/>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* RÉFÉRENCES */}
      <section className="py-16 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <p className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: '#CC0000' }}>Ils nous font confiance</p>
            <h2 className="text-2xl font-black text-gray-900">Nos références marchés publics</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {references.map((ref, i) => (
              <div key={i} className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: '#CC000012' }}>
                  <svg className="w-4 h-4" fill="none" stroke="#CC0000" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                  </svg>
                </div>
                <span className="text-sm font-semibold text-gray-700">{ref}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-black text-gray-900 mb-2">
            Un projet de <span style={{ color: '#CC0000' }}>marché public</span> ?
          </h2>
          <div className="w-12 h-0.5 mx-auto my-4" style={{ background: '#C9A84C' }}/>
          <p className="text-gray-400 text-sm mb-8 leading-relaxed">
            Notre équipe commerciale vous accompagne dans la constitution de votre dossier<br/>
            et vous propose les véhicules adaptés à vos cahiers des charges.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="tel:0524885025"
              className="inline-flex items-center gap-2 font-bold text-white px-8 py-4 rounded-full transition-all shadow-lg hover:brightness-110"
              style={{ background: '#CC0000' }}>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/></svg>
              0524 885 025
            </a>
            <Link href="/devis"
              className="inline-flex items-center gap-2 font-bold text-gray-600 px-8 py-4 rounded-full transition-all border border-gray-200 hover:border-red-500 hover:text-red-600">
              Demande de devis
            </Link>
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