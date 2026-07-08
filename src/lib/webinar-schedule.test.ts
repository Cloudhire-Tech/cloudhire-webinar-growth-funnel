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
  it("shows the series launch date before 18 July 2026 12:00 PM IST", () => {
    const session = getUpcomingWebinarSession(istDate(2026, 7, 8, 15, 0));

    assert.equal(session.isoDate, "2026-07-18");
    assert.equal(session.time, "12:00 PM IST");
  });

  it("shows 18 July on the prior Saturday instead of an earlier week", () => {
    const session = getUpcomingWebinarSession(istDate(2026, 7, 11, 11, 59));

    assert.equal(session.isoDate, "2026-07-18");
  });

  it("shows 18 July before 12:00 PM IST on launch day", () => {
    const session = getUpcomingWebinarSession(istDate(2026, 7, 18, 11, 59));

    assert.equal(session.isoDate, "2026-07-18");
  });

  it("switches to 25 July at exactly 12:00 PM IST on launch day", () => {
    const session = getUpcomingWebinarSession(istDate(2026, 7, 18, 12, 0));

    assert.equal(session.isoDate, "2026-07-25");
  });

  it("shows next Saturday after the launch session has started", () => {
    const session = getUpcomingWebinarSession(istDate(2026, 7, 18, 13, 30));

    assert.equal(session.isoDate, "2026-07-25");
  });

  it("shows 25 July on the Sunday after launch", () => {
    const session = getUpcomingWebinarSession(istDate(2026, 7, 19, 10, 0));

    assert.equal(session.isoDate, "2026-07-25");
  });

  it("continues weekly Saturday rollover at exactly 12:00 PM IST", () => {
    const session = getUpcomingWebinarSession(istDate(2026, 7, 25, 12, 0));

    assert.equal(session.isoDate, "2026-08-01");
  });
});

describe("generateWebinarIcs", () => {
  it("includes the join URL and session timing", () => {
    const session = getUpcomingWebinarSession(istDate(2026, 7, 8, 15, 0));
    const ics = generateWebinarIcs(session);

    assert.match(ics, /BEGIN:VCALENDAR/);
    assert.match(ics, /https:\/\/live\.zoho\.in\/bqfz-nvu-trb/);
    assert.match(ics, /DTSTART;TZID=Asia\/Kolkata:20260718T120000/);
    assert.match(ics, /DTEND;TZID=Asia\/Kolkata:20260718T130000/);
  });
});
