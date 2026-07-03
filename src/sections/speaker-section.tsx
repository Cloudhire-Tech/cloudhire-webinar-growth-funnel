import { SectionHeader } from "@/components/section/section-header";
import { SectionCta } from "@/components/section/section-cta";
import { Section } from "@/components/section/section";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { speakerContent } from "@/content/speaker";

export function SpeakerSection() {
  return (
    <Section className="section-shell-tight section-bg-alt">
      <SectionHeader
        eyebrow={speakerContent.eyebrow}
        title={speakerContent.heading}
      />

      <article className="premium-card mx-auto flex max-w-3xl flex-col items-center gap-6 p-8 text-center md:flex-row md:items-start md:p-10 md:text-left">
        <Avatar className="size-24 shrink-0 ring-4 ring-[var(--brand-blue)]/10 md:size-28">
          <AvatarFallback className="bg-gradient-to-br from-[var(--brand-blue)] to-[#1D4ED8] text-2xl font-bold text-white md:text-3xl">
            {speakerContent.avatar}
          </AvatarFallback>
        </Avatar>

        <div>
          <h3 className="text-foreground text-xl font-bold tracking-tight md:text-2xl">
            {speakerContent.name}
          </h3>
          <p className="mt-1 font-mono text-xs font-semibold tracking-[0.12em] text-[var(--brand-blue)]">
            {speakerContent.role}
          </p>
          <p className="text-muted-foreground mt-4 text-sm leading-relaxed md:text-base">
            {speakerContent.bio}
          </p>
        </div>
      </article>
      <SectionCta />
    </Section>
  );
}
