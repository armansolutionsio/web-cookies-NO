'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Settings } from '@/data/defaults'
import { waLink } from '@/lib/links'
import { WhatsAppIcon } from './icons'

export default function WhatsAppButton({ settings }: { settings: Settings }) {
  const [hovered, setHovered] = useState(false)
  if (!settings.whatsappEnabled || !settings.whatsapp) return null

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.5, duration: 0.5, ease: 'easeOut' }}
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.25 }}
            className="bg-cocoa-800 border border-caramel-500/25 rounded-lg px-4 py-3 shadow-xl shadow-black/40 max-w-[230px]"
          >
            <p className="text-[#f5ece1] text-xs font-medium leading-snug">
              ¿Se te antojó algo dulce?
            </p>
            <p className="text-caramel-300/80 text-[10px] font-light mt-1">
              Escribinos y armamos tu caja
            </p>
            <div className="absolute -bottom-[6px] right-6 w-3 h-3 bg-cocoa-800 border-r border-b border-caramel-500/25 rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      <a
        href={waLink(settings)}
        target="_blank"
        rel="noopener noreferrer"
        className="relative w-14 h-14 flex items-center justify-center group"
        aria-label="WhatsApp"
      >
        <div className="absolute inset-0 rounded-full animate-spin-slow">
          <svg className="w-full h-full" viewBox="0 0 56 56">
            <circle cx="28" cy="28" r="26" fill="none" stroke="url(#wagrad)" strokeWidth="2" strokeDasharray="60 103" strokeLinecap="round" />
            <defs>
              <linearGradient id="wagrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#e6ac74" />
                <stop offset="50%" stopColor="#d17e36" />
                <stop offset="100%" stopColor="#e6ac74" stopOpacity="0.2" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="w-12 h-12 rounded-full bg-green-600 group-hover:bg-green-500 flex items-center justify-center transition-colors duration-300 shadow-lg shadow-green-900/40">
          <WhatsAppIcon className="w-6 h-6 text-white" />
        </div>
      </a>
    </motion.div>
  )
}
