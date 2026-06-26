import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/auth'

export const dynamic = 'force-dynamic'

// GET: lista completa (incluye ocultas) para el admin
export async function GET() {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  const boxes = await prisma.box.findMany({ orderBy: { order: 'asc' } })
  return NextResponse.json(boxes)
}

// POST: crear una caja nueva
export async function POST(request: Request) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  try {
    const b = await request.json()
    const name = (b.name || '').toString().trim()
    if (!name) return NextResponse.json({ error: 'El nombre es obligatorio' }, { status: 400 })

    const box = await prisma.box.create({
      data: {
        name,
        qty: (b.qty || '').toString(),
        description: (b.description || '').toString(),
        price: (b.price || '').toString(),
        highlight: !!b.highlight,
        active: b.active !== false,
        order: Number.isFinite(+b.order) ? +b.order : 0,
      },
    })
    return NextResponse.json(box)
  } catch (err) {
    console.error('Create box error:', err)
    return NextResponse.json({ error: 'No se pudo crear la caja' }, { status: 500 })
  }
}
