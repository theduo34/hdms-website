import { Phone, Mail, MapPin, Clock, Users, ClipboardList } from 'lucide-react'
import { cn } from '@/lib/utils'

export const sectionTag = "flex items-center gap-3 mb-5 text-[0.65rem] tracking-[0.25em] uppercase font-semibold text-secondary before:content-[''] before:block before:w-6 before:h-px before:bg-secondary before:shrink-0"

const ICONS = {
    phone:     Phone,
    mail:      Mail,
    mappin:    MapPin,
    clock:     Clock,
    users:     Users,
    clipboard: ClipboardList,
} as const

type IconKey = keyof typeof ICONS

export function SectionIcon({ name, className }: { name: string; className?: string }) {
    const Icon = ICONS[name as IconKey]
    if (!Icon) return null
    return <Icon className={cn('w-4 h-4 shrink-0', className)} aria-hidden />
}
