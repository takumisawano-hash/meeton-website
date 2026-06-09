import Image from "next/image";
import { productMedia } from "@/app/lib/product-media";
import ProductAnim from "@/app/components/v2/ProductAnim";

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
          <ProductAnim kind={icon} />
        )}
      </div>
      <style>{`
        .v2-pm{max-width:980px;margin:0 auto}
        .v2-pm-frame{position:relative;width:100%;aspect-ratio:16/9;border-radius:20px;overflow:hidden;border:1px solid var(--on-navy-border);background:var(--navy-2);box-shadow:0 30px 70px -30px rgba(0,0,0,.55)}
      `}</style>
    </div>
  );
}
