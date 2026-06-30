import {
  Calendar,
  Clock,
  MonitorPlay,
  Video,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";

const iconMap = {
  calendar: Calendar,
  clock: Clock,
  duration: MonitorPlay,
  video: Video,
} as const satisfies Record<string, LucideIcon>;

export type WebinarMetaIcon = keyof typeof iconMap;

type WebinarMetaItemProps = {
  icon: WebinarMetaIcon;
  label: string;
  value: string;
};

export function WebinarMetaItem({
  icon,
  label,
  value,
}: WebinarMetaItemProps) {
  const Icon = iconMap[icon];

  return (
    <div className="flex items-center gap-3">
      <div className="bg-orange-50 text-primary flex size-10 shrink-0 items-center justify-center rounded-xl">
        <Icon className="size-4" aria-hidden />
      </div>
      <div>
        <p className="text-muted-foreground text-xs font-medium uppercase tracking-wider">
          {label}
        </p>
        <p className="text-foreground text-sm font-medium">{value}</p>
      </div>
    </div>
  );
}

type WebinarMetaGridProps = {
  children: React.ReactNode;
  className?: string;
};

export function WebinarMetaGrid({ children, className }: WebinarMetaGridProps) {
  return (
    <div
      className={cn(
        "premium-card grid gap-6 p-6 sm:grid-cols-3 sm:p-8",
        className
      )}
    >
      {children}
    </div>
  );
}
