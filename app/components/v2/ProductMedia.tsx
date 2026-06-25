import Image from "next/image";
import { productMedia } from "@/app/lib/product-media";
import ProductAnim from "@/app/components/v2/ProductAnim";
import { MotionSafeVideo } from "@/app/components/v2/AnimGate";
import DemoFrame from "@/app/components/v2/DemoFrame";
import type { Lang } from "@/app/lib/i18n";

// Large product media for a product LP — the demo the visitor came to see
// after clicking 詳しく見る. Auto-resolves public/product/<slug>.(mp4|png|...).
// Real media → fixed 16:9 frame. No asset → animated mock that sizes to its
// content (the detailed scenes are taller than 16:9).

export default function ProductMedia({ slug, icon, alt, lang = "ja" }: { slug: string; icon: string; alt: string; lang?: Lang }) {
  const media = productMedia(slug, lang);
  const isAnim = !media;
  const demoTitle = lang === "en" ? `${alt} demo` : `${alt} のデモ`;
  return (
    <div className="v2-pm">
      <div className={`v2-pm-frame ${isAnim ? "anim" : ""} ${media?.kind === "html" ? "demo" : ""}`}>
        {media?.kind === "html" ? (
          <DemoFrame src={media.src} title={demoTitle} />
        ) : media?.kind === "video" ? (
          <MotionSafeVideo src={media.src} />
        ) : media?.kind === "image" ? (
          <Image src={media.src} alt={demoTitle} fill sizes="(max-width:1040px) 100vw, 980px" style={{ objectFit: "cover" }} priority />
        ) : (
          <ProductAnim kind={icon} />
        )}
      </div>
      <style>{`
        .v2-pm{max-width:980px;margin:0 auto}
        .v2-pm-frame{position:relative;width:100%;aspect-ratio:16/9;border-radius:20px;overflow:hidden;border:1px solid var(--on-navy-border);background:var(--navy-2);box-shadow:0 30px 70px -30px rgba(0,0,0,.55)}
        .v2-pm-frame.anim{aspect-ratio:auto;min-height:clamp(360px,42vw,460px);display:flex}
        /* HTML demo auto-sizes to real content height (DemoFrame measures it) */
        .v2-pm-frame.demo{aspect-ratio:auto;min-height:0;display:flex;flex-direction:column;justify-content:center}
      `}</style>
    </div>
  );
}
