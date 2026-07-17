import {
  getWebinarRegistrationById,
  getWebinarRegistrationByPaymentOrderId,
  updateWebinarRegistrationPaymentDetails,
} from "@/lib/db/webinar-registrations";
import {
  WEBINAR_PAYMENT_AMOUNT_INR,
  WEBINAR_PAYMENT_CURRENCY,
  WEBINAR_PAYMENT_PROVIDER,
} from "@/lib/payment/pricing";
import { handleRegistrationSideEffects } from "@/lib/registration/send-confirmation-email";
import type { WebinarRegistrationRecord } from "@/types/registration";

export type CompletePaidRegistrationResult = {
  registration: WebinarRegistrationRecord;
  alreadyPaid: boolean;
};

/**
 * Idempotently marks a registration as paid and runs Zoho + email side effects.
 * Called from /api/payment/verify after checkout signature verification.
 * Also safe to call from an optional Razorpay webhook if configured later.
 */
export async function completePaidRegistration(input: {
  orderId: string;
  paymentId: string;
  registrationId?: string;
}): Promise<CompletePaidRegistrationResult> {
  let registration =
    (input.registrationId
      ? await getWebinarRegistrationById(input.registrationId)
      : null) ?? (await getWebinarRegistrationByPaymentOrderId(input.orderId));

  if (!registration) {
    throw new Error(
      `No registration found for Razorpay order ${input.orderId}`
    );
  }

  if (
    registration.payment_order_id &&
    registration.payment_order_id !== input.orderId
  ) {
    throw new Error(
      `Razorpay order mismatch for registration ${registration.id}`
    );
  }

  const alreadyPaid = registration.payment_status === "paid";

  if (!alreadyPaid) {
    registration = await updateWebinarRegistrationPaymentDetails(
      registration.id,
      {
        paymentStatus: "paid",
        paymentAmount: WEBINAR_PAYMENT_AMOUNT_INR,
        paymentCurrency: WEBINAR_PAYMENT_CURRENCY,
        paymentProvider: WEBINAR_PAYMENT_PROVIDER,
        paymentOrderId: input.orderId,
        paymentReference: input.paymentId,
        paymentCompletedAt: new Date().toISOString(),
      }
    );

    console.info("Registration marked as paid", {
      registrationId: registration.id,
      email: registration.email,
      paymentOrderId: input.orderId,
      paymentReference: input.paymentId,
    });
  } else if (
    !registration.payment_reference ||
    registration.payment_reference !== input.paymentId
  ) {
    registration = await updateWebinarRegistrationPaymentDetails(
      registration.id,
      {
        paymentStatus: "paid",
        paymentReference: input.paymentId,
        paymentCompletedAt:
          registration.payment_completed_at ?? new Date().toISOString(),
      }
    );
  }

  const needsSideEffects =
    registration.zoho_registration_status !== "registered" ||
    !registration.zoho_join_url;

  if (needsSideEffects) {
    await handleRegistrationSideEffects({ registration });
    const refreshed = await getWebinarRegistrationById(registration.id);
    if (refreshed) {
      registration = refreshed;
    }
  }

  return { registration, alreadyPaid };
}
