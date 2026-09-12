import type { Metadata } from "next";
import { BRAND } from "@/lib/brand";

/**
 * Per-page metadata, because Next merges metadata **shallowly**: a nested
 * field the page does not redefine is inherited from the root layout whole.
 * Two consequences bit this site.
 *
 * 1. The layout's `alternates: { canonical: "/" }` was inherited by all 23
 *    child routes, so every page declared the homepage as its canonical URL.
 *    That reads to a crawler as "these are duplicates of the homepage, index
 *    only the homepage".
 * 2. Setting `openGraph` on a page *replaces* the layout's object rather than
 *    extending it, so a page that sets only `openGraph.url` silently loses
 *    siteName, locale, type and the card image.
 *
 * So openGraph has to be rebuilt from a shared base on every page, which is
 * what OG_BASE is for.
 */

const OG_BASE: NonNullable<Metadata["openGraph"]> = {
  type: "website",
  siteName: BRAND,
  locale: "en_IN",
  images: [
    {
      url: "/og.png",
      width: 2400,
      height: 1260,
      alt: `${BRAND}. Most agencies stop at the lead. We run the loop.`,
    },
  ],
};

export function pageMeta({
  path,
  title,
  description,
}: {
  /** Route path, leading slash, no trailing slash. metadataBase resolves it. */
  path: string;
  /** The page title. The layout's template appends the brand for <title>. */
  title: string;
  description?: string;
}): Metadata {
  // og:title carries the brand explicitly: the layout's title template is not
  // applied to Open Graph, so without it every shared card reads as a bare
  // section name with no indication of whose site it is.
  const social = `${title} | ${BRAND}`;

  return {
    title,
    ...(description ? { description } : {}),
    alternates: { canonical: path },
    openGraph: {
      ...OG_BASE,
      url: path,
      title: social,
      ...(description ? { description } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: social,
      ...(description ? { description } : {}),
      images: ["/og.png"],
    },
  };
}
