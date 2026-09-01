import Link from "next/link";
import { FadeIn } from "@/components/loop/ui";
import { CREATIVE_TICKER, PILLARS } from "@/data/capability";
import { CreativeTicker } from "./CreativeTicker";

/**
 * The five service pillars, four items each plus a count. The full lists live
 * on /what-we-do; showing all forty here would be the "we do everything" wall
 * the rest of the site argues against.
 */
export function PillarsSection() {
  return (
    <section
      id="pillars"
      className="bg-paper py-24 sm:py-32 px-5 sm:px-8 md:px-10"
      aria-labelledby="pillars-heading"
    >
      <FadeIn y={40}>
        <h2
          id="pillars-heading"
          className="display-grad font-display font-extrabold lowercase text-center leading-none track-display mb-14 sm:mb-16"
          style={{ fontSize: "clamp(2.5rem, 9vw, 120px)" }}
        >
          what we actually do
        </h2>
      </FadeIn>

      <div className="max-w-6xl mx-auto grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {PILLARS.map((p, i) => (
          <FadeIn
            key={p.n}
            y={24}
            delay={i * 0.08}
            className={i === 0 ? "lg:col-span-2" : undefined}
          >
            <article className="surface h-full rounded-[24px] p-6 md:p-8 flex flex-col">
              <p className="mono-label text-signal mb-2">{p.n}</p>
              <h3 className="font-display text-2xl md:text-3xl text-ink mb-5">{p.name}</h3>
              <ul className="flex flex-col flex-1">
                {p.shown.map((item) => (
                  <li
                    key={item}
                    className="border-t border-mist py-2.5 font-light text-sm sm:text-base text-graphite"
                  >
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href={`/what-we-do#${p.anchor}`}
                className="nav-link mono-label text-signal mt-5 inline-block"
              >
                + {p.total - p.shown.length} more &rarr;
              </Link>
            </article>
          </FadeIn>
        ))}
      </div>

      {/* Content and creative is the input to all five pillars, so it reads as
          a substrate rather than a sixth card. */}
      <CreativeTicker items={[...CREATIVE_TICKER]} />
    </section>
  );
}
