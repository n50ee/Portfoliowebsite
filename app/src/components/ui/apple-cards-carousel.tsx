import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "../../lib/utils";

export interface CarouselCard {
  category: string;
  title: string;
  src: string | null;
  tint?: string;
  accent?: string;
  content: ReactNode;
}

interface CarouselContextValue {
  onCardClose: (index: number) => void;
  hoveredIndex: number | null;
  setHoveredIndex: (index: number | null) => void;
}

const CarouselContext = createContext<CarouselContextValue>({
  onCardClose: () => {},
  hoveredIndex: null,
  setHoveredIndex: () => {},
});

const CARD_WIDTH = 288;
const CARD_GAP = 16;

export function Carousel({ items }: { items: ReactNode[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const checkScrollability = () => {
    const el = containerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  };

  useEffect(() => {
    checkScrollability();
  }, [items.length]);

  const scrollBy = (direction: "left" | "right") => {
    containerRef.current?.scrollBy({
      left: direction === "left" ? -(CARD_WIDTH + CARD_GAP) : CARD_WIDTH + CARD_GAP,
      behavior: "smooth",
    });
  };

  const onCardClose = (index: number) => {
    const el = containerRef.current;
    if (!el) return;
    el.scrollTo({ left: (CARD_WIDTH + CARD_GAP) * index, behavior: "smooth" });
  };

  return (
    <CarouselContext.Provider value={{ onCardClose, hoveredIndex, setHoveredIndex }}>
      <div className="relative w-full">
        <div
          ref={containerRef}
          onScroll={checkScrollability}
          className="flex w-full gap-4 overflow-x-auto scroll-smooth py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {items.map((item, index) => (
            <motion.div
              key={`carousel-item-${index}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.08 * index, ease: "easeOut" }}
              className="shrink-0"
            >
              {item}
            </motion.div>
          ))}
        </div>
        <div className="mt-4 flex justify-end gap-2">
          <button
            type="button"
            onClick={() => scrollBy("left")}
            disabled={!canScrollLeft}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-paper text-ink-700 transition-colors duration-150 ease-out disabled:opacity-40"
            aria-label="Scroll left"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => scrollBy("right")}
            disabled={!canScrollRight}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-paper text-ink-700 transition-colors duration-150 ease-out disabled:opacity-40"
            aria-label="Scroll right"
          >
            →
          </button>
        </div>
      </div>
    </CarouselContext.Provider>
  );
}

export function Card({ card, index }: { card: CarouselCard; index: number }) {
  const [open, setOpen] = useState(false);
  const { onCardClose, hoveredIndex, setHoveredIndex } = useContext(CarouselContext);
  const dimmed = hoveredIndex !== null && hoveredIndex !== index;

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") handleClose();
    }
    if (open) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKey);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  function handleClose() {
    setOpen(false);
    onCardClose(index);
  }

  const layoutId = `apple-card-${card.title}`;

  return (
    <>
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-[300] overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="fixed inset-0 bg-ink-900/70"
            />
            <motion.div
              layoutId={layoutId}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative z-[310] mx-auto my-10 w-[92%] max-w-2xl rounded-2xl border border-line-soft bg-paper p-6 shadow-lg sm:p-10"
            >
              <button
                type="button"
                onClick={handleClose}
                className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-paper-sunken text-ink-700"
                aria-label="Close"
              >
                ✕
              </button>
              <span
                className="text-caption font-semibold uppercase tracking-eyebrow"
                style={{ color: card.accent }}
              >
                {card.category}
              </span>
              <h2 className="mb-5 mt-1 font-display text-heading-md font-semibold text-ink-900">{card.title}</h2>
              {card.content}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <motion.button
        type="button"
        layoutId={layoutId}
        onClick={() => setOpen(true)}
        onMouseEnter={() => setHoveredIndex(index)}
        onMouseLeave={() => setHoveredIndex(null)}
        className={cn(
          "relative flex h-72 w-64 shrink-0 flex-col justify-end overflow-hidden rounded-2xl border border-line-soft text-left transition-[opacity,filter] duration-300 ease-out sm:h-80 sm:w-72",
          dimmed && "opacity-50 blur-[1px]",
        )}
        style={{ background: card.src ? undefined : card.tint }}
      >
        {card.src && <img src={card.src} alt="" className="absolute inset-0 h-full w-full object-cover" />}
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-ink-900/85 to-transparent" />
        <div className="relative p-5">
          <span className="block text-caption font-semibold uppercase tracking-eyebrow text-paper/80">
            {card.category}
          </span>
          <h3 className="mt-1 font-display text-heading-sm font-semibold text-paper">{card.title}</h3>
        </div>
      </motion.button>
    </>
  );
}
