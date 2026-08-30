const METRICS = [
  { value: "₹1,240", label: "Blended CPL" },
  { value: "3.1%", label: "Lead to booking" },
  { value: "41 days", label: "Average cycle" },
];

/**
 * The headline numbers. These used to sit inside the hero, which pushed the
 * hero past the fold at every desktop height and gave it six text elements.
 * As its own band directly below, the numbers still land in the first scroll
 * without overloading the hero's single moment.
 */
export function ProofStrip() {
  return (
    <section className="border-t border-mist bg-paper">
      <div className="mx-auto max-w-[1440px] px-6 py-10 flex flex-col md:flex-row md:items-end gap-8 md:gap-16">
        <dl className="flex flex-wrap gap-x-12 gap-y-4">
          {METRICS.map((m) => (
            <div key={m.label}>
              <dd className="font-mono text-2xl">{m.value}</dd>
              <dt className="mono-label text-graphite mt-1">{m.label}</dt>
            </div>
          ))}
        </dl>
        <p className="text-sm text-graphite md:max-w-xs md:ml-auto md:text-right">
          Portfolio blend across active accounts, not a single-client cherry-pick.
        </p>
      </div>
    </section>
  );
}
