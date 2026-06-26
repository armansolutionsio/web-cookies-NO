'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import type { Cookie, Settings } from '@/data/defaults'
import { defaultSettings } from '@/data/defaults'
import CookieEditor from '@/components/admin/CookieEditor'
import SettingsEditor from '@/components/admin/SettingsEditor'
import OrdersList from '@/components/admin/OrdersList'
import { CookieIcon } from '@/components/icons'

type Tab = 'cookies' | 'contacto' | 'contenido' | 'pedidos'

const TABS: { id: Tab; label: string; icon: string }[] = [
  { id: 'cookies', label: 'Cookies', icon: '🍪' },
  { id: 'contacto', label: 'Contacto', icon: '📱' },
  { id: 'contenido', label: 'Contenido', icon: '✏️' },
  { id: 'pedidos', label: 'Pedidos', icon: '📥' },
]

export default function AdminPage() {
  const router = useRouter()
  const [tab, setTab] = useState<Tab>('cookies')
  const [settings, setSettings] = useState<Settings | null>(null)
  const [cookies, setCookies] = useState<Cookie[]>([])
  const [editing, setEditing] = useState<Cookie | 'new' | null>(null)
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)

  const loadCookies = useCallback(async () => {
    const res = await fetch('/api/cookies')
    if (res.status === 401) { router.push('/admin/login'); return }
    if (res.ok) setCookies(await res.json())
  }, [router])

  useEffect(() => {
    Promise.all([
      fetch('/api/settings').then((r) => (r.ok ? r.json() : null)),
      fetch('/api/cookies').then((r) => (r.ok ? r.json() : [])),
    ])
      .then(([s, c]) => {
        setSettings(s || { id: 1, ...defaultSettings })
        setCookies(Array.isArray(c) ? c : [])
      })
      .finally(() => setLoading(false))
  }, [])

  async function logout() {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/admin/login')
    router.refresh()
  }

  async function saveCookie(data: Record<string, unknown>) {
    setSaving(true)
    try {
      const isNew = editing === 'new'
      const url = isNew ? '/api/cookies' : `/api/cookies/${(editing as Cookie).id}`
      const res = await fetch(url, {
        method: isNew ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error()
      setEditing(null)
      await loadCookies()
    } catch {
      alert('No se pudo guardar la cookie. Revisá la conexión con la base de datos.')
    } finally {
      setSaving(false)
    }
  }

  async function deleteCookie(c: Cookie) {
    if (!confirm(`¿Eliminar "${c.name}"? Esta acción no se puede deshacer.`)) return
    const res = await fetch(`/api/cookies/${c.id}`, { method: 'DELETE' })
    if (res.ok) await loadCookies()
    else alert('No se pudo eliminar.')
  }

  async function toggleActive(c: Cookie) {
    const res = await fetch(`/api/cookies/${c.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ active: !c.active }),
    })
    if (res.ok) await loadCookies()
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-[#f5ece1]/50 text-sm animate-pulse">Cargando panel…</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-cocoa-900/95 backdrop-blur border-b border-caramel-500/10">
        <div className="max-w-6xl mx-auto px-5 md:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <CookieIcon className="w-7 h-7 text-caramel-400" />
            <div>
              <p className="font-display text-lg font-bold text-[#fdf6ee] leading-none">Cookies NyM</p>
              <p className="text-[#f5ece1]/40 text-[10px] tracking-[0.15em] uppercase">Administración</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a href="/" target="_blank" className="text-[#f5ece1]/60 text-xs hover:text-caramel-300 transition-colors hidden sm:block">
              Ver la web ↗
            </a>
            <button onClick={logout} className="text-[#f5ece1]/60 text-xs border border-caramel-500/20 rounded-full px-4 py-2 hover:bg-cocoa-800 hover:text-[#f5ece1] transition-colors">
              Salir
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="max-w-6xl mx-auto px-5 md:px-8 flex gap-1 overflow-x-auto">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => { setTab(t.id); setEditing(null) }}
              className={`px-4 py-3 text-xs tracking-[0.1em] uppercase whitespace-nowrap border-b-2 transition-colors ${
                tab === t.id
                  ? 'border-caramel-400 text-caramel-300'
                  : 'border-transparent text-[#f5ece1]/45 hover:text-[#f5ece1]/70'
              }`}
            >
              <span className="mr-1.5">{t.icon}</span>{t.label}
            </button>
          ))}
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-5 md:px-8 py-8">
        {/* COOKIES */}
        {tab === 'cookies' && (
          <div>
            {editing ? (
              <div className="bg-cocoa-800 rounded-2xl p-6 md:p-8 border border-caramel-500/10">
                <h2 className="font-display text-2xl font-bold text-[#fdf6ee] mb-6">
                  {editing === 'new' ? 'Nueva cookie' : `Editar: ${(editing as Cookie).name}`}
                </h2>
                <CookieEditor
                  initial={editing === 'new' ? null : (editing as Cookie)}
                  onSubmit={saveCookie}
                  onCancel={() => setEditing(null)}
                  saving={saving}
                />
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="font-display text-2xl font-bold text-[#fdf6ee]">Catálogo de cookies</h2>
                    <p className="text-[#f5ece1]/45 text-sm mt-1">{cookies.length} variedades cargadas</p>
                  </div>
                  <button onClick={() => setEditing('new')} className="bg-caramel-500 text-cocoa-900 text-xs font-semibold tracking-[0.15em] uppercase px-5 py-3 rounded-full hover:bg-caramel-400 transition-colors">
                    + Nueva cookie
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {cookies.map((c) => (
                    <div key={c.id} className="flex items-center gap-4 bg-cocoa-800 rounded-xl p-4 border border-caramel-500/10">
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-cocoa-900 shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={c.image || '/images/cookies-hero.jpg'} alt={c.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-[#fdf6ee] truncate">{c.name}</p>
                        <p className="text-[#f5ece1]/45 text-xs truncate">{c.price || 'Sin precio'}</p>
                        <div className="flex items-center gap-2 mt-1.5">
                          <span className={`text-[10px] px-2 py-0.5 rounded-full ${c.active ? 'bg-green-900/40 text-green-300' : 'bg-cocoa-900 text-[#f5ece1]/40'}`}>
                            {c.active ? 'Visible' : 'Oculta'}
                          </span>
                          {c.featured && <span className="text-[10px] px-2 py-0.5 rounded-full bg-caramel-900/40 text-caramel-300">Destacada</span>}
                        </div>
                      </div>
                      <div className="flex flex-col gap-1.5 shrink-0">
                        <button onClick={() => setEditing(c)} className="text-caramel-300 text-xs hover:text-caramel-200">Editar</button>
                        <button onClick={() => toggleActive(c)} className="text-[#f5ece1]/50 text-xs hover:text-[#f5ece1]">{c.active ? 'Ocultar' : 'Mostrar'}</button>
                        <button onClick={() => deleteCookie(c)} className="text-red-400/70 text-xs hover:text-red-400">Borrar</button>
                      </div>
                    </div>
                  ))}
                </div>
                {cookies.length === 0 && (
                  <div className="text-center py-16 bg-cocoa-800 rounded-xl border border-caramel-500/10">
                    <p className="text-4xl mb-3">🍪</p>
                    <p className="text-[#f5ece1]/50 text-sm">Todavía no hay cookies. Agregá la primera.</p>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* CONTACTO */}
        {tab === 'contacto' && settings && (
          <div>
            <h2 className="font-display text-2xl font-bold text-[#fdf6ee] mb-2">Canales de contacto</h2>
            <p className="text-[#f5ece1]/45 text-sm mb-6">Activá o desactivá cada canal y completá tus datos. Lo apagado no se muestra en la web.</p>
            <SettingsEditor settings={settings} section="contacto" onSaved={setSettings} />
          </div>
        )}

        {/* CONTENIDO */}
        {tab === 'contenido' && settings && (
          <div>
            <h2 className="font-display text-2xl font-bold text-[#fdf6ee] mb-2">Contenido del sitio</h2>
            <p className="text-[#f5ece1]/45 text-sm mb-6">Cambiá los textos e imágenes de la portada y la sección &ldquo;Nosotros&rdquo;.</p>
            <SettingsEditor settings={settings} section="contenido" onSaved={setSettings} />
          </div>
        )}

        {/* PEDIDOS */}
        {tab === 'pedidos' && (
          <div>
            <h2 className="font-display text-2xl font-bold text-[#fdf6ee] mb-2">Pedidos y consultas</h2>
            <p className="text-[#f5ece1]/45 text-sm mb-6">Lo que llega desde el formulario de contacto de la web.</p>
            <OrdersList />
          </div>
        )}
      </main>
    </div>
  )
}
