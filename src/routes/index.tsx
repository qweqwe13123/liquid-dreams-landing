import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { HeroSocialProof } from "@/components/hero/HeroSocialProof";
import { HeroStatsBar } from "@/components/hero/HeroStatsBar";
import { JackPortfolio } from "@/components/jack/JackPortfolio";
import { useAppReady } from "@/contexts/app-ready";

const HERO_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Solver — Where dreams rise through the silence" },
      { name: "description", content: "Digital spaces for deep thinkers, bold creators, and quiet rebels." },
      { property: "og:title", content: "Solver" },
      { property: "og:description", content: "Digital spaces for deep thinkers, bold creators, and quiet rebels." },
    ],
  }),
  component: Index,
});

function Index() {
  const display = { fontFamily: "'Instrument Serif', serif" } as const;
  const { ready } = useAppReady();
  const [heroVideoSrc, setHeroVideoSrc] = useState<string | null>(null);

  useEffect(() => {
    if (!ready) return;
    setHeroVideoSrc(HERO_VIDEO);
    const t = window.setTimeout(() => {
      const v = document.querySelector<HTMLVideoElement>("[data-hero-video]");
      v?.play().catch(() => {});
    }, 100);
    return () => window.clearTimeout(t);
  }, [ready]);

  return (
    <div className="w-full bg-background">
      <section className="relative min-h-screen w-full overflow-hidden">
        <div className="absolute inset-0 z-0 bg-[#0C0C0C]" aria-hidden />
        {heroVideoSrc ? (
          <video
            data-hero-video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            src={heroVideoSrc}
            className="absolute inset-0 z-0 h-full w-full object-cover"
            onLoadedData={(e) => e.currentTarget.play().catch(() => {})}
          />
        ) : null}

        <nav className="relative z-10 mx-auto flex max-w-7xl flex-row items-center justify-between px-8 py-6">
          <a href="/" className="text-3xl tracking-tight text-foreground" style={display}>
            Solver<sup className="text-xs">®</sup>
          </a>
          <div className="hidden items-center gap-8 md:flex">
            <a href="#" className="text-sm text-foreground transition-colors">
              Home
            </a>
            <Link
              to="/services"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Services
            </Link>
            <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Studio
            </a>
            <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              About
            </a>
            <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Journal
            </a>
            <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Reach Us
            </a>
          </div>
          <button className="liquid-glass rounded-full px-6 py-2.5 text-sm text-foreground transition-transform hover:scale-[1.03]">
            Begin Journey
          </button>
        </nav>

        <div className="relative z-10 flex flex-col items-center px-6 pb-44 pt-32 py-[90px] text-center sm:pb-52">
          <h1
            className="animate-fade-rise max-w-7xl text-5xl font-normal leading-[0.95] tracking-[-2.46px] sm:text-7xl md:text-8xl"
            style={display}
          >
            Where <em className="not-italic text-muted-foreground">dreams</em> rise{" "}
            <em className="not-italic text-muted-foreground">through the silence.</em>
          </h1>
          <p className="animate-fade-rise-delay mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            We're designing tools for deep thinkers, bold creators, and quiet rebels. Amid the chaos, we
            build digital spaces for sharp focus and inspired work.
          </p>
          <HeroSocialProof />
          <button className="liquid-glass mt-10 cursor-pointer rounded-full px-14 py-5 text-base text-foreground transition-transform hover:scale-[1.03] sm:mt-12">
            Begin Journey
          </button>
        </div>

        <div className="absolute bottom-6 left-0 right-0 z-10 sm:bottom-8">
          <HeroStatsBar />
        </div>
      </section>
      <JackPortfolio />
    </div>
  );
}
