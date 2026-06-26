'use client'

import { useState } from 'react'
import type { Box } from '@/data/defaults'

export default function BoxEditor({
  initial,
  onSubmit,
  onCancel,
  saving,
}: {
  initial: Box | null
  onSubmit: (data: Record<string, unknown>) => void
  onCancel: () => void
  saving: boolean
}) {
  const [d, setD] = useState<Partial<Box>>(() => ({
    name: initial?.name || '',
    qty: initial?.qty || '',
    description: initial?.description || '',
    price: initial?.price || '',
    highlight: initial?.highlight ?? false,
    active: initial?.active ?? true,
    order: initial?.order ?? 0,
  }))

  function set<K extends keyof Box>(k: K, v: Box[K]) {
    setD((prev) => ({ ...prev, [k]: v }))
  }

  function submit(e: React.FormEvent) {
    e.preventDefault()
    onSubmit({
      name: d.name,
      qty: d.qty,
      description: d.description,
      price: d.price,
      highlight: d.highlight,
      active: d.active,
      order: d.order,
    })
  }

  const inputCls =
    'w-full bg-cocoa-900 border border-caramel-500/15 rounded-lg px-3 py-2.5 text-[#f5ece1] text-sm placeholder:text-[#f5ece1]/30 focus:border-caramel-400 focus:outline-none'

  return (
    <form onSubmit={submit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-[#f5ece1]/60 text-xs tracking-[0.1em] uppercase mb-2">Nombre *</label>
          <input value={d.name} onChange={(e) => set('name', e.target.value)} required placeholder="Ej: Caja Clásica" className={inputCls} />
        </div>
        <div>
          <label className="block text-[#f5ece1]/60 text-xs tracking-[0.1em] uppercase mb-2">Cantidad</label>
          <input value={d.qty} onChange={(e) => set('qty', e.target.value)} placeholder="Ej: 6 cookies" className={inputCls} />
        </div>
      </div>

      <div>
        <label className="block text-[#f5ece1]/60 text-xs tracking-[0.1em] uppercase mb-2">Precio</label>
        <input value={d.price} onChange={(e) => set('price', e.target.value)} placeholder="Ej: $9.900" className={inputCls} />
      </div>

      <div>
        <label className="block text-[#f5ece1]/60 text-xs tracking-[0.1em] uppercase mb-2">Descripción</label>
        <textarea value={d.description} onChange={(e) => set('description', e.target.value)} rows={3} placeholder="Contá para quién es ideal…" className={`${inputCls} resize-none`} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
        <div>
          <label className="block text-[#f5ece1]/60 text-xs tracking-[0.1em] uppercase mb-2">Orden</label>
          <input type="number" value={d.order} onChange={(e) => set('order', Number(e.target.value))} className={inputCls} />
        </div>
        <label className="flex items-center gap-2 text-[#f5ece1]/80 text-sm cursor-pointer py-2.5">
          <input type="checkbox" checked={!!d.highlight} onChange={(e) => set('highlight', e.target.checked)} className="w-4 h-4 accent-caramel-500" />
          Destacada (“Más elegida”)
        </label>
        <label className="flex items-center gap-2 text-[#f5ece1]/80 text-sm cursor-pointer py-2.5">
          <input type="checkbox" checked={!!d.active} onChange={(e) => set('active', e.target.checked)} className="w-4 h-4 accent-caramel-500" />
          Visible en la web
        </label>
      </div>

      <div className="flex items-center gap-3 pt-2">
        <button type="submit" disabled={saving} className="bg-caramel-500 text-cocoa-900 text-xs font-semibold tracking-[0.15em] uppercase px-6 py-3 rounded-full hover:bg-caramel-400 transition-colors disabled:opacity-60">
          {saving ? 'Guardando…' : 'Guardar caja'}
        </button>
        <button type="button" onClick={onCancel} className="text-[#f5ece1]/60 text-xs tracking-[0.15em] uppercase px-4 py-3 hover:text-[#f5ece1]">
          Cancelar
        </button>
      </div>
    </form>
  )
}
