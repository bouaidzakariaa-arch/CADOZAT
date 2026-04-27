import Link from 'next/link'

const clients = [
  { nom: 'Coca-Cola',                secteur: 'Boissons & Distribution',  logo: '/images/clients/coca-cola.png',    site: 'https://www.coca-cola.com/ma/fr' },
  { nom: 'Oulmes',                   secteur: 'Distribution',             logo: null,                               site: 'https://www.oulmes.ma/' },
  { nom: 'Rafi3',                    secteur: 'Boissons',                 logo: '/images/clients/Rafii.jpg',        site: 'https://www.facebook.com/Rafii.Officiel/posts/-le-lait-rafii-cest-le-r%C3%A9flexe-de-toute-la-famille-entier-ou-demi-%C3%A9cr%C3%A9m%C3%A9-en-form/785699623956945/' },
  { nom: 'HDS',                      secteur: 'Services industriels',     logo: '/images/clients/HDS.png',          site: null },
  { nom: 'COPAG',                    secteur: 'Coopérative agricole',     logo: '/images/clients/Copag.png',        site: 'https://www.copag.ma' },
  { nom: 'Soussia des Gaz',          secteur: 'Énergie & Gaz',           logo: '/images/clients/soussiya-gaz.png', site: 'https://soussgaz.com/' },
  { nom: 'Al Ain (Dester)',          secteur: 'Eau minérale',             logo: null,                               site: null },
  { nom: 'M2E — Marocaine des Eaux', secteur: 'Eau minérale',             logo: '/images/clients/m2ea.png',         site: null },
  { nom: 'Aqwa Life',                secteur: 'Eau minérale',             logo: '/images/clients/acwa-life.jpg',    site: 'https://aqwalife.org/' },
]

const secteurCouleur: Record<string, string> = {
  'Boissons & Distribution': '#CC0000',
  'Boissons':                '#CC0000',
  'Distribution':            '#1B2B6B',
  'Services industriels':    '#374151',
  'Coopérative agricole':    '#16a34a',
  'Énergie & Gaz':           '#d97706',
  'Eau minérale':            '#0284c7',
}

export default function ReferencesPage() {
  return (
    <main className="bg-white">

      {/* HERO */}
      <section className="pt-32 pb-16 relative overflow-hidden border-b border-gray-100">

        {/* Animation background */}
        <style>{`
          @keyframes gradientShift {
            0%   { background-position: 0% 50%; }
            50%  { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .ref-hero-bg {
            position: absolute;
            inset: 0;
            background: linear-gradient(-45deg, #ffffff, #fdf5f5, #fff8f0, #ffffff, #f5f8ff, #ffffff);
            background-size: 400% 400%;
            animation: gradientShift 10s ease infinite;
          }
        `}</style>
        <div className="ref-hero-bg"/>

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-8">
            <Link href="/" className="hover:text-[#CC0000] transition-colors">Accueil</Link>
            <span>/</span>
            <span className="text-[#CC0000] font-semibold">Références</span>
          </div>

          <div className="max-w-2xl">
            <p className="text-[#CC0000] font-bold text-xs uppercase tracking-widest mb-4">Nos clients</p>
            <h1 className="text-5xl lg:text-6xl font-black text-gray-900 leading-none mb-4">
              Ils nous font<br/><span className="text-[#CC0000]">confiance</span>
            </h1>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-1 bg-[#CC0000] rounded-full"/>
              <div className="w-5 h-1 bg-[#C9A84C] rounded-full"/>
            </div>
            <p className="text-gray-500 text-base leading-relaxed">
              CADOZAT accompagne les plus grands comptes du Sud Marocain — industrie, BTP,
              agroalimentaire et distribution — avec des flottes Isuzu & Karry.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-12 max-w-lg">
            {[
              { nb: '9+',  label: 'Clients majeurs' },
              { nb: '3',   label: 'Agences Maroc' },
              { nb: '15+', label: "Ans d'expérience" },
            ].map((s, i) => (
              <div key={i} className="bg-white/80 border border-gray-100 rounded-2xl p-4 text-center shadow-sm">
                <div className="text-2xl font-black text-[#CC0000]">{s.nb}</div>
                <div className="text-xs text-gray-500 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TABLEAU CLIENTS */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">

          <div className="mb-10">
            <p className="text-[#CC0000] font-bold text-xs uppercase tracking-widest mb-3">Références</p>
            <div className="flex items-center gap-3">
              <div className="h-px w-10 bg-[#C9A84C]"/>
              <h2 className="text-3xl font-black text-gray-900">Nos partenaires</h2>
              <div className="h-px w-10 bg-[#C9A84C]"/>
            </div>
          </div>

          {/* Tableau */}
          <div className="border border-gray-100 rounded-2xl overflow-hidden shadow-sm">

            {/* Header */}
            <div className="grid grid-cols-12 bg-gray-50 border-b border-gray-100 px-6 py-3">
              <div className="col-span-1 text-xs font-black text-gray-400 uppercase tracking-wider">#</div>
              <div className="col-span-3 text-xs font-black text-gray-400 uppercase tracking-wider">Logo</div>
              <div className="col-span-4 text-xs font-black text-gray-400 uppercase tracking-wider">Entreprise</div>
              <div className="col-span-3 text-xs font-black text-gray-400 uppercase tracking-wider">Secteur</div>
              <div className="col-span-1"/>
            </div>

            {/* Lignes */}
            {clients.map((c, i) => {
              const couleur = secteurCouleur[c.secteur] || '#374151'
              const isLink = !!c.site

              const rowContent = (
                <>
                  {/* Numéro */}
                  <div className="col-span-1">
                    <span className="text-xs font-black text-gray-300">{String(i + 1).padStart(2, '0')}</span>
                  </div>

                  {/* Logo */}
                  <div className="col-span-3">
                    <div className="w-24 h-12 flex items-center">
                      {c.logo ? (
                        <img
                          src={c.logo}
                          alt={c.nom}
                          className="max-h-10 max-w-full object-contain"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-xs font-black"
                          style={{ background: couleur }}>
                          {c.nom.slice(0, 2).toUpperCase()}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Nom */}
                  <div className="col-span-4">
                    <p className="font-black text-gray-900 text-sm">{c.nom}</p>
                  </div>

                  {/* Secteur */}
                  <div className="col-span-3">
                    <span className="inline-flex items-center text-xs font-bold px-2.5 py-1 rounded-full"
                      style={{ background: couleur + '14', color: couleur }}>
                      {c.secteur}
                    </span>
                  </div>

                  {/* Lien */}
                  <div className="col-span-1 flex justify-end">
                    {isLink && (
                      <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center">
                        <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                        </svg>
                      </div>
                    )}
                  </div>
                </>
              )

              return isLink ? (
                <a
                  key={i}
                  href={c.site!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`grid grid-cols-12 items-center px-6 py-4 hover:bg-gray-50 transition-all duration-200 ${i < clients.length - 1 ? 'border-b border-gray-50' : ''}`}
                >
                  {rowContent}
                </a>
              ) : (
                <div
                  key={i}
                  className={`grid grid-cols-12 items-center px-6 py-4 ${i < clients.length - 1 ? 'border-b border-gray-50' : ''}`}
                >
                  {rowContent}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gray-50 border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-[#CC0000] font-bold text-xs uppercase tracking-widest mb-3">Rejoignez nos références</p>
          <h2 className="text-3xl font-black text-gray-900 mb-2">
            Besoin de véhicules pour<br/>votre entreprise ?
          </h2>
          <div className="w-12 h-0.5 bg-[#C9A84C] mx-auto my-4"/>
          <p className="text-gray-400 text-sm mb-8 leading-relaxed">
            Contactez notre équipe pour un devis personnalisé.<br/>
            Nous accompagnons les professionnels depuis plus de 15 ans.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/devis"
              className="inline-flex items-center gap-2 bg-[#CC0000] hover:bg-[#aa0000] text-white font-bold px-8 py-4 rounded-full transition-all shadow-lg text-sm">
              Demande de devis
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </Link>
            <a href="tel:0524885025"
              className="inline-flex items-center gap-2 border border-gray-200 hover:border-[#CC0000] hover:text-[#CC0000] text-gray-600 font-bold px-8 py-4 rounded-full transition-all text-sm">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
              </svg>
              0524 885 025
            </a>
            <Link href="/contact"
              className="inline-flex items-center gap-2 border border-gray-200 hover:border-[#CC0000] hover:text-[#CC0000] text-gray-600 font-bold px-8 py-4 rounded-full transition-all text-sm">
              Nous contacter
            </Link>
          </div>
        </div>
      </section>

    </main>
  )
}