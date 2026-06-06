import { useEffect, useRef } from "react";
import { CtaButtons } from "./CtaButtons";
import { LazyPreviewVideo } from "./LazyPreviewVideo";
import { SHORT_VIDEOS } from "@/lib/public-media";

const ROW1 = SHORT_VIDEOS.slice(0, 5);
const ROW2 = SHORT_VIDEOS.slice(5);

function Row({ items }: { items: readonly string[] }) {
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
      className="overflow-hidden pt-16 pb-8 max-lg:overflow-x-hidden sm:pt-32 md:pt-40 lg:pt-24 lg:pb-10"
      style={{ background: "#070B26", fontFamily: "'Kanit', sans-serif" }}
    >
      <div className="max-w-[1600px] px-4 pb-8 sm:px-6 md:px-12 md:pb-16 lg:px-16 lg:pb-20">
        <h2
          className="max-w-4xl font-normal leading-[1.2] tracking-[-0.02em] text-[#D7DBE8]/95 max-lg:text-xl max-lg:sm:text-2xl lg:text-[clamp(1.5rem,3.8vw,3.25rem)] lg:leading-[1.12]"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 400,
          }}
        >
          Explore next-gen 3D Websites and Regular Websites made in Solver Company.
        </h2>
        <CtaButtons className="mt-8 sm:mt-10" />
      </div>
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
