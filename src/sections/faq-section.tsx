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
  const midpoint = Math.ceil(faqContent.items.length / 2);
  const columns = [
    faqContent.items.slice(0, midpoint),
    faqContent.items.slice(midpoint),
  ];

  return (
    <Section className="section-shell-tight section-bg-default">
      <SectionHeader eyebrow={faqContent.eyebrow} title={faqContent.title} />

      <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-2">
        {columns.map((column, columnIndex) => (
          <Accordion
            key={columnIndex}
            type="single"
            collapsible
            className="premium-card divide-y divide-border/60 px-1"
          >
            {column.map((item, index) => (
              <AccordionItem
                key={item.question}
                value={`col-${columnIndex}-item-${index}`}
              >
                <AccordionTrigger className="px-5 text-left text-sm font-semibold hover:text-primary hover:no-underline md:text-base">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground px-5 pb-5 text-sm leading-relaxed">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ))}
      </div>

      <div className="section-cta">
        <PrimaryCtaButton href="#register" label={heroContent.primaryCta} />
      </div>
    </Section>
  );
}
