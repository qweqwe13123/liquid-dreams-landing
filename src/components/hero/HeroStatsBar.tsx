const STATS = [
  { value: "410+", label: "Tech professionals" },
  { value: "€11M", label: "Invested" },
  { value: "100", label: "Deals made" },
  { value: "2.5", label: "years" },
] as const;

export function HeroStatsBar() {
  return (
    <div className="animate-fade-rise-delay-2 mx-auto w-full max-w-3xl px-3 max-lg:max-w-[min(100%,20rem)] lg:px-4">
      <div
        className="grid grid-cols-2 divide-x divide-y divide-white/10 overflow-hidden rounded-2xl border border-white/10 sm:grid-cols-4 sm:divide-y-0"
        style={{
          background: "rgba(0, 0, 0, 0.35)",
          backdropFilter: "blur(24px)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)",
        }}
      >
        {STATS.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col items-center justify-center gap-1 px-3 py-5 sm:px-4 sm:py-6"
          >
            <span
              className="text-xl font-semibold tracking-tight text-white sm:text-2xl"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {stat.value}
            </span>
            <span
              className="text-center text-[11px] leading-snug text-white/55 sm:text-xs"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
