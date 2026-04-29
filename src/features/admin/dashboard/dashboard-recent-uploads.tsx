import Link from 'next/link'
import Image from 'next/image'
import { ImageIcon, ArrowRight, ExternalLink } from 'lucide-react'
import { getMediaUrl } from '@/lib/media'
import type { RecentPhoto } from './dashboard-types'

interface DashboardRecentUploadsProps {
  assets: RecentPhoto[]
  base: string
}

export function DashboardRecentUploads({ assets, base }: DashboardRecentUploadsProps) {
  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-4 rounded-full bg-secondary" />
          <h3 className="text-sm font-semibold text-foreground">Recent Photos</h3>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="/gallery"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1 transition-colors"
            aria-label="View public gallery in new tab"
          >
            Public gallery <ExternalLink className="w-3 h-3" />
          </a>
          <Link
            href={`${base}/gallery`}
            className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1 transition-colors"
          >
            View all <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>

      {assets.length === 0 ? (
        <div className="px-5 py-10 text-center">
          <ImageIcon className="w-8 h-8 mx-auto mb-2 text-muted-foreground/25" />
          <p className="text-sm text-muted-foreground">No photos uploaded yet.</p>
          <Link href={`${base}/gallery/upload`} className="text-xs text-primary hover:underline mt-1 inline-block">
            Upload your first photo
          </Link>
        </div>
      ) : (
        <div className="p-4 grid grid-cols-3 gap-2">
          {assets.map((photo) => (
            <div
              key={photo.id}
              className="relative aspect-[4/3] rounded-lg overflow-hidden bg-muted group ring-1 ring-border/50 hover:ring-primary/20 transition-all"
            >
              {photo.asset?.storage_path ? (
                <Image
                  src={getMediaUrl(photo.asset.storage_path)}
                  alt={photo.asset.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 33vw, 15vw"
                  loading="lazy"
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <ImageIcon className="w-5 h-5 text-muted-foreground/30" />
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {assets.length > 0 && (
        <div className="px-5 pb-4">
          <Link
            href={`${base}/gallery/upload`}
            className="text-xs text-primary hover:underline"
          >
            + Upload more photos
          </Link>
        </div>
      )}
    </div>
  )
}
