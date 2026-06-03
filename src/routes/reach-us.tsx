import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { FooterSection } from "@/components/jack/FooterSection";
import { useGlobalVideoUnlock } from "@/hooks/use-global-video-unlock";
import { CONTACT_EMAIL, WHATSAPP_DISPLAY, WHATSAPP_URL } from "@/lib/contact";

export const Route = createFileRoute("/reach-us")({
  head: () => ({
    meta: [
      { title: "Reach Us — Solver" },
      { name: "description", content: "Contact Solver via WhatsApp or email." },
    ],
  }),
  component: ReachUsPage,
});

function ReachUsPage() {
  const display = { fontFamily: "'Instrument Serif', serif" } as const;
  useGlobalVideoUnlock();

  return (
    <div className="min-h-screen overflow-x-clip" style={{ background: "#0C0C0C", fontFamily: "'Kanit', sans-serif" }}>
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

      <section className="mx-auto max-w-2xl px-5 py-16 sm:px-8 sm:py-24">
        <h1
          className="text-center text-4xl text-white sm:text-5xl"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Reach Us
        </h1>
        <p className="mx-auto mt-4 max-w-md text-center text-sm leading-relaxed text-white/55">
          Tell us about your project. We typically respond within one business day.
        </p>

        <div className="mt-12 flex flex-col gap-4">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col gap-1 rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-5 transition-colors hover:border-white/20 hover:bg-white/[0.07]"
          >
            <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/50">WhatsApp</span>
            <span className="text-lg text-white">{WHATSAPP_DISPLAY}</span>
          </a>

          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="flex flex-col gap-1 rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-5 transition-colors hover:border-white/20 hover:bg-white/[0.07]"
          >
            <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/50">Email</span>
            <span className="text-lg text-white">{CONTACT_EMAIL}</span>
          </a>
        </div>
      </section>

      <FooterSection />
    </div>
  );
}
