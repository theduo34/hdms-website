// import {NewsDetailPage} from "@/components/pages/news/news-detail-page";
// import type {Metadata} from "next";
//
// export const metadata: Metadata = {
//   title: "News",
//   description: ""
// }
//
// export async function generateStaticParams() {
//   const news = await getNews();
//   return news.map((item: { slug: string }) => ({
//     slug: item.slug,
//   }));
// }
//
// export default async function NewsDetail(
//   { params,}: { params: { slug: string }; }) {
//
//   const article = await getNewsBySlug(params.slug);
//
//   return <NewsDetailPage article={article} />;
// }