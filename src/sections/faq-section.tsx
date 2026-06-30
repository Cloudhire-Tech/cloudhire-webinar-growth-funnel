import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PrimaryCtaButton } from "@/components/ui/primary-cta-button";
import { SectionHeader } from "@/components/section/section-header";
import { Section } from "@/components/section/section";
import { faqContent } from "@/content/faq";
import { heroContent } from "@/content/hero";

export function FaqSection() {
  return (
    <Section className="section-shell-tight section-bg-alt">
      <SectionHeader title={faqContent.title} />

      <Accordion
        type="single"
        collapsible
        className="premium-card mx-auto max-w-2xl divide-y divide-border/60 px-2"
      >
        {faqContent.items.map((item, index) => (
          <AccordionItem key={item.question} value={`item-${index}`}>
            <AccordionTrigger className="px-4 text-base font-medium hover:text-primary hover:no-underline">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground px-4 pb-4 leading-relaxed">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="section-cta">
        <PrimaryCtaButton href="#register" label={heroContent.primaryCta} />
      </div>
    </Section>
  );
}
