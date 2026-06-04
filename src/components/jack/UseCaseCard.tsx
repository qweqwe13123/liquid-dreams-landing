import { FadeIn } from "./FadeIn";

export type UseCase = {
  title: string;
  description: string;
  href?: string;
};

export function UseCaseCard({
  useCase,
  className = "",
  delay = 0,
}: {
  useCase: UseCase;
  className?: string;
  delay?: number;
}) {
  return (
    <FadeIn delay={delay} y={32} duration={0.75} className={className}>
      <article
        className="group flex w-full flex-col gap-4 rounded-3xl border border-white/[0.08] p-6 transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-white/[0.16] hover:shadow-[0_32px_80px_-24px_rgba(0,0,0,0.75)] sm:gap-5 sm:p-7"
        style={{
          background:
            "linear-gradient(145deg, rgba(22, 28, 58, 0.92) 0%, rgba(12, 16, 38, 0.88) 100%)",
          backdropFilter: "blur(20px)",
          boxShadow: "0 24px 64px -24px rgba(0, 0, 0, 0.65)",
        }}
      >
        <span
          className="inline-flex w-fit rounded-md px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white"
          style={{ background: "#0d9b8a", fontFamily: "'Inter', sans-serif" }}
        >
          Use Case
        </span>
        <h3
          className="text-2xl font-semibold leading-tight text-white sm:text-[1.65rem]"
          style={{ fontFamily: "'Inter', sans-serif", letterSpacing: "-0.02em" }}
        >
          {useCase.title}
        </h3>
        <p
          className="text-[15px] leading-relaxed text-white/72"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          {useCase.description}
        </p>
        <a
          href={useCase.href ?? "/contact"}
          className="mt-1 inline-flex items-center gap-1.5 text-[15px] font-medium text-white transition-opacity group-hover:opacity-80"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Explore Now <span aria-hidden>→</span>
        </a>
      </article>
    </FadeIn>
  );
}
