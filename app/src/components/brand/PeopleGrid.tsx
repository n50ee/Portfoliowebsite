import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { cn } from "../../lib/utils";
import { personPhotoStyle } from "../../lib/person-photo";
import type { PersonEntry } from "../../lib/types";

function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

const PLACEHOLDER_TINTS = ["bg-signature-100 text-signature-600", "bg-paper-sunken text-ink-700"];

/** Pixels per frame the strip drifts on its own. */
const DRIFT = 0.4;

/**
 * Row of photo cards, one per person, that drifts on its own but can also be
 * dragged or stepped with the arrow buttons. The list is rendered twice so
 * the loop is seamless: once the scroll passes the halfway mark it is pulled
 * back by exactly one set-width, which is invisible because the same cards
 * are under the viewport either way. Falls back to an initials tile when a
 * person has no photo yet.
 */
export function PeopleGrid({ people }: { people: PersonEntry[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const draggingRef = useRef(false);
  const programmaticRef = useRef(false);
  const [dragging, setDragging] = useState(false);
  const reducedMotion = useReducedMotion();
  const looping = people.length > 1;

  // Self-drift. Skipped entirely for reduced-motion or a single card.
  useEffect(() => {
    if (reducedMotion || !looping) return;
    let raf = 0;
    const step = () => {
      const el = scrollRef.current;
      if (el && !pausedRef.current && !draggingRef.current && !programmaticRef.current) {
        el.scrollLeft += DRIFT;
        const half = el.scrollWidth / 2;
        if (half > 0 && el.scrollLeft >= half) el.scrollLeft -= half;
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [reducedMotion, looping]);

  // Wrap a manual scroll (drag, trackpad, arrow keys) back into range.
  function handleScroll() {
    const el = scrollRef.current;
    if (!el || !looping || programmaticRef.current) return;
    const half = el.scrollWidth / 2;
    if (half > 0 && el.scrollLeft >= half) el.scrollLeft -= half;
  }

  function step(direction: 1 | -1) {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-person-card]");
    const amount = card ? card.offsetWidth + 16 : 236;
    const half = el.scrollWidth / 2;

    // Going back from the very start would hit the hard 0 edge, so hop
    // forward one full set first and scroll back from there instead.
    if (looping && direction === -1 && el.scrollLeft < amount && half > 0) {
      el.scrollLeft += half;
    }

    // Let the smooth scroll finish before drift or wrapping touch scrollLeft.
    programmaticRef.current = true;
    el.scrollBy({ left: direction * amount, behavior: "smooth" });
    window.setTimeout(() => {
      programmaticRef.current = false;
      handleScroll();
    }, 450);
  }

  function handlePointerDown(e: React.PointerEvent<HTMLDivElement>) {
    // Touch and pen already pan natively; only mouse needs drag-to-scroll.
    if (e.pointerType !== "mouse") return;
    const el = scrollRef.current;
    if (!el) return;
    draggingRef.current = true;
    setDragging(true);
    const startX = e.clientX;
    const startScroll = el.scrollLeft;
    el.setPointerCapture(e.pointerId);

    const onMove = (ev: PointerEvent) => {
      if (!draggingRef.current) return;
      el.scrollLeft = startScroll - (ev.clientX - startX);
    };
    const onUp = () => {
      draggingRef.current = false;
      setDragging(false);
      el.releasePointerCapture?.(e.pointerId);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onUp);
      handleScroll();
    };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onUp);
  }

  if (people.length === 0) return null;

  const loop = looping ? [...people, ...people] : people;

  return (
    <div>
      {looping && (
        <div className="mb-3 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={() => step(-1)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-paper text-ink-700 transition-colors duration-150 ease-out hover:text-ink-900"
            aria-label="Scroll to previous people"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => step(1)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-paper text-ink-700 transition-colors duration-150 ease-out hover:text-ink-900"
            aria-label="Scroll to more people"
          >
            →
          </button>
        </div>
      )}
      <div
        ref={scrollRef}
        className={cn("people-scroll", dragging && "is-dragging")}
        onScroll={handleScroll}
        onPointerDown={handlePointerDown}
        onMouseEnter={() => (pausedRef.current = true)}
        onMouseLeave={() => (pausedRef.current = false)}
      >
        <div className="people-track">
          {loop.map((person, i) => (
            <div key={person.name + i} data-person-card className="w-[190px] shrink-0 sm:w-[220px]">
              <div className="mb-3 aspect-[4/5] overflow-hidden rounded-xl border border-line-soft">
                {person.photoUrl ? (
                  <img
                    src={person.photoUrl}
                    alt=""
                    draggable={false}
                    className="h-full w-full"
                    style={personPhotoStyle(person)}
                  />
                ) : (
                  <div
                    className={cn(
                      "flex h-full w-full items-center justify-center font-display text-heading-md font-semibold",
                      PLACEHOLDER_TINTS[i % PLACEHOLDER_TINTS.length],
                    )}
                  >
                    {initials(person.name)}
                  </div>
                )}
              </div>
              <span className="block font-body text-body-sm font-semibold text-ink-900">{person.name}</span>
              {person.role && <span className="block font-body text-caption text-signature-500">{person.role}</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
