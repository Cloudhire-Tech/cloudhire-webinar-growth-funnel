import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  getUpcomingWebinarSession,
  generateWebinarIcs,
} from "./webinar-schedule.ts";

function istDate(
  year: number,
  month: number,
  day: number,
  hour = 0,
  minute = 0
) {
  const offset = "+05:30";
  const monthString = String(month).padStart(2, "0");
  const dayString = String(day).padStart(2, "0");
  const hourString = String(hour).padStart(2, "0");
  const minuteString = String(minute).padStart(2, "0");

  return new Date(
    `${year}-${monthString}-${dayString}T${hourString}:${minuteString}:00${offset}`
  );
}

describe("getUpcomingWebinarSession", () => {
  it("shows this Saturday before 12:00 PM IST on Saturday", () => {
    const session = getUpcomingWebinarSession(istDate(2026, 7, 11, 11, 59));

    assert.equal(session.isoDate, "2026-07-11");
    assert.equal(session.time, "12:00 PM IST");
  });

  it("switches to next Saturday at exactly 12:00 PM IST", () => {
    const session = getUpcomingWebinarSession(istDate(2026, 7, 11, 12, 0));

    assert.equal(session.isoDate, "2026-07-18");
  });

  it("shows next Saturday after the current session has started", () => {
    const session = getUpcomingWebinarSession(istDate(2026, 7, 11, 13, 30));

    assert.equal(session.isoDate, "2026-07-18");
  });

  it("shows the upcoming Saturday on the prior Wednesday", () => {
    const session = getUpcomingWebinarSession(istDate(2026, 7, 8, 15, 0));

    assert.equal(session.isoDate, "2026-07-11");
  });

  it("shows next Saturday on Sunday", () => {
    const session = getUpcomingWebinarSession(istDate(2026, 7, 12, 10, 0));

    assert.equal(session.isoDate, "2026-07-18");
  });
});

describe("generateWebinarIcs", () => {
  it("includes the join URL and session timing", () => {
    const session = getUpcomingWebinarSession(istDate(2026, 7, 8, 15, 0));
    const ics = generateWebinarIcs(session);

    assert.match(ics, /BEGIN:VCALENDAR/);
    assert.match(ics, /https:\/\/live\.zoho\.in\/bqfz-nvu-trb/);
    assert.match(ics, /DTSTART;TZID=Asia\/Kolkata:20260711T120000/);
    assert.match(ics, /DTEND;TZID=Asia\/Kolkata:20260711T130000/);
  });
});
