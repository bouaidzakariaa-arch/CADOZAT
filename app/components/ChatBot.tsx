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
  'كيف أشتري شاحنة ؟',
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

    // 🔹 CAS BROCHURE
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

    // 🔥 NOUVEAU CAS DEVIS
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

    // 🔹 CAS NORMAL (chat classique)
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
      {/* Bouton flottant */}
      <button
        onClick={() => setOpen(!open)}
        style={{
            position: 'fixed', bottom: '28px', left: '28px', zIndex: 99998,
            height: '48px',
            borderRadius: '99px',
            background: open ? '#0f172a' : 'linear-gradient(135deg, #CC0000, #1B2B6B)',
            border: 'none', cursor: 'pointer',
            boxShadow: '0 8px 32px rgba(204,0,0,0.35)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: '8px',
            padding: '0 16px',
            transition: 'all 0.3s cubic-bezier(0.22,1,0.36,1)',
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
            </>
        )}
        {!open && (
            <span style={{
            position: 'absolute', top: '-2px', right: '-2px',
            width: '12px', height: '12px', borderRadius: '50%',
            background: '#25D366', border: '2px solid white',
            }}/>
        )}
        </button>

      <style>{`
        @keyframes pulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.2)} }
        @keyframes chatIn { from{opacity:0;transform:translateY(20px) scale(0.95)} to{opacity:1;transform:translateY(0) scale(1)} }
        @keyframes typing { 0%,100%{opacity:0.3} 50%{opacity:1} }
        .chat-bubble { animation: chatIn 0.3s cubic-bezier(0.22,1,0.36,1); }
        .typing-dot { animation: typing 1.2s infinite; }
        .typing-dot:nth-child(2) { animation-delay: 0.2s; }
        .typing-dot:nth-child(3) { animation-delay: 0.4s; }
        .chat-messages::-webkit-scrollbar { width: 4px; }
        .chat-messages::-webkit-scrollbar-track { background: transparent; }
        .chat-messages::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 4px; }
      `}</style>

      {/* Fenêtre chat */}
      {open && (
        <div style={{
          position: 'fixed', bottom: '96px', left: '28px', zIndex: 99998,
          width: '360px', height: '520px',
          background: '#fff', borderRadius: '20px',
          boxShadow: '0 24px 80px rgba(0,0,0,0.18)',
          display: 'flex', flexDirection: 'column',
          animation: 'chatIn 0.3s cubic-bezier(0.22,1,0.36,1)',
          overflow: 'hidden',
        }}>

          {/* Header */}
          <div style={{ background: 'linear-gradient(135deg, #CC0000, #1B2B6B)', padding: '16px 20px', flexShrink: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="20" height="20" fill="white" viewBox="0 0 24 24">
                  <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
                </svg>
              </div>
              <div>
                <div style={{ color: '#fff', fontWeight: 800, fontSize: '14px' }}>Cadozat Bot</div>
                <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4ade80', display: 'inline-block' }}/>
                  En ligne — Assistant CADOZAT
                </div>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="chat-messages" style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {messages.map((msg, i) => (
              <div key={i} className="chat-bubble" style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
                {msg.role === 'assistant' && (
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'linear-gradient(135deg, #CC0000, #1B2B6B)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginRight: '8px', marginTop: '2px' }}>
                    <svg width="13" height="13" fill="white" viewBox="0 0 24 24">
                      <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
                    </svg>
                  </div>
                )}
                <div style={{
                  maxWidth: '80%', padding: '10px 14px', borderRadius: msg.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                  background: msg.role === 'user' ? 'linear-gradient(135deg, #CC0000, #1B2B6B)' : '#f1f5f9',
                  color: msg.role === 'user' ? '#fff' : '#1e293b',
                  fontSize: '13px', lineHeight: '1.6',
                }}>
                  <div dangerouslySetInnerHTML={{ __html: formatMessage(msg.content) }} />
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {loading && (
              <div className="chat-bubble" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'linear-gradient(135deg, #CC0000, #1B2B6B)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="13" height="13" fill="white" viewBox="0 0 24 24">
                    <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
                  </svg>
                </div>
                <div style={{ background: '#f1f5f9', padding: '12px 16px', borderRadius: '18px 18px 18px 4px', display: 'flex', gap: '4px', alignItems: 'center' }}>
                  {[0,1,2].map(i => (
                    <span key={i} className="typing-dot" style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#94a3b8', display: 'inline-block' }}/>
                  ))}
                </div>
              </div>
            )}

            {/* Suggestions */}
            {showSuggestions && messages.length === 1 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '4px' }}>
                {SUGGESTIONS.map((s, i) => (
                  <button key={i} onClick={() => sendMessage(s)}
                    style={{ padding: '6px 12px', borderRadius: '99px', border: '1px solid #e2e8f0', background: '#f8faff', cursor: 'pointer', fontSize: '12px', fontWeight: 600, color: '#475569', transition: 'all 0.2s', fontFamily: 'inherit' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#CC0000'; (e.currentTarget as HTMLElement).style.color = '#CC0000' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = '#e2e8f0'; (e.currentTarget as HTMLElement).style.color = '#475569' }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Liens rapides */}
          <div style={{ padding: '8px 16px', borderTop: '1px solid #f1f5f9', display: 'flex', gap: '8px', flexShrink: 0 }}>
            <Link href="/devis" style={{ flex: 1, padding: '7px', borderRadius: '8px', background: '#fff5f5', border: '1px solid #fecaca', color: '#CC0000', fontSize: '11px', fontWeight: 700, textAlign: 'center', textDecoration: 'none' }}>
              📋 Devis
            </Link>
            <Link href="/catalogue" style={{ flex: 1, padding: '7px', borderRadius: '8px', background: '#f0f7ff', border: '1px solid #bfdbfe', color: '#0057A8', fontSize: '11px', fontWeight: 700, textAlign: 'center', textDecoration: 'none' }}>
              🚛 Catalogue
            </Link>
            <a href="tel:0524885025" style={{ flex: 1, padding: '7px', borderRadius: '8px', background: '#f0fdf4', border: '1px solid #bbf7d0', color: '#16a34a', fontSize: '11px', fontWeight: 700, textAlign: 'center', textDecoration: 'none' }}>
              📞 Appeler
            </a>
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} style={{ padding: '12px 16px', borderTop: '1px solid #f1f5f9', display: 'flex', gap: '8px', flexShrink: 0 }}>
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Posez votre question..."
              disabled={loading}
              style={{ flex: 1, padding: '10px 14px', borderRadius: '99px', border: '1.5px solid #e2e8f0', fontSize: '13px', outline: 'none', background: '#f8faff', fontFamily: 'inherit', transition: 'border-color 0.2s' }}
              onFocus={e => e.target.style.borderColor = '#CC0000'}
              onBlur={e => e.target.style.borderColor = '#e2e8f0'}
            />
            <button type="submit" disabled={loading || !input.trim()}
              style={{ width: '40px', height: '40px', borderRadius: '50%', background: input.trim() ? 'linear-gradient(135deg, #CC0000, #1B2B6B)' : '#e2e8f0', border: 'none', cursor: input.trim() ? 'pointer' : 'not-allowed', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s', flexShrink: 0 }}>
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