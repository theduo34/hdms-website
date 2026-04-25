'use client'

import { useFieldArray, useFormContext } from 'react-hook-form'
import { Plus, Trash2 } from 'lucide-react'
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

export function PostContentBlocks() {
  const { control } = useFormContext()
  const { fields, append, remove } = useFieldArray({ control, name: 'content' })

  return (
    <div className="space-y-3">
      <p className="text-sm font-medium leading-none">Article Content</p>
      {fields.map((field, index) => {
        const fieldWithType = field as typeof field & { type: string }
        return (
          <div key={field.id} className="group flex items-start gap-2">
            <div className="flex-1">
              <FormField
                control={control}
                name={`content.${index}.text`}
                render={({ field: f }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        {...f}
                        rows={fieldWithType.type === 'pullquote' ? 2 : 3}
                        placeholder={fieldWithType.type === 'pullquote' ? 'Pull quote text...' : 'Paragraph text...'}
                        className={
                          fieldWithType.type === 'pullquote'
                            ? 'border-l-4 border-secondary rounded-none rounded-r-md bg-secondary/5 italic'
                            : ''
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <p className="text-[11px] text-muted-foreground mt-1 capitalize">{fieldWithType.type}</p>
            </div>
            {fields.length > 1 && (
              <button
                type="button"
                onClick={() => remove(index)}
                className="mt-2 text-muted-foreground/40 hover:text-destructive opacity-0 group-hover:opacity-100 transition"
                aria-label="Remove block"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        )
      })}

      <div className="flex gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => append({ type: 'paragraph', text: '' })}
        >
          <Plus className="w-3.5 h-3.5 mr-1" /> Paragraph
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => append({ type: 'pullquote', text: '' })}
        >
          <Plus className="w-3.5 h-3.5 mr-1" /> Pull Quote
        </Button>
      </div>
    </div>
  )
}
