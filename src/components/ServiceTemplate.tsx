import Link from "next/link";
import { FurtherReading } from "@/components/FurtherReading";
import { SourceList } from "@/components/SourceList";
import type { SourceKey } from "@/data/sources";
import { PageHero, CTABand } from "@/components/PageHero";
import { faqJsonLd } from "@/lib/schema/jsonld";

export function ServiceTemplate({
  eyebrow,
  title,
  subtitle,
  whoFor,
  included,
  tooling,
  miniCase,
  objection,
  answer,
  reading = [],
  sections = [],
  faqs = [],
  heroTitle,
  links = [],
  sources = [],
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  whoFor: string[];
  included: string[];
  tooling: string[];
  /** Optional. A page with no real engagement to describe leaves it out
   *  rather than inventing one. */
  miniCase?: string;
  objection: { question: string; answer: string };
  /** The direct answer, rendered before anything else. Assistants and skim
   *  readers both take the first substantive paragraph. */
  answer: string;
  /** Article slugs that expand this service. */
  reading?: string[];
  /** Long-form body, rendered as question-shaped H2s between the direct
   *  answer and the deliverables. The original template carried ~350 words,
   *  which is enough for a page that supports a pillar and too thin for one
   *  that has to rank for a head term on its own. */
  sections?: { heading: string; body: string[] }[];
  /** Further questions, rendered after the objection and merged into the
   *  same FAQPage node so the page declares one FAQ, not several. */
  faqs?: { question: string; answer: string }[];
  /** Overrides the hero H1 when the page's keyword needs to sit in it. */
  heroTitle?: string;
  /** Sibling service pages, linked with descriptive anchors. Anchor text is
   *  the one relevance signal an internal link carries, so these say what
   *  the target page is about rather than "learn more". */
  links?: { href: string; label: string; note: string }[];
  /** Primary sources for the page's platform and regulatory claims. */
  sources?: SourceKey[];
}) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={heroTitle ?? title} subtitle={subtitle} />

      <article className="mx-auto max-w-3xl px-6 py-16 flex flex-col gap-14">
        {/* The direct answer, before any preamble. */}
        <div className="border-l-2 pl-5 md:pl-6" style={{ borderColor: "var(--signal)" }}>
          <p className="mono-label text-signal mb-3">The short answer</p>
          <p className="text-lg md:text-xl text-ink">{answer}</p>
        </div>

        {sections.map((sec) => (
          <section key={sec.heading} className="flex flex-col gap-4">
            <h2 className="text-h3 font-display font-bold">{sec.heading}</h2>
            {sec.body.map((para, i) => (
              <p key={i} className="text-lg text-graphite">
                {para}
              </p>
            ))}
          </section>
        ))}

        <section className="surface rounded-card p-6">
          <p className="mono-label text-graphite mb-3">WHO THIS IS FOR</p>
          <ul className="flex flex-col gap-2">
            {whoFor.map((w) => (
              <li key={w} className="text-lg">
                {w}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-h3 font-display font-bold mb-4">What do you actually get?</h2>
          <ul className="flex flex-col gap-3">
            {included.map((item) => (
              <li key={item} className="border-t border-mist pt-3 text-lg text-graphite">
                {item}
              </li>
            ))}
          </ul>
        </section>

        {links.length > 0 && (
          <section className="flex flex-col gap-4">
            <h2 className="text-h3 font-display font-bold">Where does it run?</h2>
            <ul className="flex flex-col gap-3">
              {links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="press group flex flex-col gap-1 border-l-2 border-mist hover:border-signal pl-4 transition-colors"
                  >
                    <span className="text-lg text-ink group-hover:text-signal transition-colors">
                      {l.label}
                    </span>
                    <span className="text-sm text-graphite">{l.note}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section>
          <h2 className="text-h3 font-display font-bold mb-4">Which tools does this run on?</h2>
          <div className="flex flex-wrap gap-2">
            {tooling.map((tool) => (
              <span
                key={tool}
                className="font-mono text-sm px-3 py-1.5 rounded-full border border-mist"
              >
                {tool}
              </span>
            ))}
          </div>
        </section>

        {miniCase && (
          <section>
            <h2 className="text-h3 font-display font-bold mb-4">What does this look like on a real account?</h2>
            <p className="text-lg text-graphite">{miniCase}</p>
          </section>
        )}

        <section>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd([objection, ...faqs])) }}
          />
          <h2 className="text-h3 font-display font-bold mb-4">{objection.question}</h2>
          <p className="text-lg text-graphite">{objection.answer}</p>
        </section>

        {faqs.map((f) => (
          <section key={f.question}>
            <h2 className="text-h3 font-display font-bold mb-4">{f.question}</h2>
            <p className="text-lg text-graphite">{f.answer}</p>
          </section>
        ))}

        <FurtherReading slugs={reading} className="border-t border-mist pt-10" />

        <SourceList keys={sources} className="border-t border-mist pt-10" />

        <p className="text-sm text-graphite">
          See how this fits the rest of the system on{" "}
          <Link href="/the-loop" className="text-signal hover:underline">
            the loop
          </Link>
          .
        </p>
      </article>

      <CTABand />
    </>
  );
}
