import {
  getUpcomingWebinarSession,
  WEBINAR_CONFIG,
  type WebinarSession,
} from "@/lib/webinar-schedule";
import {
  WEBINAR_ORIGINAL_PRICE_INR,
  WEBINAR_PAYMENT_AMOUNT_INR,
} from "@/lib/payment/pricing";

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
    line1: `₹${WEBINAR_ORIGINAL_PRICE_INR} → ₹${WEBINAR_PAYMENT_AMOUNT_INR} · ${webinar.dateSticky} · ${webinar.timeSticky}`,
    line2: "Seats filling fast",
    button: "Reserve Seat ₹9 →",
  } as const;
}

export function getFinalCtaContent(referenceDate: Date = new Date()) {
  const webinar = getWebinarDetails(referenceDate);

  return {
    heading:
      "Every week you apply by hand is a week of roles you never reached.",
    body: "Join hundreds of Indian professionals who put their applications on autopilot.",
    button: "Reserve My Seat ₹9 →",
    microcopy: `${webinar.date} · ${webinar.time} · ₹${WEBINAR_PAYMENT_AMOUNT_INR} · Seats capped`,
  } as const;
}
