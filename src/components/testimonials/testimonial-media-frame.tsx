import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export const testimonialMediaFrameClass =
  "relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-stone-100";

type TestimonialMediaFrameProps = {
  children: ReactNode;
  className?: string;
};

export function TestimonialMediaFrame({
  children,
  className,
}: TestimonialMediaFrameProps) {
  return (
    <div className={cn(testimonialMediaFrameClass, className)}>{children}</div>
  );
}
