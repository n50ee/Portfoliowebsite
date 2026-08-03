import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { PhotoSlider } from "./PhotoSlider";
import { SparkleButton } from "./SparkleButton";

export interface PhotoGroup {
  title: string;
  images: string[];
}

/**
 * Homepage photo section: the shuffled slider up top, plus an "Open
 * gallery" button that opens a full-screen view with every photo grouped
 * by project (Google Developer Groups Islamabad, Canva Community, etc.),
 * each photo still clickable to view full size.
 */
export function PhotoGallery({ groups }: { groups: PhotoGroup[] }) {
  const flatImages = groups.flatMap((g) => g.images);
  const [open, setOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        if (openIndex !== null) setOpenIndex(null);
        else setOpen(false);
      }
      if (openIndex !== null && flatImages.length > 0) {
        if (e.key === "ArrowLeft") setOpenIndex((i) => (i === null ? i : (i - 1 + flatImages.length) % flatImages.length));
        if (e.key === "ArrowRight") setOpenIndex((i) => (i === null ? i : (i + 1) % flatImages.length));
      }
    }
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [open, openIndex, flatImages.length]);

  if (flatImages.length === 0) return null;

  return (
    <>
      <PhotoSlider
        images={flatImages}
        footerLeft={<SparkleButton onClick={() => setOpen(true)}>Open gallery</SparkleButton>}
      />

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.2 }}
            className="fixed inset-0 z-[400] overflow-y-auto bg-ink-900/95 p-6 sm:p-10"
          >
            <div className="mx-auto max-w-[1600px]">
              <div className="mb-8 flex items-center justify-between">
                <h2 className="font-display text-heading-md font-semibold text-paper">All photos</h2>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-paper text-ink-900"
                  aria-label="Close gallery"
                >
                  ✕
                </button>
              </div>
              {groups.map((group, gi) => {
                const offset = groups.slice(0, gi).reduce((sum, g) => sum + g.images.length, 0);
                return (
                  <div key={group.title + gi} className="mb-12">
                    <h3 className="mb-4 font-display text-heading-sm font-semibold text-paper">{group.title}</h3>
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                      {group.images.map((url, i) => (
                        <button
                          key={url + i}
                          type="button"
                          onClick={() => setOpenIndex(offset + i)}
                          className="aspect-square overflow-hidden rounded-lg border border-paper/10"
                        >
                          <img src={url} alt="" className="h-full w-full object-cover" />
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {openIndex !== null && (
          <div className="fixed inset-0 z-[500] flex items-center justify-center p-4 sm:p-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reducedMotion ? 0 : 0.2 }}
              onClick={() => setOpenIndex(null)}
              className="fixed inset-0 bg-ink-900/90"
            />
            <motion.div
              key={openIndex}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: reducedMotion ? 0 : 0.25, ease: "easeOut" }}
              className="relative z-[510] max-h-full max-w-full"
            >
              <img
                src={flatImages[openIndex]}
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
              {flatImages.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      setOpenIndex((i) => (i === null ? i : (i - 1 + flatImages.length) % flatImages.length))
                    }
                    className="absolute left-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-paper/90 text-ink-900 shadow-lg"
                    aria-label="Previous photo"
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    onClick={() => setOpenIndex((i) => (i === null ? i : (i + 1) % flatImages.length))}
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
    </>
  );
}
