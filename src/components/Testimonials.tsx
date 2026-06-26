'use client'

import { motion } from 'framer-motion'
import { testimonials } from '@/data/defaults'

export default function Testimonials() {
  return (
    <section className="relative bg-cocoa-800 py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="text-center mb-14 md:mb-16">
          <p className="text-caramel-400 text-[11px] tracking-[0.35em] uppercase mb-4">Lo que dicen</p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#fdf6ee]">
            Clientes felices (y llenos)
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-cocoa-900 rounded-xl p-7 border border-caramel-500/10"
            >
              <div className="flex gap-1 text-caramel-400 mb-4">
                {'★★★★★'.split('').map((s, k) => (
                  <span key={k} className="text-sm">{s}</span>
                ))}
              </div>
              <blockquote className="text-[#f5ece1]/75 text-base font-light leading-relaxed italic">
                &ldquo;{t.text}&rdquo;
              </blockquote>
              <figcaption className="mt-5 pt-4 border-t border-caramel-500/10">
                <p className="text-[#fdf6ee] font-semibold text-sm">{t.name}</p>
                <p className="text-[#f5ece1]/45 text-xs mt-0.5">{t.role}</p>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  )
}
