import { PageHeader } from '@/components/shared/page-header'

type IconName = 'clipboard' | 'banknote' | 'mappin'

interface Props {
    iconName:     IconName
    label:        string
    headingLine1: string
    headingLine2: string
    description:  string
    watermark:    string
}

export function AdmissionsPageHeader({ iconName, label, headingLine1, headingLine2, description, watermark }: Props) {
    return (
        <PageHeader
            iconName={iconName}
            label={label}
            headingLine1={headingLine1}
            headingLine2={headingLine2}
            watermark={watermark}
            description={description}
        />
    )
}
