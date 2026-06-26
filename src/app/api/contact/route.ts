import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { rateLimit } from '@/lib/rate-limit'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
  const { limited } = rateLimit(`contact:${ip}`, 8, 60_000)
  if (limited) {
    return NextResponse.json({ error: 'Demasiados envíos. Esperá un momento.' }, { status: 429 })
  }

  try {
    const body = await request.json()
    const name = (body.name || '').toString().slice(0, 120).trim()
    const contact = (body.contact || '').toString().slice(0, 160).trim()
    const message = (body.message || '').toString().slice(0, 2000).trim()
    const items = (body.items || '').toString().slice(0, 2000).trim()

    if (!name || !contact) {
      return NextResponse.json({ error: 'Faltan datos' }, { status: 400 })
    }

    await prisma.order.create({ data: { name, contact, message, items } })
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact error:', err)
    // Si la base no está, igual respondemos algo amable
    return NextResponse.json({ error: 'No se pudo guardar. Escribinos por WhatsApp.' }, { status: 500 })
  }
}
