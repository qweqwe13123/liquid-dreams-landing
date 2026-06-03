import { useCallback, useEffect, type RefObject } from "react";
import { useInView } from "framer-motion";

type Options = {
  enabled?: boolean;
  rootMargin?: string;
  amount?: number;
};

export function useAutoplayVideo(
  containerRef: RefObject<HTMLElement | null>,
  videoRef: RefObject<HTMLVideoElement | null>,
  { enabled = true, rootMargin = "80px 0px", amount = 0.2 }: Options = {},
) {
  const isInView = useInView(containerRef, {
    margin: rootMargin,
    amount,
  });

  const tryPlay = useCallback(() => {
    const video = videoRef.current;
    if (!video || !enabled) return;
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");
    void video.play().catch(() => {});
  }, [enabled, videoRef]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !enabled) return;

    if (!isInView) {
      video.pause();
      return;
    }

    tryPlay();

    const onReady = () => tryPlay();
    video.addEventListener("canplay", onReady);
    video.addEventListener("loadeddata", onReady);

    return () => {
      video.removeEventListener("canplay", onReady);
      video.removeEventListener("loadeddata", onReady);
    };
  }, [isInView, enabled, tryPlay, videoRef]);

  return { isInView, tryPlay };
}
