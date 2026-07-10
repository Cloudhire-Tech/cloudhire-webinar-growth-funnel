import {
  updateWebinarRegistrationZohoDetails,
  type UpdateWebinarRegistrationZohoDetailsInput,
} from "@/lib/db/webinar-registrations";
import { getZohoOAuthClientConfig, getZohoRefreshToken } from "@/lib/zoho/config";
import { isZohoWebinarConfigured } from "@/lib/zoho/webinar-config";
import { registerZohoWebinarAttendee } from "@/lib/zoho/webinar";
import type { WebinarRegistrationRecord } from "@/types/registration";

export async function syncRegistrationToZohoWebinar(
  registration: WebinarRegistrationRecord
): Promise<void> {
  if (!isZohoWebinarConfigured()) {
    console.warn("Zoho Webinar sync skipped: webinar configuration is missing", {
      registrationId: registration.id,
      email: registration.email,
    });
    return;
  }

  if (!getZohoOAuthClientConfig() || !getZohoRefreshToken()) {
    console.warn("Zoho Webinar sync skipped: OAuth refresh token is missing", {
      registrationId: registration.id,
      email: registration.email,
    });
    return;
  }

  try {
    const zohoRegistration = await registerZohoWebinarAttendee({
      email: registration.email,
      fullName: registration.full_name,
      webinarDate: registration.webinar_date,
    });

    const update: UpdateWebinarRegistrationZohoDetailsInput = {
      zohoWebinarId: zohoRegistration.webinarId,
      zohoAttendeeId: zohoRegistration.attendeeId,
      zohoJoinUrl: zohoRegistration.joinUrl,
      zohoRegistrationStatus: zohoRegistration.status,
    };

    await updateWebinarRegistrationZohoDetails(registration.id, update);

    console.info("Zoho Webinar registration completed", {
      registrationId: registration.id,
      email: registration.email,
      zohoWebinarId: update.zohoWebinarId,
      zohoAttendeeId: update.zohoAttendeeId,
    });
  } catch (error) {
    console.error("Zoho Webinar registration failed", {
      registrationId: registration.id,
      email: registration.email,
      error,
    });

    try {
      await updateWebinarRegistrationZohoDetails(registration.id, {
        zohoRegistrationStatus: "failed",
      });
    } catch (updateError) {
      console.error("Failed to mark Zoho registration as failed in Supabase", {
        registrationId: registration.id,
        email: registration.email,
        error: updateError,
      });
    }
  }
}
