import Link from 'next/link'
import Image from 'next/image'

const categories = [
  {
    id: 'transport',
    titre: 'Transport de marchandises',
    icon: '📦',
    couleur: '#CC0000',
    desc: 'Solutions de transport et livraison pour collectivités et entreprises.',
    vehicules: [
      { nom: 'Camion Caisse', desc: 'Transport sécurisé de marchandises — caisse fermée isotherme ou sèche', img: '/images/marche-public/transport/camion-caisse.jpg' },
      { nom: 'Pick-up Caisse', desc: 'Véhicule léger polyvalent pour livraisons urbaines et rurales', img: '/images/marche-public/transport/pickup-caisse.jpg' },
    ],
  },
  {
    id: 'btp',
    titre: 'BTP & Travaux publics',
    icon: '🏗️',
    couleur: '#1B2B6B',
    desc: "Engins et camions pour chantiers, routes et travaux d'aménagement.",
    vehicules: [
      { nom: 'Camion Benne', desc: 'Transport de matériaux de construction — terre, gravats, sable', img: '/images/marche-public/btp/camion-benne.jpg' },
      { nom: 'Porte-Engin', desc: 'Transport de gros engins de chantier — tracteurs, tractopelles', img: '/images/marche-public/btp/porte-engin.jpg' },
      { nom: 'Tractopelle', desc: 'Engin polyvalent creusement et chargement sur chantier', img: '/images/marche-public/btp/tractopelle.jpg' },
    ],
  },
  {
    id: 'citerne',
    titre: 'Citerne & Liquides',
    icon: '💧',
    couleur: '#0057A8',
    desc: 'Transport et distribution de liquides — eau, lait, carburant.',
    vehicules: [
      { nom: 'Camion Citerne Eau', desc: "Distribution d'eau potable pour communes et chantiers", img: '/images/marche-public/citerne/citerne-eau.jpg' },
      { nom: 'Camion Citerne Lait', desc: 'Citerne inox alimentaire pour collecte et transport du lait', img: '/images/marche-public/citerne/citerne-lait.jpg' },
    ],
  },
  {
    id: 'environnement',
    titre: 'Collecte & Environnement',
    icon: '🌿',
    couleur: '#2D6A4F',
    desc: 'Véhicules de collecte des déchets et nettoiement urbain.',
    vehicules: [
      { nom: 'Camion Benne Tasseuse', desc: 'Collecte et compactage des ordures ménagères', img: '/images/marche-public/environnement/benne-tasseuse.jpg' },
      { nom: 'Camion Multi-Benne', desc: 'Collecte sélective et transport de bennes amovibles', img: '/images/marche-public/environnement/multi-benne.jpg' },
      { nom: 'Camion Nacelle', desc: "Travaux en hauteur — éclairage public, émondage, maintenance", img: '/images/marche-public/environnement/nacelle.jpg' },
    ],
  },
  {
    id: 'personnes',
    titre: 'Transport de personnes',
    icon: '🚌',
    couleur: '#d97706',
    desc: 'Minibus scolaires et transport du personnel pour collectivités.',
    vehicules: [
      { nom: 'Transport Scolaire', desc: 'Minibus jaune homologué — normes sécurité enfants respectées', img: '/images/marche-public/personnes/transport-scolaire.jpg' },
      { nom: 'Transport du Personnel', desc: 'Minibus blanc pour navettes entreprises et administrations', img: '/images/marche-public/personnes/transport-personnel.jpg' },
    ],
  },
  {
    id: 'speciaux',
    titre: 'Véhicules spéciaux',
    icon: '🚑',
    couleur: '#7c3aed',
    desc: "Véhicules d'urgence et d'intervention médicale.",
    vehicules: [
      { nom: 'Ambulance', desc: 'Véhicule médicalisé équipé — hôpitaux, communes, protection civile', img: '/images/marche-public/speciaux/ambulance.jpg' },
      { nom: 'Ambulance 4×4', desc: 'Ambulance tout-terrain pour zones rurales et montagneuses', img: '/images/marche-public/speciaux/ambulance-4x4.jpg' },
    ],
  },
]

const references = [
  'Communes de Ouarzazate et Agadir',
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
      <section className="pt-32 pb-16 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1B2B6B 50%, #CC0000 100%)' }}>
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M30 0l8.66 5v10L30 20l-8.66-5V5L30 0z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")", backgroundSize: '60px 60px' }}/>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-white" style={{ clipPath: 'ellipse(55% 100% at 50% 100%)' }}/>

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-2 text-sm mb-8" style={{ color: 'rgba(255,255,255,0.5)' }}>
            <Link href="/" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>Accueil</Link>
            <span>/</span>
            <span style={{ color: '#C9A84C', fontWeight: 700 }}>Marché public</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-white text-xs font-black uppercase tracking-widest mb-6"
                style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)' }}>
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
                <a href="tel:0524885025"
                  className="inline-flex items-center gap-2 font-bold text-white px-7 py-3.5 rounded-xl transition-all hover:brightness-110"
                  style={{ background: '#CC0000', boxShadow: '0 6px 24px rgba(204,0,0,0.4)' }}>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/></svg>
                  0524 885 025
                </a>
                <Link href="/devis"
                  className="inline-flex items-center gap-2 font-bold text-white px-7 py-3.5 rounded-xl transition-all"
                  style={{ border: '2px solid rgba(255,255,255,0.25)' }}>
                  Demande de devis
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { nb: '6',    label: 'Catégories\nde véhicules' },
                { nb: '15+',  label: 'Types de\ncarrosseries' },
                { nb: '1996', label: 'Année de\ncréation' },
                { nb: '100%', label: 'Véhicules\nhomologués' },
              ].map((s, i) => (
                <div key={i} className="text-center p-5 rounded-2xl"
                  style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)' }}>
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

        <div className="space-y-24">
          {categories.map((cat, ci) => (
            <div key={cat.id}>
              {/* Header catégorie */}
              <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                  style={{ background: cat.couleur + '15', border: `1px solid ${cat.couleur}30` }}>
                  {cat.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-black text-gray-900">{cat.titre}</h3>
                  <p className="text-sm text-gray-400 mt-0.5">{cat.desc}</p>
                </div>
                <div className="ml-auto hidden md:block">
                  <Link href="/devis"
                    className="inline-flex items-center gap-2 text-sm font-bold px-5 py-2.5 rounded-full transition-all"
                    style={{ color: cat.couleur, background: cat.couleur + '10', border: `1px solid ${cat.couleur}25` }}>
                    Demander un devis
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                  </Link>
                </div>
              </div>

              {/* Grille véhicules */}
              <div className={`grid gap-6 ${cat.vehicules.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-3'}`}>
                {cat.vehicules.map((v, vi) => (
                  <div key={vi} className="group rounded-2xl overflow-hidden border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                    style={{ borderColor: cat.couleur + '20' }}>
                    {/* Image */}
                    <div className="relative h-52 overflow-hidden" style={{ background: cat.couleur + '08' }}>
                      <Image
                        src={v.img}
                        alt={v.nom}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        style={{ objectFit: 'cover' }}
                        className="transition-transform duration-500 group-hover:scale-105"
                      />
                      {/* Overlay gradient */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ background: `linear-gradient(to top, ${cat.couleur}40, transparent)` }}/>
                    </div>

                    {/* Infos */}
                    <div className="p-5" style={{ background: cat.couleur + '04' }}>
                      <div className="flex items-start gap-3">
                        <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                          style={{ background: cat.couleur, color: '#fff' }}>
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/>
                          </svg>
                        </div>
                        <div>
                          <p className="font-black text-gray-900 text-sm">{v.nom}</p>
                          <p className="text-xs text-gray-400 mt-1 leading-relaxed">{v.desc}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Séparateur */}
              {ci < categories.length - 1 && (
                <div className="mt-16 h-px" style={{ background: `linear-gradient(to right, transparent, ${cat.couleur}30, transparent)` }}/>
              )}
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
