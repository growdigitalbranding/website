import { CountUp } from "@/components/motion/CountUp";
import { FadeIn } from "@/components/loop/ui";

const METRICS = [
  { to: 1240, prefix: "₹", label: "Blended CPL" },
  { to: 3.1, suffix: "%", decimals: 1, label: "Lead to booking" },
  { to: 41, suffix: " days", label: "Average cycle" },
];

/**
 * The headline numbers.
 *
 * These belong directly below the hero rather than inside it. Measured with
 * them in the hero, the primary CTA fell below the fold at 1440x800 and
 * 1280x720, both common laptop heights, and the hero carried six text elements
 * against a sensible cap of four.
 */
export function ProofStrip() {
  return (
    <section className="border-t border-mist bg-paper">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10 py-10 flex flex-col md:flex-row md:items-end gap-8 md:gap-16">
        <FadeIn y={16}>
          <dl className="flex flex-wrap gap-x-12 gap-y-4">
            {METRICS.map((m) => (
              <div key={m.label}>
                <dd className="font-mono text-2xl text-ink">
                  <CountUp
                    to={m.to}
                    prefix={m.prefix ?? ""}
                    suffix={m.suffix ?? ""}
                    decimals={m.decimals ?? 0}
                  />
                </dd>
                <dt className="mono-label mt-1">{m.label}</dt>
              </div>
            ))}
          </dl>
        </FadeIn>
        <p className="text-sm text-graphite md:max-w-xs md:ml-auto md:text-right">
          Portfolio blend across active accounts, last 12 months. Sample figures until
          replaced with audited numbers.
        </p>
      </div>
    </section>
  );
}
