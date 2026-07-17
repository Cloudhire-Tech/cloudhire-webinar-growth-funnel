import { createHmac, timingSafeEqual } from "node:crypto";

import { getRazorpayServerConfig } from "@/lib/payment/config";
import {
  getWebinarPaymentAmountPaise,
  WEBINAR_PAYMENT_CURRENCY,
} from "@/lib/payment/pricing";

const RAZORPAY_ORDERS_URL = "https://api.razorpay.com/v1/orders";

export type RazorpayOrder = {
  id: string;
  amount: number;
  currency: string;
  receipt: string;
  status: string;
};

function getAuthHeader(keyId: string, keySecret: string) {
  const token = Buffer.from(`${keyId}:${keySecret}`).toString("base64");
  return `Basic ${token}`;
}

function safeEqualHex(a: string, b: string) {
  const aBuffer = Buffer.from(a);
  const bBuffer = Buffer.from(b);

  if (aBuffer.length !== bBuffer.length) {
    return false;
  }

  return timingSafeEqual(aBuffer, bBuffer);
}

export function verifyCheckoutPaymentSignature(input: {
  orderId: string;
  paymentId: string;
  signature: string;
  keySecret: string;
}) {
  const expected = createHmac("sha256", input.keySecret)
    .update(`${input.orderId}|${input.paymentId}`)
    .digest("hex");

  return safeEqualHex(expected, input.signature);
}

export function verifyWebhookSignature(input: {
  rawBody: string;
  signature: string;
  webhookSecret: string;
}) {
  const expected = createHmac("sha256", input.webhookSecret)
    .update(input.rawBody)
    .digest("hex");

  return safeEqualHex(expected, input.signature);
}

export async function createRazorpayOrder(input: {
  receipt: string;
  notes?: Record<string, string>;
}): Promise<RazorpayOrder> {
  const config = getRazorpayServerConfig();

  if (!config) {
    throw new Error("Razorpay is not configured.");
  }

  const response = await fetch(RAZORPAY_ORDERS_URL, {
    method: "POST",
    headers: {
      Authorization: getAuthHeader(config.keyId, config.keySecret),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: getWebinarPaymentAmountPaise(),
      currency: WEBINAR_PAYMENT_CURRENCY,
      receipt: input.receipt.slice(0, 40),
      notes: input.notes,
    }),
    cache: "no-store",
  });

  const payload = (await response.json()) as RazorpayOrder & {
    error?: { description?: string; code?: string };
  };

  if (!response.ok || !payload.id) {
    throw new Error(
      payload.error?.description ??
        `Failed to create Razorpay order (${response.status})`
    );
  }

  return {
    id: payload.id,
    amount: payload.amount,
    currency: payload.currency,
    receipt: payload.receipt,
    status: payload.status,
  };
}
