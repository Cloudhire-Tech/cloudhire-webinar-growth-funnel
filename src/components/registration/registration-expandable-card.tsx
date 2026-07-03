import { RegistrationForm } from "@/components/registration/registration-form";
import { RegistrationProofRow } from "@/components/registration/registration-proof-row";
import { registrationContent } from "@/content/registration";

export function RegistrationExpandableCard() {
  return (
    <div className="registration-card">
      <RegistrationForm />
      <RegistrationProofRow />
      <p className="text-muted-foreground mt-3 text-center text-xs leading-relaxed">
        {registrationContent.microcopy}
      </p>
    </div>
  );
}
