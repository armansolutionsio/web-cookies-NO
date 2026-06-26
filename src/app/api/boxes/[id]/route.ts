import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/auth'

export const dynamic = 'force-dynamic'

// PUT: editar una caja
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  const { id } = await params
  try {
    const b = await request.json()
    const data: Record<string, unknown> = {}
    if (b.name !== undefined) data.name = String(b.name)
    if (b.qty !== undefined) data.qty = String(b.qty)
    if (b.description !== undefined) data.description = String(b.description)
    if (b.price !== undefined) data.price = String(b.price)
    if (b.highlight !== undefined) data.highlight = !!b.highlight
    if (b.active !== undefined) data.active = !!b.active
    if (b.order !== undefined) data.order = Number.isFinite(+b.order) ? +b.order : 0

    const box = await prisma.box.update({ where: { id: Number(id) }, data })
    return NextResponse.json(box)
  } catch (err) {
    console.error('Update box error:', err)
    return NextResponse.json({ error: 'No se pudo actualizar' }, { status: 500 })
  }
}

// DELETE: eliminar una caja
export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  const { id } = await params
  try {
    await prisma.box.delete({ where: { id: Number(id) } })
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Delete box error:', err)
    return NextResponse.json({ error: 'No se pudo eliminar' }, { status: 500 })
  }
}
