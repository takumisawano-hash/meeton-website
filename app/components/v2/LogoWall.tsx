import Image from "next/image";
import { Section } from "@/app/components/v2/ui";

// Customer-logo wall (assets in public/clients/). 2026-06-04 rebuild per
// Takumi: full color (NO grayscale), boxed white cards like the existing
// Meeton site, and an auto-scrolling marquee so a finite set reads as "many".
// The track is duplicated once for a seamless CSS loop; paused on hover.

export type ClientLogo = { name: string; logo: string; nameEn?: string };

export const CLIENTS: ClientLogo[] = [
  { name: "G-gen", logo: "/clients/ggen.png" },
  { name: "EduLinx", logo: "/clients/edulinx.png" },
  { name: "Univis Group", logo: "/clients/univis.png" },
  { name: "銀座桜屋", logo: "/clients/ginza-sakuraya.png", nameEn: "Ginza Sakuraya" },
  { name: "BizteX", logo: "/clients/biztex.png" },
  { name: "Domo", logo: "/clients/domo.svg" },
  { name: "インプレックスアンドカンパニー", logo: "/clients/imprexc.png", nameEn: "Imprex and Company" },
];

export default function LogoWall({
  tone = "surface",
  heading,
  lang = "ja",
}: {
  tone?: "surface" | "white" | "navy";
  heading?: string;
  /** default-heading locale; explicit heading always wins */
  lang?: "ja" | "en";
}) {
  const resolvedHeading =
    heading ??
    (lang === "en"
      ? "Chosen on the front lines of meeting generation, across every industry"
      : "業種を問わず、商談化の現場で選ばれています");
  const dark = tone === "navy";
  const loop = [...CLIENTS, ...CLIENTS]; // duplicate for seamless marquee
  return (
    <Section tone={tone} py={44}>
      <p
        style={{
          textAlign: "center",
          fontFamily: "var(--fm)",
          fontSize: 11,
          fontWeight: 800,
          letterSpacing: ".14em",
          textTransform: "uppercase",
          color: dark ? "var(--on-navy-sub)" : "var(--sub)",
          margin: "0 0 24px",
        }}
      >
        {resolvedHeading}
      </p>
      <div className="v2-marquee">
        <div className="v2-marquee-track">
          {loop.map((c, i) => {
            const label = lang === "en" ? (c.nameEn ?? c.name) : c.name;
            return (
              <div key={`${c.name}-${i}`} className="v2-logo-card" title={label} aria-hidden={i >= CLIENTS.length}>
                <Image src={c.logo} alt={i < CLIENTS.length ? label : ""} width={140} height={44} style={{ height: 40, width: "auto", maxWidth: 150, objectFit: "contain" }} />
              </div>
            );
          })}
        </div>
      </div>
      <style>{`
        .v2-marquee{position:relative;overflow:hidden;-webkit-mask-image:linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent);mask-image:linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent)}
        .v2-marquee-track{display:flex;gap:20px;width:max-content;animation:v2-marq 38s linear infinite}
        .v2-marquee:hover .v2-marquee-track{animation-play-state:paused}
        .v2-logo-card{flex:0 0 auto;display:flex;align-items:center;justify-content:center;min-width:170px;height:84px;padding:18px 28px;background:#fff;border:1px solid var(--border);border-radius:14px;box-shadow:0 1px 2px rgba(15,17,40,.03)}
        @keyframes v2-marq{from{transform:translateX(0)}to{transform:translateX(calc(-50% - 10px))}}
        @media(prefers-reduced-motion:reduce){.v2-marquee-track{animation:none;flex-wrap:wrap;justify-content:center;width:auto}}
        @media(max-width:768px){.v2-logo-card{min-width:130px;height:70px;padding:14px 20px}.v2-logo-card img{height:30px!important}}
      `}</style>
    </Section>
  );
}
