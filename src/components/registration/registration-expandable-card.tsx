import { RegistrationForm } from "@/components/registration/registration-form";
import { RegistrationProofRow } from "@/components/registration/registration-proof-row";
import { registrationContent } from "@/content/registration";
import { getWebinarDetails } from "@/content/webinar";

export function RegistrationExpandableCard() {
  const webinar = getWebinarDetails();

  return (
    <div className="registration-card">
      <p className="text-muted-foreground mb-4 text-center text-xs leading-relaxed sm:text-sm">
        Next live session:{" "}
        <span className="text-foreground font-semibold">
          {webinar.date} · {webinar.time}
        </span>
      </p>
      <RegistrationForm />
      <RegistrationProofRow />
      <p className="text-muted-foreground mt-3 text-center text-xs leading-relaxed">
        {registrationContent.microcopy}
      </p>
    </div>
  );
}
