'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
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
import { PostContentBlocks } from './post-content-blocks'
import { PostSidebarPanel } from './post-sidebar-panel'
import { CoverImageUpload } from './cover-image-upload'
import { CATEGORIES, slugify } from './news-data'

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

export function NewPostClient() {
  const router = useRouter()
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

  async function onSubmit(values: PostValues) {
    const slug = slugify(values.headline)
    const categoryLabel = CATEGORIES.find((c) => c.value === values.category)?.label ?? ''

    const res = await fetch('/api/admin/news', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...values,
        slug,
        category_label: categoryLabel,
        cover_asset_id: coverAssetId ?? undefined,
      }),
    })

    const json = await res.json()
    if (res.ok) {
      toast.success('Post published!')
      router.push('/admin/news')
    } else {
      toast.error(json.error ?? 'Failed to publish post')
    }
  }

  return (
    <>
      <AdminHeader title="New Post" backHref="/admin/news" />

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
                      ? <><Loader2 className="w-3.5 h-3.5 mr-2 animate-spin" /> Publishing...</>
                      : <><Save className="w-3.5 h-3.5 mr-2" /> Publish Post</>}
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
