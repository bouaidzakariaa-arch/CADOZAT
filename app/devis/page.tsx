'use client'
import { useState, useEffect, useRef, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

/* ─────────────────────────────────────────────────────────────────────
   DONNÉES
───────────────────────────────────────────────────────────────────── */
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
  'nmr-77e':              '/images/vehicules/nmr-77e.jpg',
  'npr-75k':              '/images/vehicules/npr-75k.jpg',
  'npr-75l':              '/images/vehicules/npr-75l.jpg',
  'ftr-34k':              '/images/vehicules/ftr-34k.jpg',
  'ftr-34m':              '/images/vehicules/ftr-34m.jpg',
  'ftr-34p':              '/images/vehicules/ftr-34p.jpg',
  'fvr-34k':              '/images/vehicules/fvr-34k.jpg',
  'fvr-34p':              '/images/vehicules/fvr-34p.jpg',
  'karry-22b':            '/images/vehicules/karry-22b.jpg',
  'karry-22q':            '/images/vehicules/karry-22q.jpg',
}

/* ─────────────────────────────────────────────────────────────────────
   CANVAS ANIMATED BACKGROUND
   Fonctionne peu importe le layout — canvas occupe toute la page
───────────────────────────────────────────────────────────────────── */
function AnimatedCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Blobs config
    const blobs = [
      { x: 0.85, y: 0.05, r: 380, color: '204,0,0',    opacity: 0.13, vx: 0.12, vy: 0.08  },
      { x: 0.10, y: 0.80, r: 320, color: '27,43,107',  opacity: 0.11, vx: -0.09, vy: -0.11 },
      { x: 0.45, y: 0.45, r: 240, color: '201,168,76', opacity: 0.12, vx: 0.07, vy: 0.13  },
      { x: 0.20, y: 0.20, r: 180, color: '204,0,0',    opacity: 0.07, vx: -0.11, vy: 0.09  },
      { x: 0.70, y: 0.70, r: 200, color: '27,43,107',  opacity: 0.07, vx: 0.08, vy: -0.07  },
    ]

    let animId: number
    let t = 0

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = Math.max(document.body.scrollHeight, window.innerHeight)
    }
    resize()
    window.addEventListener('resize', resize)

    const draw = () => {
      t += 0.003
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Fond clair
      ctx.fillStyle = '#f4f5f7'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      blobs.forEach((b, i) => {
        // Mouvement sinusoïdal doux
        const x = (b.x + Math.sin(t * b.vx + i * 1.3) * 0.12) * canvas.width
        const y = (b.y + Math.cos(t * b.vy + i * 0.9) * 0.10) * canvas.height
        const r = b.r + Math.sin(t * 0.5 + i) * 30

        const grad = ctx.createRadialGradient(x, y, 0, x, y, r)
        grad.addColorStop(0,   `rgba(${b.color}, ${b.opacity})`)
        grad.addColorStop(0.5, `rgba(${b.color}, ${b.opacity * 0.4})`)
        grad.addColorStop(1,   `rgba(${b.color}, 0)`)

        ctx.beginPath()
        ctx.arc(x, y, r, 0, Math.PI * 2)
        ctx.fillStyle = grad
        ctx.fill()
      })

      animId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0, left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        display: 'block',
      }}
    />
  )
}

/* ─────────────────────────────────────────────────────────────────────
   CSS
───────────────────────────────────────────────────────────────────── */
const CSS = `
  @keyframes dvFade {
    from { opacity:0; transform:translateY(18px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes dvSpin { to { transform:rotate(360deg); } }

  .dv-page {
    position: relative;
    min-height: 100vh;
    overflow-x: hidden;
  }
  .dv-content {
    position: relative;
    z-index: 1;
  }
  .dv-hero {
    max-width: 1100px; margin: 0 auto;
    padding: 52px 24px 36px;
    animation: dvFade .5s ease both;
  }
  .dv-bc { display:flex; align-items:center; gap:6px; font-size:12px; color:#999; margin-bottom:22px; }
  .dv-bc a { color:#999; text-decoration:none; transition:color .2s; }
  .dv-bc a:hover { color:#CC0000; }
  .dv-h1 { font-size:48px; font-weight:900; color:#111; letter-spacing:-1.5px; line-height:1; margin-bottom:14px; }
  .dv-h1 em { color:#CC0000; font-style:normal; }
  .dv-ul { display:flex; gap:8px; align-items:center; margin-bottom:18px; }
  .dv-ul-r { width:32px; height:3px; background:#CC0000; border-radius:99px; }
  .dv-ul-g { width:16px; height:3px; background:#C9A84C; border-radius:99px; }
  .dv-sub { font-size:15px; color:#888; line-height:1.75; max-width:460px; }

  .dv-prebadge {
    display:inline-flex; align-items:center; gap:8px; margin-top:18px;
    background:rgba(255,255,255,0.92); border:1px solid #e5e2dd;
    border-radius:99px; padding:8px 18px;
    font-size:13px; font-weight:600; color:#444;
    box-shadow:0 2px 16px rgba(0,0,0,0.08);
  }
  .dv-prebadge-dot { width:8px; height:8px; border-radius:50%; background:#22c55e; flex-shrink:0; }

  .dv-wrap { max-width:1100px; margin:0 auto; padding:0 24px 72px; }
  .dv-card {
    background: rgba(255,255,255,0.90);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border-radius: 22px;
    border: 1px solid rgba(255,255,255,0.95);
    box-shadow: 0 20px 64px rgba(0,0,0,0.08);
    overflow: hidden;
    animation: dvFade .5s .06s ease both;
  }
  .dv-bar { height:3px; background:linear-gradient(90deg,#CC0000,#C9A84C,#1B2B6B); }
  .dv-grid { display:grid; grid-template-columns:1fr 1fr; }
  @media(max-width:768px){ .dv-grid{ grid-template-columns:1fr; } }

  .dv-cl { padding:38px; border-right:1px solid rgba(0,0,0,0.06); }
  .dv-cr { padding:38px; }
  @media(max-width:768px){
    .dv-cl { border-right:none; border-bottom:1px solid rgba(0,0,0,0.06); }
  }

  .dv-step { display:flex; align-items:center; gap:12px; margin-bottom:26px; }
  .dv-sn {
    width:36px; height:36px; border-radius:50%;
    background:#CC0000; color:#fff; font-weight:900; font-size:15px;
    display:flex; align-items:center; justify-content:center; flex-shrink:0;
    box-shadow:0 4px 14px rgba(204,0,0,0.28);
  }
  .dv-st { font-size:17px; font-weight:700; color:#111; }

  .dv-vbox { border-radius:16px; border:1px solid #ede9e2; overflow:hidden; background:rgba(255,255,255,0.8); }
  .dv-vimg { height:230px; background:#fff; display:flex; align-items:center; justify-content:center; position:relative; }
  .dv-vft { padding:14px 18px; border-top:1px solid #ede9e2; display:flex; align-items:center; justify-content:space-between; background:rgba(250,249,248,0.9); }
  .dv-vnm { font-size:13px; font-weight:700; color:#111; }
  .dv-vbg { display:inline-block; margin-top:5px; padding:2px 10px; border-radius:99px; font-size:11px; font-weight:700; color:#fff; }
  .dv-vch { font-size:11px; color:#ccc; text-decoration:underline; cursor:pointer; transition:color .2s; }
  .dv-vch:hover { color:#CC0000; }

  .dv-empty {
    min-height:200px; display:flex; flex-direction:column;
    align-items:center; justify-content:center;
    border-radius:14px; border:1.5px dashed #e5e2dd;
    color:#ccc; font-size:13px; gap:10px; text-align:center;
    background:rgba(255,255,255,0.5);
  }
  .dv-prev {
    min-height:200px; border-radius:14px; border:1px solid #ede9e2;
    background:rgba(255,255,255,0.8);
    display:flex; align-items:center; justify-content:center;
    position:relative; overflow:hidden;
  }
  .dv-prev-in { width:100%; text-align:center; padding:18px; }

  .dv-sw { position:relative; margin-top:14px; }
  .dv-sel {
    width:100%; padding:12px 42px 12px 14px;
    border:1.5px solid #e5e2dd; border-radius:12px;
    font-size:13px; color:#333; background:rgba(255,255,255,0.9);
    appearance:none; cursor:pointer; outline:none;
    font-family:inherit; transition:border-color .2s;
  }
  .dv-sel:hover,.dv-sel:focus { border-color:#CC0000; }
  .dv-arr { position:absolute; right:14px; top:50%; transform:translateY(-50%); pointer-events:none; color:#bbb; }

  .dv-row { display:grid; grid-template-columns:1fr 1fr; gap:14px; margin-bottom:14px; }
  @media(max-width:768px){ .dv-row{ grid-template-columns:1fr; } }
  .dv-f { margin-bottom:14px; }
  .dv-lb { display:block; font-size:11px; font-weight:700; color:#aaa; letter-spacing:.6px; text-transform:uppercase; margin-bottom:6px; }
  .dv-inp {
    width:100%; padding:11px 14px; border:1.5px solid #e5e2dd; border-radius:11px;
    font-size:13px; color:#111; background:rgba(255,255,255,0.9);
    outline:none; font-family:inherit;
    transition:border-color .2s, box-shadow .2s; box-sizing:border-box;
  }
  .dv-inp:focus { border-color:#CC0000; box-shadow:0 0 0 3px rgba(204,0,0,.07); }
  .dv-inp::placeholder { color:#ccc; }
  .dv-ta {
    width:100%; padding:11px 14px; border:1.5px solid #e5e2dd; border-radius:11px;
    font-size:13px; color:#111; background:rgba(255,255,255,0.9);
    outline:none; font-family:inherit; resize:none; height:90px;
    transition:border-color .2s, box-shadow .2s; box-sizing:border-box;
  }
  .dv-ta:focus { border-color:#CC0000; box-shadow:0 0 0 3px rgba(204,0,0,.07); }
  .dv-ta::placeholder { color:#ccc; }

  .dv-ck { display:flex; align-items:flex-start; gap:10px; margin-bottom:14px; }
  .dv-ck input { margin-top:2px; accent-color:#CC0000; flex-shrink:0; }
  .dv-ck span { font-size:12px; color:#aaa; line-height:1.6; }

  .dv-btn {
    width:100%; padding:14px; background:#CC0000; color:#fff;
    border:none; border-radius:12px; font-size:14px; font-weight:700;
    cursor:pointer; display:flex; align-items:center; justify-content:center; gap:8px;
    font-family:inherit; transition:background .2s, transform .1s;
    box-shadow:0 6px 22px rgba(204,0,0,0.30);
  }
  .dv-btn:hover    { background:#aa0000; }
  .dv-btn:active   { transform:scale(.99); }
  .dv-btn:disabled { opacity:.5; cursor:not-allowed; }

  .dv-leg { font-size:11px; color:#ccc; text-align:center; margin-top:10px; }
  .dv-leg a { color:#CC0000; text-decoration:none; }
  .dv-err { padding:12px 14px; background:#fff5f5; border:1px solid #fecaca; border-radius:10px; color:#dc2626; font-size:13px; margin-bottom:14px; }
  .dv-note { font-size:11px; color:#ccc; margin-top:8px; }

  .dv-ok { padding:72px 32px; text-align:center; }
  .dv-ok h2 { font-size:24px; font-weight:900; color:#111; margin-bottom:8px; }
  .dv-ok p  { color:#aaa; font-size:14px; margin-bottom:28px; }

  .dv-cts {
    display:grid; grid-template-columns:repeat(3,1fr); gap:14px; margin-top:22px;
    animation: dvFade .5s .14s ease both;
  }
  @media(max-width:768px){ .dv-cts{ grid-template-columns:1fr; } }
  .dv-ct {
    background:rgba(255,255,255,0.88); backdrop-filter:blur(8px);
    border:1px solid rgba(255,255,255,0.95); border-radius:16px;
    padding:16px 18px; display:flex; align-items:center; gap:12px;
    box-shadow:0 4px 18px rgba(0,0,0,0.05);
  }
  .dv-ct-ic { width:42px; height:42px; border-radius:50%; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
  .dv-ct-lb { font-size:11px; color:#bbb; margin-bottom:3px; }
  .dv-ct-vl { font-size:13px; font-weight:700; color:#111; }
`

/* ─────────────────────────────────────────────────────────────────────
   BADGE
───────────────────────────────────────────────────────────────────── */
function Badge() {
  const sp  = useSearchParams()
  const val = sp.get('vehicule')
  if (!val) return null
  const v = vehiculesData.flatMap(s => s.modeles).find(m => m.value === val)
  if (!v) return null
  return (
    <div className="dv-prebadge">
      <span className="dv-prebadge-dot"/>
      Véhicule sélectionné :&nbsp;<strong style={{ color:'#CC0000' }}>{v.nom}</strong>
    </div>
  )
}

function CarIcon() {
  return (
    <svg width="48" height="48" fill="#ddd" viewBox="0 0 24 24">
      <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
    </svg>
  )
}

/* ─────────────────────────────────────────────────────────────────────
   FORMULAIRE
───────────────────────────────────────────────────────────────────── */
function DevisForm() {
  const sp    = useSearchParams()
  const vp    = sp.get('vehicule')
  const all   = vehiculesData.flatMap(s => s.modeles)
  const vOk   = vp && all.some(m => m.value === vp) ? vp : null
  const isPre = !!vOk

  const [fd, setFd] = useState({
    nom:'', prenom:'', societe:'', telephone:'',
    email:'', ville:'', vehicule: vOk ?? '', message:'', newsletter:false,
  })
  const [loading, setL] = useState(false)
  const [success, setS] = useState(false)
  const [error,   setE] = useState('')

  useEffect(() => { if (vOk) setFd(p => ({ ...p, vehicule: vOk })) }, [vOk])

  const onChange = (e: React.ChangeEvent<HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFd(p => ({ ...p, [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value }))
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setL(true); setE('')
    try {
      const r = await fetch('/api/devis', {
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ ...fd, date:new Date().toISOString(), statut:'nouveau' }),
      })
      if (!r.ok) throw new Error()
      setS(true)
      setFd({ nom:'', prenom:'', societe:'', telephone:'', email:'', ville:'', vehicule:'', message:'', newsletter:false })
    } catch { setE('Une erreur est survenue. Veuillez réessayer.') }
    finally { setL(false) }
  }

  const selV   = all.find(m => m.value === fd.vehicule)
  const selS   = vehiculesData.find(s => s.modeles.some(m => m.value === fd.vehicule))
  const imgSrc = fd.vehicule ? imageMap[fd.vehicule] ?? null : null

  return (
    <div className="dv-wrap">
      <div className="dv-card">
        <div className="dv-bar"/>

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

              {/* Gauche */}
              <div className="dv-cl">
                <div className="dv-step">
                  <div className="dv-sn">1</div>
                  <div className="dv-st">{isPre ? 'Votre véhicule' : 'Sélectionnez votre véhicule'}</div>
                </div>

                {isPre ? (
                  <div className="dv-vbox">
                    <div className="dv-vimg">
                      {imgSrc
                        ? <Image src={imgSrc} alt={selV?.nom||''} fill style={{ objectFit:'contain', padding:20 }}/>
                        : <div style={{ textAlign:'center', color:'#ddd' }}><CarIcon/><p style={{ fontSize:12,marginTop:8 }}>Image bientôt disponible</p></div>
                      }
                    </div>
                    <div className="dv-vft">
                      <div>
                        <div className="dv-vnm">{selV?.nom}</div>
                        {selS && <span className="dv-vbg" style={{ background:selS.couleur }}>{selS.serie}</span>}
                      </div>
                      <Link href="/devis" className="dv-vch">Changer</Link>
                    </div>
                  </div>
                ) : (
                  <>
                    {fd.vehicule ? (
                      <div className="dv-prev">
                        <div className="dv-prev-in">
                          <div style={{ position:'relative',width:'100%',height:148,marginBottom:12 }}>
                            {imgSrc
                              ? <Image key={fd.vehicule} src={imgSrc} alt={selV?.nom||''} fill style={{ objectFit:'contain' }}/>
                              : <div style={{ display:'flex',justifyContent:'center',paddingTop:32 }}><CarIcon/></div>
                            }
                          </div>
                          <p style={{ fontSize:13,fontWeight:700,color:'#111' }}>{selV?.nom}</p>
                          {selS && <span className="dv-vbg" style={{ background:selS.couleur,marginTop:6 }}>{selS.serie}</span>}
                        </div>
                      </div>
                    ) : (
                      <div className="dv-empty">
                        <CarIcon/>
                        <span>Sélectionnez un véhicule<br/>pour voir son image</span>
                      </div>
                    )}
                    <div className="dv-sw">
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

              {/* Droite */}
              <div className="dv-cr">
                <div className="dv-step">
                  <div className="dv-sn">2</div>
                  <div className="dv-st">Vos coordonnées</div>
                </div>

                <div className="dv-row">
                  <div><label className="dv-lb">Nom *</label><input name="nom" value={fd.nom} onChange={onChange} required placeholder="Votre nom" className="dv-inp"/></div>
                  <div><label className="dv-lb">Prénom *</label><input name="prenom" value={fd.prenom} onChange={onChange} required placeholder="Votre prénom" className="dv-inp"/></div>
                </div>
                <div className="dv-f"><label className="dv-lb">Société</label><input name="societe" value={fd.societe} onChange={onChange} placeholder="Optionnel" className="dv-inp"/></div>
                <div className="dv-row">
                  <div><label className="dv-lb">Téléphone *</label><input type="tel" name="telephone" value={fd.telephone} onChange={onChange} required placeholder="06 00 00 00 00" className="dv-inp"/></div>
                  <div><label className="dv-lb">Email *</label><input type="email" name="email" value={fd.email} onChange={onChange} required placeholder="votre@email.com" className="dv-inp"/></div>
                </div>
                <div className="dv-f"><label className="dv-lb">Ville *</label><input name="ville" value={fd.ville} onChange={onChange} required placeholder="Votre ville" className="dv-inp"/></div>
                <div className="dv-f"><label className="dv-lb">Message</label><textarea name="message" value={fd.message} onChange={onChange} placeholder="Précisez vos besoins, options souhaitées, délais..." className="dv-ta"/></div>
                <div className="dv-ck">
                  <input type="checkbox" name="newsletter" checked={fd.newsletter} onChange={onChange}/>
                  <span>J&apos;accepte de recevoir les offres commerciales et actualités de CADOZAT par email.</span>
                </div>
                {error && <div className="dv-err">{error}</div>}
                <button type="submit" disabled={loading} className="dv-btn">
                  {loading ? (
                    <><svg style={{ animation:'dvSpin .9s linear infinite' }} width="16" height="16" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,.3)" strokeWidth="4"/><path fill="rgba(255,255,255,.85)" d="M4 12a8 8 0 018-8V0C5.4 0 0 5.4 0 12h4z"/></svg>Envoi en cours…</>
                  ) : (
                    <>Envoyer ma demande<svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg></>
                  )}
                </button>
                <p className="dv-leg">En soumettant, vous acceptez notre <Link href="/mentions-legales">politique de confidentialité</Link>.</p>
              </div>
            </div>
          </form>
        )}
      </div>

      {/* Contacts */}
      <div className="dv-cts">
        {[
          { bg:'#fff5f5', lbl:'Appelez-nous', val:'0524 885 025', icon:<svg width="20" height="20" fill="#CC0000" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/></svg> },
          { bg:'#eff2ff', lbl:'Écrivez-nous', val:'contact@cadozat.com', icon:<svg width="20" height="20" fill="#1B2B6B" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/></svg> },
          { bg:'#fdf8ed', lbl:'Horaires', val:'Lun–Sam  8h–18h', icon:<svg width="20" height="20" fill="#C9A84C" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/></svg> },
        ].map((c,i) => (
          <div key={i} className="dv-ct">
            <div className="dv-ct-ic" style={{ background:c.bg }}>{c.icon}</div>
            <div><div className="dv-ct-lb">{c.lbl}</div><div className="dv-ct-vl">{c.val}</div></div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────
   PAGE EXPORT
───────────────────────────────────────────────────────────────────── */
export default function DevisPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }}/>

      <div className="dv-page">
        {/* Canvas animé — dessiné en JS, impossible à bloquer par le layout */}
        <AnimatedCanvas/>

        <div className="dv-content">
          <div className="dv-hero">
            <nav className="dv-bc">
              <Link href="/">Accueil</Link>
              <span>/</span>
              <span style={{ color:'#CC0000', fontWeight:600 }}>Demande de devis</span>
            </nav>
            <h1 className="dv-h1">Demande de <em>devis</em></h1>
            <div className="dv-ul"><div className="dv-ul-r"/><div className="dv-ul-g"/></div>
            <p className="dv-sub">Remplissez le formulaire et notre équipe commerciale vous contactera dans les plus brefs délais.</p>
            <Suspense fallback={null}><Badge/></Suspense>
          </div>

          <Suspense fallback={
            <div className="dv-wrap">
              <div style={{ background:'rgba(255,255,255,0.88)',borderRadius:22,height:420,display:'flex',alignItems:'center',justifyContent:'center',border:'1px solid rgba(255,255,255,0.95)' }}>
                <p style={{ color:'#ccc',fontSize:14 }}>Chargement…</p>
              </div>
            </div>
          }>
            <DevisForm/>
          </Suspense>
        </div>
      </div>
    </>
  )
}