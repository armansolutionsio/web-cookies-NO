'use client'

import { motion } from 'framer-motion'
import type { Settings, Box } from '@/data/defaults'
import { defaultBoxes } from '@/data/defaults'
import { waLink } from '@/lib/links'

export default function Boxes({ settings, boxes }: { settings: Settings; boxes?: Box[] }) {
  const items = boxes && boxes.length ? boxes : defaultBoxes
  return (
    <section id="cajas" className="relative bg-cocoa-800 py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="text-center mb-14 md:mb-16">
          <p className="text-caramel-400 text-[11px] tracking-[0.35em] uppercase mb-4">Cantidades</p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#fdf6ee]">
            Armá tu caja
          </h2>
          <p className="text-[#f5ece1]/55 text-base md:text-lg font-light max-w-2xl mx-auto mt-5">
            Elegí el tamaño y combiná los sabores que quieras. Vos elegís, nosotros horneamos.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((box, i) => (
            <motion.div
              key={box.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`relative flex flex-col rounded-xl p-7 transition-all duration-500 ${
                box.highlight
                  ? 'bg-caramel-500 text-cocoa-900 shadow-2xl shadow-caramel-900/30 lg:scale-105'
                  : 'bg-cocoa-900 border border-caramel-500/15 hover:border-caramel-500/40'
              }`}
            >
              {box.highlight && (
                <span className="absolute top-4 right-4 bg-cocoa-900 text-caramel-300 text-[9px] font-semibold tracking-[0.15em] uppercase px-3 py-1 rounded-full">
                  Más elegida
                </span>
              )}
              <p className={`text-[11px] tracking-[0.2em] uppercase font-semibold ${box.highlight ? 'text-cocoa-900/70' : 'text-caramel-400'}`}>
                {box.qty}
              </p>
              <h3 className={`font-display text-2xl font-bold mt-2 ${box.highlight ? 'text-cocoa-900' : 'text-[#fdf6ee]'}`}>
                {box.name}
              </h3>
              <p className={`text-sm font-light leading-relaxed mt-3 flex-1 ${box.highlight ? 'text-cocoa-900/80' : 'text-[#f5ece1]/55'}`}>
                {box.description}
              </p>
              <p className={`font-display text-3xl font-bold mt-5 ${box.highlight ? 'text-cocoa-900' : 'text-caramel-300'}`}>
                {box.price}
              </p>
              <a
                href={waLink(settings, `Hola! Quiero pedir la ${box.name} (${box.qty})`)}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-6 text-center text-[11px] font-semibold tracking-[0.15em] uppercase px-5 py-3 rounded-full transition-colors ${
                  box.highlight
                    ? 'bg-cocoa-900 text-caramel-300 hover:bg-cocoa-800'
                    : 'bg-caramel-500 text-cocoa-900 hover:bg-caramel-400'
                }`}
              >
                Pedir esta caja
              </a>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-[#f5ece1]/40 text-xs font-light mt-10">
          * Precios de referencia. Consultá combos y promos vigentes por WhatsApp.
        </p>
      </div>
    </section>
  )
}
