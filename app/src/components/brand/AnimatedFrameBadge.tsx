import type { ReactNode } from "react";

/**
 * Highlighted label with a dashed corner-frame that draws in and dots that
 * fly to the corners on hover, adapted from a Uiverse.io button (kept in
 * its original neon palette on purpose, same reasoning as the Hire Me card
 * and sun icon: recoloring would break the hover "pop" the design relies on).
 */
export function AnimatedFrameBadge({ children }: { children: ReactNode }) {
  return (
    <div className="frame-badge-wrapper">
      <div className="frame-line horizontal top" />
      <div className="frame-line vertical right" />
      <div className="frame-line horizontal bottom" />
      <div className="frame-line vertical left" />

      <div className="frame-dot top left" />
      <div className="frame-dot top right" />
      <div className="frame-dot bottom right" />
      <div className="frame-dot bottom left" />

      <div className="frame-badge">
        <span className="frame-badge-text">{children}</span>
      </div>
    </div>
  );
}
