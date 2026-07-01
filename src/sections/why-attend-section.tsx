import { Briefcase, MessageCircle, Target, TrendingUp } from "lucide-react";

import { PrimaryCtaButton } from "@/components/ui/primary-cta-button";
import { SectionHeader } from "@/components/section/section-header";
import { Section } from "@/components/section/section";
import { heroContent } from "@/content/hero";
import { whyAttendContent } from "@/content/why-attend";
import { cn } from "@/lib/utils";

const cardIcons = [Briefcase, TrendingUp, Target, MessageCircle] as const;

export function WhyAttendSection() {
  return (
    <Section className="section-shell-tight section-bg-default">
      <SectionHeader
        eyebrow={whyAttendContent.eyebrow}
        title={whyAttendContent.title}
      />

      <div className="grid gap-5 sm:grid-cols-2">
        {whyAttendContent.cards.map((card, index) => {
          const Icon = cardIcons[index];

          return (
            <article
              key={card.title}
              className={cn(
                "premium-card group flex gap-4 p-6 md:p-7",
                "hover:border-orange-200"
              )}
            >
              <div className="numbered-badge">{index + 1}</div>
              <div className="min-w-0 flex-1">
                <div className="icon-badge mb-3 inline-flex">
                  <Icon className="size-5" aria-hidden />
                </div>
                <h3 className="text-foreground text-base font-bold tracking-tight md:text-lg">
                  {card.title}
                </h3>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed md:text-[0.9375rem]">
                  {card.description}
                </p>
              </div>
            </article>
          );
        })}
      </div>

      <div className="section-cta">
        <PrimaryCtaButton href="#register" label={heroContent.primaryCta} />
      </div>
    </Section>
  );
}
