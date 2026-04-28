import { Phone, MapPin, Globe, CalendarDays } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export interface SettingKey {
  key: string
  label: string
  type: string
  hint?: string
}

export interface SettingSection {
  title: string
  description: string
  icon: LucideIcon
  keys: SettingKey[]
}

export const SETTING_SECTIONS: SettingSection[] = [
  {
    title: 'Contact Information',
    description: 'Displayed in the footer and on the contact page.',
    icon: Phone,
    keys: [
      { key: 'admissions_email',   label: 'Admissions Email',  type: 'email' },
      { key: 'admissions_phone_1', label: 'Primary Phone',     type: 'tel' },
      { key: 'admissions_phone_2', label: 'Secondary Phone',   type: 'tel' },
      { key: 'whatsapp_number',    label: 'WhatsApp Number',   type: 'tel' },
    ],
  },
  {
    title: 'School Location',
    description: 'Used for the map on the contact page.',
    icon: MapPin,
    keys: [
      { key: 'address',   label: 'Address',   type: 'text' },
      { key: 'latitude',  label: 'Latitude',  type: 'text', hint: 'e.g. 6.094' },
      { key: 'longitude', label: 'Longitude', type: 'text', hint: 'e.g. -0.259' },
    ],
  },
  {
    title: 'Social Media',
    description: 'Links shown in the site footer.',
    icon: Globe,
    keys: [
      { key: 'facebook_url',  label: 'Facebook URL',  type: 'url' },
      { key: 'instagram_url', label: 'Instagram URL', type: 'url' },
      { key: 'youtube_url',   label: 'YouTube URL',   type: 'url' },
    ],
  },
  {
    title: 'Admissions',
    description: 'Open day and application window dates.',
    icon: CalendarDays,
    keys: [
      { key: 'open_day_date',          label: 'Open Day Date',         type: 'text', hint: 'e.g. Saturday, 15 March 2025' },
      { key: 'application_deadline',   label: 'Application Deadline',  type: 'text' },
      { key: 'admissions_open',        label: 'Admissions Open',       type: 'text', hint: 'true or false' },
    ],
  },
]
