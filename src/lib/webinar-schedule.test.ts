import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  generateWebinarIcs,
  getUpcomingWebinarSession,
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
  it("shows the special Wednesday session before 15 July 2026 8:00 PM IST", () => {
    const session = getUpcomingWebinarSession(istDate(2026, 7, 8, 15, 0));

    assert.equal(session.isoDate, "2026-07-15");
    assert.equal(session.date, "Wed, 15 July");
    assert.equal(session.time, "8:00 PM IST");
  });

  it("shows the special session before 8:00 PM IST on 15 July", () => {
    const session = getUpcomingWebinarSession(istDate(2026, 7, 15, 19, 59));

    assert.equal(session.isoDate, "2026-07-15");
    assert.equal(session.time, "8:00 PM IST");
  });

  it("switches to the recurring Saturday schedule at exactly 8:00 PM IST on 15 July", () => {
    const session = getUpcomingWebinarSession(istDate(2026, 7, 15, 20, 0));

    assert.equal(session.isoDate, "2026-07-18");
    assert.equal(session.time, "12:00 PM IST");
  });

  it("shows the next Saturday after the special session has started", () => {
    const session = getUpcomingWebinarSession(istDate(2026, 7, 15, 21, 0));

    assert.equal(session.isoDate, "2026-07-18");
    assert.equal(session.time, "12:00 PM IST");
  });

  it("shows 18 July before 12:00 PM IST on the first recurring Saturday", () => {
    const session = getUpcomingWebinarSession(istDate(2026, 7, 18, 11, 59));

    assert.equal(session.isoDate, "2026-07-18");
    assert.equal(session.time, "12:00 PM IST");
  });

  it("switches to 25 July at exactly 12:00 PM IST on the first recurring Saturday", () => {
    const session = getUpcomingWebinarSession(istDate(2026, 7, 18, 12, 0));

    assert.equal(session.isoDate, "2026-07-25");
    assert.equal(session.time, "12:00 PM IST");
  });

  it("shows 25 July on the Sunday after the first recurring Saturday", () => {
    const session = getUpcomingWebinarSession(istDate(2026, 7, 19, 10, 0));

    assert.equal(session.isoDate, "2026-07-25");
  });

  it("continues weekly Saturday rollover at exactly 12:00 PM IST", () => {
    const session = getUpcomingWebinarSession(istDate(2026, 7, 25, 12, 0));

    assert.equal(session.isoDate, "2026-08-01");
    assert.equal(session.time, "12:00 PM IST");
  });
});

describe("generateWebinarIcs", () => {
  it("includes the join URL and special session timing", () => {
    const session = getUpcomingWebinarSession(istDate(2026, 7, 8, 15, 0));
    const ics = generateWebinarIcs(session);

    assert.match(ics, /BEGIN:VCALENDAR/);
    assert.match(ics, /https:\/\/live\.zoho\.in\/bqfz-nvu-trb/);
    assert.match(ics, /DTSTART;TZID=Asia\/Kolkata:20260715T200000/);
    assert.match(ics, /DTEND;TZID=Asia\/Kolkata:20260715T210000/);
  });

  it("includes recurring Saturday timing after the special session", () => {
    const session = getUpcomingWebinarSession(istDate(2026, 7, 16, 10, 0));
    const ics = generateWebinarIcs(session);

    assert.match(ics, /DTSTART;TZID=Asia\/Kolkata:20260718T120000/);
    assert.match(ics, /DTEND;TZID=Asia\/Kolkata:20260718T130000/);
  });
});
