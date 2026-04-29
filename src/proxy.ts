import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'

function applySecurityHeaders(res: NextResponse): NextResponse {
  res.headers.set('X-Content-Type-Options', 'nosniff')
  res.headers.set('X-Frame-Options', 'DENY')
  res.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  res.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')
  if (process.env.NODE_ENV === 'production') {
    res.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload')
  }
  return res
}

export async function proxy(request: NextRequest) {
  const res = NextResponse.next({ request })
  applySecurityHeaders(res)
  return withSupabaseRefresh(request, res)
}

async function withSupabaseRefresh(
  request: NextRequest,
  base: NextResponse,
): Promise<NextResponse> {
  const res      = base
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return request.cookies.getAll() },
        setAll(cs) {
          cs.forEach(({ name, value }) => request.cookies.set(name, value))
          cs.forEach(({ name, value, options }) => res.cookies.set(name, value, options))
        },
      },
    },
  )
  await supabase.auth.getSession()
  return res
}

export const config = {
  matcher: ['/admin/:path*', '/login/:path*'],
}
