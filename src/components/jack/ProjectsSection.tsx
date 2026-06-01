import { motion } from "framer-motion";
import { LiveProjectButton } from "./LiveProjectButton";
import { ProjectVideoFrame } from "./ProjectVideoFrame";

import video1 from "@/video/Video Project 1 copy.mp4";
import video2 from "@/video/Screen Recording 2026-06-01 at 11.35.32 PM.MOV";
import video3 from "@/video/copy_8F24B367-2150-405E-BFE2-44EAB65AE0B8.MOV";

const PROJECTS = [
  { n: "01", category: "Client", name: "Nextlevel Studio", video: video1 },
  { n: "02", category: "Personal", name: "Aura Brand Identity", video: video2 },
  { n: "03", category: "Client", name: "Solaris Digital", video: video3 },
] as const;

export function ProjectsSection() {
  return (
    <section
      className="rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 relative z-10 px-5 sm:px-8 md:px-10 py-20"
      style={{ background: "#0C0C0C", fontFamily: "'Kanit', sans-serif" }}
    >
      <h2
        className="hero-heading font-black uppercase leading-none tracking-tight text-center mb-16"
        style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
      >
        Project
      </h2>

      <motion.div
        initial={{ opacity: 0, y: 48 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] p-4 sm:p-6 md:p-8 max-w-7xl mx-auto"
        style={{ background: "#0C0C0C" }}
      >
        <div className="flex items-center justify-between gap-4 flex-wrap mb-8">
          <div className="flex flex-wrap gap-x-10 gap-y-4">
            {PROJECTS.map((project, i) => (
              <motion.div
                key={project.n}
                className="flex items-center gap-4"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <span
                  className="font-black hero-heading text-[#D7E2EA]/40"
                  style={{ fontSize: "clamp(1.5rem, 4vw, 48px)", lineHeight: 1 }}
                >
                  {project.n}
                </span>
                <div className="flex flex-col">
                  <span className="text-[#D7E2EA]/60 uppercase tracking-widest text-xs sm:text-sm">
                    {project.category}
                  </span>
                  <span
                    className="text-[#D7E2EA] font-medium uppercase"
                    style={{ fontSize: "clamp(0.75rem, 1.5vw, 1.25rem)" }}
                  >
                    {project.name}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
          <LiveProjectButton />
        </div>

        <div className="flex gap-3 sm:gap-4">
          <div className="flex flex-col gap-3 sm:gap-4" style={{ flex: "0 0 40%" }}>
            <ProjectVideoFrame
              src={PROJECTS[0].video}
              objectPosition="center"
              delay={0.05}
              style={{ height: "clamp(130px, 16vw, 230px)" }}
            />
            <ProjectVideoFrame
              src={PROJECTS[1].video}
              objectPosition="center"
              delay={0.18}
              style={{ height: "clamp(160px, 22vw, 340px)" }}
            />
          </div>
          <div style={{ flex: "0 0 60%" }} className="ml-auto">
            <ProjectVideoFrame
              src={PROJECTS[2].video}
              objectPosition="center"
              delay={0.3}
              className="h-full min-h-[clamp(280px,38vw,580px)]"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
