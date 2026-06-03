import Image from "next/image";
import { AUTHOR } from "@/app/lib/author";

// Founder note — real photo (public/team/sawano.png) + name/title. Adds the
// "who builds this / who you'll talk to" trust signal (audit). Use near demo
// CTAs and on glossary bylines. White card on any tone.

export default function FounderNote({
  note = "商談化の現場を、エンタープライズSDR/AEとして経験してきました。Meeton ai は、その現場知をそのままプロダクトにしています。",
  compact = false,
}: {
  note?: string;
  compact?: boolean;
}) {
  return (
    <div
      style={{
        display: "flex",
        gap: compact ? 12 : 18,
        alignItems: "center",
        background: "#fff",
        border: "1px solid var(--border)",
        borderRadius: 16,
        padding: compact ? "12px 16px" : "18px 22px",
        maxWidth: compact ? 420 : 560,
      }}
    >
      <Image
        src="/team/sawano.png"
        alt={`${AUTHOR.name}（${AUTHOR.jobTitle}）`}
        width={compact ? 48 : 64}
        height={compact ? 48 : 64}
        style={{ width: compact ? 48 : 64, height: compact ? 48 : 64, borderRadius: 999, objectFit: "cover", flexShrink: 0, border: "2px solid var(--cta-light)" }}
      />
      <div>
        {!compact && <p style={{ fontSize: 14, lineHeight: 1.7, color: "var(--text)", margin: "0 0 8px" }}>{note}</p>}
        <div style={{ fontSize: compact ? 13 : 14, fontWeight: 800, color: "var(--heading)" }}>{AUTHOR.name}</div>
        <div style={{ fontSize: 12, color: "var(--sub)" }}>{AUTHOR.jobTitle}</div>
      </div>
    </div>
  );
}
