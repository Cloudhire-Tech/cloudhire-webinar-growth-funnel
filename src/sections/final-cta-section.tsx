import { PrimaryCtaButton } from "@/components/ui/primary-cta-button";
import { Section } from "@/components/section/section";
import { finalCtaContent } from "@/content/final-cta";

export function FinalCtaSection() {
  return (
    <Section className="section-shell-tight section-bg-default pb-14 md:pb-16">
      <div className="cta-band mx-auto max-w-3xl text-center">
        <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
          {finalCtaContent.headline}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-orange-50 md:text-base">
          {finalCtaContent.description}
        </p>
        <div className="section-cta">
          <PrimaryCtaButton
            href="#register"
            label={finalCtaContent.button}
            className="ring-2 ring-white/90"
          />
        </div>
      </div>
    </Section>
  );
}
