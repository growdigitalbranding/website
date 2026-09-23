import type { ReactNode } from "react";

type Variant = "default" | "split" | "ink";

/* Tailwind scans source for complete class names, so the column count has to
   be a literal rather than an interpolated number. */
const COLS: Record<number, string> = {
  1: "sm:grid-cols-1",
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
  4: "sm:grid-cols-4",
};

/**
 * The first screen of every interior page.
 *
 * It was one invariant block on 18 of 24 routes: mono eyebrow, display-l,
 * one subtitle, always on --paper, always left, never a rule, never a dark
 * ground. The site had exactly one memorable screen — the homepage hero —
 * and everything behind it opened like documentation.
 *
 * Three variants now, chosen by what the page is for rather than by taste:
 *
 *   default  the original. Legal and utility pages, where the first screen
 *            should get out of the way.
 *   split    title left, subtitle in its own column at the baseline, divided
 *            by a hairline. For hub pages whose subtitle is doing real work.
 *   ink      the brand's own ground. Reserved for the two pages carrying the
 *            commercial weight, so --ink and the lime appear somewhere other
 *            than above the homepage fold.
 *
 * `meta` takes key/value pairs the page already states elsewhere. It renders
 * nothing when omitted and invents nothing when passed.
 */
export function PageHero({
  eyebrow,
  title,
  subtitle,
  variant = "default",
  meta,
}: {
  eyebrow: string;
  title: string;
  subtitle?: ReactNode;
  variant?: Variant;
  meta?: { label: string; value: string }[];
}) {
  const ink = variant === "ink";

  return (
    <section className={ink ? "on-ink relative bg-ink" : "relative"}>
      {!ink && <div className="grid-overlay" />}
      <div
        className={
          "mx-auto max-w-[1440px] px-6 " +
          (ink ? "pt-20 pb-16 md:pt-28 md:pb-20" : "pt-16 pb-14 md:pt-24 md:pb-20")
        }
      >
        {variant === "split" ? (
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div>
              <p className="mono-label text-graphite mb-5">{eyebrow}</p>
              <h1 className="font-display font-extrabold text-display-l">{title}</h1>
            </div>
            {subtitle && (
              <p className="text-lg text-graphite lg:border-l lg:border-mist lg:pl-8 lg:pb-2">
                {subtitle}
              </p>
            )}
          </div>
        ) : (
          <>
            <p
              className="mono-label mb-5"
              style={ink ? { color: "var(--signal-bright)" } : undefined}
            >
              {eyebrow}
            </p>
            <h1
              className={
                "font-display font-extrabold max-w-3xl " +
                (ink ? "text-display-xl lowercase track-display leading-[0.95]" : "text-display-l")
              }
            >
              {title}
            </h1>
            {subtitle && (
              <p
                className={
                  "mt-6 text-lg " + (ink ? "text-paper/70 max-w-2xl" : "text-graphite max-w-xl")
                }
              >
                {subtitle}
              </p>
            )}
          </>
        )}

        {meta && meta.length > 0 && (
          <dl
            className={`mt-10 md:mt-14 grid grid-cols-2 ${COLS[Math.min(meta.length, 4)]} border-t border-mist pt-6 gap-6`}
          >
            {meta.map((m) => (
              <div key={m.label}>
                <dt className="mono-label text-graphite mb-2">{m.label}</dt>
                <dd className="font-mono font-medium text-lg sm:text-h3">{m.value}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </section>
  );
}

export function CTABand() {
  return (
    <section className="border-t border-mist bg-paper-2 py-16">
      <div className="mx-auto max-w-[1440px] px-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <p className="text-h3 font-display font-bold max-w-md">
          Ready to see what a fixed loop would do to your cost per booking?
        </p>
        <a
          href="/contact"
          className="press inline-flex items-center h-12 px-7 rounded-full bg-signal-bright text-ink font-medium hover:brightness-[0.94] transition-[filter] w-fit"
        >
          Book a 30-min call
        </a>
      </div>
    </section>
  );
}
