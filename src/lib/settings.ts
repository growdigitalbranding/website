import { unstable_cache } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";

/**
 * Settings the public site needs to read.
 *
 * Read through the service role rather than by loosening RLS on the settings
 * table, because that table also holds the Make webhook URL. A policy that
 * opened it to anonymous readers for the sake of one harmless key would be one
 * mistake away from publishing a credential.
 *
 * Cached and tagged rather than read per request: the root layout renders on
 * every page, so an uncached query here would make the entire marketing site
 * dynamic and give up its static build for a value that changes twice a year.
 * Saving in the dashboard revalidates the tag, so a change still appears
 * immediately.
 *
 * unstable_cache is deprecated in favour of `use cache`, which requires
 * turning on cacheComponents for the whole project — a disproportionate change
 * to cache one string. Revisit when the project adopts it for other reasons.
 */
export const SETTINGS_TAG = "site-settings";

export const getGtmContainerId = unstable_cache(
  async (): Promise<string | null> => {
    const db = createAdminClient();
    if (!db) return null;

    const { data } = await db
      .from("settings")
      .select("value")
      .eq("key", "gtm_container_id")
      .maybeSingle();

    const value = data?.value?.trim();
    // Validated again on the way out. The write path already checks the shape,
    // but this string is interpolated into a script tag, so it is verified at
    // the point of use rather than trusted because it was checked earlier.
    return value && /^GTM-[A-Z0-9]{4,10}$/.test(value) ? value : null;
  },
  ["gtm-container-id"],
  { tags: [SETTINGS_TAG], revalidate: 3600 }
);
