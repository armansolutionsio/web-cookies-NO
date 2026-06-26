'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { createPortal } from 'react-dom'
import type { Settings } from '@/data/defaults'
import { waLink } from '@/lib/links'
import { CookieIcon } from './icons'

const navLinks = [
  { name: 'Inicio', href: '/#inicio' },
  { name: 'Sabores', href: '/#sabores' },
  { name: 'Cajas', href: '/#cajas' },
  { name: 'Empresas', href: '/#empresas' },
  { name: 'Contacto', href: '/#contacto' },
]

export default function Navbar({ settings }: { settings: Settings }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const wa = waLink(settings)

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 transition-all duration-500 ${
          mobileOpen ? 'z-[70]' : 'z-50'
        } ${
          scrolled
            ? 'bg-cocoa-900/90 backdrop-blur-md py-3 shadow-lg shadow-black/30'
            : 'bg-gradient-to-b from-black/50 to-transparent py-5 md:py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-8 flex items-center justify-between">
          {/* Wordmark */}
          <a href="/#inicio" className="relative z-[80] flex items-center gap-2.5 group">
            <CookieIcon className="w-7 h-7 text-caramel-400 group-hover:rotate-12 transition-transform duration-500" />
            <span className="font-display text-xl md:text-2xl font-bold tracking-wide text-[#f5ece1]">
              {settings.brandName}
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-[#f5ece1]/80 hover:text-caramel-300 text-[11px] tracking-[0.2em] uppercase font-medium transition-colors duration-300 relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-caramel-400 group-hover:w-full transition-all duration-500" />
              </a>
            ))}
          </div>

          {/* CTA desktop */}
          <div className="hidden lg:flex items-center">
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-caramel-500 text-cocoa-900 text-[10px] font-semibold tracking-[0.2em] uppercase px-6 py-3 rounded-full hover:bg-caramel-400 transition-all duration-300"
            >
              Pedí ahora
            </a>
          </div>

          {/* Mobile hamburger */}
          <div className="lg:hidden flex items-center relative z-[80]">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="w-9 h-9 flex flex-col justify-center items-center gap-[5px]"
              aria-label="Menú"
            >
              <span className={`block w-6 h-[2px] bg-[#f5ece1] transition-all duration-300 origin-center ${mobileOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
              <span className={`block w-6 h-[2px] bg-[#f5ece1] transition-all duration-300 ${mobileOpen ? 'opacity-0 scale-0' : ''}`} />
              <span className={`block w-6 h-[2px] bg-[#f5ece1] transition-all duration-300 origin-center ${mobileOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {mobileOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="fixed inset-0 z-[60] bg-cocoa-900/97 backdrop-blur-xl flex flex-col items-center justify-center lg:hidden"
              >
                <div className="flex flex-col items-center gap-7">
                  {navLinks.map((link, i) => (
                    <motion.a
                      key={link.name}
                      href={link.href}
                      initial={{ opacity: 0, y: 25 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ delay: i * 0.08, duration: 0.4 }}
                      onClick={() => setMobileOpen(false)}
                      className="text-[#f5ece1] text-2xl tracking-[0.25em] uppercase font-light font-display"
                    >
                      {link.name}
                    </motion.a>
                  ))}
                  <motion.a
                    href={wa}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ delay: navLinks.length * 0.08, duration: 0.4 }}
                    onClick={() => setMobileOpen(false)}
                    className="bg-caramel-500 text-cocoa-900 text-xs font-semibold tracking-[0.25em] uppercase px-8 py-4 rounded-full mt-4"
                  >
                    Pedí por WhatsApp
                  </motion.a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  )
}
