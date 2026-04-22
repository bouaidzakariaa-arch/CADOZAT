'use client'

// app/admin/rdv/page.tsx

import { useState, useEffect, useCallback } from 'react'

/* ── Types ── */
type StatutRDV = 'NOUVEAU' | 'CONFIRME' | 'EN_COURS' | 'TERMINE' | 'ANNULE'

interface DemandeRDV {
  id:        number
  nom:       string
  telephone: string
  marque:    string
  vehicule:  string | null
  type:      string
  atelier:   string
  message:   string | null
  statut:    StatutRDV
  lu:        boolean
  createdAt: string
}

/* ── Labels ── */
const MARQUES: Record<string, string> = {
  isuzu: 'Isuzu', karry: 'Karry', greatwall: 'Great Wall',
}
const TYPES: Record<string, string> = {
  revision:   'Révision',    reparation: 'Réparation',
  garantie:   'Garantie',    diagnostic: 'Diagnostic',
  pieces:     'Pièces',      autre:      'Autre',
}
const ATELIERS: Record<string, string> = {
  ouarzazate: 'Ouarzazate', agadir: 'Agadir',
  tinghir:    'Tinghir',    mobile: 'Mobile',
}

/* ── Config statuts ── */
const STATUTS: Record<StatutRDV, { label: string; color: string; bg: string; dot: string }> = {
  NOUVEAU:  { label: 'Nouveau',   color: '#CC0000', bg: '#fff5f5', dot: '#CC0000' },
  CONFIRME: { label: 'Confirmé',  color: '#0057A8', bg: '#f0f6ff', dot: '#0057A8' },
  EN_COURS: { label: 'En cours',  color: '#e8a020', bg: '#fffbf0', dot: '#e8a020' },
  TERMINE:  { label: 'Terminé',   color: '#2D6A4F', bg: '#f0faf5', dot: '#2D6A4F' },
  ANNULE:   { label: 'Annulé',    color: '#9ca3af', bg: '#f9fafb', dot: '#9ca3af' },
}

const MARQUE_COLORS: Record<string, string> = {
  isuzu: '#CC0000', karry: '#0057A8', greatwall: '#4A4A4A',
}

/* ══════════════════════════════════════════
   PAGE ADMIN RDV
   ══════════════════════════════════════════ */
export default function AdminRDVPage() {
  const [demandes, setDemandes]     = useState<DemandeRDV[]>([])
  const [total, setTotal]           = useState(0)
  const [page, setPage]             = useState(1)
  const [pages, setPages]           = useState(1)
  const [loading, setLoading]       = useState(true)
  const [selected, setSelected]     = useState<DemandeRDV | null>(null)
  const [filtreStatut, setFiltreStatut]   = useState('')
  const [filtreAtelier, setFiltreAtelier] = useState('')

  /* ── Chargement ── */
  const charger = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (filtreStatut)  params.set('statut',  filtreStatut)
      if (filtreAtelier) params.set('atelier', filtreAtelier)
      params.set('page', String(page))

      const res  = await fetch(`/api/rdv?${params}`)
      const data = await res.json()
      setDemandes(data.demandes || [])
      setTotal(data.total || 0)
      setPages(data.pages || 1)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }, [filtreStatut, filtreAtelier, page])

  useEffect(() => { charger() }, [charger])

  /* ── Changer statut ── */
  const changerStatut = async (id: number, statut: StatutRDV) => {
    await fetch(`/api/rdv/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ statut }),
    })
    charger()
    if (selected?.id === id) setSelected(prev => prev ? { ...prev, statut } : null)
  }

  /* ── Compteurs par statut ── */
  const nouveaux = demandes.filter(d => d.statut === 'NOUVEAU').length

  /* ── Formatage date ── */
  const fmtDate = (d: string) =>
    new Date(d).toLocaleDateString('fr-MA', { day: '2-digit', month: 'short', year: 'numeric' })
  const fmtHeure = (d: string) =>
    new Date(d).toLocaleTimeString('fr-MA', { hour: '2-digit', minute: '2-digit' })

  return (
    <div className="min-h-screen" style={{ background: '#f4f4f4' }}>

      {/* ── Header ── */}
      <div className="bg-white border-b px-8 py-5 flex items-center justify-between"
        style={{ borderColor: 'rgba(0,0,0,.08)' }}>
        <div>
          <h1 className="text-2xl font-black text-gray-900">Demandes RDV — SAV</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {total} demande{total > 1 ? 's' : ''} au total
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

        {/* ── Filtres ── */}
        <div className="bg-white rounded-2xl border p-5 mb-6 flex flex-wrap gap-4 items-center"
          style={{ borderColor: 'rgba(0,0,0,.08)' }}>
          <span className="text-xs font-black uppercase tracking-widest text-gray-400">Filtrer par</span>

          {/* Statut */}
          <div className="flex gap-2 flex-wrap">
            <button onClick={() => { setFiltreStatut(''); setPage(1) }}
              className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all"
              style={{ background: !filtreStatut ? '#CC0000' : '#f3f4f6', color: !filtreStatut ? 'white' : '#374151' }}>
              Tous
            </button>
            {(Object.keys(STATUTS) as StatutRDV[]).map(s => (
              <button key={s} onClick={() => { setFiltreStatut(s); setPage(1) }}
                className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all"
                style={{
                  background: filtreStatut === s ? STATUTS[s].color : STATUTS[s].bg,
                  color: filtreStatut === s ? 'white' : STATUTS[s].color,
                }}>
                {STATUTS[s].label}
              </button>
            ))}
          </div>

          <div className="h-5 w-px bg-gray-200"/>

          {/* Atelier */}
          <select value={filtreAtelier} onChange={e => { setFiltreAtelier(e.target.value); setPage(1) }}
            className="px-3 py-1.5 rounded-lg text-xs font-bold border focus:outline-none"
            style={{ borderColor: 'rgba(0,0,0,.12)', color: '#374151' }}>
            <option value="">Tous les ateliers</option>
            {Object.entries(ATELIERS).map(([v, l]) => (
              <option key={v} value={v}>{l}</option>
            ))}
          </select>
        </div>

        <div className="flex gap-6">

          {/* ── Liste demandes ── */}
          <div className="flex-1 space-y-3">
            {loading ? (
              <div className="bg-white rounded-2xl border p-12 text-center"
                style={{ borderColor: 'rgba(0,0,0,.08)' }}>
                <div className="w-8 h-8 border-2 border-red-200 border-t-red-600 rounded-full animate-spin mx-auto mb-3"/>
                <p className="text-sm text-gray-400">Chargement...</p>
              </div>
            ) : demandes.length === 0 ? (
              <div className="bg-white rounded-2xl border p-12 text-center"
                style={{ borderColor: 'rgba(0,0,0,.08)' }}>
                <p className="text-gray-400 text-sm">Aucune demande trouvée</p>
              </div>
            ) : demandes.map(d => {
              const st = STATUTS[d.statut]
              const isSelected = selected?.id === d.id
              return (
                <div key={d.id}
                  onClick={() => setSelected(isSelected ? null : d)}
                  className="bg-white rounded-2xl border cursor-pointer transition-all hover:shadow-md"
                  style={{
                    borderColor: isSelected ? '#CC0000' : 'rgba(0,0,0,.08)',
                    borderWidth: isSelected ? 2 : 1,
                  }}>
                  <div className="p-5 flex items-center gap-4">

                    {/* Point statut */}
                    <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: st.dot }}/>

                    {/* Infos principales */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="font-extrabold text-gray-900">{d.nom}</span>
                        <span className="text-xs font-black px-2 py-0.5 rounded-full"
                          style={{ background: `${MARQUE_COLORS[d.marque]}15`, color: MARQUE_COLORS[d.marque] }}>
                          {MARQUES[d.marque] || d.marque}
                        </span>
                        {!d.lu && (
                          <span className="text-xs font-black px-2 py-0.5 rounded-full text-white"
                            style={{ background: '#CC0000' }}>
                            Nouveau
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-xs text-gray-500 flex-wrap">
                        <span>{d.telephone}</span>
                        <span>·</span>
                        <span>{TYPES[d.type] || d.type}</span>
                        <span>·</span>
                        <span>{ATELIERS[d.atelier] || d.atelier}</span>
                        {d.vehicule && <><span>·</span><span>{d.vehicule}</span></>}
                      </div>
                    </div>

                    {/* Date + statut */}
                    <div className="text-right flex-shrink-0">
                      <div className="text-xs font-bold text-gray-400">{fmtDate(d.createdAt)}</div>
                      <div className="text-xs text-gray-300">{fmtHeure(d.createdAt)}</div>
                      <span className="inline-block mt-1.5 text-xs font-bold px-2.5 py-0.5 rounded-full"
                        style={{ background: st.bg, color: st.color }}>
                        {st.label}
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}

            {/* Pagination */}
            {pages > 1 && (
              <div className="flex items-center justify-center gap-3 pt-4">
                <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                  className="px-4 py-2 rounded-lg text-sm font-bold border disabled:opacity-40 transition-all hover:bg-gray-50"
                  style={{ borderColor: 'rgba(0,0,0,.12)' }}>
                  ← Précédent
                </button>
                <span className="text-sm text-gray-500 font-medium">
                  Page {page} / {pages}
                </span>
                <button onClick={() => setPage(p => Math.min(pages, p + 1))} disabled={page === pages}
                  className="px-4 py-2 rounded-lg text-sm font-bold border disabled:opacity-40 transition-all hover:bg-gray-50"
                  style={{ borderColor: 'rgba(0,0,0,.12)' }}>
                  Suivant →
                </button>
              </div>
            )}
          </div>

          {/* ── Panneau détail ── */}
          {selected && (
            <div className="w-80 flex-shrink-0">
              <div className="bg-white rounded-2xl border sticky top-6 overflow-hidden"
                style={{ borderColor: 'rgba(0,0,0,.08)' }}>

                {/* Header détail */}
                <div className="px-6 py-4 flex items-center justify-between border-b"
                  style={{ borderColor: 'rgba(0,0,0,.07)', background: '#fafafa' }}>
                  <h3 className="font-extrabold text-gray-900">Détails #{selected.id}</h3>
                  <button onClick={() => setSelected(null)}
                    className="w-7 h-7 rounded-full flex items-center justify-center transition-all hover:bg-gray-200"
                    style={{ color: '#9ca3af' }}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                  </button>
                </div>

                <div className="p-6 space-y-5">

                  {/* Client */}
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-3">Client</p>
                    <p className="font-extrabold text-gray-900">{selected.nom}</p>
                    <a href={`tel:${selected.telephone}`}
                      className="flex items-center gap-2 mt-2 text-sm font-bold hover:underline"
                      style={{ color: '#CC0000' }}>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 7V5z"/>
                      </svg>
                      {selected.telephone}
                    </a>
                  </div>

                  <div className="h-px bg-gray-100"/>

                  {/* Véhicule */}
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-3">Véhicule</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Marque</span>
                        <span className="font-bold" style={{ color: MARQUE_COLORS[selected.marque] }}>
                          {MARQUES[selected.marque] || selected.marque}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Modèle</span>
                        <span className="font-bold text-gray-800">{selected.vehicule || '—'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="h-px bg-gray-100"/>

                  {/* Intervention */}
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-3">Intervention</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Type</span>
                        <span className="font-bold text-gray-800">{TYPES[selected.type] || selected.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Atelier</span>
                        <span className="font-bold text-gray-800">{ATELIERS[selected.atelier] || selected.atelier}</span>
                      </div>
                    </div>
                    {selected.message && (
                      <div className="mt-3 p-3 rounded-lg text-sm text-gray-600"
                        style={{ background: '#f9fafb', border: '1px solid rgba(0,0,0,.07)' }}>
                        {selected.message}
                      </div>
                    )}
                  </div>

                  <div className="h-px bg-gray-100"/>

                  {/* Changer statut */}
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-3">Changer le statut</p>
                    <div className="grid grid-cols-1 gap-2">
                      {(Object.keys(STATUTS) as StatutRDV[]).map(s => {
                        const st = STATUTS[s]
                        const isActive = selected.statut === s
                        return (
                          <button key={s}
                            onClick={() => changerStatut(selected.id, s)}
                            disabled={isActive}
                            className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-bold transition-all disabled:cursor-default"
                            style={{
                              background: isActive ? st.bg : 'transparent',
                              color: st.color,
                              border: `1.5px solid ${isActive ? st.color : 'rgba(0,0,0,.1)'}`,
                            }}>
                            <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: st.dot }}/>
                            {st.label}
                            {isActive && <span className="ml-auto text-xs opacity-60">actuel</span>}
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  {/* Date */}
                  <p className="text-xs text-gray-400 text-center">
                    Reçu le {fmtDate(selected.createdAt)} à {fmtHeure(selected.createdAt)}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}