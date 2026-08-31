import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Setup required",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

/**
 * Shown when the Supabase environment variables are missing.
 *
 * It reports which ones are missing rather than listing all three, because
 * the pattern is the diagnosis. NEXT_PUBLIC_ variables are inlined by
 * `next build` and frozen afterwards, while the service role key is read from
 * the live process. So if the runtime one is set and the build-time ones are
 * not, the variables exist on the host but were absent when it built — which
 * is a different fix from having never saved them.
 *
 * Presence only. No value is ever rendered: the service role key bypasses
 * every row level security policy in the database.
 */

// Referenced statically so the build can inline them. A dynamic lookup like
// process.env[name] is not replaced, and would always read as missing.
const BUILD_TIME = [
  {
    name: "NEXT_PUBLIC_SUPABASE_URL",
    where: "Project Settings → API → Project URL",
    set: Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL),
  },
  {
    name: "NEXT_PUBLIC_SUPABASE_ANON_KEY",
    where: "Project Settings → API → anon public key",
    set: Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
  },
];

function Row({ name, where, set }: { name: string; where: string; set: boolean }) {
  return (
    <li className="surface rounded-2xl p-4 flex items-start justify-between gap-4">
      <div className="min-w-0">
        <p className="font-mono text-sm text-ink break-all">{name}</p>
        <p className="text-sm text-graphite mt-1">{where}</p>
      </div>
      <span
        className="shrink-0 rounded-full px-2.5 py-1 text-xs font-medium"
        style={{
          color: set ? "var(--signal)" : "var(--flag)",
          backgroundColor: set
            ? "color-mix(in srgb, var(--signal) 10%, transparent)"
            : "color-mix(in srgb, var(--flag) 10%, transparent)",
        }}
      >
        {set ? "Set" : "Missing"}
      </span>
    </li>
  );
}

export default function SetupPage() {
  // Read at request time, not build time — no NEXT_PUBLIC_ prefix.
  const serviceRoleSet = Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY);
  const buildMissing = BUILD_TIME.filter((v) => !v.set).length;

  return (
    <div className="max-w-2xl">
      <p className="mono-label text-graphite mb-2">Lead inbox</p>
      <h1 className="font-display font-bold text-2xl mb-4">Not configured yet</h1>
      <p className="text-graphite mb-8">
        The dashboard needs its Supabase connection before it can run. Anything marked
        Missing below is not reaching the app.
      </p>

      <h2 className="mono-label text-graphite mb-3">Needed when the app is built</h2>
      <ul className="flex flex-col gap-3 mb-4">
        {BUILD_TIME.map((v) => (
          <Row key={v.name} {...v} />
        ))}
      </ul>
      <p className="text-sm text-graphite mb-8">
        These two are baked into the build and frozen afterwards, so they must exist{" "}
        <strong className="text-ink">before</strong> <span className="font-mono">next build</span>{" "}
        runs. Setting them and restarting is not enough — it needs a rebuild.
      </p>

      <h2 className="mono-label text-graphite mb-3">Needed while the app runs</h2>
      <ul className="flex flex-col gap-3 mb-8">
        <Row
          name="SUPABASE_SERVICE_ROLE_KEY"
          where="Project Settings → API → service_role key. Server-side only, never expose it."
          set={serviceRoleSet}
        />
      </ul>

      {/* The pattern is the diagnosis, so say what it means rather than
          leaving three status pills to be interpreted. */}
      {serviceRoleSet && buildMissing > 0 && (
        <div className="rounded-2xl border border-pulse/40 bg-pulse/[0.06] p-5 mb-8">
          <p className="font-medium text-ink mb-2">Your host is not passing variables to the build</p>
          <p className="text-sm text-graphite mb-3">
            The runtime key is reaching the app but the build-time ones are not, so they are
            saved on the host and simply were not present when it built. Create a file named{" "}
            <span className="font-mono">.env.local</span> in the project root on the server,
            containing all three, then rebuild. Next.js reads it during the build, and it is
            already gitignored so a deploy will not overwrite or publish it.
          </p>
          <pre className="font-mono text-xs bg-paper rounded-xl p-3 overflow-x-auto text-graphite">
{`NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...`}
          </pre>
        </div>
      )}

      {buildMissing === BUILD_TIME.length && !serviceRoleSet && (
        <div className="rounded-2xl border border-pulse/40 bg-pulse/[0.06] p-5 mb-8">
          <p className="font-medium text-ink mb-2">None of the three are reaching the app</p>
          <p className="text-sm text-graphite">
            Check they are saved in your hosting panel with no quotation marks around the
            values and no trailing spaces, then rebuild and restart.
          </p>
        </div>
      )}

      <p className="text-sm text-graphite">
        Once all three read Set: run <span className="font-mono">supabase/schema.sql</span> in
        the Supabase SQL editor, add yourself under Authentication → Users, and promote that
        row to admin.
      </p>
    </div>
  );
}
