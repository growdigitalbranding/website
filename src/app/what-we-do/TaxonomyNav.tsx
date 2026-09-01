"use client";

import { useEffect, useState } from "react";

/**
 * Sticky section nav for the directory.
 *
 * Highlights the section currently in view. Uses an IntersectionObserver with
 * a top-heavy root margin rather than scroll maths, so it does not run on
 * every frame — this page is long and the nav is the least important thing on
 * it.
 *
 * Below lg it collapses to a horizontally scrollable strip rather than
 * disappearing: on a page this long, "where am I" is worth more on a phone
 * than on a desktop, not less.
 */
export function TaxonomyNav({ sections }: { sections: { id: string; label: string }[] }) {
  const [active, setActive] = useState(sections[0]?.id);

  useEffect(() => {
    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter((e): e is HTMLElement => e !== null);
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort(
          (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
        )[0];
        if (hit) setActive(hit.target.id);
      },
      // Only the band just under the floating nav counts as "current".
      { rootMargin: "-96px 0px -70% 0px", threshold: 0 }
    );

    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, [sections]);

  return (
    <nav
      aria-label="Sections"
      // min-w-0 because a grid item defaults to min-width:auto, so without it
      // the nav refuses to shrink below its content and the scroll container
      // inside never engages — it just pushes the page 249px wide instead.
      className="min-w-0 lg:sticky lg:top-28 lg:self-start -mx-6 lg:mx-0 px-6 lg:px-0"
    >
      <ul className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible config-track pb-2 lg:pb-0">
        {sections.map((s) => {
          const on = active === s.id;
          return (
            <li key={s.id} className="shrink-0">
              <a
                href={`#${s.id}`}
                aria-current={on ? "true" : undefined}
                className={`nav-link block whitespace-nowrap rounded-full lg:rounded-none px-3 lg:px-0 py-2 text-sm transition-colors ${
                  on ? "text-ink font-medium" : "text-graphite"
                }`}
              >
                {s.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
