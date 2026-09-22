"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import Link from "next/link";

/**
 * Consent banner, shown only where prior consent is the expectation.
 *
 * Division of responsibility, which is the thing to understand before
 * changing anything here:
 *
 *   Analytics.tsx sets region-scoped Consent Mode defaults. Google resolves
 *   the visitor's region by IP when tags fire, so an EEA visitor is denied by
 *   default whether or not this component ever renders. That is the
 *   authoritative gate and this file cannot weaken it.
 *
 *   This component only draws the UI that lets such a visitor grant. Its own
 *   region guess therefore decides presentation, not policy. Being wrong
 *   shows a banner to someone who did not need one, which is harmless, or
 *   hides it from someone whose tags are denied anyway, which is the status
 *   quo rather than a leak.
 *
 * The guess is the browser timezone: no network call, no IP lookup, no third
 * party, nothing about the visitor leaves the page. An IP geolocation service
 * would be more precise and would mean shipping every visitor's address to a
 * vendor in order to ask whether they should be asked about privacy.
 *
 * The choice lives in localStorage rather than a cookie so it stays on the
 * device and never rides along with a request.
 */

const STORAGE_KEY = "gdb-consent";
const GRANTED = "granted";
const DENIED = "denied";

/** Timezones whose region expects prior consent. Prefixes, matched loosely. */
const CONSENT_ZONES = ["Europe/", "Atlantic/Reykjavik", "Atlantic/Canary", "Atlantic/Madeira"];

/** Europe/Istanbul, Europe/Moscow, Europe/Minsk and Europe/Kyiv are not EEA. */
const NOT_EEA = ["Europe/Istanbul", "Europe/Moscow", "Europe/Minsk", "Europe/Kiev", "Europe/Kyiv", "Europe/Volgograd", "Europe/Samara"];

function looksEuropean() {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    if (NOT_EEA.includes(tz)) return false;
    return CONSENT_ZONES.some((z) => tz.startsWith(z));
  } catch {
    // No Intl, or it threw. Show the banner: the harmless direction.
    return true;
  }
}

type Consent = typeof GRANTED | typeof DENIED;

/**
 * A tiny external store for the stored decision.
 *
 * useSyncExternalStore rather than reading localStorage in an effect and
 * calling setState: the decision is browser-only state, so deriving it during
 * render would mismatch hydration, and setting it from an effect causes the
 * cascading render the react-hooks rules exist to prevent. This is the case
 * the hook is for, and getServerSnapshot makes the server render explicit
 * instead of accidental.
 */
const listeners = new Set<() => void>();

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}

/**
 * Carries the decision when localStorage is unavailable, which is a real case
 * rather than a theoretical one: private windows and blocked site data both
 * throw here. Without it, a visitor in a private window could click Accept and
 * have nothing happen, because the store would still read "none".
 */
let memory: Consent | null = null;

/** "none" when undecided. A primitive, so React can compare snapshots. */
function getSnapshot(): Consent | "none" {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    if (v === GRANTED || v === DENIED) return v;
  } catch {
    // Fall through to the in-memory value.
  }
  return memory ?? "none";
}

/** Never render the banner on the server; only the client knows the region. */
function getServerSnapshot(): Consent | "none" | "server" {
  return "server";
}

function remember(consent: Consent) {
  memory = consent;
  try {
    localStorage.setItem(STORAGE_KEY, consent);
  } catch {
    // Blocked storage. `memory` keeps the choice for this page load.
  }
  for (const l of listeners) l();
}

function push(consent: Consent) {
  const state = {
    ad_storage: consent,
    ad_user_data: consent,
    ad_personalization: consent,
    analytics_storage: consent,
  };

  const w = window as unknown as {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  };

  // Prefer the real gtag defined by Analytics.tsx, because it pushes an
  // arguments object and that is the shape GTM's consent API documents. The
  // array fallback is structurally equivalent and covers the case where this
  // component hydrates before that inline script has run.
  if (typeof w.gtag === "function") {
    w.gtag("consent", "update", state);
    return;
  }

  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push(["consent", "update", state]);
}

export function ConsentBanner() {
  const decision = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  // The single place consent reaches the dataLayer, covering both cases with
  // one code path: replaying a stored choice on load, since Consent Mode state
  // does not survive a page load, and reacting to a click, since deciding
  // writes to the store which re-runs this. Pushing from the click handler as
  // well would emit every update twice.
  useEffect(() => {
    if (decision === GRANTED || decision === DENIED) push(decision);
  }, [decision]);

  const decide = useCallback((consent: Consent) => {
    remember(consent);
  }, []);

  // "server" during SSR, so nothing renders and hydration cannot mismatch.
  const open = decision === "none" && looksEuropean();

  // Flag the document while the banner is up. The sticky mobile CTA is also a
  // fixed bottom bar, and on a phone the two stack into one confused block
  // with the CTA hidden underneath. globals.css hides the CTA off this
  // attribute, which keeps the coordination to one CSS rule rather than
  // wiring shared state through two unrelated components.
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    root.dataset.consentOpen = "1";
    return () => {
      delete root.dataset.consentOpen;
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      role="region"
      aria-label="Cookie consent"
      /* Above the sticky mobile CTA (z-30) and clear of it vertically, so the
         two bars never stack on top of each other on a phone. */
      className="fixed inset-x-0 bottom-0 z-40 p-3 sm:p-4 lg:bottom-0"
      style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))" }}
    >
      <div className="mx-auto max-w-3xl rounded-2xl bg-ink text-paper p-5 sm:p-6 shadow-2xl flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <p className="mono-label" style={{ color: "var(--signal-bright)" }}>
            Cookies
          </p>
          <p className="text-paper/90 text-sm sm:text-base">
            We use analytics and advertising cookies to understand which pages bring
            enquiries. Decline and the site works exactly the same, we just measure less.{" "}
            <Link href="/privacy" className="underline hover:text-paper">
              Privacy policy
            </Link>
            .
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
          <button
            type="button"
            onClick={() => decide(GRANTED)}
            className="press inline-flex items-center justify-center h-12 px-6 rounded-full bg-signal-bright text-ink font-medium"
          >
            Accept
          </button>
          <button
            type="button"
            onClick={() => decide(DENIED)}
            className="press inline-flex items-center justify-center h-12 px-6 rounded-full border border-paper/30 text-paper font-medium hover:border-paper/60 transition-colors"
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * Footer control for changing a decision later. Withdrawing consent has to be
 * as easy as giving it, and a banner that never returns fails that.
 *
 * Rendered for everyone, not just the visitors who saw the banner: someone
 * outside the EEA is granted by default and has no other way to opt out.
 */
export function ConsentReset({ className }: { className?: string }) {
  const [done, setDone] = useState(false);
  // Only offer this where there is something to decline. Analytics.tsx
  // defines gtag in an inline script that runs at parse time, so by the time
  // this hydrates the answer is already settled and the subscription never
  // needs to fire. Without the check, a site with no container configured
  // offers cookie settings on a page whose privacy policy correctly says it
  // sets no cookies.
  const hasTagging = useSyncExternalStore(
    subscribe,
    () => typeof (window as unknown as { gtag?: unknown }).gtag === "function",
    () => false,
  );

  if (!hasTagging) return null;

  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        remember(DENIED);
        setDone(true);
      }}
    >
      {done ? "Cookies declined" : "Cookie settings"}
    </button>
  );
}
