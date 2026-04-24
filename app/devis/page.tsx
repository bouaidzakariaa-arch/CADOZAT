'use client'
import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

/* ─── données ─────────────────────────────────────────────────────────── */
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
      { nom: 'NMR 77E — 3.5T Châssis court', value: 'nmr-77e' },
      { nom: 'NMR 85H — 3.5T Châssis long',  value: 'nmr-85h' },
      { nom: 'NNR 85H — 3.5T Châssis long',  value: 'nnr-85h' },
      { nom: 'NPR 75K — 7.5T Châssis court', value: 'npr-75k' },
      { nom: 'NPR 75L — 7.5T Châssis long',  value: 'npr-75l' },
      { nom: 'NQR 90K — 9.5T Châssis court', value: 'nqr-90k' },
      { nom: 'NQR 90M — 9.5T Châssis long',  value: 'nqr-90m' },
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
  'nmr-77e':  '/images/vehicules/nmr-77e.jpg',
  'npr-75k':  '/images/vehicules/npr-75k.jpg',
  'npr-75l':  '/images/vehicules/npr-75l.jpg',
  'ftr-34k':  '/images/vehicules/ftr-34k.jpg',
  'ftr-34m':  '/images/vehicules/ftr-34m.jpg',
  'ftr-34p':  '/images/vehicules/ftr-34p.jpg',
  'fvr-34k':  '/images/vehicules/fvr-34k.jpg',
  'fvr-34p':  '/images/vehicules/fvr-34p.jpg',
  'karry-22b': '/images/vehicules/karry-22b.jpg',
  'karry-22q': '/images/vehicules/karry-22q.jpg',
}

/* ─── CSS animations injecté une seule fois ───────────────────────────── */
const globalStyles = `
  @keyframes cadBlob1 {
    0%,100% { transform: translate(0,0) scale(1); }
    33%      { transform: translate(60px,-50px) scale(1.12); }
    66%      { transform: translate(-30px,40px) scale(0.92); }
  }
  @keyframes cadBlob2 {
    0%,100% { transform: translate(0,0) scale(1); }
    40%      { transform: translate(-70px,50px) scale(1.08); }
    80%      { transform: translate(40px,-60px) scale(0.94); }
  }
  @keyframes cadBlob3 {
    0%,100% { transform: translate(0,0) scale(1); }
    50%      { transform: translate(50px,40px) scale(1.1); }
  }
  @keyframes cadFadeUp {
    from { opacity:0; transform:translateY(24px); }
    to   { opacity:1; transform:translateY(0); }
  }
  .cad-page {
    min-height: 100vh;
    background: #f5f6f8;
    position: relative;
    overflow-x: hidden;
  }
  .cad-bg {
    position: absolute;
    inset: 0;
    overflow: hidden;
    pointer-events: none;
    z-index: 0;
  }
  .cad-blob {
    position: absolute;
    border-radius: 50%;
    filter: blur(90px);
  }
  .cad-blob-1 {
    width: 520px; height: 520px;
    background: radial-gradient(circle, #CC0000 0%, transparent 70%);
    opacity: 0.10;
    top: -140px; right: -120px;
    animation: cadBlob1 16s ease-in-out infinite;
  }
  .cad-blob-2 {
    width: 420px; height: 420px;
    background: radial-gradient(circle, #1B2B6B 0%, transparent 70%);
    opacity: 0.09;
    bottom: 40px; left: -100px;
    animation: cadBlob2 20s ease-in-out infinite;
  }
  .cad-blob-3 {
    width: 300px; height: 300px;
    background: radial-gradient(circle, #C9A84C 0%, transparent 70%);
    opacity: 0.10;
    top: 42%; left: 38%;
    animation: cadBlob3 13s ease-in-out infinite;
  }
  .cad-content {
    position: relative;
    z-index: 1;
  }
  .cad-hero {
    padding: 52px 0 36px;
    animation: cadFadeUp 0.6s ease both;
  }
  .cad-card {
    background: #ffffff;
    border-radius: 20px;
    border: 1px solid #e8e6e1;
    box-shadow: 0 8px 40px rgba(0,0,0,0.07);
    overflow: hidden;
    animation: cadFadeUp 0.7s 0.08s ease both;
  }
  .cad-topbar {
    height: 3px;
    background: linear-gradient(90deg, #CC0000 0%, #C9A84C 50%, #1B2B6B 100%);
  }
  .cad-form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  .cad-left {
    padding: 36px;
    border-right: 1px solid #f0ede8;
  }
  .cad-right {
    padding: 36px;
  }
  .cad-step {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 24px;
  }
  .cad-step-num {
    width: 34px; height: 34px;
    border-radius: 50%;
    background: #CC0000;
    color: #fff;
    font-weight: 800;
    font-size: 14px;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }
  .cad-step-title {
    font-size: 17px;
    font-weight: 700;
    color: #111;
    letter-spacing: -0.2px;
  }
  .cad-vehicle-box {
    border-radius: 14px;
    border: 1px solid #ece9e4;
    overflow: hidden;
    background: #fafaf9;
  }
  .cad-vehicle-img {
    height: 210px;
    background: #fff;
    display: flex; align-items: center; justify-content: center;
    position: relative;
  }
  .cad-vehicle-footer {
    padding: 14px 18px;
    border-top: 1px solid #ece9e4;
    display: flex; align-items: center; justify-content: space-between;
    background: #fafaf9;
  }
  .cad-vehicle-name { font-size: 13px; font-weight: 700; color: #111; }
  .cad-vehicle-badge {
    display: inline-block;
    margin-top: 5px;
    padding: 2px 10px;
    border-radius: 99px;
    font-size: 11px;
    font-weight: 700;
    color: #fff;
  }
  .cad-change {
    font-size: 11px;
    color: #ccc;
    text-decoration: underline;
    cursor: pointer;
    transition: color 0.2s;
  }
  .cad-change:hover { color: #CC0000; }
  .cad-empty {
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    height: 200px;
    color: #ddd;
    text-align: center;
  }
  .cad-empty p { font-size: 13px; margin-top: 8px; }
  .cad-select-wrap { position: relative; margin-top: 16px; }
  .cad-select {
    width: 100%;
    padding: 12px 42px 12px 14px;
    border: 1.5px solid #e5e2dd;
    border-radius: 12px;
    font-size: 13px;
    color: #333;
    background: #fff;
    appearance: none;
    cursor: pointer;
    outline: none;
    font-family: inherit;
    transition: border-color 0.2s;
  }
  .cad-select:focus, .cad-select:hover { border-color: #CC0000; }
  .cad-select-arrow {
    position: absolute; right: 14px; top: 50%;
    transform: translateY(-50%);
    pointer-events: none; color: #aaa;
  }
  .cad-field { margin-bottom: 14px; }
  .cad-field-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 14px; }
  .cad-label {
    display: block;
    font-size: 11px;
    font-weight: 600;
    color: #888;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 6px;
  }
  .cad-input {
    width: 100%;
    padding: 11px 14px;
    border: 1.5px solid #e5e2dd;
    border-radius: 10px;
    font-size: 13px;
    color: #111;
    background: #fff;
    outline: none;
    font-family: inherit;
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  .cad-input:focus {
    border-color: #CC0000;
    box-shadow: 0 0 0 3px rgba(204,0,0,0.06);
  }
  .cad-textarea {
    width: 100%;
    padding: 11px 14px;
    border: 1.5px solid #e5e2dd;
    border-radius: 10px;
    font-size: 13px;
    color: #111;
    background: #fff;
    outline: none;
    font-family: inherit;
    resize: none;
    height: 88px;
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  .cad-textarea:focus {
    border-color: #CC0000;
    box-shadow: 0 0 0 3px rgba(204,0,0,0.06);
  }
  .cad-check { display: flex; align-items: flex-start; gap: 10px; margin-bottom: 14px; }
  .cad-check input { margin-top: 2px; accent-color: #CC0000; flex-shrink: 0; }
  .cad-check span { font-size: 12px; color: #999; line-height: 1.5; }
  .cad-btn {
    width: 100%;
    padding: 14px;
    background: #CC0000;
    color: #fff;
    border: none;
    border-radius: 12px;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
    display: flex; align-items: center; justify-content: center; gap: 8px;
    transition: background 0.2s, transform 0.1s;
    font-family: inherit;
  }
  .cad-btn:hover { background: #aa0000; }
  .cad-btn:active { transform: scale(0.99); }
  .cad-btn:disabled { opacity: 0.55; cursor: not-allowed; }
  .cad-legal { font-size: 11px; color: #ccc; text-align: center; margin-top: 10px; }
  .cad-legal a { color: #CC0000; }
  .cad-contacts {
    display: grid;
    grid-template-columns: repeat(3,1fr);
    gap: 14px;
    margin-top: 20px;
    animation: cadFadeUp 0.7s 0.16s ease both;
  }
  .cad-contact-item {
    background: #fff;
    border: 1px solid #e8e6e1;
    border-radius: 14px;
    padding: 16px;
    display: flex; align-items: center; gap: 12px;
  }
  .cad-contact-icon {
    width: 40px; height: 40px;
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }
  .cad-contact-label { font-size: 11px; color: #aaa; margin-bottom: 2px; }
  .cad-contact-value { font-size: 13px; font-weight: 700; color: #111; }
  .cad-badge-pre {
    display: inline-flex; align-items: center; gap: 8px;
    margin-top: 16px;
    background: #fff;
    border: 1px solid #e5e2dd;
    border-radius: 99px;
    padding: 7px 16px;
    font-size: 13px;
    font-weight: 600;
    color: #444;
    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  }
  .cad-badge-dot {
    width: 8px; height: 8px;
    border-radius: 50%;
    background: #22c55e;
    flex-shrink: 0;
  }
  .cad-error {
    padding: 12px 14px;
    background: #fff5f5;
    border: 1px solid #fecaca;
    border-radius: 10px;
    color: #dc2626;
    font-size: 13px;
    margin-bottom: 14px;
  }
  .cad-success {
    padding: 64px 32px;
    text-align: center;
  }
  .cad-note { font-size: 11px; color: #ccc; margin-top: 8px; }
  @media (max-width: 768px) {
    .cad-form-grid { grid-template-columns: 1fr; }
    .cad-left { border-right: none; border-bottom: 1px solid #f0ede8; }
    .cad-field-row { grid-template-columns: 1fr; }
    .cad-contacts { grid-template-columns: 1fr; }
    .cad-blob-1 { width: 280px; height: 280px; }
    .cad-blob-2 { width: 220px; height: 220px; }
    .cad-blob-3 { width: 160px; height: 160px; }
  }
`

/* ─── Badge pré-sélection (header) ───────────────────────────────────── */
function DevisFormBadge() {
  const searchParams = useSearchParams()
  const param = searchParams.get('vehicule')
  if (!param) return null
  const vehicle = vehiculesData.flatMap(s => s.modeles).find(m => m.value === param)
  if (!vehicle) return null
  return (
    <div className="cad-badge-pre">
      <span className="cad-badge-dot" />
      Véhicule sélectionné :&nbsp;<strong style={{ color: '#CC0000' }}>{vehicle.nom}</strong>
    </div>
  )
}

/* ─── Formulaire principal ────────────────────────────────────────────── */
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
    setLoading(true); setError('')
    try {
      const res = await fetch('/api/devis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, date: new Date().toISOString(), statut: 'nouveau' }),
      })
      if (!res.ok) throw new Error()
      setSuccess(true)
      setFormData({ nom:'', prenom:'', societe:'', telephone:'', email:'', ville:'', vehicule:'', message:'', newsletter:false })
    } catch { setError('Une erreur est survenue. Veuillez réessayer.') }
    finally { setLoading(false) }
  }

  const selectedVehicle = allModeles.find(m => m.value === formData.vehicule)
  const selectedSerie   = vehiculesData.find(s => s.modeles.some(m => m.value === formData.vehicule))
  const imageSrc        = formData.vehicule ? imageMap[formData.vehicule] ?? null : null

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px 60px' }}>
      <div className="cad-card">
        <div className="cad-topbar" />

        {success ? (
          <div className="cad-success">
            <div style={{ width:64, height:64, borderRadius:'50%', background:'#f0fdf4', border:'1px solid #bbf7d0', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 20px' }}>
              <svg width="28" height="28" fill="none" stroke="#22c55e" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
              </svg>
            </div>
            <h2 style={{ fontSize:22, fontWeight:800, color:'#111', marginBottom:8 }}>Demande envoyée !</h2>
            <p style={{ color:'#aaa', fontSize:14, marginBottom:28 }}>Notre équipe vous contactera dans les plus brefs délais.</p>
            <Link href="/" style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'10px 24px', background:'#CC0000', color:'#fff', borderRadius:99, fontWeight:700, fontSize:13, textDecoration:'none' }}>
              Retour à l&apos;accueil
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="cad-form-grid">

              {/* ── Gauche ── */}
              <div className="cad-left">
                <div className="cad-step">
                  <div className="cad-step-num">1</div>
                  <div className="cad-step-title">{isPreselected ? 'Votre véhicule' : 'Sélectionnez votre véhicule'}</div>
                </div>

                {isPreselected ? (
                  /* Véhicule fixe — grande image */
                  <div className="cad-vehicle-box">
                    <div className="cad-vehicle-img">
                      {imageSrc ? (
                        <Image src={imageSrc} alt={selectedVehicle?.nom || ''} fill style={{ objectFit:'contain', padding:20 }} />
                      ) : (
                        <div className="cad-empty">
                          <svg width="48" height="48" fill="#e5e5e5" viewBox="0 0 24 24">
                            <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99z"/>
                          </svg>
                          <p>Image bientôt disponible</p>
                        </div>
                      )}
                    </div>
                    <div className="cad-vehicle-footer">
                      <div>
                        <div className="cad-vehicle-name">{selectedVehicle?.nom}</div>
                        {selectedSerie && (
                          <span className="cad-vehicle-badge" style={{ background: selectedSerie.couleur }}>{selectedSerie.serie}</span>
                        )}
                      </div>
                      <Link href="/devis" className="cad-change">Changer</Link>
                    </div>
                  </div>
                ) : (
                  /* Select + aperçu */
                  <>
                    <div style={{
                      borderRadius:14, border: formData.vehicule ? '1px solid #ece9e4' : '1.5px dashed #e5e2dd',
                      minHeight:190, display:'flex', alignItems:'center', justifyContent:'center',
                      background: formData.vehicule ? '#fff' : '#fafaf9', overflow:'hidden', position:'relative',
                    }}>
                      {formData.vehicule ? (
                        <div style={{ width:'100%', textAlign:'center', padding:'20px 16px' }}>
                          <div style={{ position:'relative', width:'100%', height:130 }}>
                            {imageSrc ? (
                              <Image key={formData.vehicule} src={imageSrc} alt={selectedVehicle?.nom || ''} fill style={{ objectFit:'contain' }}/>
                            ) : (
                              <div className="cad-empty"><p>Image bientôt disponible</p></div>
                            )}
                          </div>
                          <p style={{ fontSize:13, fontWeight:700, color:'#111', marginTop:10 }}>{selectedVehicle?.nom}</p>
                          {selectedSerie && (
                            <span className="cad-vehicle-badge" style={{ background: selectedSerie.couleur, marginTop:6 }}>{selectedSerie.serie}</span>
                          )}
                        </div>
                      ) : (
                        <div className="cad-empty">
                          <svg width="52" height="52" fill="#e0ddd8" viewBox="0 0 24 24">
                            <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99z"/>
                          </svg>
                          <p>Sélectionnez un véhicule<br/>pour voir son image</p>
                        </div>
                      )}
                    </div>

                    <div className="cad-select-wrap">
                      <select name="vehicule" value={formData.vehicule} onChange={handleChange} required className="cad-select">
                        <option value="">Choisissez un véhicule</option>
                        {vehiculesData.map(serie => (
                          <optgroup key={serie.serie} label={`━━ ${serie.serie} ━━`}>
                            {serie.modeles.map(m => (
                              <option key={m.value} value={m.value}>{m.nom}</option>
                            ))}
                          </optgroup>
                        ))}
                      </select>
                      <svg className="cad-select-arrow" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
                      </svg>
                    </div>
                    <p className="cad-note">* Photos non contractuelles</p>
                  </>
                )}
              </div>

              {/* ── Droite ── */}
              <div className="cad-right">
                <div className="cad-step">
                  <div className="cad-step-num">2</div>
                  <div className="cad-step-title">Vos coordonnées</div>
                </div>

                <div className="cad-field-row">
                  <div>
                    <label className="cad-label">Nom *</label>
                    <input type="text" name="nom" value={formData.nom} onChange={handleChange} required placeholder="Votre nom" className="cad-input"/>
                  </div>
                  <div>
                    <label className="cad-label">Prénom *</label>
                    <input type="text" name="prenom" value={formData.prenom} onChange={handleChange} required placeholder="Votre prénom" className="cad-input"/>
                  </div>
                </div>

                <div className="cad-field">
                  <label className="cad-label">Société</label>
                  <input type="text" name="societe" value={formData.societe} onChange={handleChange} placeholder="Optionnel" className="cad-input"/>
                </div>

                <div className="cad-field-row">
                  <div>
                    <label className="cad-label">Téléphone *</label>
                    <input type="tel" name="telephone" value={formData.telephone} onChange={handleChange} required placeholder="06 00 00 00 00" className="cad-input"/>
                  </div>
                  <div>
                    <label className="cad-label">Email *</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="votre@email.com" className="cad-input"/>
                  </div>
                </div>

                <div className="cad-field">
                  <label className="cad-label">Ville *</label>
                  <input type="text" name="ville" value={formData.ville} onChange={handleChange} required placeholder="Votre ville" className="cad-input"/>
                </div>

                <div className="cad-field">
                  <label className="cad-label">Message</label>
                  <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Précisez vos besoins, options souhaitées, délais..." className="cad-textarea"/>
                </div>

                <div className="cad-check">
                  <input type="checkbox" name="newsletter" checked={formData.newsletter} onChange={handleChange}/>
                  <span>J&apos;accepte de recevoir les offres commerciales et actualités de CADOZAT par email.</span>
                </div>

                {error && <div className="cad-error">{error}</div>}

                <button type="submit" disabled={loading} className="cad-btn">
                  {loading ? (
                    <>
                      <svg style={{ animation:'spin 1s linear infinite' }} width="16" height="16" fill="none" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="4"/>
                        <path fill="rgba(255,255,255,0.9)" d="M4 12a8 8 0 018-8V0C5.4 0 0 5.4 0 12h4z"/>
                      </svg>
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      Envoyer ma demande
                      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                      </svg>
                    </>
                  )}
                </button>

                <p className="cad-legal">
                  En soumettant, vous acceptez notre{' '}
                  <Link href="/mentions-legales">politique de confidentialité</Link>.
                </p>
              </div>
            </div>
          </form>
        )}
      </div>

      {/* Contact bar */}
      <div className="cad-contacts">
        {[
          { bg:'#fff5f5', color:'#CC0000', label:'Appelez-nous', value:'0524 885 025',
            icon:<svg width="20" height="20" fill="#CC0000" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/></svg> },
          { bg:'#eff2ff', color:'#1B2B6B', label:'Écrivez-nous', value:'contact@cadozat.com',
            icon:<svg width="20" height="20" fill="#1B2B6B" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/></svg> },
          { bg:'#fdf8ed', color:'#C9A84C', label:'Horaires', value:'Lun–Sam  8h–18h',
            icon:<svg width="20" height="20" fill="#C9A84C" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/></svg> },
        ].map((c, i) => (
          <div key={i} className="cad-contact-item">
            <div className="cad-contact-icon" style={{ background: c.bg }}>{c.icon}</div>
            <div>
              <div className="cad-contact-label">{c.label}</div>
              <div className="cad-contact-value">{c.value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─── Page export ─────────────────────────────────────────────────────── */
export default function DevisPage() {
  return (
    <>
      {/* CSS global injecté dans le <head> */}
      <style dangerouslySetInnerHTML={{ __html: globalStyles }}/>

      <main className="cad-page">
        {/* Blobs animés */}
        <div className="cad-bg">
          <div className="cad-blob cad-blob-1"/>
          <div className="cad-blob cad-blob-2"/>
          <div className="cad-blob cad-blob-3"/>
        </div>

        {/* Contenu */}
        <div className="cad-content">
          {/* Hero */}
          <div style={{ maxWidth:1100, margin:'0 auto', padding:'0 24px' }}>
            <div className="cad-hero">
              <nav style={{ display:'flex', alignItems:'center', gap:6, fontSize:12, color:'#aaa', marginBottom:20 }}>
                <Link href="/" style={{ color:'#aaa', textDecoration:'none' }}>Accueil</Link>
                <span>/</span>
                <span style={{ color:'#CC0000', fontWeight:600 }}>Demande de devis</span>
              </nav>

              <h1 style={{ fontSize:44, fontWeight:900, color:'#111', letterSpacing:'-1px', lineHeight:1.1, marginBottom:12 }}>
                Demande de <span style={{ color:'#CC0000' }}>devis</span>
              </h1>

              <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:14 }}>
                <div style={{ width:32, height:3, background:'#CC0000', borderRadius:99 }}/>
                <div style={{ width:16, height:3, background:'#C9A84C', borderRadius:99 }}/>
              </div>

              <p style={{ fontSize:15, color:'#888', maxWidth:480, lineHeight:1.7 }}>
                Remplissez le formulaire et notre équipe commerciale vous contactera dans les plus brefs délais.
              </p>

              <Suspense fallback={null}>
                <DevisFormBadge/>
              </Suspense>
            </div>
          </div>

          {/* Formulaire */}
          <Suspense fallback={
            <div style={{ maxWidth:1100, margin:'0 auto', padding:'0 24px 60px' }}>
              <div style={{ background:'#fff', borderRadius:20, height:400, display:'flex', alignItems:'center', justifyContent:'center', border:'1px solid #e8e6e1' }}>
                <p style={{ color:'#ccc', fontSize:14 }}>Chargement…</p>
              </div>
            </div>
          }>
            <DevisForm/>
          </Suspense>
        </div>
      </main>
    </>
  )
}