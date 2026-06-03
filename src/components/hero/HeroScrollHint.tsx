export function HeroScrollHint() {
  return (
    <a
      href="#portfolio"
      className="group flex flex-col items-center gap-3 text-white/55 transition-colors hover:text-white/80"
      aria-label="Scroll down — begin journey"
    >
      <span
        className="text-[11px] font-medium uppercase tracking-[0.22em]"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        begin journey
      </span>
      <span className="relative flex h-11 w-[26px] items-center justify-center rounded-full border border-white/35 bg-black/20 backdrop-blur-sm">
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4 animate-scroll-chevron text-white/70"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M12 5v14M6 13l6 6 6-6" />
        </svg>
      </span>
    </a>
  );
}
