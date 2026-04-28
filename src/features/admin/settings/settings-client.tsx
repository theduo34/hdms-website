'use client'

import { useState, useEffect, useCallback, useTransition } from 'react'
import { AdminHeader } from '@/components/admin/admin-header'
import { SettingsSectionCard } from './settings-section-card'
import { SETTING_SECTIONS } from './settings-data'
import { useAdminUser } from '@/hooks/admin/use-admin-user'
import { can } from '@/lib/admin/permissions'
import { toast } from 'sonner'
import { Save, Loader2, Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

interface Setting {
  key: string
  value: string
  updated_at: string
}

export function SettingsClient() {
  const { admin } = useAdminUser()
  const [settings, setSettings] = useState<Record<string, string>>({})
  const [loading, setLoading]   = useState(true)
  const [isPending, startTransition] = useTransition()
  const [dirty, setDirty]       = useState<Record<string, string>>({})

  const role      = admin?.profile.role ?? 'support_admin'
  const canUpdate = can(role, 'settings', 'update')
  const dirtyCount = Object.keys(dirty).length

  const load = useCallback(async () => {
    setLoading(true)
    const res  = await fetch('/api/admin/settings')
    const json = await res.json()
    const map: Record<string, string> = {}
    if (Array.isArray(json)) {
      json.forEach((s: Setting) => { map[s.key] = s.value })
    }
    setSettings(map)
    setLoading(false)
  }, [])

  useEffect(() => { void load() }, [load])

  function handleChange(key: string, value: string) {
    setDirty((d) => ({ ...d, [key]: value }))
    setSettings((s) => ({ ...s, [key]: value }))
  }

  async function handleSave() {
    if (dirtyCount === 0) { toast.info('No changes to save.'); return }
    startTransition(async () => {
      const res  = await fetch('/api/admin/settings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dirty),
      })
      const json = await res.json()
      if (res.ok) {
        toast.success(`${json.updated} setting${json.updated !== 1 ? 's' : ''} saved.`)
        setDirty({})
        void load()
      } else {
        toast.error(json.error ?? 'Save failed')
      }
    })
  }

  return (
    <>
      <AdminHeader title="Settings" />

      <main className="admin-page space-y-6">

        {/* Page header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-foreground">School Settings</h2>
            <p className="text-sm text-muted-foreground mt-0.5">
              Configure contact information, location, social media and admissions details.
            </p>
          </div>
          {canUpdate && (
            <Button
              size="sm"
              onClick={handleSave}
              disabled={isPending || dirtyCount === 0}
              className="shrink-0"
            >
              {isPending
                ? <><Loader2 className="w-3.5 h-3.5 mr-2 animate-spin" /> Saving…</>
                : <><Save className="w-3.5 h-3.5 mr-2" /> Save{dirtyCount > 0 ? ` (${dirtyCount})` : ''}</>}
            </Button>
          )}
        </div>

        {/* Read-only notice */}
        {!canUpdate && (
          <div className="flex items-center gap-3 rounded-xl border border-border bg-muted/40 px-4 py-3">
            <Lock className="w-4 h-4 text-muted-foreground shrink-0" />
            <p className="text-sm text-muted-foreground">
              Settings are read-only for your role. Contact your super admin to make changes.
            </p>
          </div>
        )}

        {/* Sections grid */}
        {loading ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-52 rounded-2xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {SETTING_SECTIONS.map((section) => (
              <SettingsSectionCard
                key={section.title}
                section={section}
                values={settings}
                dirty={dirty}
                canUpdate={canUpdate}
                onChange={handleChange}
              />
            ))}
          </div>
        )}

        {/* Sticky unsaved changes bar */}
        {canUpdate && dirtyCount > 0 && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-foreground text-background rounded-full px-5 py-2.5 shadow-xl z-50">
            <span className="text-sm font-medium">
              {dirtyCount} unsaved change{dirtyCount !== 1 ? 's' : ''}
            </span>
            <Button
              size="sm"
              onClick={handleSave}
              disabled={isPending}
              className="h-7 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/90 px-4 text-xs font-semibold"
            >
              {isPending
                ? <><Loader2 className="w-3 h-3 mr-1.5 animate-spin" /> Saving…</>
                : 'Save now'}
            </Button>
          </div>
        )}
      </main>
    </>
  )
}
