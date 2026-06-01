import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { LiveProjectButton } from "./LiveProjectButton";

interface Project {
  n: string;
  category: string;
  name: string;
  col1a: string;
  col1b: string;
  col2: string;
}

const PROJECTS: Project[] = [
  {
    n: "01",
    category: "Client",
    name: "Nextlevel Studio",
    col1a: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85",
    col1b: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85",
    col2: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85",
  },
  {
    n: "02",
    category: "Personal",
    name: "Aura Brand Identity",
    col1a: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85",
    col1b: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85",
    col2: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85",
  },
  {
    n: "03",
    category: "Client",
    name: "Solaris Digital",
    col1a: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85",
    col1b: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85",
    col2: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85",
  },
];

function Card({ project, index, total, progress }: { project: Project; index: number; total: number; progress: ReturnType<typeof useScroll>["scrollYProgress"]; }) {
  const targetScale = 1 - (total - 1 - index) * 0.03;
  const range: [number, number] = [index / total, 1];
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div className="sticky top-24 md:top-32" style={{ top: `${index * 28 + 96}px` }}>
      <motion.div
        style={{ scale, background: "#0C0C0C" }}
        className="rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] p-4 sm:p-6 md:p-8"
      >
        <div className="flex items-center justify-between gap-4 flex-wrap mb-6">
          <div className="flex items-center gap-6">
            <div className="font-black hero-heading" style={{ fontSize: "clamp(2.5rem, 7vw, 100px)", lineHeight: 0.9 }}>
              {project.n}
            </div>
            <div className="flex flex-col">
              <span className="text-[#D7E2EA]/60 uppercase tracking-widest text-xs sm:text-sm">{project.category}</span>
              <span className="text-[#D7E2EA] font-medium uppercase" style={{ fontSize: "clamp(1rem, 2vw, 1.75rem)" }}>{project.name}</span>
            </div>
          </div>
          <LiveProjectButton />
        </div>
        <div className="flex gap-3 sm:gap-4">
          <div className="flex flex-col gap-3 sm:gap-4" style={{ flex: "0 0 40%" }}>
            <img src={project.col1a} alt="" loading="lazy" className="w-full object-cover rounded-[40px] sm:rounded-[50px] md:rounded-[60px]" style={{ height: "clamp(130px, 16vw, 230px)" }} />
            <img src={project.col1b} alt="" loading="lazy" className="w-full object-cover rounded-[40px] sm:rounded-[50px] md:rounded-[60px]" style={{ height: "clamp(160px, 22vw, 340px)" }} />
          </div>
          <div style={{ flex: "0 0 60%" }} className="ml-auto">
            <img src={project.col2} alt="" loading="lazy" className="w-full h-full object-cover rounded-[40px] sm:rounded-[50px] md:rounded-[60px]" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function ProjectsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <section
      ref={ref}
      className="rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 relative z-10 px-5 sm:px-8 md:px-10 py-20"
      style={{ background: "#0C0C0C", fontFamily: "'Kanit', sans-serif" }}
    >
      <h2
        className="hero-heading font-black uppercase leading-none tracking-tight text-center mb-16"
        style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
      >
        Project
      </h2>
      <div>
        {PROJECTS.map((p, i) => (
          <div key={p.n} className="h-[85vh]">
            <Card project={p} index={i} total={PROJECTS.length} progress={scrollYProgress} />
          </div>
        ))}
      </div>
    </section>
  );
}