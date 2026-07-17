import {
  getWebinarRegistrationByEmailAndDate,
  getWebinarRegistrationById,
  insertWebinarRegistration,
  isDuplicateRegistrationError,
  updateWebinarRegistrationPaymentDetails,
} from "@/lib/db/webinar-registrations";
import { getRazorpayKeyId, isRazorpayConfigured } from "@/lib/payment/config";
import {
  WEBINAR_PAYMENT_AMOUNT_INR,
  WEBINAR_PAYMENT_CURRENCY,
  WEBINAR_PAYMENT_PROVIDER,
} from "@/lib/payment/pricing";
import { createRazorpayOrder } from "@/lib/payment/razorpay";
import { getUpcomingWebinarSession } from "@/lib/webinar-schedule";
import {
  normalizeRegistrationEmail,
  normalizeRegistrationMobile,
  registrationSchema,
  type RegistrationFormValues,
} from "@/lib/validations/registration";
import {
  RegistrationError,
  type WebinarRegistrationRecord,
} from "@/types/registration";

export type CreateRegistrationCheckoutResult = {
  registration: WebinarRegistrationRecord;
  orderId: string;
  amount: number;
  currency: string;
  keyId: string;
  reused: boolean;
};

async function attachRazorpayOrder(
  registration: WebinarRegistrationRecord
): Promise<CreateRegistrationCheckoutResult> {
  if (!isRazorpayConfigured()) {
    throw new RegistrationError(
      "Payment is temporarily unavailable. Please try again shortly.",
      "CONFIGURATION_ERROR",
      503
    );
  }

  const keyId = getRazorpayKeyId();

  if (!keyId) {
    throw new RegistrationError(
      "Payment is temporarily unavailable. Please try again shortly.",
      "CONFIGURATION_ERROR",
      503
    );
  }

  try {
    const order = await createRazorpayOrder({
      receipt: registration.id.replace(/-/g, "").slice(0, 40),
      notes: {
        registrationId: registration.id,
        email: registration.email,
        webinarDate: registration.webinar_date,
      },
    });

    const updated = await updateWebinarRegistrationPaymentDetails(
      registration.id,
      {
        paymentStatus: "pending",
        paymentAmount: WEBINAR_PAYMENT_AMOUNT_INR,
        paymentCurrency: WEBINAR_PAYMENT_CURRENCY,
        paymentProvider: WEBINAR_PAYMENT_PROVIDER,
        paymentOrderId: order.id,
        paymentReference: null,
        paymentCompletedAt: null,
      }
    );

    return {
      registration: updated,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId,
      reused: false,
    };
  } catch (error) {
    console.error("Failed to create Razorpay order", {
      registrationId: registration.id,
      error,
    });

    throw new RegistrationError(
      "We couldn't start payment right now. Please try again in a moment.",
      "PAYMENT_ERROR",
      502
    );
  }
}

export async function createWebinarRegistrationCheckout(
  input: RegistrationFormValues,
  options?: { source?: string; referenceDate?: Date }
): Promise<CreateRegistrationCheckoutResult> {
  const parsed = registrationSchema.safeParse(input);

  if (!parsed.success) {
    const firstIssue =
      parsed.error.issues[0]?.message ?? "Invalid registration data.";

    throw new RegistrationError(firstIssue, "VALIDATION_ERROR", 400);
  }

  const session = getUpcomingWebinarSession(options?.referenceDate);
  const email = normalizeRegistrationEmail(parsed.data.email);
  const whatsappNumber = normalizeRegistrationMobile(parsed.data.mobile);
  const fullName = parsed.data.fullName.trim();

  const existing = await getWebinarRegistrationByEmailAndDate(
    email,
    session.isoDate
  );

  if (existing?.payment_status === "paid") {
    throw new RegistrationError(
      "You're already registered for this week's webinar. Please check your email for your confirmation details.",
      "DUPLICATE_REGISTRATION",
      409
    );
  }

  if (existing) {
    const refreshed = await updateWebinarRegistrationPaymentDetails(
      existing.id,
      {
        paymentStatus: existing.payment_status === "failed" ? "pending" : existing.payment_status,
        fullName,
        whatsappNumber,
      }
    );

    const checkout = await attachRazorpayOrder(refreshed);

    return {
      ...checkout,
      reused: true,
    };
  }

  try {
    const registration = await insertWebinarRegistration({
      fullName,
      email,
      whatsappNumber,
      webinarDate: session.isoDate,
      webinarTime: session.time,
      webinarJoinUrl: session.joinUrl,
      source: options?.source ?? "webinar_landing_page",
      paymentStatus: "pending",
      paymentAmount: WEBINAR_PAYMENT_AMOUNT_INR,
      paymentCurrency: WEBINAR_PAYMENT_CURRENCY,
      paymentProvider: WEBINAR_PAYMENT_PROVIDER,
    });

    return attachRazorpayOrder(registration);
  } catch (error) {
    if (isDuplicateRegistrationError(error)) {
      const raced = await getWebinarRegistrationByEmailAndDate(
        email,
        session.isoDate
      );

      if (raced?.payment_status === "paid") {
        throw new RegistrationError(
          "You're already registered for this week's webinar. Please check your email for your confirmation details.",
          "DUPLICATE_REGISTRATION",
          409
        );
      }

      if (raced) {
        const checkout = await attachRazorpayOrder(raced);
        return { ...checkout, reused: true };
      }

      throw new RegistrationError(
        "You're already registered for this week's webinar. Please check your email for your confirmation details.",
        "DUPLICATE_REGISTRATION",
        409
      );
    }

    console.error("Failed to save webinar registration", error);

    throw new RegistrationError(
      "We couldn't save your registration right now. Please try again in a moment.",
      "DATABASE_ERROR",
      500
    );
  }
}

export async function createPaymentOrderForRegistration(
  registrationId: string
): Promise<CreateRegistrationCheckoutResult> {
  const registration = await getWebinarRegistrationById(registrationId);

  if (!registration) {
    throw new RegistrationError(
      "Registration not found.",
      "VALIDATION_ERROR",
      404
    );
  }

  if (registration.payment_status === "paid") {
    throw new RegistrationError(
      "You're already registered for this week's webinar. Please check your email for your confirmation details.",
      "DUPLICATE_REGISTRATION",
      409
    );
  }

  const checkout = await attachRazorpayOrder(registration);
  return { ...checkout, reused: true };
}

/** @deprecated Use createWebinarRegistrationCheckout for the paid flow. */
export async function createWebinarRegistration(
  input: RegistrationFormValues,
  options?: { source?: string; referenceDate?: Date }
) {
  const result = await createWebinarRegistrationCheckout(input, options);
  return { registration: result.registration };
}
