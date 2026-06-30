import { ArrowRight, Check } from "lucide-react";

import { SectionHeader } from "@/components/section/section-header";
import { Section } from "@/components/section/section";
import { bluePlanContent } from "@/content/blue-plan";
import { cn } from "@/lib/utils";

export function BluePlanBenefitsSection() {
  return (
    <Section className="bg-muted/30">
      <SectionHeader
        title={bluePlanContent.title}
        subtitle={bluePlanContent.subtitle}
      />

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="premium-card overflow-hidden">
          <div className="grid grid-cols-2 border-b border-border/60 text-center text-sm font-medium">
            <div className="text-muted-foreground bg-muted/50 px-4 py-3">
              {bluePlanContent.freeLabel}
            </div>
            <div className="bg-primary/10 text-primary px-4 py-3">
              {bluePlanContent.blueLabel}
            </div>
          </div>
          <ul className="divide-y divide-border/60">
            {bluePlanContent.comparison.map((row, index) => (
              <li key={index} className="grid grid-cols-2 text-sm">
                <div className="text-muted-foreground border-r border-border/60 px-4 py-4 leading-relaxed">
                  {row.free}
                </div>
                <div className="text-foreground flex items-start gap-2 px-4 py-4 leading-relaxed">
                  <ArrowRight
                    className="text-primary mt-0.5 size-4 shrink-0"
                    aria-hidden
                  />
                  {row.blue}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col justify-center">
          <p className="text-muted-foreground mb-6 text-sm font-medium uppercase tracking-wider">
            What you&apos;ll gain
          </p>
          <ul className="space-y-4">
            {bluePlanContent.valuePoints.map((point) => (
              <li key={point} className="flex items-start gap-3">
                <span
                  className={cn(
                    "bg-primary/10 text-primary mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full"
                  )}
                >
                  <Check className="size-3.5" aria-hidden />
                </span>
                <span className="text-foreground text-base leading-relaxed">
                  {point}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
