import Link from "next/link";
import { FadeIn } from "@/components/loop/ui";

/**
 * Who runs this, and who it is not for.
 *
 * Two promises were missing from the homepage entirely. The origin paragraph
 * lived only on /about, where it is the most persuasive writing on the site
 * and almost nobody reads it. The selectivity signal, published ranges and the
 * media-spend floor, lived only on /pricing, so a visitor who never clicked
 * through saw no filtering at all.
 *
 * Both are here because they do the same job: publishing a floor and naming
 * who we decline is the cheapest lead qualification available, and it is also
 * the only part of the page that sounds like a firm rather than a method.
 */

const FACTS: { value: string; label: string }[] = [
  { value: "₹75,000", label: "Signal setup, one-time" },
  { value: "₹1,25,000", label: "Audit and rebuild, one-time" },
  { value: "₹60k–2.5L", label: "Full loop retainer, monthly" },
  { value: "₹1.5L", label: "Minimum monthly media spend" },
];

export function OperatorSection() {
  return (
    <section
      id="who-runs-this"
      aria-labelledby="operator-heading"
      className="bg-paper-2 px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32"
    >
      <div className="max-w-6xl mx-auto grid gap-12 md:gap-16 lg:grid-cols-[1.15fr_1fr]">
        <div>
          <FadeIn y={20}>
            <p className="mono-label text-graphite mb-5">Who runs this</p>
            <h2
              id="operator-heading"
              className="font-display font-extrabold lowercase leading-[0.95] track-display"
              style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
            >
              run by people who have bought their own media.
            </h2>
          </FadeIn>

          <FadeIn y={18} delay={0.08}>
            <p className="text-graphite leading-[1.6] mt-6 max-w-[52ch] text-base sm:text-lg">
              Grow is based in Coimbatore, working with builders across Tamil Nadu and
              Karnataka. We started it because every real estate account we inherited had
              the same three problems: a media buyer reporting cost per lead with no idea
              what happened to those leads afterward, a tracking setup that had not been
              touched since the pixel was first installed, and a follow-up process that
              lived entirely in one overworked telecaller&rsquo;s head.
            </p>
          </FadeIn>

          <FadeIn y={18} delay={0.14}>
            <p className="text-ink leading-[1.6] mt-5 max-w-[52ch] text-base sm:text-lg">
              Fixing all three at once, as one system, is the whole premise of the loop.
            </p>
          </FadeIn>
        </div>

        <div className="min-w-0">
          <FadeIn y={20} delay={0.1}>
            <p className="mono-label text-graphite mb-5">What it costs</p>
            {/* Published ranges rather than "contact us for a quote": the point
                is that a builder can disqualify himself here, before a call
                costs either side an hour. */}
            <dl className="surface rounded-[28px] p-6 sm:p-8">
              {FACTS.map((f, i) => (
                <div
                  key={f.label}
                  className={`flex items-baseline justify-between gap-5 py-3.5 ${
                    i > 0 ? "border-t border-mist" : ""
                  }`}
                >
                  <dt className="mono-label text-graphite">{f.label}</dt>
                  <dd className="font-mono text-base sm:text-lg text-ink whitespace-nowrap">
                    {f.value}
                  </dd>
                </div>
              ))}
            </dl>
          </FadeIn>

          <FadeIn y={18} delay={0.18}>
            <p className="text-graphite leading-[1.6] mt-6 text-sm sm:text-base max-w-[46ch]">
              Media spend goes directly to Meta and Google. We do not mark it up or take a
              percentage of it. We run a small number of accounts at a time on purpose, and
              if the roster is full when you call we will say so and give you a real
              timeline.
            </p>
          </FadeIn>

          <FadeIn y={18} delay={0.24}>
            <p className="text-sm sm:text-base leading-[1.6] mt-5 max-w-[46ch]">
              <span className="mono-label" style={{ color: "var(--pulse-ink)" }}>
                Not for us
              </span>
              <span className="block mt-2 text-graphite">
                Ecommerce dropshippers, sub-₹25k monthly budgets, or anyone shopping purely
                on price. There are cheaper options and they will serve you better than we
                would.
              </span>
            </p>
          </FadeIn>

          <FadeIn y={18} delay={0.3}>
            <Link href="/pricing" className="nav-link mono-label text-signal mt-6 inline-block">
              See the full pricing &rarr;
            </Link>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
