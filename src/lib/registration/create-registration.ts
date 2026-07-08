import {
  insertWebinarRegistration,
  isDuplicateRegistrationError,
} from "@/lib/db/webinar-registrations";
import { getUpcomingWebinarSession } from "@/lib/webinar-schedule";
import {
  normalizeRegistrationEmail,
  normalizeRegistrationMobile,
  registrationSchema,
  type RegistrationFormValues,
} from "@/lib/validations/registration";
import {
  RegistrationError,
  type WebinarRegistrationRecord,
} from "@/types/registration";

export type CreateRegistrationResult = {
  registration: WebinarRegistrationRecord;
};

export async function createWebinarRegistration(
  input: RegistrationFormValues,
  options?: { source?: string; referenceDate?: Date }
): Promise<CreateRegistrationResult> {
  const parsed = registrationSchema.safeParse(input);

  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0]?.message ?? "Invalid registration data.";

    throw new RegistrationError(firstIssue, "VALIDATION_ERROR", 400);
  }

  const session = getUpcomingWebinarSession(options?.referenceDate);
  const email = normalizeRegistrationEmail(parsed.data.email);
  const whatsappNumber = normalizeRegistrationMobile(parsed.data.mobile);

  try {
    const registration = await insertWebinarRegistration({
      fullName: parsed.data.fullName.trim(),
      email,
      whatsappNumber,
      webinarDate: session.isoDate,
      webinarTime: session.time,
      webinarJoinUrl: session.joinUrl,
      source: options?.source ?? "webinar_landing_page",
    });

    return { registration };
  } catch (error) {
    if (isDuplicateRegistrationError(error)) {
      throw new RegistrationError(
        "You're already registered for this week's webinar. Please check your email for your confirmation details.",
        "DUPLICATE_REGISTRATION",
        409
      );
    }

    console.error("Failed to save webinar registration", error);

    throw new RegistrationError(
      "We couldn't save your registration right now. Please try again in a moment.",
      "DATABASE_ERROR",
      500
    );
  }
}
