import type { Metadata } from "next";

// Rendering pass-through — this layout exists only so the /en subtree overrides
// the Japanese entity name inherited from the root metadata (EN standard:
// DynaMeet K.K.). Everything else (title template, metadataBase, …) still
// comes from app/layout.tsx.
export const metadata: Metadata = {
  authors: [{ name: "DynaMeet K.K." }],
  creator: "DynaMeet K.K.",
  publisher: "DynaMeet K.K.",
};

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return children;
}
