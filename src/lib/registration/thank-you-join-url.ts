import { getWebinarRegistrationById } from "@/lib/db/webinar-registrations";
import { getWebinarDetails } from "@/content/webinar";

export async function getThankYouJoinUrl(
  registrationId?: string | null
): Promise<string> {
  const fallbackJoinUrl = getWebinarDetails().joinUrl;

  if (!registrationId?.trim()) {
    return fallbackJoinUrl;
  }

  const registration = await getWebinarRegistrationById(registrationId.trim());

  if (registration?.zoho_join_url?.trim()) {
    return registration.zoho_join_url.trim();
  }

  if (registration?.webinar_join_url?.trim()) {
    return registration.webinar_join_url.trim();
  }

  return fallbackJoinUrl;
}
