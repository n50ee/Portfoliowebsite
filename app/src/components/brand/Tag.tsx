import type { HTMLAttributes } from "react";
import { clsx } from "clsx";

/** Outlined skill/tool chip (e.g. "Figma", "React"). Quiet, no fill. */
export function Tag({ className, children, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-pill border border-line px-3 py-1 font-body text-caption font-medium text-ink-500",
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
