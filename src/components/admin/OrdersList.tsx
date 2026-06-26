'use client'

import { useEffect, useState } from 'react'

type Order = {
  id: number
  name: string
  contact: string
  message: string
  items: string
  status: string
  createdAt: string
}

export default function OrdersList() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/orders')
      .then((r) => r.json())
      .then((d) => setOrders(Array.isArray(d) ? d : []))
      .catch(() => setOrders([]))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p className="text-[#f5ece1]/50 text-sm">Cargando pedidos…</p>
  if (orders.length === 0)
    return (
      <div className="text-center py-16 bg-cocoa-900 rounded-xl border border-caramel-500/10">
        <p className="text-[#f5ece1]/50 text-sm">Todavía no llegaron consultas desde el formulario.</p>
      </div>
    )

  return (
    <div className="space-y-3">
      {orders.map((o) => (
        <div key={o.id} className="bg-cocoa-900 rounded-xl p-5 border border-caramel-500/10">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <p className="text-[#fdf6ee] font-semibold">{o.name}</p>
              <p className="text-caramel-300 text-sm">{o.contact}</p>
            </div>
            <span className="text-[#f5ece1]/40 text-xs">
              {new Date(o.createdAt).toLocaleString('es-AR')}
            </span>
          </div>
          {o.message && <p className="text-[#f5ece1]/65 text-sm mt-3 leading-relaxed">{o.message}</p>}
          {o.items && <p className="text-[#f5ece1]/50 text-xs mt-2">Pedido: {o.items}</p>}
        </div>
      ))}
    </div>
  )
}
