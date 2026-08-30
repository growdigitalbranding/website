import { RevealOnScroll } from "@/components/motion/RevealOnScroll";

const STATIONS = [
  {
    number: "01",
    id: "creative-engine",
    title: "Creative Engine",
    thesis: "With broad targeting, the ad is the targeting now.",
    deliverables: [
      "15–20 distinct creative angles produced every month",
      "Fatigue monitoring with a refresh trigger at frequency 2.8",
      "A shoot cadence — so you're never re-rendering the same stock render",
    ],
    ground: "paper",
  },
  {
    number: "02",
    id: "signal-layer",
    title: "Signal Layer",
    thesis: "Platforms optimise on the data you feed them, not the ad you ran.",
    deliverables: [
      "Conversions API with browser+server dedup via shared event_id",
      "A server-side GTM container on its own subdomain",
      "Weekly offline conversion upload straight from your CRM",
    ],
    ground: "paper-2",
  },
  {
    number: "03",
    id: "follow-up-loop",
    title: "Follow-Up Loop",
    thesis: "The lead is the start of the sale, not the deliverable.",
    deliverables: [
      "Sub-60-second WhatsApp acknowledgement, every lead",
      "A qualification flow that runs before a telecaller ever dials",
      "Disposition data written back to the ad platform automatically",
    ],
    ground: "paper",
  },
  {
    number: "04",
    id: "answer-visibility",
    title: "Answer Visibility",
    thesis: "Buyers are asking assistants questions now, not typing search terms.",
    deliverables: [
      "Entity and NAP consistency across the sources assistants cite",
      "Schema coverage across every service and location page",
      "A mention footprint across review sites, forums, YouTube, directories",
    ],
    ground: "paper-2",
  },
];

export function Stations() {
  return (
    <div>
      {STATIONS.map((station) => (
        <section
          key={station.id}
          id={station.id}
          className={`py-20 md:py-28 ${station.ground === "paper-2" ? "bg-paper-2" : "bg-paper"}`}
        >
          <div className="mx-auto max-w-[1440px] px-6 grid md:grid-cols-2 gap-12 md:gap-20">
            <div className="md:sticky md:top-24 self-start">
              <p className="font-mono text-signal text-2xl mb-4">{station.number}</p>
              <p className="mono-label text-graphite mb-3">
                {station.title.toUpperCase()}
              </p>
              <h3 className="text-h2 font-display font-bold max-w-md">{station.thesis}</h3>
            </div>

            <RevealOnScroll>
              <ul className="flex flex-col gap-6">
                {station.deliverables.map((d) => (
                  <li key={d} className="border-t border-mist pt-6 text-lg">
                    {d}
                  </li>
                ))}
              </ul>
            </RevealOnScroll>
          </div>
        </section>
      ))}
    </div>
  );
}
