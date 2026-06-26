'use client'

import { motion } from 'framer-motion'
import type { Cookie, Settings } from '@/data/defaults'
import CookieCard from './CookieCard'

export default function Flavors({
  cookies,
  settings,
}: {
  cookies: Cookie[]
  settings: Settings
}) {
  return (
    <section id="sabores" className="relative bg-cocoa-900 py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="text-center mb-14 md:mb-16">
          <p className="text-caramel-400 text-[11px] tracking-[0.35em] uppercase mb-4">Nuestro menú</p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#fdf6ee]">
            Elegí tu cookie favorita
          </h2>
          <p className="text-[#f5ece1]/55 text-base md:text-lg font-light max-w-2xl mx-auto mt-5">
            Todas se hornean por encargo. Tocá <span className="text-caramel-300">&ldquo;Ver ingredientes&rdquo;</span> en cada una para conocer su receta.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cookies.map((c, i) => (
            <CookieCard key={c.id} cookie={c} settings={settings} index={i} />
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center text-[#f5ece1]/45 text-sm font-light mt-12"
        >
          ¿Querés un sabor que no está? <span className="text-caramel-300">Escribinos</span> y lo armamos para vos.
        </motion.p>
      </div>
    </section>
  )
}
