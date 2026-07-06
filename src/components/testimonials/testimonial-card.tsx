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

const mediaWidthClass = "mx-auto w-full max-w-md sm:max-w-lg";

function isVideo(
  item: TestimonialVideo | TestimonialScreenshot
): item is TestimonialVideo {
  return "vimeoId" in item;
}

function getCardTitle(
  item: TestimonialVideo | TestimonialScreenshot
): string | null {
  if ("name" in item && item.name) {
    return item.name;
  }

  if ("label" in item && item.label) {
    return item.label;
  }

  return null;
}

export function TestimonialCard({ item, className }: TestimonialCardProps) {
  const cardTitle = getCardTitle(item);

  return (
    <article
      className={cn(
        "premium-card w-full overflow-hidden p-2.5 sm:p-3",
        className
      )}
    >
      {cardTitle ? (
        <p className="text-foreground mb-2 text-left text-sm font-semibold">
          {cardTitle}
        </p>
      ) : null}

      <div className={mediaWidthClass}>
        {isVideo(item) ? (
          <VimeoEmbed video={item} />
        ) : (
          <TestimonialScreenshotCard screenshot={item} />
        )}
      </div>
    </article>
  );
}
