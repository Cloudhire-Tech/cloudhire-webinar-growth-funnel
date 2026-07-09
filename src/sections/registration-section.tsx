import { RegistrationExpandableCard } from "@/components/registration/registration-expandable-card";
import { RegistrationHashScroll } from "@/components/registration/registration-hash-scroll";

export function RegistrationSection() {
  return (
    <RegistrationHashScroll>
      <div id="register" className="scroll-mt-24 lg:scroll-mt-28">
        <RegistrationExpandableCard />
      </div>
    </RegistrationHashScroll>
  );
}
