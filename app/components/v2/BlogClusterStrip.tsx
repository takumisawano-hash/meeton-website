import Link from "next/link";
import { CLUSTERS, CLUSTER_ORDER } from "@/app/lib/content-clusters";
import { ProductIcon } from "@/app/components/v2/ui";

const ICON: Record<string, string> = { library: "library", calendar: "calendar", email: "email", chat: "chat", "ai-sdr": "spark" };

// Blog hub → pillar (money page) links (§4.8). Server-rendered band at the top
// of /blog so every cluster's pillar gets an internal link from the hub.
export default function BlogClusterStrip() {
  return (
    <section style={{ background: "var(--surface)", borderBottom: "1px solid var(--border)", padding: "84px 24px 28px", fontFamily: "var(--fb)" }}>
      <div style={{ maxWidth: 1160, margin: "0 auto" }}>
        <div style={{ fontFamily: "var(--fm)", fontSize: 12, fontWeight: 700, letterSpacing: ".06em", color: "var(--cta-ink)", marginBottom: 14, textTransform: "uppercase" }}>
          トピック別に読む
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", gap: 12 }}>
          {CLUSTER_ORDER.map((cid) => {
            const c = CLUSTERS[cid];
            return (
              <Link
                key={cid}
                href={c.pillar}
                style={{ display: "flex", gap: 10, alignItems: "flex-start", background: "#fff", border: "1px solid var(--border)", borderRadius: 12, padding: "14px 16px", textDecoration: "none" }}
              >
                <span style={{ color: "var(--cta)", marginTop: 2 }}><ProductIcon kind={ICON[cid]} size={20} /></span>
                <span>
                  <span style={{ display: "block", fontSize: 14, fontWeight: 800, color: "var(--heading)" }}>{c.label}</span>
                  <span style={{ display: "block", fontSize: 12, color: "var(--cta-ink)", fontWeight: 700, marginTop: 2 }}>{c.pillarName} →</span>
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
