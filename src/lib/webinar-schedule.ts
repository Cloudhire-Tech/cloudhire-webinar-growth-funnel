import {
  addDays,
  addMinutes,
  addWeeks,
  format,
  setHours,
  setMilliseconds,
  setMinutes,
  setSeconds,
  startOfDay,
} from "date-fns";
import { fromZonedTime, toZonedTime } from "date-fns-tz";

export const WEBINAR_CONFIG = {
  timezone: "Asia/Kolkata",
  timezoneLabel: "IST",
  dayOfWeek: 6,
  startHour: 12,
  startMinute: 0,
  durationMinutes: 60,
  /** First recurring Saturday webinar in the series (ISO date, interpreted in IST). */
  seriesStartDate: "2026-07-18",
  joinUrl: "https://live.zoho.in/bqfz-nvu-trb",
  platform: "Zoho Live",
  seatsLabel: "Filling fast",
  title: "CloudHire Weekly Webinar",
  description:
    "Live masterclass on putting your job applications on autopilot.",
} as const;

/** One-time override shown until this session starts, then recurring Saturdays resume. */
export const SPECIAL_WEBINAR_OVERRIDE = {
  isoDate: "2026-07-15",
  startHour: 20,
  startMinute: 0,
} as const;

export type WebinarSession = {
  startAt: Date;
  endAt: Date;
  isoDate: string;
  date: string;
  dateShort: string;
  dateSticky: string;
  time: string;
  timeSticky: string;
  duration: string;
  durationShort: string;
  durationMinutes: number;
  joinUrl: string;
  platform: string;
  timezone: string;
  title: string;
  description: string;
};

function buildSessionStartInTimezone(baseDateInTimezone: Date): Date {
  const saturdayDate = startOfDay(baseDateInTimezone);
  const daysUntilSaturday =
    (WEBINAR_CONFIG.dayOfWeek - saturdayDate.getDay() + 7) % 7;
  const sessionDay = addDays(saturdayDate, daysUntilSaturday);

  const sessionStartInTimezone = setMilliseconds(
    setSeconds(
      setMinutes(
        setHours(sessionDay, WEBINAR_CONFIG.startHour),
        WEBINAR_CONFIG.startMinute
      ),
      0
    ),
    0
  );

  return fromZonedTime(sessionStartInTimezone, WEBINAR_CONFIG.timezone);
}

function getSeriesStartSessionStart(): Date {
  const hourString = String(WEBINAR_CONFIG.startHour).padStart(2, "0");
  const minuteString = String(WEBINAR_CONFIG.startMinute).padStart(2, "0");

  return new Date(
    `${WEBINAR_CONFIG.seriesStartDate}T${hourString}:${minuteString}:00+05:30`
  );
}

function getSpecialSessionStart(): Date {
  const hourString = String(SPECIAL_WEBINAR_OVERRIDE.startHour).padStart(2, "0");
  const minuteString = String(SPECIAL_WEBINAR_OVERRIDE.startMinute).padStart(
    2,
    "0"
  );

  return new Date(
    `${SPECIAL_WEBINAR_OVERRIDE.isoDate}T${hourString}:${minuteString}:00+05:30`
  );
}

function formatSession(sessionStart: Date): WebinarSession {
  const sessionEnd = addMinutes(sessionStart, WEBINAR_CONFIG.durationMinutes);
  const sessionStartInTimezone = toZonedTime(
    sessionStart,
    WEBINAR_CONFIG.timezone
  );

  const date = format(sessionStartInTimezone, "EEE, d MMMM");
  const dateSticky = format(sessionStartInTimezone, "EEE d MMMM").toUpperCase();
  const time = `${format(sessionStartInTimezone, "h:mm a")} ${WEBINAR_CONFIG.timezoneLabel}`;
  const timeSticky = `${format(sessionStartInTimezone, "h a").toUpperCase()} ${WEBINAR_CONFIG.timezoneLabel}`;

  return {
    startAt: sessionStart,
    endAt: sessionEnd,
    isoDate: format(sessionStartInTimezone, "yyyy-MM-dd"),
    date,
    dateShort: date,
    dateSticky,
    time,
    timeSticky,
    duration: `${WEBINAR_CONFIG.durationMinutes} minutes`,
    durationShort: `${WEBINAR_CONFIG.durationMinutes} min`,
    durationMinutes: WEBINAR_CONFIG.durationMinutes,
    joinUrl: WEBINAR_CONFIG.joinUrl,
    platform: WEBINAR_CONFIG.platform,
    timezone: WEBINAR_CONFIG.timezoneLabel,
    title: WEBINAR_CONFIG.title,
    description: WEBINAR_CONFIG.description,
  };
}

function getRecurringSaturdaySession(referenceDate: Date): WebinarSession {
  const seriesStart = getSeriesStartSessionStart();

  if (referenceDate.getTime() < seriesStart.getTime()) {
    return formatSession(seriesStart);
  }

  const referenceInTimezone = toZonedTime(
    referenceDate,
    WEBINAR_CONFIG.timezone
  );
  let sessionStart = buildSessionStartInTimezone(referenceInTimezone);

  if (referenceDate.getTime() >= sessionStart.getTime()) {
    sessionStart = addWeeks(sessionStart, 1);
  }

  return formatSession(sessionStart);
}

export function getUpcomingWebinarSession(
  referenceDate: Date = new Date()
): WebinarSession {
  const specialSessionStart = getSpecialSessionStart();

  if (referenceDate.getTime() < specialSessionStart.getTime()) {
    return formatSession(specialSessionStart);
  }

  return getRecurringSaturdaySession(referenceDate);
}

function formatIcsTimestamp(date: Date): string {
  return format(toZonedTime(date, WEBINAR_CONFIG.timezone), "yyyyMMdd'T'HHmmss");
}

function formatIcsUtcTimestamp(date: Date): string {
  return format(date, "yyyyMMdd'T'HHmmss'Z'");
}

function escapeIcsText(value: string): string {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
}

export function generateWebinarIcs(session: WebinarSession): string {
  const now = new Date();

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//CloudHire//Webinar//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:webinar-${session.isoDate}@cloudhire.ai`,
    `DTSTAMP:${formatIcsUtcTimestamp(now)}`,
    `DTSTART;TZID=${WEBINAR_CONFIG.timezone}:${formatIcsTimestamp(session.startAt)}`,
    `DTEND;TZID=${WEBINAR_CONFIG.timezone}:${formatIcsTimestamp(session.endAt)}`,
    `SUMMARY:${escapeIcsText(session.title)}`,
    `DESCRIPTION:${escapeIcsText(session.description)}`,
    `URL:${session.joinUrl}`,
    `LOCATION:${escapeIcsText(session.joinUrl)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

export function getWebinarEmailContext(referenceDate: Date = new Date()) {
  const session = getUpcomingWebinarSession(referenceDate);

  return {
    session,
    subject: `You're registered for ${session.title}`,
    joinUrl: session.joinUrl,
    date: session.date,
    time: session.time,
    duration: session.duration,
    platform: session.platform,
  };
}
