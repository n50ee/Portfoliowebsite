import type { HTMLAttributes } from "react";
import { clsx } from "clsx";

export function Container({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={clsx("w-full px-6 sm:px-10 lg:px-16", className)} {...props}>
      {children}
    </div>
  );
}
