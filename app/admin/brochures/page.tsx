'use client'

// app/admin/brochures/page.tsx

import { useState, useEffect, useCallback } from 'react'

interface LeadBrochure {
  id:        number
  nom:       string
  prenom:    string
  email:     string
  telephone: string | null
  societe:   string | null
  modele:    string
  marque:    string
  brochure:  string
  lu:        boolean
  createdAt: string
}

const MARQUE_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  isuzu:     { label: 'Isuzu',      color: '#CC0000', bg: '#fff5f5' },
  karry:     { label: 'Karry',      color: '#0057A8', bg: '#f0f6ff' },
  greatwall: { label: 'Great Wall', color: '#4A4A4A', bg: '#f6f6f6' },
}

export default function AdminBrochuresPage() {
  const [leads,    setLeads]    = useState<LeadBrochure[]>([])
  const [total,    setTotal]    = useState(0)
  const [page,     setPage]     = useState(1)
  const [pages,    setPages]    = useState(1)
  const [loading,  setLoading]  = useState(true)
  const [selected, setSelected] = useState<LeadBrochure | null>(null)
  const [filtreMarque, setFiltreMarque] = useState('')

  const charger = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (filtreMarque) params.set('marque', filtreMarque)
      params.set('page', String(page))
      const res  = await fetch(`/api/brochure?${params}`)
      const data = await res.json()
      setLeads(data.leads || [])
      setTotal(data.total || 0)
      setPages(data.pages || 1)
    } catch (e) { console.error(e) }
    finally { setLoading(false) }
  }, [filtreMarque, page])

  useEffect(() => { charger() }, [charger])

  const fmtDate  = (d: string) => new Date(d).toLocaleDateString('fr-MA', { day:'2-digit', month:'short', year:'numeric' })
  const fmtHeure = (d: string) => new Date(d).toLocaleTimeString('fr-MA', { hour:'2-digit', minute:'2-digit' })
  const nouveaux = leads.filter(l => !l.lu).length

  return (
    <div className="min-h-screen" style={{ background: '#f4f4f4' }}>

      {/* Header */}
      <div className="bg-white border-b px-8 py-5 flex items-center justify-between"
        style={{ borderColor: 'rgba(0,0,0,.08)' }}>
        <div>
          <h1 className="text-2xl font-black text-gray-900">Leads Brochures</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {total} téléchargement{total > 1 ? 's' : ''} au total
            {nouveaux > 0 && (
              <span className="ml-2 px-2 py-0.5 rounded-full text-xs font-black text-white"
                style={{ background: '#CC0000' }}>
                {nouveaux} nouveau{nouveaux > 1 ? 'x' : ''}
              </span>
            )}
          </p>
        </div>
        <button onClick={charger}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold border transition-all hover:bg-gray-50"
          style={{ borderColor: 'rgba(0,0,0,.12)' }}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
          </svg>
          Actualiser
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* Filtres */}
        <div className="bg-white rounded-2xl border p-5 mb-6 flex flex-wrap gap-4 items-center"
          style={{ borderColor: 'rgba(0,0,0,.08)' }}>
          <span className="text-xs font-black uppercase tracking-widest text-gray-400">Filtrer par marque</span>
          <div className="flex gap-2 flex-wrap">
            <button onClick={() => { setFiltreMarque(''); setPage(1) }}
              className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all"
              style={{ background: !filtreMarque ? '#CC0000' : '#f3f4f6', color: !filtreMarque ? 'white' : '#374151' }}>
              Toutes
            </button>
            {Object.entries(MARQUE_CONFIG).map(([k, v]) => (
              <button key={k} onClick={() => { setFiltreMarque(k); setPage(1) }}
                className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all"
                style={{
                  background: filtreMarque === k ? v.color : v.bg,
                  color: filtreMarque === k ? 'white' : v.color,
                }}>
                {v.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-6">

          {/* Liste */}
          <div className="flex-1 space-y-3">
            {loading ? (
              <div className="bg-white rounded-2xl border p-12 text-center" style={{ borderColor: 'rgba(0,0,0,.08)' }}>
                <div className="w-8 h-8 border-2 border-red-200 border-t-red-600 rounded-full animate-spin mx-auto mb-3"/>
                <p className="text-sm text-gray-400">Chargement...</p>
              </div>
            ) : leads.length === 0 ? (
              <div className="bg-white rounded-2xl border p-12 text-center" style={{ borderColor: 'rgba(0,0,0,.08)' }}>
                <p className="text-gray-400 text-sm">Aucun lead trouvé</p>
              </div>
            ) : leads.map(l => {
              const m = MARQUE_CONFIG[l.marque] || MARQUE_CONFIG.isuzu
              const isSelected = selected?.id === l.id
              return (
                <div key={l.id}
                  onClick={() => setSelected(isSelected ? null : l)}
                  className="bg-white rounded-2xl border cursor-pointer transition-all hover:shadow-md"
                  style={{ borderColor: isSelected ? m.color : 'rgba(0,0,0,.08)', borderWidth: isSelected ? 2 : 1 }}>
                  <div className="p-5 flex items-center gap-4">
                    {/* Avatar initiales */}
                    <div className="w-10 h-10 rounded-full flex items-center justify-center font-black text-sm text-white flex-shrink-0"
                      style={{ background: `linear-gradient(135deg,${m.color},${m.color}cc)` }}>
                      {l.prenom[0]}{l.nom[0]}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="font-extrabold text-gray-900">{l.prenom} {l.nom}</span>
                        <span className="text-xs font-black px-2 py-0.5 rounded-full"
                          style={{ background: m.bg, color: m.color }}>
                          {m.label}
                        </span>
                        {!l.lu && (
                          <span className="text-xs font-black px-2 py-0.5 rounded-full text-white"
                            style={{ background: '#CC0000' }}>Nouveau</span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-xs text-gray-500 flex-wrap">
                        <span>{l.email}</span>
                        <span>·</span>
                        <span className="font-bold uppercase">{l.modele.replace(/-/g, ' ')}</span>
                        {l.societe && <><span>·</span><span>{l.societe}</span></>}
                      </div>
                    </div>

                    <div className="text-right flex-shrink-0">
                      <div className="text-xs font-bold text-gray-400">{fmtDate(l.createdAt)}</div>
                      <div className="text-xs text-gray-300">{fmtHeure(l.createdAt)}</div>
                      <a href={l.brochure} download target="_blank"
                        className="inline-flex items-center gap-1 mt-1.5 text-xs font-bold hover:underline"
                        style={{ color: m.color }}
                        onClick={e => e.stopPropagation()}>
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3"/>
                        </svg>
                        PDF
                      </a>
                    </div>
                  </div>
                </div>
              )
            })}

            {/* Pagination */}
            {pages > 1 && (
              <div className="flex items-center justify-center gap-3 pt-4">
                <button onClick={() => setPage(p => Math.max(1, p-1))} disabled={page === 1}
                  className="px-4 py-2 rounded-lg text-sm font-bold border disabled:opacity-40"
                  style={{ borderColor: 'rgba(0,0,0,.12)' }}>← Précédent</button>
                <span className="text-sm text-gray-500 font-medium">Page {page} / {pages}</span>
                <button onClick={() => setPage(p => Math.min(pages, p+1))} disabled={page === pages}
                  className="px-4 py-2 rounded-lg text-sm font-bold border disabled:opacity-40"
                  style={{ borderColor: 'rgba(0,0,0,.12)' }}>Suivant →</button>
              </div>
            )}
          </div>

          {/* Panneau détail */}
          {selected && (
            <div className="w-80 flex-shrink-0">
              <div className="bg-white rounded-2xl border sticky top-6 overflow-hidden"
                style={{ borderColor: 'rgba(0,0,0,.08)' }}>
                {(() => {
                  const m = MARQUE_CONFIG[selected.marque] || MARQUE_CONFIG.isuzu
                  return (
                    <>
                      <div className="px-6 py-4 flex items-center justify-between border-b"
                        style={{ borderColor: 'rgba(0,0,0,.07)', background: '#fafafa' }}>
                        <h3 className="font-extrabold text-gray-900">Détails #{selected.id}</h3>
                        <button onClick={() => setSelected(null)}
                          className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-gray-200">
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                          </svg>
                        </button>
                      </div>

                      <div className="p-6 space-y-5">
                        {/* Contact */}
                        <div>
                          <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-3">Contact</p>
                          <p className="font-extrabold text-gray-900">{selected.prenom} {selected.nom}</p>
                          <a href={`mailto:${selected.email}`} className="text-sm font-bold hover:underline block mt-1" style={{ color: m.color }}>{selected.email}</a>
                          {selected.telephone && <a href={`tel:${selected.telephone}`} className="text-sm font-bold hover:underline block mt-1" style={{ color: m.color }}>{selected.telephone}</a>}
                          {selected.societe && <p className="text-sm text-gray-500 mt-1">{selected.societe}</p>}
                        </div>

                        <div className="h-px bg-gray-100"/>

                        {/* Brochure */}
                        <div>
                          <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-3">Brochure</p>
                          <div className="p-3 rounded-xl" style={{ background: m.bg, border: `1px solid ${m.color}22` }}>
                            <p className="font-bold text-sm" style={{ color: m.color }}>{m.label}</p>
                            <p className="font-black text-gray-900 text-sm">{selected.modele.toUpperCase().replace(/-/g, ' ')}</p>
                          </div>
                          <a href={selected.brochure} download target="_blank"
                            className="flex items-center justify-center gap-2 w-full mt-3 py-2.5 rounded-xl font-bold text-sm text-white transition-all hover:scale-105"
                            style={{ background: `linear-gradient(135deg,${m.color},${m.color}cc)` }}>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                            </svg>
                            Télécharger le PDF
                          </a>
                        </div>

                        <p className="text-xs text-gray-400 text-center">
                          {fmtDate(selected.createdAt)} à {fmtHeure(selected.createdAt)}
                        </p>
                      </div>
                    </>
                  )
                })()}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}