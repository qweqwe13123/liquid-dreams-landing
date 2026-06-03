import { useRef } from "react";
import { useAutoplayVideo } from "@/hooks/use-autoplay-video";

type LazyPreviewVideoProps = {
  src: string;
  width?: number;
  height?: number;
};

export function LazyPreviewVideo({ src, width = 420, height = 270 }: LazyPreviewVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  useAutoplayVideo(containerRef, videoRef, { rootMargin: "120px 0px", amount: 0.15 });

  return (
    <div
      ref={containerRef}
      className="h-[calc(min(72vw,300px)*0.643)] w-[min(72vw,300px)] flex-shrink-0 overflow-hidden rounded-2xl bg-[#141414] lg:h-[270px] lg:w-[420px]"
      style={{ width: undefined, height: undefined }}
    >
      <video
        ref={videoRef}
        src={src}
        muted
        loop
        autoPlay
        playsInline
        preload="auto"
        className="h-full w-full object-cover"
        width={width}
        height={height}
      />
    </div>
  );
}
