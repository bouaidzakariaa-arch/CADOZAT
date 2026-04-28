import Link from 'next/link'
import BrochureForm from '@/app/components/BrochureForm'


const images = [
  '/images/camions/serie-f/fvr-34p/img1.jpg',
  '/images/camions/serie-f/fvr-34p/img2.jpg',
  '/images/camions/serie-f/fvr-34p/img3.jpg',
  '/images/camions/serie-f/fvr-34p/img4.jpg',
  '/images/camions/serie-f/fvr-34p/img5.jpg',
  '/images/camions/serie-f/fvr-34p/img6.jpg',
]

const specs = [
  {
    categorie: 'Dimensions & Poids', icon: '📐',
    items: [
      { label: 'Empattement',                  valeur: '5 050 mm' },
      { label: 'Longueur carossable',          valeur: '6 600 mm' },
      { label: 'Poids total en charge (PTAC)', valeur: '18 000 kg' },
      { label: 'Poids à vide — Avant',         valeur: '3 175 kg' },
      { label: 'Poids à vide — Arrière',       valeur: '1 590 kg' },
      { label: 'Poids à vide — Total',         valeur: '4 765 kg' },
    ],
  },
  {
    categorie: 'Essieux & Pont', icon: '🔩',
    items: [
      { label: 'Cabine',                  valeur: 'Large' },
      { label: 'Capacité essieu avant',   valeur: '6 500 kg' },
      { label: 'Capacité essieu arrière', valeur: '11 500 kg' },
      { label: 'Rapport de pont',         valeur: '6.143' },
    ],
  },
  {
    categorie: 'Moteur', icon: '⚙️',
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
    categorie: 'Boîte de vitesse', icon: '🔄',
    items: [
      { label: 'Modèle',             valeur: 'MZW6P' },
      { label: 'Type',               valeur: 'Mécanique surmultipliée' },
      { label: 'Nombre de rapports', valeur: '6 AV + 1 AR' },
    ],
  },
  {
    categorie: 'Direction & Freinage', icon: '🛡️',
    items: [
      { label: 'Direction',           valeur: 'Assistée — écrou bille recirculation' },
      { label: 'Freinage service',    valeur: 'Frein pneumatique à tambours' },
      { label: 'Frein stationnement', valeur: 'À ressort sur roues arrières' },
      { label: 'Frein auxiliaire',    valeur: 'Frein sur échappement' },
      { label: 'ABS',                 valeur: 'Avec système antiblocage des freins' },
    ],
  },
  {
    categorie: 'Suspension & Pneus', icon: '🚛',
    items: [
      { label: 'Suspension',         valeur: 'Ressorts à lames AV et AR' },
      { label: 'Dimension pneus',    valeur: '11R22,5-14' },
      { label: 'Nombre de goujons',  valeur: '10' },
      { label: 'Capacité réservoir', valeur: '2 × 200 litres' },
      { label: 'Alternateur',        valeur: '24V — 50A' },
    ],
  },
]

const equipements = [
  'Radio AM/FM avec lecteur de CD', 'Système à 2 haut-parleurs', 'Siège en tissu',
  'Ceinture de sécurité 3 points conducteur/assistant', 'Ceinture 2 points siège central',
  'Siège à suspension pneumatique', 'Cendrier conducteur et assistant',
  'Aération par air dynamique', 'Chauffage et dégivreur', 'Tachygraphe',
  'Console supérieure avec pare-soleil', 'Boîte à gants avec couvercle',
  'Rail de rideaux', 'Tapis-lit', 'Lunette arrière avec rétroviseur intérieur',
  'Antibrouillard avant', 'Essuie-glace intermittent', 'Prise de force (en option)',
]

const modeles_fseries = [
  { nom: 'FTR 34K 16T', href: '/catalogue/ftr-34k', actif: false },
  { nom: 'FTR 34M 16T', href: '/catalogue/ftr-34m', actif: false },
  { nom: 'FTR 34P 16T', href: '/catalogue/ftr-34p', actif: false },
  { nom: 'FVR 34K 18T', href: '/catalogue/fvr-34k', actif: false },
  { nom: 'FVR 34P 18T', href: '/catalogue/fvr-34p', actif: true },
]

export default function FVR34PPage() {
  return (
    <main className="bg-white">

      {/* HERO */}
      <section className="bg-white pt-32 pb-16 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-8 flex-wrap">
            <Link href="/" className="hover:text-[#CC0000] transition-colors">Accueil</Link>
            <span>/</span>
            <Link href="/catalogue" className="hover:text-[#CC0000] transition-colors">Notre gamme</Link>
            <span>/</span>
            <span className="text-gray-500">F-Series</span>
            <span>/</span>
            <span className="text-[#CC0000] font-semibold">FVR 34P 18T</span>
          </div>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-2 mb-5 flex-wrap">
                <span className="bg-[#CC0000] text-white text-xs font-bold px-3 py-1 rounded-full">Isuzu</span>
                <span className="bg-gray-100 text-gray-600 text-xs font-semibold px-3 py-1 rounded-full">F-Series</span>
                <span className="bg-[#1B2B6B] text-white text-xs font-bold px-3 py-1 rounded-full">18T</span>
                <span className="bg-gray-100 text-gray-600 text-xs font-semibold px-3 py-1 rounded-full">Châssis long</span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-black text-gray-900 mb-2 leading-none">
                FVR <span className="text-[#CC0000]">34P</span>
              </h1>
              <p className="text-gray-400 text-lg font-semibold mb-5">18T — Châssis long</p>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-1 bg-[#CC0000] rounded-full" />
                <div className="w-5 h-1 bg-[#C9A84C] rounded-full" />
              </div>
              <p className="text-gray-500 text-base leading-relaxed mb-8 max-w-lg">
                Le FVR 34P est le camion 18 tonnes châssis long de la gamme F-Series. Empattement de 5 050 mm pour une carosserie de 6 600 mm — parfait pour les flottes industrielles et collectivités.
                <span className="text-[#C9A84C] font-bold"> Garantie 3 ans SDAMA.</span>
              </p>
              <a href="tel:0524885025"
                className="inline-flex items-center gap-2 bg-[#CC0000] hover:bg-[#aa0000] text-white font-bold px-6 py-3 rounded-full transition-all shadow-md">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                </svg>
                0524 885 025 — CADOZAT
              </a>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: '⚡', label: 'Puissance',   valeur: '240 ch / 177 kw' },
                { icon: '🔄', label: 'Couple maxi', valeur: '706 Nm' },
                { icon: '📦', label: 'PTAC',         valeur: '18 000 kg' },
                { icon: '📏', label: 'Cylindrée',   valeur: '7 790 cc' },
                { icon: '⛽', label: 'Réservoir',   valeur: '2 × 200 litres' },
                { icon: '🌿', label: 'Émission',    valeur: 'EURO IV' },
              ].map((s, i) => (
                <div key={i} className="bg-gray-50 border border-gray-100 rounded-2xl p-4 hover:border-[#CC0000]/30 hover:shadow-sm transition-all">
                  <div className="text-2xl mb-2">{s.icon}</div>
                  <div className="text-gray-400 text-xs mb-1">{s.label}</div>
                  <div className="text-gray-900 font-black text-sm">{s.valeur}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

            {/* GALERIE */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <p className="text-[#CC0000] font-bold text-xs uppercase tracking-widest mb-3">Galerie</p>
            <div className="flex items-center justify-center gap-3">
              <div className="h-px w-10 bg-[#C9A84C]" />
              <h2 className="text-3xl font-black text-gray-900">Photos du FVR 34P</h2>
              <div className="h-px w-10 bg-[#C9A84C]" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {images.map((src, i) => (
              <div key={i} className="aspect-video rounded-2xl overflow-hidden border border-gray-100 bg-white shadow-sm hover:shadow-md transition-all">
                <img src={src} alt={`FVR 34P — Photo ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"/>
              </div>
            ))}
          </div>
        </div>
      </section>

      <BrochureForm modele='FVR34P' marque="isuzu" nomModele='FVR 34P' />

      {/* CTA FINAL */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-black text-gray-900 mb-2">
            Intéressé par le <span className="text-[#CC0000]">FVR 34P</span> ?
          </h2>
          <div className="w-12 h-0.5 bg-[#C9A84C] mx-auto my-4" />
          <p className="text-gray-400 mb-8 text-sm">Contactez l&apos;une de nos 3 agences — Ouarzazate · Agadir · Tinghir</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="tel:0524885025"
              className="inline-flex items-center gap-2 bg-[#CC0000] hover:bg-[#aa0000] text-white font-bold px-8 py-4 rounded-full transition-all shadow-lg">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
              </svg>
              0524 885 025
            </a>
            <Link href="/contact" className="inline-flex items-center border border-gray-200 hover:border-[#CC0000] hover:text-[#CC0000] text-gray-600 font-bold px-8 py-4 rounded-full transition-all">
              Nous contacter
            </Link>
            <Link href="/catalogue" className="inline-flex items-center border border-gray-200 hover:border-[#CC0000] hover:text-[#CC0000] text-gray-600 font-bold px-8 py-4 rounded-full transition-all">
              Voir toute la gamme
            </Link>
          </div>
        </div>
      </section>

    </main>
  )
}