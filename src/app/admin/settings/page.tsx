import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { WebhookForm } from "./WebhookForm";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  // A telecaller who types the URL in directly gets sent back to the inbox
  // rather than an empty page. RLS would return nothing here anyway; this
  // makes the refusal legible.
  if (profile?.role !== "admin") redirect("/admin");

  const { data: setting } = await supabase
    .from("settings")
    .select("value, updated_at")
    .eq("key", "make_webhook_url")
    .maybeSingle();

  return (
    <div className="max-w-2xl">
      <p className="mono-label text-graphite mb-1">Settings</p>
      <h1 className="font-display font-bold text-2xl mb-6">Lead delivery</h1>

      <div className="surface rounded-3xl p-6 sm:p-8">
        <h2 className="font-medium mb-2">Make webhook</h2>
        <p className="text-sm text-graphite mb-6">
          Every enquiry is saved here first, then forwarded to this URL. If Make is
          unreachable the lead is still in your inbox — delivery failing can no longer
          lose one. In Make: open your scenario, click the Custom webhook module, then
          Copy address to clipboard.
        </p>
        <WebhookForm
          initialUrl={setting?.value ?? ""}
          updatedAt={setting?.updated_at ?? null}
        />
      </div>

      <p className="text-sm text-graphite mt-6">
        This URL is a write credential: anyone holding it can push leads into your
        scenario. It is readable by admins only, and never sent to the browser on any
        other page.
      </p>
    </div>
  );
}
