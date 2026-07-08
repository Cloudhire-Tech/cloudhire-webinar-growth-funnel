import { siteConfig } from "@/content/site-config";
import {
  buildRegistrationConfirmationEmailHtml,
  buildRegistrationConfirmationEmailText,
  getRegistrationFirstName,
} from "@/lib/email/registration-confirmation-html";
import { getResendConfig, isResendConfigured } from "@/lib/email/resend-client";
import type { CreateRegistrationResult } from "@/lib/registration/create-registration";
import {
  generateWebinarIcs,
  getWebinarEmailContext,
} from "@/lib/webinar-schedule";
import type { WebinarRegistrationRecord } from "@/types/registration";

export type SendRegistrationConfirmationEmailResult =
  | {
      sent: true;
      provider: "resend";
      messageId: string;
    }
  | {
      sent: false;
      provider: "resend";
      reason: "not_configured" | "send_failed";
    };

export async function sendRegistrationConfirmationEmail(
  registration: WebinarRegistrationRecord
): Promise<SendRegistrationConfirmationEmailResult> {
  const emailContext = getWebinarEmailContext(
    new Date(registration.registered_at)
  );
  const { session, subject } = emailContext;

  if (!isResendConfigured()) {
    console.warn("Registration confirmation email skipped: Resend is not configured", {
      registrationId: registration.id,
      email: registration.email,
    });

    return {
      sent: false,
      provider: "resend",
      reason: "not_configured",
    };
  }

  const resendConfig = getResendConfig();

  if (!resendConfig) {
    console.warn("Registration confirmation email skipped: Resend config unavailable", {
      registrationId: registration.id,
      email: registration.email,
    });

    return {
      sent: false,
      provider: "resend",
      reason: "not_configured",
    };
  }

  const appUrl = siteConfig.url.replace(/\/$/, "");
  const calendarUrl = `${appUrl}/api/webinar/calendar`;
  const logoUrl = `${appUrl}/images/cloudhire-logo.png`;
  const icsContent = generateWebinarIcs(session);

  const emailContent = {
    firstName: getRegistrationFirstName(registration.full_name),
    session,
    calendarUrl,
    logoUrl,
  };

  try {
    const { data, error } = await resendConfig.client.emails.send({
      from: resendConfig.fromEmail,
      to: registration.email,
      subject,
      html: buildRegistrationConfirmationEmailHtml(emailContent),
      text: buildRegistrationConfirmationEmailText(emailContent),
      attachments: [
        {
          filename: "cloudhire-webinar.ics",
          content: Buffer.from(icsContent, "utf-8"),
        },
      ],
    });

    if (error) {
      console.error("Failed to send registration confirmation email", {
        registrationId: registration.id,
        email: registration.email,
        webinarDate: registration.webinar_date,
        error,
      });

      return {
        sent: false,
        provider: "resend",
        reason: "send_failed",
      };
    }

    console.info("Registration confirmation email sent", {
      registrationId: registration.id,
      email: registration.email,
      messageId: data?.id,
      webinarDate: session.isoDate,
    });

    return {
      sent: true,
      provider: "resend",
      messageId: data?.id ?? "unknown",
    };
  } catch (error) {
    console.error("Unexpected error sending registration confirmation email", {
      registrationId: registration.id,
      email: registration.email,
      webinarDate: registration.webinar_date,
      error,
    });

    return {
      sent: false,
      provider: "resend",
      reason: "send_failed",
    };
  }
}

export async function handleRegistrationSideEffects(
  result: CreateRegistrationResult
) {
  try {
    await sendRegistrationConfirmationEmail(result.registration);
  } catch (error) {
    console.error("Registration side effects failed after successful save", {
      registrationId: result.registration.id,
      email: result.registration.email,
      error,
    });
  }
}
