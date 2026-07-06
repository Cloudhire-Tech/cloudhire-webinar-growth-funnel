import type { TestimonialVideo } from "@/content/testimonials";
import { cn } from "@/lib/utils";

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
  return (
    <div
      className={cn(
        "relative aspect-video w-full overflow-hidden rounded-lg bg-stone-100",
        className
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
  );
}
