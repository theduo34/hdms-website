import type { Metadata } from 'next';
import {NewsPage} from "@/components/pages/news/news-page";

export const metadata: Metadata = {
  title: "News & Announcements",
  description: "The latest news, updates, and announcements from Heaven's Dew Montessori. Stay informed about everything happening at our school in Koforidua, Ghana.",
  openGraph: {
    title: "News & Announcements",
    description: "From academic achievements to school updates - get the latest news directly from Heaven's Dew Montessori, Koforidua.",
    url: "https://www.hdm.edu.gh/news-&-announcements",
  },
  twitter: {
    title: "News & Announcements",
    description: "From academic achievements to school updates - get the latest news directly from Heaven's Dew Montessori, Koforidua.",
  },
}

export default function New() {
  return(
    <NewsPage/>
  )
}