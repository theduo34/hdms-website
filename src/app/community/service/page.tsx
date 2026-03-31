import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Service & Outreach",
  description: "Discover how Heaven's Dew Montessori gives back to Koforidua and Ghana — through community initiatives, cultural celebrations, and a deep commitment to service.",
  openGraph: {
    title: "Service & Outreach",
    description: "At HDM, we raise children who give back. Explore our community service initiatives, cultural celebrations, and outreach programmes in Koforidua, Ghana.",
    url: "https://www.hdm.edu.gh/community/service",
  },
  twitter: {
    title: "Service & Outreach",
    description: "At HDM, we raise children who give back. Explore our community service initiatives, cultural celebrations, and outreach programmes in Koforidua, Ghana.",
  },
}

import { ServicePage } from "@/components/pages/community/service-page"

export default function Service() {
  return <ServicePage />
}
