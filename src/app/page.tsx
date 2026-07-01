import { PageShell } from "@/components/layout/page-shell";
import { TrustStatsBar } from "@/components/section/trust-stats-bar";
import { FaqSection } from "@/sections/faq-section";
import { FinalCtaSection } from "@/sections/final-cta-section";
import { HeroSection } from "@/sections/hero-section";
import { RegistrationSection } from "@/sections/registration-section";
import { ReviewsSection } from "@/sections/reviews-section";
import { SpeakerSection } from "@/sections/speaker-section";
import { WhatYoullLearnSection } from "@/sections/what-youll-learn-section";
import { WhyAttendSection } from "@/sections/why-attend-section";
import { WhyChooseCloudHireSection } from "@/sections/why-choose-cloudhire-section";

export default function LandingPage() {
  return (
    <PageShell>
      <section className="hero-band">
        <div className="container-shell grid items-center gap-10 py-12 md:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:py-20">
          <HeroSection />
          <RegistrationSection />
        </div>
        <TrustStatsBar />
      </section>
      <WhyAttendSection />
      <WhatYoullLearnSection />
      <WhyChooseCloudHireSection />
      <SpeakerSection />
      <ReviewsSection />
      <FaqSection />
      <FinalCtaSection />
    </PageShell>
  );
}
