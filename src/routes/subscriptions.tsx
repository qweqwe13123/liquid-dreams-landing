import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { FooterSection } from "@/components/jack/FooterSection";
import { useGlobalVideoUnlock } from "@/hooks/use-global-video-unlock";
import { CONTACT_EMAIL, WHATSAPP_URL } from "@/lib/contact";

export const Route = createFileRoute("/subscriptions")({
  head: () => ({
    meta: [
      { title: "Subscriptions — Solver" },
      { name: "description", content: "Solver membership — ongoing support and priority access." },
    ],
  }),
  component: SubscriptionsPage,
});

const PLAN_FEATURES = [
  "Priority support & faster turnaround",
  "Monthly strategy check-in",
  "Small updates & fixes included",
  "Direct line to the Solver team",
] as const;

function SubscriptionsPage() {
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

      <section className="mx-auto max-w-lg px-5 py-16 sm:px-8 sm:py-24">
        <h1
          className="text-center text-4xl text-white sm:text-5xl"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Subscriptions
        </h1>
        <p className="mx-auto mt-4 max-w-md text-center text-sm leading-relaxed text-white/55">
          Stay close to the team with a simple monthly membership.
        </p>

        <article className="mt-12 rounded-2xl border border-white/12 bg-white/[0.04] p-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/50">Solver Membership</p>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-5xl text-white" style={{ fontFamily: "'Instrument Serif', serif" }}>
              $49
            </span>
            <span className="text-sm text-white/50">/ month</span>
          </div>
          <ul className="mt-8 flex flex-col gap-3 text-sm text-white/70">
            {PLAN_FEATURES.map((feature) => (
              <li key={feature} className="flex gap-2">
                <span className="text-white/40" aria-hidden>
                  —
                </span>
                {feature}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-3">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center rounded-full border border-white/25 bg-white/10 py-4 text-sm font-medium uppercase tracking-wider text-white transition hover:bg-white/15"
            >
              Subscribe via WhatsApp
            </a>
            <a
              href={`mailto:${CONTACT_EMAIL}?subject=Solver%20Membership%20(%2449%2Fmo)`}
              className="flex w-full items-center justify-center rounded-full border border-white/15 py-4 text-sm text-white/80 transition hover:text-white"
            >
              Or email us
            </a>
          </div>
        </article>
      </section>

      <FooterSection />
    </div>
  );
}
