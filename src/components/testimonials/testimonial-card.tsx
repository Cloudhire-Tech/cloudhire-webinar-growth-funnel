import type {
  TestimonialScreenshot,
  TestimonialVideo,
} from "@/content/testimonials";
import { cn } from "@/lib/utils";
import { TestimonialScreenshotCard } from "./testimonial-screenshot";
import { VimeoEmbed } from "./vimeo-embed";

type TestimonialCardProps = {
  item: TestimonialVideo | TestimonialScreenshot;
  className?: string;
};

function isVideo(
  item: TestimonialVideo | TestimonialScreenshot
): item is TestimonialVideo {
  return "vimeoId" in item;
}

export function TestimonialCard({ item, className }: TestimonialCardProps) {
  return (
    <article
      className={cn(
        "premium-card flex h-full flex-col overflow-hidden p-3 md:p-4",
        className
      )}
    >
      {isVideo(item) ? (
        <VimeoEmbed video={item} />
      ) : (
        <TestimonialScreenshotCard screenshot={item} />
      )}
      {"name" in item && item.name ? (
        <p className="text-foreground mt-3 text-center text-sm font-semibold">
          {item.name}
        </p>
      ) : null}
    </article>
  );
}
