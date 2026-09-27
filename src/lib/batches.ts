/**
 * Next batch start dates for the classroom training.
 *
 * The rule, as set by the business:
 *   weekday batch  starts on the first Monday of every month
 *   weekend batch  starts on the first Saturday of every month
 *
 * A batch that starts today still counts as "next": someone reading the page
 * on the morning of the first Monday can still walk in. Once that day has
 * passed, the next one is the first Monday of the following month.
 *
 * All date arithmetic is done on the calendar date in India (IST, UTC+5:30),
 * never on the server's clock, because the server may run in UTC and would
 * otherwise flip to the next batch five and a half hours late.
 *
 * Pages that show these dates export `revalidate = 3600`, so the prerendered
 * HTML is rebuilt at most an hour after the date changes. That keeps the date
 * correct for crawlers and in the Course structured data, not just in the
 * browser.
 */

export type BatchKind = "weekday" | "weekend";

const IST_OFFSET_MINUTES = 330;
// JS getUTCDay(): 0 = Sunday ... 6 = Saturday
const START_DAY: Record<BatchKind, number> = { weekday: 1, weekend: 6 };

/** Today's calendar date in India, as a UTC-midnight Date. */
function todayInIndia(now: Date): Date {
  const ist = new Date(now.getTime() + IST_OFFSET_MINUTES * 60_000);
  return new Date(Date.UTC(ist.getUTCFullYear(), ist.getUTCMonth(), ist.getUTCDate()));
}

function firstWeekdayOf(year: number, month: number, weekday: number): Date {
  const first = new Date(Date.UTC(year, month, 1));
  const offset = (weekday - first.getUTCDay() + 7) % 7;
  return new Date(Date.UTC(year, month, 1 + offset));
}

/** The next `count` start dates for a batch, earliest first. */
export function nextBatchStarts(kind: BatchKind, count = 2, now: Date = new Date()): Date[] {
  const today = todayInIndia(now);
  let y = today.getUTCFullYear();
  let m = today.getUTCMonth();
  const out: Date[] = [];
  while (out.length < count) {
    const d = firstWeekdayOf(y, m, START_DAY[kind]);
    if (d.getTime() >= today.getTime()) out.push(d);
    m += 1;
    if (m > 11) {
      m = 0;
      y += 1;
    }
  }
  return out;
}

export function isoDate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

/** "Monday, 5 October 2026" */
export function longDate(d: Date): string {
  return d.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

/** "5 Oct" */
export function shortDate(d: Date): string {
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", timeZone: "UTC" });
}
