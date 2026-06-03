import { useLazyInView } from "@/hooks/use-lazy-in-view";

type LazyGifProps = {
  src: string;
  className?: string;
  width?: number;
  height?: number;
};

export function LazyGif({ src, className, width = 420, height = 270 }: LazyGifProps) {
  const { ref, inView } = useLazyInView<HTMLDivElement>({
    rootMargin: "400px 0px",
    unloadWhenHidden: true,
  });

  return (
    <div
      ref={ref}
      className={`flex-shrink-0 overflow-hidden rounded-2xl bg-[#141414] ${className ?? ""}`}
      style={{ width, height }}
    >
      {inView ? (
        <img
          src={src}
          alt=""
          decoding="async"
          loading="lazy"
          className="h-full w-full object-cover"
          width={width}
          height={height}
        />
      ) : null}
    </div>
  );
}
