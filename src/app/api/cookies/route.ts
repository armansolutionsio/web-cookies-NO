import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/auth'

export const dynamic = 'force-dynamic'

function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60) || 'cookie'
}

function arr(v: unknown): string[] {
  if (Array.isArray(v)) return v.map((x) => String(x).trim()).filter(Boolean)
  if (typeof v === 'string') return v.split('\n').map((x) => x.trim()).filter(Boolean)
  return []
}

// GET: lista completa (incluye inactivas) para el admin
export async function GET() {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  const cookies = await prisma.cookie.findMany({ orderBy: { order: 'asc' } })
  return NextResponse.json(cookies)
}

// POST: crear una cookie nueva
export async function POST(request: Request) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  try {
    const b = await request.json()
    const name = (b.name || '').toString().trim()
    if (!name) return NextResponse.json({ error: 'El nombre es obligatorio' }, { status: 400 })

    let slug = b.slug ? slugify(b.slug) : slugify(name)
    // Evitar colisión de slug
    const exists = await prisma.cookie.findUnique({ where: { slug } })
    if (exists) slug = `${slug}-${Date.now().toString().slice(-4)}`

    const cookie = await prisma.cookie.create({
      data: {
        name,
        slug,
        description: (b.description || '').toString(),
        ingredients: arr(b.ingredients),
        price: (b.price || '').toString(),
        image: (b.image || '').toString(),
        accent: (b.accent || '#d17e36').toString(),
        tags: arr(b.tags),
        featured: !!b.featured,
        active: b.active !== false,
        order: Number.isFinite(+b.order) ? +b.order : 0,
      },
    })
    return NextResponse.json(cookie)
  } catch (err) {
    console.error('Create cookie error:', err)
    return NextResponse.json({ error: 'No se pudo crear la cookie' }, { status: 500 })
  }
}
