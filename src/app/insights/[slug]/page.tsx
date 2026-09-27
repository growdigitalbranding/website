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
    // The question is the right <title> here: it matches the query verbatim,
    // which is the whole point of writing them as questions. What pushed these
    // to 70-85 characters was the root template appending the brand, costing
    // 20 characters and truncating the end of the question in the SERP.
    // `absolute` opts this route out of the template. og:title keeps the brand,
    // because a shared card with no attribution is a different problem.
    title: { absolute: article.title },
    openGraph: {
      type: "article",
      siteName: "growdigitalbranding",
      locale: "en_IN",
      url: `/insights/${article.slug}`,
      title: article.title,
      description: article.description,
      publishedTime: article.published,
      modifiedTime: article.updated,
      // No `images` here on purpose. opengraph-image.tsx in this segment
      // generates a card per article and Next injects it; an explicit
      // `images` would win and put every article back on the shared /og.png.
    },
    // Same reason: pageMeta's twitter block hard-codes /og.png, and the
    // generated card feeds twitter:image too once nothing overrides it.
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
    },
  };
}

export default async function InsightPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  return <ArticleTemplate article={article} />;
}
