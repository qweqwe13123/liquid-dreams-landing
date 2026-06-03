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

/** Desktop staircase: left → right, each step lower with horizontal shift */
const STAIRCASE_DESKTOP = [
  "left-0 top-0",
  "left-[14%] top-[min(22vw,220px)] md:left-[16%] md:top-[200px] lg:left-[18%] lg:top-[240px]",
  "left-[28%] top-[min(44vw,440px)] md:left-[32%] md:top-[400px] lg:left-[36%] lg:top-[480px]",
  "left-[42%] top-[min(66vw,660px)] md:left-[48%] md:top-[600px] lg:left-[54%] lg:top-[720px]",
] as const;

export function UseCasesSection() {
  return (
    <section
      className="relative overflow-hidden px-5 py-16 sm:px-8 sm:py-20 md:px-10 md:py-24"
      style={{ background: "#070B26", fontFamily: "'Kanit', sans-serif" }}
      aria-label="Use cases"
    >
      {/* Mobile & small tablet: vertical stack */}
      <div className="mx-auto flex max-w-[400px] flex-col gap-10 md:hidden">
        {USE_CASES.map((useCase, i) => (
          <UseCaseCard key={useCase.title} useCase={useCase} delay={0.06 + i * 0.08} />
        ))}
      </div>

      {/* Tablet: reduced stagger */}
      <div className="mx-auto hidden max-w-3xl flex-col gap-0 md:flex lg:hidden">
        {USE_CASES.map((useCase, i) => (
          <UseCaseCard
            key={useCase.title}
            useCase={useCase}
            delay={0.06 + i * 0.08}
            className={
              i === 0
                ? "self-start"
                : i === 1
                  ? "-mt-16 ml-[10%] self-start"
                  : i === 2
                    ? "-mt-16 ml-[20%] self-start"
                    : "-mt-16 ml-[30%] self-start"
            }
          />
        ))}
      </div>

      {/* Desktop: premium diagonal staircase */}
      <div
        className="relative mx-auto hidden w-full max-w-6xl lg:block"
        style={{ minHeight: "clamp(900px, 95vw, 1100px)" }}
      >
        {USE_CASES.map((useCase, i) => (
          <UseCaseCard
            key={useCase.title}
            useCase={useCase}
            delay={0.08 + i * 0.1}
            className={`absolute w-full max-w-[400px] ${STAIRCASE_DESKTOP[i]}`}
          />
        ))}
      </div>
    </section>
  );
}
