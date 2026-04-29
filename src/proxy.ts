import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'

let _cachedToken: string | null = null
let _tokenLoaded = false

async function resolvePortalToken(): Promise<string | null> {
  if (process.env.ADMIN_PORTAL_TOKEN) return process.env.ADMIN_PORTAL_TOKEN
  if (_tokenLoaded) return _cachedToken

  try {
    const db = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { cookies: { getAll: () => [], setAll: () => {} } },
    )
    const { data } = await db
      .from('school_settings')
      .select('value')
      .eq('key', 'admin_portal_token')
      .single()

    _cachedToken = data?.value ?? null
  } catch {
    _cachedToken = null
  }

  _tokenLoaded = true
  return _cachedToken
}

const PORTAL_COOKIE  = 'hdm_portal'
const ADMIN_TOKEN_RE = /^\/admin\/([^/]+)(\/.*)?$/

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
  const { pathname } = request.nextUrl

  // /admin/[token]/** — verify the token then rewrite to /admin/**
  const tokenMatch = pathname.match(ADMIN_TOKEN_RE)
  if (tokenMatch) {
    const [, segment, rest] = tokenMatch
    const validToken = await resolvePortalToken()

    if (!validToken || segment !== validToken) {
      return new NextResponse(null, { status: 404 })
    }

    const url = request.nextUrl.clone()
    url.pathname = '/admin' + (rest ?? '')
    const res = NextResponse.rewrite(url)

    // httpOnly: true — JavaScript cannot read this cookie.
    // Login redirect URL is stored in localStorage by the login form instead.
    res.cookies.set(PORTAL_COOKIE, '1', {
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
    })

    return applySecurityHeaders(await withSupabaseRefresh(request, res))
  }

  // /admin or /admin/** without the token segment — require portal cookie
  if (pathname === '/admin' || pathname.startsWith('/admin/')) {
    if (!request.cookies.has(PORTAL_COOKIE)) {
      return new NextResponse(null, { status: 404 })
    }
    return applySecurityHeaders(await withSupabaseRefresh(request, NextResponse.next({ request })))
  }

  // /login/[token] — valid token required, else 404
  const loginMatch = pathname.match(/^\/login\/([^/]+)$/)
  if (loginMatch) {
    const [, segment] = loginMatch
    const validToken = await resolvePortalToken()
    if (!validToken || segment !== validToken) {
      return new NextResponse(null, { status: 404 })
    }
  }

  return applySecurityHeaders(NextResponse.next({ request }))
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
  matcher: ['/admin', '/admin/:path*', '/login/:path*'],
}
