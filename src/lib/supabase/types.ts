export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface MediaAssetMetadata {
  description?: string
  date_taken?: string
  location?: string
  people?: string[]
  department?: string
  tags?: string[]
  event_name?: string
  year?: number
  quote?: string
  photographer?: string
}

export interface Database {
  public: {
    Tables: {
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

      audit_logs: {
        Row: {
          id: string
          admin_id: string
          admin_email: string
          action: 'invite' | 'create' | 'update' | 'delete' | 'verify'
          resource: string
          resource_id: string | null
          details: Record<string, unknown>
          created_at: string
        }
        Insert: {
          id?: string
          admin_id: string
          admin_email: string
          action: 'invite' | 'create' | 'update' | 'delete' | 'verify'
          resource: string
          resource_id?: string | null
          details?: Record<string, unknown>
          created_at?: string
        }
        Update: Partial<Database['public']['Tables']['audit_logs']['Insert']>
      }

      parent_testimonials: {
        Row: {
          id: string
          parent_name: string
          child_year: string
          quote: string
          asset_id: string | null
          is_active: boolean
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          parent_name: string
          child_year?: string
          quote: string
          asset_id?: string | null
          is_active?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Database['public']['Tables']['parent_testimonials']['Insert']>
      }
    }

    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
  }
}

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
export type AdminProfileRow         = Database['public']['Tables']['admin_profiles']['Row']
export type ParentTestimonialRow    = Database['public']['Tables']['parent_testimonials']['Row']
