import { useEffect, useRef } from "react";
import { useLazyInView } from "@/hooks/use-lazy-in-view";

type LazyPreviewVideoProps = {
  src: string;
  width?: number;
  height?: number;
};

export function LazyPreviewVideo({ src, width = 420, height = 270 }: LazyPreviewVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { ref, inView } = useLazyInView<HTMLDivElement>({
    rootMargin: "350px 0px",
    unloadWhenHidden: true,
  });

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !inView) return;
    video.play().catch(() => {});
    return () => {
      video.pause();
    };
  }, [inView, src]);

  return (
    <div
      ref={ref}
      className="flex-shrink-0 overflow-hidden rounded-2xl bg-[#141414]"
      style={{ width, height }}
    >
      {inView ? (
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
      ) : null}
    </div>
  );
}
