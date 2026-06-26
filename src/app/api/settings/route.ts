import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/auth'
import { defaultSettings } from '@/data/defaults'

export const dynamic = 'force-dynamic'

const STRING_FIELDS = [
  'brandName', 'tagline', 'contactName', 'whatsapp', 'email', 'instagram',
  'linkedin', 'zone', 'heroTitle', 'heroSubtitle', 'heroImage', 'heroVideo',
  'aboutTitle', 'aboutText', 'aboutImage',
] as const

const BOOL_FIELDS = [
  'whatsappEnabled', 'emailEnabled', 'instagramEnabled', 'linkedinEnabled',
] as const

// GET: configuración actual (para el admin)
export async function GET() {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  const row = await prisma.settings.findUnique({ where: { id: 1 } })
  return NextResponse.json(row || { id: 1, ...defaultSettings })
}

// PUT: guardar cambios de configuración (upsert sobre la fila id=1)
export async function PUT(request: Request) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  try {
    const b = await request.json()
    const data: Record<string, unknown> = {}
    for (const f of STRING_FIELDS) {
      if (b[f] !== undefined) data[f] = String(b[f])
    }
    for (const f of BOOL_FIELDS) {
      if (b[f] !== undefined) data[f] = !!b[f]
    }

    const row = await prisma.settings.upsert({
      where: { id: 1 },
      update: data,
      create: { id: 1, ...defaultSettings, ...data },
    })
    return NextResponse.json(row)
  } catch (err) {
    console.error('Update settings error:', err)
    return NextResponse.json({ error: 'No se pudo guardar la configuración' }, { status: 500 })
  }
}
