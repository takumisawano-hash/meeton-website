import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";

export const metadata: Metadata = {
  title: "Meeton Library｜既存リードへの資料提案・解説（Coming Soon）",
  description:
    "Meeton Library は再訪した既存リードに対し、AI が文脈に応じた資料を提案・解説する機能。検討フェーズが進んだリードへの適切な情報提供で商談機会を再発火。新規リード獲得用ではなく、既存リードのナーチャリング専用機能。",
  alternates: { canonical: "/features/ai-library/" },
  openGraph: {
    title: "Meeton Library｜既存リードへの資料提案・解説",
    description:
      "再訪した既存リードに、AI が文脈に応じた資料を提案・解説するナーチャリング機能。",
    url: "https://dynameet.ai/features/ai-library/",
  },
};

export default function MeetonLibraryPage() {
  return (
    <div style={{ background: "#fff", minHeight: "100vh" }}>
      <Nav variant="light" />
      <main
        style={{
          maxWidth: 920,
          margin: "0 auto",
          padding: "120px 24px 80px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "8px 16px",
            background: "#f0ecfe",
            color: "#7c5cfc",
            borderRadius: 100,
            fontSize: 13,
            fontWeight: 700,
            marginBottom: 24,
          }}
        >
          Coming Soon
        </div>
        <h1
          style={{
            fontSize: "clamp(32px,5vw,52px)",
            fontWeight: 900,
            color: "#0f1128",
            lineHeight: 1.3,
            marginBottom: 24,
            letterSpacing: "-0.02em",
          }}
        >
          Meeton Library
          <br />
          <span style={{ fontSize: "0.7em", color: "#6e7494", fontWeight: 700 }}>
            既存リードへの資料提案・解説
          </span>
        </h1>
        <p
          style={{
            fontSize: 18,
            color: "#4a506e",
            lineHeight: 1.8,
            maxWidth: 720,
            margin: "0 auto 48px",
          }}
        >
          過去にコンバートしたリードが再訪した時、AI が文脈に応じた資料を提案・解説。
          検討フェーズが進んだリードに対し、適切な情報提供で商談機会を再発火する、
          既存リードのナーチャリング専用機能です。
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 20,
            marginBottom: 64,
            maxWidth: 720,
            margin: "0 auto 64px",
          }}
        >
          {[
            {
              title: "AI 資料推薦",
              desc: "リードの行動履歴・興味分野から最適な資料を AI が推薦",
            },
            {
              title: "AI チャット解説",
              desc: "資料の中身を AI が解説、質問にもその場で回答",
            },
            {
              title: "Meeton Calendar 連携",
              desc: "検討再開のタイミングを捉えて商談予約まで引き渡し",
            },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                padding: 24,
                background: "#f4f6fb",
                borderRadius: 12,
                textAlign: "left",
              }}
            >
              <div
                style={{
                  fontSize: 16,
                  fontWeight: 800,
                  color: "#0f1128",
                  marginBottom: 8,
                }}
              >
                {item.title}
              </div>
              <div style={{ fontSize: 14, color: "#6e7494", lineHeight: 1.7 }}>
                {item.desc}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            padding: "32px 24px",
            background: "linear-gradient(135deg,#f7f8ff,#fff)",
            borderRadius: 16,
            border: "1px solid #dfe3f0",
            maxWidth: 600,
            margin: "0 auto",
          }}
        >
          <p style={{ fontSize: 15, color: "#4a506e", marginBottom: 16, lineHeight: 1.7 }}>
            Meeton Library は現在開発中です。
            <br />
            一般提供開始のお知らせを希望される方は、デモ予約時にお伝えください。
          </p>
          <Link
            href="/"
            style={{
              display: "inline-block",
              padding: "14px 28px",
              background: "#12a37d",
              color: "#fff",
              borderRadius: 10,
              fontWeight: 700,
              textDecoration: "none",
              fontSize: 15,
            }}
          >
            ホームへ戻る →
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
