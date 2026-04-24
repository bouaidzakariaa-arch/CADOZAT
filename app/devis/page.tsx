'use client'
import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

const vehiculesData = [
  {
    serie: 'D-MAX',
    couleur: '#CC0000',
    modeles: [
      { nom: 'D-MAX TFR — Pick-up SC 4×2',      value: 'dmax-tfr-sc-4x2' },
      { nom: 'D-MAX TFR — Pick-up SC 4×2 Clim', value: 'dmax-tfr-sc-4x2-clim' },
      { nom: 'D-MAX TFR — Pick-up DC 4×2',      value: 'dmax-tfr-dc-4x2' },
      { nom: 'D-MAX TFS — Pick-up DC 4×4',      value: 'dmax-tfs-dc-4x4' },
    ],
  },
  {
    serie: 'N-Series',
    couleur: '#1B2B6B',
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
    serie: 'F-Series',
    couleur: '#333333',
    modeles: [
      { nom: 'FTR 34K — 16T Châssis court',         value: 'ftr-34k' },
      { nom: 'FTR 34M — 16T Châssis intermédiaire', value: 'ftr-34m' },
      { nom: 'FTR 34P — 16T Châssis long',          value: 'ftr-34p' },
      { nom: 'FVR 34K — 18T Châssis court',         value: 'fvr-34k' },
      { nom: 'FVR 34P — 18T Châssis long',          value: 'fvr-34p' },
    ],
  },
  {
    serie: 'Karry',
    couleur: '#0057A8',
    modeles: [
      { nom: 'Karry 22B — Fourgon utilitaire', value: 'karry-22b' },
      { nom: 'Karry 22Q — Fourgon utilitaire', value: 'karry-22q' },
    ],
  },
  {
    serie: 'Great Wall',
    couleur: '#C9A84C',
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
  // À décommenter au fur et à mesure :
  // 'nmr-85h':           '/images/vehicules/nmr-85h.jpg',
  // 'nnr-85h':           '/images/vehicules/nnr-85h.jpg',
  // 'nqr-90k':           '/images/vehicules/nqr-90k.jpg',
  // 'nqr-90m':           '/images/vehicules/nqr-90m.jpg',
  // 'great-wall-sc':     '/images/vehicules/great-wall-sc.jpg',
  // 'great-wall-dc':     '/images/vehicules/great-wall-dc.jpg',
}

// ── Composant interne qui utilise useSearchParams ──
function DevisForm() {
  const searchParams = useSearchParams()

  const [formData, setFormData] = useState({
    nom: '', prenom: '', societe: '', telephone: '',
    email: '', ville: '', vehicule: '', message: '', newsletter: false,
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error,   setError]   = useState('')

  useEffect(() => {
    const param = searchParams.get('vehicule')
    if (!param) return
    const exists = vehiculesData.flatMap(s => s.modeles).some(m => m.value === param)
    if (exists) setFormData(prev => ({ ...prev, vehicule: param }))
  }, [searchParams])

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

  const selectedVehicle = vehiculesData.flatMap(s => s.modeles).find(m => m.value === formData.vehicule)
  const selectedSerie   = vehiculesData.find(s => s.modeles.some(m => m.value === formData.vehicule))
  const imageSrc        = formData.vehicule ? imageMap[formData.vehicule] ?? null : null
  const preselected     = !!formData.vehicule && searchParams.get('vehicule') === formData.vehicule

  return (
    <>
      {/* Badge header */}
      {preselected && selectedVehicle && (
        <div className="inline-flex items-center gap-2 mt-5 bg-white/10 border border-white/20 text-white text-sm font-semibold px-4 py-2 rounded-full">
          <svg className="w-4 h-4 text-[#C9A84C]" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414L8.414 15l-4.121-4.121a1 1 0 011.414-1.414L8.414 12.172l6.879-6.879a1 1 0 011.414 0z" clipRule="evenodd"/>
          </svg>
          Véhicule pré-sélectionné :&nbsp;<span className="text-[#C9A84C]">{selectedVehicle.nom}</span>
        </div>
      )}

      {/* Formulaire card */}
      <div className="max-w-7xl mx-auto px-6 -mt-8">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="h-1 bg-gradient-to-r from-[#CC0000] via-[#C9A84C] to-[#1B2B6B]"></div>

          {success ? (
            <div className="p-12 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                </svg>
              </div>
              <h2 className="text-2xl font-black text-[#1B2B6B] mb-4">Demande envoyée avec succès !</h2>
              <p className="text-gray-600 mb-8">Notre équipe commerciale vous contactera dans les plus brefs délais.</p>
              <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 bg-[#CC0000] text-white font-bold rounded-full hover:bg-[#aa0000] transition-colors">
                Retour à l&apos;accueil
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                </svg>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-8 md:p-12">
              <div className="grid lg:grid-cols-2 gap-12">

                {/* ── Colonne gauche — Image + Select ── */}
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-[#CC0000] text-white rounded-full flex items-center justify-center font-black text-lg">1</div>
                    <h2 className="text-xl font-black text-[#1B2B6B]">Sélectionnez votre véhicule</h2>
                  </div>

                  <div className={`rounded-2xl mb-6 min-h-[240px] flex items-center justify-center relative overflow-hidden transition-all duration-300 ${
                    formData.vehicule ? 'bg-gray-50 border-2 border-gray-100' : 'bg-gray-50 border-2 border-dashed border-gray-200'
                  }`}>
                    {formData.vehicule ? (
                      <div className="w-full text-center px-6 py-6">
                        {preselected && (
                          <span className="absolute top-3 right-3 bg-green-100 text-green-700 text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414L8.414 15l-4.121-4.121a1 1 0 011.414-1.414L8.414 12.172l6.879-6.879a1 1 0 011.414 0z" clipRule="evenodd"/>
                            </svg>
                            Pré-sélectionné
                          </span>
                        )}
                        <div className="relative w-full h-48 mx-auto mb-4">
                          {imageSrc ? (
                            <Image key={formData.vehicule} src={imageSrc} alt={selectedVehicle?.nom || 'Véhicule'} fill className="object-contain drop-shadow-md"/>
                          ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center text-gray-300">
                              <svg className="w-16 h-16 mb-2" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
                              </svg>
                              <p className="text-sm font-medium">Image bientôt disponible</p>
                            </div>
                          )}
                        </div>
                        <p className="font-bold text-gray-800 text-sm">{selectedVehicle?.nom}</p>
                        {selectedSerie && (
                          <span className="inline-block mt-2 px-3 py-1 rounded-full text-xs font-bold text-white" style={{ background: selectedSerie.couleur }}>
                            {selectedSerie.serie}
                          </span>
                        )}
                      </div>
                    ) : (
                      <div className="text-center text-gray-300 py-8">
                        <svg className="w-20 h-20 mx-auto mb-3" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
                        </svg>
                        <p className="text-sm font-medium">Sélectionnez un véhicule<br/>pour voir son image</p>
                      </div>
                    )}
                  </div>

                  <div className="relative">
                    <select name="vehicule" value={formData.vehicule} onChange={handleChange} required
                      className="w-full px-4 py-4 bg-white border-2 border-gray-200 rounded-xl text-gray-700 font-medium appearance-none cursor-pointer hover:border-[#CC0000] focus:border-[#CC0000] focus:outline-none transition-colors">
                      <option value="">Sélectionnez votre véhicule</option>
                      {vehiculesData.map((serie) => (
                        <optgroup key={serie.serie} label={`━━ ${serie.serie} ━━`}>
                          {serie.modeles.map((modele) => (
                            <option key={modele.value} value={modele.value}>{modele.nom}</option>
                          ))}
                        </optgroup>
                      ))}
                    </select>
                    <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
                    </svg>
                  </div>
                  <p className="text-xs text-gray-400 mt-3">* Photos non contractuelles.</p>
                </div>

                {/* ── Colonne droite — Coordonnées ── */}
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-[#CC0000] text-white rounded-full flex items-center justify-center font-black text-lg">2</div>
                    <h2 className="text-xl font-black text-[#1B2B6B]">Vos coordonnées</h2>
                  </div>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Nom *</label>
                        <input type="text" name="nom" value={formData.nom} onChange={handleChange} required placeholder="Votre nom" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#CC0000] focus:outline-none transition-colors"/>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Prénom *</label>
                        <input type="text" name="prenom" value={formData.prenom} onChange={handleChange} required placeholder="Votre prénom" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#CC0000] focus:outline-none transition-colors"/>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Société</label>
                      <input type="text" name="societe" value={formData.societe} onChange={handleChange} placeholder="Nom de votre société (optionnel)" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#CC0000] focus:outline-none transition-colors"/>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Téléphone *</label>
                        <input type="tel" name="telephone" value={formData.telephone} onChange={handleChange} required placeholder="06 00 00 00 00" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#CC0000] focus:outline-none transition-colors"/>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Email *</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="votre@email.com" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#CC0000] focus:outline-none transition-colors"/>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Ville *</label>
                      <input type="text" name="ville" value={formData.ville} onChange={handleChange} required placeholder="Votre ville" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#CC0000] focus:outline-none transition-colors"/>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Message / Informations supplémentaires</label>
                      <textarea name="message" value={formData.message} onChange={handleChange} rows={4} placeholder="Précisez vos besoins, options souhaitées, délais..." className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#CC0000] focus:outline-none transition-colors resize-none"/>
                    </div>
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input type="checkbox" name="newsletter" checked={formData.newsletter} onChange={handleChange} className="mt-1 w-5 h-5 text-[#CC0000] border-2 border-gray-300 rounded focus:ring-[#CC0000]"/>
                      <span className="text-sm text-gray-600">J&apos;accepte de recevoir les offres commerciales et actualités de CADOZAT par email.</span>
                    </label>
                    {error && <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">{error}</div>}
                    <button type="submit" disabled={loading} className="w-full py-4 bg-[#CC0000] text-white font-bold text-lg rounded-xl hover:bg-[#aa0000] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl">
                      {loading ? (
                        <>
                          <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                          </svg>
                          Envoi en cours...
                        </>
                      ) : (
                        <>
                          Envoyer ma demande
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                          </svg>
                        </>
                      )}
                    </button>
                    <p className="text-xs text-gray-400 text-center">
                      En soumettant ce formulaire, vous acceptez notre{' '}
                      <Link href="/mentions-legales" className="text-[#CC0000] hover:underline">politique de confidentialité</Link>.
                    </p>
                  </div>
                </div>
              </div>
            </form>
          )}
        </div>

        {/* ── Contact direct ── */}
        <div className="mt-12 mb-16 grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-[#CC0000]/10 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-[#CC0000]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-500">Appelez-nous</p>
              <a href="tel:0524885025" className="font-bold text-[#1B2B6B] hover:text-[#CC0000] transition-colors">0524 885 025</a>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-[#1B2B6B]/10 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-[#1B2B6B]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-500">Écrivez-nous</p>
              <a href="mailto:contact@cadozat.com" className="font-bold text-[#1B2B6B] hover:text-[#CC0000] transition-colors">contact@cadozat.com</a>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-[#C9A84C]/10 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-[#C9A84C]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-500">Horaires</p>
              <p className="font-bold text-[#1B2B6B]">Lun - Sam : 8h00 - 18h00</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

// ── Page principale — useSearchParams enveloppé dans Suspense ──
export default function DevisPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="bg-[#1B2B6B] pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <nav className="flex items-center gap-2 text-sm text-white/60 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
            <span>/</span>
            <span className="text-white">Demande de devis</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            Demande de <span className="text-[#CC0000]">devis</span>
          </h1>
          <p className="text-white/80 text-lg max-w-2xl">
            Remplissez le formulaire ci-dessous et notre équipe commerciale vous contactera dans les plus brefs délais.
          </p>

          {/* Le badge pré-sélectionné est dans DevisForm (a besoin de searchParams) */}
          <Suspense fallback={null}>
            <DevisFormBadge />
          </Suspense>
        </div>
      </div>

      {/* Formulaire enveloppé dans Suspense */}
      <Suspense fallback={
        <div className="max-w-7xl mx-auto px-6 -mt-8 pb-16">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 h-96 flex items-center justify-center">
            <div className="text-gray-400 text-sm">Chargement...</div>
          </div>
        </div>
      }>
        <DevisForm />
      </Suspense>
    </main>
  )
}

// Badge séparé pour le header (nécessite aussi searchParams)
function DevisFormBadge() {
  const searchParams = useSearchParams()
  const param = searchParams.get('vehicule')
  if (!param) return null
  const vehicle = vehiculesData.flatMap(s => s.modeles).find(m => m.value === param)
  if (!vehicle) return null
  return (
    <div className="inline-flex items-center gap-2 mt-5 bg-white/10 border border-white/20 text-white text-sm font-semibold px-4 py-2 rounded-full">
      <svg className="w-4 h-4 text-[#C9A84C]" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414L8.414 15l-4.121-4.121a1 1 0 011.414-1.414L8.414 12.172l6.879-6.879a1 1 0 011.414 0z" clipRule="evenodd"/>
      </svg>
      Véhicule pré-sélectionné :&nbsp;<span className="text-[#C9A84C]">{vehicle.nom}</span>
    </div>
  )
}