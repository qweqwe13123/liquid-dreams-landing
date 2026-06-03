import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { LiveProjectButton } from "./LiveProjectButton";

import video1 from "@/assets/video/project-1.mp4?url";
import video2 from "@/assets/video/project-2.mp4?url";
import video3 from "@/assets/video/project-3.mp4?url";

const PROJECTS = [
  { n: "01", category: "Client", name: "Nextlevel Studio", video: video1 },
  { n: "02", category: "Personal", name: "Aura Brand Identity", video: video2 },
  { n: "03", category: "Client", name: "Solaris Digital", video: video3 },
] as const;

function ProjectCard({ project }: { project: (typeof PROJECTS)[number] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(containerRef, { amount: 0.25, margin: "-5% 0px" });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (isInView) {
      const play = () => video.play().catch(() => {});
      if (video.readyState >= 2) play();
      else video.addEventListener("canplay", play, { once: true });
    } else {
      video.pause();
    }
  }, [isInView]);

  return (
    <motion.article
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto w-full max-w-6xl"
    >
      <div
        ref={containerRef}
        className={`group relative overflow-hidden rounded-[32px] border border-[#D7E2EA]/15 bg-[#111] shadow-[0_40px_120px_-40px_rgba(0,0,0,0.8)] transition-opacity duration-500 sm:rounded-[44px] md:rounded-[56px] ${isInView ? "opacity-100" : "opacity-80"}`}
      >
        <div className="relative aspect-[16/10] w-full sm:aspect-[16/9]">
          <video
            ref={videoRef}
            src={project.video}
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 h-full w-full object-cover"
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
              <span className="mt-2 text-[10px] uppercase tracking-[0.25em] text-[#D7E2EA]/70 sm:text-xs">
                {project.category}
              </span>
            </div>

            <div className="flex flex-wrap items-end justify-between gap-6">
              <h3
                className="font-medium uppercase leading-[0.95] tracking-tight text-[#D7E2EA]"
                style={{ fontSize: "clamp(1.5rem, 3.5vw, 3rem)" }}
              >
                {project.name}
              </h3>
              {isInView ? <LiveProjectButton /> : null}
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export function ProjectsSection() {
  return (
    <section
      className="relative z-10 -mt-10 rounded-t-[40px] px-5 py-24 sm:-mt-12 sm:rounded-t-[50px] sm:px-8 sm:py-32 md:-mt-14 md:rounded-t-[60px] md:px-10"
      style={{ background: "#0C0C0C", fontFamily: "'Kanit', sans-serif" }}
    >
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="hero-heading mb-20 text-center font-black uppercase leading-none tracking-tight sm:mb-28"
        style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
      >
        Project
      </motion.h2>

      <div className="flex flex-col gap-24 sm:gap-32 md:gap-40">
        {PROJECTS.map((project) => (
          <ProjectCard key={project.n} project={project} />
        ))}
      </div>
    </section>
  );
}
