'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { CookieIcon } from '@/components/icons'

export default function LoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Error')
      router.push('/admin')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al ingresar')
      setLoading(false)
    }
  }

  const inputCls =
    'w-full bg-cocoa-900 border border-caramel-500/15 rounded-lg px-4 py-3 text-[#f5ece1] text-sm placeholder:text-[#f5ece1]/30 focus:border-caramel-400 focus:outline-none transition-colors'

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-8">
          <CookieIcon className="w-12 h-12 text-caramel-400 mb-3" />
          <h1 className="font-display text-2xl font-bold text-[#fdf6ee]">Cookies NyM</h1>
          <p className="text-[#f5ece1]/40 text-xs tracking-[0.2em] uppercase mt-1">Panel de administración</p>
        </div>

        <form onSubmit={submit} className="bg-cocoa-800 rounded-2xl p-7 border border-caramel-500/10 space-y-4">
          <div>
            <label className="block text-[#f5ece1]/60 text-xs tracking-[0.1em] uppercase mb-2">Usuario</label>
            <input value={username} onChange={(e) => setUsername(e.target.value)} required autoFocus className={inputCls} placeholder="admin" />
          </div>
          <div>
            <label className="block text-[#f5ece1]/60 text-xs tracking-[0.1em] uppercase mb-2">Contraseña</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className={inputCls} placeholder="••••••••" />
          </div>
          {error && <p className="text-red-400 text-xs">{error}</p>}
          <button type="submit" disabled={loading} className="w-full bg-caramel-500 text-cocoa-900 text-xs font-semibold tracking-[0.2em] uppercase py-3.5 rounded-full hover:bg-caramel-400 transition-colors disabled:opacity-60">
            {loading ? 'Ingresando…' : 'Ingresar'}
          </button>
        </form>

        <a href="/" className="block text-center text-[#f5ece1]/30 text-xs mt-6 hover:text-caramel-300 transition-colors">
          ← Volver a la web
        </a>
      </div>
    </div>
  )
}
