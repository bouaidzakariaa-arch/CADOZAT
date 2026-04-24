'use client'
import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

/* ── données ────────────────────────────────────────────────────────── */
const vehiculesData = [
  { serie: 'D-MAX', couleur: '#CC0000', modeles: [
    { nom: 'D-MAX TFR — Pick-up SC 4×2',      value: 'dmax-tfr-sc-4x2' },
    { nom: 'D-MAX TFR — Pick-up SC 4×2 Clim', value: 'dmax-tfr-sc-4x2-clim' },
    { nom: 'D-MAX TFR — Pick-up DC 4×2',      value: 'dmax-tfr-dc-4x2' },
    { nom: 'D-MAX TFS — Pick-up DC 4×4',      value: 'dmax-tfs-dc-4x4' },
  ]},
  { serie: 'N-Series', couleur: '#1B2B6B', modeles: [
    { nom: 'NMR 77E — 3.5T Châssis court', value: 'nmr-77e' },
    { nom: 'NMR 85H — 3.5T Châssis long',  value: 'nmr-85h' },
    { nom: 'NNR 85H — 3.5T Châssis long',  value: 'nnr-85h' },
    { nom: 'NPR 75K — 7.5T Châssis court', value: 'npr-75k' },
    { nom: 'NPR 75L — 7.5T Châssis long',  value: 'npr-75l' },
    { nom: 'NQR 90K — 9.5T Châssis court', value: 'nqr-90k' },
    { nom: 'NQR 90M — 9.5T Châssis long',  value: 'nqr-90m' },
  ]},
  { serie: 'F-Series', couleur: '#333333', modeles: [
    { nom: 'FTR 34K — 16T Châssis court',         value: 'ftr-34k' },
    { nom: 'FTR 34M — 16T Châssis intermédiaire', value: 'ftr-34m' },
    { nom: 'FTR 34P — 16T Châssis long',          value: 'ftr-34p' },
    { nom: 'FVR 34K — 18T Châssis court',         value: 'fvr-34k' },
    { nom: 'FVR 34P — 18T Châssis long',          value: 'fvr-34p' },
  ]},
  { serie: 'Karry', couleur: '#0057A8', modeles: [
    { nom: 'Karry 22B — Fourgon utilitaire', value: 'karry-22b' },
    { nom: 'Karry 22Q — Fourgon utilitaire', value: 'karry-22q' },
  ]},
  { serie: 'Great Wall', couleur: '#C9A84C', modeles: [
    { nom: 'Great Wall Pick-up SC — Simple cabine', value: 'great-wall-sc' },
    { nom: 'Great Wall Pick-up DC — Double cabine', value: 'great-wall-dc' },
  ]},
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

/* ── CSS complet ─────────────────────────────────────────────────────── */
const CSS = `
  /* ── Reset page background ── */
  body { background: #f4f5f7 !important; }

  /* ── Blobs fixes ── */
  .dv-blob {
    position: fixed;
    border-radius: 50%;
    pointer-events: none;
    z-index: 0;
  }
  .dv-blob-red {
    width: 600px; height: 600px;
    background: #CC0000;
    opacity: 0.07;
    filter: blur(100px);
    top: -150px; right: -150px;
    animation: dvBlob1 18s ease-in-out infinite;
  }
  .dv-blob-blue {
    width: 500px; height: 500px;
    background: #1B2B6B;
    opacity: 0.06;
    filter: blur(100px);
    bottom: -100px; left: -120px;
    animation: dvBlob2 22s ease-in-out infinite;
  }
  .dv-blob-gold {
    width: 350px; height: 350px;
    background: #C9A84C;
    opacity: 0.07;
    filter: blur(80px);
    top: 40%; left: 30%;
    animation: dvBlob3 15s ease-in-out infinite;
  }
  @keyframes dvBlob1 {
    0%,100% { transform: translate(0,0) scale(1); }
    33%      { transform: translate(80px,-60px) scale(1.15); }
    66%      { transform: translate(-40px,50px) scale(0.9); }
  }
  @keyframes dvBlob2 {
    0%,100% { transform: translate(0,0) scale(1); }
    40%      { transform: translate(-80px,60px) scale(1.1); }
    80%      { transform: translate(60px,-80px) scale(0.92); }
  }
  @keyframes dvBlob3 {
    0%,100% { transform: translate(0,0) scale(1); }
    50%      { transform: translate(60px,50px) scale(1.12); }
  }

  /* ── Wrapper page ── */
  .dv-page {
    position: relative;
    z-index: 1;
    min-height: 100vh;
  }

  /* ── Hero ── */
  .dv-hero {
    max-width: 1100px;
    margin: 0 auto;
    padding: 48px 24px 32px;
    animation: dvFadeUp 0.5s ease both;
  }
  @keyframes dvFadeUp {
    from { opacity:0; transform:translateY(20px); }
    to   { opacity:1; transform:translateY(0); }
  }
  .dv-breadcrumb { font-size:12px; color:#bbb; margin-bottom:20px; display:flex; gap:6px; align-items:center; }
  .dv-breadcrumb a { color:#bbb; text-decoration:none; }
  .dv-breadcrumb a:hover { color:#CC0000; }
  .dv-h1 { font-size:46px; font-weight:900; color:#111; letter-spacing:-1.5px; line-height:1; margin-bottom:14px; }
  .dv-h1 em { color:#CC0000; font-style:normal; }
  .dv-accent { display:flex; gap:8px; align-items:center; margin-bottom:16px; }
  .dv-accent-red  { width:32px; height:3px; background:#CC0000; border-radius:99px; }
  .dv-accent-gold { width:16px; height:3px; background:#C9A84C; border-radius:99px; }
  .dv-subtitle { font-size:15px; color:#999; line-height:1.7; max-width:460px; }
  .dv-prebadge {
    display:inline-flex; align-items:center; gap:8px;
    margin-top:16px; background:#fff; border:1px solid #e8e5e0;
    border-radius:99px; padding:7px 16px;
    font-size:13px; font-weight:600; color:#444;
    box-shadow:0 2px 12px rgba(0,0,0,0.06);
    animation: dvFadeUp 0.5s 0.1s ease both;
  }
  .dv-prebadge-dot { width:8px; height:8px; border-radius:50%; background:#22c55e; flex-shrink:0; }

  /* ── Card principale ── */
  .dv-wrap { max-width:1100px; margin:0 auto; padding:0 24px 64px; }
  .dv-card {
    background:#fff;
    border-radius:22px;
    border:1px solid #e8e5e0;
    box-shadow:0 12px 48px rgba(0,0,0,0.07);
    overflow:hidden;
    animation: dvFadeUp 0.5s 0.05s ease both;
  }
  .dv-topbar { height:3px; background:linear-gradient(90deg,#CC0000,#C9A84C,#1B2B6B); }
  .dv-grid { display:grid; grid-template-columns:1fr 1fr; }
  @media(max-width:768px){ .dv-grid { grid-template-columns:1fr; } }

  /* ── Colonne gauche ── */
  .dv-col-l { padding:36px; border-right:1px solid #f2efe9; }
  @media(max-width:768px){ .dv-col-l { border-right:none; border-bottom:1px solid #f2efe9; } }

  /* ── Colonne droite ── */
  .dv-col-r { padding:36px; }

  /* ── Step label ── */
  .dv-step { display:flex; align-items:center; gap:12px; margin-bottom:24px; }
  .dv-step-n {
    width:34px; height:34px; border-radius:50%;
    background:#CC0000; color:#fff;
    font-weight:900; font-size:14px;
    display:flex; align-items:center; justify-content:center;
    flex-shrink:0;
  }
  .dv-step-t { font-size:17px; font-weight:700; color:#111; }

  /* ── Vehicle box ── */
  .dv-vbox { border-radius:16px; border:1px solid #ede9e2; overflow:hidden; background:#fafaf8; }
  .dv-vimg  { height:220px; background:#fff; display:flex; align-items:center; justify-content:center; position:relative; }
  .dv-vfoot {
    padding:14px 18px; border-top:1px solid #ede9e2;
    display:flex; align-items:center; justify-content:space-between;
  }
  .dv-vname { font-size:13px; font-weight:700; color:#111; }
  .dv-vbadge {
    display:inline-block; margin-top:5px;
    padding:2px 10px; border-radius:99px;
    font-size:11px; font-weight:700; color:#fff;
  }
  .dv-vchange { font-size:11px; color:#ccc; text-decoration:underline; cursor:pointer; transition:color 0.2s; }
  .dv-vchange:hover { color:#CC0000; }

  /* ── Aperçu vide ── */
  .dv-empty {
    min-height:190px; display:flex; flex-direction:column;
    align-items:center; justify-content:center;
    border-radius:14px; color:#ddd;
    border:1.5px dashed #e5e2dd; text-align:center;
    font-size:13px; gap:10px;
  }
  .dv-preview {
    min-height:190px; border-radius:14px;
    border:1px solid #ede9e2; background:#fff;
    display:flex; align-items:center; justify-content:center;
    position:relative; overflow:hidden;
  }
  .dv-preview-inner { width:100%; text-align:center; padding:16px; }

  /* ── Select ── */
  .dv-sel-wrap { position:relative; margin-top:14px; }
  .dv-sel {
    width:100%; padding:12px 42px 12px 14px;
    border:1.5px solid #e5e2dd; border-radius:12px;
    font-size:13px; color:#333; background:#fff;
    appearance:none; cursor:pointer; outline:none;
    font-family:inherit; transition:border-color 0.2s;
  }
  .dv-sel:hover,.dv-sel:focus { border-color:#CC0000; }
  .dv-arr { position:absolute; right:14px; top:50%; transform:translateY(-50%); pointer-events:none; color:#bbb; }

  /* ── Inputs ── */
  .dv-row { display:grid; grid-template-columns:1fr 1fr; gap:14px; margin-bottom:14px; }
  @media(max-width:768px){ .dv-row { grid-template-columns:1fr; } }
  .dv-f { margin-bottom:14px; }
  .dv-lbl {
    display:block; font-size:11px; font-weight:700;
    color:#aaa; letter-spacing:0.6px; text-transform:uppercase;
    margin-bottom:6px;
  }
  .dv-inp {
    width:100%; padding:11px 14px;
    border:1.5px solid #e5e2dd; border-radius:11px;
    font-size:13px; color:#111; background:#fff;
    outline:none; font-family:inherit;
    transition:border-color 0.2s, box-shadow 0.2s;
  }
  .dv-inp:focus { border-color:#CC0000; box-shadow:0 0 0 3px rgba(204,0,0,0.07); }
  .dv-inp::placeholder { color:#ccc; }
  .dv-ta {
    width:100%; padding:11px 14px;
    border:1.5px solid #e5e2dd; border-radius:11px;
    font-size:13px; color:#111; background:#fff;
    outline:none; font-family:inherit; resize:none; height:88px;
    transition:border-color 0.2s, box-shadow 0.2s;
  }
  .dv-ta:focus { border-color:#CC0000; box-shadow:0 0 0 3px rgba(204,0,0,0.07); }
  .dv-ta::placeholder { color:#ccc; }
  .dv-check { display:flex; align-items:flex-start; gap:10px; margin-bottom:14px; }
  .dv-check input { margin-top:2px; accent-color:#CC0000; flex-shrink:0; }
  .dv-check span { font-size:12px; color:#aaa; line-height:1.6; }

  /* ── Bouton ── */
  .dv-btn {
    width:100%; padding:14px; background:#CC0000; color:#fff;
    border:none; border-radius:12px; font-size:14px; font-weight:700;
    cursor:pointer; display:flex; align-items:center; justify-content:center; gap:8px;
    font-family:inherit; transition:background 0.2s, transform 0.1s;
    box-shadow:0 4px 16px rgba(204,0,0,0.2);
  }
  .dv-btn:hover { background:#aa0000; }
  .dv-btn:active { transform:scale(0.99); }
  .dv-btn:disabled { opacity:0.5; cursor:not-allowed; }
  .dv-legal { font-size:11px; color:#ccc; text-align:center; margin-top:10px; }
  .dv-legal a { color:#CC0000; text-decoration:none; }

  /* ── Error ── */
  .dv-err {
    padding:12px 14px; background:#fff5f5;
    border:1px solid #fecaca; border-radius:10px;
    color:#dc2626; font-size:13px; margin-bottom:14px;
  }

  /* ── Success ── */
  .dv-ok { padding:64px 32px; text-align:center; }
  .dv-ok h2 { font-size:24px; font-weight:900; color:#111; margin-bottom:8px; }
  .dv-ok p  { color:#aaa; font-size:14px; margin-bottom:28px; }

  /* ── Contact bar ── */
  .dv-contacts {
    display:grid; grid-template-columns:repeat(3,1fr); gap:14px; margin-top:20px;
    animation: dvFadeUp 0.5s 0.12s ease both;
  }
  @media(max-width:768px){ .dv-contacts { grid-template-columns:1fr; } }
  .dv-ci {
    background:#fff; border:1px solid #e8e5e0; border-radius:16px;
    padding:16px 18px; display:flex; align-items:center; gap:12px;
    box-shadow:0 2px 12px rgba(0,0,0,0.04);
  }
  .dv-ci-icon {
    width:42px; height:42px; border-radius:50%;
    display:flex; align-items:center; justify-content:center; flex-shrink:0;
  }
  .dv-ci-lbl { font-size:11px; color:#bbb; margin-bottom:3px; }
  .dv-ci-val { font-size:13px; font-weight:700; color:#111; }

  /* ── Note ── */
  .dv-note { font-size:11px; color:#ccc; margin-top:8px; }

  @keyframes spin { to { transform:rotate(360deg); } }
`

/* ── Badge pré-sélection ─────────────────────────────────────────────── */
function DevisFormBadge() {
  const sp    = useSearchParams()
  const param = sp.get('vehicule')
  if (!param) return null
  const v = vehiculesData.flatMap(s => s.modeles).find(m => m.value === param)
  if (!v) return null
  return (
    <div className="dv-prebadge">
      <span className="dv-prebadge-dot"/>
      Véhicule sélectionné :&nbsp;<strong style={{ color:'#CC0000' }}>{v.nom}</strong>
    </div>
  )
}

/* ── Formulaire ──────────────────────────────────────────────────────── */
function DevisForm() {
  const sp            = useSearchParams()
  const vehiculeParam = sp.get('vehicule')
  const allModeles    = vehiculesData.flatMap(s => s.modeles)
  const validParam    = vehiculeParam && allModeles.some(m => m.value === vehiculeParam) ? vehiculeParam : null
  const isPreselected = !!validParam

  const [fd, setFd] = useState({
    nom:'', prenom:'', societe:'', telephone:'',
    email:'', ville:'', vehicule: validParam ?? '', message:'', newsletter:false,
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error,   setError]   = useState('')

  useEffect(() => {
    if (validParam) setFd(p => ({ ...p, vehicule: validParam }))
  }, [validParam])

  const onChange = (e: React.ChangeEvent<HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFd(p => ({ ...p, [name]: type==='checkbox' ? (e.target as HTMLInputElement).checked : value }))
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true); setError('')
    try {
      const r = await fetch('/api/devis', {
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ ...fd, date:new Date().toISOString(), statut:'nouveau' }),
      })
      if (!r.ok) throw new Error()
      setSuccess(true)
      setFd({ nom:'', prenom:'', societe:'', telephone:'', email:'', ville:'', vehicule:'', message:'', newsletter:false })
    } catch { setError('Une erreur est survenue. Veuillez réessayer.') }
    finally { setLoading(false) }
  }

  const selV  = allModeles.find(m => m.value === fd.vehicule)
  const selS  = vehiculesData.find(s => s.modeles.some(m => m.value === fd.vehicule))
  const imgSrc = fd.vehicule ? imageMap[fd.vehicule] ?? null : null

  const VehicleIcon = () => (
    <svg width="52" height="52" fill="#e0ddd8" viewBox="0 0 24 24">
      <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
    </svg>
  )

  return (
    <div className="dv-wrap">
      <div className="dv-card">
        <div className="dv-topbar"/>

        {success ? (
          <div className="dv-ok">
            <div style={{ width:64,height:64,borderRadius:'50%',background:'#f0fdf4',border:'1px solid #bbf7d0',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 20px' }}>
              <svg width="28" height="28" fill="none" stroke="#22c55e" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
              </svg>
            </div>
            <h2>Demande envoyée !</h2>
            <p>Notre équipe vous contactera dans les plus brefs délais.</p>
            <Link href="/" style={{ display:'inline-flex',alignItems:'center',gap:8,padding:'11px 28px',background:'#CC0000',color:'#fff',borderRadius:99,fontWeight:700,fontSize:13,textDecoration:'none' }}>
              Retour à l&apos;accueil
            </Link>
          </div>
        ) : (
          <form onSubmit={onSubmit}>
            <div className="dv-grid">

              {/* ── Gauche ── */}
              <div className="dv-col-l">
                <div className="dv-step">
                  <div className="dv-step-n">1</div>
                  <div className="dv-step-t">{isPreselected ? 'Votre véhicule' : 'Sélectionnez votre véhicule'}</div>
                </div>

                {isPreselected ? (
                  <div className="dv-vbox">
                    <div className="dv-vimg">
                      {imgSrc
                        ? <Image src={imgSrc} alt={selV?.nom||''} fill style={{ objectFit:'contain', padding:20 }}/>
                        : <div style={{ color:'#ddd', textAlign:'center' }}><VehicleIcon/><p style={{ fontSize:13,marginTop:8 }}>Image bientôt disponible</p></div>
                      }
                    </div>
                    <div className="dv-vfoot">
                      <div>
                        <div className="dv-vname">{selV?.nom}</div>
                        {selS && <span className="dv-vbadge" style={{ background:selS.couleur }}>{selS.serie}</span>}
                      </div>
                      <Link href="/devis" className="dv-vchange">Changer</Link>
                    </div>
                  </div>
                ) : (
                  <>
                    {fd.vehicule ? (
                      <div className="dv-preview">
                        <div className="dv-preview-inner">
                          <div style={{ position:'relative', width:'100%', height:140, marginBottom:12 }}>
                            {imgSrc
                              ? <Image key={fd.vehicule} src={imgSrc} alt={selV?.nom||''} fill style={{ objectFit:'contain' }}/>
                              : <div style={{ color:'#ddd', textAlign:'center', paddingTop:30 }}><VehicleIcon/></div>
                            }
                          </div>
                          <p style={{ fontSize:13,fontWeight:700,color:'#111' }}>{selV?.nom}</p>
                          {selS && <span className="dv-vbadge" style={{ background:selS.couleur, marginTop:6 }}>{selS.serie}</span>}
                        </div>
                      </div>
                    ) : (
                      <div className="dv-empty">
                        <VehicleIcon/>
                        <span>Sélectionnez un véhicule<br/>pour voir son image</span>
                      </div>
                    )}

                    <div className="dv-sel-wrap">
                      <select name="vehicule" value={fd.vehicule} onChange={onChange} required className="dv-sel">
                        <option value="">Choisissez un véhicule</option>
                        {vehiculesData.map(s => (
                          <optgroup key={s.serie} label={`━━ ${s.serie} ━━`}>
                            {s.modeles.map(m => <option key={m.value} value={m.value}>{m.nom}</option>)}
                          </optgroup>
                        ))}
                      </select>
                      <svg className="dv-arr" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
                      </svg>
                    </div>
                    <p className="dv-note">* Photos non contractuelles</p>
                  </>
                )}
              </div>

              {/* ── Droite ── */}
              <div className="dv-col-r">
                <div className="dv-step">
                  <div className="dv-step-n">2</div>
                  <div className="dv-step-t">Vos coordonnées</div>
                </div>

                <div className="dv-row">
                  <div>
                    <label className="dv-lbl">Nom *</label>
                    <input name="nom" value={fd.nom} onChange={onChange} required placeholder="Votre nom" className="dv-inp"/>
                  </div>
                  <div>
                    <label className="dv-lbl">Prénom *</label>
                    <input name="prenom" value={fd.prenom} onChange={onChange} required placeholder="Votre prénom" className="dv-inp"/>
                  </div>
                </div>
                <div className="dv-f">
                  <label className="dv-lbl">Société</label>
                  <input name="societe" value={fd.societe} onChange={onChange} placeholder="Optionnel" className="dv-inp"/>
                </div>
                <div className="dv-row">
                  <div>
                    <label className="dv-lbl">Téléphone *</label>
                    <input type="tel" name="telephone" value={fd.telephone} onChange={onChange} required placeholder="06 00 00 00 00" className="dv-inp"/>
                  </div>
                  <div>
                    <label className="dv-lbl">Email *</label>
                    <input type="email" name="email" value={fd.email} onChange={onChange} required placeholder="votre@email.com" className="dv-inp"/>
                  </div>
                </div>
                <div className="dv-f">
                  <label className="dv-lbl">Ville *</label>
                  <input name="ville" value={fd.ville} onChange={onChange} required placeholder="Votre ville" className="dv-inp"/>
                </div>
                <div className="dv-f">
                  <label className="dv-lbl">Message</label>
                  <textarea name="message" value={fd.message} onChange={onChange} placeholder="Précisez vos besoins, délais..." className="dv-ta"/>
                </div>
                <div className="dv-check">
                  <input type="checkbox" name="newsletter" checked={fd.newsletter} onChange={onChange}/>
                  <span>J&apos;accepte de recevoir les offres commerciales de CADOZAT par email.</span>
                </div>
                {error && <div className="dv-err">{error}</div>}
                <button type="submit" disabled={loading} className="dv-btn">
                  {loading ? (
                    <>
                      <svg style={{ animation:'spin 0.9s linear infinite' }} width="16" height="16" fill="none" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="4"/>
                        <path fill="rgba(255,255,255,0.85)" d="M4 12a8 8 0 018-8V0C5.4 0 0 5.4 0 12h4z"/>
                      </svg>
                      Envoi en cours…
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
                <p className="dv-legal">
                  En soumettant, vous acceptez notre{' '}
                  <Link href="/mentions-legales">politique de confidentialité</Link>.
                </p>
              </div>
            </div>
          </form>
        )}
      </div>

      {/* Contact bar */}
      <div className="dv-contacts">
        {[
          { bg:'#fff5f5', icon:<svg width="20" height="20" fill="#CC0000" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/></svg>, label:'Appelez-nous', val:'0524 885 025' },
          { bg:'#eff2ff', icon:<svg width="20" height="20" fill="#1B2B6B" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/></svg>, label:'Écrivez-nous', val:'contact@cadozat.com' },
          { bg:'#fdf8ed', icon:<svg width="20" height="20" fill="#C9A84C" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/></svg>, label:'Horaires', val:'Lun–Sam  8h–18h' },
        ].map((c,i) => (
          <div key={i} className="dv-ci">
            <div className="dv-ci-icon" style={{ background:c.bg }}>{c.icon}</div>
            <div>
              <div className="dv-ci-lbl">{c.label}</div>
              <div className="dv-ci-val">{c.val}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Export ──────────────────────────────────────────────────────────── */
export default function DevisPage() {
  return (
    <>
      {/* CSS injecté — priorité haute grâce au !important sur body */}
      <style dangerouslySetInnerHTML={{ __html: CSS }}/>

      {/* Blobs fixes — en dehors du flux normal, couvrent toute la fenêtre */}
      <div className="dv-blob dv-blob-red"  aria-hidden="true"/>
      <div className="dv-blob dv-blob-blue" aria-hidden="true"/>
      <div className="dv-blob dv-blob-gold" aria-hidden="true"/>

      <main className="dv-page">
        {/* Hero */}
        <div className="dv-hero">
          <nav className="dv-breadcrumb">
            <Link href="/">Accueil</Link>
            <span>/</span>
            <span style={{ color:'#CC0000', fontWeight:600 }}>Demande de devis</span>
          </nav>
          <h1 className="dv-h1">Demande de <em>devis</em></h1>
          <div className="dv-accent">
            <div className="dv-accent-red"/>
            <div className="dv-accent-gold"/>
          </div>
          <p className="dv-subtitle">
            Remplissez le formulaire et notre équipe commerciale vous contactera dans les plus brefs délais.
          </p>
          <Suspense fallback={null}>
            <DevisFormBadge/>
          </Suspense>
        </div>

        {/* Formulaire */}
        <Suspense fallback={
          <div className="dv-wrap">
            <div style={{ background:'#fff', borderRadius:22, height:400, display:'flex', alignItems:'center', justifyContent:'center', border:'1px solid #e8e5e0' }}>
              <p style={{ color:'#ccc', fontSize:14 }}>Chargement…</p>
            </div>
          </div>
        }>
          <DevisForm/>
        </Suspense>
      </main>
    </>
  )
}