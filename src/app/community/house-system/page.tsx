import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "House System",
  description: "Discover the four houses at Heaven's Dew Montessori — Red, Yellow, Green, and Blue. Each house builds belonging, healthy competition, and lifelong friendships in Koforidua, Ghana.",
  openGraph: {
    title: "House System",
    description: "Four houses. One family. Learn how the HDM house system creates belonging, community, and competitive spirit for every child in Koforidua, Ghana.",
    url: "https://www.hdm.edu.gh/community/house-system",
  },
  twitter: {
    title: "House System",
    description: "Four houses. One family. Learn how the HDM house system creates belonging, community, and competitive spirit for every child in Koforidua, Ghana.",
  },
}

import { HouseSystemPage } from "@/components/pages/community/house-system-page"

export default function HouseSystem() {
  return <HouseSystemPage />
}
