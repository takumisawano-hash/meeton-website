import { describe, expect, it } from "vitest";

import { buildSignupUrl, isSignupHref } from "./signup-url";

const BASE =
  "https://app.dynameet.ai/signup?utm_source=dynameet.ai&utm_medium=website_cta&utm_campaign=en_selfserve&utm_content=footer";

/** Reads a param back off a built URL. */
function param(url: string, key: string): string | null {
  return new URL(url).searchParams.get(key);
}

describe("buildSignupUrl — distinct_id contract", () => {
  // The app accepts a bare uuid or $device:<uuid> and rejects anything else,
  // so both forms must survive the round trip byte-for-byte.
  it("passes a bare uuid through verbatim", () => {
    const id = "018f4c1e-9b2a-7c3d-8e5f-1a2b3c4d5e6f";
    expect(param(buildSignupUrl(BASE, id), "distinct_id")).toBe(id);
  });

  it("passes the $device: form through verbatim, including $ and :", () => {
    const id = "$device:018f4c1e-9b2a-7c3d-8e5f-1a2b3c4d5e6f";
    expect(param(buildSignupUrl(BASE, id), "distinct_id")).toBe(id);
  });

  it("percent-encodes the $device: form on the wire so it survives transit", () => {
    const built = buildSignupUrl(BASE, "$device:abc");
    expect(built).toContain("distinct_id=%24device%3Aabc");
  });

  it("uses exactly the param name `distinct_id`", () => {
    const built = buildSignupUrl(BASE, "$device:abc");
    expect([...new URL(built).searchParams.keys()]).toContain("distinct_id");
  });
});

describe("buildSignupUrl — graceful degradation", () => {
  it("omits distinct_id entirely when the SDK gave us nothing", () => {
    for (const missing of [null, undefined, ""]) {
      const built = buildSignupUrl(BASE, missing);
      expect(new URL(built).searchParams.has("distinct_id")).toBe(false);
    }
  });

  it("leaves the rest of the URL intact when distinct_id is missing", () => {
    const built = buildSignupUrl(BASE, null);
    expect(param(built, "utm_campaign")).toBe("en_selfserve");
    expect(new URL(built).pathname).toBe("/signup");
  });

  it("returns a malformed base URL untouched rather than throwing", () => {
    expect(buildSignupUrl("/not-absolute", "$device:abc")).toBe("/not-absolute");
    expect(buildSignupUrl("", "$device:abc")).toBe("");
  });

  it("keeps the CTA's own utm_* when the search string is unusable", () => {
    const built = buildSignupUrl(BASE, "$device:abc", "%%%");
    expect(param(built, "utm_source")).toBe("dynameet.ai");
    expect(param(built, "distinct_id")).toBe("$device:abc");
  });
});

describe("buildSignupUrl — utm_* carry-over", () => {
  it("carries a utm_* the CTA does not set (utm_term)", () => {
    const built = buildSignupUrl(BASE, "$device:abc", "?utm_term=ai%20sdr");
    expect(param(built, "utm_term")).toBe("ai sdr");
  });

  it("accepts a search string with or without the leading ?", () => {
    expect(param(buildSignupUrl(BASE, null, "utm_term=x"), "utm_term")).toBe("x");
    expect(param(buildSignupUrl(BASE, null, "?utm_term=x"), "utm_term")).toBe("x");
  });

  // Documented precedence decision (spec §5). Load-bearing for GA: letting a
  // page's utm_source=google through would rewrite what the APP's GA4 sees for
  // every paid signup and reclassify those sessions as Paid Search.
  it("lets the CTA defaults win over page utm_*", () => {
    const built = buildSignupUrl(BASE, null, "?utm_source=google&utm_medium=cpc");
    expect(param(built, "utm_source")).toBe("dynameet.ai");
    expect(param(built, "utm_medium")).toBe("website_cta");
  });

  it("does not duplicate a utm key the CTA already set", () => {
    const built = buildSignupUrl(BASE, null, "?utm_source=google");
    expect(new URL(built).searchParams.getAll("utm_source")).toEqual(["dynameet.ai"]);
  });

  it("keeps CTA defaults for utm keys the page does not set", () => {
    const built = buildSignupUrl(BASE, null, "?utm_source=google");
    expect(param(built, "utm_content")).toBe("footer");
    expect(param(built, "utm_campaign")).toBe("en_selfserve");
  });

  it("does not let an empty page value blank out a CTA default", () => {
    const built = buildSignupUrl(BASE, null, "?utm_source=");
    expect(param(built, "utm_source")).toBe("dynameet.ai");
  });

  it("does not forward click ids — AttributionBootstrap owns those", () => {
    const built = buildSignupUrl(BASE, null, "?gclid=Cj0KCQ&fbclid=abc&msclkid=xyz");
    const keys = [...new URL(built).searchParams.keys()];
    expect(keys).not.toContain("gclid");
    expect(keys).not.toContain("fbclid");
    expect(keys).not.toContain("msclkid");
  });

  it("does not forward unrelated params such as a preselected plan", () => {
    const built = buildSignupUrl(BASE, null, "?plan=enterprise&ref=spam");
    expect(new URL(built).searchParams.has("ref")).toBe(false);
    // `plan` on the signup URL comes from trialUrl(), never from the page.
    expect(new URL(built).searchParams.has("plan")).toBe(false);
  });

  it("preserves a plan already set by trialUrl()", () => {
    const withPlan = `${BASE}&plan=lead`;
    const built = buildSignupUrl(withPlan, "$device:abc", "?utm_source=google");
    expect(param(built, "plan")).toBe("lead");
  });
});

describe("isSignupHref", () => {
  it("matches the app signup URL in the data-driven link arrays", () => {
    expect(isSignupHref(BASE)).toBe(true);
    expect(isSignupHref("https://app.dynameet.ai/signup")).toBe(true);
  });

  it("does not match other destinations", () => {
    expect(isSignupHref("/en/pricing/")).toBe(false);
    expect(isSignupHref("https://app.dynameet.ai/login")).toBe(false);
    expect(isSignupHref(undefined)).toBe(false);
    expect(isSignupHref(null)).toBe(false);
  });
});
