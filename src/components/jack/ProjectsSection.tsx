import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useAppReady } from "@/contexts/app-ready";
import { LiveProjectButton } from "./LiveProjectButton";

import video1 from "@/assets/video/Video Project 1.mp4?url";
import video2 from "@/assets/video/copy_8F24B367-2150-405E-BFE2-44EAB65AE0B8.mp4?url";
import video3 from "@/assets/video/Video Project 1 copy.mp4?url";

const PROJECTS = [
  { n: "01", category: "Client", name: "Nextlevel Studio", video: video1 },
  { n: "02", category: "Personal", name: "Aura Brand Identity", video: video2 },
  { n: "03", category: "Client", name: "Solaris Digital", video: video3 },
] as const;

function ProjectCard({ project }: { project: (typeof PROJECTS)[number] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);

  const isNear = useInView(containerRef, {
    once: true,
    margin: "400px 0px",
    amount: 0.1,
  });

  const isActive = useInView(containerRef, {
    amount: 0.35,
    margin: "-10% 0px -10% 0px",
  });

  useEffect(() => {
    if (isNear && !videoSrc) {
      setVideoSrc(project.video);
    }
  }, [isNear, project.video, videoSrc]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoSrc) return;

    const play = () => {
      if (isActive) video.play().catch(() => {});
      else video.pause();
    };

    if (video.readyState >= 2) play();
    else video.addEventListener("loadeddata", play, { once: true });

    return () => video.removeEventListener("loadeddata", play);
  }, [isActive, videoSrc]);

  return (
    <motion.article
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto w-full max-w-6xl"
    >
      <div
        ref={containerRef}
        className={`group relative overflow-hidden rounded-[32px] border border-[#D7E2EA]/15 bg-[#111] shadow-[0_40px_120px_-40px_rgba(0,0,0,0.8)] transition-opacity duration-500 sm:rounded-[44px] md:rounded-[56px] ${isActive ? "opacity-100" : "opacity-75"}`}
      >
        <div className="relative aspect-[16/10] w-full sm:aspect-[16/9]">
          {videoSrc ? (
            <video
              ref={videoRef}
              src={videoSrc}
              muted
              loop
              playsInline
              preload="auto"
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 animate-pulse bg-[#1a1a1a]" aria-hidden />
          )}
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
              {isActive ? <LiveProjectButton /> : null}
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export function ProjectsSection() {
  const { ready } = useAppReady();

  if (!ready) {
    return (
      <section
        className="relative z-10 -mt-10 rounded-t-[40px] px-5 py-24 sm:-mt-12 sm:rounded-t-[50px] sm:px-8 sm:py-32 md:-mt-14 md:rounded-t-[60px] md:px-10"
        style={{ background: "#0C0C0C", minHeight: 480 }}
        aria-hidden
      />
    );
  }

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
