import { PROGRAMME } from "@/data/training";
import { isoDate, longDate, nextBatchStarts, shortDate, type BatchKind } from "@/lib/batches";

const KINDS: BatchKind[] = ["weekday", "weekend"];

/**
 * The two batches and their next start dates.
 *
 * Dates are computed from the start rule (first Monday / first Saturday of
 * the month, on the Indian calendar), never typed in, so the page cannot go
 * stale the way a hand-edited "next batch: 3 March" banner does. Pages that
 * render this revalidate hourly.
 */
export function BatchSchedule({ className = "" }: { className?: string }) {
  return (
    <section className={className} aria-labelledby="batches-heading">
      <h2 id="batches-heading" className="text-h3 font-display font-bold mb-2">
        When does the next batch start?
      </h2>
      <p className="text-lg text-graphite mb-6">
        Two batches, the same programme and the same fee. Pick the one that fits your week.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        {KINDS.map((kind) => {
          const batch = PROGRAMME.batches[kind];
          const [next, then] = nextBatchStarts(kind, 2);
          return (
            <div key={kind} className="surface rounded-card p-6 flex flex-col gap-4">
              <div className="flex items-baseline justify-between gap-3">
                <p className="font-display font-bold text-xl">{batch.label}</p>
                <p className="font-mono text-sm text-graphite whitespace-nowrap">
                  {batch.hoursPerDay} hrs / day
                </p>
              </div>
              <div className="border-t border-mist pt-4">
                <p className="mono-label text-graphite mb-1">Next batch starts</p>
                <p className="text-lg font-medium text-ink">
                  <time dateTime={isoDate(next)}>{longDate(next)}</time>
                </p>
              </div>
              <p className="text-sm text-graphite">
                Then <time dateTime={isoDate(then)}>{shortDate(then)}</time>. A new batch starts on{" "}
                {batch.startsOn}.
              </p>
            </div>
          );
        })}
      </div>

      <p className="mono-label text-graphite mt-5">
        {PROGRAMME.batchSize} seats per batch · Classroom in {PROGRAMME.city} · Timings and location
        shared on enquiry
      </p>
    </section>
  );
}

/** Options for the enquiry form's batch select, labelled with the next date. */
export function batchOptions() {
  return KINDS.map((kind) => {
    const batch = PROGRAMME.batches[kind];
    const [next] = nextBatchStarts(kind, 1);
    return {
      value: kind,
      label: `${batch.label}, ${batch.hoursPerDay} hrs/day, from ${shortDate(next)}`,
    };
  });
}
