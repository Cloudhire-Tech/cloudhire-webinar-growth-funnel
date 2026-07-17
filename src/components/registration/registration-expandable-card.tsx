import { RegistrationForm } from "@/components/registration/registration-form";
import { RegistrationProofRow } from "@/components/registration/registration-proof-row";
import { registrationContent } from "@/content/registration";
import { getWebinarDetails } from "@/content/webinar";
import {
  WEBINAR_ORIGINAL_PRICE_INR,
  WEBINAR_PAYMENT_AMOUNT_INR,
} from "@/lib/payment/pricing";

export function RegistrationExpandableCard() {
  const webinar = getWebinarDetails();

  return (
    <div className="registration-card">
      <p className="text-muted-foreground mb-2 text-center text-xs leading-relaxed sm:text-sm">
        Next live session:{" "}
        <span className="text-foreground font-semibold">
          {webinar.date} · {webinar.time}
        </span>
      </p>
      <p className="mb-4 text-center text-sm">
        <span className="text-muted-foreground mr-2 line-through">
          ₹{WEBINAR_ORIGINAL_PRICE_INR}
        </span>
        <span className="text-foreground text-lg font-semibold">
          ₹{WEBINAR_PAYMENT_AMOUNT_INR}
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
