"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { STAGES, PRODUCT_IN_STAGE } from "@/app/lib/stages";
import { openDemoCalendarInPlace } from "@/app/lib/cta-urls";
import { t, enTwinFor, type Lang } from "@/app/lib/i18n";

// Persist a manual language choice so the geo middleware (middleware.ts) stops
// auto-redirecting and respects the visitor's pick. 1-year cookie, site-wide.
function setLangPref(lang: Lang) {
  try {
    document.cookie = `pref_lang=${lang}; path=/; max-age=31536000; samesite=lax`;
  } catch {
    /* SSR / cookies disabled — navigation still proceeds */
  }
}

// ── Meeton ai v2 global navigation (2026-05-29 rebuild) ──────────────
// IA: 製品 ▾ | 活用 ▾ | 事例 | 料金 | リソース ▾ | [料金を見る][デモを予約]
// (2026-06-04 sales-led pivot: free tier removed, demo is the primary CTA)
// Spec §3.8 design: navy = frame → the header bar itself is navy with a
// white wordmark; dropdown panels are white (reading/decision surface).
// green (#07CB79 / --cta) is the single accent → primary CTA + hovers.
// Dual CTA is permanent on every page (§1.2): never collapse to one.

// 2026-06-04 sales-led pivot (deck p19, free tier removed): primary CTA is
// demo booking, secondary is the pricing page.
const PRICING_URL = "/pricing/";
const DEMO_URL =
  "https://dynameet.ai/?calendarId=takumi-sawano&showChat=true&utm_source=website&utm_medium=nav&utm_campaign=demo";
const CAREERS_APPLY_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSe57dBjNsS3pG0QYZAVRFJk4wPKOv6GX7WBF-1tisAslnq5OQ/viewform?usp=dialog";

type NavProps = {
  variant?: "light" | "dark" | "minimal";
  langSwitchHref?: string;
  langSwitchLabel?: string;
  /** locale (JA default). EN swaps labels + the IA below to /en/* where pages
   *  exist; untranslated sections point at their root (JA) URL (interim, no
   *  dead links). JA omits the prop → byte-identical output. */
  lang?: Lang;
};

type Item = { href: string; label: string; sub?: string };

// Product dropdown grouped by the 3 stages (deck p7 / stages.ts). The header
// is job-led: each stage is ONE primary link to its stage/landing page
// (capture→/capture, convert→/calendar, follow→/email). Product names are
// listed small underneath as the means (2026-06-04: 仕事主役・製品名は脇役).
const STAGE_NAV: { stage: string; transform: string; href: string; products: Item[] }[] = STAGES.map((s) => ({
  stage: `${s.num} ${s.title}`,
  transform: s.transform,
  href: s.href,
  products: s.products.map((p) => ({
    href: `/${p}/`,
    label: PRODUCT_IN_STAGE[p].name,
    sub: PRODUCT_IN_STAGE[p].line,
  })),
}));
// flat list (mobile fallback): stage links + their product detail links
const PRODUCT_ITEMS: Item[] = STAGE_NAV.flatMap((g) => g.products);
const PLATFORM_ITEM: Item = {
  href: "/",
  label: "Meeton ai（3ステージの統合）",
  sub: "掴む→商談化→追客で一気通貫の AI SDR",
};
const SOLUTION_ROLES: Item[] = [
  { href: "/solutions/cmo/", label: "CMO / マーケ責任者" },
  { href: "/solutions/cro/", label: "CRO / 営業責任者" },
  { href: "/solutions/sdr/", label: "IS / SDR 責任者" },
  { href: "/solutions/ceo/", label: "経営者" },
];
const USE_MOMENTS: Item[] = [
  { href: "/use-cases/pre-inquiry/", label: "問い合わせ前", sub: "① 掴む" },
  { href: "/use-cases/post-download/", label: "資料 DL 後", sub: "①→② 商談化" },
  { href: "/use-cases/revisit/", label: "再訪問", sub: "② 商談化 / ③ 追客" },
  { href: "/use-cases/nurture/", label: "追客", sub: "③ 追客" },
];
const RESOURCE_ITEMS: Item[] = [
  { href: "/blog/", label: "ブログ", sub: "獲得・商談化の実践知" },
  { href: "/glossary/ai-sdr/", label: "用語集", sub: "AI SDR とは ほか" },
  { href: "/cases/", label: "導入事例", sub: "成果が出たアカウント" },
  { href: "/tools/roi/", label: "ROI 診断", sub: "商談化の余地を試算" },
];

// ── English IA (lang="en") ──────────────────────────────────────────
// Only the 4 product LPs exist under /en/* today. Stage landing pages
// (capture/calendar/email = stage.href) and every other section are JA-only,
// so their nav links point at the ROOT (JA) URL — interim, never a dead /en
// link. The 4 products get /en/<slug>/.
const EN_PRODUCT_NAME: Record<string, { name: string; line: string }> = {
  chat: { name: "Meeton Chat", line: "Convert visitors into leads in conversation." },
  library: { name: "Meeton Library", line: "Auto-nurture prospects with content." },
  calendar: { name: "Meeton Calendar", line: "Book the meeting the instant intent peaks." },
  email: { name: "Meeton Email", line: "Pursue unbooked leads 1:1 and re-convert." },
};
const EN_STAGE: Record<string, { stage: string; transform: string }> = {
  capture: { stage: "① Capture & Nurture", transform: "Prospects → Leads" },
  convert: { stage: "② Convert", transform: "Leads → Meetings" },
  follow: { stage: "③ Win back", transform: "Recover lost leads" },
};
const STAGE_NAV_EN: { stage: string; transform: string; href: string; products: Item[] }[] = STAGES.map((s) => ({
  stage: EN_STAGE[s.id].stage,
  transform: EN_STAGE[s.id].transform,
  href: s.href, // JA stage landing page (no EN twin yet)
  products: s.products.map((p) => ({
    href: `/en/${p}/`, // the 4 product LPs DO exist under /en/*
    label: EN_PRODUCT_NAME[p].name,
    sub: EN_PRODUCT_NAME[p].line,
  })),
}));
const PLATFORM_ITEM_EN: Item = {
  href: "/",
  label: "Meeton ai (3 stages, unified)",
  sub: "Capture → Convert → Win back, one end-to-end AI SDR",
};
const SOLUTION_ROLES_EN: Item[] = [
  { href: "/solutions/cmo/", label: "CMO / Head of Marketing" },
  { href: "/solutions/cro/", label: "CRO / Head of Sales" },
  { href: "/solutions/sdr/", label: "Head of IS / SDR" },
  { href: "/solutions/ceo/", label: "Founders & CEOs" },
];
const USE_MOMENTS_EN: Item[] = [
  { href: "/use-cases/pre-inquiry/", label: "Before the inquiry", sub: "① Capture" },
  { href: "/use-cases/post-download/", label: "After a download", sub: "①→② Convert" },
  { href: "/use-cases/revisit/", label: "Return visit", sub: "② Convert / ③ Win back" },
  { href: "/use-cases/nurture/", label: "Follow-up", sub: "③ Win back" },
];
const RESOURCE_ITEMS_EN: Item[] = [
  { href: "/blog/", label: "Blog", sub: "Playbooks for capture & conversion" },
  { href: "/glossary/ai-sdr/", label: "Glossary", sub: "What is an AI SDR, and more" },
  { href: "/cases/", label: "Customers", sub: "Accounts that saw results" },
  { href: "/tools/roi/", label: "ROI calculator", sub: "Estimate your conversion upside" },
];

function useIsMobile(breakpoint = 980) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < breakpoint);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [breakpoint]);
  return isMobile;
}

export default function Nav({
  variant = "light",
  langSwitchHref,
  langSwitchLabel,
  lang = "ja",
}: NavProps) {
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const isDark = variant === "dark";
  const isMinimal = variant === "minimal";
  const en = lang === "en";
  const chrome = t(lang);

  // Locale-selected IA. JA uses the original constants (unchanged); EN swaps in
  // the /en-aware structures defined above.
  const stageNav = en ? STAGE_NAV_EN : STAGE_NAV;
  const platformItem = en ? PLATFORM_ITEM_EN : PLATFORM_ITEM;
  const solutionRoles = en ? SOLUTION_ROLES_EN : SOLUTION_ROLES;
  const useMoments = en ? USE_MOMENTS_EN : USE_MOMENTS;
  const resourceItems = en ? RESOURCE_ITEMS_EN : RESOURCE_ITEMS;

  // Lang switch: EN pages link back to the JA root of the current page (strip
  // the /en prefix); JA pages link to the best-effort EN twin. Explicit props
  // still win (back-compat). Label comes from CHROME (日本語 on EN, EN on JA).
  // The onClick sets a pref_lang cookie so the geo middleware respects the choice.
  const resolvedLangHref =
    langSwitchHref ?? (en ? pathname.replace(/^\/en(?=\/|$)/, "") || "/" : enTwinFor(pathname || "/"));
  const resolvedLangLabel = langSwitchLabel ?? chrome.langSwitch;

  // which dropdown is open (desktop): 'product' | 'usage' | 'resources' | null
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  // panel x-position, measured from the hovered trigger (centered under it,
  // clamped to the viewport) — fixed offsets drifted away from the trigger
  // at other viewport widths, so a diagonal mouse path to the panel left the
  // nav and instantly closed it.
  const [panelLeft, setPanelLeft] = useState(160);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  // grace period before hover-close so brief mouse excursions don't kill the menu
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpenMenu(null), 180);
  };
  useEffect(() => cancelClose, []);

  const PANEL_W: Record<string, number> = { product: 760, usage: 520, resources: 300 };
  const openMenuAt = (id: string, el: HTMLElement) => {
    const r = el.getBoundingClientRect();
    const w = PANEL_W[id] ?? 400;
    const vw = window.innerWidth;
    const left = Math.min(Math.max(r.left + r.width / 2 - w / 2, 16), vw - w - 16);
    setPanelLeft(left);
    setOpenMenu(id);
  };

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    setMobileOpen(false);
    setOpenMenu(null);
  }, [pathname]);

  // a11y: Escape closes the mobile drawer / any open desktop dropdown.
  useEffect(() => {
    if (!mobileOpen && !openMenu) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        setOpenMenu(null);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mobileOpen, openMenu]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  // In-place demo calendar: open the Meeton widget without leaving the page
  // when it's loaded; otherwise the default href navigation proceeds
  // (SEO / no-JS fallback). See window.meetonOpenCalendar in MeetonScript.
  const onDemoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (openDemoCalendarInPlace()) {
      e.preventDefault();
      setMobileOpen(false);
    }
  };

  // ── minimal variant: paid-traffic LPs. Logo + dual CTA only. ──────
  if (isMinimal) {
    return (
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: isMobile ? "12px 16px" : "14px 32px",
          background: "rgba(15,17,40,.92)",
          backdropFilter: "blur(14px) saturate(160%)",
          WebkitBackdropFilter: "blur(14px) saturate(160%)",
          borderBottom: "1px solid var(--on-navy-border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          fontFamily: "var(--fb)",
        }}
      >
        <Link href={lang === "en" ? "/en/" : "/"} aria-label="Meeton ai">
          <Image
            src="/logo.svg"
            alt="Meeton ai"
            width={140}
            height={30}
            priority
            style={{ height: 28, width: "auto", display: "block" }}
          />
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: isMobile ? 10 : 14 }}>
          <a href={lang === "en" ? "/en/pricing/" : PRICING_URL} className="v2-cta-ghost" style={ghostBtn(isMobile)}>
            {chrome.ctaSeePricing}
          </a>
          <a href={DEMO_URL} className="v2-cta-primary" style={primaryBtn(isMobile)} onClick={onDemoClick}>
            {chrome.ctaBookDemo}
          </a>
        </div>
      </nav>
    );
  }

  // ── dark variant: careers ────────────────────────────────────────
  // Kept lean; brand green unified to --cta. Single "応募する" CTA.
  if (isDark) {
    return (
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: isMobile ? "12px 16px" : "14px 48px",
          background: "rgba(10,11,30,.95)",
          backdropFilter: "blur(20px) saturate(1.4)",
          borderBottom: "1px solid var(--on-navy-border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontFamily: "var(--fb)",
        }}
      >
        <Link
          href="/"
          style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}
        >
          <Image src="/logo.svg" alt="DynaMeet" width={140} height={30} style={{ height: isMobile ? 24 : 28, width: "auto" }} />
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              padding: "4px 10px",
              borderRadius: 6,
              background: "var(--navy-3)",
              border: "1px solid var(--on-navy-border)",
              color: "var(--on-navy-sub)",
            }}
          >
            Careers
          </span>
        </Link>
        <a href={CAREERS_APPLY_URL} target="_blank" rel="noopener noreferrer" className="v2-cta-primary" style={primaryBtn(isMobile)}>
          応募する
        </a>
      </nav>
    );
  }

  // ── light (default) variant: full navy frame + new IA ─────────────
  const linkColor = "var(--on-navy-sub)";

  const DesktopDropdownTrigger = ({
    id,
    label,
  }: {
    id: string;
    label: string;
  }) => (
    <button
      onClick={(e) => (openMenu === id ? setOpenMenu(null) : openMenuAt(id, e.currentTarget))}
      onMouseEnter={(e) => {
        cancelClose();
        openMenuAt(id, e.currentTarget);
      }}
      aria-expanded={openMenu === id}
      aria-haspopup="true"
      style={{
        background: "none",
        border: "none",
        fontSize: 15,
        color: openMenu === id ? "#fff" : linkColor,
        fontWeight: 600,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: 6,
        padding: "8px 0",
        lineHeight: 1,
        fontFamily: "var(--fb)",
        transition: "color .18s",
      }}
    >
      {label}
      <svg
        width="10"
        height="6"
        viewBox="0 0 10 6"
        fill="none"
        style={{
          transform: openMenu === id ? "rotate(180deg)" : "none",
          transition: "transform .2s",
        }}
      >
        <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );

  return (
    <>
      <nav
        ref={navRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: isMobile ? "12px 16px" : "14px 40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 24,
          background: "rgba(15,17,40,.85)",
          backdropFilter: "blur(20px) saturate(1.5)",
          WebkitBackdropFilter: "blur(20px) saturate(1.5)",
          borderBottom: "1px solid var(--on-navy-border)",
          fontFamily: "var(--fb)",
        }}
        onMouseEnter={cancelClose}
        onMouseLeave={scheduleClose}
      >
        {/* Logo (white wordmark on navy) */}
        <Link href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none", flexShrink: 0 }}>
          <Image
            src="/logo.svg"
            alt="Meeton ai"
            width={140}
            height={30}
            priority
            style={{ height: isMobile ? 24 : 28, width: "auto" }}
          />
        </Link>

        {!isMobile && (
          <>
            {/* Center nav */}
            <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
              <DesktopDropdownTrigger id="product" label={chrome.navProduct} />
              <DesktopDropdownTrigger id="usage" label={chrome.navUsage} />
              <Link href="/cases/" style={topLink(isActive("/cases"), linkColor)}>
                {chrome.navCases}
              </Link>
              <Link href="/pricing/" style={topLink(isActive("/pricing"), linkColor)}>
                {chrome.navPricing}
              </Link>
              <DesktopDropdownTrigger id="resources" label={chrome.navResources} />
              {resolvedLangHref && resolvedLangLabel && (
                // Plain <a> (NOT next/link): a soft-nav <Link> prefetches the
                // target WITHOUT the pref_lang cookie, so the geo middleware
                // 302s the prefetch back to the current language and the click
                // reuses that cached redirect (→ never switches). A full-page <a>
                // nav fires after the onClick cookie write, so middleware sees
                // pref_lang and serves the chosen language.
                <a
                  href={resolvedLangHref}
                  onClick={() => setLangPref(en ? "ja" : "en")}
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: linkColor,
                    textDecoration: "none",
                    border: "1.5px solid var(--on-navy-border)",
                    borderRadius: 8,
                    padding: "5px 14px",
                  }}
                >
                  {resolvedLangLabel}
                </a>
              )}
            </div>

            {/* Dual CTA — permanent */}
            <div style={{ display: "flex", gap: 10, flexShrink: 0 }}>
              <a href={PRICING_URL} className="v2-cta-ghost" style={ghostBtn(false)}>
                {chrome.ctaSeePricing}
              </a>
              <a href={DEMO_URL} className="v2-cta-primary" style={primaryBtn(false)} onClick={onDemoClick}>
                {chrome.ctaBookDemo}
              </a>
            </div>

            {/* Dropdown panels (white reading surface) */}
            {openMenu === "product" && (
              <DropdownPanel onClose={() => setOpenMenu(null)} left={panelLeft} width={760}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
                  {stageNav.map((g) => (
                    <div key={g.stage}>
                      {/* stage header = the single job-led link */}
                      <Link
                        href={g.href}
                        onClick={() => setOpenMenu(null)}
                        className="v2-nav-panel-item"
                        style={{ display: "block", padding: "8px 12px", borderRadius: 10, textDecoration: "none", background: isActive(g.href) ? "var(--cta-wash)" : undefined }}
                      >
                        <div style={{ fontSize: 14, fontWeight: 800, color: "var(--heading)" }}>{g.stage} →</div>
                        <div style={{ fontFamily: "var(--fm)", fontSize: 11, fontWeight: 700, color: "var(--cta-ink)", marginTop: 2 }}>{g.transform}</div>
                      </Link>
                      {/* product names as the means, small */}
                      <div style={{ padding: "6px 12px 0" }}>
                        {g.products.map((it) => (
                          <Link key={it.href} href={it.href} onClick={() => setOpenMenu(null)} style={{ display: "block", fontSize: 12, fontWeight: 600, color: isActive(it.href) ? "var(--cta-ink)" : "var(--sub)", textDecoration: "none", lineHeight: 2 }}>
                            {it.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ borderTop: "1px solid var(--border)", marginTop: 8, paddingTop: 8 }}>
                  <PanelItem item={platformItem} active={pathname === "/"} accent />
                </div>
              </DropdownPanel>
            )}
            {openMenu === "usage" && (
              <DropdownPanel onClose={() => setOpenMenu(null)} left={panelLeft} width={520}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
                  <div>
                    <PanelHeading>{en ? "By role" : "役割別"}</PanelHeading>
                    {solutionRoles.map((it) => (
                      <PanelItem key={it.href} item={it} active={isActive(it.href)} compact />
                    ))}
                  </div>
                  <div>
                    <PanelHeading>{en ? "By moment (4 moments)" : "瞬間別（4 moments）"}</PanelHeading>
                    {useMoments.map((it) => (
                      <PanelItem key={it.href} item={it} active={isActive(it.href)} compact />
                    ))}
                  </div>
                </div>
              </DropdownPanel>
            )}
            {openMenu === "resources" && (
              <DropdownPanel onClose={() => setOpenMenu(null)} left={panelLeft} width={300}>
                {resourceItems.map((it) => (
                  <PanelItem key={it.href} item={it} active={isActive(it.href)} />
                ))}
              </DropdownPanel>
            )}
          </>
        )}

        {isMobile && (
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
            {/* compact demo CTA — mobile always has a visible CTA without
                opening the drawer */}
            <a
              href={DEMO_URL}
              className="v2-cta-primary"
              onClick={onDemoClick}
              style={{ ...primaryBtn(true), padding: "9px 14px", fontSize: 13 }}
            >
              {chrome.ctaBookDemo}
            </a>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? (en ? "Close menu" : "メニューを閉じる") : en ? "Open menu" : "メニューを開く"}
              aria-expanded={mobileOpen}
              style={{ background: "none", border: "none", cursor: "pointer", width: 44, height: 44, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 5, zIndex: 200 }}
            >
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  style={{
                    display: "block",
                    width: 24,
                    height: 2,
                    background: "#fff",
                    borderRadius: 2,
                    transition: "all .3s",
                    transform: mobileOpen
                      ? i === 0
                        ? "rotate(45deg) translate(5px,5px)"
                        : i === 2
                          ? "rotate(-45deg) translate(5px,-5px)"
                          : "none"
                      : "none",
                    opacity: mobileOpen && i === 1 ? 0 : 1,
                  }}
                />
              ))}
            </button>
          </div>
        )}
      </nav>

      {/* Mobile menu */}
      {isMobile && (
        <>
          <div
            onClick={() => setMobileOpen(false)}
            style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.55)", zIndex: 150, opacity: mobileOpen ? 1 : 0, pointerEvents: mobileOpen ? "auto" : "none", transition: "opacity .3s" }}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label={en ? "Menu" : "メニュー"}
            style={{
              position: "fixed",
              top: 0,
              right: 0,
              bottom: 0,
              width: "86%",
              maxWidth: 360,
              background: "var(--navy)",
              zIndex: 160,
              transform: mobileOpen ? "translateX(0)" : "translateX(100%)",
              transition: "transform .3s ease-out",
              display: "flex",
              flexDirection: "column",
              fontFamily: "var(--fb)",
            }}
          >
            {/* drawer header: dedicated 44x44 close button. The nav-bar X
                sits under this panel (nav z-index 100 < drawer 160), so the
                drawer must carry its own close affordance. */}
            <div style={{ display: "flex", justifyContent: "flex-end", padding: "10px 12px 0", flexShrink: 0, zIndex: 1 }}>
              <button
                onClick={() => setMobileOpen(false)}
                aria-label={en ? "Close menu" : "メニューを閉じる"}
                style={{ width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center", background: "none", border: "none", cursor: "pointer", color: "#fff" }}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path d="M4 4L16 16M16 4L4 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            {/* scrollable links */}
            <div style={{ flex: 1, overflowY: "auto", padding: "8px 24px 20px" }}>
            {stageNav.map((g) => (
              <MobileGroup key={g.stage} title={en ? `${g.stage} (${g.transform})` : `${g.stage}（${g.transform}）`}>
                <MobileLink item={{ href: g.href, label: g.stage.replace(/^[①②③]\s*/, "") }} active={isActive(g.href)} />
                {g.products.map((it) => (
                  <MobileLink key={it.href} item={it} active={isActive(it.href)} />
                ))}
              </MobileGroup>
            ))}
            <MobileGroup title={en ? "Unified platform" : "統合プラットフォーム"}>
              <MobileLink item={platformItem} active={pathname === "/"} />
            </MobileGroup>
            <MobileGroup title={en ? "Use cases — by role" : "活用 — 役割別"}>
              {solutionRoles.map((it) => (
                <MobileLink key={it.href} item={it} active={isActive(it.href)} />
              ))}
            </MobileGroup>
            <MobileGroup title={en ? "Use cases — by moment" : "活用 — 瞬間別"}>
              {useMoments.map((it) => (
                <MobileLink key={it.href} item={it} active={isActive(it.href)} />
              ))}
            </MobileGroup>
            <MobileGroup title={en ? "Resources" : "リソース"}>
              {[
                { href: "/cases/", label: en ? "Customers" : "導入事例" },
                { href: "/pricing/", label: en ? "Pricing" : "料金" },
                ...resourceItems,
              ].map((it) => (
                <MobileLink key={it.href} item={it} active={isActive(it.href)} />
              ))}
            </MobileGroup>
            </div>
            {/* sticky dual CTA — always visible while the drawer is open
                (§1.2), instead of sitting below ~20 scrollable links */}
            <div style={{ flexShrink: 0, display: "flex", flexDirection: "column", gap: 10, padding: "14px 24px calc(14px + env(safe-area-inset-bottom))", borderTop: "1px solid var(--on-navy-border)", background: "var(--navy)" }}>
              <a href={PRICING_URL} className="v2-cta-ghost" style={{ ...ghostBtn(false), width: "100%", textAlign: "center", boxSizing: "border-box" }}>
                {chrome.ctaSeePricing}
              </a>
              <a href={DEMO_URL} className="v2-cta-primary" onClick={onDemoClick} style={{ ...primaryBtn(false), width: "100%", textAlign: "center", boxSizing: "border-box" }}>
                {chrome.ctaBookDemo}
              </a>
              {resolvedLangHref && resolvedLangLabel && (
                // Plain <a> (full nav, no prefetch) — see desktop switch note.
                <a
                  href={resolvedLangHref}
                  onClick={() => { setLangPref(en ? "ja" : "en"); setMobileOpen(false); }}
                  style={{
                    width: "100%",
                    textAlign: "center",
                    boxSizing: "border-box",
                    fontSize: 14,
                    fontWeight: 700,
                    color: "var(--on-navy-sub, #AEB4D6)",
                    textDecoration: "none",
                    border: "1.5px solid var(--on-navy-border)",
                    borderRadius: 10,
                    padding: "9px 16px",
                  }}
                >
                  {resolvedLangLabel}
                </a>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}

// ── shared style helpers ────────────────────────────────────────────
// No inline box-shadow on the primary: an inline shadow would override the
// global .v2-cta-primary hover/active shadows (inline beats class :hover).
function primaryBtn(isMobile: boolean): React.CSSProperties {
  return {
    background: "var(--cta)",
    color: "#04231a",
    padding: isMobile ? "9px 16px" : "11px 22px",
    borderRadius: 10,
    fontSize: isMobile ? 14 : 15,
    fontWeight: 800,
    textDecoration: "none",
    whiteSpace: "nowrap",
    border: "none",
    cursor: "pointer",
    fontFamily: "var(--fb)",
  };
}
function ghostBtn(isMobile: boolean): React.CSSProperties {
  return {
    background: "transparent",
    color: "#fff",
    padding: isMobile ? "9px 14px" : "11px 20px",
    borderRadius: 10,
    fontSize: isMobile ? 14 : 15,
    fontWeight: 700,
    textDecoration: "none",
    whiteSpace: "nowrap",
    border: "1.5px solid var(--on-navy-border)",
    cursor: "pointer",
    fontFamily: "var(--fb)",
  };
}
function topLink(active: boolean, color: string): React.CSSProperties {
  return {
    fontSize: 15,
    color: active ? "#fff" : color,
    textDecoration: "none",
    fontWeight: 600,
    // match the dropdown-trigger <button> box exactly so plain links and
    // dropdowns sit on the same vertical center (buttons reset line-height to
    // `normal`; anchors would otherwise inherit the body line-height → offset).
    display: "inline-flex",
    alignItems: "center",
    lineHeight: 1,
    padding: "8px 0",
    transition: "color .18s",
  };
}

// ── desktop dropdown panel (white) ──────────────────────────────────
function DropdownPanel({
  children,
  left,
  width,
}: {
  children: React.ReactNode;
  onClose: () => void;
  left: number;
  width: number;
}) {
  return (
    <div style={{ position: "absolute", top: "100%", left, zIndex: 200, paddingTop: 10 }}>
      {/* subtle .14s fade/slide on open; the global prefers-reduced-motion
          guard collapses the animation for users who opt out */}
      <style>{`
        @keyframes v2NavDropIn{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:translateY(0)}}
        .v2-nav-panel-item{transition:background .14s}
        .v2-nav-panel-item:hover{background:var(--surface)}
      `}</style>
      <div
        style={{
          background: "#fff",
          border: "1px solid var(--border)",
          borderRadius: 16,
          padding: 12,
          width,
          boxShadow: "0 16px 48px rgba(15,17,40,.18)",
          animation: "v2NavDropIn .14s ease-out",
        }}
      >
        {children}
      </div>
    </div>
  );
}
function PanelHeading({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontSize: 11,
        fontWeight: 800,
        color: "var(--sub)",
        letterSpacing: ".06em",
        textTransform: "uppercase",
        padding: "4px 12px 8px",
      }}
    >
      {children}
    </div>
  );
}
function PanelItem({
  item,
  active,
  accent,
  compact,
}: {
  item: Item;
  active: boolean;
  accent?: boolean;
  compact?: boolean;
}) {
  return (
    <Link
      href={item.href}
      className="v2-nav-panel-item"
      style={{
        display: "block",
        padding: compact ? "8px 12px" : "10px 12px",
        borderRadius: 10,
        textDecoration: "none",
        // no inline background when inactive — it would override the
        // .v2-nav-panel-item:hover surface (inline beats class :hover)
        background: active ? "var(--cta-wash)" : undefined,
      }}
    >
      <div
        style={{
          fontSize: 14,
          fontWeight: 700,
          color: accent ? "var(--cta-ink)" : "var(--heading)",
          marginBottom: item.sub ? 2 : 0,
        }}
      >
        {item.label}
      </div>
      {item.sub && <div style={{ fontSize: 12, color: "var(--sub)", fontWeight: 500 }}>{item.sub}</div>}
    </Link>
  );
}

// ── mobile menu helpers ─────────────────────────────────────────────
function MobileGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 22 }}>
      <p
        style={{
          fontSize: 11,
          fontWeight: 700,
          color: "var(--on-navy-sub)",
          marginBottom: 8,
          textTransform: "uppercase",
          letterSpacing: ".08em",
          opacity: 0.7,
        }}
      >
        {title}
      </p>
      {children}
    </div>
  );
}
function MobileLink({ item, active }: { item: Item; active: boolean }) {
  return (
    <Link
      href={item.href}
      style={{
        display: "block",
        padding: "12px 0",
        fontSize: 16,
        fontWeight: 600,
        color: active ? "var(--cta)" : "#fff",
        textDecoration: "none",
        borderBottom: "1px solid var(--on-navy-border)",
      }}
    >
      {item.label}
    </Link>
  );
}
