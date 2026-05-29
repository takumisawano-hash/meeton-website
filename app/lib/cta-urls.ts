// Centralized CTA destinations (spec §3.3 / §1.2 dual CTA).
// Free signup = self-serve PLG entry (no credit card, Google/MS one-click).
// Demo = sales lane via the Meeton booking widget.

const SIGNUP_BASE = 'https://app.dynameet.ai/signup'
const DEMO_BASE = 'https://dynameet.ai/'

/** Free-signup URL with UTM source so funnel attribution survives. */
export function signupUrl(source = 'website'): string {
  const p = new URLSearchParams({
    utm_source: 'website',
    utm_medium: source,
    utm_campaign: 'free-signup',
  })
  return `${SIGNUP_BASE}?${p.toString()}`
}

/** Demo-booking URL (Meeton widget calendar). */
export function demoUrl(source = 'website'): string {
  const p = new URLSearchParams({
    calendarId: 'takumi-sawano',
    showChat: 'true',
    utm_source: 'website',
    utm_medium: source,
    utm_campaign: 'demo',
  })
  return `${DEMO_BASE}?${p.toString()}`
}
