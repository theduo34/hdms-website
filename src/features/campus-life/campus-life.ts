// ─── Side-nav sections ────────────────────────────────────────────
export const schoolDaySideNavSections = [
    {id: 'schedule', label: 'Daily Schedule'},
    {id: 'work-cycle', label: 'Work Cycle'},
    {id: 'meals', label: 'Meals'},
]

export const sportsSideNavSections = [
    {id: 'sports', label: 'Sports & PE'},
    {id: 'clubs', label: 'After-School Clubs'},
]

export const facilitiesSideNavSections = [
    {id: 'learning', label: 'Learning Spaces'},
    {id: 'outdoor', label: 'Outdoor & Sports'},
    {id: 'support', label: 'Support Facilities'},
]

export const wellbeingSideNavSections = [
    {id: 'pastoral', label: 'Pastoral Care'},
    {id: 'health', label: 'Health & Safety'},
    {id: 'nutrition', label: 'Nutrition'},
]

// ─── School Day ───────────────────────────────────────────────────
export const schoolDaySchedule = [
    {
        time: '7:30 AM',
        label: 'Gates Open & Arrival',
        desc: 'Children arrive and settle into their prepared classroom environments.'
    },
    {
        time: '7:50 AM',
        label: 'Morning Assembly',
        desc: 'School-wide gathering for prayer, the national pledge, notices, and community time.'
    },
    {time: '8:10 AM', label: 'Morning Work Cycle', desc: 'The three-hour uninterrupted Montessori work period begins.'},
    {
        time: '10:30 AM',
        label: 'Break & Morning Snack',
        desc: 'Children enjoy a nutritious snack and outdoor free play.'
    },
    {
        time: '11:00 AM',
        label: 'Afternoon Work Cycle',
        desc: 'Self-directed work continues alongside group activities and specialist lessons.'
    },
    {
        time: '12:30 PM',
        label: 'Lunch',
        desc: 'A hot, freshly prepared school lunch served together in the dining hall.'
    },
    {
        time: '1:15 PM',
        label: 'Quiet Time & Reading',
        desc: 'Independent reading, journaling, or rest time for younger children.'
    },
    {
        time: '1:45 PM',
        label: 'Specialist & Enrichment',
        desc: 'French, ICT, Physical Education, and the Arts rotate through the week.'
    },
    {time: '2:30 PM', label: 'End of Day Assembly', desc: 'Reflection, tidy-up, and preparation for dismissal.'},
    {
        time: '3:00 PM',
        label: 'Dismissal',
        desc: 'Children are collected by parents or guardians, or proceed to After School clubs.'
    },
]

export const workCyclePillars = [
    {
        number: '01',
        title: 'Uninterrupted Focus',
        description: 'A three-hour block of self-directed work gives every child freedom to concentrate deeply - no constant bells or transitions - building genuine focus and intrinsic motivation.',
    },
    {
        number: '02',
        title: 'Child-Led Learning',
        description: 'Children choose their own work from the prepared environment. This autonomy builds confidence, responsibility, and a lifelong love of discovery.',
    },
    {
        number: '03',
        title: 'Guided Observation',
        description: "Teachers observe and offer individual lessons at precisely the right moment - never interrupting a child's flow, always nurturing the next step in their unique journey.",
    },
]

export const mealsInfo = [
    {
        label: 'Morning Snack',
        time: '10:30 AM',
        description: 'A light, nutritious snack - fresh fruit, biscuits, or a light bite - served during the mid-morning break.',
    },
    {
        label: 'School Lunch',
        time: '12:30 PM',
        description: 'A hot, balanced meal prepared fresh daily. Menus rotate weekly and include Ghanaian staples alongside international dishes.',
    },
    {
        label: 'Dietary Needs',
        time: 'By arrangement',
        description: 'We accommodate allergies and dietary requirements. Please inform the school office at the time of enrolment.',
    },
]

// ─── Sports & Clubs ───────────────────────────────────────────────
export const sportsActivities = [
    {
        name: 'Football',
        description: "Boys' and girls' teams compete in inter-school leagues across the Eastern Region.",
        image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600&q=80',
    },
    {
        name: 'Athletics',
        description: 'Track and field events - sprints, relays, long jump, and shot put for all year groups.',
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80',
    },
    {
        name: 'Basketball',
        description: 'Weekly sessions building teamwork, coordination, and competitive spirit.',
        image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600&q=80',
    },
    {
        name: 'Swimming',
        description: 'Swimming lessons and recreational sessions available for all year groups.',
        image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=600&q=80',
    },
    {
        name: 'Table Tennis',
        description: 'Available in the recreation area during break and in After School hours.',
        image: 'https://images.unsplash.com/photo-1611251135345-18c56206b863?w=600&q=80',
    },
    {
        name: 'Physical Education',
        description: 'Structured PE lessons every week for all year groups, building fitness and motor skills.',
        image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&q=80',
    },
]

// ─── Facilities ───────────────────────────────────────────────────
export const learningSpaces = [
    {
        name: 'Montessori Classrooms',
        description: 'Prepared environments filled with authentic Montessori materials, designed to invite independent exploration and deep concentration.',
        image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=700&q=80',
    },
    {
        name: 'Library & Reading Corner',
        description: 'A calm, well-stocked reading space with over 1,000 curated titles - from picture books for Little Angels to chapter books for Year 6.',
        image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=700&q=80',
    },
    {
        name: 'ICT Laboratory',
        description: 'A modern computer lab providing digital literacy, coding basics, and educational technology from Reception through Year 6.',
        image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=700&q=80',
    },
]

export const outdoorSpaces = [
    {
        name: 'Playground',
        description: 'Spacious outdoor play areas with climbing structures, a sand pit, and shaded zones - designed for active, imaginative play.',
        image: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=700&q=80',
    },
    {
        name: 'Sports Field',
        description: 'A full-size grass pitch used for football, athletics, and whole-school sports events. Home of our inter-school competitions.',
        image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=700&q=80',
    },
]

export const supportSpaces = [
    {
        name: 'Dining Hall',
        description: 'A bright, welcoming dining space where children enjoy freshly prepared meals together - building community and good habits around the table.',
        image: 'https://images.unsplash.com/photo-1567521464027-f127ff144326?w=700&q=80',
    },
    {
        name: 'Medical Room',
        description: "A dedicated health room staffed by a qualified nurse during school hours, ensuring every child's wellbeing is always attended to.",
        image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=700&q=80',
    },
]

// ─── Wellbeing ────────────────────────────────────────────────────
export const pastoralPillars = [
    {
        number: '01',
        title: 'House System',
        description: 'Every child belongs to one of our four school houses - each with its own pastoral team, form tutors, and community activities. Houses create belonging from day one.',
    },
    {
        number: '02',
        title: 'Form Tutors',
        description: 'Each class has a dedicated form tutor who knows every child personally - monitoring wellbeing, communicating with families, and providing daily pastoral support.',
    },
    {
        number: '03',
        title: 'Peace Education',
        description: "Montessori's emphasis on conflict resolution, community responsibility, and social-emotional learning is woven into daily life - not just a lesson on the timetable.",
    },
]

export const healthFacts = [
    {
        label: 'School Nurse',
        detail: 'A qualified school nurse is on campus every school day to attend to health concerns and maintain up-to-date medical records.'
    },
    {
        label: 'First Aid',
        detail: 'All teachers hold valid Paediatric First Aid certificates. First aid kits are accessible in every block.'
    },
    {
        label: 'Medical Policy',
        detail: 'Parents are contacted immediately for any health concern. Prescription medication may be administered by the nurse with written parental consent.'
    },
    {
        label: 'Vaccinations',
        detail: 'We support national immunisation campaigns and maintain vaccination records for every enrolled child.'
    },
]

export const nutritionFacts = [
    {
        label: 'Fresh & Local',
        description: 'School meals are prepared fresh daily using locally sourced ingredients - supporting Ghanaian farmers and giving children the best quality food.',
    },
    {
        label: 'Balanced Menus',
        description: 'Our weekly menu is reviewed by a nutritionist to ensure every meal meets the energy and nutritional needs of growing children.',
    },
    {
        label: 'Dietary Needs',
        description: 'We accommodate allergies, intolerances, and cultural dietary requirements. Please inform the school office at enrolment.',
    },
]
