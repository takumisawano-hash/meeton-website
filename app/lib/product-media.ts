import { existsSync } from "node:fs";
import { join } from "node:path";

// Resolve a product's media asset by convention: public/product/<slug>.(mp4|png
// |jpg|webp). Returns the public URL + kind, or null → caller shows a labeled
// placeholder. Server-only (uses fs); fine in RSC. Drop a file in to light it up.

const PUBLIC = join(process.cwd(), "public", "product");

export type Media = { src: string; kind: "video" | "image" | "html" } | null;

export function productMedia(slug: string): Media {
  // Interactive HTML demo (real product UI, self-contained, plays its own CSS
  // entrance animation) takes priority — embedded via <iframe> by DemoFrame.
  if (existsSync(join(PUBLIC, `${slug}.html`))) return { src: `/product/${slug}.html`, kind: "html" };
  for (const ext of ["mp4", "webm"]) {
    if (existsSync(join(PUBLIC, `${slug}.${ext}`))) return { src: `/product/${slug}.${ext}`, kind: "video" };
  }
  for (const ext of ["png", "jpg", "jpeg", "webp", "gif"]) {
    if (existsSync(join(PUBLIC, `${slug}.${ext}`))) return { src: `/product/${slug}.${ext}`, kind: "image" };
  }
  return null;
}
