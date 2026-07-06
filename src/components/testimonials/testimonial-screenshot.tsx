import Image from "next/image";
import type { TestimonialScreenshot } from "@/content/testimonials";
import { TestimonialMediaFrame } from "./testimonial-media-frame";

type TestimonialScreenshotCardProps = {
  screenshot: TestimonialScreenshot;
  className?: string;
};

export function TestimonialScreenshotCard({
  screenshot,
  className,
}: TestimonialScreenshotCardProps) {
  return (
    <TestimonialMediaFrame className={className}>
      <Image
        src={screenshot.src}
        alt={screenshot.alt}
        fill
        className="object-contain object-top"
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />
    </TestimonialMediaFrame>
  );
}
