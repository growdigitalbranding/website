/**
 * The engagements, as data.
 *
 * Lifted out of ProofSection because /work renders the same engagements, and
 * a second hand-maintained copy would be wrong within a month. The homepage
 * shows them in a sticky stack, /work as a list. One source, two layouts.
 *
 * VERIFIED is the gate and the whole point of this file. Everything numeric
 * stays hidden until somebody confirms the figure against an account they can
 * open. A `metrics` array is not evidence; a true `verified` is. The
 * intervention text and the chains render either way, because describing the
 * work done is a claim about method, not about results.
 */

export type Metric = { label: string; value: string; tone?: "signal" | "flag" };

/** A link in the chain. `broken` marks where the account was losing people. */
export type Link = { label: string; broken?: boolean };

export type Case = {
  n: string;
  category: string;
  client: string;
  meta: string;
  /** Flip to true only once every value below is checkable on a real account. */
  verified: boolean;
  metrics: Metric[];
  intervention: string;
  /**
   * The account as we found it and as we rebuilt it. This is the part that is
   * ours to publish: it describes our own diagnosis and our own build, and
   * carries no spend, no CPL and no campaign names. A structure is evidence of
   * competence in a way an unverifiable number is not.
   */
  found: Link[];
  built: Link[];
};

/**
 * Portfolio-level, so no single client is identifiable. Set `verified` once
 * the figures come from a real roll-up across accounts.
 */
export const AGGREGATE: { verified: boolean; stats: Metric[] } = {
  verified: false,
  stats: [
    { label: "Real estate accounts run", value: "" },
    { label: "Median CPL change, first 6 months", value: "" },
    { label: "Median lead to site visit", value: "" },
  ],
};

export const CASES: Case[] = [
  {
    n: "01",
    category: "Structure + return path",
    client: "Bengaluru luxury villas",
    meta: "Client · 14 months",
    verified: false,
    metrics: [
      { label: "CPL", value: "₹3,400 → ₹1,180", tone: "signal" },
      { label: "Lead → visit", value: "6% → 14%", tone: "signal" },
      { label: "Cost / booking", value: "−61%", tone: "signal" },
      { label: "Cycle", value: "68 → 41 days", tone: "signal" },
    ],
    intervention:
      "Rebuilt from four self-competing Advantage+ campaigns into a clean three-tier structure, then wired offline bookings back into the account.",
    found: [
      { label: "4 campaigns" },
      { label: "same audience", broken: true },
      { label: "lead" },
      { label: "no return path", broken: true },
    ],
    built: [
      { label: "3 tiers" },
      { label: "split audience" },
      { label: "lead" },
      { label: "booking" },
      { label: "back to targeting" },
    ],
  },
  {
    n: "02",
    category: "Follow-up loop",
    client: "Coimbatore plotted development",
    meta: "Client · 9 months",
    verified: false,
    metrics: [
      { label: "Leads / mo", value: "210 → 480", tone: "signal" },
      { label: "Speed to lead", value: "6h → 40s", tone: "signal" },
      { label: "RNR rate", value: "−44%", tone: "signal" },
      { label: "CPL", value: "Flat" },
    ],
    intervention:
      "CPL never moved. Bookings doubled, because WhatsApp qualification ran before the telecaller ever dialled.",
    found: [
      { label: "lead" },
      { label: "hours of silence", broken: true },
      { label: "cold dial" },
      { label: "no-show", broken: true },
    ],
    built: [
      { label: "lead" },
      { label: "WhatsApp ack" },
      { label: "qualified in chat" },
      { label: "warm dial" },
      { label: "site visit" },
    ],
  },
  {
    n: "03",
    category: "Signal layer",
    client: "Senior living community",
    meta: "Client · 6 months",
    verified: false,
    metrics: [
      { label: "Match quality", value: "4.1 → 8.7", tone: "signal" },
      { label: "Attributed leads", value: "+38%", tone: "signal" },
      { label: "CPL", value: "−29%", tone: "signal" },
      { label: "CAPI dedup", value: "99.2%" },
    ],
    intervention:
      "No creative changes in month one. We fixed the signal layer, and the same budget started finding a different person.",
    found: [
      { label: "browser pixel" },
      { label: "events dropped", broken: true },
      { label: "platform guesses" },
      { label: "optimises to form-fillers", broken: true },
    ],
    built: [
      { label: "pixel" },
      { label: "server-side CAPI" },
      { label: "offline uploads" },
      { label: "platform learns buyers" },
    ],
  },
];

