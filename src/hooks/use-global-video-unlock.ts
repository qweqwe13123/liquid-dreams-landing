import { useEffect } from "react";

const DESKTOP_MIN = 1024;

/** iOS often blocks autoplay until first user gesture — unlock all muted videos once. */
export function useGlobalVideoUnlock() {
  useEffect(() => {
    const unlock = () => {
      if (window.innerWidth >= DESKTOP_MIN) return;
      document.querySelectorAll("video").forEach((video) => {
        if (!video.muted) return;
        void video.play().catch(() => {});
      });
    };

    document.addEventListener("touchstart", unlock, { once: true, passive: true });
    document.addEventListener("click", unlock, { once: true });
    return () => {
      document.removeEventListener("touchstart", unlock);
      document.removeEventListener("click", unlock);
    };
  }, []);
}
