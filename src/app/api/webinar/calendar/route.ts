import {
  generateWebinarIcs,
  getUpcomingWebinarSession,
} from "@/lib/webinar-schedule";

export function GET() {
  const session = getUpcomingWebinarSession();
  const ics = generateWebinarIcs(session);

  return new Response(ics, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": 'attachment; filename="cloudhire-webinar.ics"',
      "Cache-Control": "no-store",
    },
  });
}
