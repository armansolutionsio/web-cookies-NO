'use client'

import { motion } from 'framer-motion'
import type { Settings } from '@/data/defaults'

export default function About({ settings }: { settings: Settings }) {
  return (
    <section id="nosotros" className="relative bg-cocoa-900 py-24 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Imagen */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative group/img order-2 lg:order-1"
        >
          <div className="absolute -inset-[1px] rounded-sm border border-caramel-500/25 group-hover/img:-inset-3 transition-all duration-700" />
          <img
            src={settings.aboutImage}
            alt="Proceso artesanal de Cookies NyM"
            className="w-full h-[360px] md:h-[520px] object-cover rounded-sm"
          />
          <div className="absolute -bottom-5 -right-3 sm:right-6 bg-caramel-500 text-cocoa-900 px-6 py-4 rounded-sm shadow-xl shadow-black/40">
            <p className="font-display text-3xl font-bold leading-none">100%</p>
            <p className="text-[10px] tracking-[0.2em] uppercase font-semibold mt-1">Artesanal</p>
          </div>
        </motion.div>

        {/* Texto */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
          className="order-1 lg:order-2"
        >
          <p className="text-caramel-400 text-[11px] tracking-[0.35em] uppercase mb-4">Nuestra esencia</p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#fdf6ee] leading-tight">
            {settings.aboutTitle}
          </h2>
          <div className="w-14 h-px bg-caramel-500/60 my-7" />
          <p className="text-[#f5ece1]/65 text-base md:text-lg font-light leading-relaxed">
            {settings.aboutText}
          </p>

          <div className="grid grid-cols-3 gap-4 mt-10">
            {[
              { n: '+8', l: 'Sabores' },
              { n: '48h', l: 'Frescura' },
              { n: '★ 5.0', l: 'Reseñas' },
            ].map((s) => (
              <div key={s.l} className="text-center sm:text-left">
                <p className="font-display text-2xl md:text-3xl font-bold text-caramel-400">{s.n}</p>
                <p className="text-[#f5ece1]/45 text-[10px] tracking-[0.15em] uppercase mt-1">{s.l}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
