"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

// ── Meeton ai v2 global navigation (2026-05-29 rebuild) ──────────────
// Spec §1.2 IA: 製品 ▾ | 活用 ▾ | 事例 | 料金 | リソース ▾ | [無料で始める][デモを予約]
// Spec §3.8 design: navy = frame → the header bar itself is navy with a
// white wordmark; dropdown panels are white (reading/decision surface).
// green (#07CB79 / --cta) is the single accent → primary CTA + hovers.
// Dual CTA is permanent on every page (§1.2): never collapse to one.

const SIGNUP_URL =
  "https://app.dynameet.ai/signup?utm_source=website&utm_medium=nav&utm_campaign=free-signup";
const DEMO_URL =
  "https://dynameet.ai/?calendarId=takumi-sawano&showChat=true&utm_source=website&utm_medium=nav&utm_campaign=demo";
const CAREERS_APPLY_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSe57dBjNsS3pG0QYZAVRFJk4wPKOv6GX7WBF-1tisAslnq5OQ/viewform?usp=dialog";

type NavProps = {
  variant?: "light" | "dark" | "minimal";
  langSwitchHref?: string;
  langSwitchLabel?: string;
};

type Item = { href: string; label: string; sub?: string };

const PRODUCT_ITEMS: Item[] = [
  { href: "/calendar", label: "Meeton Calendar", sub: "即フォローで商談化" },
  { href: "/chat", label: "Meeton Chat", sub: "訪問者と対話し疑問解消" },
  { href: "/library", label: "Meeton Library", sub: "資料共有 + 開封トラッキング" },
  { href: "/email", label: "Meeton Email", sub: "1:1 自律フォロー" },
];
const PLATFORM_ITEM: Item = {
  href: "/",
  label: "Meeton ai（4機能の統合）",
  sub: "つなぐと一気通貫の AI SDR",
};
const SOLUTION_ROLES: Item[] = [
  { href: "/solutions/cmo", label: "CMO / マーケ責任者" },
  { href: "/solutions/cro", label: "CRO / 営業責任者" },
  { href: "/solutions/sdr", label: "IS / SDR 責任者" },
  { href: "/solutions/ceo", label: "経営者" },
];
const USE_MOMENTS: Item[] = [
  { href: "/use-cases/pre-inquiry", label: "問い合わせ前" },
  { href: "/use-cases/post-download", label: "資料 DL 後" },
  { href: "/use-cases/revisit", label: "再訪問" },
  { href: "/use-cases/nurture", label: "追客" },
];
const RESOURCE_ITEMS: Item[] = [
  { href: "/blog/", label: "ブログ", sub: "獲得・商談化の実践知" },
  { href: "/glossary/ai-sdr", label: "用語集", sub: "AI SDR とは ほか" },
  { href: "/cases", label: "導入事例", sub: "成果が出たアカウント" },
  { href: "/tools/roi", label: "ROI 診断", sub: "商談化の余地を試算" },
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
}: NavProps) {
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const isDark = variant === "dark";
  const isMinimal = variant === "minimal";

  // which dropdown is open (desktop): 'product' | 'usage' | 'resources' | null
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

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

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

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
        <Link href="/" aria-label="Meeton ai">
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
          <a href={DEMO_URL} style={ghostBtn(isMobile)}>
            デモを予約
          </a>
          <a href={SIGNUP_URL} style={primaryBtn(isMobile)}>
            無料で始める
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
        <a href={CAREERS_APPLY_URL} target="_blank" rel="noopener noreferrer" style={primaryBtn(isMobile)}>
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
      onClick={() => setOpenMenu(openMenu === id ? null : id)}
      onMouseEnter={() => setOpenMenu(id)}
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
        onMouseLeave={() => setOpenMenu(null)}
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
              <DesktopDropdownTrigger id="product" label="製品" />
              <DesktopDropdownTrigger id="usage" label="活用" />
              <Link href="/cases" style={topLink(isActive("/cases"), linkColor)}>
                事例
              </Link>
              <Link href="/pricing" style={topLink(isActive("/pricing"), linkColor)}>
                料金
              </Link>
              <DesktopDropdownTrigger id="resources" label="リソース" />
              {langSwitchHref && langSwitchLabel && (
                <Link
                  href={langSwitchHref}
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
                  {langSwitchLabel}
                </Link>
              )}
            </div>

            {/* Dual CTA — permanent */}
            <div style={{ display: "flex", gap: 10, flexShrink: 0 }}>
              <a href={DEMO_URL} style={ghostBtn(false)}>
                デモを予約
              </a>
              <a href={SIGNUP_URL} style={primaryBtn(false)}>
                無料で始める
              </a>
            </div>

            {/* Dropdown panels (white reading surface) */}
            {openMenu === "product" && (
              <DropdownPanel onClose={() => setOpenMenu(null)} left={200} width={560}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4 }}>
                  {PRODUCT_ITEMS.map((it) => (
                    <PanelItem key={it.href} item={it} active={isActive(it.href)} />
                  ))}
                </div>
                <div style={{ borderTop: "1px solid var(--border)", marginTop: 8, paddingTop: 8 }}>
                  <PanelItem item={PLATFORM_ITEM} active={pathname === "/"} accent />
                </div>
              </DropdownPanel>
            )}
            {openMenu === "usage" && (
              <DropdownPanel onClose={() => setOpenMenu(null)} left={260} width={520}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
                  <div>
                    <PanelHeading>役割別</PanelHeading>
                    {SOLUTION_ROLES.map((it) => (
                      <PanelItem key={it.href} item={it} active={isActive(it.href)} compact />
                    ))}
                  </div>
                  <div>
                    <PanelHeading>瞬間別（4 moments）</PanelHeading>
                    {USE_MOMENTS.map((it) => (
                      <PanelItem key={it.href} item={it} active={isActive(it.href)} compact />
                    ))}
                  </div>
                </div>
              </DropdownPanel>
            )}
            {openMenu === "resources" && (
              <DropdownPanel onClose={() => setOpenMenu(null)} left={420} width={300}>
                {RESOURCE_ITEMS.map((it) => (
                  <PanelItem key={it.href} item={it} active={isActive(it.href)} />
                ))}
              </DropdownPanel>
            )}
          </>
        )}

        {isMobile && (
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="メニュー"
            style={{ background: "none", border: "none", cursor: "pointer", padding: 8, display: "flex", flexDirection: "column", gap: 5, zIndex: 200 }}
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
              padding: "80px 24px 28px",
              overflowY: "auto",
              fontFamily: "var(--fb)",
            }}
          >
            <MobileGroup title="製品">
              {[...PRODUCT_ITEMS, PLATFORM_ITEM].map((it) => (
                <MobileLink key={it.href} item={it} active={isActive(it.href)} />
              ))}
            </MobileGroup>
            <MobileGroup title="活用 — 役割別">
              {SOLUTION_ROLES.map((it) => (
                <MobileLink key={it.href} item={it} active={isActive(it.href)} />
              ))}
            </MobileGroup>
            <MobileGroup title="活用 — 瞬間別">
              {USE_MOMENTS.map((it) => (
                <MobileLink key={it.href} item={it} active={isActive(it.href)} />
              ))}
            </MobileGroup>
            <MobileGroup title="リソース">
              {[{ href: "/cases", label: "導入事例" }, { href: "/pricing", label: "料金" }, ...RESOURCE_ITEMS].map((it) => (
                <MobileLink key={it.href} item={it} active={isActive(it.href)} />
              ))}
            </MobileGroup>
            <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: 12, paddingTop: 16 }}>
              <a href={DEMO_URL} style={{ ...ghostBtn(false), width: "100%", textAlign: "center", boxSizing: "border-box" }}>
                デモを予約
              </a>
              <a href={SIGNUP_URL} style={{ ...primaryBtn(false), width: "100%", textAlign: "center", boxSizing: "border-box" }}>
                無料で始める
              </a>
            </div>
          </div>
        </>
      )}
    </>
  );
}

// ── shared style helpers ────────────────────────────────────────────
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
    boxShadow: "0 4px 16px var(--cta-glow)",
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
      <div
        style={{
          background: "#fff",
          border: "1px solid var(--border)",
          borderRadius: 16,
          padding: 12,
          width,
          boxShadow: "0 16px 48px rgba(15,17,40,.18)",
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
      style={{
        display: "block",
        padding: compact ? "8px 12px" : "10px 12px",
        borderRadius: 10,
        textDecoration: "none",
        background: active ? "var(--cta-wash)" : "transparent",
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
