/**
 * Pure signup-URL builder — the marketing half of the Mixpanel funnel
 * handshake (spec: docs/superpowers/specs/2026-07-30-mixpanel-funnel-handshake-design.md).
 *
 * Deliberately free of the Mixpanel SDK, `window` and React so the contract
 * the app validates is unit-testable in isolation. The SDK glue lives in
 * app/lib/mixpanel.ts.
 *
 * The app at app.dynameet.ai reads `?distinct_id=` off /signup and calls
 * mixpanel.identify() with it before emitting `Signup Landed`. It accepts a
 * bare uuid or the SDK's `$device:<uuid>` form and REJECTS anything else —
 * so whatever get_distinct_id() returned is passed through verbatim here:
 * no trim, no reformat, no wrapping. URLSearchParams handles the encoding.
 */

/** The one param name the app looks for. Do not rename. */
const DISTINCT_ID_PARAM = "distinct_id";

const SIGNUP_URL_MARKER = "app.dynameet.ai/signup";

/**
 * True for URLs pointing at the app's self-serve signup. Used by the
 * data-driven link renderers (Footer, PricingContent) so a hardcoded signup
 * URL dropped into their link arrays still gets the handshake treatment.
 */
export function isSignupHref(href: string | undefined | null): boolean {
  return typeof href === "string" && href.includes(SIGNUP_URL_MARKER);
}

/**
 * Append the visitor's Mixpanel id, plus any utm_* on the current page, to a
 * signup URL.
 *
 * utm_* precedence: params on the CURRENT PAGE WIN over the defaults baked
 * into trialUrl(). The inbound campaign (e.g. utm_source=google) is the true
 * acquisition source, which is what the funnel needs to attribute revenue.
 * Section attribution ("nav" / "footer" / "pricing-lead") is not lost — it
 * rides on Mixpanel's `Start Trial Clicked.source` property instead, which is
 * more reliable than utm_content. To flip this, swap the `set` below for a
 * `has()` guard.
 *
 * Only `utm_*` is carried. Click ids (gclid/fbclid/msclkid) are deliberately
 * NOT forwarded — they are already persisted cross-subdomain by
 * AttributionBootstrap's `_meeton_attr` cookie, and duplicating them here
 * would let a stale marketing-page gclid overwrite the app's own.
 *
 * Never throws: a malformed base URL is returned untouched so the CTA keeps
 * working.
 *
 * @param baseUrl       the signup URL from trialUrl()
 * @param distinctId    mixpanel.get_distinct_id(), or null when unavailable
 * @param currentSearch window.location.search (leading "?" optional)
 */
export function buildSignupUrl(
  baseUrl: string,
  distinctId: string | null | undefined,
  currentSearch = "",
): string {
  let url: URL;
  try {
    url = new URL(baseUrl);
  } catch {
    // Relative or malformed href — nothing safe to append to.
    return baseUrl;
  }

  try {
    const incoming = new URLSearchParams(currentSearch);
    incoming.forEach((value, key) => {
      if (key.startsWith("utm_") && value) url.searchParams.set(key, value);
    });
  } catch {
    /* unparseable search string — keep the CTA's own utm_* */
  }

  // Verbatim. The app rejects anything that is not a bare uuid or $device:<uuid>.
  if (distinctId) url.searchParams.set(DISTINCT_ID_PARAM, distinctId);

  return url.toString();
}
