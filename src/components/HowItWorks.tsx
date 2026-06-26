'use client'

import { motion } from 'framer-motion'
import { steps } from '@/data/defaults'

export default function HowItWorks() {
  return (
    <section className="relative bg-cocoa-800 py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="text-center mb-16">
          <p className="text-caramel-400 text-[11px] tracking-[0.35em] uppercase mb-4">Simple y rico</p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#fdf6ee]">
            ¿Cómo funciona?
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="relative text-center group"
            >
              <div className="mx-auto w-16 h-16 rounded-full bg-cocoa-900 border border-caramel-500/30 flex items-center justify-center mb-6 group-hover:border-caramel-400 group-hover:scale-110 transition-all duration-300">
                <span className="font-display text-xl font-bold text-caramel-400">{s.n}</span>
              </div>
              <h3 className="font-display text-xl font-semibold text-[#fdf6ee] mb-2">{s.title}</h3>
              <p className="text-[#f5ece1]/55 text-sm font-light leading-relaxed max-w-[220px] mx-auto">{s.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
