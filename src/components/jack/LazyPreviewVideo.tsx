import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";

type LazyPreviewVideoProps = {
  src: string;
  width?: number;
  height?: number;
};

export function LazyPreviewVideo({ src, width = 420, height = 270 }: LazyPreviewVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(containerRef, { margin: "300px 0px", amount: 0.01 });

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
    <div
      ref={containerRef}
      className="flex-shrink-0 overflow-hidden rounded-2xl bg-[#141414]"
      style={{ width, height }}
    >
      <video
        ref={videoRef}
        src={src}
        muted
        loop
        playsInline
        preload="metadata"
        className="h-full w-full object-cover"
        width={width}
        height={height}
      />
    </div>
  );
}
