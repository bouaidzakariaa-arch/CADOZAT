'use client' 

import Link from 'next/link'

const clients = [
  {
    nom: 'Coca-Cola',
    secteur: 'Boissons',
    site: 'https://www.coca-cola.com/ma/fr',
    logo: 'https://logo.clearbit.com/coca-cola.com',
    initiales: 'CC',
    couleur: '#CC0000',
  },
  {
    nom: 'Walmas',
    secteur: 'Distribution',
    site: '#',
    logo: null,
    initiales: 'WA',
    couleur: '#1B2B6B',
  },
  {
    nom: 'Rafi3',
    secteur: 'Boissons',
    site: '#',
    logo: null,
    initiales: 'R3',
    couleur: '#2E7D32',
  },
  {
    nom: 'HDS',
    secteur: 'Services',
    site: '#',
    logo: null,
    initiales: 'HDS',
    couleur: '#E65100',
  },
  {
    nom: 'COPAG',
    secteur: 'Coopérative agricole',
    site: 'https://www.copag.ma',
    logo: 'https://logo.clearbit.com/copag.ma',
    initiales: 'CP',
    couleur: '#1B5E20',
  },
  {
    nom: 'Soussia des Gaz',
    secteur: 'Énergie',
    site: '#',
    logo: null,
    initiales: 'SG',
    couleur: '#F57F17',
  },
  {
    nom: 'Al Ain (Dester)',
    secteur: 'Eau minérale',
    site: 'https://www.alain.ae',
    logo: 'https://logo.clearbit.com/alain.ae',
    initiales: 'AA',
    couleur: '#0277BD',
  },
  {
    nom: 'M2E — La Marocaine des Eaux',
    secteur: 'Eau minérale',
    site: '#',
    logo: null,
    initiales: 'M2E',
    couleur: '#00838F',
  },
  {
    nom: 'Aqwa Life',
    secteur: 'Eau minérale',
    site: '#',
    logo: null,
    initiales: 'AL',
    couleur: '#0288D1',
  },
]

const CSS = `
  @keyframes refFadeUp {
    from { opacity:0; transform:translateY(20px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes refBlob1 {
    0%,100% { transform:translate(0,0) scale(1); }
    33%      { transform:translate(60px,-50px) scale(1.1); }
    66%      { transform:translate(-30px,40px) scale(0.92); }
  }
  @keyframes refBlob2 {
    0%,100% { transform:translate(0,0) scale(1); }
    50%      { transform:translate(-50px,60px) scale(1.08); }
  }
  @keyframes refBlob3 {
    0%,100% { transform:translate(0,0) scale(1); }
    40%      { transform:translate(40px,-30px) scale(1.06); }
    80%      { transform:translate(-20px,20px) scale(0.95); }
  }
  .ref-fade   { animation: refFadeUp .6s ease both; }
  .ref-fade-2 { animation: refFadeUp .6s .1s ease both; }
  .ref-fade-3 { animation: refFadeUp .6s .15s ease both; }
  .ref-b1 { animation: refBlob1 18s ease-in-out infinite; }
  .ref-b2 { animation: refBlob2 14s ease-in-out infinite; }
  .ref-b3 { animation: refBlob3 20s ease-in-out infinite; }

  .ref-card {
    background: #fff;
    border: 1px solid #ece9e2;
    border-radius: 20px;
    padding: 32px 20px 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    text-decoration: none;
    transition: transform .25s, box-shadow .25s, border-color .25s;
  }
  .ref-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 20px 48px rgba(0,0,0,0.10);
    border-color: #CC0000;
  }
  .ref-logo-wrap {
    width: 96px;
    height: 96px;
    border-radius: 20px;
    background: #f8f7f5;
    border: 1px solid #ece9e2;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 16px;
    overflow: hidden;
    transition: border-color .25s, transform .25s;
  }
  .ref-card:hover .ref-logo-wrap {
    border-color: #CC0000;
    transform: scale(1.05);
  }
  .ref-logo-wrap img {
    width: 72px;
    height: 72px;
    object-fit: contain;
  }
  .ref-nom {
    font-size: 14px;
    font-weight: 700;
    color: #111;
    margin-bottom: 4px;
    line-height: 1.3;
  }
  .ref-secteur {
    font-size: 11px;
    color: #aaa;
    text-transform: uppercase;
    letter-spacing: 0.6px;
    margin-bottom: 14px;
  }
  .ref-arrow {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: #f4f5f7;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background .2s, transform .2s;
    margin-top: auto;
  }
  .ref-card:hover .ref-arrow {
    background: #CC0000;
    transform: scale(1.1);
  }
  .ref-card:hover .ref-arrow svg {
    stroke: #fff;
  }
`

export default function ReferencesPage() {
  return (
    <main className="bg-white">
      <style dangerouslySetInnerHTML={{ __html: CSS }}/>

      {/* ── HERO ── */}
      <section style={{ background:'#f5f6f8', position:'relative', overflow:'hidden', padding:'100px 0 64px' }}>
        {/* Blobs animés */}
        <div className="ref-b1" style={{ position:'absolute', top:'-120px', right:'-100px', width:'500px', height:'500px', borderRadius:'50%', background:'radial-gradient(circle,#CC0000,transparent 70%)', opacity:0.09, filter:'blur(80px)', pointerEvents:'none' }}/>
        <div className="ref-b2" style={{ position:'absolute', bottom:'-80px', left:'-80px', width:'380px', height:'380px', borderRadius:'50%', background:'radial-gradient(circle,#1B2B6B,transparent 70%)', opacity:0.07, filter:'blur(80px)', pointerEvents:'none' }}/>
        <div className="ref-b3" style={{ position:'absolute', top:'40%', left:'40%', width:'280px', height:'280px', borderRadius:'50%', background:'radial-gradient(circle,#C9A84C,transparent 70%)', opacity:0.08, filter:'blur(70px)', pointerEvents:'none' }}/>

        <div className="max-w-7xl mx-auto px-6" style={{ position:'relative', zIndex:1 }}>

          {/* Breadcrumb */}
          <nav className="ref-fade flex items-center gap-2 text-sm mb-10" style={{ color:'#aaa' }}>
            <Link href="/" style={{ color:'#aaa', textDecoration:'none' }} className="hover:text-[#CC0000] transition-colors">Accueil</Link>
            <span>/</span>
            <span style={{ color:'#CC0000', fontWeight:700 }}>Références</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Texte */}
            <div className="ref-fade-2">
              <p style={{ color:'#CC0000', fontWeight:700, fontSize:12, textTransform:'uppercase', letterSpacing:'2px', marginBottom:12 }}>
                Nos clients
              </p>
              <h1 style={{ fontSize:52, fontWeight:900, color:'#111', letterSpacing:'-2px', lineHeight:1, marginBottom:14 }}>
                Ils nous font<br/><span style={{ color:'#CC0000' }}>confiance</span>
              </h1>
              <div style={{ display:'flex', gap:8, alignItems:'center', marginBottom:20 }}>
                <div style={{ width:32, height:3, background:'#CC0000', borderRadius:99 }}/>
                <div style={{ width:16, height:3, background:'#C9A84C', borderRadius:99 }}/>
              </div>
              <p style={{ fontSize:15, color:'#888', lineHeight:1.8, maxWidth:460 }}>
                CADOZAT accompagne les plus grandes entreprises du Sud Marocain
                dans leurs besoins en véhicules utilitaires et industriels Isuzu & Karry.
              </p>
            </div>

            {/* Compteurs */}
            <div className="ref-fade-3 grid grid-cols-3 gap-4">
              {[
                { nb: `${clients.length}+`, label: 'Clients', sub: 'de référence' },
                { nb: '3',                  label: 'Agences', sub: 'au Maroc' },
                { nb: '15+',               label: 'Années',  sub: 'd\'expérience' },
              ].map((s, i) => (
                <div key={i} style={{ background:'#fff', borderRadius:16, border:'1px solid #ece9e2', padding:'20px 16px', textAlign:'center', boxShadow:'0 2px 12px rgba(0,0,0,0.05)' }}>
                  <div style={{ fontSize:32, fontWeight:900, color:'#CC0000', letterSpacing:'-1px', lineHeight:1 }}>{s.nb}</div>
                  <div style={{ fontSize:13, fontWeight:700, color:'#111', marginTop:6 }}>{s.label}</div>
                  <div style={{ fontSize:11, color:'#aaa', marginTop:2 }}>{s.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── GRILLE CLIENTS ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-14">
            <p style={{ color:'#CC0000', fontWeight:700, fontSize:12, textTransform:'uppercase', letterSpacing:'2px', marginBottom:8 }}>
              Références
            </p>
            <h2 style={{ fontSize:34, fontWeight:900, color:'#111', letterSpacing:'-0.5px' }}>
              Nos clients
            </h2>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:12, marginTop:10 }}>
              <div style={{ height:1, width:48, background:'#C9A84C' }}/>
              <div style={{ height:1, width:48, background:'#C9A84C' }}/>
            </div>
            <p style={{ fontSize:13, color:'#aaa', marginTop:10 }}>
              Cliquez sur un logo pour visiter leur site
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            {clients.map((client, i) => {
              const isLink = client.site !== '#'
              const Tag = isLink ? 'a' : 'div'
              const props = isLink
                ? { href: client.site, target: '_blank', rel: 'noopener noreferrer' }
                : {}

              return (
                <Tag key={i} {...props} className="ref-card">
                  {/* Logo */}
                  <div className="ref-logo-wrap">
                    {client.logo ? (
                      <img
                        src={client.logo}
                        alt={`Logo ${client.nom}`}
                        onError={(e) => {
                          const img = e.target as HTMLImageElement
                          img.style.display = 'none'
                          const wrap = img.parentElement
                          if (wrap) {
                            wrap.style.background = client.couleur
                            wrap.innerHTML = `<span style="font-size:20px;font-weight:900;color:#fff;letter-spacing:-0.5px">${client.initiales}</span>`
                          }
                        }}
                      />
                    ) : (
                      <div style={{ width:'100%', height:'100%', background:client.couleur, display:'flex', alignItems:'center', justifyContent:'center', borderRadius:18 }}>
                        <span style={{ fontSize:20, fontWeight:900, color:'#fff', letterSpacing:'-0.5px' }}>{client.initiales}</span>
                      </div>
                    )}
                  </div>

                  {/* Nom & secteur */}
                  <div className="ref-nom">{client.nom}</div>
                  <div className="ref-secteur">{client.secteur}</div>

                  {/* Flèche si lien */}
                  {isLink && (
                    <div className="ref-arrow">
                      <svg width="13" height="13" fill="none" stroke="#aaa" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                      </svg>
                    </div>
                  )}
                </Tag>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── SÉPARATEUR ── */}
      <div style={{ height:2, background:'linear-gradient(90deg,#CC0000,#C9A84C,#1B2B6B)', margin:'0 48px' }}/>

      {/* ── CTA ── */}
      <section className="py-20" style={{ background:'#f8f7f5' }}>
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p style={{ color:'#CC0000', fontWeight:700, fontSize:12, textTransform:'uppercase', letterSpacing:'2px', marginBottom:12 }}>
            Rejoignez nos références
          </p>
          <h2 style={{ fontSize:34, fontWeight:900, color:'#111', marginBottom:8, letterSpacing:'-0.5px' }}>
            Besoin de véhicules pour<br/>votre entreprise ?
          </h2>
          <div style={{ width:48, height:2, background:'#C9A84C', margin:'16px auto' }}/>
          <p style={{ fontSize:15, color:'#888', marginBottom:32, lineHeight:1.75 }}>
            Contactez notre équipe pour un devis personnalisé.<br/>
            Nous accompagnons les professionnels depuis plus de 15 ans.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/devis"
              style={{ display:'inline-flex', alignItems:'center', gap:8, background:'#CC0000', color:'#fff', fontWeight:700, padding:'13px 28px', borderRadius:99, textDecoration:'none', fontSize:14, boxShadow:'0 4px 16px rgba(204,0,0,0.28)' }}>
              Demande de devis
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </Link>
            <a href="tel:0524885025"
              style={{ display:'inline-flex', alignItems:'center', gap:8, background:'#fff', border:'1px solid #e5e2dd', color:'#111', fontWeight:700, padding:'13px 28px', borderRadius:99, textDecoration:'none', fontSize:14 }}>
              <svg width="16" height="16" fill="#CC0000" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
              </svg>
              0524 885 025
            </a>
            <Link href="/contact"
              style={{ display:'inline-flex', alignItems:'center', background:'#fff', border:'1px solid #e5e2dd', color:'#111', fontWeight:700, padding:'13px 28px', borderRadius:99, textDecoration:'none', fontSize:14 }}>
              Nous contacter
            </Link>
          </div>
        </div>
      </section>

    </main>
  )
}