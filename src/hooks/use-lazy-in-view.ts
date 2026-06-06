import { useEffect, useRef, useState } from "react";

type Options = {
  rootMargin?: string;
  threshold?: number;
  /** Unload when leaving viewport to free memory (useful for GIF/video). */
  unloadWhenHidden?: boolean;
};

export function useLazyInView<T extends Element = HTMLDivElement>({
  rootMargin = "300px 0px",
  threshold = 0,
  unloadWhenHidden = false,
}: Options = {}) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        } else if (unloadWhenHidden) {
          setInView(false);
        }
      },
      { rootMargin, threshold },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin, threshold, unloadWhenHidden]);

  return { ref, inView };
}
