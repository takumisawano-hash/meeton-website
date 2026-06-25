import { existsSync } from "node:fs";
import { join } from "node:path";
import type { Lang } from "@/app/lib/i18n";

// Resolve a product's media asset by convention: public/product/<slug>.(mp4|png
// |jpg|webp). Returns the public URL + kind, or null → caller shows a labeled
// placeholder. Server-only (uses fs); fine in RSC. Drop a file in to light it up.
//
// English pages prefer public/product/en/<slug>.* (translated demo UI). If an
// English asset is missing for a given kind, we fall back to the JA asset so an
// untranslated demo still renders rather than showing a blank placeholder.

const PUBLIC = join(process.cwd(), "public", "product");

export type Media = { src: string; kind: "video" | "image" | "html" } | null;

function resolveIn(dir: string, urlPrefix: string, slug: string): Media {
  // Interactive HTML demo (real product UI, self-contained, plays its own CSS
  // entrance animation) takes priority — embedded via <iframe> by DemoFrame.
  if (existsSync(join(dir, `${slug}.html`))) return { src: `${urlPrefix}/${slug}.html`, kind: "html" };
  for (const ext of ["mp4", "webm"]) {
    if (existsSync(join(dir, `${slug}.${ext}`))) return { src: `${urlPrefix}/${slug}.${ext}`, kind: "video" };
  }
  for (const ext of ["png", "jpg", "jpeg", "webp", "gif"]) {
    if (existsSync(join(dir, `${slug}.${ext}`))) return { src: `${urlPrefix}/${slug}.${ext}`, kind: "image" };
  }
  return null;
}

export function productMedia(slug: string, lang: Lang = "ja"): Media {
  if (lang === "en") {
    const en = resolveIn(join(PUBLIC, "en"), "/product/en", slug);
    if (en) return en;
    // no EN asset → fall back to JA so the demo still renders
  }
  return resolveIn(PUBLIC, "/product", slug);
}
