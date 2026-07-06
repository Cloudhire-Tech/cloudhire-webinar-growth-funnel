import Image from "next/image";
import type { TestimonialScreenshot } from "@/content/testimonials";
import { cn } from "@/lib/utils";

type TestimonialScreenshotCardProps = {
  screenshot: TestimonialScreenshot;
  className?: string;
};

export function TestimonialScreenshotCard({
  screenshot,
  className,
}: TestimonialScreenshotCardProps) {
  return (
    <Image
      src={screenshot.src}
      alt={screenshot.alt}
      width={screenshot.width}
      height={screenshot.height}
      className={cn("h-auto w-full rounded-lg", className)}
      sizes="(max-width: 640px) 100vw, 512px"
    />
  );
}
