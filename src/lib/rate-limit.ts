// In-memory sliding-window rate limiter.
// Works per-process. For multi-region deployments replace with @upstash/ratelimit + Redis.

const store = new Map<string, number[]>()

export function checkRateLimit(
  key: string,
  maxRequests: number,
  windowMs: number,
): boolean {
  const now  = Date.now()
  const prev = (store.get(key) ?? []).filter(t => now - t < windowMs)
  if (prev.length >= maxRequests) return false
  prev.push(now)
  store.set(key, prev)
  return true
}

export function getClientIp(request: Request): string {
  return (
    request.headers.get('x-real-ip') ??
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    'unknown'
  )
}
