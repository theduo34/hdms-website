export const applySideNavSections = [
    { id: 'how-to-apply', label: 'How to Apply' },
    { id: 'requirements', label: 'Requirements'  },
    { id: 'apply-now',    label: 'Apply Now'     },
    { id: 'faqs',         label: 'FAQs'          },
]

export const tuitionSideNavSections = [
    { id: 'fees', label: 'Fees & Tuition' },
    { id: 'faqs', label: 'FAQs'           },
]

export const visitSideNavSections = [
    { id: 'open-day', label: 'Open Day'  },
    { id: 'contact',  label: 'Contact Us' },
]

export const applicationSteps = [
    {
        stepNum: '01',
        title: 'Download or Request a Form',
        desc: "Pick up an application form from our front office, or download the PDF version from this page. Forms are available Monday to Friday, 7:30 AM – 3:30 PM.",
        note: 'Free of charge',
    },
    {
        stepNum: '02',
        title: 'Complete the Application',
        desc: "Fill in all sections - including the child's personal details, the programme you're applying for, and the parent/guardian information.",
        note: 'Takes approx. 15 minutes',
    },
    {
        stepNum: '03',
        title: 'Submit with Supporting Documents',
        desc: "Return the completed form together with all required documents to our admissions office, or email scanned copies to admissions@hdm.edu.gh.",
        note: 'In-person or by email',
    },
    {
        stepNum: '04',
        title: 'Interview & Confirmation',
        desc: "Our admissions team will review your application and contact you within 3 working days to schedule a brief visit. You'll receive a formal offer letter upon successful completion.",
        note: 'Within 3 working days',
    },
]

export const requirementsChild = [
    'Original birth certificate (and photocopy)',
    'Recent passport-sized photograph (×2)',
    'Immunisation / vaccination record',
    'Last school report (if transferring from another school)',
    'Any medical or special educational needs documentation',
]

export const requirementsParent = [
    'Completed application form',
    'National ID card or passport (photocopy)',
    'Proof of residence (utility bill or tenancy agreement)',
    'Emergency contact details for at least two persons',
]

export const programmeOptions = [
    'Toddler Programme (18 months – 3 years)',
    'Nursery (3 – 4 years)',
    'Kindergarten 1 (4 – 5 years)',
    'Kindergarten 2 (5 – 6 years)',
    'Primary 1 (Year 1)',
    'Primary 2 (Year 2)',
    'Primary 3 (Year 3)',
    'Primary 4 (Year 4)',
    'Primary 5 (Year 5)',
    'Primary 6 (Year 6)',
]

export const feesData = [
    { programme: 'Toddler',      range: '18 months – 3 yrs', registration: 'GHS 500', termly: 'GHS 1,800', annual: 'GHS 5,400' },
    { programme: 'Nursery',      range: '3 – 4 years',        registration: 'GHS 500', termly: 'GHS 2,000', annual: 'GHS 6,000' },
    { programme: 'Kindergarten', range: '4 – 6 years',        registration: 'GHS 500', termly: 'GHS 2,200', annual: 'GHS 6,600' },
    { programme: 'Primary',      range: 'Years 1 – 6',        registration: 'GHS 600', termly: 'GHS 2,400', annual: 'GHS 7,200' },
]

export const faqs = [
    {
        question: 'At what age can my child start at HDM?',
        answer: "We welcome children from 18 months in our Toddler Programme. Our earliest intake is for children who have reached 18 months by the start of the academic term they are applying for.",
    },
    {
        question: 'Is there an admissions test or assessment?',
        answer: "There is no formal academic test. Instead, we invite prospective pupils and their parents/guardians for a short informal visit so our teachers can meet your child in a relaxed setting.",
    },
    {
        question: 'Do you accept mid-term or mid-year admissions?',
        answer: "Yes, subject to available places. We assess mid-year applications on a case-by-case basis. Please contact our admissions office directly for availability.",
    },
    {
        question: 'Are there sibling discounts?',
        answer: "Yes. Families with two or more children enrolled at HDM are eligible for a sibling discount on termly tuition. Please contact our office for details.",
    },
    {
        question: "What is the school's policy on uniforms?",
        answer: "All pupils are required to wear the HDM uniform. Details - including where to purchase it - are provided in the welcome pack sent to all new families upon confirmation of a place.",
    },
    {
        question: 'Do you offer a school bus service?',
        answer: "We do not currently operate a school bus service. However, we can connect you with trusted private transport operators that serve families in our community.",
    },
]

// icon keys map to Lucide icons rendered in components
export const openDay = {
    month: 'May',
    day:   '17',
    year:  '2025',
    details: [
        { icon: 'clock',      label: 'Time',              text: '9:00 AM – 12:00 PM'                                                         },
        { icon: 'mappin',     label: 'Location',          text: "Heaven's Dew Montessori, Koforidua, Eastern Region"                          },
        { icon: 'users',      label: 'Who Should Attend', text: 'Prospective parents and guardians - children are welcome to join.'           },
        { icon: 'clipboard',  label: 'What to Expect',    text: 'Campus tour, classroom observations, Q&A with teachers and the headmistress.' },
    ],
}

const PHONE_1 = process.env.NEXT_PUBLIC_ADMISSIONS_PHONE_1 ?? '+233 24 497 4052'
const PHONE_2 = process.env.NEXT_PUBLIC_ADMISSIONS_PHONE_2 ?? '+233 20 123 4567'
const ADM_EMAIL = process.env.NEXT_PUBLIC_ADMISSIONS_EMAIL ?? 'admissions@hdm.edu.gh'

export const admissionsContact = [
    {
        icon: 'phone',
        label: 'Phone',
        lines: [
            { text: PHONE_1, href: `tel:${PHONE_1.replace(/\s/g, '')}` },
            { text: PHONE_2, href: `tel:${PHONE_2.replace(/\s/g, '')}` },
        ],
    },
    {
        icon: 'mail',
        label: 'Email',
        lines: [{ text: ADM_EMAIL, href: `mailto:${ADM_EMAIL}` }],
    },
    {
        icon: 'mappin',
        label: 'Address',
        lines: [
            { text: "Heaven's Dew Montessori" },
            { text: 'Koforidua, Eastern Region, Ghana' },
        ],
    },
    {
        icon: 'clock',
        label: 'Office Hours',
        lines: [{ text: 'Monday – Friday: 7:30 AM – 3:30 PM' }],
    },
]
