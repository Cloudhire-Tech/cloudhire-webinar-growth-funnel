import {
  getWebinarRegistrationById,
  isPaidRegistration,
} from "@/lib/db/webinar-registrations";

/**
 * Returns the unique Zoho join URL only for paid registrations.
 * Unpaid / unknown registrations get no join link exposure.
 */
export async function getThankYouJoinUrl(
  registrationId?: string | null
): Promise<string | null> {
  if (!registrationId?.trim()) {
    return null;
  }

  const registration = await getWebinarRegistrationById(registrationId.trim());

  if (!isPaidRegistration(registration) || !registration) {
    return null;
  }

  if (registration.zoho_join_url?.trim()) {
    return registration.zoho_join_url.trim();
  }

  if (registration.webinar_join_url?.trim()) {
    return registration.webinar_join_url.trim();
  }

  return null;
}
