import { PrimaryCtaButton } from "@/components/ui/primary-cta-button";
import { Section } from "@/components/section/section";
import { getFinalCtaContent } from "@/content/webinar";

export function FinalCtaSection() {
  const finalCtaContent = getFinalCtaContent();

  return (
    <Section className="section-shell-tight section-bg-default pb-24 md:pb-28">
      <div className="cta-band mx-auto max-w-3xl text-center">
        <h2 className="text-2xl font-bold tracking-tight md:text-3xl lg:text-4xl">
          {finalCtaContent.heading}
        </h2>
        <p className="mt-4 text-base leading-relaxed text-orange-50 md:text-lg">
          {finalCtaContent.body}
        </p>
        <div className="section-cta">
          <PrimaryCtaButton
            href="#register"
            label={finalCtaContent.button}
            className="ring-2 ring-white/90"
          />
        </div>
        <p className="mt-4 text-xs text-orange-100/80">
          {finalCtaContent.microcopy}
        </p>
      </div>
    </Section>
  );
}
