'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import type { Settings } from '@/data/defaults'
import { waLink, igLink, emailLink, linkedinLink } from '@/lib/links'
import { WhatsAppIcon, InstagramIcon, MailIcon, LinkedInIcon } from './icons'

export default function Contact({ settings }: { settings: Settings }) {
  const [form, setForm] = useState({ name: '', contact: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle')

  const channels = [
    settings.whatsappEnabled && settings.whatsapp && {
      label: 'WhatsApp',
      value: 'Respondemos al toque',
      href: waLink(settings),
      Icon: WhatsAppIcon,
      color: 'bg-green-600',
    },
    settings.instagramEnabled && settings.instagram && {
      label: 'Instagram',
      value: `@${settings.instagram.replace(/^@/, '')}`,
      href: igLink(settings),
      Icon: InstagramIcon,
      color: 'bg-gradient-to-br from-pink-500 to-purple-600',
    },
    settings.emailEnabled && settings.email && {
      label: 'Email',
      value: settings.email,
      href: emailLink(settings),
      Icon: MailIcon,
      color: 'bg-caramel-500',
    },
    settings.linkedinEnabled && settings.linkedin && {
      label: 'LinkedIn',
      value: 'Para empresas',
      href: linkedinLink(settings),
      Icon: LinkedInIcon,
      color: 'bg-[#0a66c2]',
    },
  ].filter(Boolean) as { label: string; value: string; href: string; Icon: typeof WhatsAppIcon; color: string }[]

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.name || !form.contact) return
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error()
      setStatus('ok')
      setForm({ name: '', contact: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contacto" className="relative bg-cocoa-800 py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="text-center mb-14 md:mb-16">
          <p className="text-caramel-400 text-[11px] tracking-[0.35em] uppercase mb-4">Hablemos</p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#fdf6ee]">
            Hacé tu pedido
          </h2>
          <p className="text-[#f5ece1]/55 text-base md:text-lg font-light max-w-2xl mx-auto mt-5">
            Escribinos por el canal que prefieras o dejanos tus datos y te contactamos.
            Envíos en <span className="text-caramel-300">{settings.zone}</span>.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Canales */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {channels.map(({ label, value, href, Icon, color }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 bg-cocoa-900 rounded-xl p-5 border border-caramel-500/10 hover:border-caramel-500/40 transition-all duration-300 group"
              >
                <div className={`w-12 h-12 rounded-full ${color} flex items-center justify-center shrink-0`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="min-w-0">
                  <p className="text-[#fdf6ee] font-semibold text-sm group-hover:text-caramel-300 transition-colors">{label}</p>
                  <p className="text-[#f5ece1]/50 text-xs truncate">{value}</p>
                </div>
              </a>
            ))}
            <div className="sm:col-span-2 bg-cocoa-900 rounded-xl p-5 border border-caramel-500/10">
              <p className="text-[#f5ece1]/50 text-xs">
                Atiende <span className="text-[#fdf6ee] font-medium">{settings.contactName}</span> · Zona de envíos: {settings.zone}
              </p>
            </div>
          </div>

          {/* Formulario */}
          <div className="bg-cocoa-900 rounded-2xl p-7 md:p-8 border border-caramel-500/10">
            {status === 'ok' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10"
              >
                <div className="w-16 h-16 mx-auto rounded-full bg-caramel-500 flex items-center justify-center mb-5">
                  <span className="text-cocoa-900 text-2xl">✓</span>
                </div>
                <h3 className="font-display text-2xl font-bold text-[#fdf6ee]">¡Mensaje enviado!</h3>
                <p className="text-[#f5ece1]/55 text-sm mt-2">Te vamos a estar contactando muy pronto. ¡Gracias!</p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-6 text-caramel-300 text-xs tracking-[0.15em] uppercase hover:text-caramel-200"
                >
                  Enviar otro
                </button>
              </motion.div>
            ) : (
              <form onSubmit={submit} className="space-y-4">
                <div>
                  <label className="block text-[#f5ece1]/60 text-xs tracking-[0.1em] uppercase mb-2">Nombre</label>
                  <input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                    placeholder="Tu nombre"
                    className="w-full bg-cocoa-800 border border-caramel-500/15 rounded-lg px-4 py-3 text-[#f5ece1] text-sm placeholder:text-[#f5ece1]/30 focus:border-caramel-400 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[#f5ece1]/60 text-xs tracking-[0.1em] uppercase mb-2">WhatsApp o email</label>
                  <input
                    value={form.contact}
                    onChange={(e) => setForm({ ...form, contact: e.target.value })}
                    required
                    placeholder="¿Cómo te contactamos?"
                    className="w-full bg-cocoa-800 border border-caramel-500/15 rounded-lg px-4 py-3 text-[#f5ece1] text-sm placeholder:text-[#f5ece1]/30 focus:border-caramel-400 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[#f5ece1]/60 text-xs tracking-[0.1em] uppercase mb-2">Tu pedido o consulta</label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    rows={4}
                    placeholder="Ej: Una caja x12 surtida para el sábado…"
                    className="w-full bg-cocoa-800 border border-caramel-500/15 rounded-lg px-4 py-3 text-[#f5ece1] text-sm placeholder:text-[#f5ece1]/30 focus:border-caramel-400 focus:outline-none transition-colors resize-none"
                  />
                </div>
                {status === 'error' && (
                  <p className="text-red-400 text-xs">Hubo un error. Probá de nuevo o escribinos por WhatsApp.</p>
                )}
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full bg-caramel-500 text-cocoa-900 text-xs font-semibold tracking-[0.2em] uppercase py-4 rounded-full hover:bg-caramel-400 transition-colors disabled:opacity-60"
                >
                  {status === 'sending' ? 'Enviando…' : 'Enviar pedido'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
