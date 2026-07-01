import { CheckCircle2 } from "lucide-react";

import { LiveBadge } from "@/components/ui/live-badge";
import {
  WebinarMetaGrid,
  WebinarMetaItem,
} from "@/components/webinar/webinar-meta";
import { heroContent } from "@/content/hero";
import { webinarDetails } from "@/content/webinar";

export function HeroSection() {
  return (
    <div className="flex flex-col justify-center">
      <LiveBadge className="mb-5 w-fit" />

      <p className="section-eyebrow">{heroContent.eyebrow}</p>

      <h1 className="text-foreground text-3xl font-bold tracking-tight text-balance sm:text-4xl lg:text-[2.75rem] lg:leading-[1.12]">
        {heroContent.headline}{" "}
        <span className="text-primary">{heroContent.headlineHighlight}</span>{" "}
        {heroContent.headlineSuffix}
      </h1>

      <p className="text-muted-foreground mt-5 max-w-xl text-base leading-relaxed md:text-lg">
        {heroContent.subheading}
      </p>

      <ul className="mt-6 flex flex-wrap gap-2">
        {heroContent.trustBadges.map((badge) => (
          <li key={badge} className="benefit-pill">
            <CheckCircle2 className="trust-check" aria-hidden />
            {badge}
          </li>
        ))}
      </ul>

      <WebinarMetaGrid className="mt-8">
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

      <p className="text-muted-foreground mt-5 text-xs">
        Free · Limited seats · {webinarDetails.duration}
      </p>
    </div>
  );
}
