import type { HTMLAttributes } from "react";
import { clsx } from "clsx";

export function Container({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={clsx("mx-auto max-w-[1200px] px-6", className)} {...props}>
      {children}
    </div>
  );
}
