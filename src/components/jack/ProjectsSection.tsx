import { useEffect, useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { LiveProjectButton } from "./LiveProjectButton";

import video1 from "@/assets/video/Video Project 1.mp4";
import video2 from "@/assets/video/copy_8F24B367-2150-405E-BFE2-44EAB65AE0B8.mp4";
import video3 from "@/assets/video/Video Project 1 copy.mp4";

const PROJECTS = [
  { n: "01", category: "Client", name: "Nextlevel Studio", video: video1 },
  { n: "02", category: "Personal", name: "Aura Brand Identity", video: video2 },
  { n: "03", category: "Client", name: "Solaris Digital", video: video3 },
] as const;

function ProjectCard({
  project,
  index,
}: {
  project: (typeof PROJECTS)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isActive = useInView(ref, { amount: 0.55, margin: "-10% 0px -10% 0px" });
  const isVisible = useInView(ref, { amount: 0.2, once: false });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (isActive) v.play().catch(() => {});
    else v.pause();
  }, [isActive]);

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 80, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
      className="relative mx-auto w-full max-w-6xl"
    >
      <motion.div
        animate={{
          opacity: isVisible ? (isActive ? 1 : 0.55) : 0.4,
          scale: isActive ? 1 : 0.985,
        }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        style={{ y }}
        className="group relative overflow-hidden rounded-[32px] sm:rounded-[44px] md:rounded-[56px] border border-[#D7E2EA]/15 bg-[#111] shadow-[0_40px_120px_-40px_rgba(0,0,0,0.8)]"
      >
        <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full">
          <video
            ref={videoRef}
            src={project.video}
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

          <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-10 md:p-12">
            <div className="flex items-start justify-between">
              <span
                className="hero-heading font-black leading-none"
                style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)" }}
              >
                {project.n}
              </span>
              <span className="text-[#D7E2EA]/70 uppercase tracking-[0.25em] text-[10px] sm:text-xs mt-2">
                {project.category}
              </span>
            </div>

            <div className="flex items-end justify-between gap-6 flex-wrap">
              <h3
                className="text-[#D7E2EA] font-medium uppercase leading-[0.95] tracking-tight"
                style={{ fontSize: "clamp(1.5rem, 3.5vw, 3rem)" }}
              >
                {project.name}
              </h3>
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -10 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <LiveProjectButton />
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.article>
  );
}

export function ProjectsSection() {
  return (
    <section
      className="rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 relative z-10 px-5 sm:px-8 md:px-10 py-24 sm:py-32"
      style={{ background: "#0C0C0C", fontFamily: "'Kanit', sans-serif" }}
    >
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="hero-heading font-black uppercase leading-none tracking-tight text-center mb-20 sm:mb-28"
        style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
      >
        Project
      </motion.h2>

      <div className="flex flex-col gap-24 sm:gap-32 md:gap-40">
        {PROJECTS.map((project, i) => (
          <ProjectCard key={project.n} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
