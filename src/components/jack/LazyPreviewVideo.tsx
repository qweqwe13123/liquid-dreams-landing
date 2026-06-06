import { useRef } from "react";
import { useAutoplayVideo } from "@/hooks/use-autoplay-video";
import { useLazyInView } from "@/hooks/use-lazy-in-view";

type LazyPreviewVideoProps = {
  src: string;
  width?: number;
  height?: number;
};

export function LazyPreviewVideo({ src, width = 420, height = 270 }: LazyPreviewVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { ref: containerRef, inView: shouldLoad } = useLazyInView<HTMLDivElement>({
    rootMargin: "200px 0px",
    unloadWhenHidden: true,
  });
  const { shouldPlay } = useAutoplayVideo(containerRef, videoRef, {
    rootMargin: "120px 0px",
    amount: 0.15,
    enabled: shouldLoad,
  });

  return (
    <div
      ref={containerRef}
      className="h-[calc(min(72vw,300px)*0.643)] w-[min(72vw,300px)] flex-shrink-0 overflow-hidden rounded-2xl bg-[#141414] lg:h-[270px] lg:w-[420px]"
      style={{ width: undefined, height: undefined }}
    >
      <video
        ref={videoRef}
        src={shouldLoad ? src : undefined}
        muted
        loop
        autoPlay
        playsInline
        preload={shouldPlay ? "metadata" : "none"}
        className="h-full w-full object-cover"
        width={width}
        height={height}
      />
    </div>
  );
}
