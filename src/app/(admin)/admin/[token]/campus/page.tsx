import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { getCurrentAdmin } from '@/lib/admin/auth'
import { AdminHeader } from '@/components/admin/admin-header'
import { Images, Building2 } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
    title: 'Campus Content | Admin',
    description: 'Manage campus photos and facility images.',
}

export default async function CampusAdminPage({
    params,
}: {
    params: Promise<{ token: string }>
}) {
    const { token } = await params
    const admin = await getCurrentAdmin()
    if (!admin) redirect(`/login/${token}`)

    const base = `/admin/${token}`

    const cards = [
        {
            href: `${base}/campus/photo-strip`,
            icon: Images,
            title: 'Photo Strip',
            description: 'Scrolling photo strip shown on the home page landing section.',
        },
        {
            href: `${base}/campus/facilities`,
            icon: Building2,
            title: 'Campus Facilities',
            description: 'Learning spaces, outdoor areas, and support facilities for the campus life page.',
        },
    ]

    return (
        <>
            <AdminHeader title="Campus Content" />
            <main className="admin-page space-y-6">
                <div>
                    <h2 className="text-xl font-bold">Campus Content</h2>
                    <p className="text-sm text-muted-foreground mt-0.5">
                        Manage images and content for campus-related sections of the website.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {cards.map(({ href, icon: Icon, title, description }) => (
                        <Link
                            key={href}
                            href={href}
                            className="group rounded-xl border border-border bg-muted/30 p-6 flex items-start gap-4 hover:border-secondary hover:bg-muted/60 transition-all duration-200"
                        >
                            <div className="p-2.5 rounded-lg bg-secondary/10 text-secondary shrink-0 group-hover:bg-secondary/20 transition-colors">
                                <Icon className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="font-semibold text-sm">{title}</p>
                                <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{description}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </main>
        </>
    )
}
