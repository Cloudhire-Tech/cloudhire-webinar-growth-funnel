import { Briefcase, FileText, Mic, TrendingUp } from "lucide-react";

import { PrimaryCtaButton } from "@/components/ui/primary-cta-button";
import { SectionHeader } from "@/components/section/section-header";
import { Section } from "@/components/section/section";
import { whyChooseCloudHireContent } from "@/content/why-choose-cloudhire";
import { heroContent } from "@/content/hero";

const featureIcons = [FileText, Mic, Briefcase, TrendingUp] as const;

export function WhyChooseCloudHireSection() {
  return (
    <Section className="section-shell-tight section-bg-alt">
      <SectionHeader
        eyebrow={whyChooseCloudHireContent.eyebrow}
        title={whyChooseCloudHireContent.title}
        subtitle={whyChooseCloudHireContent.subtitle}
      />

      <div className="grid gap-5 sm:grid-cols-2">
        {whyChooseCloudHireContent.features.map((feature, index) => {
          const Icon = featureIcons[index];

          return (
            <article
              key={feature.title}
              className="premium-card group flex gap-5 p-6 md:p-7"
            >
              <div className="icon-badge-lg">
                <Icon className="size-6" aria-hidden />
              </div>
              <div className="min-w-0">
                <h3 className="text-foreground text-base font-bold tracking-tight md:text-lg">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed md:text-[0.9375rem]">
                  {feature.description}
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
