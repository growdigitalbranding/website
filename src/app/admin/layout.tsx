import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { SignOutButton } from "./SignOutButton";
import type { Profile } from "@/lib/supabase/types";

export const metadata: Metadata = {
  title: "Lead inbox",
  // The dashboard lists real people's phone numbers. Keep it out of every
  // index, not just the polite ones.
  robots: { index: false, follow: false, nocache: true },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let profile: Profile | null = null;
  if (user) {
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .maybeSingle();
    profile = data;
  }

  return (
    <div className="min-h-screen bg-paper-2">
      {user && (
        <header className="border-b border-mist bg-paper">
          <div className="mx-auto max-w-6xl px-5 sm:px-8 h-16 flex items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <Link
                href="/admin"
                className="press font-display font-extrabold uppercase track-h2 text-lg"
              >
                Grow
              </Link>
              <nav className="flex items-center gap-5">
                <Link href="/admin" className="nav-link text-sm font-medium">
                  Leads
                </Link>
                {/* Settings holds the webhook credential, so the link is only
                    rendered for admins. The page checks again server-side and
                    the RLS policy checks a third time — this is the courtesy,
                    not the lock. */}
                {profile?.role === "admin" && (
                  <Link href="/admin/settings" className="nav-link text-sm font-medium">
                    Settings
                  </Link>
                )}
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <span className="mono-label text-graphite hidden sm:inline">
                {profile?.full_name ?? user.email}
                {profile?.role === "admin" && " · admin"}
              </span>
              <SignOutButton />
            </div>
          </div>
        </header>
      )}
      <main className="mx-auto max-w-6xl px-5 sm:px-8 py-8">{children}</main>
    </div>
  );
}
