import type { Metadata } from "next";
import SetHtmlLang from "@/app/components/SetHtmlLang";

// Nested layout for the English tree. No <html>/<body> here (the root layout
// owns them); this corrects document.lang to "en" client-side AND overrides
// the Japanese entity name inherited from the root metadata (EN standard:
// DynaMeet, Inc.). Everything else (title template, metadataBase, …) still
// comes from app/layout.tsx.
export const metadata: Metadata = {
  authors: [{ name: "DynaMeet, Inc." }],
  creator: "DynaMeet, Inc.",
  publisher: "DynaMeet, Inc.",
};

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SetHtmlLang lang="en" />
      {children}
    </>
  );
}
