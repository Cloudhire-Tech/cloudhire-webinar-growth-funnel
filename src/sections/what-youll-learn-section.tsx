import { CheckCircle2 } from "lucide-react";

import { PrimaryCtaButton } from "@/components/ui/primary-cta-button";
import { SectionHeader } from "@/components/section/section-header";
import { Section } from "@/components/section/section";
import { heroContent } from "@/content/hero";
import { whatYoullLearnContent } from "@/content/what-youll-learn";

export function WhatYoullLearnSection() {
  return (
    <Section className="section-shell-tight section-bg-alt">
      <SectionHeader title={whatYoullLearnContent.title} />

      <div className="mx-auto grid max-w-3xl gap-3 sm:grid-cols-2">
        {whatYoullLearnContent.outcomes.map((outcome) => (
          <article
            key={outcome}
            className="premium-card flex items-start gap-3 border-orange-100/60 p-4 md:p-5"
          >
            <CheckCircle2
              className="text-primary mt-0.5 size-5 shrink-0"
              aria-hidden
            />
            <p className="text-foreground text-sm font-medium leading-relaxed md:text-base">
              {outcome}
            </p>
          </article>
        ))}
      </div>

      <div className="section-cta">
        <PrimaryCtaButton href="#register" label={heroContent.primaryCta} />
      </div>
    </Section>
  );
}
