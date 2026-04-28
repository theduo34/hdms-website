'use client'

import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import type { SettingSection } from './settings-data'

interface SettingsSectionCardProps {
  section: SettingSection
  values: Record<string, string>
  dirty: Record<string, string>
  canUpdate: boolean
  onChange: (key: string, value: string) => void
}

export function SettingsSectionCard({
  section, values, dirty, canUpdate, onChange,
}: SettingsSectionCardProps) {
  const Icon = section.icon

  return (
    <div className="bg-card rounded-2xl border border-border overflow-hidden">
      {/* Section header */}
      <div className="flex items-start gap-3 px-6 py-5 border-b border-border bg-muted/30">
        <div className="w-8 h-8 rounded-lg bg-secondary/15 flex items-center justify-center shrink-0 mt-0.5">
          <Icon className="w-4 h-4 text-secondary" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-foreground">{section.title}</h3>
          <p className="text-xs text-muted-foreground mt-0.5">{section.description}</p>
        </div>
      </div>

      {/* Fields */}
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
        {section.keys.map(({ key, label, type, hint }) => {
          const isDirty = dirty[key] !== undefined
          return (
            <div key={key} className="space-y-1.5">
              <div className="flex items-center gap-2">
                <label htmlFor={key} className="text-xs font-semibold text-foreground/70 uppercase tracking-wide">
                  {label}
                </label>
                {isDirty && (
                  <span className="inline-flex h-1.5 w-1.5 rounded-full bg-secondary" aria-label="unsaved change" />
                )}
              </div>
              <Input
                id={key}
                type={type}
                value={values[key] ?? ''}
                onChange={(e) => onChange(key, e.target.value)}
                disabled={!canUpdate}
                placeholder={hint}
                className={cn(
                  'h-9 text-sm',
                  isDirty && 'border-secondary ring-1 ring-secondary/30 bg-secondary/5',
                )}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
