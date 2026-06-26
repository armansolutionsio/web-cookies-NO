import { prisma } from './prisma'
import {
  defaultSettings,
  defaultCookies,
  type Settings,
  type Cookie,
} from '@/data/defaults'

// Lee la configuración del sitio. Si la base no está disponible,
// devuelve los valores por defecto para que la web nunca se rompa.
export async function getSettings(): Promise<Settings> {
  try {
    const row = await prisma.settings.findUnique({ where: { id: 1 } })
    if (!row) return defaultSettings
    // Quitamos id/updatedAt para quedarnos solo con el contenido
    const { id: _id, updatedAt: _u, ...rest } = row
    return rest as Settings
  } catch {
    return defaultSettings
  }
}

// Lee las cookies activas, ordenadas. Fallback a las de defecto.
export async function getCookies(includeInactive = false): Promise<Cookie[]> {
  try {
    const rows = await prisma.cookie.findMany({
      where: includeInactive ? undefined : { active: true },
      orderBy: { order: 'asc' },
    })
    if (rows.length === 0) return defaultCookies
    return rows as Cookie[]
  } catch {
    return defaultCookies
  }
}
