import assert from "node:assert/strict";
import { createHmac } from "node:crypto";
import { describe, it } from "node:test";

import {
  verifyCheckoutPaymentSignature,
  verifyWebhookSignature,
} from "./razorpay.ts";
import {
  WEBINAR_ORIGINAL_PRICE_INR,
  WEBINAR_PAYMENT_AMOUNT_INR,
  getWebinarPaymentAmountPaise,
} from "./pricing.ts";

describe("Razorpay signature verification", () => {
  it("accepts a valid checkout payment signature", () => {
    const keySecret = "test_secret";
    const orderId = "order_ABC";
    const paymentId = "pay_XYZ";
    const signature = createHmac("sha256", keySecret)
      .update(`${orderId}|${paymentId}`)
      .digest("hex");

    assert.equal(
      verifyCheckoutPaymentSignature({
        orderId,
        paymentId,
        signature,
        keySecret,
      }),
      true
    );
  });

  it("rejects an invalid checkout payment signature", () => {
    assert.equal(
      verifyCheckoutPaymentSignature({
        orderId: "order_ABC",
        paymentId: "pay_XYZ",
        signature: "deadbeef",
        keySecret: "test_secret",
      }),
      false
    );
  });

  it("accepts a valid webhook signature over the raw body", () => {
    const webhookSecret = "whsec_test";
    const rawBody = JSON.stringify({ event: "payment.captured" });
    const signature = createHmac("sha256", webhookSecret)
      .update(rawBody)
      .digest("hex");

    assert.equal(
      verifyWebhookSignature({ rawBody, signature, webhookSecret }),
      true
    );
  });

  it("rejects a tampered webhook body", () => {
    const webhookSecret = "whsec_test";
    const signature = createHmac("sha256", webhookSecret)
      .update('{"event":"payment.captured"}')
      .digest("hex");

    assert.equal(
      verifyWebhookSignature({
        rawBody: '{"event":"payment.failed"}',
        signature,
        webhookSecret,
      }),
      false
    );
  });
});

describe("webinar pricing", () => {
  it("keeps ₹199 → ₹9 and Razorpay paise amount aligned", () => {
    assert.equal(WEBINAR_ORIGINAL_PRICE_INR, 199);
    assert.equal(WEBINAR_PAYMENT_AMOUNT_INR, 9);
    assert.equal(getWebinarPaymentAmountPaise(), 900);
  });
});

describe("Razorpay config without webhook", () => {
  it("treats key id + secret as sufficient configuration", async () => {
    const previous = {
      keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      keySecret: process.env.RAZORPAY_KEY_SECRET,
      webhookSecret: process.env.RAZORPAY_WEBHOOK_SECRET,
    };

    process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID = "rzp_test_key";
    process.env.RAZORPAY_KEY_SECRET = "test_secret";
    delete process.env.RAZORPAY_WEBHOOK_SECRET;

    const { getRazorpayServerConfig, isRazorpayConfigured, isRazorpayWebhookConfigured } =
      await import("./config.ts");

    assert.equal(isRazorpayConfigured(), true);
    assert.equal(isRazorpayWebhookConfigured(), false);
    assert.equal(getRazorpayServerConfig()?.webhookSecret, undefined);

    if (previous.keyId === undefined) {
      delete process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    } else {
      process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID = previous.keyId;
    }

    if (previous.keySecret === undefined) {
      delete process.env.RAZORPAY_KEY_SECRET;
    } else {
      process.env.RAZORPAY_KEY_SECRET = previous.keySecret;
    }

    if (previous.webhookSecret === undefined) {
      delete process.env.RAZORPAY_WEBHOOK_SECRET;
    } else {
      process.env.RAZORPAY_WEBHOOK_SECRET = previous.webhookSecret;
    }
  });
});
