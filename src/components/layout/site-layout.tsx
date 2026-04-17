'use client'

// Conditionally renders NavBar + Footer only for public-facing routes.
// Admin (/admin/*) and auth (/login) pages get no site chrome.
// This avoids the need to restructure every public page into a route group.

import { usePathname } from 'next/navigation'
import { NavBar } from './nav-bar'
import { Footer } from './footer'

const CHROME_FREE_PREFIXES = ['/admin', '/login']

export function SiteLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isChromeFree = CHROME_FREE_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(prefix + '/'),
  )

  if (isChromeFree) return <>{children}</>

  return (
    <>
      <NavBar />
      {children}
      <Footer />
    </>
  )
}
