import { Link } from "@tanstack/react-router";

const ctaFont = { fontFamily: "'Inter', sans-serif" } as const;

export function CtaButtons({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-wrap items-center gap-3 sm:gap-4 ${className}`}>
      <Link
        to="/contact"
        className="inline-flex items-center justify-center rounded-full border border-white/90 px-6 py-3 text-[15px] font-medium tracking-[-0.01em] text-white transition-colors hover:bg-white/10 sm:px-7 sm:py-3.5"
        style={ctaFont}
      >
        book a call
      </Link>
      <Link
        to="/contact"
        className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-[15px] font-medium tracking-[-0.01em] text-[#070B26] transition-opacity hover:opacity-90 sm:px-7 sm:py-3.5"
        style={ctaFont}
      >
        Talk to Us
      </Link>
    </div>
  );
}
