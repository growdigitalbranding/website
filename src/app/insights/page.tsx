import type { Metadata } from "next";
import Link from "next/link";
import { pageMeta } from "@/lib/seo";
import { PageHero, CTABand } from "@/components/PageHero";
import { ARTICLES_BY_DATE } from "@/data/insights";

export const metadata: Metadata = pageMeta({
  path: "/insights",
  title: "Real estate marketing, with the working shown",
  description:
    "Cost per booking arithmetic, RERA and approval status in the funnel, and channel partner economics. Method pieces for builders, with the working shown.",
});

export default function InsightsPage() {
  return (
    <>
      <PageHero
        eyebrow="INSIGHTS"
        title="The working, shown."
        subtitle="Every article opens with a direct answer before any preamble, and every number on the page is either arithmetic you can redo or a matter of public record. We do not publish client results, so you will not find a measured case figure here."
      />

      <div className="mx-auto max-w-[1440px] px-6 pb-16">
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {ARTICLES_BY_DATE.map((a) => (
            <li key={a.slug} className="flex">
              <Link
                href={`/insights/${a.slug}`}
                className="group flex flex-col gap-4 border border-mist rounded-2xl p-6 bg-paper hover:border-signal transition-colors w-full"
              >
                <p className="mono-label text-signal">{a.kind}</p>
                <h2 className="text-h3 font-display font-bold text-ink group-hover:text-signal transition-colors">
                  {a.shortTitle}
                </h2>
                <p className="text-graphite flex-1">{a.dek}</p>
                <p className="mono-label text-graphite">
                  <time dateTime={a.published}>
                    {new Date(a.published + "T00:00:00Z").toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      timeZone: "UTC",
                    })}
                  </time>
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <CTABand />
    </>
  );
}
