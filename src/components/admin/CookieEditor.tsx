'use client'

import { useState } from 'react'
import type { Cookie } from '@/data/defaults'
import ImageField from './ImageField'

type Draft = Partial<Cookie> & { ingredientsText?: string; tagsText?: string }

const PRESET_COLORS = ['#d17e36', '#bd672b', '#9c5026', '#a11d2e', '#5c4130', '#43302d', '#c2557a', '#dd9450']

export default function CookieEditor({
  initial,
  onSubmit,
  onCancel,
  saving,
}: {
  initial: Cookie | null
  onSubmit: (data: Record<string, unknown>) => void
  onCancel: () => void
  saving: boolean
}) {
  const [d, setD] = useState<Draft>(() => ({
    name: initial?.name || '',
    price: initial?.price || '',
    description: initial?.description || '',
    image: initial?.image || '',
    accent: initial?.accent || '#d17e36',
    featured: initial?.featured ?? false,
    active: initial?.active ?? true,
    order: initial?.order ?? 0,
    ingredientsText: (initial?.ingredients || []).join('\n'),
    tagsText: (initial?.tags || []).join(', '),
  }))

  function set<K extends keyof Draft>(k: K, v: Draft[K]) {
    setD((prev) => ({ ...prev, [k]: v }))
  }

  function submit(e: React.FormEvent) {
    e.preventDefault()
    onSubmit({
      name: d.name,
      price: d.price,
      description: d.description,
      image: d.image,
      accent: d.accent,
      featured: d.featured,
      active: d.active,
      order: d.order,
      ingredients: (d.ingredientsText || '').split('\n').map((x) => x.trim()).filter(Boolean),
      tags: (d.tagsText || '').split(/[,\n]/).map((x) => x.trim()).filter(Boolean),
    })
  }

  const inputCls =
    'w-full bg-cocoa-900 border border-caramel-500/15 rounded-lg px-3 py-2.5 text-[#f5ece1] text-sm placeholder:text-[#f5ece1]/30 focus:border-caramel-400 focus:outline-none'

  return (
    <form onSubmit={submit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-[#f5ece1]/60 text-xs tracking-[0.1em] uppercase mb-2">Nombre *</label>
          <input value={d.name} onChange={(e) => set('name', e.target.value)} required placeholder="Ej: Red Velvet" className={inputCls} />
        </div>
        <div>
          <label className="block text-[#f5ece1]/60 text-xs tracking-[0.1em] uppercase mb-2">Precio</label>
          <input value={d.price} onChange={(e) => set('price', e.target.value)} placeholder="Ej: desde $2.300 c/u" className={inputCls} />
        </div>
      </div>

      <div>
        <label className="block text-[#f5ece1]/60 text-xs tracking-[0.1em] uppercase mb-2">Descripción</label>
        <textarea value={d.description} onChange={(e) => set('description', e.target.value)} rows={3} placeholder="Contá qué tiene de especial…" className={`${inputCls} resize-none`} />
      </div>

      <div>
        <label className="block text-[#f5ece1]/60 text-xs tracking-[0.1em] uppercase mb-2">Ingredientes (uno por línea)</label>
        <textarea value={d.ingredientsText} onChange={(e) => set('ingredientsText', e.target.value)} rows={5} placeholder={'Harina\nManteca\nChips de chocolate'} className={`${inputCls} resize-none font-mono`} />
      </div>

      <div>
        <label className="block text-[#f5ece1]/60 text-xs tracking-[0.1em] uppercase mb-2">Etiquetas (separadas por coma)</label>
        <input value={d.tagsText} onChange={(e) => set('tagsText', e.target.value)} placeholder="Ej: Más vendida, Nueva" className={inputCls} />
      </div>

      <ImageField label="Imagen de la cookie" value={d.image || ''} onChange={(url) => set('image', url)} />

      <div>
        <label className="block text-[#f5ece1]/60 text-xs tracking-[0.1em] uppercase mb-2">Color de acento</label>
        <div className="flex items-center gap-2 flex-wrap">
          {PRESET_COLORS.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => set('accent', c)}
              className={`w-8 h-8 rounded-full border-2 ${d.accent === c ? 'border-[#f5ece1]' : 'border-transparent'}`}
              style={{ backgroundColor: c }}
              aria-label={c}
            />
          ))}
          <input type="color" value={d.accent} onChange={(e) => set('accent', e.target.value)} className="w-8 h-8 rounded bg-transparent cursor-pointer" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
        <div>
          <label className="block text-[#f5ece1]/60 text-xs tracking-[0.1em] uppercase mb-2">Orden</label>
          <input type="number" value={d.order} onChange={(e) => set('order', Number(e.target.value))} className={inputCls} />
        </div>
        <label className="flex items-center gap-2 text-[#f5ece1]/80 text-sm cursor-pointer py-2.5">
          <input type="checkbox" checked={!!d.featured} onChange={(e) => set('featured', e.target.checked)} className="w-4 h-4 accent-caramel-500" />
          Destacada
        </label>
        <label className="flex items-center gap-2 text-[#f5ece1]/80 text-sm cursor-pointer py-2.5">
          <input type="checkbox" checked={!!d.active} onChange={(e) => set('active', e.target.checked)} className="w-4 h-4 accent-caramel-500" />
          Visible en la web
        </label>
      </div>

      <div className="flex items-center gap-3 pt-2">
        <button type="submit" disabled={saving} className="bg-caramel-500 text-cocoa-900 text-xs font-semibold tracking-[0.15em] uppercase px-6 py-3 rounded-full hover:bg-caramel-400 transition-colors disabled:opacity-60">
          {saving ? 'Guardando…' : 'Guardar cookie'}
        </button>
        <button type="button" onClick={onCancel} className="text-[#f5ece1]/60 text-xs tracking-[0.15em] uppercase px-4 py-3 hover:text-[#f5ece1]">
          Cancelar
        </button>
      </div>
    </form>
  )
}
