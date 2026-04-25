'use client'

import { useFormContext } from 'react-hook-form'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Switch } from '@/components/ui/switch'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { CATEGORIES, CATEGORY_STYLES } from './news-data'

interface PostSidebarPanelProps {
  submitSlot: React.ReactNode
}

export function PostSidebarPanel({ submitSlot }: PostSidebarPanelProps) {
  const { control } = useFormContext()

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="p-4 space-y-5">
          {/* Category tiles */}
          <FormField
            control={control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category *</FormLabel>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  {CATEGORIES.map((cat) => {
                    const active = field.value === cat.value
                    return (
                      <button
                        key={cat.value}
                        type="button"
                        onClick={() => field.onChange(cat.value)}
                        className={cn(
                          'rounded-lg px-3 py-2 text-xs font-medium border transition-all',
                          active
                            ? cn(CATEGORY_STYLES[cat.value], 'border-current ring-1 ring-current/20')
                            : 'border-border text-muted-foreground hover:border-primary/30 hover:text-foreground',
                        )}
                      >
                        {cat.label}
                      </button>
                    )
                  })}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Featured toggle */}
          <FormField
            control={control}
            name="featured"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between">
                <div>
                  <FormLabel>Featured post</FormLabel>
                  <FormDescription className="text-[11px]">
                    Shown prominently on the news page
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />
        </CardContent>
      </Card>

      {submitSlot}
    </div>
  )
}
