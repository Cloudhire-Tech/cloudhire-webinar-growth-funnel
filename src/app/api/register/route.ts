import { NextResponse } from "next/server";

import { createWebinarRegistrationCheckout } from "@/lib/registration/create-registration";
import { isRazorpayConfigured } from "@/lib/payment/config";
import { isSupabaseConfigured } from "@/lib/supabase/admin";
import { registrationSchema } from "@/lib/validations/registration";
import { RegistrationError } from "@/types/registration";

export async function POST(request: Request) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      {
        error:
          "Registration is temporarily unavailable. Please try again shortly.",
      },
      { status: 503 }
    );
  }

  if (!isRazorpayConfigured()) {
    return NextResponse.json(
      {
        error:
          "Payment is temporarily unavailable. Please try again shortly.",
      },
      { status: 503 }
    );
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 }
    );
  }

  const parsedBody = registrationSchema.safeParse(body);

  if (!parsedBody.success) {
    const message =
      parsedBody.error.issues[0]?.message ?? "Please check your form details.";

    return NextResponse.json({ error: message }, { status: 400 });
  }

  try {
    const result = await createWebinarRegistrationCheckout(parsedBody.data);

    return NextResponse.json(
      {
        success: true,
        registrationId: result.registration.id,
        orderId: result.orderId,
        amount: result.amount,
        currency: result.currency,
        keyId: result.keyId,
        reused: result.reused,
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof RegistrationError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }

    console.error("Unhandled registration error", error);

    return NextResponse.json(
      {
        error:
          "Something went wrong while starting your registration. Please try again.",
      },
      { status: 500 }
    );
  }
}
