'use client'

const items = [
  'Recién horneadas',
  'Manteca de verdad',
  'Tandas chicas',
  'Sin conservantes',
  'Hecho a mano',
  'Chocolate premium',
  'Envíos en el día',
  'Cajas personalizadas',
]

export default function Marquee() {
  const loop = [...items, ...items]
  return (
    <div className="bg-caramel-500 text-cocoa-900 py-3.5 overflow-hidden border-y border-caramel-600/30">
      <div className="flex whitespace-nowrap animate-marquee w-max">
        {loop.map((t, i) => (
          <span key={i} className="flex items-center text-[13px] font-semibold tracking-[0.2em] uppercase">
            <span className="px-7">{t}</span>
            <span className="text-cocoa-900/50">&#10022;</span>
          </span>
        ))}
      </div>
    </div>
  )
}
