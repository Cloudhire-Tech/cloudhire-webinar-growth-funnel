import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type LiveBadgeProps = {
  className?: string;
};

export function LiveBadge({ className }: LiveBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "border-orange-200 bg-orange-50 text-orange-700",
        className
      )}
    >
      <span className="relative flex size-2">
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-orange-400 opacity-75" />
        <span className="relative inline-flex size-2 rounded-full bg-orange-500" />
      </span>
      LIVE
    </Badge>
  );
}
