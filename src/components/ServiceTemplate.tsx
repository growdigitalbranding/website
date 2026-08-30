import Link from "next/link";
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
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  whoFor: string[];
  included: string[];
  tooling: string[];
  miniCase: string;
  objection: { question: string; answer: string };
}) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} subtitle={subtitle} />

      <article className="mx-auto max-w-3xl px-6 py-16 flex flex-col gap-14">
        <section className="border border-mist rounded-2xl p-6 bg-paper-2">
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
          <h2 className="text-h3 font-display font-bold mb-4">What's included</h2>
          <ul className="flex flex-col gap-3">
            {included.map((item) => (
              <li key={item} className="border-t border-mist pt-3 text-lg text-graphite">
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-h3 font-display font-bold mb-4">The tooling, named</h2>
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

        <section>
          <h2 className="text-h3 font-display font-bold mb-4">In practice</h2>
          <p className="text-lg text-graphite">{miniCase}</p>
        </section>

        <section>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd([objection])) }}
          />
          <h2 className="text-h3 font-display font-bold mb-4">{objection.question}</h2>
          <p className="text-lg text-graphite">{objection.answer}</p>
        </section>

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
