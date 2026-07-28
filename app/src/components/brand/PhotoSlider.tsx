import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

function shuffled(input: string[]): string[] {
  const arr = [...input];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Homepage photo slider aggregating every project's hero + gallery images,
 * shuffled once on mount so the mix isn't grouped by project (shows the
 * range of work rather than one project's photos in a row). Native
 * scroll-snap track (same pattern as the Selected work carousel) so it
 * stays a plain scroll container under the hood; auto-advances, pausing on
 * hover, and stops entirely if the browser prefers-reduced-motion. Clicking
 * a photo opens it full-size in a lightbox.
 */
export function PhotoSlider({ images: sourceImages, footerLeft }: { images: string[]; footerLeft?: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  // Render server/client in the same deterministic order first (avoids a
  // hydration mismatch, which was desyncing click handlers from the photos
  // actually shown), then shuffle client-side only, once mounted.
  const [images, setImages] = useState(sourceImages);
  useEffect(() => {
    setImages(shuffled(sourceImages));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const reducedMotion = useReducedMotion();

  function scrollToIndex(next: number) {
    const el = containerRef.current;
    if (!el) return;
    const clamped = (next + images.length) % images.length;
    const child = el.children[clamped] as HTMLElement | undefined;
    if (child) {
      // Scroll only this container's own scrollLeft, centering the child.
      // scrollIntoView() would also nudge the page's vertical scroll to
      // keep the element in view, fighting the user's own scrolling.
      const target = child.offsetLeft - (el.clientWidth - child.clientWidth) / 2;
      el.scrollTo({ left: target, behavior: "smooth" });
    }
    setIndex(clamped);
  }

  useEffect(() => {
    if (paused || openIndex !== null || reducedMotion || images.length <= 1) return;
    const id = setInterval(() => scrollToIndex(index + 1), 2200);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, paused, openIndex, reducedMotion, images.length]);

  function handleMouseEnter() {
    setPaused(true);
    // Freeze the track immediately: a smooth scroll already in flight from
    // the last autoplay tick would otherwise keep sliding for a moment,
    // so a click can land on a photo mid-transition.
    containerRef.current?.scrollTo({ left: containerRef.current.scrollLeft, behavior: "auto" });
  }

  useEffect(() => {
    if (openIndex === null) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpenIndex(null);
      if (e.key === "ArrowLeft") setOpenIndex((i) => (i === null ? i : (i - 1 + images.length) % images.length));
      if (e.key === "ArrowRight") setOpenIndex((i) => (i === null ? i : (i + 1) % images.length));
    }
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [openIndex, images.length]);

  if (images.length === 0) return null;

  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={() => setPaused(false)}>
      <div
        ref={containerRef}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {images.map((url, i) => (
          <motion.button
            key={url + i}
            type="button"
            onClick={() => setOpenIndex(i)}
            animate={{ scale: i === index ? 1 : 0.93, opacity: i === index ? 1 : 0.65 }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: reducedMotion ? 0 : 0.22, ease: "easeOut" }}
            className="aspect-[4/3] w-[78%] shrink-0 snap-center overflow-hidden rounded-xl border border-line-soft sm:w-[46%] lg:w-[31%]"
            aria-label={`Open photo ${i + 1} full size`}
          >
            <img src={url} alt="" className="h-full w-full object-cover" />
          </motion.button>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between gap-2">
        <div>{footerLeft}</div>
        <div className="flex items-center gap-2">
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

      <AnimatePresence>
        {openIndex !== null && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 sm:p-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reducedMotion ? 0 : 0.2 }}
              onClick={() => setOpenIndex(null)}
              className="fixed inset-0 bg-ink-900/85"
            />
            <motion.div
              key={openIndex}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: reducedMotion ? 0 : 0.25, ease: "easeOut" }}
              className="relative z-[310] max-h-full max-w-full"
            >
              <img
                src={images[openIndex]}
                alt=""
                className="max-h-[85vh] max-w-[92vw] rounded-xl object-contain shadow-lg"
              />
              <button
                type="button"
                onClick={() => setOpenIndex(null)}
                className="absolute -right-3 -top-3 flex h-9 w-9 items-center justify-center rounded-full bg-paper text-ink-900 shadow-lg"
                aria-label="Close"
              >
                ✕
              </button>
              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => setOpenIndex((i) => (i === null ? i : (i - 1 + images.length) % images.length))}
                    className="absolute left-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-paper/90 text-ink-900 shadow-lg"
                    aria-label="Previous photo"
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    onClick={() => setOpenIndex((i) => (i === null ? i : (i + 1) % images.length))}
                    className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-paper/90 text-ink-900 shadow-lg"
                    aria-label="Next photo"
                  >
                    →
                  </button>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
