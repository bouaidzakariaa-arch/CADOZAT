'use client'

import Link from 'next/link'

const ZELLIGE = `data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23CC0000' fill-opacity='0.025'%3E%3Cpath d='M30 0l8.66 5v10L30 20l-8.66-5V5L30 0zm0 40l8.66 5v10L30 60l-8.66-5V45L30 40zM0 20l8.66 5v10L0 40l-8.66-5V25L0 20zm60 0l8.66 5v10L60 40l-8.66-5V25L60 20zM15 10l8.66 5v10L15 30l-8.66-5V15L15 10zm30 0l8.66 5v10L45 30l-8.66-5V15L45 10zm-30 30l8.66 5v10L15 60l-8.66-5V45L15 40zm30 0l8.66 5v10L45 60l-8.66-5V45L45 40z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E`

const IcWrench = () => (
  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/>
  </svg>
)
const IcShield = () => (
  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
  </svg>
)
const IcBox = () => (
  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
  </svg>
)
const IcGrad = () => (
  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 14l9-5-9-5-9 5 9 5z"/>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/>
  </svg>
)
const IcTruck = () => (
  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"/>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"/>
  </svg>
)
const IcClip = () => (
  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/>
  </svg>
)
const IcPhone = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 7V5z"/>
  </svg>
)
const IcCheck = () => (
  <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/>
  </svg>
)
const IcPin = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
  </svg>
)
const IcClock = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
  </svg>
)
const IcArrow = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
  </svg>
)

const ENGAGEMENTS = [
  {
    icon: <IcWrench/>, color: '#CC0000', bg: '#fff5f5',
    titre: 'Atelier fixe',
    desc: 'Atelier de réparation et d\'entretien de 300m² équipé de ponts élévateurs, station pneumatique et outillage aux normes constructeur.',
  },
  {
    icon: <IcShield/>, color: '#2D6A4F', bg: '#f0faf5',
    titre: 'Garantie constructeur',
    desc: 'Tous nos véhicules bénéficient de la garantie officielle Isuzu. Traitement prioritaire pour tout véhicule sous garantie.',
  },
  {
    icon: <IcBox/>, color: '#CC0000', bg: '#fff5f5',
    titre: 'Pièces d\'origine',
    desc: 'Stock permanent de pièces de rechange 100% d\'origine géré via le logiciel TOPAZE. Approvisionnement rapide si rupture.',
  },
  {
    icon: <IcGrad/>, color: '#2D6A4F', bg: '#f0faf5',
    titre: '8 techniciens qualifiés',
    desc: '3 ingénieurs, 3 techniciens électromécaniciens et 2 mécaniciens certifiés, formés en partenariat direct avec les constructeurs.',
  },
  {
    icon: <IcTruck/>, color: '#CC0000', bg: '#fff5f5',
    titre: 'Atelier mobile sur site',
    desc: 'Atelier mobile Dacia Dokker équipé d\'outillage complet et pièces de rechange. Intervention directement chez vous.',
  },
  {
    icon: <IcClip/>, color: '#2D6A4F', bg: '#f0faf5',
    titre: 'Diagnostic & logiciel TOPAZE',
    desc: 'Scanner de diagnostic homologué et logiciel TOPAZE pour la gestion de l\'entretien, du stock et du suivi de chaque véhicule.',
  },
]

function SectionLabel({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-center gap-3 mb-4">
      <div className="h-px w-8" style={{ background: '#CC0000' }}/>
      <span className="text-xs font-black tracking-[.25em] uppercase" style={{ color: '#CC0000' }}>{label}</span>
      <div className="h-px w-8" style={{ background: '#2D6A4F' }}/>
    </div>
  )
}

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-white pt-[108px]">

      {/* ════════════════════════════════════════
          1. HERO
          ════════════════════════════════════════ */}
      <section className="relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg,#1a3d2b 0%,#0f2419 45%,#1a1a2e 100%)', backgroundImage: `url("${ZELLIGE}")`, backgroundSize: '60px 60px' }}>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg,rgba(26,61,43,.97) 0%,rgba(15,36,25,.97) 50%,rgba(26,26,46,.96) 100%)' }}/>
        <div className="absolute left-0 top-0 bottom-0 w-1" style={{ background: 'linear-gradient(180deg,#CC0000,#2D6A4F)' }}/>

        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <div className="flex flex-col lg:flex-row items-center gap-14">
            <div className="flex-1 text-white">
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px w-8" style={{ background: '#CC0000' }}/>
                <span className="text-xs font-black tracking-[.25em] uppercase" style={{ color: '#e8c84a' }}>Service après-vente</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-black leading-tight mb-5">
                Votre véhicule mérite<br/>
                <span style={{ color: '#CC0000' }}>le meilleur entretien</span>
              </h1>
              <p className="text-base font-medium mb-8 max-w-lg leading-relaxed" style={{ color: 'rgba(255,255,255,.72)' }}>
                3 ingénieurs, 3 techniciens électromécaniciens et 2 mécaniciens certifiés.
                Atelier fixe + atelier mobile. Pièces d'origine. 6 jours sur 7.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="tel:0524885025"
                  className="flex items-center gap-2 px-6 py-3 font-extrabold text-white rounded-xl transition-all hover:scale-105 active:scale-95"
                  style={{ background: 'linear-gradient(135deg,#CC0000,#990000)', boxShadow: '0 4px 20px rgba(204,0,0,.4)' }}>
                  <IcPhone/> Appeler le SAV
                </a>
                <Link href="/devis"
                  className="flex items-center gap-2 px-6 py-3 font-extrabold rounded-xl transition-all hover:scale-105"
                  style={{ color: 'white', border: '2px solid rgba(255,255,255,.25)' }}>
                  Demande de devis
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 flex-shrink-0">
              {[
                { val: '8',     label: 'Techniciens\nqualifiés',   accent: '#CC0000' },
                { val: '300m²', label: 'Atelier\néquipé',          accent: '#e8c84a' },
                { val: '100%',  label: 'Pièces\nd\'origine',       accent: '#CC0000' },
                { val: '6j/7',  label: 'Ouvert\ntoute la semaine', accent: '#e8c84a' },
              ].map((s, i) => (
                <div key={i} className="text-center px-6 py-5 rounded-2xl"
                  style={{ background: 'rgba(255,255,255,.07)', border: '1px solid rgba(255,255,255,.1)' }}>
                  <div className="text-3xl font-black mb-1" style={{ color: s.accent }}>{s.val}</div>
                  <div className="text-xs font-bold whitespace-pre-line" style={{ color: 'rgba(255,255,255,.55)' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="h-10 bg-white" style={{ clipPath: 'ellipse(55% 100% at 50% 100%)' }}/>
      </section>

      {/* ════════════════════════════════════════
          2. NOS ENGAGEMENTS
          ════════════════════════════════════════ */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <SectionLabel label="Nos engagements"/>
          <h2 className="text-3xl font-black text-gray-900">Un service complet, à la hauteur de vos exigences</h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto text-sm">
            Depuis 1996, CADOZAT met à votre service ses moyens humains et techniques pour garantir la longévité de votre véhicule.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ENGAGEMENTS.map((eng, i) => (
            <div key={i}
              className="group relative p-7 rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              style={{ background: eng.bg, borderColor: `${eng.color}22` }}>
              <div className="absolute top-0 left-6 right-6 h-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `linear-gradient(to right,${eng.color},transparent)` }}/>
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl flex-shrink-0" style={{ background: `${eng.color}15`, color: eng.color }}>
                  {eng.icon}
                </div>
                <div>
                  <h3 className="font-extrabold text-gray-900 mb-2">{eng.titre}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{eng.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════
          3. NOS ATELIERS
          ════════════════════════════════════════ */}
      <section className="relative py-20"
        style={{ background: '#f9f7f5', backgroundImage: `url("${ZELLIGE}")`, backgroundSize: '60px 60px' }}>
        <div className="absolute inset-0 bg-white/92 pointer-events-none"/>
        <div className="relative max-w-7xl mx-auto px-6">

          <div className="text-center mb-14">
            <SectionLabel label="Nos ateliers"/>
            <h2 className="text-3xl font-black text-gray-900">Nos ateliers à votre service</h2>
            <p className="text-gray-500 mt-3 text-sm max-w-lg mx-auto">
              Atelier fixe aux normes constructeur + atelier mobile pour les interventions sur site.
              Ouarzazate · Agadir · Tinghir.
            </p>
          </div>

          {/* Atelier fixe */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl" style={{ height: '420px' }}>
              <img src="/images/ateliers/atelier1.jpg" alt="Atelier CADOZAT — véhicule sur pont élévateur"
                className="w-full h-full object-cover"/>
              <div className="absolute bottom-5 left-5 px-4 py-2 rounded-xl text-white text-sm font-extrabold"
                style={{ background: 'linear-gradient(135deg,#CC0000,#990000)', boxShadow: '0 4px 16px rgba(204,0,0,.4)' }}>
                🔧 Atelier fixe — normes constructeur
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px w-8" style={{ background: '#CC0000' }}/>
                <span className="text-xs font-black tracking-[.25em] uppercase" style={{ color: '#CC0000' }}>Ouarzazate · Agadir · Tinghir</span>
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-4 leading-tight">Un espace professionnel dédié à votre véhicule</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-7">
                Notre atelier de 300m² dispose de ponts élévateurs, d'une station pneumatique, d'un scanner de diagnostic
                homologué et du logiciel TOPAZE pour le suivi complet de chaque véhicule. Nos 8 techniciens qualifiés
                interviennent sur toutes les marques de notre gamme.
              </p>

              <div className="space-y-3 mb-7">
                {[
                  { icon: <IcClock/>, label: 'Horaires', val: 'Lun – Sam : 8h à 18h' },
                  { icon: <IcPhone/>, label: 'Contact SAV', val: '0524 885 025' },
                  { icon: <IcPin/>, label: 'Villes', val: 'Ouarzazate · Agadir · Tinghir' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 p-3 rounded-xl"
                    style={{ background: 'white', border: '1px solid rgba(204,0,0,.1)' }}>
                    <div className="p-2 rounded-lg flex-shrink-0" style={{ background: '#fff5f5', color: '#CC0000' }}>{item.icon}</div>
                    <div>
                      <p className="text-xs font-black uppercase tracking-wider text-gray-400">{item.label}</p>
                      <p className="text-sm font-bold text-gray-800">{item.val}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-2">
                {['Entretien & révision', 'Réparation toutes pannes', 'Pièces d\'origine', 'Diagnostic TOPAZE', 'Station pneumatique', 'Garantie constructeur'].map(s => (
                  <div key={s} className="flex items-center gap-2 text-sm text-gray-600">
                    <span style={{ color: '#CC0000' }}><IcCheck/></span>
                    <span className="font-medium">{s}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Atelier Mobile */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="order-2 lg:order-1">
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px w-8" style={{ background: '#2D6A4F' }}/>
                <span className="text-xs font-black tracking-[.25em] uppercase" style={{ color: '#2D6A4F' }}>Atelier mobile</span>
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-4 leading-tight">
                Nous venons à vous — <span style={{ color: '#2D6A4F' }}>partout au Sud du Maroc</span>
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-7">
                Notre atelier mobile Dacia Dokker est équipé de tous les outils
                et pièces de rechange nécessaires. Il permet à nos techniciens d'intervenir efficacement
                directement sur site — chez vous, dans votre dépôt ou sur chantier.
              </p>

              <div className="space-y-3 mb-7">
                {[
                  { label: 'Véhicule', val: 'Dacia Dokker' },
                  { label: 'Équipement', val: 'Outillage complet + stock pièces de rechange' },
                  { label: 'Zone d\'intervention', val: 'Sud du Maroc — Ouarzazate, Agadir, Tinghir et environs' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 p-3 rounded-xl"
                    style={{ background: 'white', border: '1px solid rgba(45,106,79,.15)' }}>
                    <div>
                      <p className="text-xs font-black uppercase tracking-wider" style={{ color: '#2D6A4F' }}>{item.label}</p>
                      <p className="text-sm font-bold text-gray-800 mt-0.5">{item.val}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-2">
                {['Intervention sur site', 'Dépannage d\'urgence', 'Flottes & grands comptes', 'Marchés publics', 'Zones rurales', 'Sans déplacement client'].map(s => (
                  <div key={s} className="flex items-center gap-2 text-sm text-gray-600">
                    <span style={{ color: '#2D6A4F' }}><IcCheck/></span>
                    <span className="font-medium">{s}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="order-1 lg:order-2 relative rounded-3xl overflow-hidden shadow-2xl" style={{ height: '420px' }}>
              <img src="/images/ateliers/atelier5.jpg" alt="Atelier mobile CADOZAT — Dacia Dokker Isuzu Service"
                className="w-full h-full object-cover"/>
              <div className="absolute bottom-5 left-5 px-4 py-2 rounded-xl text-white text-sm font-extrabold"
                style={{ background: 'linear-gradient(135deg,#2D6A4F,#1a3d2b)', boxShadow: '0 4px 16px rgba(45,106,79,.4)' }}>
                🚐 Atelier mobile ISUZU SERVICE
              </div>
            </div>
          </div>

          {/* Galerie photos */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { src: '/images/ateliers/atelier2.jpg', alt: 'Technicien diagnostic électronique' },
              { src: '/images/ateliers/atelier3.jpg', alt: 'Équipe de techniciens en atelier' },
              { src: '/images/ateliers/atelier4.jpg', alt: 'Outillage professionnel certifié' },
            ].map((img, i) => (
              <div key={i} className="relative rounded-2xl overflow-hidden shadow-lg group" style={{ height: '200px' }}>
                <img src={img.src} alt={img.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"/>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4"
                  style={{ background: 'linear-gradient(to top,rgba(0,0,0,.6),transparent)' }}>
                  <p className="text-white text-xs font-bold">{img.alt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          4. CTA FINAL
          ════════════════════════════════════════ */}
      <section className="relative overflow-hidden m-6 mb-16 rounded-3xl py-20 text-center"
        style={{ background: 'linear-gradient(135deg,#1a3d2b 0%,#0f2419 50%,#CC0000 100%)' }}>
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `url("${ZELLIGE}")`, backgroundSize: '60px 60px' }}/>
        <div className="relative px-6">
          <h2 className="text-3xl font-black text-white mb-4">Votre véhicule a besoin d'entretien ?</h2>
          <p className="text-base mb-8 max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,.72)' }}>
            Atelier fixe ou mobile — nos 8 techniciens certifiés sont à votre service 6 jours sur 7.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="tel:0524885025"
              className="flex items-center gap-2 px-8 py-3.5 rounded-xl font-extrabold text-white transition-all hover:scale-105"
              style={{ background: 'linear-gradient(135deg,#CC0000,#990000)', boxShadow: '0 4px 20px rgba(204,0,0,.5)' }}>
              <IcPhone/> 0524 885 025
            </a>
            <Link href="/devis"
              className="flex items-center gap-2 px-8 py-3.5 rounded-xl font-extrabold transition-all hover:scale-105"
              style={{ color: 'white', border: '2px solid rgba(255,255,255,.3)' }}>
              Demande de devis <IcArrow/>
            </Link>
          </div>
        </div>
      </section>

    </main>
  )
}