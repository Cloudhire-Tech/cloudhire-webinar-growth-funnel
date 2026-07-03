import { SectionHeader } from "@/components/section/section-header";
import { SectionCta } from "@/components/section/section-cta";
import { Section } from "@/components/section/section";
import { agendaContent } from "@/content/agenda";

export function AgendaSection() {
  return (
    <Section className="section-shell-tight section-bg-alt">
      <SectionHeader
        eyebrow={agendaContent.eyebrow}
        title={agendaContent.heading}
      />

      <ol className="mx-auto grid max-w-3xl gap-4">
        {agendaContent.items.map((item) => (
          <li key={item.number}>
            <article className="premium-card p-5 md:p-6">
              <h3 className="text-foreground text-base font-bold leading-snug md:text-lg">
                {item.number} — {item.title}
              </h3>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed md:text-base">
                {item.description}
              </p>
            </article>
          </li>
        ))}
      </ol>
      <SectionCta />
    </Section>
  );
}
