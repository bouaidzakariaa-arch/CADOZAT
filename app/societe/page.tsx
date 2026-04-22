'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

// ── Hook animation au scroll ──────────────────
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

// ── Compteur animé ────────────────────────────
function Counter({ target, suffix = '', duration = 2000 }: { target: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0)
  const { ref, inView } = useInView(0.3)
  useEffect(() => {
    if (!inView) return
    let start = 0
    const step = target / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= target) { setCount(target); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, 16)
    return () => clearInterval(timer)
  }, [inView, target, duration])
  return <span ref={ref}>{count.toLocaleString('fr-FR')}{suffix}</span>
}

// ── Données ───────────────────────────────────
const FICHE = [
  { label: 'Dénomination', value: 'SOCIÉTÉ CADOZAT SARL' },
  { label: 'Forme juridique', value: 'SARL' },
  { label: 'Siège social', value: 'N° 189 Bd Maghreb Al Arabi, Ouarzazate' },
  { label: 'Capital social', value: '1 300 000,00 DHS' },
  { label: 'Gérant', value: 'AMGUOUNE AHMED' },
  { label: 'Registre de commerce', value: '169/559' },
  { label: 'Identification fiscale', value: '06590278' },
  { label: 'N° CNSS', value: '225972' },
  { label: 'Article des patentes', value: '47102530 / 47102531' },
  { label: 'Email', value: 'CADOZAT99@hotmail.com' },
  { label: 'Téléphone', value: '0524 885 025 / 0661 247 860' },
]

const HUMAINS = [
  { poste: '3 Ingénieurs', icon: '🎓', desc: 'Ingénieurs qualifiés en mécanique et véhicules industriels' },
  { poste: '3 Techniciens électromécaniciens', icon: '⚙️', desc: 'Spécialistes en diagnostic et réparation électromécanique' },
  { poste: '3 Agents commerciaux', icon: '🤝', desc: 'Équipe commerciale dédiée à la satisfaction client' },
  { poste: '1 Secrétaire', icon: '🗂️', desc: 'Gestion administrative et relation clientèle' },
  { poste: '3 Chauffeurs permanents', icon: '🚛', desc: 'Livraison et transport de véhicules sur tout le territoire' },
  { poste: '2 Mécaniciens', icon: '🔧', desc: 'Maintenance et entretien atelier Ouarzazate' },
]

const TECHNIQUES = [
  { item: 'Local d\'exposition', detail: '300 m²', icon: '🏢' },
  { item: 'Atelier d\'entretien', detail: '300 m²', icon: '🔩' },
  { item: 'Administration', detail: '80 m²', icon: '💼' },
  { item: 'Magasin pièces de rechange', detail: '80 m²', icon: '📦' },
  { item: 'Atelier de réparation', detail: '260 m²', icon: '🛠️' },
  { item: 'Atelier mobile Dacia Dokker', detail: 'N° 74443-13', icon: '🚐' },
  { item: 'Station de pneumatique', detail: 'Équipée', icon: '🔵' },
  { item: 'Appareil de diagnostic', detail: 'Scanner embarqué', icon: '📡' },
  { item: 'Logiciel TOPAZE', detail: 'Gestion stock & comptable', icon: '💻' },
  { item: '4 Micro-ordinateurs + PC Portable', detail: 'Parc informatique', icon: '🖥️' },
]

const REFERENCES = [
  { lieu: 'MIDELT', annee: '2021', nature: 'Engin pelle sur chenille + camion NPR — Conseil Provincial', montant: '2 078 160' },
  { lieu: 'MIDELT', annee: '2021', nature: '2 camions benne 4×4 aménagés en chasse-neige — Conseil Provincial', montant: '2 380 080' },
  { lieu: 'GUELMIM', annee: '2022', nature: '2 camions citernes pour abreuvement du cheptel — Direction Provinciale de l\'Agriculture', montant: '1 192 608' },
  { lieu: 'GUELMIM', annee: '2022', nature: '2 camions citernes pour abreuvement du cheptel', montant: '1 242 300' },
  { lieu: 'ZAGORA', annee: '2009', nature: '3 camions citernes eau potable pour population rurale — Province de Zagora', montant: '7 726 668' },
  { lieu: 'TAGHBALTE', annee: '2017', nature: 'Camion benne pour collecte des déchets ménagers — Commune de Taghbalte', montant: '448 500' },
  { lieu: 'M\'SSICI', annee: '2010', nature: 'Camion benne équipé d\'une citerne', montant: '646 000' },
  { lieu: 'ES SIFA', annee: '2022', nature: 'Camion benne satellite avec bac à ordures 660L', montant: '531 360' },
]

const VENTES = [
  { nature: 'Camions +14T', v1: 356, v2: 385 },
  { nature: 'Pick-up SC & DC', v1: 570, v2: 640 },
  { nature: 'Camions -8T', v1: 289, v2: 335 },
  { nature: 'Voitures 4×4', v1: 98, v2: 205 },
  { nature: 'Voitures légères', v1: 108, v2: 240 },
  { nature: 'Camions +26T', v1: 55, v2: 62 },
  { nature: 'Marchés publics', v1: 58, v2: 125 },
]

// ─────────────────────────────────────────────
export default function SocietePage() {

  function Section({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
    const { ref, inView } = useInView()
    return (
      <div ref={ref} style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(32px)',
        transition: `all 800ms cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
      }}>
        {children}
      </div>
    )
  }

  return (
    <main className="bg-white min-h-screen">

      {/* ══ HERO ══════════════════════════════════════ */}
      <section className="relative overflow-hidden" style={{
        background: 'linear-gradient(135deg, #0f1c2e 0%, #1a2d1a 50%, #0f1c2e 100%)',
        minHeight: '70vh',
      }}>
        {/* Décors */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #CC0000, transparent)', transform: 'translate(-30%, -30%)' }} />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #2D6A4F, transparent)', transform: 'translate(30%, 30%)' }} />
          {/* Grille */}
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        </div>

        {/* Ligne drapeau */}
        <div className="absolute top-0 left-0 right-0 flex h-1">
          <div className="flex-1" style={{ background: '#CC0000' }} />
          <div className="flex-1" style={{ background: '#2D6A4F' }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 pt-36 pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-white/40 text-xs mb-6">
                <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
                <span>/</span>
                <span className="text-white/70">Société</span>
              </div>

              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white text-[11px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                Depuis 1996 — Ouarzazate
              </div>

              <h1 className="font-black text-white leading-none tracking-tighter mb-4" style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)' }}>
                STE <span style={{ color: '#CC0000' }}>CADOZAT</span><br />
                <span className="text-white/60 text-2xl font-bold tracking-normal">SARL</span>
              </h1>

              <p className="text-white/60 text-base leading-relaxed mb-8 max-w-lg">
                Concessionnaire officiel Isuzu & Karry au Maroc, CADOZAT est votre partenaire de confiance pour les véhicules utilitaires, camions et engins industriels depuis plus de <strong className="text-white">28 ans</strong>.
              </p>

              {/* Stats rapides */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { val: 28, suffix: '+', label: 'Années d\'expérience' },
                  { val: 3, suffix: '', label: 'Agences au Maroc' },
                  { val: 1300000, suffix: ' DHS', label: 'Capital social' },
                ].map((s, i) => (
                  <div key={i} className="bg-white/8 border border-white/10 rounded-2xl p-4 text-center">
                    <div className="font-black text-white text-xl leading-none">
                      <Counter target={s.val} suffix={s.suffix} />
                    </div>
                    <div className="text-white/40 text-[10px] mt-1 uppercase tracking-wide leading-tight">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Fiche identité rapide */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
              <p className="text-xs font-black uppercase tracking-widest mb-5" style={{ color: '#CC0000' }}>Fiche d'identité</p>
              <div className="space-y-3">
                {[
                  { l: 'Forme juridique', v: 'SARL' },
                  { l: 'Siège social', v: 'N° 189 Bd Maghreb Al Arabi, Ouarzazate' },
                  { l: 'Capital', v: '1 300 000,00 DHS' },
                  { l: 'Gérant', v: 'AMGUOUNE AHMED' },
                  { l: 'RC', v: '169/559' },
                  { l: 'IF', v: '06590278' },
                ].map((row, i) => (
                  <div key={i} className="flex items-start justify-between gap-4 pb-3 border-b border-white/8 last:border-0">
                    <span className="text-white/40 text-xs flex-shrink-0">{row.l}</span>
                    <span className="text-white text-xs font-bold text-right">{row.v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Vague bas */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" className="w-full" style={{ display: 'block' }}>
            <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* ══ PRÉSENTATION ══════════════════════════════ */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <Section>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <p className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: '#CC0000' }}>Notre histoire</p>
                <h2 className="text-4xl font-black text-gray-900 leading-tight mb-2">Fondée en <span style={{ color: '#CC0000' }}>1996</span></h2>
                <div className="w-12 h-0.5 mb-6" style={{ background: 'linear-gradient(to right, #CC0000, #2D6A4F)' }} />
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>La société CADOZAT a été créée en <strong className="text-gray-900">1996</strong> par <strong className="text-gray-900">Hassan AMGOUN</strong> et <strong className="text-gray-900">Lahcen AMGOUN</strong>. CADOZAT est concessionnaire de véhicules industriels et utilitaires au Maroc.</p>
                  <p>Forte d'une longue expérience de plus de 28 ans, la société s'est imposée comme le <strong className="text-gray-900">leader des véhicules utilitaires et industriels au Sud du Maroc</strong>, avec une présence dans 3 agences : Ouarzazate, Agadir et Tinghir.</p>
                  <p>CADOZAT intervient sur des segments variés : vente de véhicules, réparation mécanique, marchés publics et appels d'offres, avec une clientèle allant des professionnels aux collectivités territoriales.</p>
                </div>
              </div>

              {/* Activités */}
              <div className="space-y-3">
                <p className="text-xs font-black uppercase tracking-widest mb-5" style={{ color: '#2D6A4F' }}>Domaines d'activité</p>
                {[
                  { icon: '🚛', titre: 'Vente de véhicules', desc: 'Pick-up, camions porteurs, engins de BTP et véhicules utilitaires' },
                  { icon: '🔧', titre: 'Mécanique & réparation', desc: 'Atelier équipé + atelier mobile Dacia Dokker pour intervention sur site' },
                  { icon: '📋', titre: 'Marchés publics', desc: 'Bons de commande, appels d\'offres pour collectivités et institutions' },
                  { icon: '📦', titre: 'Import & distribution', desc: 'Importateur vendant en demi-gros — pièces de rechange & accessoires' },
                  { icon: '🚜', titre: 'Machines agricoles', desc: 'Vente et maintenance d\'équipements agricoles' },
                ].map((a, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 rounded-2xl border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                    <div className="text-2xl flex-shrink-0">{a.icon}</div>
                    <div>
                      <div className="font-black text-gray-900 text-sm">{a.titre}</div>
                      <div className="text-gray-400 text-xs mt-0.5">{a.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Section>
        </div>
      </section>

      {/* ══ ORGANIGRAMME ══════════════════════════════ */}
      <section className="py-20" style={{ background: '#f8faff' }}>
        <div className="max-w-5xl mx-auto px-6">
          <Section>
            <div className="text-center mb-14">
              <p className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: '#0057A8' }}>Structure interne</p>
              <h2 className="text-3xl font-black text-gray-900">Organigramme hiérarchique</h2>
              <div className="w-10 h-0.5 mx-auto mt-4" style={{ background: 'linear-gradient(to right, #CC0000, #2D6A4F)' }} />
            </div>

            {/* Organigramme visuel */}
            <div className="flex flex-col items-center gap-0">
              {/* DG */}
              <div className="px-8 py-3 rounded-2xl text-white font-black text-sm text-center" style={{ background: 'linear-gradient(135deg,#CC0000,#990000)', boxShadow: '0 4px 20px rgba(204,0,0,0.3)', minWidth: '200px' }}>
                Directeur Général
              </div>
              <div className="w-0.5 h-6 bg-gray-300" />

              {/* Gérance + Secrétaire + Conseiller */}
              <div className="grid grid-cols-3 gap-6 w-full max-w-2xl relative">
                <div className="absolute top-0 left-1/6 right-1/6 h-px bg-gray-300 -translate-y-0" style={{ top: 0 }} />
                {[
                  { titre: 'Gérance', color: '#1B2B6B' },
                  { titre: 'Secrétaire', color: '#4A4A4A' },
                  { titre: 'Conseiller', color: '#2D6A4F' },
                ].map((box, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div className="w-px h-6 bg-gray-300" />
                    <div className="px-5 py-2.5 rounded-xl text-white font-bold text-xs text-center w-full" style={{ background: box.color }}>
                      {box.titre}
                    </div>
                  </div>
                ))}
              </div>

              <div className="w-px h-6 bg-gray-300" />

              {/* Services */}
              <div className="grid grid-cols-3 gap-6 w-full max-w-2xl">
                {[
                  { titre: 'Service Technique & Entretien', color: '#CC0000', icon: '⚙️' },
                  { titre: 'Service Ventes', color: '#0057A8', icon: '🤝' },
                  { titre: 'Service Administratif & Financier', color: '#2D6A4F', icon: '💼' },
                ].map((s, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div className="w-px h-6 bg-gray-300" />
                    <div className="px-4 py-3 rounded-2xl text-white text-xs font-bold text-center w-full border-t-4" style={{ background: s.color + '15', color: s.color, borderColor: s.color }}>
                      <div className="text-xl mb-1">{s.icon}</div>
                      {s.titre}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Section>
        </div>
      </section>

      {/* ══ MOYENS HUMAINS ════════════════════════════ */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <Section>
            <div className="text-center mb-14">
              <p className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: '#CC0000' }}>Capital humain</p>
              <h2 className="text-3xl font-black text-gray-900">Notre équipe</h2>
              <div className="w-10 h-0.5 mx-auto mt-4" style={{ background: 'linear-gradient(to right, #CC0000, #2D6A4F)' }} />
              <p className="text-gray-400 text-sm mt-4 max-w-lg mx-auto">Une équipe qualifiée qui se mobilise chaque jour pour satisfaire les besoins de la clientèle.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
              {HUMAINS.map((h, i) => (
                <div key={i} className="group rounded-2xl border border-gray-100 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center">
                  <div className="text-4xl mb-3">{h.icon}</div>
                  <h3 className="font-black text-gray-900 text-sm mb-2">{h.poste}</h3>
                  <p className="text-gray-400 text-xs leading-relaxed">{h.desc}</p>
                </div>
              ))}
            </div>
          </Section>
        </div>
      </section>

      {/* ══ MOYENS TECHNIQUES ════════════════════════ */}
      <section className="py-24" style={{ background: 'linear-gradient(160deg, #fff5f5 0%, #f0f6ff 100%)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <Section>
            <div className="text-center mb-14">
              <p className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: '#0057A8' }}>Infrastructure</p>
              <h2 className="text-3xl font-black text-gray-900">Moyens techniques & matériels</h2>
              <div className="w-10 h-0.5 mx-auto mt-4" style={{ background: 'linear-gradient(to right, #CC0000, #0057A8)' }} />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {TECHNIQUES.map((t, i) => (
                <div key={i} className="bg-white rounded-2xl p-5 text-center border border-gray-100 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
                  <div className="text-3xl mb-3">{t.icon}</div>
                  <div className="font-black text-gray-900 text-xs mb-1 leading-tight">{t.item}</div>
                  <div className="text-xs font-bold px-2 py-0.5 rounded-full inline-block" style={{ color: '#CC0000', background: '#fff5f5' }}>{t.detail}</div>
                </div>
              ))}
            </div>
          </Section>
        </div>
      </section>

      {/* ══ ATELIER MOBILE ════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <Section>
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Texte */}
                <div className="p-10" style={{ background: 'linear-gradient(135deg, #0f1c2e, #1a2d1a)' }}>
                  <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white text-[11px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest mb-6">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    Intervention sur site
                  </div>
                  <h2 className="text-2xl font-black text-white mb-4">Atelier Mobile<br /><span style={{ color: '#CC0000' }}>Dacia Dokker</span></h2>
                  <div className="w-10 h-0.5 mb-6" style={{ background: '#CC0000' }} />
                  <div className="space-y-4 text-white/70 text-sm leading-relaxed">
                    <p>La société est dotée d'un atelier mobile de réparation de marque <strong className="text-white">Dacia</strong>, modèle <strong className="text-white">Dokker (Fourgonnette)</strong>, immatriculé sous le numéro <strong className="text-[#CC0000]">13/A/74443</strong>.</p>
                    <p>Cet atelier sur roues polyvalent et compact est équipé de tous les outils et équipements nécessaires, garantissant un service efficace et de haute qualité pour une large gamme de véhicules.</p>
                    <p>Le véhicule est conçu pour optimiser l'espace et la fonctionnalité, avec un système de stockage durable et bien organisé gardant tous les outils et pièces de rechange facilement accessibles.</p>
                  </div>

                  {/* Specs carte grise */}
                  <div className="mt-8 grid grid-cols-2 gap-3">
                    {[
                      { l: 'Immatriculation', v: '74443-13' },
                      { l: 'Marque', v: 'DACIA DOKKER' },
                      { l: 'Carburant', v: 'Diesel' },
                      { l: 'PTAC', v: '1 956 kg' },
                    ].map((s, i) => (
                      <div key={i} className="bg-white/8 rounded-xl p-3">
                        <div className="text-white/40 text-[10px] uppercase tracking-widest">{s.l}</div>
                        <div className="text-white font-black text-xs mt-0.5">{s.v}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Visuel */}
                <div className="flex items-center justify-center p-10" style={{ background: '#f8f9fb' }}>
                  <div className="text-center">
                    <div className="text-8xl mb-4">🚐</div>
                    <div className="font-black text-gray-700 text-lg">Atelier Mobile</div>
                    <div className="text-gray-400 text-sm mt-1">Isuzu Service — CADOZAT SARL</div>
                    <div className="mt-4 inline-flex items-center gap-2 bg-green-50 text-green-700 text-xs font-bold px-4 py-2 rounded-full border border-green-200">
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      Disponible Ouarzazate · Agadir · Tinghir
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Section>
        </div>
      </section>

      {/* ══ ÉVOLUTION DES VENTES ══════════════════════ */}
      <section className="py-24" style={{ background: '#0f1c2e' }}>
        <div className="max-w-7xl mx-auto px-6">
          <Section>
            <div className="text-center mb-14">
              <p className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: '#C9A84C' }}>Performance commerciale</p>
              <h2 className="text-3xl font-black text-white">Évolution des ventes</h2>
              <div className="w-10 h-0.5 mx-auto mt-4" style={{ background: '#C9A84C' }} />
            </div>
            <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden">
              {/* En-tête */}
              <div className="grid grid-cols-3 text-center border-b border-white/10" style={{ background: 'rgba(255,255,255,0.08)' }}>
                <div className="py-4 text-white/50 text-xs font-bold uppercase tracking-widest">Nature de vente</div>
                <div className="py-4 font-black text-sm border-x border-white/10" style={{ color: '#C9A84C' }}>2007 — 2009</div>
                <div className="py-4 font-black text-sm" style={{ color: '#CC0000' }}>2009 — 2011</div>
              </div>
              {VENTES.map((v, i) => (
                <div key={i} className={`grid grid-cols-3 text-center border-b border-white/8 last:border-0 ${i % 2 === 0 ? '' : 'bg-white/3'}`}>
                  <div className="py-4 px-4 text-white/70 text-sm">{v.nature}</div>
                  <div className="py-4 font-bold border-x border-white/8" style={{ color: '#C9A84C' }}>{v.v1}</div>
                  <div className="py-4 font-black" style={{ color: '#CC0000' }}>
                    {v.v2}
                    <span className="ml-1 text-xs text-green-400">+{Math.round((v.v2 - v.v1) / v.v1 * 100)}%</span>
                  </div>
                </div>
              ))}
            </div>
          </Section>
        </div>
      </section>

      {/* ══ RÉFÉRENCES MARCHÉS PUBLICS ════════════════ */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <Section>
            <div className="text-center mb-14">
              <p className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: '#CC0000' }}>Références</p>
              <h2 className="text-3xl font-black text-gray-900">Marchés publics réalisés</h2>
              <div className="w-10 h-0.5 mx-auto mt-4" style={{ background: 'linear-gradient(to right, #CC0000, #2D6A4F)' }} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {REFERENCES.map((r, i) => (
                <div key={i} className="group rounded-2xl border border-gray-100 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-xs font-black flex-shrink-0" style={{ background: 'linear-gradient(135deg,#CC0000,#990000)' }}>
                        📋
                      </div>
                      <div>
                        <div className="font-black text-gray-900 text-sm">{r.lieu}</div>
                        <div className="text-xs text-gray-400">{r.annee}</div>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-xs text-gray-400">Montant</div>
                      <div className="font-black text-sm" style={{ color: '#CC0000' }}>{r.montant} DHS</div>
                    </div>
                  </div>
                  <div className="h-px bg-gray-100 mb-3" />
                  <p className="text-gray-500 text-xs leading-relaxed">{r.nature}</p>
                </div>
              ))}
            </div>
          </Section>
        </div>
      </section>

      {/* ══ FICHE TECHNIQUE COMPLÈTE ══════════════════ */}
      <section className="py-24" style={{ background: '#f8faff' }}>
        <div className="max-w-4xl mx-auto px-6">
          <Section>
            <div className="text-center mb-12">
              <p className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: '#0057A8' }}>Informations légales</p>
              <h2 className="text-3xl font-black text-gray-900">Fiche technique complète</h2>
              <div className="w-10 h-0.5 mx-auto mt-4" style={{ background: '#0057A8' }} />
            </div>
            <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100">
              {FICHE.map((row, i) => (
                <div key={i} className={`flex items-center justify-between px-8 py-4 border-b border-gray-50 last:border-0 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                  <span className="text-gray-500 text-sm">{row.label}</span>
                  <span className="font-black text-gray-900 text-sm text-right">{row.value}</span>
                </div>
              ))}
            </div>
          </Section>
        </div>
      </section>

      {/* ══ CTA FINAL ═════════════════════════════════ */}
      <section className="py-20" style={{ background: 'linear-gradient(135deg, #0f1c2e, #1a2d1a)' }}>
        <div className="max-w-2xl mx-auto px-6 text-center">
          <p className="text-xs font-black uppercase tracking-widest text-white/40 mb-4">Votre partenaire de confiance</p>
          <h2 className="text-3xl font-black text-white mb-4">Travaillons ensemble</h2>
          <div className="w-10 h-0.5 mx-auto mb-6" style={{ background: '#CC0000' }} />
          <p className="text-white/50 text-sm mb-10">Demandez un devis personnalisé ou contactez nos agences à Ouarzazate, Agadir et Tinghir.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/devis" className="inline-flex items-center gap-2 text-white font-bold px-8 py-3.5 rounded-xl transition-all text-sm hover:brightness-110" style={{ background: '#CC0000', boxShadow: '0 4px 20px rgba(204,0,0,0.4)' }}>
              Demande de devis
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
            <Link href="/contact" className="inline-flex items-center gap-2 text-white font-bold px-8 py-3.5 rounded-xl border border-white/20 hover:bg-white/10 transition-all text-sm">
              Nous contacter
            </Link>
          </div>
        </div>
      </section>

    </main>
  )
}