export type RazorpayServerConfig = {
  keyId: string;
  keySecret: string;
  webhookSecret?: string;
};

export function getRazorpayKeyId(): string | null {
  return (
    process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID?.trim() ||
    process.env.RAZORPAY_KEY_ID?.trim() ||
    null
  );
}

export function getRazorpayServerConfig(): RazorpayServerConfig | null {
  const keyId = getRazorpayKeyId();
  const keySecret = process.env.RAZORPAY_KEY_SECRET?.trim();

  if (!keyId || !keySecret) {
    return null;
  }

  return {
    keyId,
    keySecret,
    webhookSecret: process.env.RAZORPAY_WEBHOOK_SECRET?.trim() || undefined,
  };
}

/** True when checkout + verify can run (key id + secret). Webhook secret is optional. */
export function isRazorpayConfigured() {
  return getRazorpayServerConfig() !== null;
}

export function isRazorpayWebhookConfigured() {
  return Boolean(getRazorpayServerConfig()?.webhookSecret);
}
