"use client";

import { useState } from "react";

import { PrimaryCtaButton } from "@/components/ui/primary-cta-button";
import { openRazorpayCheckout } from "@/lib/payment/open-checkout";

type ThankYouPaymentRetryProps = {
  registrationId: string;
  fullName: string;
  email: string;
  mobile: string;
};

export function ThankYouPaymentRetry({
  registrationId,
  fullName,
  email,
  mobile,
}: ThankYouPaymentRetryProps) {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const onRetry = async () => {
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ registrationId }),
      });

      const payload = (await response.json()) as {
        error?: string;
        orderId?: string;
        amount?: number;
        currency?: string;
        keyId?: string;
        registrationId?: string;
      };

      if (
        !response.ok ||
        !payload.orderId ||
        !payload.amount ||
        !payload.currency ||
        !payload.keyId
      ) {
        setError(payload.error ?? "Could not start payment. Please try again.");
        return;
      }

      const result = await openRazorpayCheckout({
        registrationId: payload.registrationId ?? registrationId,
        orderId: payload.orderId,
        amount: payload.amount,
        currency: payload.currency,
        keyId: payload.keyId,
        prefill: { name: fullName, email, contact: mobile },
      });

      if (result === "paid") {
        window.location.assign(
          `/thank-you?registration=${encodeURIComponent(registrationId)}`
        );
        return;
      }

      if (result === "failed") {
        setError("Payment failed. Please try again.");
        return;
      }

      setError("Payment was not completed. Please try again to reserve your seat.");
    } catch {
      setError("We couldn't start payment. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-8 space-y-3">
      {error ? (
        <p className="text-destructive text-sm" role="alert">
          {error}
        </p>
      ) : null}
      <PrimaryCtaButton
        type="button"
        label={isLoading ? "Opening payment..." : "Complete payment ₹9 →"}
        fullWidth
        disabled={isLoading}
        onClick={onRetry}
      />
    </div>
  );
}
