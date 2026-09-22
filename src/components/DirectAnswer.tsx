/**
 * The direct answer, rendered before anything else on the page.
 *
 * Both a skim reader and an answer engine take the first substantive
 * paragraph, so the conclusion belongs there rather than after a warm-up. The
 * articles and the service template already do this; this is the same block
 * for the pages that are not built from either.
 */
export function DirectAnswer({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="mx-auto max-w-3xl px-6 pb-4 border-l-2 pl-5 md:pl-6"
      style={{ borderColor: "var(--signal)" }}
    >
      <p className="mono-label text-signal mb-3">The short answer</p>
      <p className="text-lg md:text-xl text-ink">{children}</p>
    </div>
  );
}
