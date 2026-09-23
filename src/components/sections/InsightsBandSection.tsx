import Link from "next/link";
import { ARTICLES_BY_DATE } from "@/data/insights";

/**
 * Three published pieces on the homepage.
 *
 * Two reasons it earns a slot on a page that already runs long. The page
 * argues that specificity is what gets a company quoted, and the cheapest way
 * to make that credible is to point at the specifics rather than describe
 * them. And the homepage is the only page with real authority to pass on: the
 * articles were reachable from /insights and from each other and from nowhere
 * else, which is a crawl dead end.
 *
 * Deliberately a list rather than a card grid. Cards would make this the
 * fourth enumerated block on the page, and the point here is the headlines,
 * not the furniture.
 */
export function InsightsBandSection() {
  const latest = ARTICLES_BY_DATE.slice(0, 3);

  return (
    <section className="bg-paper border-t border-mist py-16 md:py-20">
      <div className="mx-auto max-w-[1440px] px-6 grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="flex flex-col gap-4">
          <p className="mono-label text-graphite">What we publish</p>
          <h2 className="text-h2 font-display font-bold text-ink max-w-sm">
            The working, shown.
          </h2>
          <p className="text-graphite max-w-sm">
            Every number in these is arithmetic you can redo or a matter of public
            record. No case figures, because client results are theirs.
          </p>
          <Link href="/insights" className="text-signal hover:underline w-fit">
            All {ARTICLES_BY_DATE.length} articles →
          </Link>
        </div>

        <ul className="flex flex-col">
          {latest.map((a) => (
            <li key={a.slug} className="border-t border-mist first:border-0 lg:first:border-t">
              <Link
                href={`/insights/${a.slug}`}
                className="group flex flex-col gap-2 py-6 first:pt-0 lg:first:pt-6"
              >
                <span className="mono-label text-signal">{a.kind}</span>
                <span className="text-h3 font-display font-bold text-ink group-hover:text-signal transition-colors">
                  {a.title}
                </span>
                <span className="text-graphite">{a.dek}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
