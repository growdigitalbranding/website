import { resolveSources, SOURCES_VERIFIED, type SourceKey } from "@/data/sources";

/**
 * The primary sources a page's factual claims rest on, linked out.
 *
 * rel="noopener" without "nofollow": these are citations the page stands
 * behind, which is exactly what a followed link says. Opening in a new tab
 * keeps a reader checking a claim from losing the argument they were in.
 */
export function SourceList({
  keys,
  className = "",
}: {
  keys?: readonly SourceKey[];
  className?: string;
}) {
  const sources = resolveSources(keys);
  if (sources.length === 0) return null;

  return (
    <section className={`flex flex-col gap-4 ${className}`}>
      <h2 className="mono-label text-graphite">Sources</h2>
      <ol className="flex flex-col gap-2.5 list-decimal pl-5 marker:text-graphite">
        {sources.map((s) => (
          <li key={s.url} className="pl-1">
            <a
              href={s.url}
              target="_blank"
              rel="noopener"
              className="text-ink hover:text-signal underline decoration-mist underline-offset-4 transition-colors"
            >
              {s.label}
            </a>
            <span className="text-sm text-graphite"> — {s.publisher}</span>
          </li>
        ))}
      </ol>
      <p className="text-xs text-graphite">
        Primary sources only: the statute, the regulator or the platform&rsquo;s own
        documentation. Checked {SOURCES_VERIFIED}.
      </p>
    </section>
  );
}
