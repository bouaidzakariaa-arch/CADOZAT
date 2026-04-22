'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

interface Devis {
  id: string
  nom: string
  prenom: string
  societe?: string
  telephone: string
  email: string
  ville: string
  vehicule: string
  message?: string
  newsletter: boolean
  date: string
  statut: 'nouveau' | 'en_cours' | 'traite' | 'refuse'
  notes?: string
}

const STATUTS = {
  nouveau: { label: 'Nouveau', color: 'bg-blue-100 text-blue-800', dot: 'bg-blue-500' },
  en_cours: { label: 'En cours', color: 'bg-yellow-100 text-yellow-800', dot: 'bg-yellow-500' },
  traite: { label: 'Traité', color: 'bg-green-100 text-green-800', dot: 'bg-green-500' },
  refuse: { label: 'Refusé', color: 'bg-red-100 text-red-800', dot: 'bg-red-500' },
}

const VEHICULES: { [key: string]: string } = {
  'dmax-tfr-sc-4x2': 'D-MAX TFR — Pick-up SC 4×2',
  'dmax-tfr-sc-4x2-clim': 'D-MAX TFR — Pick-up SC 4×2 Clim',
  'dmax-tfr-dc-4x2': 'D-MAX TFR — Pick-up DC 4×2',
  'dmax-tfs-dc-4x4': 'D-MAX TFS — Pick-up DC 4×4',
  'nmr-77e': 'NMR 77E — 3.5T Châssis court',
  'nmr-85h': 'NMR 85H — 3.5T Châssis long',
  'nnr-85h': 'NNR 85H — 3.5T Châssis long',
  'npr-75k': 'NPR 75K — 7.5T Châssis court',
  'npr-75l': 'NPR 75L — 7.5T Châssis long',
  'nqr-90k': 'NQR 90K — 9.5T Châssis court',
  'nqr-90m': 'NQR 90M — 9.5T Châssis long',
  'ftr-34k': 'FTR 34K — 16T Châssis court',
  'ftr-34m': 'FTR 34M — 16T Châssis intermédiaire',
  'ftr-34p': 'FTR 34P — 16T Châssis long',
  'fvr-34k': 'FVR 34K — 18T Châssis court',
  'fvr-34p': 'FVR 34P — 18T Châssis long',
  'karry-22b': 'Karry 22B — Fourgon utilitaire',
  'karry-22q': 'Karry 22Q — Fourgon utilitaire',
  'great-wall-sc': 'Great Wall Pick-up SC — Simple cabine',
  'great-wall-dc': 'Great Wall Pick-up DC — Double cabine',
}

export default function AdminDevisPage() {
  const router = useRouter()
  const [devis, setDevis] = useState<Devis[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedDevis, setSelectedDevis] = useState<Devis | null>(null)
  const [filterStatut, setFilterStatut] = useState('tous')
  const [searchTerm, setSearchTerm] = useState('')

  // Modal envoi devis
  const [showSendModal, setShowSendModal] = useState(false)
  const [sendMessage, setSendMessage] = useState('')
  const [sendFile, setSendFile] = useState<File | null>(null)
  const [sending, setSending] = useState(false)
  const [sendSuccess, setSendSuccess] = useState(false)
  const [sendError, setSendError] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    fetchDevis()
  }, [])

  const fetchDevis = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/devis')
      if (response.status === 401) {
        router.push('/admin/login')
        return
      }
      if (response.ok) {
        const data = await response.json()
        setDevis(data)
      }
    } catch (error) {
      console.error('Erreur:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/admin/login')
    router.refresh()
  }

  const updateStatut = async (id: string, statut: string) => {
    try {
      const response = await fetch('/api/devis', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, statut }),
      })
      if (response.ok) {
        setDevis(prev => prev.map(d => d.id === id ? { ...d, statut: statut as Devis['statut'] } : d))
        if (selectedDevis?.id === id) {
          setSelectedDevis(prev => prev ? { ...prev, statut: statut as Devis['statut'] } : null)
        }
      }
    } catch (error) {
      console.error('Erreur:', error)
    }
  }

  const deleteDevis = async (id: string) => {
    if (!confirm('Supprimer cette demande ?')) return
    try {
      const response = await fetch(`/api/devis?id=${id}`, { method: 'DELETE' })
      if (response.ok) {
        setDevis(prev => prev.filter(d => d.id !== id))
        setSelectedDevis(null)
      }
    } catch (error) {
      console.error('Erreur:', error)
    }
  }

  const handleSendDevis = async () => {
    if (!selectedDevis) return
    setSending(true)
    setSendError('')
    setSendSuccess(false)

    try {
      const formData = new FormData()
      formData.append('email', selectedDevis.email)
      formData.append('name', `${selectedDevis.prenom} ${selectedDevis.nom}`)
      formData.append('vehicule', VEHICULES[selectedDevis.vehicule] || selectedDevis.vehicule)
      formData.append('message', sendMessage)
      if (sendFile) formData.append('file', sendFile)

      const response = await fetch('/api/send-devis', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        setSendSuccess(true)
        // Marquer comme traité automatiquement
        await updateStatut(selectedDevis.id, 'traite')
        setTimeout(() => {
          setShowSendModal(false)
          setSendSuccess(false)
          setSendMessage('')
          setSendFile(null)
        }, 2000)
      } else {
        setSendError('Erreur lors de l\'envoi. Vérifiez la configuration Gmail.')
      }
    } catch {
      setSendError('Erreur réseau.')
    } finally {
      setSending(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
    })
  }

  const filteredDevis = devis.filter(d => {
    const matchStatut = filterStatut === 'tous' || d.statut === filterStatut
    const matchSearch = searchTerm === '' ||
      `${d.nom} ${d.prenom} ${d.email} ${d.telephone} ${d.societe || ''}`.toLowerCase().includes(searchTerm.toLowerCase())
    return matchStatut && matchSearch
  })

  const stats = {
    total: devis.length,
    nouveau: devis.filter(d => d.statut === 'nouveau').length,
    en_cours: devis.filter(d => d.statut === 'en_cours').length,
    traite: devis.filter(d => d.statut === 'traite').length,
  }

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Header admin */}
      <header className="bg-[#1B2B6B] text-white py-4 px-6 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="font-black text-xl">CADOZAT</span>
            <span className="text-white/30">|</span>
            <span className="flex items-center gap-2 font-semibold text-sm">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              Administration
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={fetchDevis}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              title="Actualiser"
            >
              <svg className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-red-500 rounded-lg transition-colors text-sm font-medium"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Déconnexion
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Total', value: stats.total, color: 'text-[#1B2B6B]' },
            { label: 'Nouveaux', value: stats.nouveau, color: 'text-blue-600' },
            { label: 'En cours', value: stats.en_cours, color: 'text-yellow-600' },
            { label: 'Traités', value: stats.traite, color: 'text-green-600' },
          ].map((s, i) => (
            <div key={i} className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
              <p className="text-sm text-gray-500 mb-1">{s.label}</p>
              <p className={`text-3xl font-black ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Filtres */}
        <div className="bg-white rounded-xl p-4 border border-gray-200 mb-6 flex flex-wrap gap-4 items-center shadow-sm">
          <div className="flex-1 min-w-[200px] relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Rechercher un client..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:border-[#CC0000] focus:outline-none text-sm"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {['tous', 'nouveau', 'en_cours', 'traite', 'refuse'].map((s) => (
              <button
                key={s}
                onClick={() => setFilterStatut(s)}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                  filterStatut === s ? 'bg-[#1B2B6B] text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {s === 'tous' ? 'Tous' : STATUTS[s as keyof typeof STATUTS]?.label}
              </button>
            ))}
          </div>
        </div>

        {/* Liste + Détails */}
        <div className="flex gap-6">

          {/* Liste */}
          <div className="flex-1 min-w-0">
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
              <div className="p-4 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
                <h2 className="font-bold text-[#1B2B6B]">Demandes ({filteredDevis.length})</h2>
              </div>
              {loading ? (
                <div className="p-16 text-center text-gray-400">
                  <svg className="animate-spin w-8 h-8 mx-auto mb-3" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                  </svg>
                  Chargement...
                </div>
              ) : filteredDevis.length === 0 ? (
                <div className="p-16 text-center text-gray-400">Aucune demande</div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {filteredDevis.map((d) => (
                    <div
                      key={d.id}
                      onClick={() => setSelectedDevis(d)}
                      className={`p-4 cursor-pointer hover:bg-gray-50 transition-all ${
                        selectedDevis?.id === d.id ? 'bg-blue-50 border-l-4 border-[#CC0000]' : 'border-l-4 border-transparent'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-1">
                        <p className="font-bold text-[#1B2B6B]">{d.prenom} {d.nom}</p>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${STATUTS[d.statut]?.color}`}>
                          {STATUTS[d.statut]?.label}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mb-1">{VEHICULES[d.vehicule] || d.vehicule}</p>
                      <p className="text-xs text-gray-400">{formatDate(d.date)} · {d.ville}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Détails */}
          {selectedDevis && (
            <div className="w-96 flex-shrink-0">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm sticky top-24">

                {/* Header détail */}
                <div className="bg-[#1B2B6B] rounded-t-xl p-4 flex items-center justify-between">
                  <h3 className="font-bold text-white">Détails de la demande</h3>
                  <button onClick={() => setSelectedDevis(null)} className="text-white/60 hover:text-white text-lg leading-none">✕</button>
                </div>

                <div className="p-5 space-y-5">

                  {/* Changer statut */}
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-2 font-semibold">Statut</p>
                    <div className="flex gap-2 flex-wrap">
                      {Object.entries(STATUTS).map(([key, val]) => (
                        <button
                          key={key}
                          onClick={() => updateStatut(selectedDevis.id, key)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                            selectedDevis.statut === key
                              ? `${val.color} border-transparent`
                              : 'bg-white text-gray-400 border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          {val.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Véhicule */}
                  <div className="bg-red-50 rounded-xl p-4">
                    <p className="text-xs text-[#CC0000] font-bold uppercase tracking-wider mb-1">Véhicule demandé</p>
                    <p className="font-bold text-[#1B2B6B] text-sm">{VEHICULES[selectedDevis.vehicule] || selectedDevis.vehicule}</p>
                  </div>

                  {/* Infos client */}
                  <div className="space-y-2">
                    <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Client</p>
                    <p className="font-bold text-[#1B2B6B]">{selectedDevis.prenom} {selectedDevis.nom}</p>
                    {selectedDevis.societe && <p className="text-gray-500 text-sm">{selectedDevis.societe}</p>}
                    <a href={`tel:${selectedDevis.telephone}`} className="flex items-center gap-2 text-green-600 font-medium text-sm hover:underline">
                      📞 {selectedDevis.telephone}
                    </a>
                    <a href={`mailto:${selectedDevis.email}`} className="flex items-center gap-2 text-blue-600 text-sm hover:underline break-all">
                      ✉️ {selectedDevis.email}
                    </a>
                    <p className="text-gray-500 text-sm">📍 {selectedDevis.ville}</p>
                    <p className="text-gray-400 text-xs">{formatDate(selectedDevis.date)}</p>
                  </div>

                  {/* Message client */}
                  {selectedDevis.message && (
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-2">Message du client</p>
                      <p className="bg-gray-50 p-3 rounded-lg text-sm text-gray-700 leading-relaxed">{selectedDevis.message}</p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-2 pt-2 border-t border-gray-100">
                    <button
                      onClick={() => { setShowSendModal(true); setSendSuccess(false); setSendError('') }}
                      className="flex-1 py-2.5 bg-[#CC0000] hover:bg-[#aa0000] text-white font-bold rounded-xl transition-all text-sm flex items-center justify-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                      Envoyer devis
                    </button>
                    <button
                      onClick={() => deleteDevis(selectedDevis.id)}
                      className="p-2.5 text-red-500 hover:bg-red-50 border border-red-200 rounded-xl transition-all"
                      title="Supprimer"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal envoi devis */}
      {showSendModal && selectedDevis && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">

            <div className="bg-[#1B2B6B] p-5 flex items-center justify-between">
              <div>
                <h3 className="font-black text-white text-lg">Envoyer le devis</h3>
                <p className="text-white/60 text-sm mt-0.5">à {selectedDevis.prenom} {selectedDevis.nom}</p>
              </div>
              <button onClick={() => setShowSendModal(false)} className="text-white/60 hover:text-white text-2xl leading-none">✕</button>
            </div>

            <div className="p-6 space-y-5">

              {/* Destinataire */}
              <div className="bg-blue-50 rounded-xl p-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-sm">
                  {selectedDevis.prenom[0]}{selectedDevis.nom[0]}
                </div>
                <div>
                  <p className="font-bold text-[#1B2B6B] text-sm">{selectedDevis.prenom} {selectedDevis.nom}</p>
                  <p className="text-blue-600 text-sm">{selectedDevis.email}</p>
                </div>
              </div>

              {/* Véhicule */}
              <div className="bg-gray-50 rounded-xl p-3">
                <p className="text-xs text-gray-400 mb-0.5">Objet : </p>
                <p className="font-semibold text-[#1B2B6B] text-sm">Votre devis CADOZAT — {VEHICULES[selectedDevis.vehicule]}</p>
              </div>

              {/* Message personnalisé */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Message personnalisé <span className="text-gray-400 font-normal">(optionnel)</span>
                </label>
                <textarea
                  value={sendMessage}
                  onChange={(e) => setSendMessage(e.target.value)}
                  rows={4}
                  placeholder="Ajoutez un message personnalisé au client..."
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#CC0000] focus:outline-none text-sm resize-none transition-colors"
                />
              </div>

              {/* Fichier */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Joindre le devis <span className="text-gray-400 font-normal">(PDF, DOC, XLS...)</span>
                </label>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${
                    sendFile ? 'border-green-400 bg-green-50' : 'border-gray-200 hover:border-[#CC0000] hover:bg-red-50'
                  }`}
                >
                  {sendFile ? (
                    <div>
                      <div className="text-2xl mb-2">📎</div>
                      <p className="font-semibold text-green-700 text-sm">{sendFile.name}</p>
                      <p className="text-green-500 text-xs mt-1">{(sendFile.size / 1024).toFixed(0)} KB</p>
                      <button
                        onClick={(e) => { e.stopPropagation(); setSendFile(null) }}
                        className="mt-2 text-xs text-red-500 hover:underline"
                      >
                        Supprimer
                      </button>
                    </div>
                  ) : (
                    <div>
                      <div className="text-3xl mb-2">📁</div>
                      <p className="text-gray-500 text-sm">Cliquez pour importer un fichier</p>
                      <p className="text-gray-400 text-xs mt-1">PDF, DOC, DOCX, XLS, XLSX</p>
                    </div>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx,.xls,.xlsx"
                  className="hidden"
                  onChange={(e) => setSendFile(e.target.files?.[0] || null)}
                />
              </div>

              {/* Erreur / Succès */}
              {sendError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                  {sendError}
                </div>
              )}
              {sendSuccess && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Devis envoyé avec succès ! Statut mis à jour → Traité.
                </div>
              )}

              {/* Boutons */}
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setShowSendModal(false)}
                  className="flex-1 py-3 border-2 border-gray-200 text-gray-600 font-bold rounded-xl hover:bg-gray-50 transition-all text-sm"
                >
                  Annuler
                </button>
                <button
                  onClick={handleSendDevis}
                  disabled={sending || sendSuccess}
                  className="flex-1 py-3 bg-[#CC0000] hover:bg-[#aa0000] text-white font-bold rounded-xl transition-all text-sm disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {sending ? (
                    <>
                      <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                      </svg>
                      Envoi...
                    </>
                  ) : sendSuccess ? '✓ Envoyé !' : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                      Envoyer
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}