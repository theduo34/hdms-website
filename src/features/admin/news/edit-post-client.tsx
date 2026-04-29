'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useAdminBase } from '@/hooks/use-admin-base'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { AdminHeader } from '@/components/admin/admin-header'
import { toast } from 'sonner'
import { Save, Loader2 } from 'lucide-react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { PostContentBlocks } from './post-content-blocks'
import { PostSidebarPanel } from './post-sidebar-panel'
import { CoverImageUpload } from './cover-image-upload'
import { CATEGORIES } from './news-data'

const postSchema = z.object({
  headline: z.string().min(1, 'Headline is required'),
  excerpt: z.string(),
  category: z.enum(['news', 'announcement', 'event', 'press']),
  featured: z.boolean(),
  content: z.array(z.object({
    type: z.enum(['paragraph', 'pullquote']),
    text: z.string(),
  })),
})

type PostValues = z.infer<typeof postSchema>

export function EditPostClient() {
  const base = useAdminBase()
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  const [fetching, setFetching] = useState(true)
  const [coverAssetId, setCoverAssetId] = useState<string | null>(null)
  const [coverPreview, setCoverPreview] = useState<string | null>(null)

  const form = useForm<PostValues>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      headline: '',
      excerpt: '',
      category: 'news',
      featured: false,
      content: [{ type: 'paragraph', text: '' }],
    },
  })

  const { isSubmitting } = form.formState

  useEffect(() => {
    async function load() {
      const res = await fetch(`/api/admin/news?id=${id}`)
      if (res.ok) {
        const post = await res.json()
        form.reset({
          headline: post.headline ?? '',
          excerpt: post.excerpt ?? '',
          category: post.category ?? 'news',
          featured: post.featured ?? false,
          content: post.content?.length ? post.content : [{ type: 'paragraph', text: '' }],
        })
        if (post.cover_asset_id) {
          setCoverAssetId(post.cover_asset_id)
        }
        if (post.cover?.storage_path) {
          setCoverPreview(post.cover.storage_path)
        }
      }
      setFetching(false)
    }
    load()
  }, [id, form])

  async function onSubmit(values: PostValues) {
    const categoryLabel = CATEGORIES.find((c) => c.value === values.category)?.label ?? ''
    const res = await fetch(`/api/admin/news?id=${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...values,
        category_label: categoryLabel,
        cover_asset_id: coverAssetId ?? null,
      }),
    })

    const json = await res.json()
    if (res.ok) {
      toast.success('Post updated!')
      router.push('/admin/news')
    } else {
      toast.error(json.error ?? 'Update failed')
    }
  }

  if (fetching) {
    return (
      <>
        <AdminHeader title="Edit Post" backHref={`${base}/news`} />
        <main className="admin-page space-y-4">
          <Skeleton className="aspect-[21/9] w-full rounded-xl" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-32 w-full" />
        </main>
      </>
    )
  }

  return (
    <>
      <AdminHeader title="Edit Post" backHref={`${base}/news`} />

      <main className="admin-page">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-5">
                <CoverImageUpload
                  value={coverAssetId}
                  previewUrl={coverPreview}
                  onChange={setCoverAssetId}
                  onPreviewChange={setCoverPreview}
                />

                <FormField
                  control={form.control}
                  name="headline"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Headline *</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter the post headline..." />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="excerpt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Excerpt</FormLabel>
                      <FormControl>
                        <Textarea {...field} placeholder="Short summary shown in article listings..." rows={2} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <PostContentBlocks />
              </div>

              <PostSidebarPanel
                submitSlot={
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting
                      ? <><Loader2 className="w-3.5 h-3.5 mr-2 animate-spin" /> Saving...</>
                      : <><Save className="w-3.5 h-3.5 mr-2" /> Save Changes</>}
                  </Button>
                }
              />
            </div>
          </form>
        </Form>
      </main>
    </>
  )
}
