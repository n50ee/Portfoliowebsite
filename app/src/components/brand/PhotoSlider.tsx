import { useEffect, useRef, useState } from "react";
import { cn } from "../../lib/utils";

/**
 * Homepage photo slider aggregating every project's hero + gallery images.
 * Native scroll-snap track (same pattern as the Selected work carousel) so
 * it stays a plain scroll container under the hood; auto-advances every
 * 4s, pausing on hover, and stops entirely if the browser prefers-reduced-motion.
 */
export function PhotoSlider({ images }: { images: string[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  function scrollToIndex(next: number) {
    const el = containerRef.current;
    if (!el) return;
    const clamped = (next + images.length) % images.length;
    const child = el.children[clamped] as HTMLElement | undefined;
    child?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    setIndex(clamped);
  }

  useEffect(() => {
    if (paused || images.length <= 1) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => scrollToIndex(index + 1), 4000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, paused, images.length]);

  if (images.length === 0) return null;

  return (
    <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div
        ref={containerRef}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {images.map((url, i) => (
          <div
            key={url + i}
            className="aspect-[4/3] w-[78%] shrink-0 snap-center overflow-hidden rounded-xl border border-line-soft sm:w-[46%] lg:w-[31%]"
          >
            <img src={url} alt="" className="h-full w-full object-cover" />
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div className="flex gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => scrollToIndex(i)}
              aria-label={`Go to photo ${i + 1}`}
              className={cn(
                "h-1.5 rounded-pill transition-all duration-150 ease-out",
                i === index ? "w-5 bg-signature-500" : "w-1.5 bg-line",
              )}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => scrollToIndex(index - 1)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-paper text-ink-700 transition-colors duration-150 ease-out"
            aria-label="Previous photo"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => scrollToIndex(index + 1)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-paper text-ink-700 transition-colors duration-150 ease-out"
            aria-label="Next photo"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}
