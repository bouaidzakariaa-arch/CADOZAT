'use client'
import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

const vehiculesData = [
  {
    serie: 'D-MAX', couleur: '#CC0000',
    modeles: [
      { nom: 'D-MAX TFR — Pick-up SC 4×2',      value: 'dmax-tfr-sc-4x2' },
      { nom: 'D-MAX TFR — Pick-up SC 4×2 Clim', value: 'dmax-tfr-sc-4x2-clim' },
      { nom: 'D-MAX TFR — Pick-up DC 4×2',      value: 'dmax-tfr-dc-4x2' },
      { nom: 'D-MAX TFS — Pick-up DC 4×4',      value: 'dmax-tfs-dc-4x4' },
    ],
  },
  {
    serie: 'N-Series', couleur: '#1B2B6B',
    modeles: [
      { nom: 'NMR 77E — 3.5T Châssis court',  value: 'nmr-77e' },
      { nom: 'NMR 85H — 3.5T Châssis long',   value: 'nmr-85h' },
      { nom: 'NNR 85H — 3.5T Châssis long',   value: 'nnr-85h' },
      { nom: 'NPR 75K — 7.5T Châssis court',  value: 'npr-75k' },
      { nom: 'NPR 75L — 7.5T Châssis long',   value: 'npr-75l' },
      { nom: 'NQR 90K — 9.5T Châssis court',  value: 'nqr-90k' },
      { nom: 'NQR 90M — 9.5T Châssis long',   value: 'nqr-90m' },
    ],
  },
  {
    serie: 'F-Series', couleur: '#333333',
    modeles: [
      { nom: 'FTR 34K — 16T Châssis court',         value: 'ftr-34k' },
      { nom: 'FTR 34M — 16T Châssis intermédiaire', value: 'ftr-34m' },
      { nom: 'FTR 34P — 16T Châssis long',          value: 'ftr-34p' },
      { nom: 'FVR 34K — 18T Châssis court',         value: 'fvr-34k' },
      { nom: 'FVR 34P — 18T Châssis long',          value: 'fvr-34p' },
    ],
  },
  {
    serie: 'Karry', couleur: '#0057A8',
    modeles: [
      { nom: 'Karry 22B — Fourgon utilitaire', value: 'karry-22b' },
      { nom: 'Karry 22Q — Fourgon utilitaire', value: 'karry-22q' },
    ],
  },
  {
    serie: 'Great Wall', couleur: '#C9A84C',
    modeles: [
      { nom: 'Great Wall Pick-up SC — Simple cabine', value: 'great-wall-sc' },
      { nom: 'Great Wall Pick-up DC — Double cabine', value: 'great-wall-dc' },
    ],
  },
]

const imageMap: Record<string, string> = {
  'dmax-tfr-sc-4x2':      '/images/vehicules/dmax-tfr-sc-4x2.jpg',
  'dmax-tfr-sc-4x2-clim': '/images/vehicules/dmax-tfr-sc-4x2-clim.jpg',
  'dmax-tfr-dc-4x2':      '/images/vehicules/dmax-tfr-dc-4x2.jpg',
  'dmax-tfs-dc-4x4':      '/images/vehicules/dmax-tfs-dc-4x4.jpg',
  'nmr-77e':              '/images/vehicules/nmr-77e.jpg',
  'npr-75k':              '/images/vehicules/npr-75k.jpg',
  'npr-75l':              '/images/vehicules/npr-75l.jpg',
  'ftr-34k':              '/images/vehicules/ftr-34k.jpg',
  'ftr-34m':              '/images/vehicules/ftr-34m.jpg',
  'ftr-34p':              '/images/vehicules/ftr-34p.jpg',
  'fvr-34k':              '/images/vehicules/fvr-34k.jpg',
  'fvr-34p':              '/images/vehicules/fvr-34p.jpg',
  'karry-22b':            '/images/vehicules/karry-22b.jpg',
  'karry-22q':            '/images/vehicules/karry-22q.jpg',
  // 'nmr-85h':           '/images/vehicules/nmr-85h.jpg',
  // 'nnr-85h':           '/images/vehicules/nnr-85h.jpg',
  // 'nqr-90k':           '/images/vehicules/nqr-90k.jpg',
  // 'nqr-90m':           '/images/vehicules/nqr-90m.jpg',
  // 'great-wall-sc':     '/images/vehicules/great-wall-sc.jpg',
  // 'great-wall-dc':     '/images/vehicules/great-wall-dc.jpg',
}

// ── Blobs animés en arrière-plan ──────────────────────────────────────────
function AnimatedBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden -z-10">
      <div
        className="absolute rounded-full"
        style={{
          width: 500, height: 500,
          background: '#CC0000',
          opacity: 0.08,
          filter: 'blur(80px)',
          top: -100, right: -80,
          animation: 'blobFloat1 14s ease-in-out infinite',
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          width: 380, height: 380,
          background: '#1B2B6B',
          opacity: 0.07,
          filter: 'blur(70px)',
          bottom: 80, left: -60,
          animation: 'blobFloat2 18s ease-in-out infinite',
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          width: 260, height: 260,
          background: '#C9A84C',
          opacity: 0.09,
          filter: 'blur(60px)',
          top: '45%', left: '35%',
          animation: 'blobFloat3 12s ease-in-out infinite',
        }}
      />
      <style>{`
        @keyframes blobFloat1 {
          0%,100% { transform: translate(0,0) scale(1); }
          33%      { transform: translate(50px,-40px) scale(1.07); }
          66%      { transform: translate(-25px,25px) scale(0.95); }
        }
        @keyframes blobFloat2 {
          0%,100% { transform: translate(0,0) scale(1); }
          33%      { transform: translate(-45px,35px) scale(1.05); }
          66%      { transform: translate(35px,-50px) scale(0.97); }
        }
        @keyframes blobFloat3 {
          0%,100% { transform: translate(0,0) scale(1); }
          50%      { transform: translate(40px,30px) scale(1.08); }
        }
      `}</style>
    </div>
  )
}

// ── Badge header ─────────────────────────────────────────────────────────
function DevisFormBadge() {
  const searchParams = useSearchParams()
  const param = searchParams.get('vehicule')
  if (!param) return null
  const vehicle = vehiculesData.flatMap(s => s.modeles).find(m => m.value === param)
  if (!vehicle) return null
  return (
    <div className="inline-flex items-center gap-2 mt-5 bg-white/80 border border-gray-200 text-gray-700 text-sm font-semibold px-4 py-2 rounded-full shadow-sm backdrop-blur-sm">
      <span className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0"></span>
      Véhicule pré-sélectionné :&nbsp;<span className="text-[#CC0000]">{vehicle.nom}</span>
    </div>
  )
}

// ── Formulaire ───────────────────────────────────────────────────────────
function DevisForm() {
  const searchParams  = useSearchParams()
  const vehiculeParam = searchParams.get('vehicule')
  const allModeles    = vehiculesData.flatMap(s => s.modeles)
  const validParam    = vehiculeParam && allModeles.some(m => m.value === vehiculeParam) ? vehiculeParam : null
  const isPreselected = !!validParam

  const [formData, setFormData] = useState({
    nom: '', prenom: '', societe: '', telephone: '',
    email: '', ville: '', vehicule: validParam ?? '', message: '', newsletter: false,
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error,   setError]   = useState('')

  useEffect(() => {
    if (validParam) setFormData(prev => ({ ...prev, vehicule: validParam }))
  }, [validParam])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/devis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, date: new Date().toISOString(), statut: 'nouveau' }),
      })
      if (!res.ok) throw new Error()
      setSuccess(true)
      setFormData({ nom: '', prenom: '', societe: '', telephone: '', email: '', ville: '', vehicule: '', message: '', newsletter: false })
    } catch {
      setError('Une erreur est survenue. Veuillez réessayer.')
    } finally {
      setLoading(false)
    }
  }

  const selectedVehicle = allModeles.find(m => m.value === formData.vehicule)
  const selectedSerie   = vehiculesData.find(s => s.modeles.some(m => m.value === formData.vehicule))
  const imageSrc        = formData.vehicule ? imageMap[formData.vehicule] ?? null : null

  const inputClass = "w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-800 bg-white/80 backdrop-blur-sm focus:border-[#CC0000] focus:outline-none focus:ring-2 focus:ring-[#CC0000]/10 transition-all placeholder:text-gray-400"

  return (
    <div className="max-w-5xl mx-auto px-6 -mt-4 pb-20">

      {/* Card */}
      <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-white shadow-xl shadow-gray-200/60 overflow-hidden">
        {/* Top gradient bar */}
        <div className="h-[3px]" style={{ background: 'linear-gradient(90deg, #CC0000, #C9A84C, #1B2B6B)' }}></div>

        {success ? (
          <div className="p-16 text-center">
            <div className="w-16 h-16 bg-green-50 border border-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
              </svg>
            </div>
            <h2 className="text-2xl font-black text-gray-900 mb-3">Demande envoyée !</h2>
            <p className="text-gray-400 mb-8">Notre équipe vous contactera dans les plus brefs délais.</p>
            <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 bg-[#CC0000] text-white font-semibold rounded-full hover:bg-red-700 transition-colors text-sm">
              Retour à l&apos;accueil
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="grid lg:grid-cols-2">

              {/* ── Gauche : véhicule ── */}
              <div className="p-8 border-r border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full bg-[#CC0000] text-white text-sm font-black flex items-center justify-center">1</div>
                  <h2 className="text-base font-bold text-gray-800">
                    {isPreselected ? 'Votre véhicule' : 'Sélectionnez votre véhicule'}
                  </h2>
                </div>

                {/* Pré-sélectionné : grande image, pas de select */}
                {isPreselected ? (
                  <div className="rounded-xl border border-gray-100 overflow-hidden bg-white">
                    <div className="relative h-52 bg-white flex items-center justify-center">
                      {imageSrc ? (
                        <Image src={imageSrc} alt={selectedVehicle?.nom || ''} fill className="object-contain p-5 drop-shadow"/>
                      ) : (
                        <div className="text-gray-200 text-center">
                          <svg className="w-14 h-14 mx-auto mb-2" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99z"/>
                          </svg>
                          <p className="text-xs">Image bientôt disponible</p>
                        </div>
                      )}
                    </div>
                    <div className="px-5 py-4 border-t border-gray-100 flex items-center justify-between bg-gray-50/50">
                      <div>
                        <p className="font-semibold text-gray-800 text-sm">{selectedVehicle?.nom}</p>
                        {selectedSerie && (
                          <span className="inline-block mt-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold text-white" style={{ background: selectedSerie.couleur }}>
                            {selectedSerie.serie}
                          </span>
                        )}
                      </div>
                      <Link href="/devis" className="text-xs text-gray-300 hover:text-[#CC0000] underline underline-offset-2 transition-colors">
                        Changer
                      </Link>
                    </div>
                  </div>
                ) : (
                  /* Pas de pré-sélection : select + aperçu */
                  <>
                    <div className={`rounded-xl mb-5 min-h-[200px] flex items-center justify-center relative overflow-hidden transition-all ${
                      formData.vehicule ? 'bg-white border border-gray-100' : 'bg-gray-50/80 border border-dashed border-gray-200'
                    }`}>
                      {formData.vehicule ? (
                        <div className="w-full text-center p-5">
                          <div className="relative w-full h-36 mb-3">
                            {imageSrc ? (
                              <Image key={formData.vehicule} src={imageSrc} alt={selectedVehicle?.nom || ''} fill className="object-contain drop-shadow"/>
                            ) : (
                              <div className="flex flex-col items-center justify-center h-full text-gray-200">
                                <svg className="w-10 h-10 mb-1" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99z"/>
                                </svg>
                                <p className="text-xs">Image bientôt disponible</p>
                              </div>
                            )}
                          </div>
                          <p className="font-semibold text-gray-800 text-sm">{selectedVehicle?.nom}</p>
                          {selectedSerie && (
                            <span className="inline-block mt-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold text-white" style={{ background: selectedSerie.couleur }}>
                              {selectedSerie.serie}
                            </span>
                          )}
                        </div>
                      ) : (
                        <div className="text-center text-gray-300 py-10">
                          <svg className="w-14 h-14 mx-auto mb-3" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99z"/>
                          </svg>
                          <p className="text-sm">Sélectionnez un véhicule</p>
                        </div>
                      )}
                    </div>

                    <div className="relative">
                      <select name="vehicule" value={formData.vehicule} onChange={handleChange} required className={inputClass + ' appearance-none cursor-pointer'}>
                        <option value="">Sélectionnez votre véhicule</option>
                        {vehiculesData.map(serie => (
                          <optgroup key={serie.serie} label={`━━ ${serie.serie} ━━`}>
                            {serie.modeles.map(m => (
                              <option key={m.value} value={m.value}>{m.nom}</option>
                            ))}
                          </optgroup>
                        ))}
                      </select>
                      <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
                      </svg>
                    </div>
                    <p className="text-xs text-gray-300 mt-2">* Photos non contractuelles.</p>
                  </>
                )}
              </div>

              {/* ── Droite : coordonnées ── */}
              <div className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full bg-[#CC0000] text-white text-sm font-black flex items-center justify-center">2</div>
                  <h2 className="text-base font-bold text-gray-800">Vos coordonnées</h2>
                </div>

                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-1.5">Nom *</label>
                      <input type="text" name="nom" value={formData.nom} onChange={handleChange} required placeholder="Votre nom" className={inputClass}/>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-1.5">Prénom *</label>
                      <input type="text" name="prenom" value={formData.prenom} onChange={handleChange} required placeholder="Votre prénom" className={inputClass}/>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5">Société</label>
                    <input type="text" name="societe" value={formData.societe} onChange={handleChange} placeholder="Optionnel" className={inputClass}/>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-1.5">Téléphone *</label>
                      <input type="tel" name="telephone" value={formData.telephone} onChange={handleChange} required placeholder="06 00 00 00 00" className={inputClass}/>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-1.5">Email *</label>
                      <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="votre@email.com" className={inputClass}/>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5">Ville *</label>
                    <input type="text" name="ville" value={formData.ville} onChange={handleChange} required placeholder="Votre ville" className={inputClass}/>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5">Message</label>
                    <textarea name="message" value={formData.message} onChange={handleChange} rows={3} placeholder="Précisez vos besoins, délais..." className={inputClass + ' resize-none'}/>
                  </div>

                  <label className="flex items-start gap-2.5 cursor-pointer pt-1">
                    <input type="checkbox" name="newsletter" checked={formData.newsletter} onChange={handleChange} className="mt-0.5 w-4 h-4 accent-[#CC0000] flex-shrink-0"/>
                    <span className="text-xs text-gray-400 leading-relaxed">J&apos;accepte de recevoir les offres commerciales de CADOZAT par email.</span>
                  </label>

                  {error && <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-red-600 text-xs">{error}</div>}

                  <button type="submit" disabled={loading}
                    className="w-full py-3.5 bg-[#CC0000] hover:bg-red-700 text-white font-bold text-sm rounded-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-sm shadow-red-200 mt-2">
                    {loading ? (
                      <>
                        <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                        </svg>
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        Envoyer ma demande
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                        </svg>
                      </>
                    )}
                  </button>

                  <p className="text-xs text-gray-300 text-center">
                    En soumettant, vous acceptez notre{' '}
                    <Link href="/mentions-legales" className="text-[#CC0000] hover:underline">politique de confidentialité</Link>.
                  </p>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>

      {/* Contact bar */}
      <div className="mt-8 grid md:grid-cols-3 gap-4">
        {[
          { icon: 'M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z', label: 'Appelez-nous', value: '0524 885 025', color: '#CC0000', bg: '#fff0f0' },
          { icon: 'M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884zM18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z', label: 'Écrivez-nous', value: 'contact@cadozat.com', color: '#1B2B6B', bg: '#f0f2ff' },
          { icon: 'M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z', label: 'Horaires', value: 'Lun–Sam 8h–18h', color: '#C9A84C', bg: '#fdf8ed' },
        ].map((item, i) => (
          <div key={i} className="bg-white/70 backdrop-blur-sm border border-white rounded-xl p-4 flex items-center gap-3 shadow-sm">
            <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: item.bg }}>
              <svg className="w-5 h-5" fill={item.color} viewBox="0 0 20 20">
                <path fillRule="evenodd" d={item.icon} clipRule="evenodd"/>
              </svg>
            </div>
            <div>
              <p className="text-xs text-gray-400">{item.label}</p>
              <p className="text-sm font-bold text-gray-800">{item.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────
export default function DevisPage() {
  return (
    <main className="min-h-screen" style={{ background: '#f8f7f5' }}>
      <AnimatedBackground />

      {/* Header */}
      <div className="pt-32 pb-16 px-6">
        <div className="max-w-5xl mx-auto">
          <nav className="flex items-center gap-2 text-xs text-gray-400 mb-8">
            <Link href="/" className="hover:text-gray-600 transition-colors">Accueil</Link>
            <span>/</span>
            <span className="text-[#CC0000] font-semibold">Demande de devis</span>
          </nav>

          <h1 className="text-5xl font-black text-gray-900 tracking-tight leading-none mb-3">
            Demande de <span className="text-[#CC0000]">devis</span>
          </h1>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-[3px] bg-[#CC0000] rounded-full"></div>
            <div className="w-4 h-[3px] bg-[#C9A84C] rounded-full"></div>
          </div>
          <p className="text-gray-400 text-base mt-4 max-w-lg">
            Remplissez le formulaire et notre équipe commerciale vous contactera dans les plus brefs délais.
          </p>
          <Suspense fallback={null}>
            <DevisFormBadge />
          </Suspense>
        </div>
      </div>

      <Suspense fallback={
        <div className="max-w-5xl mx-auto px-6 pb-20">
          <div className="bg-white/70 rounded-2xl h-96 flex items-center justify-center border border-white">
            <p className="text-gray-300 text-sm">Chargement...</p>
          </div>
        </div>
      }>
        <DevisForm />
      </Suspense>
    </main>
  )
}