import { useEffect } from "react";

const DESKTOP_MIN = 1024;

function playMutedVideos() {
  document.querySelectorAll("video").forEach((video) => {
    if (!video.muted) return;
    video.muted = true;
    video.playsInline = true;
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");
    void video.play().catch(() => {});
  });
}

/** iOS often blocks autoplay until first user gesture — unlock all muted videos once. */
export function useGlobalVideoUnlock() {
  useEffect(() => {
    if (typeof window === "undefined" || window.innerWidth >= DESKTOP_MIN) return;

    const unlock = () => playMutedVideos();

    const retryDelays = [0, 100, 300, 700, 1500, 3000];
    const timers = retryDelays.map((ms) => window.setTimeout(unlock, ms));

    const onVisible = () => {
      if (document.visibilityState === "visible") unlock();
    };

    document.addEventListener("touchstart", unlock, { once: true, passive: true });
    document.addEventListener("click", unlock, { once: true });
    document.addEventListener("visibilitychange", onVisible);
    window.addEventListener("pageshow", unlock);

    return () => {
      timers.forEach((id) => window.clearTimeout(id));
      document.removeEventListener("touchstart", unlock);
      document.removeEventListener("click", unlock);
      document.removeEventListener("visibilitychange", onVisible);
      window.removeEventListener("pageshow", unlock);
    };
  }, []);
}
