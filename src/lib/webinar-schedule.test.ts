import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  getFinalCtaContent,
  getStickyCtaContent,
  getWebinarDetails,
} from "../content/webinar.ts";
import {
  generateWebinarIcs,
  getUpcomingWebinarSession,
  getWebinarEmailContext,
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
  it("shows Saturday 25 July before the series starts", () => {
    const session = getUpcomingWebinarSession(istDate(2026, 7, 17, 15, 0));

    assert.equal(session.isoDate, "2026-07-25");
    assert.equal(session.date, "Sat, 25 July");
    assert.equal(session.time, "12:00 PM IST");
  });

  it("shows 25 July on Friday before the series Saturday", () => {
    const session = getUpcomingWebinarSession(istDate(2026, 7, 24, 18, 0));

    assert.equal(session.isoDate, "2026-07-25");
    assert.equal(session.time, "12:00 PM IST");
  });

  it("shows 25 July before 12:00 PM IST on the series Saturday", () => {
    const session = getUpcomingWebinarSession(istDate(2026, 7, 25, 11, 59));

    assert.equal(session.isoDate, "2026-07-25");
    assert.equal(session.time, "12:00 PM IST");
  });

  it("switches to the following Saturday at exactly 12:00 PM IST on 25 July", () => {
    const session = getUpcomingWebinarSession(istDate(2026, 7, 25, 12, 0));

    assert.equal(session.isoDate, "2026-08-01");
    assert.equal(session.time, "12:00 PM IST");
  });

  it("shows the next Saturday after 25 July has started", () => {
    const session = getUpcomingWebinarSession(istDate(2026, 7, 25, 13, 0));

    assert.equal(session.isoDate, "2026-08-01");
    assert.equal(session.time, "12:00 PM IST");
  });

  it("shows the upcoming Saturday when today is Sunday through Friday", () => {
    assert.equal(
      getUpcomingWebinarSession(istDate(2026, 7, 26, 10, 0)).isoDate,
      "2026-08-01"
    );
    assert.equal(
      getUpcomingWebinarSession(istDate(2026, 7, 27, 10, 0)).isoDate,
      "2026-08-01"
    );
    assert.equal(
      getUpcomingWebinarSession(istDate(2026, 7, 28, 10, 0)).isoDate,
      "2026-08-01"
    );
    assert.equal(
      getUpcomingWebinarSession(istDate(2026, 7, 29, 10, 0)).isoDate,
      "2026-08-01"
    );
    assert.equal(
      getUpcomingWebinarSession(istDate(2026, 7, 30, 10, 0)).isoDate,
      "2026-08-01"
    );
    assert.equal(
      getUpcomingWebinarSession(istDate(2026, 7, 31, 10, 0)).isoDate,
      "2026-08-01"
    );
  });

  it("continues showing today's webinar on Saturday before 12:00 PM IST", () => {
    const session = getUpcomingWebinarSession(istDate(2026, 8, 1, 11, 0));

    assert.equal(session.isoDate, "2026-08-01");
    assert.equal(session.time, "12:00 PM IST");
  });

  it("moves to the following Saturday after 12:00 PM IST", () => {
    const session = getUpcomingWebinarSession(istDate(2026, 8, 1, 12, 0));

    assert.equal(session.isoDate, "2026-08-08");
    assert.equal(session.time, "12:00 PM IST");
  });

  it("continues weekly Saturday rollover later in the series", () => {
    const session = getUpcomingWebinarSession(istDate(2026, 8, 8, 12, 0));

    assert.equal(session.isoDate, "2026-08-15");
    assert.equal(session.time, "12:00 PM IST");
  });
});

describe("schedule consumers stay consistent", () => {
  it("keeps landing-page, registration, thank-you, email, and Zoho date fields aligned", () => {
    const referenceDate = istDate(2026, 7, 17, 14, 0);
    const session = getUpcomingWebinarSession(referenceDate);
    const details = getWebinarDetails(referenceDate);
    const sticky = getStickyCtaContent(referenceDate);
    const finalCta = getFinalCtaContent(referenceDate);
    const email = getWebinarEmailContext(referenceDate);

    assert.equal(session.isoDate, "2026-07-25");
    assert.equal(session.time, "12:00 PM IST");
    assert.equal(details.isoDate, "2026-07-25");
    assert.equal(details.time, "12:00 PM IST");
    assert.match(sticky.line1, /SAT 25 JULY/);
    assert.match(sticky.line1, /12 PM IST/);
    assert.match(finalCta.microcopy, /Sat, 25 July/);
    assert.match(finalCta.microcopy, /12:00 PM IST/);
    assert.equal(email.session.isoDate, "2026-07-25");
    assert.equal(email.date, "Sat, 25 July");
    assert.equal(email.time, "12:00 PM IST");
  });

  it("keeps ICS timing aligned with the upcoming session before 25 July", () => {
    const session = getUpcomingWebinarSession(istDate(2026, 7, 17, 15, 0));
    const ics = generateWebinarIcs(session);

    assert.match(ics, /BEGIN:VCALENDAR/);
    assert.match(ics, /https:\/\/live\.zoho\.in\/bqfz-nvu-trb/);
    assert.match(ics, /DTSTART;TZID=Asia\/Kolkata:20260725T120000/);
    assert.match(ics, /DTEND;TZID=Asia\/Kolkata:20260725T130000/);
  });

  it("keeps ICS timing aligned after the 25 July webinar has passed", () => {
    const session = getUpcomingWebinarSession(istDate(2026, 7, 26, 10, 0));
    const ics = generateWebinarIcs(session);
    const email = getWebinarEmailContext(istDate(2026, 7, 26, 10, 0));

    assert.equal(session.isoDate, "2026-08-01");
    assert.equal(email.session.isoDate, "2026-08-01");
    assert.match(ics, /DTSTART;TZID=Asia\/Kolkata:20260801T120000/);
    assert.match(ics, /DTEND;TZID=Asia\/Kolkata:20260801T130000/);
  });

  it("exposes the same webinar_date and webinar_time values registration would store", () => {
    const before = getUpcomingWebinarSession(istDate(2026, 7, 20, 9, 0));
    const onDayBeforeNoon = getUpcomingWebinarSession(
      istDate(2026, 7, 25, 11, 30)
    );
    const after = getUpcomingWebinarSession(istDate(2026, 7, 25, 12, 5));

    assert.deepEqual(
      { webinar_date: before.isoDate, webinar_time: before.time },
      { webinar_date: "2026-07-25", webinar_time: "12:00 PM IST" }
    );
    assert.deepEqual(
      {
        webinar_date: onDayBeforeNoon.isoDate,
        webinar_time: onDayBeforeNoon.time,
      },
      { webinar_date: "2026-07-25", webinar_time: "12:00 PM IST" }
    );
    assert.deepEqual(
      { webinar_date: after.isoDate, webinar_time: after.time },
      { webinar_date: "2026-08-01", webinar_time: "12:00 PM IST" }
    );
  });
});
