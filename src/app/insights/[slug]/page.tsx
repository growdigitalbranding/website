import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { pageMeta } from "@/lib/seo";
import { ArticleTemplate } from "@/components/ArticleTemplate";
import { ARTICLES, getArticle } from "@/data/insights";

/** Prerenders all three at build time, so no article is ever server-rendered
 *  on demand. Crawlers that do not run JS get the full text either way, but
 *  static also means the article is in the HTML on first byte. */
export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};

  return {
    ...pageMeta({
      path: `/insights/${article.slug}`,
      title: article.title,
      description: article.description,
    }),
    openGraph: {
      type: "article",
      siteName: "growdigitalbranding",
      locale: "en_IN",
      url: `/insights/${article.slug}`,
      title: article.title,
      description: article.description,
      publishedTime: article.published,
      modifiedTime: article.updated,
      images: [{ url: "/og.png", width: 2400, height: 1260, alt: article.title }],
    },
  };
}

export default async function InsightPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  return <ArticleTemplate article={article} />;
}
