"use client";

import { Check } from "lucide-react";

import { heroContent } from "@/content/hero";
import { cn } from "@/lib/utils";

const TICKER_POOL = [
  { role: "Product Analyst — Remote", meta: "applied · 2m" },
  { role: "Frontend Developer — Remote", meta: "applied · 9m" },
  { role: "HR Executive — Remote", meta: "applied · 4m" },
  { role: "Marketing Associate — Remote", meta: "applied · 7m" },
  { role: "Data Analyst — Remote", meta: "applied · 3m" },
  { role: "Customer Success Manager — Remote", meta: "applied · 11m" },
] as const;

export function LiveApplicationTicker() {
  const rows = heroContent.tickerRows;

  return (
    <div className="premium-card mt-5 overflow-hidden p-0">
      <div className="flex items-center justify-between border-b border-border/60 bg-stone-50/80 px-4 py-2.5">
        <span className="font-mono text-[10px] font-medium tracking-[0.12em] text-muted-foreground uppercase">
          {heroContent.tickerHeaderLeft}
        </span>
        <span className="font-mono text-[10px] font-semibold tracking-wide text-[#2BD576]">
          {heroContent.tickerHeaderRight}
        </span>
      </div>

      <ul className="divide-y divide-border/50">
        {rows.map((row) => (
          <li
            key={row.role}
            className="flex items-center justify-between gap-3 px-4 py-3"
          >
            <span className="flex min-w-0 items-center gap-2.5">
              <span
                className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[#2BD576]/15"
                aria-hidden
              >
                <Check className="size-3 text-[#2BD576]" strokeWidth={3} />
              </span>
              <span className="truncate text-sm font-medium text-foreground">
                {row.role}
              </span>
            </span>
            <span className="font-mono shrink-0 text-[11px] text-muted-foreground">
              {row.meta}
            </span>
          </li>
        ))}
      </ul>

      <TickerAnimationPool pool={TICKER_POOL} className="sr-only" />
    </div>
  );
}

function TickerAnimationPool({
  pool,
  className,
}: {
  pool: readonly { role: string; meta: string }[];
  className?: string;
}) {
  return (
    <div className={cn(className)} aria-hidden>
      {pool.map((item) => (
        <span key={item.role}>{item.role}</span>
      ))}
    </div>
  );
}
