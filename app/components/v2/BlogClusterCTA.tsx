import Link from "next/link";
import { classifyCluster, CLUSTERS, CLUSTER_COMPARES } from "@/app/lib/content-clusters";
import { getCompare } from "@/app/lib/compare-data";

// Internal-link automation (§4.8): every blog article links UP to its
// cluster's pillar (the money-page product LP) and sideways to the cluster's
// related comparison pages. Classified from the post's category/tags/keyword.
// Server-rendered → links are in the HTML for crawlers.

export default function BlogClusterCTA({
  category,
  tags,
  focusKeyword,
  title,
}: {
  category?: string;
  tags?: string[];
  focusKeyword?: string | null;
  title?: string;
}) {
  const cid = classifyCluster({ category, tags, targetKeyword: focusKeyword || undefined, title });
  const cluster = CLUSTERS[cid];
  const compares = (CLUSTER_COMPARES[cid] || []).map(getCompare).filter(Boolean).slice(0, 3) as NonNullable<ReturnType<typeof getCompare>>[];

  return (
    <aside
      style={{
        margin: "40px 0 8px",
        background: "var(--cta-wash)",
        border: "1px solid #cdeede",
        borderRadius: 16,
        padding: "24px 22px",
      }}
    >
      <div style={{ fontFamily: "var(--fm)", fontSize: 12, fontWeight: 700, color: "var(--cta-ink)", marginBottom: 8 }}>
        この記事に関連するソリューション
      </div>
      <h3 style={{ fontSize: 19, fontWeight: 800, color: "var(--heading)", margin: "0 0 6px" }}>{cluster.pillarName}</h3>
      <p style={{ fontSize: 14, lineHeight: 1.8, color: "var(--text)", margin: "0 0 16px" }}>{cluster.blurb}</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center" }}>
        <Link
          href={cluster.pillar}
          style={{ background: "var(--cta)", color: "#04231a", fontSize: 14, fontWeight: 800, textDecoration: "none", padding: "10px 18px", borderRadius: 10 }}
        >
          {cluster.pillarName} を見る →
        </Link>
        {compares.map((c) => (
          <Link
            key={c.slug}
            href={`/compare/${c.slug}/`}
            style={{ fontSize: 13, fontWeight: 700, color: "var(--cta-ink)", textDecoration: "none", background: "#fff", border: "1px solid #cdeede", borderRadius: 999, padding: "8px 14px" }}
          >
            vs {c.competitorName}
          </Link>
        ))}
      </div>
      {/* self-serve diagnostic — readers researching a problem rarely book a
          demo straight from an article; the ROI estimate is the natural step */}
      <div style={{ marginTop: 14 }}>
        <Link href="/tools/roi/" style={{ fontSize: 13, fontWeight: 700, color: "var(--cta-ink)", textDecoration: "underline" }}>
          60秒で、自社サイトの商談化の余地を診断する →
        </Link>
      </div>
    </aside>
  );
}
