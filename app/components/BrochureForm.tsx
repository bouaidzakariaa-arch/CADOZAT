'use client'

import { useState } from 'react'

interface Props {
  modele:    string
  marque:    string
  nomModele: string
}

const MARQUE_CONFIG: Record<string, { color: string; dark: string; light: string; accent: string }> = {
  isuzu:     { color: '#CC0000', dark: '#990000', light: '#fff5f5', accent: '#0057A8' },
  karry:     { color: '#0057A8', dark: '#003f7a', light: '#f0f6ff', accent: '#1B2B6B' },
}

export default function BrochureForm({ modele, marque, nomModele }: Props) {
  const cfg = MARQUE_CONFIG[marque] || MARQUE_CONFIG.isuzu

  const [formData, setFormData] = useState({ nom: '', prenom: '', email: '', telephone: '', societe: '' })
  const [loading, setLoading] = useState(false)
  const [succes,  setSucces]  = useState(false)
  const [erreur,  setErreur]  = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true); setErreur('')
    try {
      const res = await fetch('/api/brochure', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, modele, marque, brochure: `/brochures/${modele}.pdf` }),
      })
      if (!res.ok) throw new Error('Erreur serveur')
      const link = document.createElement('a')
      link.href = `/brochures/${modele}.pdf`
      link.download = `CADOZAT-${nomModele.replace(/\s/g, '-')}.pdf`
      document.body.appendChild(link); link.click(); document.body.removeChild(link)
      setSucces(true)
    } catch { setErreur('Une erreur est survenue. Réessayez ou contactez-nous au 0524 885 025.') }
    finally { setLoading(false) }
  }

  return (
    <section className="py-20 relative overflow-hidden" style={{ background: '#f8faff' }}>
      {/* Subtle background */}
      <div style={{ position:'absolute', inset:0, opacity:0.4, backgroundImage:'radial-gradient(circle, rgba(0,87,168,0.07) 1px, transparent 1px)', backgroundSize:'32px 32px' }} />
      <div style={{ position:'absolute', top:'-80px', right:'-80px', width:'400px', height:'400px', borderRadius:'50%', background:`radial-gradient(circle, ${cfg.color}08 0%, transparent 65%)`, pointerEvents:'none' }} />
      <div style={{ position:'absolute', bottom:'-60px', left:'-60px', width:'350px', height:'350px', borderRadius:'50%', background:'radial-gradient(circle, rgba(0,87,168,0.06) 0%, transparent 65%)', pointerEvents:'none' }} />

      <div className="relative max-w-4xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
            style={{ background:'#fff', border:'1px solid #e8e8f0', boxShadow:'0 2px 12px rgba(0,0,0,0.06)' }}>
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: cfg.color }} />
            <span className="text-xs font-black uppercase tracking-widest" style={{ color: cfg.accent }}>Documentation technique</span>
          </div>
          <h2 className="text-3xl font-black text-gray-900 mb-3">Télécharger la brochure</h2>
          <div className="flex items-center justify-center gap-2 mb-4">
            <div style={{ width:'40px', height:'3px', background: cfg.color, borderRadius:'2px' }} />
            <div style={{ width:'20px', height:'3px', background: cfg.accent, borderRadius:'2px' }} />
          </div>
          <p className="text-gray-500 text-sm max-w-md mx-auto">
            Obtenez la fiche technique complète du <strong>{nomModele}</strong> — spécifications, dimensions, performances et options disponibles.
          </p>
        </div>

        {/* Card */}
        <div className="rounded-3xl overflow-hidden"
          style={{ background:'rgba(255,255,255,0.85)', backdropFilter:'blur(20px)', border:`1px solid ${cfg.color}18`, boxShadow:'0 20px 60px rgba(0,0,0,0.08)' }}>

          {/* Top bar */}
          <div style={{ height:'3px', background:`linear-gradient(90deg, ${cfg.color}, ${cfg.accent})` }} />

          {succes ? (
            <div className="py-16 px-6 text-center">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{ background:`linear-gradient(135deg, ${cfg.color}, ${cfg.accent})` }}>
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-3">Votre brochure est en cours de téléchargement !</h3>
              <p className="text-gray-500 text-sm max-w-md mx-auto mb-6">
                La fiche technique du <strong>{nomModele}</strong> se télécharge automatiquement. Si le téléchargement ne démarre pas,{' '}
                <a href={`/brochures/${modele}.pdf`} download className="font-bold underline" style={{ color: cfg.color }}>cliquez ici</a>.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <button onClick={() => setSucces(false)}
                  className="px-6 py-2.5 rounded-xl font-bold text-sm border transition-all hover:scale-105"
                  style={{ borderColor: cfg.color, color: cfg.color }}>
                  Télécharger une autre brochure
                </button>
                <a href="/devis"
                  className="px-6 py-2.5 rounded-xl font-bold text-sm text-white transition-all hover:scale-105"
                  style={{ background:`linear-gradient(135deg, ${cfg.color}, ${cfg.accent})` }}>
                  Demander un devis →
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {[
                  { label:'Prénom *', key:'prenom', type:'text', placeholder:'Votre prénom', required:true },
                  { label:'Nom *',    key:'nom',    type:'text', placeholder:'Votre nom',    required:true },
                  { label:'Email *',  key:'email',  type:'email',placeholder:'votre@email.com', required:true },
                  { label:'Téléphone', key:'telephone', type:'tel', placeholder:'06XX XX XX XX', required:false },
                ].map(field => (
                  <div key={field.key}>
                    <label className="block text-xs font-black uppercase tracking-widest mb-2" style={{ color:'#94a3b8' }}>{field.label}</label>
                    <input
                      type={field.type} required={field.required} placeholder={field.placeholder}
                      value={(formData as any)[field.key]}
                      onChange={e => setFormData({...formData, [field.key]: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border text-sm font-medium outline-none transition-all"
                      style={{ borderColor:'rgba(0,0,0,0.1)', background:'rgba(248,250,255,0.8)' }}
                      onFocus={e => { e.target.style.borderColor = cfg.color; e.target.style.boxShadow = `0 0 0 3px ${cfg.color}12` }}
                      onBlur={e  => { e.target.style.borderColor = 'rgba(0,0,0,0.1)'; e.target.style.boxShadow = 'none' }}
                    />
                  </div>
                ))}
                <div className="md:col-span-2">
                  <label className="block text-xs font-black uppercase tracking-widest mb-2" style={{ color:'#94a3b8' }}>Société / Organisation</label>
                  <input
                    type="text" placeholder="Nom de votre entreprise (optionnel)"
                    value={formData.societe}
                    onChange={e => setFormData({...formData, societe: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border text-sm font-medium outline-none transition-all"
                    style={{ borderColor:'rgba(0,0,0,0.1)', background:'rgba(248,250,255,0.8)' }}
                    onFocus={e => { e.target.style.borderColor = cfg.accent; e.target.style.boxShadow = `0 0 0 3px ${cfg.accent}10` }}
                    onBlur={e  => { e.target.style.borderColor = 'rgba(0,0,0,0.1)'; e.target.style.boxShadow = 'none' }}
                  />
                </div>
              </div>

              {erreur && (
                <div className="mt-4 p-3 rounded-xl text-sm font-medium text-red-700 bg-red-50 border border-red-200">{erreur}</div>
              )}

              <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4"
                style={{ paddingTop:'20px', borderTop:`1px solid ${cfg.color}15` }}>
                <p className="text-xs text-gray-400 max-w-xs">Vos informations restent confidentielles et ne seront jamais partagées.</p>
                <button type="submit" disabled={loading}
                  className="flex items-center gap-2.5 px-8 py-3.5 rounded-xl font-extrabold text-white transition-all hover:scale-105 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed flex-shrink-0"
                  style={{ background:`linear-gradient(135deg, ${cfg.color}, ${cfg.accent})`, boxShadow:`0 8px 28px ${cfg.color}35` }}>
                  {loading ? (
                    <><svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>Préparation...</>
                  ) : (
                    <><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>Télécharger la brochure</>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold"
            style={{ background:`${cfg.color}10`, color: cfg.color, border:`1px solid ${cfg.color}20` }}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
            Brochure PDF officielle — {nomModele}
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold"
            style={{ background:'#f0f7ff', color:'#0057A8', border:'1px solid rgba(0,87,168,0.15)' }}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
            Données sécurisées & confidentielles
          </div>
        </div>
      </div>
    </section>
  )
}