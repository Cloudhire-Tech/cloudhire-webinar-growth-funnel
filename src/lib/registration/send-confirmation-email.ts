import type { CreateRegistrationResult } from "@/lib/registration/create-registration";
import { getWebinarEmailContext } from "@/lib/webinar-schedule";
import type { WebinarRegistrationRecord } from "@/types/registration";

export async function sendRegistrationConfirmationEmail(
  registration: WebinarRegistrationRecord
) {
  const emailContext = getWebinarEmailContext(new Date(registration.registered_at));

  // Resend integration will plug in here next.
  console.info("Registration confirmation email queued", {
    to: registration.email,
    subject: emailContext.subject,
    webinarDate: registration.webinar_date,
    joinUrl: registration.webinar_join_url,
  });

  return {
    queued: true,
    provider: "resend",
    status: "pending_integration" as const,
  };
}

export async function handleRegistrationSideEffects(
  result: CreateRegistrationResult
) {
  await sendRegistrationConfirmationEmail(result.registration);
}
