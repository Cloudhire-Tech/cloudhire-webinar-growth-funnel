import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  getSessionIsoDate,
  pickWebinarSessionForDate,
} from "./webinar.ts";

describe("pickWebinarSessionForDate", () => {
  it("matches a recurring session by ISO date and series uId", () => {
    const sessions = [
      {
        uId: "1434099000000568040",
        meetingKey: "1312483064",
        sysId: "1434099000000568106",
        startTimeMillis: "1787985000000",
        registrationLink: "https://live.zoho.in/bqfz-nvu-trb",
      },
      {
        uId: "1434099000000568040",
        meetingKey: "1335067622",
        sysId: "1434099000000568175",
        startTimeMillis: "1784125800000",
        registrationLink: "https://live.zoho.in/bqfz-nvu-trb",
      },
    ];

    const match = pickWebinarSessionForDate(
      sessions,
      "2026-07-15",
      "1434099000000568040"
    );

    assert.equal(match?.meetingKey, "1335067622");
    assert.equal(match?.sysId, "1434099000000568175");
  });

  it("derives the session ISO date in IST", () => {
    assert.equal(
      getSessionIsoDate({ startTimeMillis: "1784125800000" }),
      "2026-07-15"
    );
  });
});
