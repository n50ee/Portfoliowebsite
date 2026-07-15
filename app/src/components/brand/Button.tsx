import type { ButtonHTMLAttributes } from "react";
import { clsx } from "clsx";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "sm";

const base =
  "inline-flex items-center justify-center gap-2 rounded-md border font-body font-semibold transition-colors duration-150 ease-out disabled:cursor-not-allowed disabled:opacity-40 no-underline";

const sizes: Record<Size, string> = {
  md: "px-[22px] py-3 text-body-sm",
  sm: "px-4 py-2 text-caption",
};

const variants: Record<Variant, string> = {
  primary: "bg-signature-500 border-signature-500 text-[#fff8f4] hover:bg-signature-600 hover:border-signature-600",
  secondary: "bg-transparent border-ink-900 text-ink-900 hover:bg-paper-sunken",
  ghost: "bg-transparent border-transparent text-ink-700 hover:bg-paper-sunken",
};

/** Shared class string so <Link> (nav CTAs) can render this exact style. */
export function buttonClasses(variant: Variant = "primary", size: Size = "md", className?: string) {
  return clsx(base, sizes[size], variants[variant], className);
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

export function Button({ variant = "primary", size = "md", className, ...props }: ButtonProps) {
  return <button className={buttonClasses(variant, size, className)} {...props} />;
}
