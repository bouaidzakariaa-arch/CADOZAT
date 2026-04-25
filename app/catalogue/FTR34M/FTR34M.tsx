import Link from 'next/link'
import BrochureForm from '@/app/components/BrochureForm'

const specs = [
  {
    categorie: 'Dimensions & Poids',
    icon: '📐',
    items: [
      { label: 'Empattement',                   valeur: '4 650 mm' },
      { label: 'Longueur carossable',           valeur: '6 000 mm' },
      { label: 'Poids total en charge (PTAC)',  valeur: '16 000 kg' },
      { label: 'Poids à vide — Avant',          valeur: '3 175 kg' },
      { label: 'Poids à vide — Arrière',        valeur: '1 590 kg' },
      { label: 'Poids à vide — Total',          valeur: '4 765 kg' },
    ],
  },
  {
    categorie: 'Essieux & Pont',
    icon: '🔩',
    items: [
      { label: 'Cabine',                        valeur: 'Large' },
      { label: 'Capacité essieu avant',         valeur: '6 500 kg' },
      { label: 'Capacité essieu arrière',       valeur: '11 500 kg' },
      { label: 'Rapport de pont',               valeur: '6.143' },
    ],
  },
  {
    categorie: 'Moteur',
    icon: '⚙️',
    items: [
      { label: 'Modèle',              valeur: '6HK1-TCN' },
      { label: 'Type',                valeur: 'Turbo diesel intercooler Common Rail' },
      { label: 'Émission',           valeur: 'EURO IV' },
      { label: 'Nombre de cylindres', valeur: '6' },
      { label: 'Cylindrée',           valeur: '7 790 cc' },
      { label: 'Puissance maxi',      valeur: '240 ch (177 kw) / 2 400 tr/min' },
      { label: 'Couple maxi',         valeur: '706 Nm / 1 450 tr/min' },
    ],
  },
  {
    categorie: 'Boîte de vitesse',
    icon: '🔄',
    items: [
      { label: 'Modèle',             valeur: 'MZW6P' },
      { label: 'Type',               valeur: 'Mécanique surmultipliée' },
      { label: 'Nombre de rapports', valeur: '6 AV + 1 AR' },
    ],
  },
  {
    categorie: 'Direction & Freinage',
    icon: '🛡️',
    items: [
      { label: 'Direction',           valeur: 'Assistée — écrou bille recirculation' },
      { label: 'Freinage service',    valeur: 'Frein pneumatique à tambours' },
      { label: 'Frein stationnement', valeur: 'À ressort sur roues arrières' },
      { label: 'Frein auxiliaire',    valeur: 'Frein sur échappement' },
      { label: 'ABS',                 valeur: 'Antiblocage des freins' },
    ],
  },
  {
    categorie: 'Suspension & Pneus',
    icon: '🚛',
    items: [
      { label: 'Suspension',         valeur: 'Ressorts à lames AV et AR' },
      { label: 'Dimension pneus',    valeur: '11R22,5-14' },
      { label: 'Nombre de goujons',  valeur: '10' },
      { label: 'Capacité réservoir', valeur: '200 + 200 litres' },
      { label: 'Alternateur',        valeur: '24V — 50A' },
    ],
  },
]

const dimensions = [
  { code: 'OAL', valeur: '7 955', label: 'Longueur totale' },
  { code: 'WB',  valeur: '4 650', label: 'Empattement' },
  { code: 'FOH', valeur: '1 440', label: 'Porte-à-faux avant' },
  { code: 'ROH', valeur: '1 865', label: 'Porte-à-faux arrière' },
  { code: 'CA',  valeur: '4 020', label: 'Long. cabine-essieu' },
  { code: 'CE',  valeur: '5 885', label: 'Longueur carossable' },
  { code: 'OW',  valeur: '2 400', label: 'Largeur totale' },
  { code: 'OH',  valeur: '2 815', label: 'Hauteur totale' },
  { code: 'AW',  valeur: '1 965', label: 'Voie avant' },
  { code: 'BW',  valeur: '2 425', label: 'Voie arrière ext.' },
  { code: 'CW',  valeur: '1 820', label: 'Voie arrière int.' },
  { code: 'EH',  valeur: '1 054', label: 'Hauteur châssis' },
]

const equipements = [
  'Radio AM/FM avec lecteur de CD',
  'Système à 2 haut-parleurs',
  'Siège en tissu',
  'Ceinture de sécurité 3 points conducteur/assistant',
  'Ceinture 2 points siège central',
  'Siège à suspension pneumatique',
  'Cendrier conducteur et assistant',
  'Aération par air dynamique',
  'Chauffage et dégivreur',
  'Tachygraphe',
  'Console supérieure avec pare-soleil',
  'Boîte à gants avec couvercle',
  'Rail de rideaux',
  'Tapis-lit',
  'Lunette arrière avec rétroviseur intérieur',
  'Antibrouillard avant',
  'Essuie-glace intermittent',
  'Prise de force (en option)',
]

const modeles_fseries = [
  { nom: 'FTR 34K 16T', href: '/catalogue/ftr-34k', actif: false },
  { nom: 'FTR 34M 16T', href: '/catalogue/ftr-34m', actif: true },
  { nom: 'FTR 34P 16T', href: '/catalogue/ftr-34p', actif: false },
  { nom: 'FVR 34K 18T', href: '/catalogue/fvr-34k', actif: false },
  { nom: 'FVR 34P 18T', href: '/catalogue/fvr-34p', actif: false },
]

export default function FTR34MPage() {
  return (
    <main className="bg-white">

      <style>{`
        @keyframes ftFadeUp {
          from { opacity:0; transform:translateY(24px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes ftBlob1 {
          0%,100% { transform:translate(0,0) scale(1); }
          33%      { transform:translate(60px,-50px) scale(1.12); }
          66%      { transform:translate(-30px,40px) scale(0.92); }
        }
        @keyframes ftBlob2 {
          0%,100% { transform:translate(0,0) scale(1); }
          50%      { transform:translate(-50px,60px) scale(1.08); }
        }
        @keyframes ftBlob3 {
          0%,100% { transform:translate(0,0) scale(1); }
          40%      { transform:translate(40px,-40px) scale(1.1); }
          80%      { transform:translate(-20px,30px) scale(0.94); }
        }
        .ft-fade   { animation: ftFadeUp .6s ease both; }
        .ft-fade-2 { animation: ftFadeUp .6s .1s ease both; }
        .ft-fade-3 { animation: ftFadeUp .6s .2s ease both; }
        .ft-blob-1 { animation: ftBlob1 18s ease-in-out infinite; }
        .ft-blob-2 { animation: ftBlob2 14s ease-in-out infinite; }
        .ft-blob-3 { animation: ftBlob3 20s ease-in-out infinite; }
      `}</style>

      {/* HERO */}
      <section style={{ background:'#f5f6f8', position:'relative', overflow:'hidden', padding:'80px 0 60px' }}>
        <div className="ft-blob-1" style={{ position:'absolute', top:'-100px', right:'-80px', width:'480px', height:'480px', borderRadius:'50%', background:'radial-gradient(circle, #CC0000, transparent 70%)', opacity:0.09, filter:'blur(70px)', pointerEvents:'none' }}/>
        <div className="ft-blob-2" style={{ position:'absolute', bottom:'-60px', left:'-60px', width:'360px', height:'360px', borderRadius:'50%', background:'radial-gradient(circle, #1B2B6B, transparent 70%)', opacity:0.08, filter:'blur(70px)', pointerEvents:'none' }}/>
        <div className="ft-blob-3" style={{ position:'absolute', top:'40%', left:'38%', width:'280px', height:'280px', borderRadius:'50%', background:'radial-gradient(circle, #C9A84C, transparent 70%)', opacity:0.09, filter:'blur(60px)', pointerEvents:'none' }}/>

        <div className="max-w-7xl mx-auto px-6" style={{ position:'relative', zIndex:1 }}>
          <div className="ft-fade flex items-center gap-2 text-sm mb-8 flex-wrap" style={{ color:'#aaa' }}>
            <Link href="/" style={{ color:'#aaa', textDecoration:'none' }} className="hover:text-[#CC0000] transition-colors">Accueil</Link>
            <span>/</span>
            <Link href="/catalogue" style={{ color:'#aaa', textDecoration:'none' }} className="hover:text-[#CC0000] transition-colors">Notre gamme</Link>
            <span>/</span>
            <span style={{ color:'#888' }}>F-Series</span>
            <span>/</span>
            <span style={{ color:'#CC0000', fontWeight:700 }}>FTR 34M 16T</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="ft-fade-2">
              <div className="flex items-center gap-2 mb-5 flex-wrap">
                <span style={{ background:'#CC0000', color:'#fff', fontSize:11, fontWeight:700, padding:'3px 12px', borderRadius:99 }}>Isuzu</span>
                <span style={{ background:'#fff', border:'1px solid #e5e2dd', color:'#555', fontSize:11, fontWeight:600, padding:'3px 12px', borderRadius:99 }}>F-Series</span>
                <span style={{ background:'#1B2B6B', color:'#fff', fontSize:11, fontWeight:700, padding:'3px 12px', borderRadius:99 }}>16T</span>
                <span style={{ background:'#fff', border:'1px solid #e5e2dd', color:'#555', fontSize:11, fontWeight:600, padding:'3px 12px', borderRadius:99 }}>Châssis intermédiaire</span>
              </div>

              <h1 style={{ fontSize:56, fontWeight:900, color:'#111', letterSpacing:'-2px', lineHeight:1, marginBottom:6 }}>
                FTR <span style={{ color:'#CC0000' }}>34M</span>
              </h1>
              <p style={{ fontSize:16, color:'#888', fontWeight:600, marginBottom:16 }}>16T — Châssis intermédiaire</p>

              <div style={{ display:'flex', gap:8, alignItems:'center', marginBottom:20 }}>
                <div style={{ width:32, height:3, background:'#CC0000', borderRadius:99 }}/>
                <div style={{ width:16, height:3, background:'#C9A84C', borderRadius:99 }}/>
              </div>

              <p style={{ fontSize:15, color:'#777', lineHeight:1.75, marginBottom:28, maxWidth:480 }}>
                Le FTR 34M offre un empattement intermédiaire de 4 650 mm avec une carosserie de 6 mètres,
                idéal pour les applications citernes, bennes ou fourgons de grande capacité.
                Moteur 6HK1-TCN 240 ch avec double réservoir.{' '}
                <strong style={{ color:'#C9A84C' }}>Garantie 3 ans SDAMA.</strong>
              </p>

              <a href="tel:0524885025" style={{ display:'inline-flex', alignItems:'center', gap:8, background:'#CC0000', color:'#fff', fontWeight:700, padding:'12px 24px', borderRadius:99, textDecoration:'none', fontSize:14, boxShadow:'0 4px 18px rgba(204,0,0,0.25)' }}>
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/></svg>
                0524 885 025 — CADOZAT
              </a>
            </div>

            <div className="ft-fade-3 grid grid-cols-2 gap-4">
              {[
                { icon: '⚡', label: 'Puissance',    valeur: '240 ch / 177 kw' },
                { icon: '🔄', label: 'Couple maxi',  valeur: '706 Nm' },
                { icon: '📦', label: 'PTAC',          valeur: '16 000 kg' },
                { icon: '📏', label: 'Cylindrée',     valeur: '7 790 cc' },
                { icon: '⛽', label: 'Réservoir',     valeur: '2 × 200 litres' },
                { icon: '🌿', label: 'Émission',      valeur: 'EURO IV' },
              ].map((s, i) => (
                <div key={i} style={{ background:'#fff', border:'1px solid #e8e5e0', borderRadius:16, padding:20, boxShadow:'0 2px 12px rgba(0,0,0,0.05)', transition:'border-color .2s' }}
                  className="hover:border-[#CC0000]/40">
                  <div style={{ fontSize:22, marginBottom:8 }}>{s.icon}</div>
                  <div style={{ fontSize:11, color:'#aaa', marginBottom:4, textTransform:'uppercase', letterSpacing:'0.5px' }}>{s.label}</div>
                  <div style={{ fontSize:16, fontWeight:800, color:'#111' }}>{s.valeur}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FICHE TECHNIQUE */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <p style={{ color:'#CC0000', fontWeight:700, fontSize:12, textTransform:'uppercase', letterSpacing:'2px', marginBottom:8 }}>Données officielles SDAMA</p>
            <h2 style={{ fontSize:32, fontWeight:900, color:'#111' }}>Fiche technique complète</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {specs.map((cat, i) => (
              <div key={i} style={{ background:'#fff', borderRadius:18, border:'1px solid #ece9e2', overflow:'hidden', transition:'border-color .2s, box-shadow .2s' }}
                className="hover:border-[#CC0000]/30 hover:shadow-lg">
                <div style={{ background:'#f8f7f5', borderBottom:'1px solid #ece9e2', padding:'14px 20px', display:'flex', alignItems:'center', gap:10 }}>
                  <span style={{ fontSize:20 }}>{cat.icon}</span>
                  <h3 style={{ fontWeight:800, color:'#1B2B6B', fontSize:12, textTransform:'uppercase', letterSpacing:'0.8px' }}>{cat.categorie}</h3>
                </div>
                <div style={{ padding:'4px 8px' }}>
                  {cat.items.map((item, j) => (
                    <div key={j} style={{ display:'flex', justifyContent:'space-between', gap:12, padding:'10px 12px', borderBottom: j < cat.items.length-1 ? '1px solid #f2efe9' : 'none' }}>
                      <span style={{ fontSize:12, color:'#888' }}>{item.label}</span>
                      <span style={{ fontSize:12, fontWeight:700, color:'#1B2B6B', textAlign:'right' }}>{item.valeur}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DIMENSIONS */}
      <section className="py-16" style={{ background:'#f8f7f5' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <p style={{ color:'#CC0000', fontWeight:700, fontSize:12, textTransform:'uppercase', letterSpacing:'2px', marginBottom:8 }}>Cotes officielles</p>
            <h2 style={{ fontSize:32, fontWeight:900, color:'#111' }}>Dimensions (mm)</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {dimensions.map((d, i) => (
              <div key={i} style={{ background:'#fff', borderRadius:14, border:'1px solid #ece9e2', padding:'20px 16px', textAlign:'center', transition:'border-color .2s' }}
                className="hover:border-[#CC0000]/40">
                <div style={{ fontSize:13, fontWeight:800, color:'#CC0000', marginBottom:4 }}>{d.code}</div>
                <div style={{ fontSize:22, fontWeight:900, color:'#1B2B6B', marginBottom:4 }}>{d.valeur}</div>
                <div style={{ fontSize:11, color:'#aaa' }}>{d.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ÉQUIPEMENTS */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <p style={{ color:'#CC0000', fontWeight:700, fontSize:12, textTransform:'uppercase', letterSpacing:'2px', marginBottom:8 }}>Inclus de série</p>
            <h2 style={{ fontSize:32, fontWeight:900, color:'#111' }}>Équipements</h2>
          </div>
          <div style={{ background:'#f8f7f5', borderRadius:20, border:'1px solid #ece9e2', padding:32 }}>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {equipements.map((eq, i) => (
                <div key={i} style={{ display:'flex', alignItems:'center', gap:12, padding:'10px 14px', borderRadius:10, transition:'background .2s' }}
                  className="hover:bg-white">
                  <div style={{ width:22, height:22, borderRadius:'50%', background:'#CC0000', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                    <svg width="11" height="11" fill="none" stroke="#fff" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                    </svg>
                  </div>
                  <span style={{ fontSize:13, color:'#555', fontWeight:500 }}>{eq}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* NAVIGATION */}
      <section className="py-10" style={{ background:'#f8f7f5', borderTop:'1px solid #ece9e2' }}>
        <div className="max-w-7xl mx-auto px-6">
          <p style={{ textAlign:'center', fontSize:11, fontWeight:700, color:'#aaa', textTransform:'uppercase', letterSpacing:'2px', marginBottom:16 }}>Gamme F-Series</p>
          <div className="flex flex-wrap gap-3 justify-center">
            {modeles_fseries.map((m) => (
              <Link key={m.nom} href={m.href}
                style={{ padding:'8px 20px', borderRadius:99, fontSize:13, fontWeight:700, textDecoration:'none', transition:'all .2s',
                  ...(m.actif ? { background:'#CC0000', color:'#fff', boxShadow:'0 4px 14px rgba(204,0,0,0.25)' } : { background:'#fff', border:'1px solid #e5e2dd', color:'#666' }) }}
                className={m.actif ? '' : 'hover:border-[#CC0000] hover:text-[#CC0000]'}>
                {m.nom}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <BrochureForm modele="ftr-34m" marque="isuzu" nomModele="FTR 34M" />

      {/* CTA */}
      <section className="py-16" style={{ background:'#111', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', top:'-80px', right:'-80px', width:360, height:360, borderRadius:'50%', background:'#CC0000', opacity:0.08, filter:'blur(80px)', pointerEvents:'none' }}/>
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <h2 style={{ fontSize:32, fontWeight:900, color:'#fff', marginBottom:8 }}>
            Intéressé par le <span style={{ color:'#CC0000' }}>FTR 34M</span> ?
          </h2>
          <div style={{ width:48, height:2, background:'#C9A84C', margin:'16px auto' }}/>
          <p style={{ color:'rgba(255,255,255,0.5)', marginBottom:32, fontSize:15 }}>Contactez l&apos;une de nos agences — Ouarzazate · Agadir · Tinghir</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="tel:0524885025" style={{ display:'inline-flex', alignItems:'center', gap:8, background:'#CC0000', color:'#fff', fontWeight:700, padding:'14px 32px', borderRadius:99, textDecoration:'none', fontSize:14 }}>
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/></svg>
              0524 885 025
            </a>
            <Link href="/contact" style={{ display:'inline-flex', alignItems:'center', background:'rgba(255,255,255,0.08)', color:'#fff', fontWeight:700, padding:'14px 32px', borderRadius:99, textDecoration:'none', fontSize:14, border:'1px solid rgba(255,255,255,0.15)' }}>Nous contacter</Link>
            <Link href="/catalogue" style={{ display:'inline-flex', alignItems:'center', background:'rgba(255,255,255,0.08)', color:'#fff', fontWeight:700, padding:'14px 32px', borderRadius:99, textDecoration:'none', fontSize:14, border:'1px solid rgba(255,255,255,0.15)' }}>Voir toute la gamme</Link>
          </div>
        </div>
      </section>

    </main>
  )
}