import { getThankYouJoinUrl } from "@/lib/registration/thank-you-join-url";
import {
  generateWebinarIcs,
  getUpcomingWebinarSession,
} from "@/lib/webinar-schedule";

export async function GET(request: Request) {
  const registration = new URL(request.url).searchParams.get("registration");
  const session = getUpcomingWebinarSession();
  const joinUrl = await getThankYouJoinUrl(registration);
  const ics = generateWebinarIcs({ ...session, joinUrl });

  return new Response(ics, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": 'attachment; filename="cloudhire-webinar.ics"',
      "Cache-Control": "no-store",
    },
  });
}
