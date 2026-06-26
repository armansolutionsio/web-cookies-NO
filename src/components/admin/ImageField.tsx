'use client'

import { useState } from 'react'

export default function ImageField({
  value,
  onChange,
  label = 'Imagen',
}: {
  value: string
  onChange: (url: string) => void
  label?: string
}) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setError('')
    setUploading(true)
    try {
      const fd = new FormData()
      fd.append('file', file)
      const res = await fetch('/api/upload', { method: 'POST', body: fd })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Error')
      onChange(data.url)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo subir')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div>
      <label className="block text-[#f5ece1]/60 text-xs tracking-[0.1em] uppercase mb-2">{label}</label>
      <div className="flex items-start gap-4">
        <div className="w-24 h-24 rounded-lg overflow-hidden bg-cocoa-900 border border-caramel-500/15 shrink-0 flex items-center justify-center">
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt="preview" className="w-full h-full object-cover" />
          ) : (
            <span className="text-[#f5ece1]/25 text-[10px] tracking-wide uppercase text-center px-1">Sin imagen</span>
          )}
        </div>
        <div className="flex-1 space-y-2">
          <label className="inline-block cursor-pointer bg-cocoa-700 hover:bg-cocoa-600 text-[#f5ece1] text-xs px-4 py-2.5 rounded-lg transition-colors border border-caramel-500/15">
            {uploading ? 'Subiendo…' : 'Subir imagen'}
            <input type="file" accept="image/*" onChange={handleFile} disabled={uploading} className="hidden" />
          </label>
          <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="o pegá una URL / ruta (/images/...)"
            className="w-full bg-cocoa-900 border border-caramel-500/15 rounded-lg px-3 py-2 text-[#f5ece1] text-xs placeholder:text-[#f5ece1]/30 focus:border-caramel-400 focus:outline-none"
          />
          {error && <p className="text-red-400 text-xs">{error}</p>}
        </div>
      </div>
    </div>
  )
}
