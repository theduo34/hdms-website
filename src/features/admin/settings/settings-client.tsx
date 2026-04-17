'use client'

import { useState, useEffect, useCallback, useTransition } from 'react'
import { AdminHeader } from '@/components/admin/admin-header'
import { useAdminUser } from '@/hooks/admin/use-admin-user'
import { can } from '@/lib/admin/permissions'
import { toast } from 'sonner'
import { Save, Loader2, Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { SETTING_SECTIONS } from './settings-data'

interface Setting {
  key: string
  value: string
  updated_at: string
}

export function SettingsClient() {
  const { admin } = useAdminUser()
  const [settings, setSettings] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)
  const [isPending, startTransition] = useTransition()
  const [dirty, setDirty] = useState<Record<string, string>>({})

  const role = admin?.profile.role ?? 'support_admin'
  const canUpdate = can(role, 'settings', 'update')
  const dirtyCount = Object.keys(dirty).length

  const load = useCallback(async () => {
    setLoading(true)
    const res = await fetch('/api/admin/settings')
    const json = await res.json()
    const map: Record<string, string> = {}
    if (Array.isArray(json)) {
      json.forEach((s: Setting) => { map[s.key] = s.value })
    }
    setSettings(map)
    setLoading(false)
  }, [])

  useEffect(() => { load() }, [load])

  function handleChange(key: string, value: string) {
    setDirty((d) => ({ ...d, [key]: value }))
    setSettings((s) => ({ ...s, [key]: value }))
  }

  async function handleSave() {
    if (dirtyCount === 0) { toast.info('No changes to save.'); return }
    startTransition(async () => {
      const res = await fetch('/api/admin/settings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dirty),
      })
      const json = await res.json()
      if (res.ok) {
        toast.success(`${json.updated} setting${json.updated !== 1 ? 's' : ''} saved!`)
        setDirty({})
        load()
      } else {
        toast.error(json.error ?? 'Save failed')
      }
    })
  }

  return (
    <>
      <AdminHeader title="Settings" />

      <main className="p-6 space-y-6 max-w-3xl mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-foreground">School Settings</h2>
            <p className="text-sm text-muted-foreground mt-0.5">Configure school contact info and website content.</p>
          </div>
          {canUpdate && (
            <Button size="sm" onClick={handleSave} disabled={isPending || dirtyCount === 0}>
              {isPending
                ? <><Loader2 className="w-3.5 h-3.5 mr-2 animate-spin" /> Saving…</>
                : <><Save className="w-3.5 h-3.5 mr-2" /> Save{dirtyCount > 0 ? ` (${dirtyCount})` : ''}</>}
            </Button>
          )}
        </div>

        {!canUpdate && (
          <div className="flex items-start gap-3 rounded-xl border border-border bg-muted/40 p-4">
            <Lock className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
            <p className="text-sm text-muted-foreground">
              Settings are read-only. Contact your administrator to make changes.
            </p>
          </div>
        )}

        {loading ? (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-48 rounded-xl" />)}
          </div>
        ) : (
          <div className="space-y-5">
            {SETTING_SECTIONS.map((section) => (
              <Card key={section.title}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold">{section.title}</CardTitle>
                  <CardDescription className="text-xs">{section.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {section.keys.map(({ key, label, type }) => (
                    <div key={key} className="space-y-1.5">
                      <Label htmlFor={key} className="text-xs text-muted-foreground uppercase tracking-wide font-semibold">
                        {label}
                      </Label>
                      <Input
                        id={key}
                        type={type}
                        value={settings[key] ?? ''}
                        onChange={(e) => handleChange(key, e.target.value)}
                        disabled={!canUpdate}
                        className={dirty[key] !== undefined ? 'border-secondary bg-secondary/5' : ''}
                      />
                      <p className="text-[11px] text-muted-foreground/50 font-mono">{key}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </>
  )
}
