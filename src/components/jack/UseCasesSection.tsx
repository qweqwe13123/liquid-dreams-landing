import { UseCaseCard, type UseCase } from "./UseCaseCard";

const USE_CASES: UseCase[] = [
  {
    title: "Ecommerce",
    description:
      "We create modern, high-converting websites that increase customer engagement, strengthen brand trust, and help businesses drive more sales.",
  },
  {
    title: "Tech",
    description:
      "Leverage the power of high-performance 3D websites to elevate your digital presence and create unforgettable user experiences.",
  },
  {
    title: "Creative",
    description:
      "We craft unique digital experiences that help brands stand out, capture attention, and leave a lasting impression on their audience.",
  },
  {
    title: "Storytelling",
    description:
      "Tell your brand's story through immersive experiences, thoughtful animations, and modern digital solutions that keep users engaged.",
  },
];

/** Mostly horizontal; ~3.5rem downward step per card (visible gap, compact height) */
const STAGGER_STEP = [
  "translate-y-0",
  "translate-y-10 md:translate-y-12",
  "translate-y-20 md:translate-y-24",
  "translate-y-[4.5rem] md:translate-y-36",
] as const;

function StaggeredRow({ className = "" }: { className?: string }) {
  return (
    <div
      className={`mx-auto flex w-max max-w-full flex-row items-start justify-center gap-5 px-2 sm:gap-6 md:gap-7 lg:gap-8 ${className}`}
    >
      {USE_CASES.map((useCase, i) => (
        <UseCaseCard
          key={useCase.title}
          useCase={useCase}
          delay={0.06 + i * 0.08}
          className={`w-[min(100%,300px)] shrink-0 sm:w-[320px] ${STAGGER_STEP[i]}`}
        />
      ))}
    </div>
  );
}

export function UseCasesSection() {
  return (
    <section
      className="relative overflow-x-auto overflow-y-hidden px-4 py-12 sm:px-6 sm:py-14 md:px-8 md:py-16"
      style={{ background: "#070B26", fontFamily: "'Kanit', sans-serif" }}
      aria-label="Use cases"
    >
      {/* Mobile: vertical stack with comfortable gaps */}
      <div className="mx-auto flex max-w-[340px] flex-col gap-8 sm:max-w-[360px] md:hidden">
        {USE_CASES.map((useCase, i) => (
          <UseCaseCard key={useCase.title} useCase={useCase} delay={0.06 + i * 0.08} />
        ))}
      </div>

      {/* Tablet+: horizontal staircase — wide, shallow diagonal */}
      <StaggeredRow className="hidden md:flex" />
    </section>
  );
}
