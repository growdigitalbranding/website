import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { WebhookForm } from "./WebhookForm";
import { GtmForm } from "./GtmForm";

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

  const { data: rows } = await supabase
    .from("settings")
    .select("key, value, updated_at")
    .in("key", ["make_webhook_url", "gtm_container_id"]);

  const byKey = new Map((rows ?? []).map((r) => [r.key, r]));
  const setting = byKey.get("make_webhook_url");
  const gtm = byKey.get("gtm_container_id");

  return (
    <div className="max-w-2xl">
      <p className="mono-label text-graphite mb-1">Settings</p>
      <h1 className="font-display font-bold text-2xl mb-8">Settings</h1>

      <h2 className="font-display font-bold text-xl mb-6">Lead delivery</h2>

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

      <h2 className="font-display font-bold text-xl mt-12 mb-6">Tracking</h2>

      <div className="surface rounded-3xl p-6 sm:p-8">
        <h3 className="font-medium mb-2">Google Tag Manager</h3>
        <p className="text-sm text-graphite mb-6">
          Paste your container ID to load GTM across the marketing site. Leave it empty and
          no third-party script loads at all.
        </p>
        <GtmForm
          initialId={gtm?.value ?? ""}
          updatedAt={gtm?.updated_at ?? null}
        />
      </div>
    </div>
  );
}
