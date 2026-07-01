import { PrimaryCtaButton } from "@/components/ui/primary-cta-button";
import { SectionHeader } from "@/components/section/section-header";
import { Section } from "@/components/section/section";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { heroContent } from "@/content/hero";
import { speakerContent } from "@/content/speaker";

export function SpeakerSection() {
  return (
    <Section className="section-shell-tight section-bg-default">
      <SectionHeader
        eyebrow={speakerContent.eyebrow}
        title={speakerContent.title}
      />

      <article className="premium-card mx-auto flex max-w-3xl flex-col items-center gap-6 p-8 text-center md:p-10">
        <Avatar className="size-28 shrink-0 ring-4 ring-orange-100 md:size-32">
          <AvatarFallback className="bg-gradient-to-br from-orange-50 to-orange-100 text-primary text-3xl font-bold md:text-4xl">
            {speakerContent.avatar}
          </AvatarFallback>
        </Avatar>

        <div>
          <h3 className="text-foreground text-xl font-bold tracking-tight md:text-2xl">
            {speakerContent.name}
          </h3>
          <p className="text-primary mt-1 text-sm font-semibold">
            {speakerContent.role}
          </p>
          <p className="text-muted-foreground mx-auto mt-4 max-w-xl text-sm leading-relaxed md:text-base">
            {speakerContent.bio}
          </p>
        </div>

        <dl className="grid w-full max-w-sm grid-cols-2 gap-4 border-t border-border/60 pt-6">
          {speakerContent.stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <dt className="text-primary text-xl font-bold">{stat.value}</dt>
              <dd className="text-muted-foreground mt-1 text-xs">{stat.label}</dd>
            </div>
          ))}
        </dl>
      </article>

      <div className="section-cta">
        <PrimaryCtaButton href="#register" label={heroContent.primaryCta} />
      </div>
    </Section>
  );
}
