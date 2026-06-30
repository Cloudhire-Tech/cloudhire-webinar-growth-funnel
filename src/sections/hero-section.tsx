import { CheckCircle2 } from "lucide-react";

import { LiveBadge } from "@/components/ui/live-badge";
import { PrimaryCtaButton } from "@/components/ui/primary-cta-button";
import {
  WebinarMetaGrid,
  WebinarMetaItem,
} from "@/components/webinar/webinar-meta";
import { heroContent } from "@/content/hero";
import { webinarDetails } from "@/content/webinar";

export function HeroSection() {
  return (
    <section className="hero-gradient relative overflow-hidden pb-2 md:pb-4">
      <div className="grid-pattern pointer-events-none absolute inset-0 opacity-30" />
      <div className="container-shell relative py-10 md:py-14 lg:py-16">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <LiveBadge className="mb-4" />

          <h1 className="text-foreground text-4xl font-semibold tracking-tight text-balance md:text-5xl lg:text-[3.25rem] lg:leading-tight">
            {heroContent.headline}
          </h1>

          <p className="text-muted-foreground mt-4 max-w-2xl text-base leading-relaxed md:text-lg">
            {heroContent.subheading}
          </p>

          <WebinarMetaGrid className="mt-7 w-full max-w-2xl border-orange-100/80 ring-orange-100/60">
            <WebinarMetaItem
              icon="calendar"
              label="Date"
              value={webinarDetails.date}
            />
            <WebinarMetaItem
              icon="clock"
              label="Time"
              value={webinarDetails.time}
            />
            <WebinarMetaItem
              icon="duration"
              label="Duration"
              value={webinarDetails.duration}
            />
          </WebinarMetaGrid>

          <div className="mt-7">
            <PrimaryCtaButton
              href="#register"
              label={heroContent.primaryCta}
            />
          </div>

          <p className="text-muted-foreground mt-3 text-xs">
            Free · Limited seats · {webinarDetails.duration}
          </p>

          <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {heroContent.trustBadges.map((badge) => (
              <li
                key={badge}
                className="text-muted-foreground flex items-center gap-2 text-sm"
              >
                <CheckCircle2
                  className="text-primary size-4 shrink-0"
                  aria-hidden
                />
                {badge}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
