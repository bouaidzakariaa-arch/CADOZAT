'use client'

import { useState } from 'react'

const MODELES = [
  { serie: 'D-MAX', couleur: '#CC0000', marque: 'isuzu', items: [
    { value: 'dmax-tfr', label: 'D-MAX TFR — Pick-up SC 4×2' },
  ]},
  { serie: 'Série N', couleur: '#1B2B6B', marque: 'isuzu', items: [
    { value: 'nmr-77e', label: 'NMR 77E — 3.5T Court' },
    { value: 'nmr-85h', label: 'NMR 85H — 3.5T Long' },
    { value: 'nnr-85h', label: 'NNR 85H — 3.5T Long+' },
    { value: 'npr-75k', label: 'NPR 75K — 7.5T Court' },
    { value: 'npr-75l', label: 'NPR 75L — 7.5T Long' },
    { value: 'nqr-90k', label: 'NQR 90K — 9.5T Court' },
    { value: 'nqr-90m', label: 'NQR 90M — 9.5T Long' },
  ]},
  { serie: 'Série F', couleur: '#374151', marque: 'isuzu', items: [
    { value: 'ftr-34k', label: 'FTR 34K — 16T Court' },
    { value: 'ftr-34m', label: 'FTR 34M — 16T Intermédiaire' },
    { value: 'ftr-34p', label: 'FTR 34P — 16T Long' },
    { value: 'fvr-34k', label: 'FVR 34K — 18T Court' },
    { value: 'fvr-34p', label: 'FVR 34P — 18T Long' },
  ]},
  { serie: 'Karry', couleur: '#0057A8', marque: 'karry', items: [
    { value: 'karry-22b', label: 'Karry 22B — Fourgon Compact' },
    { value: 'karry-22q', label: 'Karry 22Q — Fourgon Grande Capa.' },
  ]},
]

interface Props {
  onClose: () => void
}

export default function BrochureModal({ onClose }: Props) {
  const [step, setStep] = useState<'select' | 'form' | 'success'>('select')
  const [selected, setSelected] = useState<{ value: string; label: string; marque: string } | null>(null)
  const [formData, setFormData] = useState({ nom: '', prenom: '', email: '', telephone: '', societe: '' })
  const [loading, setLoading] = useState(false)
  const [erreur, setErreur] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selected) return
    setLoading(true); setErreur('')
    try {
      const res = await fetch('/api/brochure', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          modele: selected.value,
          marque: selected.marque,
          brochure: `/brochures/${selected.value}.pdf`,
        }),
      })
      if (!res.ok) throw new Error()
      const link = document.createElement('a')
      link.href = `/brochures/${selected.value}.pdf`
      link.download = `CADOZAT-${selected.label.replace(/\s/g, '-')}.pdf`
      document.body.appendChild(link); link.click(); document.body.removeChild(link)
      setStep('success')
    } catch {
      setErreur('Une erreur est survenue. Réessayez.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
      style={{
        position: 'fixed', inset: 0, zIndex: 999999,
        background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '16px',
      }}
    >
      <div style={{
        background: '#fff', borderRadius: '24px',
        width: '100%', maxWidth: '500px',
        maxHeight: '90vh', overflowY: 'auto',
        boxShadow: '0 24px 80px rgba(0,0,0,0.25)',
        animation: 'modalIn 0.3s cubic-bezier(0.22,1,0.36,1)',
      }}>
        <style>{`@keyframes modalIn { from { opacity:0; transform:scale(0.95) translateY(10px) } to { opacity:1; transform:scale(1) translateY(0) } }`}</style>

        {/* Header */}
        <div style={{ padding: '24px 24px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: '10px', fontWeight: 800, color: '#C9A84C', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '4px' }}>
              📄 Documentation technique
            </div>
            <h2 style={{ fontSize: '18px', fontWeight: 900, color: '#0f172a', margin: 0 }}>
              {step === 'select' ? 'Choisir un véhicule' : step === 'form' ? 'Vos coordonnées' : 'Téléchargement lancé !'}
            </h2>
          </div>
          <button onClick={onClose} style={{
            width: '36px', height: '36px', borderRadius: '50%',
            border: '1px solid #e2e8f0', background: '#f8faff',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            <svg width="14" height="14" fill="none" stroke="#64748b" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {/* Barre couleur */}
        <div style={{ height: '3px', background: 'linear-gradient(90deg, #C9A84C, #CC0000, #0057A8)', margin: '16px 0 0' }} />

        {/* ── STEP 1 : Sélection ── */}
        {step === 'select' && (
          <div style={{ padding: '20px 24px 24px' }}>
            <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '16px', lineHeight: 1.6 }}>
              Sélectionnez le modèle dont vous souhaitez télécharger la fiche technique.
            </p>
            {MODELES.map((serie, si) => (
              <div key={si} style={{ marginBottom: '14px' }}>
                <div style={{ fontSize: '10px', fontWeight: 900, color: serie.couleur, textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <div style={{ width: '3px', height: '12px', borderRadius: '99px', background: serie.couleur }} />
                  {serie.serie}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {serie.items.map((item, ii) => (
                    <button key={ii}
                      onClick={() => { setSelected({ ...item, marque: serie.marque }); setStep('form') }}
                      style={{
                        padding: '10px 14px', borderRadius: '10px',
                        border: `1px solid ${serie.couleur}20`,
                        background: '#f8faff', cursor: 'pointer', textAlign: 'left',
                        fontSize: '13px', fontWeight: 600, color: '#374151',
                        transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = `${serie.couleur}08`; (e.currentTarget as HTMLElement).style.borderColor = `${serie.couleur}40` }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#f8faff'; (e.currentTarget as HTMLElement).style.borderColor = `${serie.couleur}20` }}
                    >
                      {item.label}
                      <svg width="14" height="14" fill="none" stroke={serie.couleur} strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
                      </svg>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── STEP 2 : Formulaire ── */}
        {step === 'form' && selected && (
          <form onSubmit={handleSubmit} style={{ padding: '20px 24px 24px' }}>
            <div style={{ padding: '12px 14px', borderRadius: '10px', background: '#fff5f5', border: '1px solid #fecaca', marginBottom: '20px' }}>
              <div style={{ fontSize: '11px', color: '#94a3b8', marginBottom: '2px' }}>Véhicule sélectionné</div>
              <div style={{ fontSize: '14px', fontWeight: 800, color: '#CC0000' }}>{selected.label}</div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
              {[
                { label: 'Prénom *', key: 'prenom', type: 'text', placeholder: 'Votre prénom', required: true },
                { label: 'Nom *', key: 'nom', type: 'text', placeholder: 'Votre nom', required: true },
                { label: 'Email *', key: 'email', type: 'email', placeholder: 'votre@email.com', required: true },
                { label: 'Téléphone', key: 'telephone', type: 'tel', placeholder: '06XX XX XX XX', required: false },
              ].map(field => (
                <div key={field.key}>
                  <label style={{ display: 'block', fontSize: '10px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: '5px' }}>
                    {field.label}
                  </label>
                  <input
                    type={field.type} required={field.required} placeholder={field.placeholder}
                    value={(formData as Record<string, string>)[field.key]}
                    onChange={e => setFormData({ ...formData, [field.key]: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1.5px solid rgba(0,0,0,0.09)', fontSize: '13px', outline: 'none', boxSizing: 'border-box', background: '#f8faff', fontFamily: 'inherit' }}
                    onFocus={e => { e.target.style.borderColor = '#CC0000'; e.target.style.boxShadow = '0 0 0 3px rgba(204,0,0,0.07)' }}
                    onBlur={e => { e.target.style.borderColor = 'rgba(0,0,0,0.09)'; e.target.style.boxShadow = 'none' }}
                  />
                </div>
              ))}
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '10px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: '5px' }}>Société</label>
              <input
                type="text" placeholder="Optionnel"
                value={formData.societe}
                onChange={e => setFormData({ ...formData, societe: e.target.value })}
                style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1.5px solid rgba(0,0,0,0.09)', fontSize: '13px', outline: 'none', boxSizing: 'border-box', background: '#f8faff', fontFamily: 'inherit' }}
                onFocus={e => { e.target.style.borderColor = '#0057A8'; e.target.style.boxShadow = '0 0 0 3px rgba(0,87,168,0.07)' }}
                onBlur={e => { e.target.style.borderColor = 'rgba(0,0,0,0.09)'; e.target.style.boxShadow = 'none' }}
              />
            </div>

            {erreur && (
              <div style={{ padding: '10px 12px', background: '#fff5f5', border: '1px solid #fecaca', borderRadius: '10px', color: '#dc2626', fontSize: '13px', marginBottom: '12px' }}>
                {erreur}
              </div>
            )}

            <div style={{ display: 'flex', gap: '10px' }}>
              <button type="button" onClick={() => setStep('select')}
                style={{ padding: '11px 16px', borderRadius: '10px', border: '1.5px solid #e2e8f0', background: '#fff', cursor: 'pointer', fontSize: '13px', fontWeight: 700, color: '#64748b', fontFamily: 'inherit' }}>
                ← Retour
              </button>
              <button type="submit" disabled={loading}
                style={{ flex: 1, padding: '11px 16px', borderRadius: '10px', background: 'linear-gradient(135deg, #C9A84C, #CC0000)', color: '#fff', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', fontSize: '13px', fontWeight: 800, opacity: loading ? 0.7 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontFamily: 'inherit' }}>
                {loading ? 'Envoi...' : (
                  <>
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                    </svg>
                    Télécharger la brochure
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        {/* ── STEP 3 : Succès ── */}
        {step === 'success' && (
          <div style={{ padding: '32px 24px', textAlign: 'center' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'linear-gradient(135deg, #C9A84C, #CC0000)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <svg width="28" height="28" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
              </svg>
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#0f172a', marginBottom: '8px' }}>Téléchargement lancé !</h3>
            <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '24px', lineHeight: 1.6 }}>
              La brochure <strong>{selected?.label}</strong> se télécharge automatiquement.
            </p>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={() => { setStep('select'); setSelected(null); setFormData({ nom: '', prenom: '', email: '', telephone: '', societe: '' }) }}
                style={{ padding: '10px 18px', borderRadius: '10px', border: '1.5px solid #C9A84C', color: '#C9A84C', background: '#fff', cursor: 'pointer', fontSize: '13px', fontWeight: 700, fontFamily: 'inherit' }}>
                Autre brochure
              </button>
              <button onClick={onClose}
                style={{ padding: '10px 18px', borderRadius: '10px', background: 'linear-gradient(135deg, #C9A84C, #CC0000)', color: '#fff', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: 700, fontFamily: 'inherit' }}>
                Fermer
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}