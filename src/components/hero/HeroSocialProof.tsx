const AVATAR_COLORS = [
  "linear-gradient(135deg, #6b8cce 0%, #3d5a80 100%)",
  "linear-gradient(135deg, #c4a574 0%, #8b6914 100%)",
  "linear-gradient(135deg, #9b7bb8 0%, #5c4a72 100%)",
  "linear-gradient(135deg, #7eb89a 0%, #3d6b52 100%)",
  "linear-gradient(135deg, #d4846a 0%, #8b4535 100%)",
];

export function HeroSocialProof() {
  return (
    <div className="animate-fade-rise-delay mt-10 flex flex-col items-center gap-4 sm:flex-row sm:gap-5">
      <div className="flex -space-x-2.5" aria-hidden>
        {AVATAR_COLORS.map((bg, i) => (
          <div
            key={i}
            className="h-9 w-9 shrink-0 rounded-full border-2 border-[#0a0f1f] sm:h-10 sm:w-10"
            style={{ background: bg, zIndex: 5 - i }}
          />
        ))}
      </div>
      <p
        className="max-w-xs text-center text-sm leading-snug text-white/90 sm:max-w-none sm:text-left sm:text-[15px]"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        <span className="font-semibold text-white">more than 1000</span>
        <span className="text-white/50"> • </span>
        tech investors join the club.{" "}
        <a href="#contact" className="font-semibold text-white underline-offset-2 hover:underline">
          Join us!
        </a>
      </p>
    </div>
  );
}
