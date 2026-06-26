'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import type { Cookie, Settings } from '@/data/defaults'
import { waLink } from '@/lib/links'
import { ArrowIcon } from './icons'

export default function CookieCard({
  cookie,
  settings,
  index = 0,
}: {
  cookie: Cookie
  settings: Settings
  index?: number
}) {
  const [open, setOpen] = useState(false)
  const wa = waLink(settings, `Hola! Quiero pedir la cookie "${cookie.name}" 🍪`)

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.08 }}
      className="group relative flex flex-col bg-cocoa-800 rounded-xl overflow-hidden border border-caramel-500/10 hover:border-caramel-500/40 transition-all duration-500"
    >
      {/* Imagen */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={cookie.image || '/images/cookies-hero.jpg'}
          alt={cookie.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-cocoa-800 via-transparent to-transparent" />
        {/* Tags */}
        {cookie.tags?.length > 0 && (
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            {cookie.tags.map((t) => (
              <span
                key={t}
                className="text-[9px] font-semibold tracking-[0.12em] uppercase px-2.5 py-1 rounded-full text-cocoa-900"
                style={{ backgroundColor: cookie.accent || '#d17e36' }}
              >
                {t}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Cuerpo */}
      <div className="flex flex-col flex-1 p-5">
        <h3 className="font-display text-xl font-bold text-[#fdf6ee]">{cookie.name}</h3>
        <p className="text-[#f5ece1]/55 text-sm font-light leading-relaxed mt-2 flex-1">
          {cookie.description}
        </p>

        {/* Ingredientes desplegables */}
        <button
          onClick={() => setOpen((o) => !o)}
          className="mt-4 flex items-center gap-1.5 text-caramel-300 text-[11px] tracking-[0.12em] uppercase font-medium hover:text-caramel-200 transition-colors w-fit"
        >
          {open ? 'Ocultar ingredientes' : 'Ver ingredientes'}
          <ArrowIcon className={`w-3.5 h-3.5 transition-transform duration-300 ${open ? 'rotate-90' : ''}`} />
        </button>
        <motion.div
          initial={false}
          animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="flex flex-wrap gap-1.5 pt-3">
            {cookie.ingredients?.map((ing) => (
              <span
                key={ing}
                className="text-[11px] text-[#f5ece1]/70 bg-cocoa-900 border border-caramel-500/15 rounded-full px-2.5 py-1"
              >
                {ing}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Precio + CTA */}
        <div className="flex items-center justify-between mt-5 pt-4 border-t border-caramel-500/10">
          <span className="text-caramel-300 text-sm font-medium">{cookie.price}</span>
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-caramel-500 text-cocoa-900 text-[10px] font-semibold tracking-[0.15em] uppercase px-4 py-2.5 rounded-full hover:bg-caramel-400 transition-colors"
          >
            Pedir
          </a>
        </div>
      </div>
    </motion.article>
  )
}
