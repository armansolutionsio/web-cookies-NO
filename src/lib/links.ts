// Construye los links de contacto a partir de la configuración del sitio.
// Funciones puras: se pueden usar tanto en server como en client components.
import type { Settings } from '@/data/defaults'

export function waLink(settings: Pick<Settings, 'whatsapp'>, text?: string) {
  const num = (settings.whatsapp || '').replace(/[^0-9]/g, '')
  const msg = text || 'Hola Cookies NyM! Quiero hacer un pedido'
  return `https://wa.me/${num}?text=${encodeURIComponent(msg)}`
}

export function igLink(settings: Pick<Settings, 'instagram'>) {
  const handle = (settings.instagram || '').replace(/^@/, '').trim()
  if (!handle) return '#'
  if (handle.startsWith('http')) return handle
  return `https://instagram.com/${handle}`
}

export function emailLink(settings: Pick<Settings, 'email'>, subject?: string) {
  const mail = (settings.email || '').trim()
  if (!mail) return '#'
  const s = subject || 'Consulta - Cookies NyM'
  return `mailto:${mail}?subject=${encodeURIComponent(s)}`
}

export function linkedinLink(settings: Pick<Settings, 'linkedin'>) {
  const v = (settings.linkedin || '').trim()
  if (!v) return '#'
  if (v.startsWith('http')) return v
  return `https://linkedin.com/in/${v.replace(/^@/, '')}`
}
