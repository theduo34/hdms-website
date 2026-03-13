/* eslint-disable @typescript-eslint/no-explicit-any */
interface NewsDetailPageProps {
  article: any;
}
export function NewsDetailPage({ article }: NewsDetailPageProps) {

  return (
    <main>
      <div>
        News Details Page {article}
      </div>
    </main>
  )
}