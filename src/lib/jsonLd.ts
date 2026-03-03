// src/app/layout.tsx

export const jsonLd = {
  "@context": "https://schema.org",
  "@type": "School",
  "name": "Heaven's Dew Montessori",
  "alternateName": "HDM",
  "description": "Where every child's potential is discovered, not assigned. Heaven's Dew Montessori in Koforidua, Ghana, blends timeless Montessori wisdom with modern excellence - raising confident, curious, and capable leaders grounded in Faith, Diligence, and Excellence.",
  "slogan": "Faith, Diligence and Excellence",
  "url": "https://www.hdm.edu.gh",
  "logo": "https://www.hdm.edu.gh/logo.png",
  "image": "https://www.hdm.edu.gh/og-image.png",
  "telephone": [
    "+233244974052",
    "+233342293761",
    "+233554603653",
    "+233500777321"
  ],
  "email": "info@hdm.edu.gh",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Education Street",
    "addressLocality": "Koforidua",
    "addressRegion": "Eastern Region",
    "addressCountry": "GH"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "6.0940",
    "longitude": "-0.2590"
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "07:30",
      "closes": "15:30"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "15:30",
      "closes": "17:30",
      "description": "After-School Programme"
    }
  ],
  "sameAs": [
    "https://facebook.com/heavnsdewmontessori",
    "https://instagram.com/heavnsdewmontessori",
    "https://www.youtube.com/@HDMHeavensDewMontessori"
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Educational Programmes",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Course",
          "name": "Preschool Programme",
          "description": "Little Angels, Play Group (Gold & Pearl), and Nursery classes for our youngest learners.",
          "educationalLevel": "Preschool"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Course",
          "name": "Reception & Lower Primary",
          "description": "Reception through Year 3 with specialized curriculum in multiple subjects.",
          "educationalLevel": "Primary"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Course",
          "name": "Upper Primary",
          "description": "Year 4 to Year 6 comprehensive curriculum preparing students for future academic success.",
          "educationalLevel": "Primary"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Course",
          "name": "After-School Programme",
          "description": "Extended learning and activities from 3:30 PM to 5:30 PM.",
          "educationalLevel": "Primary"
        }
      }
    ]
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "3",
    "bestRating": "5"
  },
  "review": [
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "Mrs. Rosemary Afi Yormesou" },
      "reviewRating": { "@type": "Rating", "ratingValue": "5" },
      "reviewBody": "This school has a serene and beautiful environment which is good for children of school going age and the teachers are very welcoming and excellent."
    },
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "Mrs. Frema Mantey" },
      "reviewRating": { "@type": "Rating", "ratingValue": "5" },
      "reviewBody": "One of the best schools in the Eastern Region."
    },
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "Mrs. Abena Darko" },
      "reviewRating": { "@type": "Rating", "ratingValue": "5" },
      "reviewBody": "We've seen remarkable growth in our child's independence and confidence. The Montessori approach at Heaven's Dew is truly effective."
    }
  ]
}