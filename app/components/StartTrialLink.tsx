"use client";

import type { CSSProperties, MouseEvent, ReactNode } from "react";

import { trialUrl } from "@/app/lib/cta-urls";
import { trackStartTrialClick, useSignupHref } from "@/app/lib/mixpanel";

/**
 * StartTrialLink — a Start Trial CTA that carries the visitor's Mixpanel id
 * to app.dynameet.ai/signup, joining this site's funnel to the app's.
 * Spec: docs/superpowers/specs/2026-07-30-mixpanel-funnel-handshake-design.md
 *
 * Client island ONLY so the click can fire the funnel event and the href can
 * be upgraded after hydration — same pattern and rationale as CTAButtons.
 *
 * GA: this component fires Mixpanel only. It deliberately does NOT add gtag /
 * dataLayer events, so GA event counts stay exactly as they are and no new or
 * duplicated conversions show up in the marketing team's reports. Call sites
 * that already fire GA pass their existing handler through `onClick` — it runs
 * untouched, with the same arguments, on every click.
 *
 * Degrades safely: the SSR href is the plain trialUrl(), so the CTA works with
 * JS disabled, with Mixpanel blocked, and before hydration.
 */
type Props = {
  /** Funnel source label, e.g. "footer" / "pricing-lead". Becomes the
   *  Mixpanel `Start Trial Clicked.source` property and trialUrl's utm_content. */
  source: string;
  /** Explicit base URL. Defaults to trialUrl(source, plan). Used by the
   *  data-driven link renderers, which carry a hardcoded signup URL. */
  href?: string;
  /** Preselects a plan on the signup form (trialUrl's `plan` param). */
  plan?: string;
  className?: string;
  style?: CSSProperties;
  /** Existing call-site handler (e.g. a gtag conversion event, closing a
   *  mobile menu). Runs after the Mixpanel event, unmodified. */
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
  "aria-label"?: string;
  children: ReactNode;
};

export default function StartTrialLink({
  source,
  href,
  plan,
  className,
  style,
  onClick,
  children,
  "aria-label": ariaLabel,
}: Props) {
  const upgradedHref = useSignupHref(href ?? trialUrl(source, plan));

  return (
    <a
      href={upgradedHref}
      className={className}
      style={style}
      aria-label={ariaLabel}
      onClick={(e) => {
        trackStartTrialClick(source);
        onClick?.(e);
      }}
    >
      {children}
    </a>
  );
}
