'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

const SESSION_KEY  = 'hdm_admin_session'
const PORTAL_COOKIE = 'hdm_portal'

function readPortalCookie(): string | null {
  if (typeof document === 'undefined') return null
  const entry = document.cookie
    .split(';')
    .find((c) => c.trim().startsWith(`${PORTAL_COOKIE}=`))
  return entry
    ? decodeURIComponent(entry.split('=').slice(1).join('=')).trim()
    : null
}

export function SessionGuard() {
  const router = useRouter()

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) return

    const supabase = createClient()
    supabase.auth.signOut().then(() => {
      const portalToken = readPortalCookie()
      router.replace(portalToken ? `/login/${portalToken}` : '/login')
    })
  }, [router])

  return null
}
