import { forwardRef, type InputHTMLAttributes, type TextareaHTMLAttributes } from "react";
import { clsx } from "clsx";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

/** Single-line text field: label above, error below, never placeholder-as-label. */
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, error, className, id, ...props },
  ref,
) {
  return (
    <label className="flex flex-col gap-1.5 font-body">
      {label && <span className="text-body-sm font-semibold text-ink-900">{label}</span>}
      <input
        ref={ref}
        id={id}
        className={clsx(
          "h-11 rounded-md border bg-paper-sunken px-3.5 font-body text-body text-ink-900 outline-none placeholder:text-ink-300",
          "focus-visible:ring-2 focus-visible:ring-signature-500/40",
          error ? "border-critical" : "border-line",
          className,
        )}
        {...props}
      />
      {error && <span className="text-caption text-critical">{error}</span>}
    </label>
  );
});

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

/** Multi-line field, same visual language as Input. */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { label, error, className, rows = 5, id, ...props },
  ref,
) {
  return (
    <label className="flex flex-col gap-1.5 font-body">
      {label && <span className="text-body-sm font-semibold text-ink-900">{label}</span>}
      <textarea
        ref={ref}
        id={id}
        rows={rows}
        className={clsx(
          "resize-y rounded-md border bg-paper-sunken px-3.5 py-3 font-body text-body text-ink-900 outline-none placeholder:text-ink-300",
          "focus-visible:ring-2 focus-visible:ring-signature-500/40",
          error ? "border-critical" : "border-line",
          className,
        )}
        {...props}
      />
      {error && <span className="text-caption text-critical">{error}</span>}
    </label>
  );
});
