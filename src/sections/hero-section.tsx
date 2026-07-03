import { LiveApplicationTicker } from "@/components/hero/live-application-ticker";
import { SessionDetailPills } from "@/components/hero/session-detail-pills";
import { heroContent } from "@/content/hero";

export function HeroSection() {
  return (
    <div className="flex flex-col justify-center">
      <p className="mb-3 inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.18em] text-foreground uppercase">
        <span
          className="live-dot size-2 shrink-0 rounded-full bg-red-500"
          aria-hidden
        />
        {heroContent.kicker}
      </p>

      <h1 className="text-foreground text-[1.65rem] leading-tight font-bold tracking-tight text-balance sm:text-3xl lg:text-[2.65rem] lg:leading-[1.12]">
        {heroContent.headlineLine1}{" "}
        <span className="text-[var(--brand-blue)]">
          {heroContent.headlineHighlight}
        </span>
      </h1>

      <p className="text-muted-foreground mt-3 max-w-xl text-sm leading-snug sm:text-base sm:leading-relaxed">
        {heroContent.subheadlineBefore}{" "}
        <strong className="font-semibold text-foreground">
          {heroContent.subheadlineBold}
        </strong>{" "}
        {heroContent.subheadlineAfter}
      </p>

      <LiveApplicationTicker />
      <SessionDetailPills />
    </div>
  );
}
