export interface CurriculumItem {
  title: string
  description: string
}

export interface ProgrammeStats {
  ageRange: string
  classes: string
  hours: string
  perClass: string
}

export interface ClassInfo {
  name: string
  gemName?: string
  sections?: string[]
  sectionCount?: number
}

export interface ClubItem {
  name: string
  description: string
}

export interface Programme {
  id: string
  tabLabel: string
  sectionLabel: string
  heading: string
  description: string
  image: string
  stats: ProgrammeStats
  curriculum: CurriculumItem[]
  classes: ClassInfo[]
  ctaLabel: string
  ctaHref: string
}

export interface ClubCategory {
  title: string
  day: string
  clubs: ClubItem[]
}

export const clubActivities: ClubCategory[] = [
  {
    title: "Free Clubs",
    day: "Thursdays",
    clubs: [
      { name: "Little Shakespeare", description: "English & French literature and language exploration" },
      { name: "Little Mozart", description: "Music appreciation and fundamentals" },
      { name: "Little Einstein", description: "Science & Mathematics exploration" },
      { name: "Robotec", description: "Robotics & Technology fundamentals" },
      { name: "Pots & Pans", description: "Introduction to cooking" },
      { name: "Kids Craft", description: "Various creative crafting activities" },
    ],
  },
  {
    title: "Paid Clubs",
    day: "Fridays",
    clubs: [
      { name: "Taekwondo", description: "Martial arts training and discipline" },
      { name: "Drama", description: "Performance and theatrical skills" },
      { name: "Cadet", description: "Leadership and teamwork development" },
    ],
  },
]

export const programmes: Programme[] = [
  {
    id: "preschool",
    tabLabel: "Preschool",
    sectionLabel: "PRESCHOOL PROGRAMME",
    heading: "Where Learning\nBegins With Wonder",
    description:
      "Our Preschool programme is the foundation of everything we do at Heaven's Dew Montessori. Designed for children aged 18 months to 5 years, it is a carefully prepared environment where the youngest learners are free to explore, discover, and grow at their own natural pace. Every activity, every material, and every interaction is intentionally designed to nurture curiosity, build confidence, and lay the groundwork for a lifetime of learning.",
    image: "/images/programmes/preschool.jpg",
    stats: {
      ageRange: "18 mo – 5 yrs",
      classes: "Little Angels – Nursery",
      hours: "7:30 AM – 12:30 PM",
      perClass: "Max 15",
    },
    curriculum: [
      { title: "Language & Literacy", description: "Phonics, storytelling, pre-reading, and early writing through Montessori language materials." },
      { title: "Early Numeracy", description: "Number sense, counting, patterns, and basic mathematics through hands-on manipulatives." },
      { title: "Cultural Awareness", description: "Geography, world cultures, and nature studies to build global curiosity from an early age." },
      { title: "Creative Arts", description: "Painting, drawing, clay work, and music to encourage self-expression and fine motor development." },
      { title: "Practical Life Skills", description: "Pouring, sorting, dressing, and care of the environment — building independence and concentration." },
      { title: "Physical Development", description: "Gross and fine motor activities, outdoor play, and movement exercises for physical growth." },
    ],
    classes: [
      { name: "Little Angels" },
      { name: "Play Group Gold" },
      { name: "Play Group Pearl", sections: ["Alpha", "Beta", "Gamma"], sectionCount: 3 },
      { name: "Nursery 1", gemName: "Jasper", sections: ["Alpha", "Beta", "Gamma"], sectionCount: 3 },
      { name: "Nursery 2", gemName: "Sapphire", sections: ["Alpha", "Beta", "Gamma"], sectionCount: 3 },
    ],
    ctaLabel: "ENROL IN PRESCHOOL",
    ctaHref: "/admissions/apply",
  },
  {
    id: "reception-lower-primary",
    tabLabel: "Reception & Lower Primary",
    sectionLabel: "RECEPTION & LOWER PRIMARY PROGRAMME",
    heading: "Building Strong\nFoundations",
    description:
      "Our Reception and Lower Primary programme bridges the transition from early childhood into structured learning. Children aged 5 to 9 years develop foundational literacy, numeracy, and critical thinking skills within a supportive Montessori environment. Each classroom is thoughtfully prepared to encourage independent exploration while building the academic confidence needed for higher learning.",
    image: "/images/programmes/lower-primary.jpg",
    stats: {
      ageRange: "5 – 9 yrs",
      classes: "Reception – Year 3",
      hours: "7:30 AM – 2:30 PM",
      perClass: "Max 20",
    },
    curriculum: [
      { title: "English Language", description: "Reading comprehension, creative writing, grammar, and vocabulary development through engaging texts." },
      { title: "Mathematics", description: "Number operations, measurement, geometry, and problem-solving with concrete and abstract methods." },
      { title: "Integrated Science", description: "Hands-on experiments, nature observation, and scientific inquiry to build analytical thinking." },
      { title: "Social Studies", description: "History, civics, and cultural studies to develop awareness of community and the wider world." },
      { title: "French Language", description: "Introduction to French through songs, stories, and conversational practice." },
      { title: "ICT & Computing", description: "Basic digital literacy, typing skills, and introduction to educational technology." },
    ],
    classes: [
      { name: "Reception", gemName: "Chalcedony", sections: ["Alpha", "Beta"], sectionCount: 2 },
      { name: "Year 1", gemName: "Emerald", sections: ["Alpha", "Beta"], sectionCount: 2 },
      { name: "Year 2", gemName: "Sardonyx", sections: ["Alpha", "Beta"], sectionCount: 2 },
      { name: "Year 3", gemName: "Sardius", sections: ["Alpha", "Beta"], sectionCount: 2 },
    ],
    ctaLabel: "ENROL IN LOWER PRIMARY",
    ctaHref: "/admissions/apply",
  },
  {
    id: "upper-primary",
    tabLabel: "Upper Primary",
    sectionLabel: "UPPER PRIMARY PROGRAMME",
    heading: "Preparing Leaders\nFor Tomorrow",
    description:
      "The Upper Primary programme at Heaven's Dew Montessori is designed for students aged 9 to 12 years. At this stage, learners take on greater academic challenges, develop leadership skills, and prepare for the transition to secondary education. Our curriculum emphasizes critical thinking, collaboration, and character development alongside rigorous academic standards.",
    image: "/images/programmes/upper-primary.jpg",
    stats: {
      ageRange: "9 – 12 yrs",
      classes: "Year 4 – Year 6",
      hours: "7:30 AM – 3:00 PM",
      perClass: "Max 25",
    },
    curriculum: [
      { title: "Advanced Mathematics", description: "Fractions, decimals, algebra foundations, data handling, and multi-step problem solving." },
      { title: "English & Composition", description: "Essay writing, comprehension, public speaking, and advanced grammar and vocabulary." },
      { title: "Science & Technology", description: "In-depth scientific investigations, technology projects, and STEM-based learning activities." },
      { title: "Social Studies & History", description: "Ghanaian history, world geography, governance, and cultural heritage studies." },
      { title: "Creative & Performing Arts", description: "Visual arts, music, drama, and dance to foster self-expression and artistic appreciation." },
      { title: "Physical Education", description: "Team sports, athletics, fitness training, and sportsmanship development." },
    ],
    classes: [
      { name: "Year 4", gemName: "Chrysolite" },
      { name: "Year 5", gemName: "Beryl" },
      { name: "Year 6", gemName: "Topaz" },
    ],
    ctaLabel: "ENROL IN UPPER PRIMARY",
    ctaHref: "/admissions/apply",
  },
  {
    id: "after-school",
    tabLabel: "After School",
    sectionLabel: "AFTER SCHOOL PROGRAMME",
    heading: "Beyond the\nClassroom",
    description:
      "Our After School programme extends the learning experience beyond regular school hours. Through a variety of clubs and extracurricular activities, students develop well-rounded skills, discover new interests, and build lasting friendships. Activities run on Thursdays and Fridays, offering both free and premium options to suit every family.",
    image: "/images/programmes/after-school.jpg",
    stats: {
      ageRange: "All Ages",
      classes: "Clubs & Activities",
      hours: "2:30 PM – 4:30 PM",
      perClass: "Varies",
    },
    curriculum: [
      { title: "Robotics & Technology", description: "Building, programming, and problem-solving with robotics kits and coding platforms." },
      { title: "Performing Arts", description: "Drama, music, and theatrical performance skills for confidence and creativity." },
      { title: "Martial Arts", description: "Taekwondo training for discipline, physical fitness, and self-defense." },
      { title: "Language & Literature", description: "English and French literature exploration through Shakespeare and creative writing." },
      { title: "Culinary Arts", description: "Introduction to cooking, baking, and food preparation in a fun, safe environment." },
      { title: "Arts & Crafts", description: "Creative crafting, drawing, and hands-on artistic projects for self-expression." },
    ],
    classes: [],
    ctaLabel: "ENROL IN AFTER SCHOOL",
    ctaHref: "/admissions/apply",
  },
  {
    id: "summer-programme",
    tabLabel: "Summer Programme",
    sectionLabel: "SUMMER PROGRAMME",
    heading: "A Summer of\nDiscovery & Fun",
    description:
      "The Heaven's Dew Montessori Summer Programme offers an exciting blend of academic enrichment and recreational activities during the school holidays. Open to both enrolled students and children from the wider community, our summer programme keeps young minds engaged, active, and inspired throughout the break.",
    image: "/images/programmes/summer.jpg",
    stats: {
      ageRange: "3 – 12 yrs",
      classes: "Mixed Groups",
      hours: "8:00 AM – 1:00 PM",
      perClass: "Max 20",
    },
    curriculum: [
      { title: "STEM Exploration", description: "Fun science experiments, coding basics, and engineering challenges for curious minds." },
      { title: "Arts & Creativity", description: "Painting, crafts, music, and drama workshops to spark imagination." },
      { title: "Sports & Fitness", description: "Swimming, football, athletics, and team games for physical development." },
      { title: "Nature & Outdoors", description: "Nature walks, gardening, and environmental awareness activities." },
      { title: "Reading & Writing", description: "Story time, creative writing workshops, and reading challenges to keep literacy skills sharp." },
      { title: "Life Skills", description: "Cooking, first aid basics, and leadership activities for personal growth." },
    ],
    classes: [],
    ctaLabel: "REGISTER FOR SUMMER",
    ctaHref: "/admissions/apply",
  },
]
