import { describe, expect, it } from "vitest";

import { buildSignupUrl, isSignupHref } from "./signup-url";

const BASE =
  "https://app.dynameet.ai/signup?utm_source=dynameet.ai&utm_medium=website_cta&utm_campaign=en_selfserve&utm_content=home-hero";

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

  it("does not lowercase a mixed-case id", () => {
    const id = "$device:018F4C1E-9B2A-7C3D-8E5F-1A2B3C4D5E6F";
    expect(param(buildSignupUrl(BASE, id), "distinct_id")).toBe(id);
  });

  it("percent-encodes the $device: form on the wire so it survives transit", () => {
    expect(buildSignupUrl(BASE, "$device:abc")).toContain("distinct_id=%24device%3Aabc");
  });

  it("uses exactly the param name `distinct_id`", () => {
    const keys = [...new URL(buildSignupUrl(BASE, "$device:abc")).searchParams.keys()];
    expect(keys).toContain("distinct_id");
  });

  it("appends exactly one param and nothing else", () => {
    const before = [...new URL(BASE).searchParams.keys()];
    const after = [...new URL(buildSignupUrl(BASE, "$device:abc")).searchParams.keys()];
    expect(after).toEqual([...before, "distinct_id"]);
  });
});

describe("buildSignupUrl — preserves the existing UTMs exactly", () => {
  it("leaves every existing utm_* byte-identical", () => {
    const built = buildSignupUrl(BASE, "$device:abc");
    expect(param(built, "utm_source")).toBe("dynameet.ai");
    expect(param(built, "utm_medium")).toBe("website_cta");
    expect(param(built, "utm_campaign")).toBe("en_selfserve");
    expect(param(built, "utm_content")).toBe("home-hero");
  });

  // utm_content is what distinguishes the ~5 English CTAs from each other.
  it.each(["nav", "home-hero", "home-mid", "home-footer", "home-sticky"])(
    "preserves utm_content=%s",
    (slot) => {
      const href = BASE.replace("utm_content=home-hero", `utm_content=${slot}`);
      expect(param(buildSignupUrl(href, "$device:abc"), "utm_content")).toBe(slot);
    },
  );

  it("preserves a plan param already on the href", () => {
    const built = buildSignupUrl(`${BASE}&plan=lead`, "$device:abc");
    expect(param(built, "plan")).toBe("lead");
  });

  it("does not add any utm the href did not already have", () => {
    const built = buildSignupUrl(BASE, "$device:abc");
    expect(new URL(built).searchParams.has("utm_term")).toBe(false);
  });
});

describe("buildSignupUrl — graceful degradation", () => {
  it("returns the href untouched when the SDK gave us nothing", () => {
    for (const missing of [null, undefined, ""]) {
      expect(buildSignupUrl(BASE, missing)).toBe(BASE);
    }
  });

  it("returns a malformed base URL untouched rather than throwing", () => {
    expect(buildSignupUrl("/not-absolute", "$device:abc")).toBe("/not-absolute");
    expect(buildSignupUrl("", "$device:abc")).toBe("");
  });
});

describe("buildSignupUrl — local app-origin override", () => {
  const LOCAL = "http://localhost:3001";

  it("retargets the CTA at a dev app while keeping path, utm and distinct_id", () => {
    const built = buildSignupUrl(BASE, "$device:abc", LOCAL);
    const url = new URL(built);
    expect(url.origin).toBe(LOCAL);
    expect(url.pathname).toBe("/signup");
    expect(url.searchParams.get("utm_content")).toBe("home-hero");
    expect(url.searchParams.get("distinct_id")).toBe("$device:abc");
  });

  it("applies even when the SDK gave us no id", () => {
    expect(new URL(buildSignupUrl(BASE, null, LOCAL)).origin).toBe(LOCAL);
  });

  it("is a no-op when unset — production keeps the real destination", () => {
    expect(new URL(buildSignupUrl(BASE, "$device:abc")).origin).toBe("https://app.dynameet.ai");
    expect(new URL(buildSignupUrl(BASE, "$device:abc", "")).origin).toBe("https://app.dynameet.ai");
  });

  it("keeps the real destination when the override is unusable", () => {
    expect(new URL(buildSignupUrl(BASE, "$device:abc", "not a url")).origin).toBe("https://app.dynameet.ai");
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
    // The demo CTA is same-origin and must never be treated as a signup CTA.
    expect(isSignupHref("https://dynameet.ai/?calendarId=takumi-sawano")).toBe(false);
    expect(isSignupHref(undefined)).toBe(false);
    expect(isSignupHref(null)).toBe(false);
  });
});
