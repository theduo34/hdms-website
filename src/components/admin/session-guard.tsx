'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

const SESSION_KEY = 'hdm_admin_session'
const LOGIN_URL_KEY = 'hdm_login_url'

export function SessionGuard() {
  const router = useRouter()

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) return

    // Tab was closed and reopened — invalidate the Supabase session.
    // The portal token itself stays httpOnly in a server cookie.
    // We stored the login URL in localStorage at login time for this redirect.
    const supabase = createClient()
    supabase.auth.signOut().then(() => {
      const loginUrl = localStorage.getItem(LOGIN_URL_KEY) ?? '/login'
      router.replace(loginUrl)
    })
  }, [router])

  return null
}
