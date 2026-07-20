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
  needsSideEffects: boolean;
};

/**
 * Marks registration as paid after signature verification.
 * Zoho/email side effects are returned as a flag so the API can finish the
 * HTTP response first, then run them via next/server `after()`.
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
    !alreadyPaid ||
    registration.zoho_registration_status !== "registered" ||
    !registration.zoho_join_url;

  return { registration, alreadyPaid, needsSideEffects };
}

export async function runPaidRegistrationSideEffects(
  registration: WebinarRegistrationRecord
) {
  await handleRegistrationSideEffects({ registration });
}
