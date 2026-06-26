import { NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { rateLimit } from '@/lib/rate-limit'
import { cloudinaryEnabled, uploadToCloudinary } from '@/lib/cloudinary'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'

export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

const ALLOWED = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif']
const MAX_SIZE = 8 * 1024 * 1024 // 8MB
const EXT: Record<string, string> = {
  'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp',
  'image/gif': 'gif', 'image/avif': 'avif',
}

export async function POST(request: Request) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  const { limited } = rateLimit('upload', 30, 60_000)
  if (limited) return NextResponse.json({ error: 'Demasiados uploads. Esperá un momento.' }, { status: 429 })

  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null
    if (!file) return NextResponse.json({ error: 'No se envió archivo' }, { status: 400 })

    if (!ALLOWED.includes(file.type)) {
      return NextResponse.json({ error: 'Formato no permitido. Usá JPG, PNG, WebP o GIF.' }, { status: 400 })
    }
    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: 'La imagen es muy pesada. Máximo 8MB.' }, { status: 400 })
    }

    const bytes = Buffer.from(await file.arrayBuffer())
    const ext = EXT[file.type] || 'jpg'
    const baseName = `cookie-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`

    // Producción: subir a Cloudinary (persistente, CDN). La URL https se guarda
    // tal cual en la base y next.config ya permite imágenes remotas.
    if (cloudinaryEnabled) {
      const url = await uploadToCloudinary(bytes, baseName)
      return NextResponse.json({ url })
    }

    // Fallback a disco (desarrollo local sin Cloudinary configurado).
    // Se sirve vía /api/uploads/<name> (el server standalone de Next no sirve
    // archivos agregados a /public en runtime, pero la ruta de API sí los lee).
    const name = `${baseName}.${ext}`
    const dir = path.join(process.cwd(), 'public', 'uploads')
    await mkdir(dir, { recursive: true })
    await writeFile(path.join(dir, name), bytes)
    return NextResponse.json({ url: `/api/uploads/${name}` })
  } catch (err) {
    console.error('Upload error:', err)
    return NextResponse.json({ error: 'Error al subir la imagen' }, { status: 500 })
  }
}
