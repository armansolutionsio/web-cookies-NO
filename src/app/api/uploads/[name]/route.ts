import { NextResponse } from 'next/server'
import { readFile } from 'fs/promises'
import path from 'path'

export const dynamic = 'force-dynamic'

const TYPES: Record<string, string> = {
  jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png',
  webp: 'image/webp', gif: 'image/gif', avif: 'image/avif',
}

// Sirve las imágenes subidas desde el admin (guardadas en public/uploads).
export async function GET(_req: Request, { params }: { params: Promise<{ name: string }> }) {
  const { name } = await params

  // Sanitizar: solo nombre de archivo simple, sin path traversal
  if (!/^[a-zA-Z0-9._-]+$/.test(name) || name.includes('..')) {
    return new NextResponse('Not found', { status: 404 })
  }
  const ext = name.split('.').pop()?.toLowerCase() || ''
  const type = TYPES[ext]
  if (!type) return new NextResponse('Not found', { status: 404 })

  try {
    const file = await readFile(path.join(process.cwd(), 'public', 'uploads', name))
    return new NextResponse(new Uint8Array(file), {
      headers: {
        'Content-Type': type,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    })
  } catch {
    return new NextResponse('Not found', { status: 404 })
  }
}
