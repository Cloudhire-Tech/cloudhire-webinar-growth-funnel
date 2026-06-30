import { RegistrationExpandableCard } from "@/components/registration/registration-expandable-card";
import { Section } from "@/components/section/section";

export function RegistrationSection() {
  return (
    <Section
      id="register"
      className="section-shell-tight scroll-mt-20 -mt-4 border-b border-orange-100/80 section-bg-alt pb-12 md:-mt-6 md:pb-14"
    >
      <RegistrationExpandableCard />
    </Section>
  );
}
