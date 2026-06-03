import { useEffect, useRef } from "react";

import heroSpaceVoyage from "@/assets/gif/hero-space-voyage-preview-eECLH3Yc.gif";
import heroCodenest from "@/assets/gif/hero-codenest-preview-Cgppc2qV.gif";
import heroVexVentures from "@/assets/gif/hero-vex-ventures-preview-BczMFIiw.gif";
import heroStellarAiV2 from "@/assets/gif/hero-stellar-ai-v2-preview-DjvxjG3C.gif";
import heroStellarAi from "@/assets/gif/hero-stellar-ai-preview-D3HL6bw1.gif";
import heroXportfolio from "@/assets/gif/hero-xportfolio-preview-D4A8maiC.gif";
import heroOrbitWeb3 from "@/assets/gif/hero-orbit-web3-preview-BXt4OttD.gif";
import heroNexora from "@/assets/gif/hero-nexora-preview-cx5HmUgo.gif";
import heroEvrVentures from "@/assets/gif/hero-evr-ventures-preview-DZxeVFEX.gif";
import heroPortal from "@/assets/gif/hero-portal-preview-DEscBr2T.gif";

const IMAGES = [
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

const ROW1 = IMAGES.slice(0, 5);
const ROW2 = IMAGES.slice(5);

function Row({ items, direction }: { items: string[]; direction: 1 | -1 }) {
  const tripled = [...items, ...items, ...items];
  return (
    <div className="flex gap-3">
      {tripled.map((src, i) => (
        <img
          key={i}
          src={src}
          loading="lazy"
          alt=""
          className="rounded-2xl object-cover flex-shrink-0"
          style={{ width: 420, height: 270 }}
        />
      ))}
    </div>
  );
  void direction;
}

export function MarqueeSection() {
  const ref = useRef<HTMLDivElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const sectionTop = el.getBoundingClientRect().top + window.scrollY;
      const offset = (window.scrollY - sectionTop + window.innerHeight) * 0.3;
      const v = offset - 200;
      if (row1Ref.current) row1Ref.current.style.transform = `translateX(${v}px)`;
      if (row2Ref.current) row2Ref.current.style.transform = `translateX(${-v}px)`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      ref={ref}
      className="pt-24 sm:pt-32 md:pt-40 pb-10 overflow-hidden"
      style={{ background: "#0C0C0C", fontFamily: "'Kanit', sans-serif" }}
    >
      <div className="flex flex-col gap-3">
        <div ref={row1Ref} style={{ willChange: "transform" }}>
          <Row items={ROW1} direction={1} />
        </div>
        <div ref={row2Ref} style={{ willChange: "transform" }}>
          <Row items={ROW2} direction={-1} />
        </div>
      </div>
    </section>
  );
}
