const AVATARS = [
  {
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=96&h=96&fit=crop&crop=faces",
    alt: "Community member",
  },
  {
    src: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=96&h=96&fit=crop&crop=faces",
    alt: "Community member",
  },
  {
    src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=96&h=96&fit=crop&crop=faces",
    alt: "Community member",
  },
  {
    src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=96&h=96&fit=crop&crop=faces",
    alt: "Community member",
  },
  {
    src: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=96&h=96&fit=crop&crop=faces",
    alt: "Community member",
  },
] as const;

export function HeroSocialProof() {
  return (
    <div className="animate-fade-rise-delay mt-8 flex w-full max-w-md flex-col items-center gap-4 px-2 max-lg:mt-10 sm:flex-row sm:gap-5 lg:mt-10">
      <div className="flex -space-x-2.5" aria-hidden>
        {AVATARS.map((avatar, i) => (
          <img
            key={avatar.src}
            src={avatar.src}
            alt={avatar.alt}
            width={40}
            height={40}
            loading="lazy"
            decoding="async"
            className="h-9 w-9 shrink-0 rounded-full border-2 border-[#0a0f1f] object-cover sm:h-10 sm:w-10"
            style={{ zIndex: 5 - i }}
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
