import Link from "next/link";
import type { Article, Block } from "@/data/insights";
import { CTABand } from "@/components/PageHero";
import { faqJsonLd, ORG_ID } from "@/lib/schema/jsonld";
import { BRAND } from "@/lib/brand";

const SITE = "https://growdigitalbranding.com";

function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((b, i) => {
        switch (b.kind) {
          case "h2":
            return (
              <h2 key={i} className="text-h3 font-display font-bold text-ink mt-6">
                {b.text}
              </h2>
            );
          case "p":
            return (
              <p key={i} className="text-lg text-graphite">
                {b.lead && <strong className="text-ink">{b.lead} </strong>}
                {b.text}
              </p>
            );
          case "ul":
            return (
              <ul key={i} className="flex flex-col gap-3">
                {b.items.map((it, j) => (
                  <li key={j} className="text-lg text-graphite flex gap-3">
                    <span aria-hidden="true" className="text-signal shrink-0 select-none">
                      /
                    </span>
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={i} className="flex flex-col gap-3">
                {b.items.map((it, j) => (
                  <li key={j} className="text-lg text-graphite flex gap-3">
                    <span
                      aria-hidden="true"
                      className="mono-label text-signal shrink-0 select-none pt-1.5"
                    >
                      {String(j + 1).padStart(2, "0")}
                    </span>
                    <span>{it}</span>
                  </li>
                ))}
              </ol>
            );
          case "formula":
            return (
              <figure key={i} className="my-2">
                {/* Wide on purpose, so it gets its own scroller rather than
                    forcing the article column to scroll sideways on a phone. */}
                <div className="surface overflow-x-auto rounded-card p-5">
                  <code className="font-mono text-[15px] md:text-base text-ink whitespace-nowrap">
                    {b.expression}
                  </code>
                </div>
                {b.note && (
                  <figcaption className="mono-label text-graphite mt-3">{b.note}</figcaption>
                )}
              </figure>
            );
          case "table":
            return (
              <figure key={i} className="my-2">
                <div className="overflow-x-auto rounded-card border border-mist">
                  <table className="w-full border-collapse text-left">
                    <thead>
                      <tr className="bg-paper-2">
                        {b.head.map((h, j) => (
                          <th
                            key={j}
                            scope="col"
                            className="mono-label text-graphite p-4 border-b border-mist align-bottom"
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {b.rows.map((row, j) => (
                        <tr key={j} className="border-b border-mist last:border-0">
                          {row.map((cell, k) => (
                            <td
                              key={k}
                              className={`p-4 align-top ${
                                k === 0 ? "text-ink" : "text-graphite font-mono text-sm"
                              }`}
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {b.caption && (
                  <figcaption className="mono-label text-graphite mt-3">{b.caption}</figcaption>
                )}
              </figure>
            );
          case "callout":
            return (
              <aside
                key={i}
                className="rounded-card p-6 bg-ink text-paper flex flex-col gap-4 my-2"
              >
                <p className="mono-label" style={{ color: "var(--signal-bright)" }}>
                  {b.label}
                </p>
                <ul className="flex flex-col gap-2.5">
                  {b.items.map((it, j) => (
                    <li key={j} className="text-paper/90 flex gap-3">
                      <span aria-hidden="true" className="shrink-0 select-none opacity-50">
                        /
                      </span>
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </aside>
            );
        }
      })}
    </>
  );
}

export function ArticleTemplate({ article }: { article: Article }) {
  const url = `${SITE}/insights/${article.slug}`;

  /**
   * BlogPosting rather than Article: these are dated opinion-and-method
   * pieces on a marketing site, not news. publisher points at the
   * organisation node by @id so the graph resolves to one entity instead of
   * restating the company on every article.
   *
   * author is the organisation for now. A named person with credentials is
   * the stronger signal for both search quality raters and assistants, so
   * swap it once there is a byline to use.
   */
  const posting = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    mainEntityOfPage: url,
    url,
    headline: article.title,
    description: article.description,
    datePublished: article.published,
    dateModified: article.updated,
    inLanguage: "en-IN",
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    image: `${SITE}/og.png`,
    about: "Performance marketing for real estate developers",
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "Insights", item: `${SITE}/insights` },
      { "@type": "ListItem", position: 3, name: article.shortTitle, item: url },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(posting) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(article.faq)) }}
      />

      <section className="relative">
        <div className="grid-overlay" />
        <div className="mx-auto max-w-3xl px-6 pt-16 pb-10 md:pt-24 md:pb-12">
          <p className="mono-label text-graphite mb-5">
            <Link href="/insights" className="hover:text-signal transition-colors">
              INSIGHTS
            </Link>
            {" / "}
            {article.kind.toUpperCase()}
          </p>
          <h1 className="font-display font-extrabold text-display-m text-balance">
            {article.title}
          </h1>
          <p className="text-lg text-graphite mt-6">{article.dek}</p>
          <p className="mono-label text-graphite mt-6">
            {BRAND} · Published{" "}
            <time dateTime={article.published}>{formatDate(article.published)}</time>
            {article.updated !== article.published && (
              <>
                {" · Updated "}
                <time dateTime={article.updated}>{formatDate(article.updated)}</time>
              </>
            )}
          </p>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-6 pb-16 flex flex-col gap-6">
        {/* The direct answer, before any preamble. Assistants and skim readers
            both take the first substantive paragraph, so the conclusion lives
            there rather than at the end. */}
        <div className="border-l-2 pl-5 md:pl-6" style={{ borderColor: "var(--signal)" }}>
          <p className="mono-label text-signal mb-3">The short answer</p>
          <p className="text-lg md:text-xl text-ink">{article.answer}</p>
        </div>

        <Blocks blocks={article.blocks} />

        <section className="flex flex-col gap-6 mt-8 pt-10 border-t border-mist">
          <h2 className="text-h3 font-display font-bold text-ink">Questions people ask</h2>
          <dl className="flex flex-col gap-7">
            {article.faq.map((f) => (
              <div key={f.question} className="flex flex-col gap-2">
                <dt className="font-display font-bold text-ink text-lg">{f.question}</dt>
                <dd className="text-graphite">{f.answer}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="flex flex-col gap-4 mt-4 pt-10 border-t border-mist">
          <h2 className="mono-label text-graphite">Read next</h2>
          <ul className="flex flex-col gap-2.5">
            {article.related.map((r) => (
              <li key={r.href}>
                <Link href={r.href} className="text-lg text-signal hover:underline">
                  {r.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </article>

      <CTABand />
    </>
  );
}

function formatDate(iso: string) {
  return new Date(iso + "T00:00:00Z").toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
