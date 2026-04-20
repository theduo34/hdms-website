export const contactInfo = {
    address: {
        street: 'New Juaben Municipality',
        city: 'Koforidua',
        region: 'Eastern Region',
        country: 'Ghana',
        full: 'New Juaben Municipality, Koforidua, Eastern Region, Ghana',
        mapsUrl: 'https://maps.google.com/?q=Koforidua,+Eastern+Region,+Ghana',
    },
    phone: {
        primary: process.env.NEXT_PUBLIC_ADMISSIONS_PHONE_1 as string,
        secondary: process.env.NEXT_PUBLIC_ADMISSIONS_PHONE_1 as string,
    },
    email: {
        general: 'info@hdm.edu.gh',
        admissions: 'admissions@hdm.edu.gh',
    },
    hours: {
        weekdays: 'Monday – Friday',
        time: '7:30 AM – 3:30 PM',
        note: 'Office closed on public holidays',
    },
    social: {
        facebook: 'https://facebook.com',
        instagram: 'https://instagram.com',
        twitter: 'https://twitter.com',
    },
} as const

export const subjectOptions = [
    'General Enquiry',
    'Admissions Information',
    'Campus Visit',
    'Programmes & Curriculum',
    'Fees & Tuition',
    'Other',
]

export const quickLinks = [
    { label: 'Apply for Admission', href: '/admissions/apply', description: 'Start your child\'s application online today.' },
    { label: 'Visit Our Campus', href: '/admissions/visit-campus', description: 'Book a guided tour of our Koforidua campus.' },
    { label: 'View Programmes', href: '/programmes', description: 'Explore our curriculum from Little Angels to Year 7.' },
]
