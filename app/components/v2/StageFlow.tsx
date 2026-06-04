import Link from "next/link";
import { ProductIcon } from "@/app/components/v2/ui";
import { STAGES, PRODUCT_IN_STAGE } from "@/app/lib/stages";

// Deck p7 "AI SDR の3つの仕事" — 3-stage flow (掴む→商談化→追客). The 3rd
// stage (follow) is rendered on navy to echo the deck's dark accent card.
// Server-rendered; product cards link to their LP.

export default function StageFlow() {
  return (
    <div className="v2-stageflow">
      {STAGES.map((s, i) => {
        const dark = s.id === "follow";
        return (
          <div key={s.id} className="v2-stage-wrap">
            <div
              className="v2-stage"
              style={{
                background: dark ? "var(--navy)" : "#fff",
                border: dark ? "1px solid var(--navy-3)" : "1px solid var(--border)",
              }}
            >
              <Link href={s.href} className="v2-stage-head" style={{ textDecoration: "none", display: "block" }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                  <span style={{ fontFamily: "var(--fd)", fontSize: 20, fontWeight: 800, color: "var(--cta)" }}>{s.num}</span>
                  <h3 style={{ fontSize: 19, fontWeight: 800, color: dark ? "var(--on-navy)" : "var(--heading)", margin: 0 }}>{s.title} →</h3>
                </div>
                <div style={{ fontFamily: "var(--fm)", fontSize: 12, fontWeight: 700, color: "var(--cta-ink)", margin: "8px 0 14px", letterSpacing: ".02em" }}>
                  {s.transform}
                </div>
              </Link>
              <div style={{ display: "grid", gap: 10 }}>
                {s.products.map((p) => {
                  const info = PRODUCT_IN_STAGE[p];
                  return (
                    <Link
                      key={p}
                      href={`/${p}/`}
                      className="v2-stage-prod"
                      style={{
                        background: dark ? "var(--navy-2)" : "var(--surface)",
                        border: dark ? "1px solid var(--on-navy-border)" : "1px solid var(--border)",
                      }}
                    >
                      <span style={{ color: "var(--cta)", flexShrink: 0 }}>
                        <ProductIcon kind={info.icon} size={20} />
                      </span>
                      <span>
                        <span style={{ display: "block", fontSize: 14, fontWeight: 800, color: dark ? "var(--on-navy)" : "var(--heading)" }}>{info.name}</span>
                        <span style={{ display: "block", fontSize: 12.5, lineHeight: 1.6, color: dark ? "var(--on-navy-sub)" : "var(--text)", marginTop: 2 }}>{info.line}</span>
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
            {i < STAGES.length - 1 && <div className="v2-stage-arrow" aria-hidden>→</div>}
          </div>
        );
      })}
      <style>{`
        .v2-stageflow{display:grid;grid-template-columns:1fr auto 1fr auto 1fr;align-items:stretch;gap:0}
        .v2-stage-wrap{display:contents}
        .v2-stage{border-radius:18px;padding:24px;height:100%;box-sizing:border-box}
        .v2-stage-head h3{transition:color .15s}
        .v2-stage-head:hover h3{color:var(--cta-ink)}
        .v2-stage-arrow{align-self:center;color:var(--border2);font-size:24px;padding:0 14px}
        .v2-stage-prod{display:flex;gap:10px;align-items:flex-start;border-radius:12px;padding:12px 14px;text-decoration:none;transition:border-color .2s,transform .2s}
        .v2-stage-prod:hover{border-color:var(--cta)!important;transform:translateY(-1px)}
        @media(max-width:900px){
          .v2-stageflow{grid-template-columns:1fr}
          .v2-stage-arrow{transform:rotate(90deg);padding:6px 0;justify-self:center}
        }
      `}</style>
    </div>
  );
}
