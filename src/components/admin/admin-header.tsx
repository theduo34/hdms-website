'use client'

import Link from 'next/link'
import { Bell, ArrowLeft } from 'lucide-react'
import { SidebarTrigger } from '@/components/ui/sidebar'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

interface AdminHeaderProps {
  title?: string
  backHref?: string
}

export function AdminHeader({ title, backHref }: AdminHeaderProps) {
  return (
    <header className="h-14 border-b border-border bg-background flex items-center px-4 gap-3 sticky top-0 z-10">
      <SidebarTrigger className="text-muted-foreground hover:text-foreground -ml-1 transition-colors flex-shrink-0" />

      {backHref && (
        <Link
          href={backHref}
          aria-label="Go back"
          className="w-8 h-8 rounded-full border border-border bg-background flex items-center justify-center hover:bg-accent hover:border-primary/20 transition-colors flex-shrink-0"
        >
          <ArrowLeft className="w-4 h-4 text-foreground" />
        </Link>
      )}

      {title && (
        <h1 className="text-sm font-semibold text-foreground">{title}</h1>
      )}

      <div className="ml-auto">
        <Sheet>
          <SheetTrigger asChild>
            <button
              className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent transition"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
            </button>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>Notifications</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col items-center justify-center h-full pb-20 text-center gap-3">
              <Bell className="w-8 h-8 text-muted-foreground/30" />
              <p className="text-sm text-muted-foreground">No new notifications.</p>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
