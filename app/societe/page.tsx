'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); obs.disconnect() }
    }, { threshold })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, inView }
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, inView } = useInView()
  return (
    <div ref={ref} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? 'translateY(0)' : 'translateY(28px)',
      transition: `all 700ms cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
    }}>
      {children}
    </div>
  )
}

const ACTIVITES = [
  { icon: '🚛', titre: 'Vente de véhicules', desc: 'Pick-up, camions porteurs, engins de BTP et véhicules utilitaires Isuzu & Karry' },
  { icon: '🔧', titre: 'Service après-vente', desc: 'Atelier fixe et atelier mobile pour interventions sur site dans toute la région' },
  { icon: '📋', titre: 'Marchés publics', desc: 'Réponse aux appels d\'offres et bons de commande pour collectivités et institutions' },
  { icon: '📦', titre: 'Pièces de rechange', desc: 'Distribution de pièces d\'origine et accessoires pour tous les modèles de la gamme' },
  { icon: '🚜', titre: 'Machines agricoles', desc: 'Vente et maintenance d\'équipements agricoles adaptés aux besoins du terrain' },
]

const AGENCES = [
  { ville: 'Ouarzazate', role: 'Siège social', desc: 'Agence principale — showroom, atelier, administration', icon: '🏢', color: '#CC0000' },
  { ville: 'Agadir', role: 'Agence régionale', desc: 'Couverture du Souss-Massa et des provinces du Sud', icon: '🌊', color: '#0057A8' },
  { ville: 'Tinghir', role: 'Agence régionale', desc: 'Présence au cœur du Drâa-Tafilalet', icon: '🏔️', color: '#2D6A4F' },
]

export default function SocietePage() {
  return (
    <main className="bg-white min-h-screen">

      {/* ══ HERO ══════════════════════════════════════ */}
      <section className="relative pt-32 pb-24 overflow-hidden bg-white">
        <div className="absolute top-0 left-0 right-0 h-1 flex">
          <div className="flex-1" style={{ background: '#CC0000' }} />
          <div className="flex-1" style={{ background: '#2D6A4F' }} />
        </div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-5 -translate-y-1/2 translate-x-1/3" style={{ background: '#CC0000' }} />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-5 translate-y-1/2 -translate-x-1/3" style={{ background: '#2D6A4F' }} />

        <div className="relative max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-2 text-gray-400 text-xs mb-10">
            <Link href="/" className="hover:text-gray-700 transition-colors">Accueil</Link>
            <span>/</span>
            <span className="text-gray-700">Société</span>
          </div>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-widest mb-6 border"
              style={{ color: '#CC0000', borderColor: '#CC000030', background: '#fff5f5' }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#CC0000' }} />
              Depuis 1996 — Ouarzazate, Maroc
            </div>

            <h1 className="font-black text-gray-900 leading-none tracking-tighter mb-6"
              style={{ fontSize: 'clamp(3rem, 7vw, 5rem)' }}>
              STE <span style={{ color: '#CC0000' }}>CADOZAT</span> SARL
            </h1>

            <div className="w-16 h-1 mb-8 rounded-full" style={{ background: 'linear-gradient(to right, #CC0000, #2D6A4F)' }} />

            <p className="text-gray-500 text-lg leading-relaxed max-w-2xl">
              Concessionnaire officiel de la marque<strong className="text-gray-800">Isuzu</strong> et <strong className="text-gray-800">Karry</strong>  dans la region de souss massa et draa tafilalt ,
              CADOZAT s'est imposé comme le partenaire de référence pour les véhicules utilitaires, camions et engins industriels
              au Sud du Maroc depuis plus de <strong className="text-gray-800">28 ans</strong>.
            </p>
          </div>

          <div className="flex flex-wrap gap-12 mt-16">
            {[
              { val: '28+', label: 'Années d\'expérience', color: '#CC0000' },
              { val: '3',   label: 'Agences ',    color: '#0057A8' },
              { val: '1996', label: 'Année de création',  color: '#2D6A4F' },
            ].map((s, i) => (
              <div key={i}>
                <div className="font-black text-5xl leading-none" style={{ color: s.color }}>{s.val}</div>
                <div className="text-gray-400 text-sm mt-2 uppercase tracking-widest font-bold">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PRÉSENTATION ══════════════════════════════ */}
      <section className="py-24" style={{ background: '#fafafa' }}>
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
              <div>
                <p className="text-xs font-black uppercase tracking-widest mb-4" style={{ color: '#CC0000' }}>Notre histoire</p>
                <h2 className="text-4xl font-black text-gray-900 mb-6">
                  Une entreprise<br />marocaine enracinée
                </h2>
                <div className="space-y-5 text-gray-500 leading-relaxed">
                  <p>
                    Fondée en <strong className="text-gray-800">1996</strong> à Ouarzazate, la société CADOZAT est un concessionnaire
                    agréé de véhicules industriels et utilitaires, représentant officiellement les marques
                    <strong className="text-gray-800"> Isuzu</strong> et <strong className="text-gray-800">Karry</strong> sur le marché marocain.
                  </p>
                  <p>
                    Grâce à une expertise accumulée sur plus de deux décennies, CADOZAT s'est imposée comme
                    le <strong className="text-gray-800">leader des véhicules utilitaires et industriels au Sud du Maroc</strong>,
                    avec des agences à Ouarzazate, Agadir et Tinghir.
                  </p>
                  <p>
                    L'entreprise accompagne une clientèle variée — professionnels, entreprises, collectivités
                    territoriales et institutions publiques — avec des solutions adaptées à chaque besoin.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-xs font-black uppercase tracking-widest mb-6" style={{ color: '#2D6A4F' }}>Domaines d'activité</p>
                {ACTIVITES.map((a, i) => (
                  <div key={i} className="flex items-start gap-4 py-4 border-b border-gray-100 last:border-0">
                    <span className="text-2xl flex-shrink-0">{a.icon}</span>
                    <div>
                      <div className="font-black text-gray-900 text-sm mb-0.5">{a.titre}</div>
                      <div className="text-gray-400 text-xs leading-relaxed">{a.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ NOS AGENCES ═══════════════════════════════ */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-16">
              <p className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: '#CC0000' }}>Présence nationale</p>
              <h2 className="text-4xl font-black text-gray-900">Nos agences</h2>
              <div className="w-12 h-1 mx-auto mt-5 rounded-full" style={{ background: 'linear-gradient(to right, #CC0000, #2D6A4F)' }} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {AGENCES.map((a, i) => (
                <div key={i} className="group">
                  <div className="h-1.5 rounded-t-xl" style={{ background: a.color }} />
                  <div className="border border-t-0 border-gray-100 rounded-b-3xl p-8 hover:shadow-lg transition-all duration-300">
                    <div className="text-4xl mb-5">{a.icon}</div>
                    <div className="font-black text-2xl text-gray-900 mb-1">{a.ville}</div>
                    <div className="text-xs font-black uppercase tracking-widest mb-4" style={{ color: a.color }}>{a.role}</div>
                    <p className="text-gray-400 text-sm leading-relaxed">{a.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ MOYENS TECHNIQUES ════════════════════════ */}
      <section className="py-24" style={{ background: '#fafafa' }}>
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div>
                <p className="text-xs font-black uppercase tracking-widest mb-4" style={{ color: '#0057A8' }}>Infrastructure</p>
                <h2 className="text-4xl font-black text-gray-900 mb-6">Moyens techniques</h2>
                <div className="space-y-4 text-gray-500 leading-relaxed">
                  <p>
                    CADOZAT dispose d'une infrastructure complète répartie sur ses trois agences :
                    espaces d'exposition, ateliers d'entretien et de réparation, magasins de pièces de rechange.
                  </p>
                  <p>
                    L'entreprise est équipée d'outils de diagnostic modernes, notamment le logiciel
                    <strong className="text-gray-800"> TOPAZE</strong> pour la gestion du stock et la comptabilité,
                    ainsi qu'un scanner embarqué pour le diagnostic électronique.
                  </p>
                  <p>
                    Un <strong className="text-gray-800">atelier mobile Dacia Dokker</strong> permet
                    d'intervenir directement sur site, garantissant un service rapide et efficace
                    même dans les zones éloignées.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  { icon: '🏢', titre: 'Espaces d\'exposition', desc: 'Showrooms dans chacune de nos 3 agences' },
                  { icon: '🔩', titre: 'Ateliers de réparation', desc: 'Équipés pour l\'entretien et la réparation de tous véhicules' },
                  { icon: '📦', titre: 'Magasins pièces de rechange', desc: 'Stock de pièces d\'origine pour intervention rapide' },
                  { icon: '🚐', titre: 'Atelier mobile', desc: 'Dacia Dokker équipé — intervention sur site partout  dans la region de souss massa et draa tafilalt ' },
                  { icon: '💻', titre: 'Logiciel TOPAZE', desc: 'Gestion stock, comptabilité et diagnostic électronique' },
                  { icon: '🔵', titre: 'Station pneumatique', desc: 'Équipement complet pour les véhicules lourds et utilitaires' },
                ].map((t, i) => (
                  <div key={i} className="flex items-start gap-4 py-3 border-b border-gray-100 last:border-0">
                    <span className="text-xl flex-shrink-0">{t.icon}</span>
                    <div>
                      <div className="font-black text-gray-900 text-sm">{t.titre}</div>
                      <div className="text-gray-400 text-xs mt-0.5">{t.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ CTA FINAL ═════════════════════════════════ */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <Reveal>
            <p className="text-xs font-black uppercase tracking-widest mb-4" style={{ color: '#CC0000' }}>Votre partenaire de confiance</p>
            <h2 className="text-4xl font-black text-gray-900 mb-4">Travaillons ensemble</h2>
            <div className="w-12 h-1 mx-auto mb-8 rounded-full" style={{ background: 'linear-gradient(to right, #CC0000, #2D6A4F)' }} />
            <p className="text-gray-400 mb-10 leading-relaxed">
              Nos équipes sont disponibles dans nos agences de Ouarzazate, Agadir et Tinghir pour répondre à toutes vos demandes.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/devis"
                className="inline-flex items-center gap-2 text-white font-bold px-8 py-4 rounded-xl transition-all text-sm hover:scale-105"
                style={{ background: '#CC0000', boxShadow: '0 4px 20px rgba(204,0,0,0.3)' }}>
                Demande de devis
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link href="/contact"
                className="inline-flex items-center gap-2 font-bold px-8 py-4 rounded-xl border-2 transition-all text-sm hover:scale-105"
                style={{ borderColor: '#CC0000', color: '#CC0000' }}>
                Nous contacter
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  )
}