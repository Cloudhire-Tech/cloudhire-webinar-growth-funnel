import { PageShell } from "@/components/layout/page-shell";
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
      <HeroSection />
      <RegistrationSection />
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
