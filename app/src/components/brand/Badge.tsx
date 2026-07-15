import type { HTMLAttributes } from "react";
import { clsx } from "clsx";

type Tone = "neutral" | "success" | "warning" | "critical" | "accent";

const tones: Record<Tone, string> = {
  neutral: "bg-paper-sunken text-ink-700",
  success: "bg-success-bg text-success-fg",
  warning: "bg-warning-bg text-warning-fg",
  critical: "bg-critical-bg text-critical-fg",
  accent: "bg-signature-100 text-signature-600",
};

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: Tone;
}

/** Small status/semantic label. Flat, no border, quiet caps. */
export function Badge({ tone = "neutral", className, children, ...props }: BadgeProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center whitespace-nowrap rounded-pill px-2.5 py-[3px] font-body text-caption font-semibold",
        tones[tone],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
