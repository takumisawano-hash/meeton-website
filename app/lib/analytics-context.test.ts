import { beforeEach, describe, expect, it } from "vitest";

import {
  claimLandingView,
  DEMO_CONTEXT_KEY,
  DEMO_CONTEXT_TTL_MS,
  DEFAULT_DEMO_SOURCE,
  demoSourceFromArg,
  demoSourceFromHref,
  detectLanguage,
  isBookingWidgetUrl,
  isMeetingBookedMessage,
  LANDING_VIEWED_CLAIM_KEY,
  MEETON_APP_ORIGIN,
  readLandingPath,
  recallDemoContext,
  rememberDemoContext,
  resolveBookedContext,
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

describe("isMeetingBookedMessage", () => {
  it("accepts the widget's booking-completed message", () => {
    expect(isMeetingBookedMessage(MEETON_APP_ORIGIN, { type: "meetingBooked", data: {} })).toBe(true);
  });

  // The guard that makes a devtools window.postMessage fail: it would carry
  // this site's origin, not the widget's.
  it.each([
    "https://dynameet.ai",
    "https://app.dynameet.ai.evil.com",
    "http://app.dynameet.ai",
    "https://api.dynameet.ai",
    "null",
    "",
  ])("rejects origin %s", (origin) => {
    expect(isMeetingBookedMessage(origin, { type: "meetingBooked" })).toBe(false);
  });

  // The widget's channel is busy; only one message type is a booking.
  it.each(["setIframeDimensions", "chatOpen", "exitFullScreen", "init", "meetingbooked"])(
    "ignores unrelated widget message %s",
    (type) => expect(isMeetingBookedMessage(MEETON_APP_ORIGIN, { type })).toBe(false),
  );

  // event.data is not always an object on this channel.
  it.each([undefined, null, "meetingBooked", 42, true, []])(
    "survives non-object data %s",
    (data) => expect(isMeetingBookedMessage(MEETON_APP_ORIGIN, data)).toBe(false),
  );

  it("ignores a missing type", () => {
    expect(isMeetingBookedMessage(MEETON_APP_ORIGIN, { data: {} })).toBe(false);
  });
});

describe("readLandingPath", () => {
  it("reads landingPath out of the attribution payload", () => {
    expect(readLandingPath({ landingPath: "/chat/", firstSeenAt: "2026-08-03" })).toBe("/chat/");
  });

  // A mutable global any script can overwrite: degrade, never throw.
  it.each([
    undefined,
    null,
    {},
    "nope",
    42,
    { landingPath: "" },
    { landingPath: 42 },
    { landingPath: null },
  ])("returns undefined for %s", (attribution) => {
    expect(readLandingPath(attribution)).toBeUndefined();
  });
});

describe("demo context stash", () => {
  const NOW = 1_700_000_000_000;

  it("round-trips source and language across a navigation", () => {
    const storage = fakeStorage();
    rememberDemoContext(storage, { source: "nav", language: "ja" }, NOW);
    expect(recallDemoContext(storage, NOW)).toEqual({ source: "nav", language: "ja" });
  });

  it("returns null when no demo was requested (chat-initiated booking)", () => {
    expect(recallDemoContext(fakeStorage(), NOW)).toBeNull();
  });

  // Deliberate: a second booking inside the TTL inherits the first's source
  // rather than losing it.
  it("does not consume the record on read", () => {
    const storage = fakeStorage();
    rememberDemoContext(storage, { source: "cta", language: "en" }, NOW);
    recallDemoContext(storage, NOW);
    expect(recallDemoContext(storage, NOW)).toEqual({ source: "cta", language: "en" });
  });

  it("overwrites an earlier request with the most recent one", () => {
    const storage = fakeStorage();
    rememberDemoContext(storage, { source: "nav", language: "ja" }, NOW);
    rememberDemoContext(storage, { source: "pricing-lead", language: "ja" }, NOW);
    expect(recallDemoContext(storage, NOW)).toEqual({ source: "pricing-lead", language: "ja" });
  });

  // A click at 09:00 must not claim credit for a chat booking at 17:00.
  it("expires once the TTL has passed", () => {
    const storage = fakeStorage();
    rememberDemoContext(storage, { source: "nav", language: "ja" }, NOW);
    expect(recallDemoContext(storage, NOW + DEMO_CONTEXT_TTL_MS)).not.toBeNull();
    expect(recallDemoContext(storage, NOW + DEMO_CONTEXT_TTL_MS + 1)).toBeNull();
  });

  it("rejects a record with no usable timestamp", () => {
    const storage = fakeStorage();
    storage.setItem(DEMO_CONTEXT_KEY, JSON.stringify({ source: "nav", language: "ja" }));
    expect(recallDemoContext(storage, NOW)).toBeNull();
    storage.setItem(DEMO_CONTEXT_KEY, JSON.stringify({ source: "nav", language: "ja", at: "soon" }));
    expect(recallDemoContext(storage, NOW)).toBeNull();
  });

  // "" would pass validation, trigger the language rule, then be dropped by
  // trackDemoBooked — the worst of both branches.
  it("rejects an empty source rather than half-honouring it", () => {
    const storage = fakeStorage();
    storage.setItem(DEMO_CONTEXT_KEY, JSON.stringify({ source: "", language: "ja", at: NOW }));
    expect(recallDemoContext(storage, NOW)).toBeNull();
  });

  it.each(['{"source":"nav"}', '{"language":"ja"}', '{"source":"nav","language":"de"}', '{"source":1,"language":"ja"}', "null", "[]", "not json"])(
    "rejects the unusable record %s",
    (raw) => {
      const storage = fakeStorage();
      storage.setItem(DEMO_CONTEXT_KEY, raw);
      expect(recallDemoContext(storage, NOW)).toBeNull();
    },
  );

  it("stays silent when storage is unavailable", () => {
    expect(() => rememberDemoContext(hostileStorage(), { source: "nav", language: "ja" })).not.toThrow();
    expect(recallDemoContext(hostileStorage())).toBeNull();
    expect(() => rememberDemoContext(undefined, { source: "nav", language: "ja" })).not.toThrow();
    expect(recallDemoContext(undefined)).toBeNull();
  });
});

describe("resolveBookedContext", () => {
  const JA_STASH = { source: "nav", language: "ja" as const };

  it("falls back to the page language when nothing was stashed", () => {
    expect(resolveBookedContext(null, "/en/pricing/", "")).toEqual({ language: "en" });
    expect(resolveBookedContext(null, "/", "")).toEqual({ language: "ja" });
  });

  // The case the stash exists for: the CTA fallback navigates to the JA root,
  // so the page's own path cannot be trusted.
  it("trusts the stashed language on the booking-widget URL", () => {
    expect(resolveBookedContext({ source: "nav", language: "en" }, "/", "?calendarId=takumi-sawano")).toEqual({
      language: "en",
      source: "nav",
    });
  });

  // The regression this rule was extracted to prevent: clicking a JA CTA,
  // abandoning it, switching language, then booking from the chat widget must
  // NOT file an English booking into the Japanese funnel.
  it("does not let a stale stash override a genuine EN booking", () => {
    expect(resolveBookedContext(JA_STASH, "/en/pricing/", "")).toEqual({
      language: "en",
      source: "nav",
    });
  });

  it("keeps source regardless of which language wins", () => {
    expect(resolveBookedContext(JA_STASH, "/en/", "").source).toBe("nav");
    expect(resolveBookedContext(JA_STASH, "/", "?calendarId=x").source).toBe("nav");
  });

  it("does not misfile /enterprise/ as English", () => {
    expect(resolveBookedContext(null, "/enterprise/", "").language).toBe("ja");
  });
});

describe("demoSourceFromArg", () => {
  it("keeps a named source", () => {
    expect(demoSourceFromArg("home-hero")).toBe("home-hero");
    expect(demoSourceFromArg("chat-final")).toBe("chat-final");
  });

  // The whole reason this guard exists: `onClick={openMeetonCalendar}` hands
  // the function a MouseEvent, which would otherwise reach Mixpanel as
  // "[object Object]" and poison the source breakdown.
  it("falls back when React passes an event instead of a source", () => {
    const mouseEventish = { type: "click", bubbles: true, target: {} };
    expect(demoSourceFromArg(mouseEventish)).toBe(DEFAULT_DEMO_SOURCE);
  });

  it.each([undefined, null, "", 0, 42, true, [], () => {}])(
    "falls back for %s",
    (arg) => expect(demoSourceFromArg(arg)).toBe(DEFAULT_DEMO_SOURCE),
  );

  it("keeps the historical default value", () => {
    expect(DEFAULT_DEMO_SOURCE).toBe("widget-button");
  });
});
