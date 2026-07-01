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
  variant?: "light" | "dark";
};

export function WebinarMetaItem({
  icon,
  label,
  value,
  variant = "light",
}: WebinarMetaItemProps) {
  const Icon = iconMap[icon];
  const isDark = variant === "dark";

  return (
    <div className="flex items-center gap-3">
      <div
        className={cn(
          "flex size-10 shrink-0 items-center justify-center rounded-xl",
          isDark
            ? "bg-orange-500/15 text-orange-400"
            : "bg-orange-50 text-primary"
        )}
      >
        <Icon className="size-4" aria-hidden />
      </div>
      <div>
        <p
          className={cn(
            "text-xs font-medium tracking-wider uppercase",
            isDark ? "text-white/50" : "text-muted-foreground"
          )}
        >
          {label}
        </p>
        <p
          className={cn(
            "text-sm font-medium",
            isDark ? "text-white/90" : "text-foreground"
          )}
        >
          {value}
        </p>
      </div>
    </div>
  );
}

type WebinarMetaGridProps = {
  children: React.ReactNode;
  className?: string;
  variant?: "light" | "dark";
};

export function WebinarMetaGrid({
  children,
  className,
  variant = "light",
}: WebinarMetaGridProps) {
  return (
    <div
      className={cn(
        "grid gap-6 rounded-2xl border p-5 sm:grid-cols-3 sm:p-6",
        variant === "light" && "premium-card",
        variant === "dark" && "border-white/10 bg-white/[0.04]",
        className
      )}
    >
      {children}
    </div>
  );
}
