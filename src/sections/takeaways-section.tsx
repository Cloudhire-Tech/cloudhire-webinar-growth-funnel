import { Check } from "lucide-react";

import { SectionHeader } from "@/components/section/section-header";
import { SectionCta } from "@/components/section/section-cta";
import { Section } from "@/components/section/section";
import { takeawaysContent } from "@/content/takeaways";

export function TakeawaysSection() {
  return (
    <Section className="section-shell-tight section-bg-default">
      <SectionHeader
        eyebrow={takeawaysContent.eyebrow}
        title={takeawaysContent.heading}
      />

      <ul className="mx-auto grid max-w-2xl gap-3">
        {takeawaysContent.items.map((item) => (
          <li
            key={item}
            className="premium-card flex items-start gap-3.5 p-5 md:p-6"
          >
            <span
              className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#2BD576]/15"
              aria-hidden
            >
              <Check className="size-4 text-[#2BD576]" strokeWidth={2.5} />
            </span>
            <p className="text-foreground text-sm font-medium leading-relaxed md:text-base">
              {item}
            </p>
          </li>
        ))}
      </ul>
      <SectionCta />
    </Section>
  );
}
