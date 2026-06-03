import { FadeIn } from "./FadeIn";
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

const STAGGER = [
  "relative z-[4] self-start",
  "relative z-[3] -mt-2 self-center sm:-mt-6 md:ml-[12%] md:self-auto",
  "relative z-[2] -mt-2 self-end sm:-mt-6 md:ml-[24%] md:self-auto",
  "relative z-[1] -mt-2 self-start sm:-mt-6 md:ml-[36%] md:self-auto",
];

export function AboutSection() {
  return (
    <section
      className="relative overflow-hidden px-5 py-20 sm:px-8 sm:py-28 md:px-10 md:py-32"
      style={{ background: "#070B26", fontFamily: "'Kanit', sans-serif" }}
    >
      <FadeIn as="h2" delay={0} y={40}
        className="hero-heading mb-14 text-center font-black uppercase leading-none tracking-tight sm:mb-20"
        style={{ fontSize: "clamp(2.5rem, 10vw, 120px)" }}
      >
        Who We Are
      </FadeIn>

      <div className="mx-auto flex max-w-5xl flex-col">
        {USE_CASES.map((useCase, i) => (
          <UseCaseCard
            key={useCase.title}
            useCase={useCase}
            delay={0.08 + i * 0.1}
            className={STAGGER[i]}
          />
        ))}
      </div>
    </section>
  );
}
