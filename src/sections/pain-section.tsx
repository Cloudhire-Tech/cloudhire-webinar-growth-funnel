import { Clock } from "lucide-react";

import { SectionCta } from "@/components/section/section-cta";
import { Section } from "@/components/section/section";
import { painContent } from "@/content/pain";

export function PainSection() {
  const [applicationsStat, urgencyStat] = painContent.stats;

  return (
    <Section className="pain-section section-bg-default py-10 md:py-12">
      <div className="pain-section__glow" aria-hidden />
      <div className="pain-section__lines" aria-hidden />

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <p className="section-eyebrow mb-2">{painContent.eyebrow}</p>

        <h2 className="text-foreground text-2xl font-bold tracking-tight text-balance md:text-3xl lg:text-[2rem] lg:leading-tight">
          {painContent.heading}
        </h2>

        <p className="text-muted-foreground mx-auto mt-3 max-w-2xl text-sm leading-relaxed md:text-base">
          {painContent.body}
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 sm:gap-4">
          <ApplicationsStatCard caption={applicationsStat.caption} />
          <UrgencyStatCard caption={urgencyStat.caption} />
        </div>

        <SectionCta className="mt-7 md:mt-8" />
      </div>
    </Section>
  );
}

function ApplicationsStatCard({ caption }: { caption: string }) {
  return (
    <article className="pain-stat-card pain-stat-card--simple text-left">
      <span className="pain-stat-card__bar" aria-hidden />

      <div className="pain-stat-simple">
        <div className="pain-stat-simple__figures">
          <span className="pain-stat-simple__number">100</span>
          <span className="pain-stat-simple__arrow" aria-hidden>
            →
          </span>
          <span className="pain-stat-simple__number pain-stat-simple__number--accent">
            3
          </span>
        </div>

        <p className="pain-stat-simple__caption">{caption}</p>
      </div>
    </article>
  );
}

function UrgencyStatCard({ caption }: { caption: string }) {
  return (
    <article className="pain-stat-card pain-stat-card--simple text-left">
      <span className="pain-stat-card__bar" aria-hidden />

      <div className="pain-stat-simple">
        <div className="pain-stat-simple__figures pain-stat-simple__figures--icon">
          <span className="pain-stat-simple__icon" aria-hidden>
            <Clock className="size-6 md:size-7" strokeWidth={2} />
          </span>
          <span className="pain-stat-simple__number">48hrs</span>
        </div>

        <p className="pain-stat-simple__caption">{caption}</p>
      </div>
    </article>
  );
}
