import { FadeIn } from "@/components/loop/ui";
import { GEOGRAPHIES, SEGMENTS } from "@/data/capability";

/**
 * Supports the claim rather than performing. Low emphasis on purpose: it is
 * the last thing a buyer needs, and giving it presence would compete with the
 * configurator directly above.
 */
export function SegmentStripSection() {
  return (
    <section
      className="bg-paper border-y border-mist py-16 md:py-20 px-5 sm:px-8 md:px-10"
      aria-label="Segments and geography"
    >
      <FadeIn y={20}>
        <div className="max-w-6xl mx-auto grid gap-10 md:grid-cols-2 md:gap-16">
          <div>
            <p className="mono-label text-graphite mb-5">Who we target</p>
            {/* Informational, not selectable. No hover state, because a hover
                affordance on a non-interactive chip promises a click that
                never happens. */}
            <ul className="flex flex-wrap gap-2">
              {SEGMENTS.map((s) => (
                <li
                  key={s}
                  className="rounded-full border border-mist px-3.5 py-1.5 text-sm text-graphite"
                >
                  {s}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mono-label text-graphite mb-5">How far we reach</p>
            <ul className="flex flex-col gap-3.5">
              {GEOGRAPHIES.map((g) => (
                <li key={g.label} className="flex gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-[0.55rem] w-1.5 h-1.5 rounded-full bg-signal shrink-0"
                  />
                  <p className="text-sm sm:text-base text-graphite">
                    <span className="text-ink font-medium">{g.label}</span> &mdash; {g.note}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
