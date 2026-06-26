'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { faqs } from '@/data/defaults'

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className="relative bg-cocoa-900 py-24 md:py-32">
      <div className="max-w-3xl mx-auto px-6 md:px-8">
        <div className="text-center mb-14">
          <p className="text-caramel-400 text-[11px] tracking-[0.35em] uppercase mb-4">Dudas frecuentes</p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#fdf6ee]">
            Preguntas frecuentes
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i
            return (
              <div
                key={f.q}
                className="bg-cocoa-800 rounded-xl border border-caramel-500/10 overflow-hidden"
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="font-display text-lg font-semibold text-[#fdf6ee]">{f.q}</span>
                  <span className={`text-caramel-400 text-2xl leading-none transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}>
                    +
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 text-[#f5ece1]/60 text-sm md:text-base font-light leading-relaxed">
                        {f.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
