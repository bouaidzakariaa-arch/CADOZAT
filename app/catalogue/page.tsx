import Link from 'next/link'

const gammes = [
  {
    serie: 'D-MAX',
    soustitre: 'Isuzu D-MAX',
    couleur: 'from-[#CC0000] to-[#990000]',
    accentColor: '#CC0000',
    modeles: [
      {
        nom: 'D-MAX TFR',
        slug: 'dmax-tfr',
        variantes: [
          { nom: 'Pick-up SC 4×2 EURO 6', desc: 'Simple cabine — Transmission 4×2' },
        ],
      },
    ],
  },
  {
    serie: 'N-Series',
    soustitre: 'Isuzu N-Series',
    couleur: 'from-[#1B2B6B] to-[#0f1d4a]',
    accentColor: '#1B2B6B',
    modeles: [
      { nom: 'NMR 77E', slug: 'nmr-77e', variantes: [{ nom: '3.5T Châssis court', desc: 'Empattement court — Zones urbaines' }] },
      { nom: 'NMR 85H', slug: 'nmr-85h', variantes: [{ nom: '3.5T Châssis long', desc: 'Empattement long — Plus de capacité' }] },
      { nom: 'NNR 85H', slug: 'nnr-85h', variantes: [{ nom: '3.5T Châssis long', desc: 'Châssis long renforcé' }] },
      { nom: 'NPR 75K', slug: 'npr-75k', variantes: [{ nom: '7.5T Châssis court', desc: 'Moteur 4HK1 — EURO IV' }] },
      { nom: 'NPR 75L', slug: 'npr-75l', variantes: [{ nom: '7.5T Châssis long', desc: 'Moteur 4HK1 — EURO IV' }] },
      { nom: 'NQR 90K', slug: 'nqr-90k', variantes: [{ nom: '9.5T Châssis court', desc: 'Moteur 4HK1 — EURO 5' }] },
      { nom: 'NQR 90M', slug: 'nqr-90m', variantes: [{ nom: '9.5T Châssis long', desc: 'Moteur 4HK1 — EURO 5' }] },
    ],
  },
  {
    serie: 'F-Series',
    soustitre: 'Isuzu F-Series',
    couleur: 'from-[#1a1a1a] to-[#333333]',
    accentColor: '#333333',
    modeles: [
      { nom: 'FTR 34K', slug: 'ftr-34k', variantes: [{ nom: '16T Châssis court', desc: 'Poids lourd — Châssis court' }] },
      { nom: 'FTR 34M', slug: 'ftr-34m', variantes: [{ nom: '16T Châssis intermédiaire', desc: 'Poids lourd — Châssis intermédiaire' }] },
      { nom: 'FTR 34P', slug: 'ftr-34p', variantes: [{ nom: '16T Châssis long', desc: 'Poids lourd — Châssis long' }] },
      { nom: 'FVR 34K', slug: 'fvr-34k', variantes: [{ nom: '18T Châssis court', desc: 'Très poids lourd — Châssis court' }] },
      { nom: 'FVR 34P', slug: 'fvr-34p', variantes: [{ nom: '18T Châssis long', desc: 'Très poids lourd — Châssis long' }] },
    ],
  },
]

export default function CataloguePage() {
  return (
    <main className="bg-white">

      {/* HERO */}
      <section className="bg-[#1B2B6B] py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#CC0000] rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#C9A84C] rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>
          <div className="absolute inset-0 opacity-50" style={{backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', backgroundSize: '60px 60px'}}></div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#CC0000] via-[#C9A84C] to-[#1B2B6B]"></div>
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <span className="inline-flex items-center gap-2 bg-white/10 text-white text-xs font-semibold px-4 py-2 rounded-full mb-6 border border-white/20">
            <span className="w-2 h-2 bg-[#CC0000] rounded-full animate-pulse"></span>
            Concessionnaire officiel Isuzu — Ouarzazate · Agadir · Tinghir
          </span>
          <h1 className="text-5xl lg:text-6xl font-black text-white mb-2">
            Notre <span className="text-[#CC0000]">Gamme</span>
          </h1>
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-12 bg-[#C9A84C]"></div>
            <span className="text-[#C9A84C] text-sm font-semibold">14 modèles Isuzu disponibles</span>
            <div className="h-px w-12 bg-[#C9A84C]"></div>
          </div>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            De 3.5T à 18T — pick-up, camions légers, moyens et lourds.
            Toute la gamme Isuzu disponible à Ouarzazate, Agadir et Tinghir.
          </p>
        </div>
      </section>

      {/* GAMMES */}
      <div className="max-w-7xl mx-auto px-6 py-16 space-y-20">
        {gammes.map((gamme) => (
          <section key={gamme.serie} id={gamme.serie.toLowerCase().replace(' ', '-')}>
            {/* En-tête section */}
            <div className="flex items-center gap-4 mb-10">
              <div className="w-1 h-12 rounded-full" style={{background: gamme.accentColor}}></div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400">{gamme.soustitre}</p>
                <h2 className="text-3xl font-black" style={{color: gamme.accentColor}}>{gamme.serie}</h2>
              </div>
              <div className="flex-1 h-px bg-gray-100 ml-4"></div>
              <span className="text-xs text-gray-400 font-semibold">{gamme.modeles.length} modèle{gamme.modeles.length > 1 ? 's' : ''}</span>
            </div>

            {/* Grille modèles */}
            <div className={`grid gap-6 ${gamme.modeles.length <= 2 ? 'md:grid-cols-2' : gamme.modeles.length <= 4 ? 'md:grid-cols-2 lg:grid-cols-4' : 'md:grid-cols-3 lg:grid-cols-4'}`}>
              {gamme.modeles.map((modele) => (
                <Link
                  key={modele.slug}
                  href={`/catalogue/${modele.slug}`}
                  className="group bg-white border-2 border-gray-100 hover:shadow-xl rounded-2xl overflow-hidden transition-all duration-300"
                  style={{'--accent': gamme.accentColor} as React.CSSProperties}
                >
                  {/* Header coloré */}
                  <div className={`bg-gradient-to-br ${gamme.couleur} p-5 relative overflow-hidden`}>
                    <div className="absolute top-0 right-0 w-16 h-16 bg-white/5 rounded-full translate-x-4 -translate-y-4"></div>
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C9A84C]/50"></div>
                    <h3 className="text-white font-black text-lg">{modele.nom}</h3>
                    <p className="text-white/50 text-xs mt-0.5">{modele.variantes.length} variante{modele.variantes.length > 1 ? 's' : ''}</p>
                  </div>

                  {/* Variantes */}
                  <div className="p-4">
                    <div className="space-y-2 mb-4">
                      {modele.variantes.map((v, vi) => (
                        <div key={vi} className="flex items-start gap-2 p-2.5 rounded-lg bg-gray-50 group-hover:bg-opacity-80 transition-colors">
                          <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5" style={{background: gamme.accentColor}}></div>
                          <div>
                            <p className="text-sm font-bold text-gray-800">{v.nom}</p>
                            <p className="text-xs text-gray-400">{v.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <span className="text-xs font-bold transition-colors" style={{color: gamme.accentColor}}>
                        Voir la fiche technique
                      </span>
                      <div className="w-7 h-7 rounded-full flex items-center justify-center group-hover:opacity-80 transition-all" style={{background: gamme.accentColor}}>
                        <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* CTA */}
      <section className="bg-[#1B2B6B] py-16 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#CC0000] via-[#C9A84C] to-[#1B2B6B]"></div>
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-black text-white mb-2">
            Besoin d&apos;un <span className="text-[#CC0000]">conseil</span> ?
          </h2>
          <div className="w-16 h-0.5 bg-[#C9A84C] mx-auto my-4"></div>
          <p className="text-white/60 mb-8 max-w-xl mx-auto">
            Notre équipe vous aide à choisir le véhicule adapté à votre activité.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/devis" className="inline-flex items-center gap-2 bg-[#CC0000] hover:bg-[#aa0000] text-white font-bold px-10 py-4 rounded-full transition-all shadow-lg">
              Demande de devis
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </Link>
            <Link href="/contact" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-10 py-4 rounded-full border border-white/30 transition-all">
              Nous contacter
            </Link>
          </div>
        </div>
      </section>

    </main>
  )
}