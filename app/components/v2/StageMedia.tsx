import Link from "next/link";
import Image from "next/image";
import { Section, SectionHead } from "@/app/components/v2/ui";
import { productMedia } from "@/app/lib/product-media";
import ProductAnim from "@/app/components/v2/ProductAnim";
import { MotionSafeVideo } from "@/app/components/v2/AnimGate";
import DemoFrame from "@/app/components/v2/DemoFrame";

// Per-job media walkthrough: 4 alternating rows (掴む / 育てる / 商談化 / 追客),
// each = product screenshot/video on one side, brief copy + 詳しく→LP on the
// other. Replaces the abstract "配属する" (Speed/Persistence/Context) section
// with concrete product demos. Media are PLACEHOLDERS — drop real assets into
// public/product/<key>.(png|mp4) and they render automatically.

type Row = {
  key: string;
  stage: string; // ① 掴む
  title: string;
  desc: string;
  points: string[];
  href: string;
  icon: string;
};

// NOTE: the 掴む (chat) step is shown as the hero demo on the home page, so it
// is intentionally NOT repeated here — this walkthrough covers 育てる→商談化→追客.
const ROWS: Row[] = [
  {
    key: "library",
    stage: "① 育てる",
    title: "資料で、見込み客を育てる。",
    desc: "まだ早い見込み客を、資料で自動ナーチャリング。関心に合った資料を届け、AIが解説し、反応を見て検討を温める。",
    points: ["関心に合った資料を自動で届ける", "反応を見て育成、温まったら次へ"],
    href: "/library/",
    icon: "library",
  },
  {
    key: "calendar",
    stage: "② 商談化する",
    title: "その場で、商談を予約する。",
    desc: "温度が高まった瞬間に、AIコンシェルジュが商談予約まで運ぶ。自動アサイン・CRM登録まで、離脱前に完結。",
    points: ["コンバート直後に即予約導線", "自動アサイン・CRM自動登録"],
    href: "/calendar/",
    icon: "calendar",
  },
  {
    key: "email",
    stage: "③ 追客する",
    title: "逃さず、追って戻す。",
    desc: "予約しなかったリードを諦めず、AIが行動シグナルを見て1:1で追客。再びホットになれば商談化へ戻す。",
    points: ["再訪・開封などのシグナルで追客", "AIが1通ずつ生成、目的達成まで自律"],
    href: "/email/",
    icon: "email",
  },
];

function Media({ row }: { row: Row }) {
  const m = productMedia(row.key);
  return (
    <div className={`v2-sm-media${m?.kind === "html" ? " demo" : ""}`}>
      {m?.kind === "html" ? (
        <DemoFrame src={m.src} title={`${row.title} のデモ`} />
      ) : m?.kind === "video" ? (
        <MotionSafeVideo src={m.src} />
      ) : m?.kind === "image" ? (
        <Image src={m.src} alt={`${row.title} のデモ`} fill sizes="(max-width:900px) 100vw, 560px" style={{ objectFit: "cover" }} />
      ) : (
        <ProductAnim kind={row.icon} />
      )}
    </div>
  );
}

export default function StageMedia() {
  return (
    <Section tone="white">
      <SectionHead
        eyebrow="動きで見る AI SDR"
        title="それぞれの仕事が、どう動くか。"
        lede="掴む・育てる・商談化する・追客する——AI SDR が現場で何をするのかを、動きのイメージで。"
        align="center"
      />
      <div className="v2-sm-rows">
        {ROWS.map((row, i) => (
          <div key={row.key} className={`v2-sm-row ${i % 2 === 1 ? "rev" : ""}`}>
            <Media row={row} />
            <div className="v2-sm-body">
              <div className="v2-sm-stage">{row.stage}</div>
              <h3 className="v2-sm-title">{row.title}</h3>
              <p className="v2-sm-desc">{row.desc}</p>
              <ul className="v2-sm-points">
                {row.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
              <Link href={row.href} className="v2-sm-link">詳しく見る →</Link>
            </div>
          </div>
        ))}
      </div>
      <style>{`
        .v2-sm-rows{display:flex;flex-direction:column;gap:clamp(40px,6vw,72px)}
        .v2-sm-row{display:grid;grid-template-columns:1.05fr 1fr;gap:clamp(28px,5vw,64px);align-items:center}
        .v2-sm-row.rev .v2-sm-media{order:2}
        .v2-sm-media{position:relative;width:100%;min-height:clamp(320px,30vw,400px);display:flex;border-radius:18px;overflow:hidden;border:1px solid var(--border);background:var(--surface);box-shadow:0 12px 40px -24px rgba(15,17,40,.30)}
        /* HTML demo frame auto-sizes to the demo's real content height
           (DemoFrame measures it) — no fixed aspect, no clip, no 余白 */
        .v2-sm-media.demo{display:block;min-height:0;background:var(--navy-2)}
        .v2-sm-stage{font-family:var(--fm);font-size:12px;font-weight:800;letter-spacing:.04em;color:var(--cta-ink)}
        .v2-sm-title{font-family:var(--fd);font-size:clamp(22px,2.6vw,30px);font-weight:800;color:var(--heading);letter-spacing:-.02em;margin:10px 0 12px;line-height:1.3}
        .v2-sm-desc{font-size:16px;line-height:1.85;color:var(--text);margin:0 0 16px}
        .v2-sm-points{list-style:none;padding:0;margin:0 0 20px;display:grid;gap:8px}
        .v2-sm-points li{position:relative;padding-left:24px;font-size:14px;line-height:1.7;color:var(--text)}
        .v2-sm-points li::before{content:"";position:absolute;left:0;top:8px;width:14px;height:14px;border-radius:4px;background:var(--cta-light);box-shadow:inset 0 0 0 2px var(--cta)}
        .v2-sm-link{font-size:15px;font-weight:800;color:var(--cta-ink);text-decoration:none}
        .v2-sm-link:hover{text-decoration:underline}
        @media(max-width:900px){
          .v2-sm-row,.v2-sm-row.rev{grid-template-columns:1fr;gap:20px}
          .v2-sm-row.rev .v2-sm-media{order:0}
        }
      `}</style>
    </Section>
  );
}
