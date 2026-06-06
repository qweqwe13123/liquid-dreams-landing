import { createFileRoute, Link } from "@tanstack/react-router";
import { LegalDocumentPage } from "@/components/legal/LegalDocumentPage";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { FooterSection } from "@/components/jack/FooterSection";
import { PRIVACY_POLICY } from "@/data/legal/privacy-policy";
import { useGlobalVideoUnlock } from "@/hooks/use-global-video-unlock";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [{ title: "Privacy Policy — Solver" }, { name: "robots", content: "noindex" }],
  }),
  component: PrivacyPolicyPage,
});

function PrivacyPolicyPage() {
  const display = { fontFamily: "'Instrument Serif', serif" } as const;
  useGlobalVideoUnlock();

  return (
    <div className="min-h-screen overflow-x-clip" style={{ background: "#0C0C0C" }}>
      <SiteHeader
        logoStyle={display}
        variant="dark"
        showDesktopCta={false}
        backLink={
          <Link to="/" className="text-sm text-white/70 transition-colors hover:text-white">
            ← Back home
          </Link>
        }
      />
      <LegalDocumentPage document={PRIVACY_POLICY} />
      <FooterSection />
    </div>
  );
}
