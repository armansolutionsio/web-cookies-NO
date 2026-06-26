'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import type { Settings } from '@/data/defaults'
import { waLink } from '@/lib/links'

export default function Hero({
  settings,
  images,
}: {
  settings: Settings
  images: string[]
}) {
  const slides = images.length ? images : [settings.heroImage]
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (slides.length < 2) return
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length)
    }, 5000)
    return () => clearInterval(id)
  }, [slides.length])

  const hasVideo = !!settings.heroVideo

  return (
    <section id="inicio" className="relative h-[100dvh] w-full overflow-hidden">
      {/* Fondo: video o slider de imágenes */}
      {hasVideo ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={settings.heroImage}
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={settings.heroVideo} type="video/mp4" />
        </video>
      ) : (
        slides.map((src, i) => (
          <div
            key={src + i}
            className={`hero-slide absolute inset-0 ${i === index ? 'is-active' : ''}`}
          >
            <img
              src={src}
              alt="Cookies artesanales recién horneadas"
              className="w-full h-full object-cover animate-kenburns"
            />
          </div>
        ))
      )}

      {/* Overlays cálidos */}
      <div className="absolute inset-0 bg-gradient-to-b from-cocoa-900/60 via-cocoa-900/30 to-cocoa-900/95" />
      <div className="absolute inset-0 bg-cocoa-900/20" />

      {/* Contenido */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 pt-16">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="text-caramel-300 text-[11px] sm:text-xs tracking-[0.4em] uppercase mb-5"
        >
          {settings.tagline}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
          className="font-display font-bold text-[#fdf6ee] leading-[1.05] text-4xl sm:text-6xl md:text-7xl max-w-4xl drop-shadow-[0_2px_10px_rgba(0,0,0,0.4)]"
        >
          {settings.heroTitle}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="mt-6 text-[#f5ece1]/85 text-base sm:text-lg md:text-xl font-light max-w-xl leading-relaxed"
        >
          {settings.heroSubtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.95 }}
          className="mt-9 flex flex-col sm:flex-row items-center gap-4"
        >
          <a
            href="#sabores"
            className="bg-caramel-500 text-cocoa-900 text-xs font-semibold tracking-[0.2em] uppercase px-9 py-4 rounded-full hover:bg-caramel-400 transition-all duration-300 hover:scale-105"
          >
            Ver sabores
          </a>
          <a
            href={waLink(settings)}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-[#f5ece1]/40 text-[#f5ece1] text-xs font-medium tracking-[0.2em] uppercase px-9 py-4 rounded-full hover:bg-[#f5ece1] hover:text-cocoa-900 transition-all duration-300"
          >
            Pedí por WhatsApp
          </a>
        </motion.div>
      </div>

      {/* Indicador de scroll */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center"
      >
        <span className="text-[#f5ece1]/40 text-[9px] tracking-[0.3em] uppercase mb-2">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-8 bg-gradient-to-b from-caramel-400/60 to-transparent"
        />
      </motion.div>
    </section>
  )
}
