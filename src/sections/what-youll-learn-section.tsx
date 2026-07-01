import { CheckCircle2 } from "lucide-react";

import { PrimaryCtaButton } from "@/components/ui/primary-cta-button";
import { SectionHeader } from "@/components/section/section-header";
import { Section } from "@/components/section/section";
import { heroContent } from "@/content/hero";
import { whatYoullLearnContent } from "@/content/what-youll-learn";

export function WhatYoullLearnSection() {
  return (
    <Section className="section-shell-tight section-bg-alt">
      <SectionHeader
        eyebrow={whatYoullLearnContent.eyebrow}
        title={whatYoullLearnContent.title}
      />

      <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2">
        {whatYoullLearnContent.outcomes.map((outcome) => (
          <article
            key={outcome}
            className="premium-card flex items-start gap-3.5 p-5 md:p-6"
          >
            <div className="bg-orange-50 flex size-8 shrink-0 items-center justify-center rounded-full">
              <CheckCircle2 className="text-primary size-4" aria-hidden />
            </div>
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
