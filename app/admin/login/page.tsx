'use client'

import { useState, useEffect, useCallback } from 'react'

/* ══ TYPES ══════════════════════════════════════════════════════════ */
interface LeadBrochure {
  id: number; nom: string; prenom: string; email: string
  telephone: string | null; societe: string | null
  modele: string; marque: string; brochure: string
  lu: boolean; createdAt: string
}

interface Devis {
  id: number; reference: string; nom: string; email: string
  telephone: string | null; societe: string | null
  ville: string | null; message: string | null
  statut: string; createdAt: string
}

/* ══ CONFIG ══════════════════════════════════════════════════════════ */
const MARQUE_CFG: Record<string, { label: string; color: string; bg: string }> = {
  isuzu:     { label: 'Isuzu',      color: '#CC0000', bg: '#fff5f5' },
  karry:     { label: 'Karry',      color: '#0057A8', bg: '#f0f6ff' },
  greatwall: { label: 'Great Wall', color: '#4A4A4A', bg: '#f6f6f6' },
}

const STATUT_DEVIS: Record<string, { label: string; color: string; bg: string; icon: string }> = {
  EN_ATTENTE: { label: 'En attente', color: '#d97706', bg: '#fffbeb', icon: '⏳' },
  VU:         { label: 'Vu',         color: '#0057A8', bg: '#eff6ff', icon: '👁️' },
  EN_COURS:   { label: 'En cours',   color: '#7c3aed', bg: '#f5f3ff', icon: '🔄' },
  ENVOYE:     { label: 'Envoyé',     color: '#0891b2', bg: '#ecfeff', icon: '📤' },
  ACCEPTE:    { label: 'Accepté',    color: '#16a34a', bg: '#f0fdf4', icon: '✅' },
  REFUSE:     { label: 'Refusé',     color: '#dc2626', bg: '#fef2f2', icon: '❌' },
}

type Tab = 'devis' | 'brochures'

const fmtDate  = (d: string) => new Date(d).toLocaleDateString('fr-MA', { day: '2-digit', month: 'short', year: 'numeric' })
const fmtHeure = (d: string) => new Date(d).toLocaleTimeString('fr-MA', { hour: '2-digit', minute: '2-digit' })

function groupParJour(devis: Devis[]) {
  const groupes: Record<string, Devis[]> = {}
  devis.forEach(d => {
    const date = new Date(d.createdAt)
    const key  = date.toLocaleDateString('fr-MA', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
    if (!groupes[key]) groupes[key] = []
    groupes[key].push(d)
  })
  return groupes
}

/* ══ PAGE ════════════════════════════════════════════════════════════ */
export default function AdminDashboard() {
  const [tab, setTab]               = useState<Tab>('devis')
  const [dvList, setDvList]         = useState<Devis[]>([])
  const [dvTotal, setDvTotal]       = useState(0)
  const [dvPage, setDvPage]         = useState(1)
  const [dvPages, setDvPages]       = useState(1)
  const [dvSelected, setDvSelected] = useState<Devis | null>(null)
  const [filtreStatut, setFiltreStatut] = useState<string>('TOUS')
  const [filtreMois, setFiltreMois]     = useState<string>('TOUS')

  const [brList, setBrList]         = useState<LeadBrochure[]>([])
  const [brTotal, setBrTotal]       = useState(0)
  const [brPage, setBrPage]         = useState(1)
  const [brPages, setBrPages]       = useState(1)
  const [brSelected, setBrSelected] = useState<LeadBrochure | null>(null)

  const [stats, setStats] = useState({ brochures: 0, devis: 0, enAttente: 0, acceptes: 0 })
  const [loading, setLoading] = useState(false)

  const chargerDevis = useCallback(async () => {
    const res  = await fetch(`/api/devis?page=${dvPage}`)
    const data = await res.json()
    setDvList(data.devis || [])
    setDvTotal(data.total || 0)
    setDvPages(data.pages || 1)
  }, [dvPage])

  const chargerBrochures = useCallback(async () => {
    const res  = await fetch(`/api/brochure?page=${brPage}`)
    const data = await res.json()
    setBrList(data.leads || [])
    setBrTotal(data.total || 0)
    setBrPages(data.pages || 1)
  }, [brPage])

  const chargerStats = useCallback(async () => {
    const [r1, r2] = await Promise.all([
      fetch('/api/brochure?page=1').then(r => r.json()),
      fetch('/api/devis?page=1').then(r => r.json()),
    ])
    const enAttente = (r2.devis || []).filter((d: Devis) => d.statut === 'EN_ATTENTE').length
    const acceptes  = (r2.devis || []).filter((d: Devis) => d.statut === 'ACCEPTE').length
    setStats({
      brochures: r1.total || 0,
      devis:     r2.total || 0,
      enAttente,
      acceptes,
    })
  }, [])

  useEffect(() => {
    setLoading(true)
    Promise.all([chargerStats(), chargerDevis(), chargerBrochures()])
      .finally(() => setLoading(false))
  }, [chargerStats, chargerDevis, chargerBrochures])

  const changerStatut = async (id: number, statut: string) => {
    await fetch(`/api/devis/${id}`, {
      method:  'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ statut }),
    })
    await chargerDevis()
    await chargerStats()
    if (dvSelected?.id === id) setDvSelected(prev => prev ? { ...prev, statut } : null)
  }

  // Filtres
  const moisDisponibles = Array.from(new Set(dvList.map(d =>
    new Date(d.createdAt).toLocaleDateString('fr-MA', { month: 'long', year: 'numeric' })
  )))

  const devisFiltres = dvList.filter(d => {
    const matchStatut = filtreStatut === 'TOUS' || d.statut === filtreStatut
    const matchMois   = filtreMois === 'TOUS' ||
      new Date(d.createdAt).toLocaleDateString('fr-MA', { month: 'long', year: 'numeric' }) === filtreMois
    return matchStatut && matchMois
  })

  const groupes = groupParJour(devisFiltres)

  return (
    <div className="min-h-screen" style={{ background: '#f4f6f9' }}>

      {/* ── Header ── */}
      <div className="bg-white border-b px-8 py-4" style={{ borderColor: 'rgba(0,0,0,.08)' }}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-black text-gray-900">Tableau de bord Admin</h1>
            <p className="text-xs text-gray-400 mt-0.5">CADOZAT — Gestion des demandes</p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => { chargerStats(); chargerDevis(); chargerBrochures() }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold border bg-white transition-all hover:bg-gray-50"
              style={{ borderColor: 'rgba(0,0,0,.10)' }}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
              </svg>
              Actualiser
            </button>
            <button onClick={async () => {
              await fetch('/api/auth/logout', { method: 'POST' })
              window.location.href = '/admin/login'
            }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-white transition-all hover:brightness-110"
              style={{ background: '#CC0000' }}>
              Déconnexion
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">

        {/* ── Stats ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Brochures téléchargées', val: stats.brochures, color: '#0057A8', bg: '#eff6ff', icon: '📄' },
            { label: 'Total devis',             val: stats.devis,     color: '#7c3aed', bg: '#f5f3ff', icon: '📋' },
            { label: 'En attente',              val: stats.enAttente, color: '#d97706', bg: '#fffbeb', icon: '⏳' },
            { label: 'Acceptés',                val: stats.acceptes,  color: '#16a34a', bg: '#f0fdf4', icon: '✅' },
          ].map((s, i) => (
            <div key={i} className="rounded-2xl border p-4 flex items-center gap-3"
              style={{ background: s.bg, borderColor: s.color + '20' }}>
              <div className="text-2xl">{s.icon}</div>
              <div>
                <p className="text-xs font-bold text-gray-500 leading-tight">{s.label}</p>
                <p className="text-2xl font-black leading-tight" style={{ color: s.color }}>{s.val}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Tabs ── */}
        <div className="flex gap-2 mb-5 bg-white rounded-2xl border p-1.5"
          style={{ borderColor: 'rgba(0,0,0,.08)' }}>
          {([
            { key: 'devis',     label: `Demandes devis (${dvTotal})`,  color: '#7c3aed' },
            { key: 'brochures', label: `Brochures (${brTotal})`,        color: '#0057A8' },
          ] as { key: Tab; label: string; color: string }[]).map(t => (
            <button key={t.key} onClick={() => setTab(t.key)}
              className="flex-1 py-2.5 rounded-xl text-sm font-extrabold transition-all"
              style={{ background: tab === t.key ? t.color : 'transparent', color: tab === t.key ? 'white' : '#6b7280' }}>
              {t.label}
            </button>
          ))}
        </div>

        {/* ══ TAB DEVIS ══ */}
        {tab === 'devis' && (
          <div className="flex gap-5">

            {/* Liste */}
            <div className="flex-1 min-w-0">

              {/* Filtres */}
              <div className="bg-white rounded-2xl border p-4 mb-4 flex flex-wrap gap-3"
                style={{ borderColor: 'rgba(0,0,0,.08)' }}>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1.5">Statut</p>
                  <div className="flex gap-1.5 flex-wrap">
                    {['TOUS', ...Object.keys(STATUT_DEVIS)].map(s => {
                      const cfg = s === 'TOUS' ? null : STATUT_DEVIS[s]
                      const active = filtreStatut === s
                      return (
                        <button key={s} onClick={() => setFiltreStatut(s)}
                          className="px-3 py-1 rounded-lg text-xs font-bold transition-all"
                          style={{
                            background: active ? (cfg?.color || '#374151') : (cfg?.bg || '#f3f4f6'),
                            color: active ? 'white' : (cfg?.color || '#374151'),
                            border: `1px solid ${active ? (cfg?.color || '#374151') : 'transparent'}`,
                          }}>
                          {cfg ? `${cfg.icon} ${cfg.label}` : 'Tous'}
                        </button>
                      )
                    })}
                  </div>
                </div>
                {moisDisponibles.length > 0 && (
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1.5">Période</p>
                    <select value={filtreMois} onChange={e => setFiltreMois(e.target.value)}
                      className="text-xs font-bold px-3 py-1.5 rounded-lg border bg-gray-50 focus:outline-none"
                      style={{ borderColor: 'rgba(0,0,0,.12)' }}>
                      <option value="TOUS">Tous les mois</option>
                      {moisDisponibles.map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                  </div>
                )}
                <div className="ml-auto flex items-end">
                  <span className="text-xs text-gray-400 font-medium">{devisFiltres.length} résultat{devisFiltres.length > 1 ? 's' : ''}</span>
                </div>
              </div>

              {/* Groupés par jour */}
              {Object.keys(groupes).length === 0 ? (
                <div className="bg-white rounded-2xl border p-12 text-center" style={{ borderColor: 'rgba(0,0,0,.08)' }}>
                  <p className="text-gray-400 text-sm">Aucune demande de devis</p>
                </div>
              ) : Object.entries(groupes).map(([jour, items]) => (
                <div key={jour} className="mb-6">
                  {/* Séparateur jour */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-px flex-1" style={{ background: 'rgba(0,0,0,.08)' }} />
                    <span className="text-xs font-black uppercase tracking-widest text-gray-400 px-2">{jour}</span>
                    <div className="h-px flex-1" style={{ background: 'rgba(0,0,0,.08)' }} />
                  </div>

                  <div className="space-y-2.5">
                    {items.map(d => {
                      const st = STATUT_DEVIS[d.statut] || STATUT_DEVIS.EN_ATTENTE
                      const isSelected = dvSelected?.id === d.id
                      return (
                        <div key={d.id}
                          onClick={() => setDvSelected(isSelected ? null : d)}
                          className="bg-white rounded-2xl border cursor-pointer transition-all hover:shadow-md"
                          style={{ borderColor: isSelected ? '#7c3aed' : 'rgba(0,0,0,.07)', borderWidth: isSelected ? 2 : 1 }}>
                          <div className="p-4 flex items-center gap-3">
                            {/* Avatar */}
                            <div className="w-10 h-10 rounded-full flex items-center justify-center font-black text-sm text-white flex-shrink-0"
                              style={{ background: 'linear-gradient(135deg,#7c3aed,#a855f7)' }}>
                              {d.nom.slice(0, 2).toUpperCase()}
                            </div>
                            {/* Infos */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                                <span className="font-extrabold text-gray-900 text-sm">{d.nom}</span>
                                <span className="text-xs text-gray-400">#{d.reference}</span>
                                <span className="text-xs font-bold px-2 py-0.5 rounded-full"
                                  style={{ background: st.bg, color: st.color }}>
                                  {st.icon} {st.label}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 text-xs text-gray-500 flex-wrap">
                                {d.telephone && <a href={`tel:${d.telephone}`} onClick={e => e.stopPropagation()} className="font-bold hover:underline" style={{ color: '#CC0000' }}>{d.telephone}</a>}
                                {d.telephone && <span>·</span>}
                                <span>{d.email}</span>
                                {d.ville && <><span>·</span><span>{d.ville}</span></>}
                              </div>
                              {d.message && <p className="text-xs text-gray-400 mt-0.5 truncate max-w-md">{d.message}</p>}
                            </div>
                            {/* Heure */}
                            <div className="text-right flex-shrink-0">
                              <div className="text-xs font-bold text-gray-400">{fmtHeure(d.createdAt)}</div>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}

              {dvPages > 1 && (
                <div className="flex items-center justify-center gap-3 pt-2">
                  <button onClick={() => setDvPage(p => Math.max(1, p-1))} disabled={dvPage === 1}
                    className="px-4 py-2 rounded-lg text-sm font-bold border disabled:opacity-40" style={{ borderColor: 'rgba(0,0,0,.12)' }}>← Précédent</button>
                  <span className="text-sm text-gray-500">Page {dvPage} / {dvPages}</span>
                  <button onClick={() => setDvPage(p => Math.min(dvPages, p+1))} disabled={dvPage === dvPages}
                    className="px-4 py-2 rounded-lg text-sm font-bold border disabled:opacity-40" style={{ borderColor: 'rgba(0,0,0,.12)' }}>Suivant →</button>
                </div>
              )}
            </div>

            {/* ── Panneau détail ── */}
            {dvSelected && (
              <div className="w-72 flex-shrink-0">
                <div className="bg-white rounded-2xl border sticky top-6 overflow-hidden" style={{ borderColor: 'rgba(0,0,0,.08)' }}>
                  {/* Header panneau */}
                  <div className="px-5 py-4 flex items-center justify-between"
                    style={{ background: 'linear-gradient(135deg,#7c3aed,#a855f7)', borderBottom: '1px solid rgba(0,0,0,.08)' }}>
                    <div>
                      <h3 className="font-extrabold text-white text-sm">{dvSelected.nom}</h3>
                      <p className="text-xs text-purple-200">#{dvSelected.reference}</p>
                    </div>
                    <button onClick={() => setDvSelected(null)}
                      className="w-7 h-7 rounded-full flex items-center justify-center bg-white/20 hover:bg-white/30 transition-all">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                      </svg>
                    </button>
                  </div>

                  <div className="p-5 space-y-4">
                    {/* Contact */}
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Contact</p>
                      <a href={`tel:${dvSelected.telephone}`} className="flex items-center gap-2 text-sm font-bold hover:underline mb-1" style={{ color: '#CC0000' }}>
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/></svg>
                        {dvSelected.telephone}
                      </a>
                      <a href={`mailto:${dvSelected.email}`} className="flex items-center gap-2 text-xs text-gray-500 hover:underline mb-1">
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/></svg>
                        {dvSelected.email}
                      </a>
                      {dvSelected.societe && <p className="text-xs text-gray-500">🏢 {dvSelected.societe}</p>}
                      {dvSelected.ville && <p className="text-xs text-gray-500">📍 {dvSelected.ville}</p>}
                    </div>

                    {dvSelected.message && (
                      <>
                        <div className="h-px bg-gray-100"/>
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Message</p>
                          <p className="text-xs text-gray-600 leading-relaxed p-3 bg-gray-50 rounded-xl">{dvSelected.message}</p>
                        </div>
                      </>
                    )}

                    <div className="h-px bg-gray-100"/>

                    {/* Changer statut */}
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Changer le statut</p>
                      <div className="space-y-1.5">
                        {Object.entries(STATUT_DEVIS).map(([key, cfg]) => {
                          const isActive = dvSelected.statut === key
                          return (
                            <button key={key}
                              onClick={() => changerStatut(dvSelected.id, key)}
                              disabled={isActive}
                              className="flex items-center gap-2 w-full px-3 py-2 rounded-xl text-xs font-bold transition-all disabled:cursor-default"
                              style={{
                                background: isActive ? cfg.color : cfg.bg,
                                color: isActive ? 'white' : cfg.color,
                                border: `1.5px solid ${isActive ? cfg.color : cfg.color + '30'}`,
                              }}>
                              <span>{cfg.icon}</span>
                              {cfg.label}
                              {isActive && <span className="ml-auto text-[10px] opacity-70">● Actuel</span>}
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    <div className="h-px bg-gray-100"/>
                    <p className="text-xs text-gray-400 text-center">
                      {fmtDate(dvSelected.createdAt)} à {fmtHeure(dvSelected.createdAt)}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ══ TAB BROCHURES ══ */}
        {tab === 'brochures' && (
          <div className="flex gap-5">
            <div className="flex-1 space-y-2.5">
              {brList.length === 0 ? (
                <div className="bg-white rounded-2xl border p-12 text-center" style={{ borderColor: 'rgba(0,0,0,.08)' }}>
                  <p className="text-gray-400 text-sm">Aucun lead brochure</p>
                </div>
              ) : brList.map(l => {
                const m = MARQUE_CFG[l.marque] || MARQUE_CFG.isuzu
                const isSelected = brSelected?.id === l.id
                return (
                  <div key={l.id} onClick={() => setBrSelected(isSelected ? null : l)}
                    className="bg-white rounded-2xl border cursor-pointer transition-all hover:shadow-md"
                    style={{ borderColor: isSelected ? m.color : 'rgba(0,0,0,.07)', borderWidth: isSelected ? 2 : 1 }}>
                    <div className="p-4 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center font-black text-sm text-white flex-shrink-0"
                        style={{ background: `linear-gradient(135deg,${m.color},${m.color}cc)` }}>
                        {l.prenom[0]}{l.nom[0]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                          <span className="font-extrabold text-gray-900 text-sm">{l.prenom} {l.nom}</span>
                          <span className="text-xs font-black px-2 py-0.5 rounded-full" style={{ background: m.bg, color: m.color }}>{m.label}</span>
                          {!l.lu && <span className="text-xs font-black px-2 py-0.5 rounded-full text-white" style={{ background: '#CC0000' }}>Nouveau</span>}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <span>{l.email}</span><span>·</span>
                          <span className="font-bold uppercase">{l.modele.replace(/-/g, ' ')}</span>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="text-xs text-gray-400">{fmtDate(l.createdAt)}</div>
                        <a href={l.brochure} download target="_blank"
                          className="inline-flex items-center gap-1 mt-1 text-xs font-bold hover:underline"
                          style={{ color: m.color }} onClick={e => e.stopPropagation()}>
                          ↓ PDF
                        </a>
                      </div>
                    </div>
                  </div>
                )
              })}
              {brPages > 1 && (
                <div className="flex items-center justify-center gap-3 pt-2">
                  <button onClick={() => setBrPage(p => Math.max(1, p-1))} disabled={brPage === 1}
                    className="px-4 py-2 rounded-lg text-sm font-bold border disabled:opacity-40" style={{ borderColor: 'rgba(0,0,0,.12)' }}>← Précédent</button>
                  <span className="text-sm text-gray-500">Page {brPage} / {brPages}</span>
                  <button onClick={() => setBrPage(p => Math.min(brPages, p+1))} disabled={brPage === brPages}
                    className="px-4 py-2 rounded-lg text-sm font-bold border disabled:opacity-40" style={{ borderColor: 'rgba(0,0,0,.12)' }}>Suivant →</button>
                </div>
              )}
            </div>

            {brSelected && (
              <div className="w-72 flex-shrink-0">
                <div className="bg-white rounded-2xl border sticky top-6 overflow-hidden" style={{ borderColor: 'rgba(0,0,0,.08)' }}>
                  {(() => {
                    const m = MARQUE_CFG[brSelected.marque] || MARQUE_CFG.isuzu
                    return (
                      <>
                        <div className="px-5 py-4 flex items-center justify-between border-b" style={{ borderColor: 'rgba(0,0,0,.07)', background: '#fafafa' }}>
                          <h3 className="font-extrabold text-gray-900">Brochure #{brSelected.id}</h3>
                          <button onClick={() => setBrSelected(null)} className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-gray-200">
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                          </button>
                        </div>
                        <div className="p-5 space-y-4">
                          <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Contact</p>
                            <p className="font-extrabold text-gray-900">{brSelected.prenom} {brSelected.nom}</p>
                            <a href={`mailto:${brSelected.email}`} className="text-sm font-bold hover:underline block" style={{ color: m.color }}>{brSelected.email}</a>
                            {brSelected.telephone && <a href={`tel:${brSelected.telephone}`} className="text-sm font-bold hover:underline block" style={{ color: m.color }}>{brSelected.telephone}</a>}
                            {brSelected.societe && <p className="text-sm text-gray-500 mt-1">{brSelected.societe}</p>}
                          </div>
                          <div className="h-px bg-gray-100"/>
                          <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Brochure</p>
                            <div className="p-3 rounded-xl" style={{ background: m.bg, border: `1px solid ${m.color}22` }}>
                              <p className="font-bold text-sm" style={{ color: m.color }}>{m.label}</p>
                              <p className="font-black text-gray-900 text-sm">{brSelected.modele.toUpperCase().replace(/-/g, ' ')}</p>
                            </div>
                            <a href={brSelected.brochure} download target="_blank"
                              className="flex items-center justify-center gap-2 w-full mt-3 py-2.5 rounded-xl font-bold text-sm text-white"
                              style={{ background: `linear-gradient(135deg,${m.color},${m.color}cc)` }}>
                              ↓ Télécharger PDF
                            </a>
                          </div>
                          <p className="text-xs text-gray-400 text-center">{fmtDate(brSelected.createdAt)} à {fmtHeure(brSelected.createdAt)}</p>
                        </div>
                      </>
                    )
                  })()}
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  )
}