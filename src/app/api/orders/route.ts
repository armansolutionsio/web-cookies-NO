import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/auth'

export const dynamic = 'force-dynamic'

// GET: pedidos/consultas recibidos (para el admin)
export async function GET() {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  try {
    const orders = await prisma.order.findMany({ orderBy: { createdAt: 'desc' }, take: 200 })
    return NextResponse.json(orders)
  } catch {
    return NextResponse.json([])
  }
}
