import { TrustedBySection } from "@/sections/trusted-by-section";
import { PageShell } from "@/components/layout/page-shell";
import { StickyBottomCta } from "@/components/layout/sticky-bottom-cta";
import { AgendaSection } from "@/sections/agenda-section";
import { FaqSection } from "@/sections/faq-section";
import { FinalCtaSection } from "@/sections/final-cta-section";
import { HeroSection } from "@/sections/hero-section";
import { PainSection } from "@/sections/pain-section";
import { RegistrationSection } from "@/sections/registration-section";
import { SpeakerSection } from "@/sections/speaker-section";
import { TakeawaysSection } from "@/sections/takeaways-section";
import { TestimonialsSection } from "@/sections/testimonials-section";
import { getStickyCtaContent } from "@/content/webinar";

export default function LandingPage() {
  const stickyCtaContent = getStickyCtaContent();

  return (
    <PageShell showHeaderCta={false}>
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
      <StickyBottomCta {...stickyCtaContent} />
    </PageShell>
  );
}
