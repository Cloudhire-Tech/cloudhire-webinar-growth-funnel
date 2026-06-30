import { SectionHeader } from "@/components/section/section-header";
import { Section } from "@/components/section/section";
import { agendaContent } from "@/content/agenda";
import { cn } from "@/lib/utils";

export function WebinarAgendaSection() {
  return (
    <Section>
      <SectionHeader
        title={agendaContent.title}
        subtitle={agendaContent.subtitle}
      />

      <div className="mx-auto max-w-2xl">
        <ol className="relative space-y-0">
          {agendaContent.items.map((item, index) => {
            const isLast = index === agendaContent.items.length - 1;

            return (
              <li key={item.step} className="relative flex gap-6 pb-10">
                {!isLast ? (
                  <span
                    aria-hidden
                    className="bg-border absolute top-10 left-[19px] h-[calc(100%-2.5rem)] w-px"
                  />
                ) : null}

                <div className="relative z-10 flex shrink-0 flex-col items-center">
                  <span
                    className={cn(
                      "bg-primary text-primary-foreground flex size-10 items-center justify-center rounded-full text-sm font-semibold shadow-sm",
                      "ring-4 ring-background"
                    )}
                  >
                    {item.step}
                  </span>
                </div>

                <article className="premium-card flex-1 p-5 md:p-6">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-foreground font-semibold">
                      {item.title}
                    </h3>
                    <span className="text-muted-foreground text-xs font-medium">
                      {item.duration}
                    </span>
                  </div>
                </article>
              </li>
            );
          })}
        </ol>
      </div>
    </Section>
  );
}
