'use client'
import { useState, useEffect, useRef, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

const vehiculesData = [
  { serie: 'D-MAX', couleur: '#CC0000', modeles: [
    { nom: 'D-MAX TFR — Pick-up SC 4×2 EURO 6', value: 'dmax-tfr-sc-4x2' },
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
  { serie: 'F-Series', couleur: '#0057A8', modeles: [
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
]

const imageMap: Record<string, string> = {
  'dmax-tfr-sc-4x2': '/images/vehicules/sc-4x2.png',
  'nmr-77e':         '/images/vehicules/nmr-77e.png',
  'nmr-85h':         '/images/vehicules/nmr-77e.png',
  'nnr-85h':         '/images/vehicules/nmr-77e.png',
  'npr-75k':         '/images/vehicules/npr-75k.jpg',
  'npr-75l':         '/images/vehicules/npr-75l.jpg',
  'nqr-90k':         '/images/vehicules/npr-75k.jpg',
  'nqr-90m':         '/images/vehicules/npr-75l.jpg',
  'ftr-34k':         '/images/vehicules/ftr-34k.jpg',
  'ftr-34m':         '/images/vehicules/ftr-34m.jpg',
  'ftr-34p':         '/images/vehicules/ftr-34p.jpg',
  'fvr-34k':         '/images/vehicules/fvr-34k.jpg',
  'fvr-34p':         '/images/vehicules/fvr-34p.jpg',
  'karry-22b':       '/images/vehicules/karry-22b.jpg',
  'karry-22q':       '/images/vehicules/karry-22q.jpg',
}

const CSS = `
  @keyframes dvFade { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
  @keyframes floatA { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(30px,-25px) scale(1.07)} }
  @keyframes floatB { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(-20px,30px) scale(1.05)} }
  @keyframes heroIn { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
  .h-in-1{animation:heroIn 0.7s cubic-bezier(0.22,1,0.36,1) 0.05s both}
  .h-in-2{animation:heroIn 0.7s cubic-bezier(0.22,1,0.36,1) 0.2s both}
  .h-in-3{animation:heroIn 0.7s cubic-bezier(0.22,1,0.36,1) 0.35s both}
  .dv-grid { display:grid; grid-template-columns:1fr 1fr; }
  @media (max-width:768px) {
    .dv-grid { grid-template-columns:1fr; }
    .dv-cl   { border-right:none !important; border-bottom:1px solid rgba(0,0,0,0.06); }
    .dv-row2 { grid-template-columns:1fr !important; }
    .dv-cts  { grid-template-columns:1fr !important; }
  }
  .dv-row2 { display:grid; grid-template-columns:1fr 1fr; gap:14px; margin-bottom:14px; }
`

function AnimatedBg() {
  return (
    <>
      <div style={{ position:'fixed', inset:0, zIndex:0, background:'#f8faff', pointerEvents:'none' }} />
      <div style={{ position:'fixed', top:'-80px', right:'-80px', width:'600px', height:'600px', borderRadius:'50%', background:'linear-gradient(135deg, rgba(0,87,168,0.08), rgba(27,43,107,0.06))', animation:'floatA 14s ease-in-out infinite', zIndex:0, pointerEvents:'none' }} />
      <div style={{ position:'fixed', bottom:'-60px', left:'-60px', width:'500px', height:'500px', borderRadius:'50%', background:'linear-gradient(135deg, rgba(204,0,0,0.06), rgba(201,168,76,0.04))', animation:'floatB 18s ease-in-out infinite', zIndex:0, pointerEvents:'none' }} />
      <div style={{ position:'fixed', inset:0, zIndex:0, opacity:0.4, backgroundImage:'radial-gradient(circle, rgba(0,87,168,0.07) 1px, transparent 1px)', backgroundSize:'32px 32px', pointerEvents:'none' }} />
    </>
  )
}

function VehiculeDropdown({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const all = vehiculesData.flatMap(s => s.modeles)
  const selected = all.find(m => m.value === value)
  const selectedSerie = vehiculesData.find(s => s.modeles.some(m => m.value === value))

  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false) }
    document.addEventListener('mousedown', h)
    return () => document.removeEventListener('mousedown', h)
  }, [])

  return (
    <div ref={ref} style={{ position:'relative', marginTop:14 }}>
      <button type="button" onClick={() => setOpen(!open)} style={{
        width:'100%', padding:'13px 42px 13px 16px',
        border:`1.5px solid ${open ? '#0057A8' : 'rgba(0,0,0,0.10)'}`,
        borderRadius:14, fontSize:13, fontFamily:'inherit',
        background:'rgba(255,255,255,0.85)', backdropFilter:'blur(12px)',
        cursor:'pointer', textAlign:'left', display:'flex', alignItems:'center', gap:10,
        boxShadow: open ? '0 0 0 3px rgba(0,87,168,0.08)' : '0 2px 12px rgba(0,0,0,0.06)',
        transition:'all .2s',
      }}>
        <span style={{ width:8, height:8, borderRadius:'50%', background: selected ? '#22c55e' : '#e5e2dd', flexShrink:0 }}/>
        <span style={{ flex:1, color: selected ? '#111' : '#bbb', fontWeight: selected ? 600 : 400, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
          {selected ? selected.nom : 'Choisissez un véhicule'}
        </span>
        {selected && selectedSerie && (
          <span style={{ fontSize:10, fontWeight:800, padding:'2px 8px', borderRadius:99, color:'#fff', background:selectedSerie.couleur, flexShrink:0 }}>
            {selectedSerie.serie}
          </span>
        )}
        <svg style={{ position:'absolute', right:14, top:'50%', transform:`translateY(-50%) rotate(${open?180:0}deg)`, transition:'transform .2s', flexShrink:0 }}
          width="16" height="16" fill="none" stroke="#bbb" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
        </svg>
      </button>

      {open && (
        <div style={{ position:'absolute', top:'calc(100% + 8px)', left:0, right:0, zIndex:200, background:'rgba(255,255,255,0.97)', backdropFilter:'blur(20px)', border:'1px solid rgba(0,0,0,0.08)', borderRadius:16, boxShadow:'0 24px 60px rgba(0,0,0,0.14)', overflow:'hidden', maxHeight:320, overflowY:'auto' }}>
          {vehiculesData.map((serie, si) => (
            <div key={si}>
              <div style={{ padding:'9px 16px 6px', background:serie.couleur+'08', borderBottom:`1px solid ${serie.couleur}18`, borderTop:si>0?'1px solid rgba(0,0,0,0.05)':'none', display:'flex', alignItems:'center', gap:8 }}>
                <div style={{ width:3, height:14, borderRadius:99, background:serie.couleur }}/>
                <span style={{ fontSize:10, fontWeight:900, color:serie.couleur, textTransform:'uppercase', letterSpacing:'1.5px' }}>{serie.serie}</span>
              </div>
              {serie.modeles.map((m, mi) => (
                <button key={mi} type="button" onClick={() => { onChange(m.value); setOpen(false) }}
                  style={{ width:'100%', padding:'11px 16px 11px 28px', background:value===m.value?serie.couleur+'10':'transparent', border:'none', cursor:'pointer', textAlign:'left', fontFamily:'inherit', fontSize:13, color:value===m.value?serie.couleur:'#444', fontWeight:value===m.value?700:400, display:'flex', alignItems:'center', gap:10, borderBottom:mi<serie.modeles.length-1?'1px solid rgba(0,0,0,0.04)':'none', transition:'background .15s' }}
                  onMouseEnter={e => { if (value!==m.value) (e.currentTarget as HTMLElement).style.background='rgba(0,0,0,0.03)' }}
                  onMouseLeave={e => { if (value!==m.value) (e.currentTarget as HTMLElement).style.background='transparent' }}>
                  {value===m.value
                    ? <svg width="14" height="14" fill="none" stroke={serie.couleur} strokeWidth="3" viewBox="0 0 24 24" style={{ flexShrink:0 }}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                    : <span style={{ width:14, flexShrink:0 }}/>}
                  <span style={{ flex:1 }}>{m.nom}</span>
                </button>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function CarIcon() {
  return (<svg width="48" height="48" fill="#ddd" viewBox="0 0 24 24"><path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/></svg>)
}

function Badge() {
  const sp = useSearchParams()
  const val = sp.get('vehicule')
  if (!val) return null
  const v = vehiculesData.flatMap(s => s.modeles).find(m => m.value === val)
  if (!v) return null
  return (
    <div style={{ display:'inline-flex', alignItems:'center', gap:8, marginTop:18, background:'rgba(255,255,255,0.85)', backdropFilter:'blur(12px)', border:'1px solid rgba(0,87,168,0.15)', borderRadius:99, padding:'8px 18px', fontSize:13, fontWeight:600, color:'#444', boxShadow:'0 2px 16px rgba(0,0,0,0.06)', flexWrap:'wrap' }}>
      <span style={{ width:8, height:8, borderRadius:'50%', background:'#22c55e', flexShrink:0 }}/>
      Véhicule :&nbsp;<strong style={{ color:'#0057A8' }}>{v.nom}</strong>
    </div>
  )
}

const inp: React.CSSProperties = {
  width:'100%', padding:'11px 14px',
  border:'1.5px solid rgba(0,0,0,0.09)', borderRadius:11,
  fontSize:13, color:'#111', background:'rgba(255,255,255,0.80)',
  backdropFilter:'blur(8px)', outline:'none', fontFamily:'inherit',
  boxSizing:'border-box', transition:'border-color .2s, box-shadow .2s',
}
const lb: React.CSSProperties = { display:'block', fontSize:11, fontWeight:700, color:'#999', letterSpacing:'.6px', textTransform:'uppercase', marginBottom:6 }

function DevisForm() {
  const sp  = useSearchParams()
  const vp  = sp.get('vehicule')
  const all = vehiculesData.flatMap(s => s.modeles)
  const vOk = vp && all.some(m => m.value === vp) ? vp : null
  const isPre = !!vOk

  const [fd, setFd] = useState({ nom:'', prenom:'', societe:'', telephone:'', email:'', ville:'', vehicule:vOk??'', message:'', newsletter:false })
  const [loading, setL] = useState(false)
  const [success, setS] = useState(false)
  const [error,   setE] = useState('')

  useEffect(() => { if (vOk) setFd(p => ({ ...p, vehicule:vOk })) }, [vOk])

  const onChange = (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFd(p => ({ ...p, [name]: type==='checkbox' ? (e.target as HTMLInputElement).checked : value }))
  }
  const onFocus = (e: React.FocusEvent<HTMLInputElement|HTMLTextAreaElement>) => {
    e.target.style.borderColor = '#0057A8'; e.target.style.boxShadow = '0 0 0 3px rgba(0,87,168,0.07)'
  }
  const onBlur = (e: React.FocusEvent<HTMLInputElement|HTMLTextAreaElement>) => {
    e.target.style.borderColor = 'rgba(0,0,0,0.09)'; e.target.style.boxShadow = 'none'
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setL(true); setE('')
    try {
      const r = await fetch('/api/devis', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ ...fd, date:new Date().toISOString(), statut:'nouveau' }) })
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
    <div style={{ maxWidth:1100, margin:'0 auto', padding:'0 16px 72px' }}>
      <div style={{ background:'rgba(255,255,255,0.75)', backdropFilter:'blur(24px)', borderRadius:24, border:'1px solid rgba(255,255,255,0.90)', boxShadow:'0 20px 64px rgba(0,0,0,0.08)', overflow:'hidden' }}>
        {/* Top gradient bar */}
        <div style={{ height:3, background:'linear-gradient(90deg, #CC0000, #0057A8, #1B2B6B)' }}/>

        {success ? (
          <div style={{ padding:'72px 24px', textAlign:'center' }}>
            <div style={{ width:64, height:64, borderRadius:'50%', background:'#f0fdf4', border:'1px solid #bbf7d0', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 20px' }}>
              <svg width="28" height="28" fill="none" stroke="#22c55e" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
            </div>
            <h2 style={{ fontSize:22, fontWeight:900, color:'#111', marginBottom:8 }}>Demande envoyée !</h2>
            <p style={{ color:'#aaa', fontSize:14, marginBottom:28 }}>Notre équipe vous contactera dans les plus brefs délais.</p>
            <Link href="/" style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'11px 28px', background:'#0057A8', color:'#fff', borderRadius:99, fontWeight:700, fontSize:13, textDecoration:'none' }}>
              Retour à l&apos;accueil
            </Link>
          </div>
        ) : (
          <form onSubmit={onSubmit}>
            <div className="dv-grid">
              {/* Colonne gauche */}
              <div className="dv-cl" style={{ padding:28, borderRight:'1px solid rgba(0,0,0,0.06)' }}>
                <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:22 }}>
                  <div style={{ width:34, height:34, borderRadius:'50%', background:'linear-gradient(135deg, #0057A8, #1B2B6B)', color:'#fff', fontWeight:900, fontSize:15, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, boxShadow:'0 4px 14px rgba(0,87,168,0.3)' }}>1</div>
                  <div style={{ fontSize:16, fontWeight:700, color:'#111' }}>{isPre ? 'Votre véhicule' : 'Sélectionnez votre véhicule'}</div>
                </div>

                {isPre ? (
                  <div style={{ borderRadius:14, border:'1px solid rgba(0,87,168,0.12)', overflow:'hidden', background:'rgba(255,255,255,0.85)' }}>
                    <div style={{ height:200, background:'rgba(248,250,255,0.9)', display:'flex', alignItems:'center', justifyContent:'center', position:'relative' }}>
                      {imgSrc ? <Image src={imgSrc} alt={selV?.nom||''} fill sizes="(max-width:768px) 100vw, 50vw" style={{ objectFit:'contain', padding:16 }}/> : <CarIcon/>}
                    </div>
                    <div style={{ padding:'12px 16px', borderTop:'1px solid rgba(0,87,168,0.08)', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                      <div>
                        <div style={{ fontSize:13, fontWeight:700, color:'#111' }}>{selV?.nom}</div>
                        {selS && <span style={{ display:'inline-block', marginTop:4, padding:'2px 10px', borderRadius:99, fontSize:11, fontWeight:700, color:'#fff', background:selS.couleur }}>{selS.serie}</span>}
                      </div>
                      <Link href="/devis" style={{ fontSize:11, color:'#bbb', textDecoration:'underline' }}>Changer</Link>
                    </div>
                  </div>
                ) : (
                  <>
                    {fd.vehicule ? (
                      <div style={{ minHeight:180, borderRadius:14, border:'1px solid rgba(0,87,168,0.1)', background:'rgba(248,250,255,0.8)', display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden' }}>
                        <div style={{ width:'100%', textAlign:'center', padding:16 }}>
                          <div style={{ position:'relative', width:'100%', height:130, marginBottom:10 }}>
                            {imgSrc ? <Image key={fd.vehicule} src={imgSrc} alt={selV?.nom||''} fill sizes="(max-width:768px) 100vw, 50vw" style={{ objectFit:'contain' }}/> : <div style={{ display:'flex', justifyContent:'center', paddingTop:24 }}><CarIcon/></div>}
                          </div>
                          <p style={{ fontSize:13, fontWeight:700, color:'#111' }}>{selV?.nom}</p>
                          {selS && <span style={{ display:'inline-block', marginTop:4, padding:'2px 10px', borderRadius:99, fontSize:11, fontWeight:700, color:'#fff', background:selS.couleur }}>{selS.serie}</span>}
                        </div>
                      </div>
                    ) : (
                      <div style={{ minHeight:180, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', borderRadius:14, border:'1.5px dashed rgba(0,87,168,0.15)', color:'#ccc', fontSize:13, gap:10, textAlign:'center', background:'rgba(248,250,255,0.5)' }}>
                        <CarIcon/>
                        <span>Sélectionnez un véhicule<br/>pour voir son image</span>
                      </div>
                    )}
                    <VehiculeDropdown value={fd.vehicule} onChange={v => setFd(p => ({ ...p, vehicule:v }))}/>
                    <p style={{ fontSize:11, color:'#ccc', marginTop:8 }}>* Photos non contractuelles</p>
                  </>
                )}
              </div>

              {/* Colonne droite */}
              <div style={{ padding:28 }}>
                <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:22 }}>
                  <div style={{ width:34, height:34, borderRadius:'50%', background:'linear-gradient(135deg, #CC0000, #aa0000)', color:'#fff', fontWeight:900, fontSize:15, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, boxShadow:'0 4px 14px rgba(204,0,0,0.28)' }}>2</div>
                  <div style={{ fontSize:16, fontWeight:700, color:'#111' }}>Vos coordonnées</div>
                </div>

                <div className="dv-row2">
                  <div><label style={lb}>Nom *</label><input name="nom" value={fd.nom} onChange={onChange} onFocus={onFocus} onBlur={onBlur} required placeholder="Votre nom" style={inp}/></div>
                  <div><label style={lb}>Prénom *</label><input name="prenom" value={fd.prenom} onChange={onChange} onFocus={onFocus} onBlur={onBlur} required placeholder="Votre prénom" style={inp}/></div>
                </div>

                <div style={{ marginBottom:14 }}>
                  <label style={lb}>Société</label>
                  <input name="societe" value={fd.societe} onChange={onChange} onFocus={onFocus} onBlur={onBlur} placeholder="Optionnel" style={inp}/>
                </div>

                <div className="dv-row2">
                  <div><label style={lb}>Téléphone *</label><input type="tel" name="telephone" value={fd.telephone} onChange={onChange} onFocus={onFocus} onBlur={onBlur} required placeholder="06 00 00 00 00" style={inp}/></div>
                  <div><label style={lb}>Email *</label><input type="email" name="email" value={fd.email} onChange={onChange} onFocus={onFocus} onBlur={onBlur} required placeholder="votre@email.com" style={inp}/></div>
                </div>

                <div style={{ marginBottom:14 }}>
                  <label style={lb}>Ville *</label>
                  <input name="ville" value={fd.ville} onChange={onChange} onFocus={onFocus} onBlur={onBlur} required placeholder="Votre ville" style={inp}/>
                </div>

                <div style={{ marginBottom:14 }}>
                  <label style={lb}>Message</label>
                  <textarea name="message" value={fd.message} onChange={onChange} onFocus={onFocus} onBlur={onBlur} placeholder="Précisez vos besoins, options souhaitées, délais..." style={{ ...inp, resize:'none', height:88 }}/>
                </div>

                <div style={{ display:'flex', alignItems:'flex-start', gap:10, marginBottom:14 }}>
                  <input type="checkbox" name="newsletter" checked={fd.newsletter} onChange={onChange} style={{ marginTop:2, accentColor:'#0057A8', flexShrink:0 }}/>
                  <span style={{ fontSize:12, color:'#aaa', lineHeight:1.6 }}>J&apos;accepte de recevoir les offres commerciales et actualités de CADOZAT par email.</span>
                </div>

                {error && <div style={{ padding:'12px 14px', background:'#fff5f5', border:'1px solid #fecaca', borderRadius:10, color:'#dc2626', fontSize:13, marginBottom:14 }}>{error}</div>}

                <button type="submit" disabled={loading} style={{ width:'100%', padding:14, background:'linear-gradient(135deg, #CC0000, #aa0000)', color:'#fff', border:'none', borderRadius:12, fontSize:14, fontWeight:700, cursor:loading?'not-allowed':'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:8, fontFamily:'inherit', opacity:loading?0.7:1, boxShadow:'0 6px 22px rgba(204,0,0,0.28)', transition:'all .2s' }}>
                  {loading ? 'Envoi en cours…' : <>Envoyer ma demande <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg></>}
                </button>
                <p style={{ fontSize:11, color:'#ccc', textAlign:'center', marginTop:10 }}>
                  En soumettant, vous acceptez notre <Link href="/mentions-legales" style={{ color:'#0057A8', textDecoration:'none' }}>politique de confidentialité</Link>.
                </p>
              </div>
            </div>
          </form>
        )}
      </div>

      {/* Contacts */}
      <div className="dv-cts" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:12, marginTop:16 }}>
        {[
          { bg:'#fff5f5', lbl:'Appelez-nous', val:'0524 885 025', color:'#CC0000', icon:<svg width="20" height="20" fill="#CC0000" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/></svg> },
          { bg:'#f0f7ff', lbl:'Écrivez-nous', val:'contact@cadozat.com', color:'#0057A8', icon:<svg width="20" height="20" fill="#0057A8" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/></svg> },
          { bg:'#fdf8ed', lbl:'Horaires', val:'Lun–Sam 8h–18h', color:'#C9A84C', icon:<svg width="20" height="20" fill="#C9A84C" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/></svg> },
        ].map((c,i) => (
          <div key={i} style={{ background:'rgba(255,255,255,0.85)', backdropFilter:'blur(12px)', border:`1px solid ${c.color}18`, borderRadius:14, padding:'14px 16px', display:'flex', alignItems:'center', gap:10, boxShadow:'0 4px 18px rgba(0,0,0,0.05)' }}>
            <div style={{ width:38, height:38, borderRadius:'50%', background:c.bg, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>{c.icon}</div>
            <div>
              <div style={{ fontSize:10, color:'#bbb', marginBottom:2 }}>{c.lbl}</div>
              <div style={{ fontSize:12, fontWeight:700, color:'#111' }}>{c.val}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function DevisPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }}/>
      <div style={{ position:'relative', minHeight:'100vh', overflowX:'hidden' }}>
        <AnimatedBg/>
        <div style={{ position:'relative', zIndex:1 }}>

          {/* ── HERO ── */}
          <div style={{ maxWidth:1100, margin:'0 auto', padding:'120px 16px 48px' }}>
            <nav style={{ display:'flex', alignItems:'center', gap:6, fontSize:12, color:'#999', marginBottom:28 }}>
              <Link href="/" style={{ color:'#999', textDecoration:'none' }}>Accueil</Link>
              <span>/</span>
              <span style={{ color:'#0057A8', fontWeight:600 }}>Demande de devis</span>
            </nav>

            {/* Tag */}
            <div className="h-in-1" style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'6px 16px', background:'#fff', border:'1px solid #e8e8f0', borderRadius:99, marginBottom:24, boxShadow:'0 2px 12px rgba(0,0,0,0.06)' }}>
              <span style={{ width:8, height:8, borderRadius:'50%', background:'#22c55e', display:'inline-block' }} />
              <span style={{ fontSize:11, fontWeight:800, letterSpacing:'0.15em', textTransform:'uppercase', color:'#0057A8' }}>Configurateur de devis</span>
            </div>

            {/* Title */}
            <div className="h-in-2">
              <h1 style={{ fontSize:'clamp(36px,6vw,64px)', fontWeight:900, color:'#0f172a', letterSpacing:'-2px', lineHeight:0.95, marginBottom:16 }}>
                Demande de{' '}
                <span style={{ background:'linear-gradient(90deg, #CC0000 0%, #0057A8 100%)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>devis</span>
              </h1>
            </div>

            {/* Divider */}
            <div className="h-in-3" style={{ display:'flex', gap:8, alignItems:'center', marginBottom:16 }}>
              <div style={{ width:40, height:3, background:'#CC0000', borderRadius:99 }}/>
              <div style={{ width:20, height:3, background:'#0057A8', borderRadius:99 }}/>
              <div style={{ width:8, height:3, background:'#e2e2e8', borderRadius:99 }}/>
            </div>

            <p className="h-in-3" style={{ fontSize:15, color:'#64748b', lineHeight:1.75, maxWidth:460, marginBottom:8 }}>
              Remplissez le formulaire et notre équipe commerciale vous contactera dans les plus brefs délais.
            </p>
            <Suspense fallback={null}><Badge/></Suspense>
          </div>

          <Suspense fallback={
            <div style={{ maxWidth:1100, margin:'0 auto', padding:'0 16px 72px' }}>
              <div style={{ background:'rgba(255,255,255,0.70)', borderRadius:24, height:420, display:'flex', alignItems:'center', justifyContent:'center' }}>
                <p style={{ color:'#ccc', fontSize:14 }}>Chargement…</p>
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