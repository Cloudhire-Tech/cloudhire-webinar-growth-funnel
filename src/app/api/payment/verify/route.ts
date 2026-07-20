import { after, NextResponse } from "next/server";
import { z } from "zod";

import { getRazorpayServerConfig } from "@/lib/payment/config";
import {
  completePaidRegistration,
  runPaidRegistrationSideEffects,
} from "@/lib/payment/complete-payment";
import { verifyCheckoutPaymentSignature } from "@/lib/payment/razorpay";
import { isSupabaseConfigured } from "@/lib/supabase/admin";

const verifySchema = z.object({
  registrationId: z.string().uuid().optional(),
  razorpay_order_id: z.string().min(1),
  razorpay_payment_id: z.string().min(1),
  razorpay_signature: z.string().min(1),
});

/**
 * Primary payment verification for checkout success.
 * Verifies the Razorpay payment signature with RAZORPAY_KEY_SECRET, then
 * marks the registration paid and schedules Zoho/email side effects.
 * Does not require a webhook or RAZORPAY_WEBHOOK_SECRET.
 */
export async function POST(request: Request) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: "Payment verification is temporarily unavailable." },
      { status: 503 }
    );
  }

  const config = getRazorpayServerConfig();

  if (!config) {
    return NextResponse.json(
      { error: "Payment is temporarily unavailable." },
      { status: 503 }
    );
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = verifySchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid payment verification payload." },
      { status: 400 }
    );
  }

  const {
    registrationId,
    razorpay_order_id: orderId,
    razorpay_payment_id: paymentId,
    razorpay_signature: signature,
  } = parsed.data;

  const signatureValid = verifyCheckoutPaymentSignature({
    orderId,
    paymentId,
    signature,
    keySecret: config.keySecret,
  });

  if (!signatureValid) {
    console.error("Invalid Razorpay checkout signature", {
      orderId,
      paymentId,
      registrationId,
    });

    return NextResponse.json(
      { error: "Payment signature verification failed." },
      { status: 400 }
    );
  }

  try {
    const result = await completePaidRegistration({
      orderId,
      paymentId,
      registrationId,
    });

    if (result.needsSideEffects) {
      after(() =>
        runPaidRegistrationSideEffects(result.registration).catch((error) => {
          console.error(
            "Deferred paid registration side effects failed",
            {
              registrationId: result.registration.id,
              error,
            }
          );
        })
      );
    }

    return NextResponse.json({
      success: true,
      registrationId: result.registration.id,
      alreadyPaid: result.alreadyPaid,
      paymentStatus: result.registration.payment_status,
    });
  } catch (error) {
    console.error("Failed to complete paid registration from verify", error);

    return NextResponse.json(
      { error: "We couldn't confirm your payment. Please contact support." },
      { status: 500 }
    );
  }
}
