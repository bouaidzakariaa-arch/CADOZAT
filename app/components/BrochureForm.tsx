'use client'

// components/BrochureForm.tsx
// Usage :
// <BrochureForm modele="dmax-tfr" marque="isuzu" nomModele="D-MAX TFR" />

import { useState } from 'react'

interface Props {
  modele:    string  // ex: dmax-tfr
  marque:    string  // isuzu | karry | greatwall
  nomModele: string  // ex: D-MAX TFR
}

const MARQUE_CONFIG: Record<string, { color: string; dark: string; light: string }> = {
  isuzu:     { color: '#CC0000', dark: '#990000', light: '#fff5f5' },
  karry:     { color: '#0057A8', dark: '#003f7a', light: '#f0f6ff' },
  greatwall: { color: '#4A4A4A', dark: '#2a2a2a', light: '#f6f6f6' },
}

export default function BrochureForm({ modele, marque, nomModele }: Props) {
  const cfg = MARQUE_CONFIG[marque] || MARQUE_CONFIG.isuzu

  const [formData, setFormData] = useState({
    nom: '', prenom: '', email: '', telephone: '', societe: '',
  })
  const [loading,   setLoading]   = useState(false)
  const [succes,    setSucces]    = useState(false)
  const [erreur,    setErreur]    = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErreur('')

    try {
      /* 1. Enregistrer le lead */
      const res = await fetch('/api/brochure', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          modele,
          marque,
          brochure: `/brochures/${modele}.pdf`,
        }),
      })

      if (!res.ok) throw new Error('Erreur serveur')

      /* 2. Déclencher le téléchargement automatique du PDF */
      const link = document.createElement('a')
      link.href     = `/brochures/${modele}.pdf`
      link.download = `CADOZAT-${nomModele.replace(/\s/g, '-')}.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      setSucces(true)
    } catch {
      setErreur('Une erreur est survenue. Réessayez ou contactez-nous au 0524 885 025.')
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = {
    borderColor: 'rgba(0,0,0,.15)',
    background: '#fafafa',
  }

  return (
    <section className="py-20" style={{ background: `linear-gradient(135deg,${cfg.light} 0%,white 100%)` }}>
      <div className="max-w-4xl mx-auto px-6">

        {/* Header section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8" style={{ background: cfg.color }}/>
            <span className="text-xs font-black tracking-[.25em] uppercase" style={{ color: cfg.color }}>
              Documentation technique
            </span>
            <div className="h-px w-8" style={{ background: cfg.dark }}/>
          </div>
          <h2 className="text-3xl font-black text-gray-900 mb-3">
            Télécharger la brochure
          </h2>
          <p className="text-gray-500 text-sm max-w-md mx-auto">
            Obtenez la fiche technique complète du <strong>{nomModele}</strong> —
            spécifications, dimensions, performances et options disponibles.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden"
          style={{ border: `1px solid ${cfg.color}22` }}>
          <div className="h-1.5" style={{ background: `linear-gradient(to right,${cfg.color},${cfg.dark})` }}/>

          {succes ? (
            /* ── Succès ── */
            <div className="py-16 px-6 text-center">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{ background: `linear-gradient(135deg,${cfg.color},${cfg.dark})` }}>
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-3">
                Votre brochure est en cours de téléchargement !
              </h3>
              <p className="text-gray-500 text-sm max-w-md mx-auto mb-6">
                La fiche technique du <strong>{nomModele}</strong> se télécharge automatiquement.
                Si le téléchargement ne démarre pas,{' '}
                <a href={`/brochures/${modele}.pdf`} download
                  className="font-bold underline" style={{ color: cfg.color }}>
                  cliquez ici
                </a>.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <button onClick={() => setSucces(false)}
                  className="px-6 py-2.5 rounded-xl font-bold text-sm border transition-all hover:scale-105"
                  style={{ borderColor: cfg.color, color: cfg.color }}>
                  Télécharger une autre brochure
                </button>
                <a href="/devis"
                  className="px-6 py-2.5 rounded-xl font-bold text-sm text-white transition-all hover:scale-105"
                  style={{ background: `linear-gradient(135deg,${cfg.color},${cfg.dark})` }}>
                  Demander un devis →
                </a>
              </div>
            </div>
          ) : (
            /* ── Formulaire ── */
            <form onSubmit={handleSubmit} className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                {/* Prénom */}
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2">
                    Prénom *
                  </label>
                  <input type="text" required placeholder="Votre prénom"
                    value={formData.prenom}
                    onChange={e => setFormData({...formData, prenom: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border text-sm font-medium focus:outline-none transition-all"
                    style={inputStyle}
                    onFocus={e => (e.target.style.borderColor = cfg.color)}
                    onBlur={e  => (e.target.style.borderColor = 'rgba(0,0,0,.15)')}/>
                </div>

                {/* Nom */}
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2">
                    Nom *
                  </label>
                  <input type="text" required placeholder="Votre nom"
                    value={formData.nom}
                    onChange={e => setFormData({...formData, nom: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border text-sm font-medium focus:outline-none transition-all"
                    style={inputStyle}
                    onFocus={e => (e.target.style.borderColor = cfg.color)}
                    onBlur={e  => (e.target.style.borderColor = 'rgba(0,0,0,.15)')}/>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2">
                    Email *
                  </label>
                  <input type="email" required placeholder="votre@email.com"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border text-sm font-medium focus:outline-none transition-all"
                    style={inputStyle}
                    onFocus={e => (e.target.style.borderColor = cfg.color)}
                    onBlur={e  => (e.target.style.borderColor = 'rgba(0,0,0,.15)')}/>
                </div>

                {/* Téléphone */}
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2">
                    Téléphone
                  </label>
                  <input type="tel" placeholder="06XX XX XX XX"
                    value={formData.telephone}
                    onChange={e => setFormData({...formData, telephone: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border text-sm font-medium focus:outline-none transition-all"
                    style={inputStyle}
                    onFocus={e => (e.target.style.borderColor = cfg.color)}
                    onBlur={e  => (e.target.style.borderColor = 'rgba(0,0,0,.15)')}/>
                </div>

                {/* Société */}
                <div className="md:col-span-2">
                  <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2">
                    Société / Organisation
                  </label>
                  <input type="text" placeholder="Nom de votre entreprise ou organisation (optionnel)"
                    value={formData.societe}
                    onChange={e => setFormData({...formData, societe: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border text-sm font-medium focus:outline-none transition-all"
                    style={inputStyle}
                    onFocus={e => (e.target.style.borderColor = cfg.color)}
                    onBlur={e  => (e.target.style.borderColor = 'rgba(0,0,0,.15)')}/>
                </div>

              </div>

              {/* Erreur */}
              {erreur && (
                <div className="mt-4 p-3 rounded-xl text-sm font-medium text-red-700 bg-red-50 border border-red-200">
                  {erreur}
                </div>
              )}

              {/* Submit */}
              <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs text-gray-400 max-w-xs">
                  Vos informations restent confidentielles et ne seront jamais partagées.
                </p>
                <button type="submit" disabled={loading}
                  className="flex items-center gap-2.5 px-8 py-3.5 rounded-xl font-extrabold text-white transition-all hover:scale-105 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed flex-shrink-0"
                  style={{ background: `linear-gradient(135deg,${cfg.color},${cfg.dark})`, boxShadow: `0 4px 20px ${cfg.color}44` }}>
                  {loading ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                      </svg>
                      Préparation...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
                          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                      </svg>
                      Télécharger la brochure
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Badge PDF */}
        <div className="flex items-center justify-center gap-3 mt-6">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold"
            style={{ background: `${cfg.color}12`, color: cfg.color, border: `1px solid ${cfg.color}22` }}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
            Brochure PDF officielle — {nomModele}
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold"
            style={{ background: '#f0faf5', color: '#2D6A4F', border: '1px solid rgba(45,106,79,.2)' }}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
            </svg>
            Données sécurisées & confidentielles
          </div>
        </div>
      </div>
    </section>
  )
}