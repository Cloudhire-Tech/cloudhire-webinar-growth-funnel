import dynamic from "next/dynamic";

import { MetaPixelViewContent } from "@/components/analytics/meta-pixel-view-content";
import { PageShell } from "@/components/layout/page-shell";
import { StickyBottomCtaDynamic } from "@/components/layout/sticky-bottom-cta-dynamic";
import { HeroSection } from "@/sections/hero-section";
import { RegistrationSection } from "@/sections/registration-section";
import { getStickyCtaContent } from "@/content/webinar";

const TrustedBySection = dynamic(() =>
  import("@/sections/trusted-by-section").then((module) => ({
    default: module.TrustedBySection,
  }))
);

const PainSection = dynamic(() =>
  import("@/sections/pain-section").then((module) => ({
    default: module.PainSection,
  }))
);

const AgendaSection = dynamic(() =>
  import("@/sections/agenda-section").then((module) => ({
    default: module.AgendaSection,
  }))
);

const TakeawaysSection = dynamic(() =>
  import("@/sections/takeaways-section").then((module) => ({
    default: module.TakeawaysSection,
  }))
);

const SpeakerSection = dynamic(() =>
  import("@/sections/speaker-section").then((module) => ({
    default: module.SpeakerSection,
  }))
);

const TestimonialsSection = dynamic(() =>
  import("@/sections/testimonials-section").then((module) => ({
    default: module.TestimonialsSection,
  }))
);

const FaqSection = dynamic(() =>
  import("@/sections/faq-section").then((module) => ({
    default: module.FaqSection,
  }))
);

const FinalCtaSection = dynamic(() =>
  import("@/sections/final-cta-section").then((module) => ({
    default: module.FinalCtaSection,
  }))
);

export default function LandingPage() {
  const stickyCtaContent = getStickyCtaContent();

  return (
    <PageShell showHeaderCta={false}>
      <MetaPixelViewContent />
      <section className="hero-band">
        <div className="container-shell grid items-start gap-6 py-7 sm:py-9 lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:gap-12 lg:py-14">
          <HeroSection />
          <RegistrationSection />
        </div>
      </section>
      <TrustedBySection />
      <PainSection />
      <AgendaSection />
      <TakeawaysSection />
      <SpeakerSection />
      <TestimonialsSection />
      <FaqSection />
      <FinalCtaSection />
      <StickyBottomCtaDynamic {...stickyCtaContent} />
    </PageShell>
  );
}
