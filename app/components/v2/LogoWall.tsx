import Image from "next/image";
import { Section } from "@/app/components/v2/ui";

// Real customer-logo wall (assets in public/clients/). Social proof near the
// first view. grayscale → color on hover keeps green the only live accent
// until interaction (§3.8). Server-rendered; next/image for CLS/optimization.

export type ClientLogo = { name: string; logo: string };

export const CLIENTS: ClientLogo[] = [
  { name: "G-gen", logo: "/clients/ggen.png" },
  { name: "EduLinx", logo: "/clients/edulinx.png" },
  { name: "Univis Group", logo: "/clients/univis.png" },
  { name: "銀座桜屋", logo: "/clients/ginza-sakuraya.png" },
  { name: "BizteX", logo: "/clients/biztex.png" },
  { name: "Domo", logo: "/clients/domo.svg" },
  { name: "インプレックスアンドカンパニー", logo: "/clients/imprexc.png" },
];

export default function LogoWall({
  tone = "surface",
  heading = "業種を問わず、商談化の現場で選ばれています",
}: {
  tone?: "surface" | "white" | "navy";
  heading?: string;
}) {
  const dark = tone === "navy";
  return (
    <Section tone={tone} py={48}>
      <p
        style={{
          textAlign: "center",
          fontFamily: "var(--fm)",
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: ".06em",
          color: dark ? "var(--on-navy-sub)" : "var(--sub)",
          margin: "0 0 24px",
        }}
      >
        {heading}
      </p>
      <div className="v2-logowall">
        {CLIENTS.map((c) => (
          <div key={c.name} className="v2-logo-item" title={c.name}>
            <Image src={c.logo} alt={c.name} width={120} height={40} style={{ height: 34, width: "auto", objectFit: "contain" }} />
          </div>
        ))}
      </div>
      <style>{`
        .v2-logowall{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:32px 44px;max-width:980px;margin:0 auto}
        .v2-logo-item{filter:grayscale(1);opacity:.62;transition:filter .25s,opacity .25s}
        .v2-logo-item:hover{filter:grayscale(0);opacity:1}
        @media(max-width:768px){.v2-logowall{gap:22px 28px}.v2-logo-item img{height:26px!important}}
      `}</style>
    </Section>
  );
}
