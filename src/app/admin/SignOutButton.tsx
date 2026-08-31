"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function SignOutButton() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  return (
    <button
      type="button"
      disabled={busy}
      onClick={async () => {
        setBusy(true);
        await createClient().auth.signOut();
        // refresh() so the server components re-run and the session-derived
        // chrome disappears with the session.
        router.refresh();
        router.push("/admin/login");
      }}
      className="ghost-cta rounded-full px-4 py-2 text-xs font-medium uppercase tracking-widest disabled:opacity-60"
    >
      {busy ? "Signing out…" : "Sign out"}
    </button>
  );
}
