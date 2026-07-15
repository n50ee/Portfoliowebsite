import type { HTMLAttributes } from "react";
import { clsx } from "clsx";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  padding?: "md" | "lg";
  raised?: boolean;
}

/** Quiet content container. No shadow by default; the border does the work. */
export function Card({ padding = "lg", raised = false, className, children, ...props }: CardProps) {
  return (
    <div
      className={clsx(
        "rounded-lg border border-line-soft",
        padding === "lg" ? "p-8" : "p-6",
        raised ? "bg-paper-raised shadow-sm" : "bg-paper",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
