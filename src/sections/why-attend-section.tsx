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
      <SectionHeader title={whyAttendContent.title} />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {whyAttendContent.cards.map((card, index) => {
          const Icon = cardIcons[index];

          return (
            <article
              key={card.title}
              className={cn(
                "premium-card group flex flex-col p-5 md:p-6",
                "hover:border-orange-200"
              )}
            >
              <div className="bg-orange-50 text-primary mb-4 flex size-10 items-center justify-center rounded-xl transition-colors group-hover:bg-orange-100">
                <Icon className="size-5" aria-hidden />
              </div>
              <h3 className="text-foreground text-base font-semibold tracking-tight">
                {card.title}
              </h3>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                {card.description}
              </p>
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
