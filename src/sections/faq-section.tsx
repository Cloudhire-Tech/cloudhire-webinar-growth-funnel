import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FaqJsonLd } from "@/components/seo/faq-json-ld";
import { SectionHeader } from "@/components/section/section-header";
import { SectionCta } from "@/components/section/section-cta";
import { Section } from "@/components/section/section";
import { faqContent } from "@/content/faq";

export function FaqSection() {
  return (
    <Section className="section-shell-tight section-bg-alt">
      <FaqJsonLd />
      <SectionHeader eyebrow={faqContent.eyebrow} title={faqContent.heading} />

      <Accordion
        type="single"
        collapsible
        className="premium-card mx-auto max-w-2xl divide-y divide-border/60 px-1"
      >
        {faqContent.items.map((item, index) => (
          <AccordionItem key={item.question} value={`faq-${index}`}>
            <AccordionTrigger className="px-5 text-left text-sm font-semibold hover:text-primary hover:no-underline md:text-base">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground px-5 pb-5 text-sm leading-relaxed">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <SectionCta />
    </Section>
  );
}
