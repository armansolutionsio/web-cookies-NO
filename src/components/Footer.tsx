'use client'

import type { Settings } from '@/data/defaults'
import { waLink, igLink, emailLink, linkedinLink } from '@/lib/links'
import { WhatsAppIcon, InstagramIcon, MailIcon, LinkedInIcon, CookieIcon } from './icons'

export default function Footer({ settings }: { settings: Settings }) {
  const socials = [
    settings.whatsappEnabled && settings.whatsapp && { href: waLink(settings), Icon: WhatsAppIcon, label: 'WhatsApp', color: 'hover:bg-green-600' },
    settings.instagramEnabled && settings.instagram && { href: igLink(settings), Icon: InstagramIcon, label: 'Instagram', color: 'hover:bg-pink-600' },
    settings.emailEnabled && settings.email && { href: emailLink(settings), Icon: MailIcon, label: 'Email', color: 'hover:bg-caramel-500' },
    settings.linkedinEnabled && settings.linkedin && { href: linkedinLink(settings), Icon: LinkedInIcon, label: 'LinkedIn', color: 'hover:bg-[#0a66c2]' },
  ].filter(Boolean) as { href: string; Icon: typeof WhatsAppIcon; label: string; color: string }[]

  return (
    <footer id="footer" className="bg-[#13100b] border-t border-caramel-500/10">
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Marca */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <CookieIcon className="w-7 h-7 text-caramel-400" />
              <span className="font-display text-2xl font-bold text-[#fdf6ee]">{settings.brandName}</span>
            </div>
            <p className="text-[#f5ece1]/40 text-sm font-light leading-relaxed max-w-xs">
              {settings.tagline}. Hechas con amor en {settings.zone}.
            </p>
            <div className="flex items-center gap-2.5 mt-5">
              {socials.map(({ href, Icon, label, color }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={`w-9 h-9 rounded-full bg-cocoa-800 flex items-center justify-center text-[#f5ece1] transition-colors duration-300 ${color}`}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Menú */}
          <div>
            <h3 className="text-caramel-400 text-[11px] tracking-[0.2em] uppercase font-semibold mb-4">Menú</h3>
            <div className="space-y-2">
              {[
                ['Inicio', '/#inicio'],
                ['Sabores', '/#sabores'],
                ['Cajas', '/#cajas'],
                ['Empresas', '/#empresas'],
                ['Contacto', '/#contacto'],
              ].map(([t, h]) => (
                <a key={t} href={h} className="block text-[#f5ece1]/40 text-sm font-light hover:text-caramel-300 transition-colors">
                  {t}
                </a>
              ))}
            </div>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="text-caramel-400 text-[11px] tracking-[0.2em] uppercase font-semibold mb-4">Contacto</h3>
            <div className="space-y-2 text-[#f5ece1]/40 text-sm font-light">
              <p className="text-[#f5ece1]/60">{settings.contactName}</p>
              {settings.whatsappEnabled && settings.whatsapp && (
                <a href={waLink(settings)} target="_blank" rel="noopener noreferrer" className="block hover:text-caramel-300 transition-colors">
                  +{settings.whatsapp}
                </a>
              )}
              {settings.emailEnabled && settings.email && (
                <a href={emailLink(settings)} className="block hover:text-caramel-300 transition-colors break-all">
                  {settings.email}
                </a>
              )}
              <p>Envíos: {settings.zone}</p>
            </div>
          </div>

          {/* Horario / CTA */}
          <div>
            <h3 className="text-caramel-400 text-[11px] tracking-[0.2em] uppercase font-semibold mb-4">Pedidos</h3>
            <p className="text-[#f5ece1]/40 text-sm font-light leading-relaxed mb-4">
              A pedido, con 24/48 hs de anticipación. ¡Escribinos y coordinamos!
            </p>
            <a
              href={waLink(settings)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-caramel-500 text-cocoa-900 text-[10px] font-semibold tracking-[0.15em] uppercase px-5 py-2.5 rounded-full hover:bg-caramel-400 transition-colors"
            >
              Pedí ahora
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-caramel-500/10">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-[#f5ece1]/25 text-[11px] tracking-wide text-center sm:text-left">
            © {new Date().getFullYear()} {settings.brandName}. Todos los derechos reservados.
          </p>
          <a href="/admin" className="text-[#f5ece1]/20 text-[11px] hover:text-caramel-300 transition-colors">
            Panel de administración
          </a>
        </div>
      </div>
    </footer>
  )
}
