import { heroContent } from "@/content/hero";
import { getWebinarDetails } from "@/content/webinar";
import { cn } from "@/lib/utils";

type SessionDetailPillsProps = {
  webinar?: ReturnType<typeof getWebinarDetails>;
};

export function SessionDetailPills({
  webinar = getWebinarDetails(),
}: SessionDetailPillsProps) {
  const pills = [
    {
      label: heroContent.sessionPills.dateLabel,
      value: webinar.date,
      urgent: false,
    },
    {
      label: heroContent.sessionPills.timeLabel,
      value: webinar.time,
      urgent: false,
    },
    {
      label: heroContent.sessionPills.seatsLabel,
      value: webinar.seatsLabel,
      urgent: true,
    },
  ] as const;

  return (
    <div className="mt-4 grid grid-cols-3 gap-2 sm:gap-3">
      {pills.map((pill) => (
        <div
          key={pill.label}
          className={cn(
            "rounded-xl border bg-white px-2 py-2.5 text-center sm:px-3 sm:py-3",
            pill.urgent
              ? "border-orange-300/80 bg-orange-50/50"
              : "border-border/60"
          )}
        >
          <p className="font-mono text-[9px] font-medium tracking-[0.14em] text-muted-foreground uppercase sm:text-[10px]">
            {pill.label}
          </p>
          <p
            className={cn(
              "mt-1 text-[11px] font-semibold leading-tight sm:text-xs",
              pill.urgent ? "text-orange-600" : "text-foreground"
            )}
          >
            {pill.value}
          </p>
        </div>
      ))}
    </div>
  );
}
