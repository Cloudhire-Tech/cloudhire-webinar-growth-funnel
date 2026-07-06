import type { TestimonialVideo } from "@/content/testimonials";
import { cn } from "@/lib/utils";
import { TestimonialMediaFrame } from "./testimonial-media-frame";

type VimeoEmbedProps = {
  video: TestimonialVideo;
  className?: string;
};

function buildVimeoSrc(vimeoId: string) {
  const params = new URLSearchParams({
    title: "0",
    byline: "0",
    portrait: "0",
    badge: "0",
    autopause: "0",
    player_id: "0",
    app_id: "58479",
  });

  return `https://player.vimeo.com/video/${vimeoId}?${params.toString()}`;
}

export function VimeoEmbed({ video, className }: VimeoEmbedProps) {
  const isPortrait = video.orientation === "portrait";

  return (
    <TestimonialMediaFrame className={className}>
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className={cn(
            "relative max-h-full max-w-full",
            isPortrait
              ? "aspect-[9/16] h-full w-auto"
              : "aspect-video w-full h-auto"
          )}
        >
          <iframe
            src={buildVimeoSrc(video.vimeoId)}
            title={video.title}
            className="absolute inset-0 h-full w-full border-0"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            loading="lazy"
          />
        </div>
      </div>
    </TestimonialMediaFrame>
  );
}
