import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { faqContent } from "../../content/faq.ts";
import { registrationContent } from "../../content/registration.ts";
import { siteConfig } from "../../content/site-config.ts";
import {
  getFinalCtaContent,
  getStickyCtaContent,
} from "../../content/webinar.ts";
import { isPaidRegistration } from "../db/webinar-registrations.ts";

describe("paid webinar copy", () => {
  it("keeps landing CTAs generic without visible ₹9 pricing", () => {
    const sticky = getStickyCtaContent(new Date("2026-07-17T10:00:00+05:30"));
    const finalCta = getFinalCtaContent(new Date("2026-07-17T10:00:00+05:30"));

    assert.doesNotMatch(sticky.line1, /₹9/);
    assert.doesNotMatch(sticky.button, /₹9/);
    assert.doesNotMatch(finalCta.button, /₹9/);
    assert.doesNotMatch(finalCta.microcopy, /₹9/);
    assert.doesNotMatch(registrationContent.submitLabel, /₹9/);
    assert.equal(faqContent.items[0]?.question, "How much does the webinar cost?");
    assert.doesNotMatch(faqContent.items[0]?.answer ?? "", /₹9/);
    assert.doesNotMatch(siteConfig.description, /₹9/);
    assert.doesNotMatch(siteConfig.description, /free seat/i);
    assert.doesNotMatch(sticky.line1, /\bFREE\b/);
    assert.doesNotMatch(registrationContent.proofText, /100% free/i);
    assert.equal(registrationContent.submitLabel, "Reserve My Seat →");
  });
});

describe("payment gate helpers", () => {
  it("treats only payment_status=paid as paid", () => {
    assert.equal(isPaidRegistration({ payment_status: "paid" }), true);
    assert.equal(isPaidRegistration({ payment_status: "pending" }), false);
    assert.equal(isPaidRegistration({ payment_status: "failed" }), false);
    assert.equal(isPaidRegistration(null), false);
  });
});
