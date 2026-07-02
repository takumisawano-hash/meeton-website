import SetHtmlLang from "@/app/components/SetHtmlLang";

// Nested layout for the English tree. No <html>/<body> here (the root layout
// owns them); this only corrects document.lang to "en" client-side.
export default function EnLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SetHtmlLang lang="en" />
      {children}
    </>
  );
}
