'use client'

import { useState, useEffect, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { Plus, Save, Loader2, Search, MessageSquare } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Skeleton } from '@/components/ui/skeleton'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from '@/components/ui/form'
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from '@/components/ui/dialog'
import { AdminHeader } from '@/components/admin/admin-header'
import { DropZone } from '@/features/admin/campus/drop-zone'
import { getMediaUrl } from '@/lib/media'
import { can } from '@/lib/admin/permissions'
import { useAdminUser } from '@/hooks/admin/use-admin-user'
import { TestimonialCard } from './testimonial-card'
import { signAndUploadTestimonial } from './upload-helpers'
import type { AdminTestimonialItem } from './testimonial-card'

interface PaginatedResponse {
  data: AdminTestimonialItem[]
  total: number
  page: number
  limit: number
  hasMore: boolean
}

const PAGE_LIMIT = 9

const schema = z.object({
  parent_name: z.string().min(1, 'Name is required').max(120),
  child_year:  z.string().max(80).optional(),
  quote:       z.string().min(1, 'Quote is required').max(1000),
  is_active:   z.boolean().default(true),
})

type FormValues = z.infer<typeof schema>

export function TestimonialsClient() {
  const { admin } = useAdminUser()
  const role      = admin?.profile.role ?? 'support_admin'

  const canCreate = can(role, 'testimonials', 'create')
  const canEdit   = can(role, 'testimonials', 'update')
  const canDelete = can(role, 'testimonials', 'delete')

  const [items, setItems]               = useState<AdminTestimonialItem[]>([])
  const [total, setTotal]               = useState(0)
  const [page, setPage]                 = useState(1)
  const [hasMore, setHasMore]           = useState(false)
  const [loading, setLoading]           = useState(true)
  const [loadingMore, setLoadingMore]   = useState(false)
  const [search, setSearch]             = useState('')
  const [dialogOpen, setDialogOpen]     = useState(false)
  const [editingId, setEditingId]       = useState<string | null>(null)
  const [imageFile, setImageFile]       = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [pendingAssetId, setPendingAssetId] = useState<string | null>(null)

  const form = useForm<FormValues>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(schema) as any,
    defaultValues: { parent_name: '', child_year: '', quote: '', is_active: true },
  })

  const { isSubmitting } = form.formState

  const load = useCallback(async (p = 1, append = false) => {
    if (p === 1) setLoading(true)
    else setLoadingMore(true)

    const res  = await fetch(`/api/admin/testimonials?page=${p}&limit=${PAGE_LIMIT}`)
    const json = await res.json() as PaginatedResponse

    setItems(prev => append ? [...prev, ...(json.data ?? [])] : (json.data ?? []))
    setTotal(json.total ?? 0)
    setPage(p)
    setHasMore(json.hasMore ?? false)

    if (p === 1) setLoading(false)
    else setLoadingMore(false)
  }, [])

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { void load(1) }, [load])

  function openCreate() {
    setEditingId(null)
    setPendingAssetId(null)
    setImageFile(null)
    setImagePreview(null)
    setUploadProgress(0)
    form.reset({ parent_name: '', child_year: '', quote: '', is_active: true })
    setDialogOpen(true)
  }

  function openEdit(item: AdminTestimonialItem) {
    setEditingId(item.id)
    setPendingAssetId(item.asset_id)
    setImageFile(null)
    setImagePreview(item.asset ? getMediaUrl(item.asset.storage_path) : null)
    setUploadProgress(0)
    form.reset({
      parent_name: item.parent_name,
      child_year:  item.child_year,
      quote:       item.quote,
      is_active:   item.is_active,
    })
    setDialogOpen(true)
  }

  function handleImageFile(file: File) {
    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
    setPendingAssetId(null)
  }

  async function onSubmit(values: FormValues) {
    let assetId = pendingAssetId

    if (imageFile) {
      try {
        setUploadProgress(5)
        const result = await signAndUploadTestimonial(imageFile, setUploadProgress)
        assetId = result.assetId
      } catch (e) {
        toast.error(e instanceof Error ? e.message : 'Image upload failed')
        setUploadProgress(0)
        return
      }
    }

    const url    = editingId ? `/api/admin/testimonials?id=${editingId}` : '/api/admin/testimonials'
    const method = editingId ? 'PATCH' : 'POST'
    const res    = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...values, asset_id: assetId ?? null }),
    })
    const json = await res.json()

    if (res.ok) {
      toast.success(editingId ? 'Testimonial updated' : 'Testimonial added')
      setDialogOpen(false)
      load(1)
    } else {
      toast.error((json as { error?: string }).error ?? 'Save failed')
    }
  }

  async function deleteItem(id: string) {
    const res = await fetch(`/api/admin/testimonials?id=${id}`, { method: 'DELETE' })
    if (res.ok) { toast.success('Testimonial removed'); load(1) }
    else { const j = await res.json() as { error?: string }; toast.error(j.error ?? 'Delete failed') }
  }

  async function toggleActive(item: AdminTestimonialItem) {
    const res = await fetch(`/api/admin/testimonials?id=${item.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ is_active: !item.is_active }),
    })
    if (res.ok) {
      setItems(prev => prev.map(i => i.id === item.id ? { ...i, is_active: !i.is_active } : i))
    } else {
      toast.error('Failed to update visibility')
    }
  }

  const filtered = search
    ? items.filter(i => {
        const q = search.toLowerCase()
        return (
          i.parent_name.toLowerCase().includes(q) ||
          i.quote.toLowerCase().includes(q) ||
          i.child_year.toLowerCase().includes(q)
        )
      })
    : items

  return (
    <>
      <AdminHeader title="Parent Testimonials" />

      <main className="admin-page space-y-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-foreground">Parent Testimonials</h2>
            <p className="text-sm text-muted-foreground mt-0.5">
              Manage testimonials shown on the home page and community page.
              {total > 0 && ` ${total} testimonial${total !== 1 ? 's' : ''} total.`}
            </p>
          </div>
          {canCreate && (
            <Button size="sm" onClick={openCreate} className="shrink-0">
              <Plus className="w-3.5 h-3.5 mr-1.5" /> Add Testimonial
            </Button>
          )}
        </div>

        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
          <Input
            placeholder="Search by name, quote, or year level…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-9"
          />
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-52 rounded-xl" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <MessageSquare className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p className="text-sm font-medium">
              {search ? 'No testimonials match your search.' : 'No testimonials yet.'}
            </p>
            {!search && canCreate && (
              <p className="text-xs mt-1">Add the first parent voice to inspire prospective families.</p>
            )}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((item) => (
                <TestimonialCard
                  key={item.id}
                  item={item}
                  canEdit={canEdit}
                  canDelete={canDelete}
                  onEdit={openEdit}
                  onDelete={deleteItem}
                  onToggleActive={toggleActive}
                />
              ))}
            </div>

            {!search && hasMore && (
              <div className="flex justify-center pt-2">
                <Button
                  variant="outline"
                  onClick={() => load(page + 1, true)}
                  disabled={loadingMore}
                  className="min-w-32"
                >
                  {loadingMore
                    ? <><Loader2 className="w-3.5 h-3.5 mr-2 animate-spin" /> Loading…</>
                    : 'Load more'}
                </Button>
              </div>
            )}
          </>
        )}
      </main>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingId ? 'Edit Testimonial' : 'Add Testimonial'}</DialogTitle>
            <DialogDescription>
              {editingId ? 'Update this parent testimonial.' : 'Add a new parent voice to feature on the website.'}
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-1">
              <div className="space-y-1.5">
                <Label>Photo</Label>
                <DropZone
                  preview={imagePreview}
                  onFile={handleImageFile}
                  onClear={() => { setImageFile(null); setImagePreview(null); setPendingAssetId(null) }}
                  disabled={isSubmitting}
                  height={150}
                />
                {uploadProgress > 0 && uploadProgress < 100 && (
                  <Progress value={uploadProgress} className="h-1.5" />
                )}
              </div>

              <FormField
                control={form.control}
                name="parent_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Parent Name *</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="e.g. Abena Mensah" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="child_year"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Child Year Level</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="e.g. Year 3, Little Angels, Year 1 & Year 4" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="quote"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quote *</FormLabel>
                    <FormControl>
                      <Textarea {...field} rows={4} placeholder="What do they say about HDM?" />
                    </FormControl>
                    <p className="text-right text-[11px] text-muted-foreground">{field.value.length}/1000</p>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="is_active"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-3 rounded-lg border border-border p-3">
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <div className="flex flex-col gap-0.5">
                      <FormLabel className="!mt-0">Published</FormLabel>
                      <p className="text-xs text-muted-foreground">Show this testimonial on the website</p>
                    </div>
                  </FormItem>
                )}
              />

              <DialogFooter className="pt-2">
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting
                    ? <><Loader2 className="w-3.5 h-3.5 mr-2 animate-spin" /> Saving…</>
                    : <><Save className="w-3.5 h-3.5 mr-2" />{editingId ? 'Update' : 'Add Testimonial'}</>}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  )
}
