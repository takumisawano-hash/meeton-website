import Link from "next/link";
import Image from "next/image";
import { Section, SectionHead, ProductIcon } from "@/app/components/v2/ui";

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
  /** optional real media; if absent → labeled placeholder box */
  image?: string;
  video?: string;
};

const ROWS: Row[] = [
  {
    key: "chat",
    stage: "① 掴む",
    title: "会話で、訪問者を掴む。",
    desc: "問い合わせを待たず、AIチャットが訪問者に話しかける。接触前の検討の土台に立ち、その場で疑問に答えてリードに変える。",
    points: ["シナリオ設計不要・設置5分", "過去の閲覧/会話の文脈を引き継ぐ"],
    href: "/chat/",
    icon: "chat",
  },
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
  return (
    <div className="v2-sm-media">
      {row.video ? (
        <video src={row.video} autoPlay muted loop playsInline poster={row.image} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      ) : row.image ? (
        <Image src={row.image} alt={`${row.title} のデモ`} fill sizes="(max-width:900px) 100vw, 560px" style={{ objectFit: "cover" }} />
      ) : (
        <div className="v2-sm-placeholder">
          <span className="v2-sm-ph-icon"><ProductIcon kind={row.icon} size={40} /></span>
          <span className="v2-sm-ph-label">スクリーンショット / 動画</span>
          <span className="v2-sm-ph-sub">public/product/{row.key}.png|mp4</span>
        </div>
      )}
    </div>
  );
}

export default function StageMedia() {
  return (
    <Section tone="white">
      <SectionHead
        eyebrow="動きで見る AI SDR"
        title="それぞれの仕事を、実際の画面で。"
        lede="掴む・育てる・商談化する・追客する——各仕事がどう動くかを、製品の画面で。"
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
        .v2-sm-media{position:relative;width:100%;aspect-ratio:16/10;border-radius:18px;overflow:hidden;border:1px solid var(--border);background:var(--surface);box-shadow:0 12px 40px -24px rgba(15,17,40,.30)}
        .v2-sm-placeholder{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;background:radial-gradient(circle at 30% 28%,rgba(7,203,121,.12),transparent 55%),radial-gradient(circle at 72% 75%,rgba(15,17,40,.06),transparent 55%),var(--surface)}
        .v2-sm-ph-icon{color:var(--cta)}
        .v2-sm-ph-label{font-size:14px;font-weight:800;color:var(--heading)}
        .v2-sm-ph-sub{font-family:var(--fm);font-size:11px;color:var(--sub)}
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
