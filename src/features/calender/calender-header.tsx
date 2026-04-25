'use client'

import { PageHeader } from '@/components/shared/page-header'
import { getAcademicYear } from '@/lib/utils'

export function CalenderHeader() {
    const { label, endYear } = getAcademicYear()

    return (
        <PageHeader
            iconName="calendardays"
            label={label}
            headingLine1="School"
            headingLine2="Calendar."
            watermark={String(endYear)}
            description="Stay on top of term dates, school events, examinations, and holidays across the full academic year."
            accentLine
        />
    )
}
