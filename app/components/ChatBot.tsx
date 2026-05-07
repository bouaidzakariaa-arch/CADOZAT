'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const SUGGESTIONS = [
  'Quels camions avez-vous ?',
  'Prix du D-MAX au Maroc ?',
  'Comment acheter un camion ?',
  'Marché public — procédure ?',
  'Service après-vente ?',
]

function formatMessage(text: string) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br/>')
}

export default function ChatBot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Bonjour ! 👋 Je suis **Cadozat Bot**, votre assistant CADOZAT.\n\nJe peux vous aider à :\n- Choisir le bon véhicule\n- Connaître nos prix indicatifs\n- Comprendre la procédure d\'achat\n- Répondre à vos questions en français ou en arabe\n\nComment puis-je vous aider ?',
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return
    setShowSuggestions(false)

    const userMessage: Message = { role: 'user', content: text }
    const newMessages = [...messages, userMessage]
    setMessages(newMessages)
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      })

      const data = await res.json()
      if (!data.message) throw new Error()

      const trimmed = data.message.trim()

      // CAS BROCHURE
      if (trimmed.startsWith('{"action":"brochure"')) {
        try {
          const info = JSON.parse(trimmed)

          await fetch('/api/brochure', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              nom: info.nom,
              prenom: info.prenom,
              email: info.email,
              modele: info.modele,
              marque: info.marque,
              brochure: `/brochures/${info.modele}.pdf`,
            }),
          })

          const link = document.createElement('a')
          link.href = `/brochures/${info.modele}.pdf`
          link.download = `CADOZAT-${info.modele}.pdf`
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)

          setMessages(prev => [...prev, {
            role: 'assistant',
            content: `Parfait ${info.prenom} ! Votre brochure est en cours de téléchargement. Nous vous avons aussi envoyé une confirmation à ${info.email}. Souhaitez-vous demander un devis ? 😊`,
          }])

        } catch {
          setMessages(prev => [...prev, {
            role: 'assistant',
            content: 'Une erreur est survenue. Appelez-nous au 0524 885 025.',
          }])
        }

      // CAS DEVIS
      } else if (trimmed.startsWith('{"action":"devis"')) {
        try {
          const info = JSON.parse(trimmed)

          await fetch('/api/devis', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              nom: info.nom,
              prenom: info.prenom,
              email: info.email,
              telephone: info.telephone,
              ville: info.ville,
              vehicule: info.vehicule,
              message: 'Demande reçue via Cadozat Bot',
            }),
          })

          setMessages(prev => [...prev, {
            role: 'assistant',
            content: `Merci ${info.prenom} ! Votre demande de devis pour le ${info.vehicule} a bien été envoyée. Notre équipe vous contactera très bientôt au ${info.telephone}. 😊`,
          }])

        } catch {
          setMessages(prev => [...prev, {
            role: 'assistant',
            content: 'Une erreur est survenue. Appelez-nous au 0524 885 025.',
          }])
        }

      // CAS NORMAL
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: data.message }])
      }

    } catch {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Désolé, une erreur est survenue. Appelez-nous au 0524 885 025.',
      }])
    } finally {
      setLoading(false)
      inputRef.current?.focus()
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(input)
  }

  return (
    <>
      {/* ── Styles globaux ── */}
      <style>{`
        @keyframes czChatIn {
          from { opacity: 0; transform: translateY(16px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)   scale(1);    }
        }
        @keyframes czTyping { 0%,100%{opacity:0.3} 50%{opacity:1} }

        .czbot-bubble { animation: czChatIn 0.28s cubic-bezier(0.22,1,0.36,1); }

        .czbot-dot { animation: czTyping 1.2s infinite; }
        .czbot-dot:nth-child(2) { animation-delay: 0.2s; }
        .czbot-dot:nth-child(3) { animation-delay: 0.4s; }

        .czbot-msgs::-webkit-scrollbar       { width: 4px; }
        .czbot-msgs::-webkit-scrollbar-track { background: transparent; }
        .czbot-msgs::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 4px; }

        /* ──────────────────────────────────────────
           FENÊTRE PRINCIPALE
           Mobile  : left/right 16px → s'adapte à tout écran
           Desktop : right:auto + width:380px fixe à gauche
        ────────────────────────────────────────── */
        .czbot-window {
          position: fixed;
          bottom: 78px;
          left: 16px;
          right: 16px;
          max-width: 380px;
          height: 530px;
          z-index: 99998;
          border-radius: 20px;
          background: #fff;
          box-shadow: 0 24px 80px rgba(0,0,0,0.18);
          display: flex;
          flex-direction: column;
          animation: czChatIn 0.28s cubic-bezier(0.22,1,0.36,1);
          overflow: hidden;
        }
        @media (min-width: 480px) {
          .czbot-window {
            right: auto;
            width: 380px;
          }
        }

        /* ──────────────────────────────────────────
           CHAMP DE SAISIE
           - fond gris visible (pas blanc sur blanc)
           - placeholder contrasté
           - focus : fond blanc + bordure rouge
        ────────────────────────────────────────── */
        .czbot-input {
          flex: 1;
          min-width: 0;
          padding: 10px 14px;
          border-radius: 99px;
          border: 1.5px solid #cbd5e1;
          font-size: 14px;
          color: #1e293b;
          background: #f1f5f9;
          font-family: inherit;
          outline: none;
          transition: border-color 0.2s, background 0.2s;
          -webkit-appearance: none;
        }
        .czbot-input::placeholder { color: #64748b; }
        .czbot-input:focus        { border-color: #CC0000; background: #fff; }
        .czbot-input:disabled     { opacity: 0.55; }

        /* ──────────────────────────────────────────
           LIENS RAPIDES — grille 3 colonnes égales
           Jamais de débordement, jamais de bouton coupé
        ────────────────────────────────────────── */
        .czbot-quicklinks {
          padding: 8px 12px;
          border-top: 1px solid #f1f5f9;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 6px;
          flex-shrink: 0;
        }
        .czbot-ql {
          padding: 8px 4px;
          border-radius: 10px;
          font-size: 11px;
          font-weight: 700;
          text-align: center;
          text-decoration: none;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 3px;
          transition: opacity 0.15s;
          white-space: nowrap;
          overflow: hidden;
        }
        .czbot-ql:active { opacity: 0.7; }

        /* Suggestions */
        .czbot-chip {
          padding: 6px 11px;
          border-radius: 99px;
          border: 1px solid #e2e8f0;
          background: #f8faff;
          cursor: pointer;
          font-size: 12px;
          font-weight: 600;
          color: #475569;
          transition: border-color 0.2s, color 0.2s;
          font-family: inherit;
        }
        .czbot-chip:hover  { border-color: #CC0000; color: #CC0000; }
        .czbot-chip:active { opacity: 0.7; }

        /* Bouton flottant */
        .czbot-fab {
          position: fixed;
          bottom: 20px;
          left: 16px;
          z-index: 99999;
          height: 48px;
          border-radius: 99px;
          border: none;
          cursor: pointer;
          box-shadow: 0 8px 32px rgba(204,0,0,0.35);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 0 18px;
          transition: all 0.3s cubic-bezier(0.22,1,0.36,1);
        }
        .czbot-fab-dot {
          position: absolute;
          top: -2px;
          right: -2px;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #25D366;
          border: 2px solid white;
        }
      `}</style>

      {/* ── Bouton flottant ── */}
      <button
        className="czbot-fab"
        onClick={() => setOpen(prev => !prev)}
        aria-label={open ? 'Fermer le chat' : 'Ouvrir Cadozat Bot'}
        style={{
          background: open
            ? '#0f172a'
            : 'linear-gradient(135deg, #CC0000, #1B2B6B)',
        }}
      >
        {open ? (
          <svg width="18" height="18" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        ) : (
          <>
            <svg width="18" height="18" fill="white" viewBox="0 0 24 24">
              <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
            </svg>
            <span style={{ color: 'white', fontWeight: 800, fontSize: '13px', whiteSpace: 'nowrap' }}>
              Cadozat Bot
            </span>
            <span className="czbot-fab-dot" aria-hidden="true"/>
          </>
        )}
      </button>

      {/* ── Fenêtre chat ── */}
      {open && (
        <div className="czbot-window" role="dialog" aria-label="Assistant Cadozat Bot">

          {/* ── Header ── */}
          <div style={{
            background: 'linear-gradient(135deg, #CC0000, #1B2B6B)',
            padding: '14px 16px',
            flexShrink: 0,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '40px', height: '40px', borderRadius: '50%',
                background: 'rgba(255,255,255,0.15)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                <svg width="20" height="20" fill="white" viewBox="0 0 24 24">
                  <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
                </svg>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ color: '#fff', fontWeight: 800, fontSize: '14px' }}>
                  Cadozat Bot
                </div>
                <div style={{
                  color: 'rgba(255,255,255,0.8)', fontSize: '11px',
                  display: 'flex', alignItems: 'center', gap: '5px',
                }}>
                  <span style={{
                    width: '6px', height: '6px', borderRadius: '50%',
                    background: '#4ade80', display: 'inline-block', flexShrink: 0,
                  }}/>
                  En ligne — Assistant CADOZAT
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Fermer"
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  padding: '6px', color: 'rgba(255,255,255,0.75)',
                  lineHeight: 1, borderRadius: '50%',
                }}
              >
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>
          </div>

          {/* ── Messages ── */}
          <div
            className="czbot-msgs"
            style={{
              flex: 1, overflowY: 'auto',
              padding: '14px 12px',
              display: 'flex', flexDirection: 'column', gap: '12px',
            }}
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                className="czbot-bubble"
                style={{
                  display: 'flex',
                  justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                }}
              >
                {msg.role === 'assistant' && (
                  <div style={{
                    width: '28px', height: '28px', borderRadius: '50%',
                    background: 'linear-gradient(135deg, #CC0000, #1B2B6B)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0, marginRight: '8px', marginTop: '2px',
                  }}>
                    <svg width="13" height="13" fill="white" viewBox="0 0 24 24">
                      <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
                    </svg>
                  </div>
                )}
                <div style={{
                  maxWidth: '78%',
                  padding: '10px 13px',
                  borderRadius: msg.role === 'user'
                    ? '18px 18px 4px 18px'
                    : '18px 18px 18px 4px',
                  background: msg.role === 'user'
                    ? 'linear-gradient(135deg, #CC0000, #1B2B6B)'
                    : '#f1f5f9',
                  color: msg.role === 'user' ? '#fff' : '#1e293b',
                  fontSize: '13px',
                  lineHeight: '1.6',
                }}>
                  <div dangerouslySetInnerHTML={{ __html: formatMessage(msg.content) }} />
                </div>
              </div>
            ))}

            {/* Indicateur de frappe */}
            {loading && (
              <div className="czbot-bubble" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{
                  width: '28px', height: '28px', borderRadius: '50%',
                  background: 'linear-gradient(135deg, #CC0000, #1B2B6B)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <svg width="13" height="13" fill="white" viewBox="0 0 24 24">
                    <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
                  </svg>
                </div>
                <div style={{
                  background: '#f1f5f9', padding: '12px 16px',
                  borderRadius: '18px 18px 18px 4px',
                  display: 'flex', gap: '4px', alignItems: 'center',
                }}>
                  {[0, 1, 2].map(j => (
                    <span
                      key={j}
                      className="czbot-dot"
                      style={{
                        width: '7px', height: '7px', borderRadius: '50%',
                        background: '#94a3b8', display: 'inline-block',
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Suggestions initiales */}
            {showSuggestions && messages.length === 1 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '4px' }}>
                {SUGGESTIONS.map((s, i) => (
                  <button key={i} className="czbot-chip" onClick={() => sendMessage(s)}>
                    {s}
                  </button>
                ))}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* ── Liens rapides ── */}
          <div className="czbot-quicklinks">
            <Link
              href="/devis"
              className="czbot-ql"
              style={{ background: '#fff5f5', border: '1px solid #fecaca', color: '#CC0000' }}
            >
              📋 Devis
            </Link>
            <Link
              href="/catalogue"
              className="czbot-ql"
              style={{ background: '#f0f7ff', border: '1px solid #bfdbfe', color: '#0057A8' }}
            >
              🚛 Catalogue
            </Link>
            <a
              href="tel:0524885025"
              className="czbot-ql"
              style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', color: '#16a34a' }}
            >
              📞 Appeler
            </a>
          </div>

          {/* ── Zone de saisie ── */}
          <form
            onSubmit={handleSubmit}
            style={{
              padding: '10px 12px',
              borderTop: '1px solid #f1f5f9',
              display: 'flex', gap: '8px', alignItems: 'center',
              flexShrink: 0,
            }}
          >
            <input
              ref={inputRef}
              className="czbot-input"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Posez votre question..."
              disabled={loading}
              autoComplete="off"
              autoCorrect="off"
              spellCheck={false}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              aria-label="Envoyer"
              style={{
                width: '42px', height: '42px', borderRadius: '50%',
                background: input.trim()
                  ? 'linear-gradient(135deg, #CC0000, #1B2B6B)'
                  : '#e2e8f0',
                border: 'none',
                cursor: input.trim() ? 'pointer' : 'not-allowed',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'background 0.2s',
                flexShrink: 0,
              }}
            >
              <svg width="16" height="16" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
              </svg>
            </button>
          </form>

        </div>
      )}
    </>
  )
}