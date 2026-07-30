import { beforeEach, describe, expect, it } from "vitest";

import {
  claimLandingView,
  demoSourceFromHref,
  detectLanguage,
  isBookingWidgetUrl,
  LANDING_VIEWED_CLAIM_KEY,
  shouldTrackLandingView,
} from "./analytics-context";

/** Minimal in-memory Storage stand-in. */
function fakeStorage(): Storage {
  const map = new Map<string, string>();
  return {
    getItem: (k: string) => map.get(k) ?? null,
    setItem: (k: string, v: string) => void map.set(k, v),
    removeItem: (k: string) => void map.delete(k),
    clear: () => map.clear(),
    key: (i: number) => [...map.keys()][i] ?? null,
    get length() {
      return map.size;
    },
  } as Storage;
}

/** Storage that throws on every access (private mode / quota exceeded). */
function hostileStorage(): Storage {
  const boom = () => {
    throw new Error("SecurityError");
  };
  return { getItem: boom, setItem: boom } as unknown as Storage;
}

describe("detectLanguage", () => {
  it.each(["/en", "/en/", "/en/pricing/", "/en/blog/some-post-en/"])(
    "classifies %s as English",
    (p) => expect(detectLanguage(p)).toBe("en"),
  );

  it.each(["/", "/pricing/", "/chat/", "/cases/edulinx/"])(
    "classifies %s as Japanese",
    (p) => expect(detectLanguage(p)).toBe("ja"),
  );

  // The bug a naive startsWith("/en") would introduce: /enterprise/ is a
  // Japanese page and must not be filed into the English funnel.
  it.each(["/enterprise/", "/enterprise", "/energy/", "/en-us/"])(
    "does not misclassify %s as English",
    (p) => expect(detectLanguage(p)).toBe("ja"),
  );
});

describe("isBookingWidgetUrl", () => {
  it("detects the demo CTA's booking-widget navigation", () => {
    expect(isBookingWidgetUrl("?calendarId=takumi-sawano&showChat=true")).toBe(true);
    expect(isBookingWidgetUrl("calendarId=takumi-sawano")).toBe(true);
  });

  it("is false for an ordinary landing", () => {
    expect(isBookingWidgetUrl("")).toBe(false);
    expect(isBookingWidgetUrl("?utm_source=google&utm_medium=cpc")).toBe(false);
  });

  it("does not match a merely similar param name", () => {
    expect(isBookingWidgetUrl("?calendar=x")).toBe(false);
    expect(isBookingWidgetUrl("?mycalendarId=x")).toBe(false);
  });
});

describe("claimLandingView", () => {
  let storage: Storage;
  beforeEach(() => {
    storage = fakeStorage();
  });

  it("grants the claim exactly once per tab session", () => {
    expect(claimLandingView(storage)).toBe(true);
    expect(claimLandingView(storage)).toBe(false);
    expect(claimLandingView(storage)).toBe(false);
  });

  it("records the claim under the documented key", () => {
    claimLandingView(storage);
    expect(storage.getItem(LANDING_VIEWED_CLAIM_KEY)).toBe("1");
  });

  it("a fresh tab session gets its own claim", () => {
    claimLandingView(storage);
    expect(claimLandingView(fakeStorage())).toBe(true);
  });

  // Losing the funnel's first step entirely is worse than a rare duplicate.
  it("fails open when storage is unavailable or throws", () => {
    expect(claimLandingView(undefined)).toBe(true);
    expect(claimLandingView(hostileStorage())).toBe(true);
  });
});

describe("shouldTrackLandingView", () => {
  it("tracks an ordinary first landing", () => {
    expect(shouldTrackLandingView("", fakeStorage())).toBe(true);
  });

  it("does not re-count a reload mid-journey", () => {
    const storage = fakeStorage();
    expect(shouldTrackLandingView("?utm_source=google", storage)).toBe(true);
    expect(shouldTrackLandingView("?utm_source=google", storage)).toBe(false);
  });

  // The exact double-count this guard exists for: clicking the demo CTA is a
  // same-origin navigation to /?calendarId=… and must not inflate the funnel.
  it("skips the booking-widget view the demo CTA navigates to", () => {
    expect(shouldTrackLandingView("?calendarId=takumi-sawano&showChat=true", fakeStorage())).toBe(false);
  });

  it("does not burn the claim on a skipped booking view", () => {
    const storage = fakeStorage();
    expect(shouldTrackLandingView("?calendarId=takumi-sawano", storage)).toBe(false);
    // The visitor's genuine landing later in the same tab still counts.
    expect(shouldTrackLandingView("", storage)).toBe(true);
  });
});

describe("demoSourceFromHref", () => {
  it("reads the CTA slot off utm_medium", () => {
    expect(
      demoSourceFromHref("https://dynameet.ai/?calendarId=takumi-sawano&showChat=true&utm_source=website&utm_medium=nav&utm_campaign=demo"),
    ).toBe("nav");
  });

  it("falls back to 'unknown' rather than throwing", () => {
    expect(demoSourceFromHref("https://dynameet.ai/?calendarId=x")).toBe("unknown");
    expect(demoSourceFromHref("not a url")).toBe("unknown");
  });
});
