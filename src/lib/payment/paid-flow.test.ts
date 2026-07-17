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
  it("removes Free webinar messaging from CTAs and FAQ", () => {
    const sticky = getStickyCtaContent(new Date("2026-07-17T10:00:00+05:30"));
    const finalCta = getFinalCtaContent(new Date("2026-07-17T10:00:00+05:30"));

    assert.match(sticky.line1, /₹199 → ₹9/);
    assert.match(sticky.button, /₹9/);
    assert.match(finalCta.button, /₹9/);
    assert.match(finalCta.microcopy, /₹9/);
    assert.match(registrationContent.submitLabel, /₹9/);
    assert.equal(faqContent.items[0]?.question, "How much does the webinar cost?");
    assert.match(faqContent.items[0]?.answer ?? "", /₹9/);
    assert.doesNotMatch(siteConfig.description, /free seat/i);
    assert.doesNotMatch(sticky.line1, /\bFREE\b/);
    assert.doesNotMatch(registrationContent.proofText, /100% free/i);
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
