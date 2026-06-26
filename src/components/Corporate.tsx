'use client'

import { motion } from 'framer-motion'
import type { Settings } from '@/data/defaults'
import { waLink, linkedinLink } from '@/lib/links'
import { LinkedInIcon } from './icons'

const perks = [
  'Cajas personalizadas con tu logo',
  'Mesas dulces para eventos y casamientos',
  'Regalos corporativos para clientes y equipos',
  'Facturación y comprobantes para empresas',
]

export default function Corporate({ settings }: { settings: Settings }) {
  return (
    <section id="empresas" className="relative bg-cocoa-900 py-24 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Texto */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-caramel-400 text-[11px] tracking-[0.35em] uppercase mb-4">Empresas & eventos</p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#fdf6ee] leading-tight">
            Endulzá tu próxima celebración
          </h2>
          <div className="w-14 h-px bg-caramel-500/60 my-7" />
          <p className="text-[#f5ece1]/65 text-base md:text-lg font-light leading-relaxed">
            ¿Cumpleaños, casamiento, evento de oficina o regalo para clientes? Preparamos
            cajas y mesas dulces a medida, con la posibilidad de personalizar el packaging
            con tu marca. Pedidos por volumen con precios especiales.
          </p>

          <ul className="mt-8 space-y-3">
            {perks.map((p) => (
              <li key={p} className="flex items-start gap-3 text-[#f5ece1]/75 text-sm md:text-base font-light">
                <span className="mt-1 w-1.5 h-1.5 rounded-full bg-caramel-400 shrink-0" />
                {p}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap items-center gap-4 mt-9">
            <a
              href={waLink(settings, 'Hola! Quiero una cotización para empresas/eventos')}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-caramel-500 text-cocoa-900 text-xs font-semibold tracking-[0.2em] uppercase px-8 py-4 rounded-full hover:bg-caramel-400 transition-colors"
            >
              Pedir cotización
            </a>
            {settings.linkedinEnabled && settings.linkedin && (
              <a
                href={linkedinLink(settings)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 border border-[#f5ece1]/30 text-[#f5ece1] text-xs font-medium tracking-[0.15em] uppercase px-6 py-4 rounded-full hover:bg-[#f5ece1] hover:text-cocoa-900 transition-colors"
              >
                <LinkedInIcon className="w-4 h-4" />
                LinkedIn
              </a>
            )}
          </div>
        </motion.div>

        {/* Imagen */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="relative group/img"
        >
          <div className="absolute -inset-[1px] rounded-sm border border-caramel-500/25 group-hover/img:-inset-3 transition-all duration-700" />
          <img
            src="/images/torta-eventos.jpg"
            alt="Mesa dulce para eventos de Cookies NyM"
            className="w-full h-[360px] md:h-[520px] object-cover rounded-sm"
          />
        </motion.div>
      </div>
    </section>
  )
}
