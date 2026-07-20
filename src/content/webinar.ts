import {
  getUpcomingWebinarSession,
  WEBINAR_CONFIG,
  type WebinarSession,
} from "@/lib/webinar-schedule";

export type WebinarDetails = WebinarSession & {
  seatsLabel: string;
};

export function getWebinarDetails(
  referenceDate: Date = new Date()
): WebinarDetails {
  return {
    ...getUpcomingWebinarSession(referenceDate),
    seatsLabel: WEBINAR_CONFIG.seatsLabel,
  };
}

export function getStickyCtaContent(referenceDate: Date = new Date()) {
  const webinar = getWebinarDetails(referenceDate);

  return {
    line1: `${webinar.dateSticky} · ${webinar.timeSticky}`,
    line2: "Seats filling fast",
    button: "Reserve Seat →",
  } as const;
}

export function getFinalCtaContent(referenceDate: Date = new Date()) {
  const webinar = getWebinarDetails(referenceDate);

  return {
    heading:
      "Every week you apply by hand is a week of roles you never reached.",
    body: "Join hundreds of Indian professionals who put their applications on autopilot.",
    button: "Reserve My Seat →",
    microcopy: `${webinar.date} · ${webinar.time} · Seats capped`,
  } as const;
}
