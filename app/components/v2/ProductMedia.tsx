import Image from "next/image";
import { ProductIcon } from "@/app/components/v2/ui";
import { productMedia } from "@/app/lib/product-media";

// Large product media for a product LP — the demo the visitor came to see
// after clicking 詳しく見る. Auto-resolves public/product/<slug>.(mp4|png|...);
// shows a labeled placeholder until a real asset is dropped in (no code change).

export default function ProductMedia({ slug, icon, alt }: { slug: string; icon: string; alt: string }) {
  const media = productMedia(slug);
  return (
    <div className="v2-pm">
      <div className="v2-pm-frame">
        {media?.kind === "video" ? (
          <video src={media.src} autoPlay muted loop playsInline style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        ) : media?.kind === "image" ? (
          <Image src={media.src} alt={`${alt} のデモ`} fill sizes="(max-width:1040px) 100vw, 980px" style={{ objectFit: "cover" }} priority />
        ) : (
          <div className="v2-pm-placeholder">
            <span className="v2-pm-icon"><ProductIcon kind={icon} size={48} /></span>
            <span className="v2-pm-label">{alt} のスクリーンショット / 動画</span>
            <span className="v2-pm-sub">public/product/{slug}.png または {slug}.mp4 を配置</span>
          </div>
        )}
      </div>
      <style>{`
        .v2-pm{max-width:980px;margin:0 auto}
        .v2-pm-frame{position:relative;width:100%;aspect-ratio:16/9;border-radius:20px;overflow:hidden;border:1px solid var(--on-navy-border);background:var(--navy-2);box-shadow:0 30px 70px -30px rgba(0,0,0,.55)}
        .v2-pm-placeholder{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;background:radial-gradient(circle at 30% 26%,rgba(7,203,121,.16),transparent 55%),radial-gradient(circle at 74% 78%,rgba(7,203,121,.08),transparent 55%),var(--navy-2)}
        .v2-pm-icon{color:var(--cta)}
        .v2-pm-label{font-size:16px;font-weight:800;color:var(--on-navy)}
        .v2-pm-sub{font-family:var(--fm);font-size:12px;color:var(--on-navy-sub)}
      `}</style>
    </div>
  );
}
