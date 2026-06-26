'use client'

import { useState } from 'react'
import type { Settings } from '@/data/defaults'
import ImageField from './ImageField'

const inputCls =
  'w-full bg-cocoa-900 border border-caramel-500/15 rounded-lg px-3 py-2.5 text-[#f5ece1] text-sm placeholder:text-[#f5ece1]/30 focus:border-caramel-400 focus:outline-none'

// Definidos a nivel de módulo para no remontarse en cada render (evita perder el foco)
function TextField({
  label, value, onChange, placeholder,
}: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div>
      <label className="block text-[#f5ece1]/60 text-xs tracking-[0.1em] uppercase mb-2">{label}</label>
      <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className={inputCls} />
    </div>
  )
}

function Toggle({ on, onChange, label }: { on: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <div className="flex items-center gap-2.5 select-none">
      <button
        type="button"
        onClick={() => onChange(!on)}
        className={`relative w-10 h-6 rounded-full transition-colors ${on ? 'bg-caramel-500' : 'bg-cocoa-600'}`}
        aria-pressed={on}
      >
        <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${on ? 'translate-x-4' : ''}`} />
      </button>
      <span className="text-[#f5ece1]/70 text-xs">{label}</span>
    </div>
  )
}

export default function SettingsEditor({
  settings,
  section,
  onSaved,
}: {
  settings: Settings
  section: 'contacto' | 'contenido'
  onSaved: (s: Settings) => void
}) {
  const [s, setS] = useState<Settings>(settings)
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')

  function set<K extends keyof Settings>(k: K, v: Settings[K]) {
    setS((prev) => ({ ...prev, [k]: v }))
  }

  async function save() {
    setSaving(true)
    setMsg('')
    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(s),
      })
      if (!res.ok) throw new Error()
      onSaved(s)
      setMsg('✓ Guardado')
      setTimeout(() => setMsg(''), 2500)
    } catch {
      setMsg('Error al guardar')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6 max-w-3xl">
      {section === 'contacto' && (
        <>
          <TextField label="Nombre de contacto" value={s.contactName} onChange={(v) => set('contactName', v)} placeholder="Nahir Orrego" />
          <TextField label="Zona de envíos" value={s.zone} onChange={(v) => set('zone', v)} placeholder="CABA y GBA" />

          <div className="bg-cocoa-900 rounded-xl p-5 border border-caramel-500/10 space-y-3">
            <TextField label="WhatsApp (solo números, con código país)" value={s.whatsapp} onChange={(v) => set('whatsapp', v)} placeholder="5491153347746" />
            <Toggle on={s.whatsappEnabled} onChange={(v) => set('whatsappEnabled', v)} label="Mostrar WhatsApp en la web" />
          </div>

          <div className="bg-cocoa-900 rounded-xl p-5 border border-caramel-500/10 space-y-3">
            <TextField label="Instagram (usuario, sin @)" value={s.instagram} onChange={(v) => set('instagram', v)} placeholder="nahirorrego" />
            <Toggle on={s.instagramEnabled} onChange={(v) => set('instagramEnabled', v)} label="Mostrar Instagram en la web" />
          </div>

          <div className="bg-cocoa-900 rounded-xl p-5 border border-caramel-500/10 space-y-3">
            <TextField label="Email" value={s.email} onChange={(v) => set('email', v)} placeholder="hola@cookiesnym.com" />
            <Toggle on={s.emailEnabled} onChange={(v) => set('emailEnabled', v)} label="Mostrar Email en la web" />
          </div>

          <div className="bg-cocoa-900 rounded-xl p-5 border border-caramel-500/10 space-y-3">
            <TextField label="LinkedIn (usuario o URL completa)" value={s.linkedin} onChange={(v) => set('linkedin', v)} placeholder="cookies-nym o https://linkedin.com/company/..." />
            <Toggle on={s.linkedinEnabled} onChange={(v) => set('linkedinEnabled', v)} label="Mostrar LinkedIn en la web" />
          </div>
        </>
      )}

      {section === 'contenido' && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <TextField label="Nombre de la marca" value={s.brandName} onChange={(v) => set('brandName', v)} />
            <TextField label="Tagline / eslogan" value={s.tagline} onChange={(v) => set('tagline', v)} />
          </div>

          <div className="border-t border-caramel-500/10 pt-5">
            <p className="text-caramel-400 text-[11px] tracking-[0.2em] uppercase mb-4">Portada (Hero)</p>
            <div className="space-y-4">
              <TextField label="Título principal" value={s.heroTitle} onChange={(v) => set('heroTitle', v)} />
              <div>
                <label className="block text-[#f5ece1]/60 text-xs tracking-[0.1em] uppercase mb-2">Subtítulo</label>
                <textarea value={s.heroSubtitle} onChange={(e) => set('heroSubtitle', e.target.value)} rows={2} className={`${inputCls} resize-none`} />
              </div>
              <ImageField label="Imagen de portada" value={s.heroImage} onChange={(url) => set('heroImage', url)} />
              <TextField label="Video de portada (URL .mp4, opcional)" value={s.heroVideo} onChange={(v) => set('heroVideo', v)} placeholder="https://…/video.mp4" />
            </div>
          </div>

          <div className="border-t border-caramel-500/10 pt-5">
            <p className="text-caramel-400 text-[11px] tracking-[0.2em] uppercase mb-4">Sección &ldquo;Nosotros&rdquo;</p>
            <div className="space-y-4">
              <TextField label="Título" value={s.aboutTitle} onChange={(v) => set('aboutTitle', v)} />
              <div>
                <label className="block text-[#f5ece1]/60 text-xs tracking-[0.1em] uppercase mb-2">Texto</label>
                <textarea value={s.aboutText} onChange={(e) => set('aboutText', e.target.value)} rows={4} className={`${inputCls} resize-none`} />
              </div>
              <ImageField label="Imagen de la sección" value={s.aboutImage} onChange={(url) => set('aboutImage', url)} />
            </div>
          </div>
        </>
      )}

      <div className="flex items-center gap-4 pt-2">
        <button onClick={save} disabled={saving} className="bg-caramel-500 text-cocoa-900 text-xs font-semibold tracking-[0.15em] uppercase px-7 py-3 rounded-full hover:bg-caramel-400 transition-colors disabled:opacity-60">
          {saving ? 'Guardando…' : 'Guardar cambios'}
        </button>
        {msg && <span className={`text-sm ${msg.startsWith('✓') ? 'text-green-400' : 'text-red-400'}`}>{msg}</span>}
      </div>
    </div>
  )
}
