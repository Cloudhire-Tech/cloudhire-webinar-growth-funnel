import {
  getWebinarRegistrationById,
  isPaidRegistration,
} from "@/lib/db/webinar-registrations";
import { getThankYouJoinUrl } from "@/lib/registration/thank-you-join-url";
import {
  generateWebinarIcs,
  getUpcomingWebinarSession,
} from "@/lib/webinar-schedule";

export async function GET(request: Request) {
  const registrationId = new URL(request.url).searchParams.get("registration");

  if (!registrationId?.trim()) {
    return new Response("Registration required.", { status: 400 });
  }

  const registration = await getWebinarRegistrationById(registrationId.trim());

  if (!isPaidRegistration(registration)) {
    return new Response("Payment required before calendar download.", {
      status: 402,
    });
  }

  const session = getUpcomingWebinarSession();
  const joinUrl = await getThankYouJoinUrl(registrationId);

  if (!joinUrl) {
    return new Response("Join link unavailable.", { status: 404 });
  }

  const ics = generateWebinarIcs({ ...session, joinUrl });

  return new Response(ics, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": 'attachment; filename="cloudhire-webinar.ics"',
      "Cache-Control": "no-store",
    },
  });
}
