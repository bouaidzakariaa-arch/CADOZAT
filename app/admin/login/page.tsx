'use client'

// app/admin/login/page.tsx

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [loading,  setLoading]  = useState(false)
  const [erreur,   setErreur]   = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErreur('')

    try {
      const res = await fetch('/api/auth/login', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        setErreur(data.error || 'Identifiants incorrects')
        return
      }

      router.push('/admin')
      router.refresh()
    } catch {
      setErreur('Erreur réseau, réessayez.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4"
      style={{ background: 'linear-gradient(135deg,#1a3d2b 0%,#0f2419 50%,#1a1a2e 100%)' }}>

      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="font-black text-3xl tracking-tight" style={{ color: '#2D6A4F' }}>
              CADOZAT
            </div>
          </div>
          <div className="flex items-center justify-center gap-1.5">
            <span className="font-black text-xs tracking-widest" style={{ color: '#CC0000' }}>ISUZU</span>
            <span className="text-gray-500 text-xs">·</span>
            <span className="font-black text-xs tracking-widest" style={{ color: '#0057A8' }}>KARRY</span>
            <span className="text-gray-500 text-xs">·</span>
            <span className="font-black text-xs tracking-widest" style={{ color: '#9ca3af' }}>GREAT WALL</span>
          </div>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="h-1.5" style={{ background: 'linear-gradient(to right,#CC0000,#2D6A4F)' }}/>

          <div className="p-8">
            <h1 className="text-2xl font-black text-gray-900 mb-1">Administration</h1>
            <p className="text-sm text-gray-500 mb-8">Accès réservé à l'équipe CADOZAT</p>

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Email */}
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2">
                  Email
                </label>
                <input
                  type="email" required
                  placeholder="admin@cadozat.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border text-sm font-medium focus:outline-none transition-all"
                  style={{ borderColor: 'rgba(0,0,0,.15)', background: '#fafafa' }}
                  onFocus={e => (e.target.style.borderColor = '#CC0000')}
                  onBlur={e  => (e.target.style.borderColor = 'rgba(0,0,0,.15)')}
                />
              </div>

              {/* Mot de passe */}
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2">
                  Mot de passe
                </label>
                <input
                  type="password" required
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border text-sm font-medium focus:outline-none transition-all"
                  style={{ borderColor: 'rgba(0,0,0,.15)', background: '#fafafa' }}
                  onFocus={e => (e.target.style.borderColor = '#CC0000')}
                  onBlur={e  => (e.target.style.borderColor = 'rgba(0,0,0,.15)')}
                />
              </div>

              {/* Erreur */}
              {erreur && (
                <div className="p-3 rounded-xl text-sm font-medium text-red-700 bg-red-50 border border-red-200">
                  ⚠️ {erreur}
                </div>
              )}

              {/* Submit */}
              <button type="submit" disabled={loading}
                className="w-full py-3.5 rounded-xl font-extrabold text-white transition-all hover:scale-105 active:scale-95 disabled:opacity-60"
                style={{ background: 'linear-gradient(135deg,#CC0000,#990000)', boxShadow: '0 4px 20px rgba(204,0,0,.35)' }}>
                {loading ? 'Connexion...' : 'Se connecter →'}
              </button>

            </form>
          </div>
        </div>

        <p className="text-center text-xs mt-6" style={{ color: 'rgba(255,255,255,.3)' }}>
          Accès sécurisé — CADOZAT © 2024
        </p>
      </div>
    </div>
  )
}