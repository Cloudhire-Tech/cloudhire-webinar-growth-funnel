import { SectionHeader } from "@/components/section/section-header";
import { SectionCta } from "@/components/section/section-cta";
import { Section } from "@/components/section/section";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { speakerContent } from "@/content/speaker";

export function SpeakerSection() {
  return (
    <Section className="section-shell-tight section-bg-alt">
      <SectionHeader
        eyebrow={speakerContent.eyebrow}
        title={speakerContent.heading}
      />

      <div className="mx-auto max-w-5xl">
        <div className="grid gap-6 md:grid-cols-2">
          {speakerContent.hosts.map((host) => (
            <article
              key={host.name}
              className="premium-card flex flex-col items-center p-8 text-center md:p-10"
            >
              <Avatar className="size-24 shrink-0 ring-4 ring-[var(--brand-blue)]/10 md:size-28">
                {host.imageSrc ? (
                  <AvatarImage src={host.imageSrc} alt={host.name} />
                ) : null}
                <AvatarFallback className="bg-gradient-to-br from-[var(--brand-blue)] to-[#1D4ED8] text-2xl font-bold text-white md:text-3xl">
                  {host.avatar}
                </AvatarFallback>
              </Avatar>

              <h3 className="text-foreground mt-5 text-xl font-bold tracking-tight md:text-2xl">
                {host.name}
              </h3>
              <p className="mt-1 font-mono text-xs font-semibold tracking-[0.12em] text-[var(--brand-blue)]">
                {speakerContent.role}
              </p>
            </article>
          ))}
        </div>

        <p className="text-muted-foreground mx-auto mt-8 max-w-3xl text-center text-sm leading-relaxed md:mt-10 md:text-base">
          {speakerContent.bio}
        </p>
      </div>

      <SectionCta />
    </Section>
  );
}
