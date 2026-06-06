import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";

interface ProjectVideoFrameProps {
  src: string;
  className?: string;
  style?: React.CSSProperties;
  objectPosition?: string;
  delay?: number;
}

export function ProjectVideoFrame({
  src,
  className = "",
  style,
  objectPosition = "center",
  delay = 0,
}: ProjectVideoFrameProps) {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(ref, { amount: 0.35, margin: "-40px" });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (isInView) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [isInView]);

  return (
    <motion.div
      ref={ref}
      className={`group relative overflow-hidden rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border border-[#D7E2EA]/20 bg-[#111] ${className}`}
      style={style}
      initial={{ opacity: 0, y: 48, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px", amount: 0.2 }}
      transition={{ delay, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.02, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } }}
    >
      <div className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute inset-0 bg-gradient-to-t from-[#D7E2EA]/10 via-transparent to-[#D7E2EA]/5" />
        <div className="absolute inset-0 ring-1 ring-inset ring-[#D7E2EA]/30 rounded-[inherit]" />
      </div>
      <video
        ref={videoRef}
        src={src}
        muted
        loop
        playsInline
        preload="metadata"
        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        style={{ objectPosition }}
      />
    </motion.div>
  );
}
