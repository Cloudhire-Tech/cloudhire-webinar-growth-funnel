import { NextResponse } from "next/server";
import { z } from "zod";

import { createPaymentOrderForRegistration } from "@/lib/registration/create-registration";
import { isRazorpayConfigured } from "@/lib/payment/config";
import { isSupabaseConfigured } from "@/lib/supabase/admin";
import { RegistrationError } from "@/types/registration";

const bodySchema = z.object({
  registrationId: z.string().uuid(),
});

/** Create a fresh Razorpay order for an unpaid registration (retry / resume). */
export async function POST(request: Request) {
  if (!isSupabaseConfigured() || !isRazorpayConfigured()) {
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

  const parsed = bodySchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid registration id." },
      { status: 400 }
    );
  }

  try {
    const result = await createPaymentOrderForRegistration(
      parsed.data.registrationId
    );

    return NextResponse.json({
      success: true,
      registrationId: result.registration.id,
      orderId: result.orderId,
      amount: result.amount,
      currency: result.currency,
      keyId: result.keyId,
    });
  } catch (error) {
    if (error instanceof RegistrationError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }

    console.error("Failed to create payment order for registration", error);

    return NextResponse.json(
      { error: "We couldn't start payment. Please try again." },
      { status: 500 }
    );
  }
}
