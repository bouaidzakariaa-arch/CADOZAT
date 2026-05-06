'use client'

import { useState } from 'react'
import Link from 'next/link'
import BrochureModal from './BrochureModal'

const SOCIAL_BUTTONS = [
  {
    href: 'https://www.facebook.com/cadozaat',
    color: '#1877F2',
    shadow: 'rgba(24,119,242,0.4)',
    label: 'Facebook',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="white" style={{ flexShrink: 0 }}>
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
  {
    href: 'https://www.instagram.com/cadozat',
    color: '#E1306C',
    shadow: 'rgba(225,48,108,0.4)',
    label: 'Instagram',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="white" style={{ flexShrink: 0 }}>
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
      </svg>
    ),
  },
  {
    href: `https://wa.me/212682405510?text=${encodeURIComponent('Bonjour, je suis intéressé par vos véhicules Isuzu & Karry. Pouvez-vous me renseigner ?')}`,
    color: '#25D366',
    shadow: 'rgba(37,211,102,0.4)',
    label: 'WhatsApp',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="white" style={{ flexShrink: 0 }}>
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    ),
  },
]

export default function SocialButtons() {
  const [hovered, setHovered] = useState<number | null>(null)
  const [showBrochure, setShowBrochure] = useState(false)

  return (
    <>
      {showBrochure && <BrochureModal onClose={() => setShowBrochure(false)} />}

      <div style={{
        position: 'fixed', bottom: '28px', right: '28px',
        zIndex: 99998, display: 'flex', flexDirection: 'column', gap: '8px',
      }}>

        {/* Bouton Brochure */}
        <button
          onClick={() => setShowBrochure(true)}
          onMouseEnter={() => setHovered(0)}
          onMouseLeave={() => setHovered(null)}
          style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            background: '#C9A84C', color: '#fff', borderRadius: '99px',
            padding: hovered === 0 ? '12px 16px' : '12px',
            boxShadow: '0 6px 20px rgba(201,168,76,0.4)',
            border: 'none', cursor: 'pointer',
            transition: 'all 0.3s cubic-bezier(0.22,1,0.36,1)',
            overflow: 'hidden', maxWidth: hovered === 0 ? '200px' : '44px',
            alignSelf: 'flex-end',
          }}>
          <svg width="20" height="20" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
          </svg>
          <span style={{ fontSize: '12px', fontWeight: 700, whiteSpace: 'nowrap', opacity: hovered === 0 ? 1 : 0, transition: 'opacity 0.2s' }}>
            Brochure PDF
          </span>
        </button>

        {/* Bouton Devis */}
        <Link
          href="/devis"
          onMouseEnter={() => setHovered(1)}
          onMouseLeave={() => setHovered(null)}
          style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            background: '#CC0000', color: '#fff', borderRadius: '99px',
            padding: hovered === 1 ? '12px 16px' : '12px',
            boxShadow: '0 6px 20px rgba(204,0,0,0.4)',
            textDecoration: 'none',
            transition: 'all 0.3s cubic-bezier(0.22,1,0.36,1)',
            overflow: 'hidden', maxWidth: hovered === 1 ? '200px' : '44px',
            alignSelf: 'flex-end',
          }}>
          <svg width="20" height="20" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
          </svg>
          <span style={{ fontSize: '12px', fontWeight: 700, whiteSpace: 'nowrap', opacity: hovered === 1 ? 1 : 0, transition: 'opacity 0.2s' }}>
            Demande de devis
          </span>
        </Link>

        {/* Séparateur */}
        <div style={{ height: '1px', background: 'rgba(0,0,0,0.08)', margin: '2px 0', alignSelf: 'flex-end', width: '44px' }} />

        {/* Boutons sociaux */}
        {SOCIAL_BUTTONS.map((btn, i) => {
          const idx = i + 3
          return (
            <Link key={i} href={btn.href}
              target="_blank" rel="noopener noreferrer"
              onMouseEnter={() => setHovered(idx)}
              onMouseLeave={() => setHovered(null)}
              style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                background: btn.color, color: '#fff', borderRadius: '99px',
                padding: hovered === idx ? '12px 16px' : '12px',
                boxShadow: `0 6px 20px ${btn.shadow}`,
                textDecoration: 'none',
                transition: 'all 0.3s cubic-bezier(0.22,1,0.36,1)',
                overflow: 'hidden', maxWidth: hovered === idx ? '180px' : '44px',
                alignSelf: 'flex-end',
              }}>
              {btn.icon}
              <span style={{ fontSize: '12px', fontWeight: 700, whiteSpace: 'nowrap', opacity: hovered === idx ? 1 : 0, transition: 'opacity 0.2s' }}>
                {btn.label}
              </span>
            </Link>
          )
        })}
      </div>
    </>
  )
}