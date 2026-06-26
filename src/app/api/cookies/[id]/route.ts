import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/auth'

export const dynamic = 'force-dynamic'

function arr(v: unknown): string[] {
  if (Array.isArray(v)) return v.map((x) => String(x).trim()).filter(Boolean)
  if (typeof v === 'string') return v.split('\n').map((x) => x.trim()).filter(Boolean)
  return []
}

// PUT: editar una cookie
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  const { id } = await params
  try {
    const b = await request.json()
    const data: Record<string, unknown> = {}
    if (b.name !== undefined) data.name = String(b.name)
    if (b.description !== undefined) data.description = String(b.description)
    if (b.ingredients !== undefined) data.ingredients = arr(b.ingredients)
    if (b.price !== undefined) data.price = String(b.price)
    if (b.image !== undefined) data.image = String(b.image)
    if (b.accent !== undefined) data.accent = String(b.accent)
    if (b.tags !== undefined) data.tags = arr(b.tags)
    if (b.featured !== undefined) data.featured = !!b.featured
    if (b.active !== undefined) data.active = !!b.active
    if (b.order !== undefined) data.order = Number.isFinite(+b.order) ? +b.order : 0

    const cookie = await prisma.cookie.update({ where: { id: Number(id) }, data })
    return NextResponse.json(cookie)
  } catch (err) {
    console.error('Update cookie error:', err)
    return NextResponse.json({ error: 'No se pudo actualizar' }, { status: 500 })
  }
}

// DELETE: eliminar una cookie
export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  const { id } = await params
  try {
    await prisma.cookie.delete({ where: { id: Number(id) } })
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Delete cookie error:', err)
    return NextResponse.json({ error: 'No se pudo eliminar' }, { status: 500 })
  }
}
