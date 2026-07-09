import { Check } from "lucide-react";

import { heroContent } from "@/content/hero";

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
    </div>
  );
}
