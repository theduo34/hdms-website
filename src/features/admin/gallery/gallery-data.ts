import { CalendarDays, GraduationCap, Building2, Users2, FolderOpen } from 'lucide-react'
import type { ComponentType } from 'react'

export interface PhotoCategory {
  slug: string | null
  label: string
  icon: ComponentType<{ className?: string }>
  // Folder path inside the storage bucket (under the `media` bucket root)
  folder: string
  // Whether the final path includes a year segment: gallery/events/2025/
  hasYear: boolean
  description: string
}

// Mirrors the storage bucket structure under media/
// - hasYear: true  → media/{folder}/{year}/{filename}
// - hasYear: false → media/{folder}/{filename}
export const PHOTO_CATEGORIES: PhotoCategory[] = [
  {
    slug: 'events',
    label: 'Events',
    icon: CalendarDays,
    folder: 'gallery/events',
    hasYear: true,
    description: 'School events and ceremonies',
  },
  {
    slug: 'student-activities',
    label: 'Student Activities',
    icon: GraduationCap,
    folder: 'gallery/student-activities',
    hasYear: true,
    description: 'Classroom and extracurricular',
  },
  {
    slug: 'campus',
    label: 'Campus',
    icon: Building2,
    folder: 'gallery/campus',
    hasYear: false,
    description: 'School grounds and facilities',
  },
  {
    slug: 'staff',
    label: 'Staff',
    icon: Users2,
    folder: 'gallery/staff',
    hasYear: true,
    description: 'Teachers and staff members',
  },
  {
    slug: null,
    label: 'General',
    icon: FolderOpen,
    folder: 'gallery/uploads',
    hasYear: false,
    description: 'Uncategorised uploads',
  },
]
