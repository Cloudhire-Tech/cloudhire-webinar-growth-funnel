import {
  trackMetaPixelEvent,
  trackMetaPixelEventWithParams,
} from "@/components/analytics/meta-pixel-events";
import {
  WEBINAR_PAYMENT_AMOUNT_INR,
  WEBINAR_PAYMENT_CURRENCY,
} from "@/lib/payment/pricing";

type RazorpayCheckoutSuccessResponse = {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
};

type RazorpayCheckoutOptions = {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  handler: (response: RazorpayCheckoutSuccessResponse) => void;
  modal?: {
    ondismiss?: () => void;
  };
  theme?: {
    color?: string;
  };
};

type RazorpayInstance = {
  open: () => void;
  on: (event: string, handler: (response: unknown) => void) => void;
};

declare global {
  interface Window {
    Razorpay?: new (options: RazorpayCheckoutOptions) => RazorpayInstance;
  }
}

export type CheckoutOrderPayload = {
  registrationId: string;
  orderId: string;
  amount: number;
  currency: string;
  keyId: string;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
};

const RAZORPAY_SCRIPT_SRC = "https://checkout.razorpay.com/v1/checkout.js";

let razorpayScriptPromise: Promise<boolean> | null = null;

/** Prefetch the Razorpay Checkout script without opening checkout. */
export function preloadRazorpayScript(): Promise<boolean> {
  if (typeof window === "undefined") {
    return Promise.resolve(false);
  }

  if (window.Razorpay) {
    return Promise.resolve(true);
  }

  if (razorpayScriptPromise) {
    return razorpayScriptPromise;
  }

  razorpayScriptPromise = new Promise((resolve) => {
    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${RAZORPAY_SCRIPT_SRC}"]`
    );

    if (existing) {
      if (window.Razorpay) {
        resolve(true);
        return;
      }

      existing.addEventListener("load", () => resolve(true), { once: true });
      existing.addEventListener("error", () => {
        razorpayScriptPromise = null;
        resolve(false);
      }, { once: true });
      return;
    }

    const script = document.createElement("script");
    script.src = RAZORPAY_SCRIPT_SRC;
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => {
      razorpayScriptPromise = null;
      resolve(false);
    };
    document.body.appendChild(script);
  });

  return razorpayScriptPromise;
}

async function verifyPaymentOnServer(
  order: CheckoutOrderPayload,
  response: RazorpayCheckoutSuccessResponse
) {
  const verifyResponse = await fetch("/api/payment/verify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      registrationId: order.registrationId,
      razorpay_order_id: response.razorpay_order_id,
      razorpay_payment_id: response.razorpay_payment_id,
      razorpay_signature: response.razorpay_signature,
    }),
  });

  const payload = (await verifyResponse.json()) as { error?: string };

  if (!verifyResponse.ok) {
    throw new Error(payload.error ?? "Payment verification failed.");
  }
}

export async function openRazorpayCheckout(
  order: CheckoutOrderPayload
): Promise<"paid" | "dismissed" | "failed"> {
  const loaded = await preloadRazorpayScript();

  if (!loaded || !window.Razorpay) {
    throw new Error("Could not load Razorpay Checkout. Please try again.");
  }

  trackMetaPixelEventWithParams("InitiateCheckout", {
    value: WEBINAR_PAYMENT_AMOUNT_INR,
    currency: WEBINAR_PAYMENT_CURRENCY,
    content_name: "CloudHire Webinar",
  });

  return new Promise((resolve, reject) => {
    const razorpay = new window.Razorpay!({
      key: order.keyId,
      amount: order.amount,
      currency: order.currency,
      name: "CloudHire",
      description: "Webinar registration",
      order_id: order.orderId,
      prefill: order.prefill,
      theme: { color: "#ea580c" },
      handler: async (response) => {
        try {
          await verifyPaymentOnServer(order, response);
          trackMetaPixelEventWithParams("Purchase", {
            value: WEBINAR_PAYMENT_AMOUNT_INR,
            currency: WEBINAR_PAYMENT_CURRENCY,
            content_name: "CloudHire Webinar",
          });
          resolve("paid");
        } catch (error) {
          reject(error);
        }
      },
      modal: {
        ondismiss: () => resolve("dismissed"),
      },
    });

    razorpay.on("payment.failed", () => {
      resolve("failed");
    });

    razorpay.open();
  });
}

/** @deprecated Prefer trackMetaPixelEventWithParams for Purchase. */
export function trackPurchaseFallback() {
  trackMetaPixelEvent("Purchase");
}
