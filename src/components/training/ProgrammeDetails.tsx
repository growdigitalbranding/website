import { CURRICULUM, SUPPORT } from "@/data/training";

/** Four weeks, one theme each. Rendered as an ordered list: the order matters. */
export function Curriculum({ className = "" }: { className?: string }) {
  return (
    <section className={className} aria-labelledby="curriculum-heading">
      <h2 id="curriculum-heading" className="text-h3 font-display font-bold mb-6">
        What will you learn, week by week?
      </h2>
      <ol className="flex flex-col">
        {CURRICULUM.map((wk) => (
          <li key={wk.week} className="border-t border-mist py-6 grid gap-3 md:grid-cols-[8rem_1fr]">
            <p className="mono-label text-signal pt-1">{wk.week}</p>
            <div>
              <h3 className="font-display font-bold text-xl mb-3">{wk.title}</h3>
              <ul className="flex flex-col gap-2">
                {wk.topics.map((t) => (
                  <li key={t} className="text-graphite pl-4 relative">
                    <span
                      aria-hidden
                      className="absolute left-0 top-[0.7em] h-1 w-1 rounded-full bg-graphite"
                    />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

/** Live projects, placement help, internship, certificate, each with its caveat. */
export function Support({ className = "" }: { className?: string }) {
  return (
    <section className={className} aria-labelledby="support-heading">
      <h2 id="support-heading" className="text-h3 font-display font-bold mb-6">
        What support do you get beyond the classes?
      </h2>
      <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
        {SUPPORT.map((s) => (
          <div key={s.title} className="border-t-2 border-ink pt-4">
            <h3 className="font-display font-bold text-lg mb-2">{s.title}</h3>
            <p className="text-graphite">{s.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
