'use client'

import { PageHeader } from '@/components/shared/page-header'

export function NewsHeader() {
    return (
        <PageHeader
            iconName="newspaper"
            label="Stay Informed"
            headingLine1="News &"
            headingLine2="Announcements."
            watermark="HDMs"
            description="The latest from Heaven's Dew Montessori - school news, event updates, important notices, and everything in between."
            accentLine
        />
    )
}
