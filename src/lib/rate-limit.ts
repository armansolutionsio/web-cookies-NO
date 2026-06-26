// Rate limiter simple en memoria — sin dependencias externas
const hits = new Map<string, number[]>()

// Limpia entradas viejas cada 5 minutos para evitar fugas de memoria
setInterval(() => {
  const now = Date.now()
  for (const [key, timestamps] of hits) {
    const valid = timestamps.filter((t) => now - t < 60_000)
    if (valid.length === 0) hits.delete(key)
    else hits.set(key, valid)
  }
}, 300_000)

/**
 * Devuelve si la request debe limitarse.
 * @param key identificador único (ej. IP + endpoint)
 * @param limit máximo de requests en la ventana
 * @param windowMs ventana de tiempo en ms (default 60s)
 */
export function rateLimit(
  key: string,
  limit: number,
  windowMs: number = 60_000
): { limited: boolean; remaining: number } {
  const now = Date.now()
  const timestamps = (hits.get(key) || []).filter((t) => now - t < windowMs)

  if (timestamps.length >= limit) {
    hits.set(key, timestamps)
    return { limited: true, remaining: 0 }
  }

  timestamps.push(now)
  hits.set(key, timestamps)
  return { limited: false, remaining: limit - timestamps.length }
}
