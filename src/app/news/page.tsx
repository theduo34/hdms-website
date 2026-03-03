import type { Metadata } from 'next';
import {NewsPage} from "@/components/pages/news/news-page";

export const metadata: Metadata = {
  title: "News",
  description: ""
}

export default function New() {
  return(
    <NewsPage/>
  )
}