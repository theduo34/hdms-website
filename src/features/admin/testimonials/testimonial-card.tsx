'use client'

import Image from 'next/image'
import { Pencil, Trash2, Eye, EyeOff, MessageSquare } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { getMediaUrl } from '@/lib/media'
import { cn } from '@/lib/utils'

export interface AdminTestimonialItem {
  id: string
  parent_name: string
  child_year: string
  quote: string
  asset_id: string | null
  is_active: boolean
  sort_order: number
  created_at: string
  asset: { id: string; storage_path: string | null; alt: string } | null
}

interface TestimonialCardProps {
  item: AdminTestimonialItem
  canEdit: boolean
  canDelete: boolean
  onEdit: (item: AdminTestimonialItem) => void
  onDelete: (id: string) => void
  onToggleActive: (item: AdminTestimonialItem) => void
}

export function TestimonialCard({
  item, canEdit, canDelete, onEdit, onDelete, onToggleActive,
}: TestimonialCardProps) {
  const imageUrl = item.asset ? getMediaUrl(item.asset.storage_path) : null

  return (
    <div className={cn('rounded-xl border border-border bg-card overflow-hidden group', !item.is_active && 'opacity-60')}>
      <div className="relative h-32 bg-muted">
        {imageUrl ? (
          <Image src={imageUrl} alt={item.parent_name} fill className="object-cover object-top" unoptimized />
        ) : (
          <div className="flex items-center justify-center h-full">
            <MessageSquare className="w-8 h-8 text-muted-foreground/30" />
          </div>
        )}
        <div className="absolute top-2 right-2">
          <Badge variant={item.is_active ? 'default' : 'secondary'} className="text-[10px] py-0 px-1.5">
            {item.is_active ? 'Live' : 'Hidden'}
          </Badge>
        </div>
      </div>

      <div className="p-3 space-y-2">
        <div>
          <p className="font-semibold text-sm text-foreground">{item.parent_name}</p>
          {item.child_year && (
            <p className="text-xs text-muted-foreground">Parent · {item.child_year}</p>
          )}
        </div>
        <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed italic">
          &ldquo;{item.quote}&rdquo;
        </p>
      </div>

      <div className="px-3 pb-3 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
        {canEdit && (
          <>
            <button
              onClick={() => onToggleActive(item)}
              className="w-7 h-7 rounded-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent transition"
              aria-label={item.is_active ? 'Hide testimonial' : 'Show testimonial'}
            >
              {item.is_active ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={() => onEdit(item)}
              className="w-7 h-7 rounded-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent transition"
              aria-label="Edit testimonial"
            >
              <Pencil className="w-3.5 h-3.5" />
            </button>
          </>
        )}
        {canDelete && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button
                className="w-7 h-7 rounded-md flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition ml-auto"
                aria-label="Delete testimonial"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Remove testimonial?</AlertDialogTitle>
                <AlertDialogDescription>
                  &ldquo;{item.parent_name}&rdquo;&apos;s testimonial will be permanently removed.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  onClick={() => onDelete(item.id)}
                >
                  Remove
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>
    </div>
  )
}
