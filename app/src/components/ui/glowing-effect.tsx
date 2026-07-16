import { memo, useCallback, useEffect, useRef } from "react";
import type { CSSProperties } from "react";
import { cn } from "../../lib/utils";

interface GlowingEffectProps {
  blur?: number;
  inactiveZone?: number;
  proximity?: number;
  spread?: number;
  variant?: "default" | "white";
  glow?: boolean;
  className?: string;
  disabled?: boolean;
  movementDuration?: number;
  borderWidth?: number;
}

function easeOutQuint(t: number): number {
  return 1 - Math.pow(1 - t, 5);
}

/**
 * Mouse-proximity glowing border. Tracks the pointer (and scroll) and rotates
 * a conic-gradient mask around the element's border toward the cursor when
 * it's within `proximity` of the element's bounds. Client-only by nature
 * (listens on window/document) but SSR-safe: nothing touches those globals
 * until the mount effect runs.
 */
export const GlowingEffect = memo(function GlowingEffect({
  blur = 0,
  inactiveZone = 0.7,
  proximity = 0,
  spread = 20,
  variant = "default",
  glow = false,
  className,
  movementDuration = 2,
  borderWidth = 1,
  disabled = true,
}: GlowingEffectProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lastPosition = useRef({ x: 0, y: 0 });
  const moveRafRef = useRef(0);
  const animRafRef = useRef(0);

  const animateAngle = useCallback((from: number, to: number, duration: number) => {
    const el = containerRef.current;
    if (!el) return;
    if (animRafRef.current) cancelAnimationFrame(animRafRef.current);
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min((now - start) / 1000 / duration, 1);
      const value = from + (to - from) * easeOutQuint(t);
      el.style.setProperty("--start", String(value));
      if (t < 1) animRafRef.current = requestAnimationFrame(step);
    };
    animRafRef.current = requestAnimationFrame(step);
  }, []);

  const handleMove = useCallback(
    (e?: { x: number; y: number }) => {
      const element = containerRef.current;
      if (!element) return;
      if (moveRafRef.current) cancelAnimationFrame(moveRafRef.current);

      moveRafRef.current = requestAnimationFrame(() => {
        const { left, top, width, height } = element.getBoundingClientRect();
        const mouseX = e?.x ?? lastPosition.current.x;
        const mouseY = e?.y ?? lastPosition.current.y;
        if (e) lastPosition.current = { x: mouseX, y: mouseY };

        const center = [left + width * 0.5, top + height * 0.5];
        const distanceFromCenter = Math.hypot(mouseX - center[0], mouseY - center[1]);
        const inactiveRadius = 0.5 * Math.min(width, height) * inactiveZone;

        if (distanceFromCenter < inactiveRadius) {
          element.style.setProperty("--active", "0");
          return;
        }

        const isActive =
          mouseX > left - proximity &&
          mouseX < left + width + proximity &&
          mouseY > top - proximity &&
          mouseY < top + height + proximity;

        element.style.setProperty("--active", isActive ? "1" : "0");
        if (!isActive) return;

        const currentAngle = parseFloat(element.style.getPropertyValue("--start")) || 0;
        const targetAngle = (180 * Math.atan2(mouseY - center[1], mouseX - center[0])) / Math.PI + 90;
        const angleDiff = ((targetAngle - currentAngle + 180) % 360) - 180;
        animateAngle(currentAngle, currentAngle + angleDiff, movementDuration);
      });
    },
    [inactiveZone, proximity, movementDuration, animateAngle],
  );

  useEffect(() => {
    if (disabled) return;
    const handleScroll = () => handleMove();
    const handlePointerMove = (e: PointerEvent) => handleMove({ x: e.clientX, y: e.clientY });

    window.addEventListener("scroll", handleScroll, { passive: true });
    document.body.addEventListener("pointermove", handlePointerMove, { passive: true });

    return () => {
      if (moveRafRef.current) cancelAnimationFrame(moveRafRef.current);
      if (animRafRef.current) cancelAnimationFrame(animRafRef.current);
      window.removeEventListener("scroll", handleScroll);
      document.body.removeEventListener("pointermove", handlePointerMove);
    };
  }, [handleMove, disabled]);

  return (
    <>
      <div
        className={cn(
          "pointer-events-none absolute -inset-px hidden rounded-[inherit] border opacity-0 transition-opacity",
          glow && "opacity-100",
          variant === "white" && "border-white",
          disabled && "!block",
        )}
      />
      <div
        ref={containerRef}
        style={
          {
            "--blur": `${blur}px`,
            "--spread": spread,
            "--start": "0",
            "--active": "0",
            "--glowingeffect-border-width": `${borderWidth}px`,
            "--repeating-conic-gradient-times": "5",
            "--gradient":
              variant === "white"
                ? "repeating-conic-gradient(from 236.84deg at 50% 50%, var(--black), var(--black) calc(25% / var(--repeating-conic-gradient-times)))"
                : `radial-gradient(circle, #dd7bbb 10%, #dd7bbb00 20%),
                    radial-gradient(circle at 40% 40%, #d79f1e 5%, #d79f1e00 15%),
                    radial-gradient(circle at 60% 60%, #5a922c 10%, #5a922c00 20%),
                    radial-gradient(circle at 40% 60%, #4c7894 10%, #4c789400 20%),
                    repeating-conic-gradient(
                      from 236.84deg at 50% 50%,
                      #dd7bbb 0%,
                      #d79f1e calc(25% / var(--repeating-conic-gradient-times)),
                      #5a922c calc(50% / var(--repeating-conic-gradient-times)),
                      #4c7894 calc(75% / var(--repeating-conic-gradient-times)),
                      #dd7bbb calc(100% / var(--repeating-conic-gradient-times))
                    )`,
          } as CSSProperties
        }
        className={cn(
          "pointer-events-none absolute inset-0 rounded-[inherit] opacity-100 transition-opacity",
          glow && "opacity-100",
          blur > 0 && "blur-[var(--blur)]",
          className,
          disabled && "!hidden",
        )}
      >
        <div
          className={cn(
            "rounded-[inherit]",
            'after:absolute after:inset-[calc(-1*var(--glowingeffect-border-width))] after:rounded-[inherit] after:content-[""]',
            "after:[border:var(--glowingeffect-border-width)_solid_transparent]",
            "after:[background:var(--gradient)] after:[background-attachment:fixed]",
            "after:opacity-[var(--active)] after:transition-opacity after:duration-300",
            "after:[mask-clip:padding-box,border-box]",
            "after:[mask-composite:intersect]",
            "after:[mask-image:linear-gradient(#0000,#0000),conic-gradient(from_calc((var(--start)-var(--spread))*1deg),#00000000_0deg,#fff,#00000000_calc(var(--spread)*2deg))]",
          )}
        />
      </div>
    </>
  );
});
