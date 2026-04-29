'use client'

import { usePathname } from 'next/navigation'

export function useAdminBase(): string {
  const pathname = usePathname()
  const match = pathname.match(/^(\/admin\/[^/]+)/)
  return match ? match[1] : '/admin'
}
