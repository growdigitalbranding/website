import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Setup required",
  robots: { index: false, follow: false },
};

/**
 * Shown when the Supabase environment variables are missing. Without this, an
 * unconfigured deploy answers /admin with a stack trace, which tells whoever
 * found the URL far more about the stack than it tells you about the problem.
 */
export default function SetupPage() {
  return (
    <div className="max-w-2xl">
      <p className="mono-label text-graphite mb-2">Lead inbox</p>
      <h1 className="font-display font-bold text-2xl mb-4">Not configured yet</h1>
      <p className="text-graphite mb-6">
        The dashboard needs its Supabase connection before it can run. Set these in your
        hosting environment and redeploy.
      </p>
      <ul className="flex flex-col gap-3">
        {[
          ["NEXT_PUBLIC_SUPABASE_URL", "Project Settings → API → Project URL"],
          ["NEXT_PUBLIC_SUPABASE_ANON_KEY", "Project Settings → API → anon public key"],
          [
            "SUPABASE_SERVICE_ROLE_KEY",
            "Project Settings → API → service_role key. Server-side only, never expose it.",
          ],
        ].map(([name, where]) => (
          <li key={name} className="surface rounded-2xl p-4">
            <p className="font-mono text-sm text-ink">{name}</p>
            <p className="text-sm text-graphite mt-1">{where}</p>
          </li>
        ))}
      </ul>
      <p className="text-sm text-graphite mt-6">
        Then run <span className="font-mono">supabase/schema.sql</span> in the Supabase SQL
        editor, add yourself under Authentication → Users, and promote that row to admin.
      </p>
    </div>
  );
}
