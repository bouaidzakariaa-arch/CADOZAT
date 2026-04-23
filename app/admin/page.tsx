'use client'

// app/admin/page.tsx

import { useState, useEffect, useCallback } from 'react'

/* ══ TYPES ═══════════════════════════════════ */
type StatutRDV = 'NOUVEAU' | 'CONFIRME' | 'EN_COURS' | 'TERMINE' | 'ANNULE'

interface DemandeRDV {
  id: number; nom: string; telephone: string
  marque: string; vehicule: string | null
  type: string; atelier: string; message: string | null
  statut: StatutRDV; lu: boolean; createdAt: string
}

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

/* ══ CONFIG ══════════════════════════════════ */
const MARQUE_CFG: Record<string, { label: string; color: string; bg: string }> = {
  isuzu:     { label: 'Isuzu',      color: '#CC0000', bg: '#fff5f5' },
  karry:     { label: 'Karry',      color: '#0057A8', bg: '#f0f6ff' },
  greatwall: { label: 'Great Wall', color: '#4A4A4A', bg: '#f6f6f6' },
}

const STATUT_RDV: Record<StatutRDV, { label: string; color: string; bg: string }> = {
  NOUVEAU:  { label: 'Nouveau',  color: '#CC0000', bg: '#fff5f5' },
  CONFIRME: { label: 'Confirmé', color: '#0057A8', bg: '#f0f6ff' },
  EN_COURS: { label: 'En cours', color: '#e8a020', bg: '#fffbf0' },
  TERMINE:  { label: 'Terminé',  color: '#2D6A4F', bg: '#f0faf5' },
  ANNULE:   { label: 'Annulé',   color: '#9ca3af', bg: '#f9fafb' },
}

const STATUT_DEVIS: Record<string, { label: string; color: string; bg: string }> = {
  EN_ATTENTE: { label: 'En attente', color: '#e8a020', bg: '#fffbf0' },
  VU:         { label: 'Vu',         color: '#0057A8', bg: '#f0f6ff' },
  EN_COURS:   { label: 'En cours',   color: '#CC0000', bg: '#fff5f5' },
  ENVOYE:     { label: 'Envoyé',     color: '#2D6A4F', bg: '#f0faf5' },
  ACCEPTE:    { label: 'Accepté',    color: '#2D6A4F', bg: '#f0faf5' },
  REFUSE:     { label: 'Refusé',     color: '#9ca3af', bg: '#f9fafb' },
}

const ATELIERS: Record<string, string> = {
  ouarzazate: 'Ouarzazate', agadir: 'Agadir',
  tinghir: 'Tinghir', mobile: 'Mobile',
}

const TYPES_RDV: Record<string, string> = {
  revision: 'Révision', reparation: 'Réparation',
  garantie: 'Garantie', diagnostic: 'Diagnostic',
  pieces: 'Pièces', mobile: 'Mobile', autre: 'Autre',
}

type Tab = 'rdv' | 'brochures' | 'devis'

/* ══ HELPERS ═════════════════════════════════ */
const fmtDate  = (d: string) => new Date(d).toLocaleDateString('fr-MA', { day: '2-digit', month: 'short', year: 'numeric' })
const fmtHeure = (d: string) => new Date(d).toLocaleTimeString('fr-MA', { hour: '2-digit', minute: '2-digit' })

/* ══ PAGE ════════════════════════════════════ */
export default function AdminDashboard() {
  const [tab, setTab] = useState<Tab>('rdv')

  /* Stats */
  const [stats, setStats] = useState({ rdv: 0, brochures: 0, devis: 0, nouveaux: 0 })

  /* RDV */
  const [rdvList, setRdvList]       = useState<DemandeRDV[]>([])
  const [rdvTotal, setRdvTotal]     = useState(0)
  const [rdvPage, setRdvPage]       = useState(1)
  const [rdvPages, setRdvPages]     = useState(1)
  const [rdvSelected, setRdvSelected] = useState<DemandeRDV | null>(null)

  /* Brochures */
  const [brList, setBrList]         = useState<LeadBrochure[]>([])
  const [brTotal, setBrTotal]       = useState(0)
  const [brPage, setBrPage]         = useState(1)
  const [brPages, setBrPages]       = useState(1)
  const [brSelected, setBrSelected] = useState<LeadBrochure | null>(null)

  /* Devis */
  const [dvList, setDvList]         = useState<Devis[]>([])
  const [dvTotal, setDvTotal]       = useState(0)
  const [dvPage, setDvPage]         = useState(1)
  const [dvPages, setDvPages]       = useState(1)

  const [loading, setLoading] = useState(false)

  /* ── Chargement ── */
  const chargerRDV = useCallback(async () => {
    const res  = await fetch(`/api/rdv?page=${rdvPage}`)
    const data = await res.json()
    setRdvList(data.demandes || [])
    setRdvTotal(data.total || 0)
    setRdvPages(data.pages || 1)
  }, [rdvPage])

  const chargerBrochures = useCallback(async () => {
    const res  = await fetch(`/api/brochure?page=${brPage}`)
    const data = await res.json()
    setBrList(data.leads || [])
    setBrTotal(data.total || 0)
    setBrPages(data.pages || 1)
  }, [brPage])

  const chargerDevis = useCallback(async () => {
    const res  = await fetch(`/api/devis?page=${dvPage}`)
    const data = await res.json()
    setDvList(data.devis || [])
    setDvTotal(data.total || 0)
    setDvPages(data.pages || 1)
  }, [dvPage])

  const chargerStats = useCallback(async () => {
    const [r1, r2, r3] = await Promise.all([
      fetch('/api/rdv?page=1').then(r => r.json()),
      fetch('/api/brochure?page=1').then(r => r.json()),
      fetch('/api/devis?page=1').then(r => r.json()),
    ])
    const nouveauxRDV = (r1.demandes || []).filter((d: DemandeRDV) => !d.lu).length
    const nouveauxBr  = (r2.leads   || []).filter((l: LeadBrochure) => !l.lu).length
    setStats({
      rdv: r1.total || 0,
      brochures: r2.total || 0,
      devis: r3.total || 0,
      nouveaux: nouveauxRDV + nouveauxBr,
    })
  }, [])

  const changerStatutRDV = async (id: number, statut: StatutRDV) => {
    await fetch(`/api/rdv/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ statut }),
    })
    chargerRDV()
    if (rdvSelected?.id === id) setRdvSelected(prev => prev ? { ...prev, statut } : null)
  }

  useEffect(() => {
    setLoading(true)
    Promise.all([chargerStats(), chargerRDV(), chargerBrochures(), chargerDevis()])
      .finally(() => setLoading(false))
  }, [chargerStats, chargerRDV, chargerBrochures, chargerDevis])

  /* ══ RENDER ══════════════════════════════════ */
  return (
    <div className="min-h-screen" style={{ background: '#f4f4f4' }}>

      {/* ── Header ── */}
      <div className="bg-white border-b px-8 py-5" style={{ borderColor: 'rgba(0,0,0,.08)' }}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black text-gray-900">Tableau de bord Admin</h1>
            <p className="text-sm text-gray-500 mt-0.5">CADOZAT — Gestion des demandes</p>
          </div>
          <button onClick={() => { chargerStats(); chargerRDV(); chargerBrochures(); chargerDevis() }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold border transition-all hover:bg-gray-50"
            style={{ borderColor: 'rgba(0,0,0,.12)' }}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
            </svg>
            Actualiser
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* ── Stats cards ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Demandes RDV', val: stats.rdv,       color: '#CC0000', icon: '📅' },
            { label: 'Leads brochures', val: stats.brochures, color: '#0057A8', icon: '📄' },
            { label: 'Demandes devis', val: stats.devis,    color: '#2D6A4F', icon: '📋' },
            { label: 'Non lus',        val: stats.nouveaux,  color: '#e8a020', icon: '🔔' },
          ].map((s, i) => (
            <div key={i} className="bg-white rounded-2xl border p-5 flex items-center gap-4"
              style={{ borderColor: 'rgba(0,0,0,.08)' }}>
              <div className="text-2xl">{s.icon}</div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{s.label}</p>
                <p className="text-2xl font-black" style={{ color: s.color }}>{s.val}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Tabs ── */}
        <div className="flex gap-2 mb-6 bg-white rounded-2xl border p-2"
          style={{ borderColor: 'rgba(0,0,0,.08)' }}>
          {([
            { key: 'rdv',       label: `RDV SAV (${rdvTotal})`,         color: '#CC0000' },
            { key: 'brochures', label: `Brochures (${brTotal})`,         color: '#0057A8' },
            { key: 'devis',     label: `Demandes devis (${dvTotal})`,    color: '#2D6A4F' },
          ] as { key: Tab; label: string; color: string }[]).map(t => (
            <button key={t.key} onClick={() => setTab(t.key)}
              className="flex-1 py-2.5 rounded-xl text-sm font-extrabold transition-all"
              style={{
                background: tab === t.key ? t.color : 'transparent',
                color: tab === t.key ? 'white' : '#6b7280',
              }}>
              {t.label}
            </button>
          ))}
        </div>

        {/* ══════════════════════════════════════
            TAB : RDV SAV
            ══════════════════════════════════════ */}
        {tab === 'rdv' && (
          <div className="flex gap-6">
            <div className="flex-1 space-y-3">
              {rdvList.length === 0 ? (
                <div className="bg-white rounded-2xl border p-12 text-center" style={{ borderColor: 'rgba(0,0,0,.08)' }}>
                  <p className="text-gray-400 text-sm">Aucune demande RDV</p>
                </div>
              ) : rdvList.map(d => {
                const st = STATUT_RDV[d.statut]
                const m  = MARQUE_CFG[d.marque] || MARQUE_CFG.isuzu
                const isSelected = rdvSelected?.id === d.id
                return (
                  <div key={d.id} onClick={() => setRdvSelected(isSelected ? null : d)}
                    className="bg-white rounded-2xl border cursor-pointer transition-all hover:shadow-md"
                    style={{ borderColor: isSelected ? '#CC0000' : 'rgba(0,0,0,.08)', borderWidth: isSelected ? 2 : 1 }}>
                    <div className="p-5 flex items-center gap-4">
                      <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: st.color }}/>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className="font-extrabold text-gray-900">{d.nom}</span>
                          <span className="text-xs font-black px-2 py-0.5 rounded-full"
                            style={{ background: m.bg, color: m.color }}>{m.label}</span>
                          {!d.lu && <span className="text-xs font-black px-2 py-0.5 rounded-full text-white" style={{ background: '#CC0000' }}>Nouveau</span>}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-500 flex-wrap">
                          <span>{d.telephone}</span><span>·</span>
                          <span>{TYPES_RDV[d.type] || d.type}</span><span>·</span>
                          <span>{ATELIERS[d.atelier] || d.atelier}</span>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="text-xs text-gray-400">{fmtDate(d.createdAt)}</div>
                        <span className="inline-block mt-1 text-xs font-bold px-2 py-0.5 rounded-full"
                          style={{ background: st.bg, color: st.color }}>{st.label}</span>
                      </div>
                    </div>
                  </div>
                )
              })}
              {rdvPages > 1 && (
                <div className="flex items-center justify-center gap-3 pt-2">
                  <button onClick={() => setRdvPage(p => Math.max(1, p-1))} disabled={rdvPage === 1}
                    className="px-4 py-2 rounded-lg text-sm font-bold border disabled:opacity-40"
                    style={{ borderColor: 'rgba(0,0,0,.12)' }}>← Précédent</button>
                  <span className="text-sm text-gray-500">Page {rdvPage} / {rdvPages}</span>
                  <button onClick={() => setRdvPage(p => Math.min(rdvPages, p+1))} disabled={rdvPage === rdvPages}
                    className="px-4 py-2 rounded-lg text-sm font-bold border disabled:opacity-40"
                    style={{ borderColor: 'rgba(0,0,0,.12)' }}>Suivant →</button>
                </div>
              )}
            </div>

            {/* Détail RDV */}
            {rdvSelected && (
              <div className="w-72 flex-shrink-0">
                <div className="bg-white rounded-2xl border sticky top-6 overflow-hidden" style={{ borderColor: 'rgba(0,0,0,.08)' }}>
                  <div className="px-5 py-4 flex items-center justify-between border-b" style={{ borderColor: 'rgba(0,0,0,.07)', background: '#fafafa' }}>
                    <h3 className="font-extrabold text-gray-900">RDV #{rdvSelected.id}</h3>
                    <button onClick={() => setRdvSelected(null)} className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-gray-200">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                      </svg>
                    </button>
                  </div>
                  <div className="p-5 space-y-4">
                    <div>
                      <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Client</p>
                      <p className="font-extrabold text-gray-900">{rdvSelected.nom}</p>
                      <a href={`tel:${rdvSelected.telephone}`} className="text-sm font-bold hover:underline" style={{ color: '#CC0000' }}>{rdvSelected.telephone}</a>
                    </div>
                    <div className="h-px bg-gray-100"/>
                    <div>
                      <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Intervention</p>
                      <p className="text-sm text-gray-700"><span className="font-bold">Marque :</span> {MARQUE_CFG[rdvSelected.marque]?.label}</p>
                      <p className="text-sm text-gray-700"><span className="font-bold">Type :</span> {TYPES_RDV[rdvSelected.type]}</p>
                      <p className="text-sm text-gray-700"><span className="font-bold">Atelier :</span> {ATELIERS[rdvSelected.atelier]}</p>
                      {rdvSelected.vehicule && <p className="text-sm text-gray-700"><span className="font-bold">Véhicule :</span> {rdvSelected.vehicule}</p>}
                      {rdvSelected.message && <p className="text-sm text-gray-500 mt-2 p-2 bg-gray-50 rounded-lg">{rdvSelected.message}</p>}
                    </div>
                    <div className="h-px bg-gray-100"/>
                    <div>
                      <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Changer statut</p>
                      <div className="space-y-1.5">
                        {(Object.keys(STATUT_RDV) as StatutRDV[]).map(s => {
                          const st = STATUT_RDV[s]
                          const isActive = rdvSelected.statut === s
                          return (
                            <button key={s} onClick={() => changerStatutRDV(rdvSelected.id, s)} disabled={isActive}
                              className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm font-bold transition-all disabled:cursor-default"
                              style={{ background: isActive ? st.bg : 'transparent', color: st.color, border: `1.5px solid ${isActive ? st.color : 'rgba(0,0,0,.1)'}` }}>
                              <div className="w-2 h-2 rounded-full" style={{ background: st.color }}/>
                              {st.label}
                              {isActive && <span className="ml-auto text-xs opacity-60">actuel</span>}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                    <p className="text-xs text-gray-400 text-center">{fmtDate(rdvSelected.createdAt)} à {fmtHeure(rdvSelected.createdAt)}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ══════════════════════════════════════
            TAB : BROCHURES
            ══════════════════════════════════════ */}
        {tab === 'brochures' && (
          <div className="flex gap-6">
            <div className="flex-1 space-y-3">
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
                    style={{ borderColor: isSelected ? m.color : 'rgba(0,0,0,.08)', borderWidth: isSelected ? 2 : 1 }}>
                    <div className="p-5 flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center font-black text-sm text-white flex-shrink-0"
                        style={{ background: `linear-gradient(135deg,${m.color},${m.color}cc)` }}>
                        {l.prenom[0]}{l.nom[0]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className="font-extrabold text-gray-900">{l.prenom} {l.nom}</span>
                          <span className="text-xs font-black px-2 py-0.5 rounded-full" style={{ background: m.bg, color: m.color }}>{m.label}</span>
                          {!l.lu && <span className="text-xs font-black px-2 py-0.5 rounded-full text-white" style={{ background: '#CC0000' }}>Nouveau</span>}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-500 flex-wrap">
                          <span>{l.email}</span><span>·</span>
                          <span className="font-bold uppercase">{l.modele.replace(/-/g, ' ')}</span>
                          {l.societe && <><span>·</span><span>{l.societe}</span></>}
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

            {/* Détail Brochure */}
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
                            <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Contact</p>
                            <p className="font-extrabold text-gray-900">{brSelected.prenom} {brSelected.nom}</p>
                            <a href={`mailto:${brSelected.email}`} className="text-sm font-bold hover:underline block" style={{ color: m.color }}>{brSelected.email}</a>
                            {brSelected.telephone && <a href={`tel:${brSelected.telephone}`} className="text-sm font-bold hover:underline block" style={{ color: m.color }}>{brSelected.telephone}</a>}
                            {brSelected.societe && <p className="text-sm text-gray-500 mt-1">{brSelected.societe}</p>}
                          </div>
                          <div className="h-px bg-gray-100"/>
                          <div>
                            <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Brochure</p>
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

        {/* ══════════════════════════════════════
            TAB : DEVIS
            ══════════════════════════════════════ */}
        {tab === 'devis' && (
          <div className="space-y-3">
            {dvList.length === 0 ? (
              <div className="bg-white rounded-2xl border p-12 text-center" style={{ borderColor: 'rgba(0,0,0,.08)' }}>
                <p className="text-gray-400 text-sm">Aucune demande de devis</p>
              </div>
            ) : dvList.map(d => {
              const st = STATUT_DEVIS[d.statut] || STATUT_DEVIS.EN_ATTENTE
              return (
                <div key={d.id} className="bg-white rounded-2xl border p-5 flex items-center gap-4"
                  style={{ borderColor: 'rgba(0,0,0,.08)' }}>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="font-extrabold text-gray-900">{d.nom}</span>
                      <span className="text-xs font-bold text-gray-400">#{d.reference}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500 flex-wrap">
                      <span>{d.email}</span>
                      {d.telephone && <><span>·</span><span>{d.telephone}</span></>}
                      {d.societe && <><span>·</span><span>{d.societe}</span></>}
                      {d.ville && <><span>·</span><span>{d.ville}</span></>}
                    </div>
                    {d.message && <p className="text-xs text-gray-400 mt-1 truncate">{d.message}</p>}
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-xs text-gray-400">{fmtDate(d.createdAt)}</div>
                    <span className="inline-block mt-1 text-xs font-bold px-2 py-0.5 rounded-full"
                      style={{ background: st.bg, color: st.color }}>{st.label}</span>
                  </div>
                </div>
              )
            })}
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
        )}

      </div>
    </div>
  )
}