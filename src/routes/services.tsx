import { createFileRoute, Link } from "@tanstack/react-router";
import { ServicesSection } from "@/components/jack/ServicesSection";
import { FooterSection } from "@/components/jack/FooterSection";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Solver" },
      { name: "description", content: "All 14 services we provide — from web & app development to maintenance & support." },
      { property: "og:title", content: "Services — Solver" },
      { property: "og:description", content: "All 14 services we provide — from web & app development to maintenance & support." },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <div style={{ background: "#0C0C0C", fontFamily: "'Kanit', sans-serif", minHeight: "100vh" }}>
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-8 py-6">
        <Link to="/" className="text-3xl tracking-tight text-white" style={{ fontFamily: "'Instrument Serif', serif" }}>
          Solver<sup className="text-xs">®</sup>
        </Link>
        <Link to="/" className="text-sm text-white/70 hover:text-white transition-colors">← Back home</Link>
      </nav>
      <ServicesSection full />
      <FooterSection />
    </div>
  );
}