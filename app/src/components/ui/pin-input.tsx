import { useContext, type ComponentProps } from "react";
import { OTPInput, OTPInputContext } from "input-otp";
import { cn } from "../../lib/utils";

export function PinInput({ className, containerClassName, ...props }: ComponentProps<typeof OTPInput>) {
  return (
    <OTPInput
      containerClassName={cn("flex items-center gap-2 has-disabled:opacity-50", containerClassName)}
      className={cn("disabled:cursor-not-allowed", className)}
      {...props}
    />
  );
}

export function PinInputGroup({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("flex items-center gap-2", className)} {...props} />;
}

export function PinInputSlot({ index, className, ...props }: ComponentProps<"div"> & { index: number }) {
  const inputOTPContext = useContext(OTPInputContext);
  const slot = inputOTPContext?.slots[index];
  const char = slot?.char;
  const hasFakeCaret = slot?.hasFakeCaret;
  const isActive = slot?.isActive;

  return (
    <div
      className={cn(
        "relative flex h-12 w-10 items-center justify-center rounded-md border border-line bg-paper-sunken font-display text-heading-sm text-ink-900 transition-all duration-150 ease-out",
        isActive && "z-10 border-signature-500 ring-2 ring-signature-500/30",
        className,
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-5 w-px animate-caret-blink bg-signature-500 duration-1000" />
        </div>
      )}
    </div>
  );
}

export function PinInputSeparator(props: ComponentProps<"div">) {
  return (
    <div role="separator" className="px-0.5 text-ink-300" {...props}>
      -
    </div>
  );
}
