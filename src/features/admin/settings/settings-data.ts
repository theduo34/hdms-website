export const SETTING_SECTIONS = [
  {
    title: 'Contact Information',
    description: 'Displayed in the footer and contact page.',
    keys: [
      { key: 'admissions_email', label: 'Admissions Email', type: 'email' },
      { key: 'admissions_phone_1', label: 'Primary Phone', type: 'tel' },
      { key: 'admissions_phone_2', label: 'Secondary Phone', type: 'tel' },
      { key: 'whatsapp_number', label: 'WhatsApp Number', type: 'tel' },
    ],
  },
  {
    title: 'School Location',
    description: 'Used for the map on the contact page.',
    keys: [
      { key: 'address', label: 'Address', type: 'text' },
      { key: 'latitude', label: 'Latitude', type: 'text' },
      { key: 'longitude', label: 'Longitude', type: 'text' },
    ],
  },
  {
    title: 'Social Media',
    description: 'Links shown in the footer.',
    keys: [
      { key: 'facebook_url', label: 'Facebook URL', type: 'url' },
      { key: 'instagram_url', label: 'Instagram URL', type: 'url' },
      { key: 'youtube_url', label: 'YouTube URL', type: 'url' },
    ],
  },
  {
    title: 'Admissions',
    description: 'Open day and application dates.',
    keys: [
      { key: 'open_day_date', label: 'Open Day Date', type: 'text' },
      { key: 'application_deadline', label: 'Application Deadline', type: 'text' },
      { key: 'admissions_open', label: 'Admissions Open (true/false)', type: 'text' },
    ],
  },
]
