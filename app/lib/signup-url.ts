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
 * no trim, no reformat, no lowercase, no wrapping. URLSearchParams handles
 * the encoding.
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
 * Append the visitor's Mixpanel id to an English signup CTA.
 *
 * APPEND ONLY. The existing `utm_source` / `utm_medium` / `utm_campaign` /
 * `utm_content` on the href are preserved exactly — never rewritten, replaced
 * or regenerated. `utm_content` in particular distinguishes nav / home-hero /
 * home-mid / home-footer / home-sticky, and the app's GA4 reporting is keyed
 * on these values.
 *
 * Page-level `utm_*` are deliberately NOT merged in: that would change what
 * the app's GA4 sees for paid signups (reports keyed on
 * utm_source=dynameet.ai stop matching; utm_medium=cpc reclassifies the
 * session as Paid Search). Campaign attribution is already preserved in
 * Mixpanel, which auto-captures the page's utm_* onto `Landing Viewed` — an
 * event that shares a profile with the app's `Signup Landed`.
 *
 * Never throws: a malformed base URL is returned untouched so the CTA keeps
 * working.
 *
 * @param baseUrl    the existing signup href, with its utm_* already on it
 * @param distinctId mixpanel.get_distinct_id(), or null when unavailable
 * @param appOrigin  LOCAL TESTING ONLY. Retargets the CTA at a dev build of
 *   the app (e.g. "http://localhost:3001"). Unset in production, where the
 *   href's own origin is used. This exists because the handshake can only be
 *   tested with BOTH halves on the same Mixpanel project: production
 *   app.dynameet.ai reports to the production project, so a dev-token
 *   marketing build clicking through to it lands the two events in different
 *   projects — indistinguishable from a genuinely broken handshake.
 */
export function buildSignupUrl(
  baseUrl: string,
  distinctId: string | null | undefined,
  appOrigin?: string,
): string {
  if (!distinctId && !appOrigin) return baseUrl;

  let url: URL;
  try {
    url = new URL(baseUrl);
  } catch {
    // Relative or malformed href — nothing safe to append to.
    return baseUrl;
  }

  if (appOrigin) {
    try {
      url = new URL(url.pathname + url.search, appOrigin);
    } catch {
      /* unusable override — keep the real destination */
    }
  }

  if (!distinctId) return url.toString();

  // Verbatim. The app rejects anything that is not a bare uuid or $device:<uuid>.
  url.searchParams.set(DISTINCT_ID_PARAM, distinctId);
  return url.toString();
}
