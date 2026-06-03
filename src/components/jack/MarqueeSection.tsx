import { useEffect, useRef } from "react";
import { LazyPreviewVideo } from "./LazyPreviewVideo";

import heroSpaceVoyage from "@/assets/gif/hero-space-voyage-preview-eECLH3Yc.mp4";
import heroCodenest from "@/assets/gif/hero-codenest-preview-Cgppc2qV.mp4";
import heroVexVentures from "@/assets/gif/hero-vex-ventures-preview-BczMFIiw.mp4";
import heroStellarAiV2 from "@/assets/gif/hero-stellar-ai-v2-preview-DjvxjG3C.mp4";
import heroStellarAi from "@/assets/gif/hero-stellar-ai-preview-D3HL6bw1.mp4";
import heroXportfolio from "@/assets/gif/hero-xportfolio-preview-D4A8maiC.mp4";
import heroOrbitWeb3 from "@/assets/gif/hero-orbit-web3-preview-BXt4OttD.mp4";
import heroNexora from "@/assets/gif/hero-nexora-preview-cx5HmUgo.mp4";
import heroEvrVentures from "@/assets/gif/hero-evr-ventures-preview-DZxeVFEX.mp4";
import heroPortal from "@/assets/gif/hero-portal-preview-DEscBr2T.mp4";

const PREVIEWS = [
  heroSpaceVoyage,
  heroCodenest,
  heroVexVentures,
  heroStellarAiV2,
  heroStellarAi,
  heroXportfolio,
  heroOrbitWeb3,
  heroNexora,
  heroEvrVentures,
  heroPortal,
];

const ROW1 = PREVIEWS.slice(0, 5);
const ROW2 = PREVIEWS.slice(5);

function Row({ items }: { items: string[] }) {
  const doubled = [...items, ...items];
  return (
    <div className="flex gap-3">
      {doubled.map((src, i) => (
        <LazyPreviewVideo key={`${src}-${i}`} src={src} />
      ))}
    </div>
  );
}

export function MarqueeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const rafRef = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = 0;
        const el = sectionRef.current;
        if (!el) return;
        const sectionTop = el.getBoundingClientRect().top + window.scrollY;
        const offset = (window.scrollY - sectionTop + window.innerHeight) * 0.3;
        const v = offset - 200;
        if (row1Ref.current) row1Ref.current.style.transform = `translate3d(${v}px,0,0)`;
        if (row2Ref.current) row2Ref.current.style.transform = `translate3d(${-v}px,0,0)`;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="overflow-hidden pt-24 pb-10 sm:pt-32 md:pt-40"
      style={{ background: "#0C0C0C", fontFamily: "'Kanit', sans-serif" }}
    >
      <div className="flex flex-col gap-3">
        <div ref={row1Ref} className="will-change-transform">
          <Row items={ROW1} />
        </div>
        <div ref={row2Ref} className="will-change-transform">
          <Row items={ROW2} />
        </div>
      </div>
    </section>
  );
}
