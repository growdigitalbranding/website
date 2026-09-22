import Link from "next/link";
import { getArticle } from "@/data/insights";

/**
 * Links from a page into the articles that expand it.
 *
 * Titles and deks come from src/data/insights.ts rather than being retyped
 * here, so renaming an article updates every page that points at it and a
 * link can never describe something the article no longer says. An unknown
 * slug is dropped rather than rendered as a broken link, which matters
 * because these are referenced by string from a dozen pages.
 *
 * Written because the seven articles were reachable only from /insights and
 * from each other. Ten thousand words that the pages making the same
 * arguments never pointed at is a silo, and it wastes the part of the work
 * that compounds: a service page that cites its own method is more credible
 * than one that asserts it, and the crawl path from a high-authority page
 * into a deep one is how the deep one gets found at all.
 */
export function FurtherReading({
  slugs,
  label = "Further reading",
  className = "",
}: {
  slugs: string[];
  label?: string;
  className?: string;
}) {
  const articles = slugs.map(getArticle).filter((a) => a !== undefined);
  if (articles.length === 0) return null;

  return (
    <section className={`flex flex-col gap-4 ${className}`}>
      <h2 className="mono-label text-graphite">{label}</h2>
      <ul className="flex flex-col gap-3">
        {articles.map((a) => (
          <li key={a.slug}>
            <Link
              href={`/insights/${a.slug}`}
              className="group flex flex-col gap-1 border-l-2 border-mist hover:border-signal pl-4 transition-colors"
            >
              <span className="text-lg text-ink group-hover:text-signal transition-colors">
                {a.title}
              </span>
              <span className="text-sm text-graphite">{a.dek}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
