// src/lib/supabase/types.ts
//
// Manually-maintained Database type that mirrors 001_schema.sql.
// When you add/change a column in a migration, update the matching Row/Insert/Update here.
//
// To auto-generate in the future (once Supabase CLI is set up):
//   npx supabase gen types typescript --project-id <id> > src/lib/supabase/types.ts

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

// ─── Per-table metadata shapes ───────────────────────────────────────────────

// Metadata stored in the media_assets.metadata JSONB column.
// All fields are optional — fill in what you have at upload time.
export interface MediaAssetMetadata {
  // ── Core details ─────────────────────────────────────────────────────────
  description?: string   // longer text shown in lightbox / gallery caption
  date_taken?: string    // ISO date the photo was actually taken: "2025-11-28"
  location?: string      // physical location: "Main Hall", "Sports Field"
  // ── People / departments ──────────────────────────────────────────────────
  people?: string[]      // names of people pictured: ["Mrs. Charlotte Owusu"]
  department?: string    // associated department: "Preschool", "Upper Primary"
  // ── Tagging ───────────────────────────────────────────────────────────────
  tags?: string[]        // freeform tags: ["sports-day", "inter-house", "2025"]
  event_name?: string    // named event: "Speech and Prize Giving Day 2025"
  year?: number          // year the media was captured — used for storage path and filtering
  // ── Display extras ────────────────────────────────────────────────────────
  quote?: string         // optional pull-quote to show with the image
  photographer?: string  // credit line shown in lightbox
}

// ─── Database type ────────────────────────────────────────────────────────────

export interface Database {
  public: {
    Tables: {
      // ── MEDIA ──────────────────────────────────────────────────────────────

      media_assets: {
        Row: {
          id: string
          storage_path: string | null
          alt: string
          title: string | null
          width: number | null
          height: number | null
          mime_type: string
          file_size: number | null
          metadata: MediaAssetMetadata
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          storage_path?: string | null
          alt: string
          title?: string | null
          width?: number | null
          height?: number | null
          mime_type?: string
          file_size?: number | null
          metadata?: MediaAssetMetadata
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Database['public']['Tables']['media_assets']['Insert']>
      }

      media_categories: {
        Row: {
          id: string
          slug: string
          label: string
          parent_id: string | null
          domain: 'gallery_photos' | 'gallery_videos' | 'gallery_events'
          sort_order: number
        }
        Insert: {
          id?: string
          slug: string
          label: string
          parent_id?: string | null
          domain: 'gallery_photos' | 'gallery_videos' | 'gallery_events'
          sort_order?: number
        }
        Update: Partial<Database['public']['Tables']['media_categories']['Insert']>
      }

      gallery_photos: {
        Row: {
          id: string
          asset_id: string
          category_id: string | null
          featured: boolean
          sort_order: number
          created_at: string
        }
        Insert: {
          id?: string
          asset_id: string
          category_id?: string | null
          featured?: boolean
          sort_order?: number
          created_at?: string
        }
        Update: Partial<Database['public']['Tables']['gallery_photos']['Insert']>
      }

      gallery_videos: {
        Row: {
          id: string
          thumbnail_asset_id: string | null
          category_id: string | null
          title: string
          alt: string
          video_url: string
          duration: string | null
          width: number | null
          height: number | null
          created_at: string
        }
        Insert: {
          id?: string
          thumbnail_asset_id?: string | null
          category_id?: string | null
          title: string
          alt?: string
          video_url: string
          duration?: string | null
          width?: number | null
          height?: number | null
          created_at?: string
        }
        Update: Partial<Database['public']['Tables']['gallery_videos']['Insert']>
      }

      gallery_events: {
        Row: {
          id: string
          title: string
          description: string | null
          event_date: string
          category_id: string | null
          cover_asset_id: string | null
          photo_count: number
          video_count: number
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          event_date: string
          category_id?: string | null
          cover_asset_id?: string | null
          photo_count?: number
          video_count?: number
          created_at?: string
        }
        Update: Partial<Database['public']['Tables']['gallery_events']['Insert']>
      }

      gallery_event_photos: {
        Row: {
          event_id: string
          photo_id: string
          sort_order: number
        }
        Insert: {
          event_id: string
          photo_id: string
          sort_order?: number
        }
        Update: Partial<Database['public']['Tables']['gallery_event_photos']['Insert']>
      }

      // ── CONTENT ────────────────────────────────────────────────────────────

      news_posts: {
        Row: {
          id: string
          slug: string
          category: 'news' | 'announcement' | 'event' | 'press'
          category_label: string
          headline: string
          excerpt: string
          author: string
          cover_asset_id: string | null
          content: Array<{ type: 'paragraph' | 'pullquote'; text: string }>
          featured: boolean
          published_at: string
        }
        Insert: {
          id?: string
          slug: string
          category: 'news' | 'announcement' | 'event' | 'press'
          category_label?: string
          headline: string
          excerpt?: string
          author?: string
          cover_asset_id?: string | null
          content?: Array<{ type: 'paragraph' | 'pullquote'; text: string }>
          featured?: boolean
          published_at?: string
        }
        Update: Partial<Database['public']['Tables']['news_posts']['Insert']>
      }

      announcements: {
        Row: {
          id: string
          title: string
          description: string
          urgency: 'new' | 'urgent' | 'info' | 'reminder'
          urgency_label: string
          posted_at: string
          expires_at: string | null
        }
        Insert: {
          id?: string
          title: string
          description?: string
          urgency: 'new' | 'urgent' | 'info' | 'reminder'
          urgency_label?: string
          posted_at?: string
          expires_at?: string | null
        }
        Update: Partial<Database['public']['Tables']['announcements']['Insert']>
      }

      // ── CALENDAR ───────────────────────────────────────────────────────────

      academic_terms: {
        Row: {
          id: string
          name: string
          start_date: string
          end_date: string
          is_current: boolean
          is_break: boolean
        }
        Insert: {
          id: string
          name: string
          start_date: string
          end_date: string
          is_current?: boolean
          is_break?: boolean
        }
        Update: Partial<Database['public']['Tables']['academic_terms']['Insert']>
      }

      calendar_events: {
        Row: {
          id: string
          title: string
          date: string
          end_date: string | null
          time: string | null
          end_time: string | null
          location: string | null
          category: 'academic' | 'event' | 'holiday' | 'exam' | 'sports' | 'cultural'
          category_label: string
          description: string | null
          is_all_day: boolean
          is_highlight: boolean
        }
        Insert: {
          id: string
          title: string
          date: string
          end_date?: string | null
          time?: string | null
          end_time?: string | null
          location?: string | null
          category: 'academic' | 'event' | 'holiday' | 'exam' | 'sports' | 'cultural'
          category_label: string
          description?: string | null
          is_all_day?: boolean
          is_highlight?: boolean
        }
        Update: Partial<Database['public']['Tables']['calendar_events']['Insert']>
      }

      // ── SCHOOL DATA ────────────────────────────────────────────────────────

      staff_members: {
        Row: {
          id: string
          name: string
          role: string
          department: string | null
          bio: string | null
          initials: string | null
          asset_id: string | null
          sort_order: number
          is_active: boolean
        }
        Insert: {
          id?: string
          name: string
          role: string
          department?: string | null
          bio?: string | null
          initials?: string | null
          asset_id?: string | null
          sort_order?: number
          is_active?: boolean
        }
        Update: Partial<Database['public']['Tables']['staff_members']['Insert']>
      }

      admissions_faqs: {
        Row: {
          id: string
          question: string
          answer: string
          sort_order: number
        }
        Insert: {
          id?: string
          question: string
          answer: string
          sort_order?: number
        }
        Update: Partial<Database['public']['Tables']['admissions_faqs']['Insert']>
      }

      school_settings: {
        Row: {
          key: string
          value: string
          updated_at: string
        }
        Insert: {
          key: string
          value: string
          updated_at?: string
        }
        Update: Partial<Database['public']['Tables']['school_settings']['Insert']>
      }

      // ── ADMIN ──────────────────────────────────────────────────────────────

      admin_profiles: {
        Row: {
          id: string
          role: 'super_admin' | 'support_admin' | 'school_admin'
          display_name: string
          email: string
          verified: boolean
          created_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          role: 'super_admin' | 'support_admin' | 'school_admin'
          display_name: string
          email: string
          verified?: boolean
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Database['public']['Tables']['admin_profiles']['Insert']>
      }
    }

    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
  }
}

// ─── Convenience row-type aliases ─────────────────────────────────────────────

export type MediaAssetRow      = Database['public']['Tables']['media_assets']['Row']
export type MediaCategoryRow   = Database['public']['Tables']['media_categories']['Row']
export type GalleryPhotoRow    = Database['public']['Tables']['gallery_photos']['Row']
export type GalleryVideoRow    = Database['public']['Tables']['gallery_videos']['Row']
export type GalleryEventRow    = Database['public']['Tables']['gallery_events']['Row']
export type NewsPostRow        = Database['public']['Tables']['news_posts']['Row']
export type AnnouncementRow    = Database['public']['Tables']['announcements']['Row']
export type AcademicTermRow    = Database['public']['Tables']['academic_terms']['Row']
export type CalendarEventRow   = Database['public']['Tables']['calendar_events']['Row']
export type StaffMemberRow     = Database['public']['Tables']['staff_members']['Row']
export type AdmissionsFaqRow   = Database['public']['Tables']['admissions_faqs']['Row']
export type SchoolSettingRow   = Database['public']['Tables']['school_settings']['Row']
export type AdminProfileRow    = Database['public']['Tables']['admin_profiles']['Row']
