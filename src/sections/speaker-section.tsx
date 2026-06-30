import { PrimaryCtaButton } from "@/components/ui/primary-cta-button";
import { SectionHeader } from "@/components/section/section-header";
import { Section } from "@/components/section/section";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { heroContent } from "@/content/hero";
import { speakerContent } from "@/content/speaker";

export function SpeakerSection() {
  return (
    <Section className="section-shell-tight section-bg-alt">
      <SectionHeader title={speakerContent.title} />

      <article className="premium-card mx-auto flex max-w-3xl flex-col items-center gap-6 p-6 text-center md:p-8">
        <Avatar className="size-28 shrink-0 md:size-36">
          <AvatarFallback className="bg-orange-50 text-primary text-3xl font-semibold md:text-4xl">
            {speakerContent.avatar}
          </AvatarFallback>
        </Avatar>

        <div>
          <h3 className="text-foreground text-xl font-semibold tracking-tight md:text-2xl">
            {speakerContent.name}
          </h3>
          <p className="text-primary mt-1 text-sm font-medium">
            {speakerContent.role}
          </p>
          <p className="text-muted-foreground mx-auto mt-3 max-w-xl text-sm leading-relaxed md:text-base">
            {speakerContent.bio}
          </p>
        </div>
      </article>

      <div className="section-cta">
        <PrimaryCtaButton href="#register" label={heroContent.primaryCta} />
      </div>
    </Section>
  );
}
