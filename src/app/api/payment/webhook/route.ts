import { NextResponse } from "next/server";

import { getRazorpayServerConfig } from "@/lib/payment/config";
import { completePaidRegistration } from "@/lib/payment/complete-payment";
import { verifyWebhookSignature } from "@/lib/payment/razorpay";
import {
  getWebinarRegistrationByPaymentOrderId,
  updateWebinarRegistrationPaymentDetails,
} from "@/lib/db/webinar-registrations";
import { isSupabaseConfigured } from "@/lib/supabase/admin";

type RazorpayWebhookPayload = {
  event?: string;
  payload?: {
    payment?: {
      entity?: {
        id?: string;
        order_id?: string;
        status?: string;
      };
    };
    order?: {
      entity?: {
        id?: string;
        status?: string;
      };
    };
  };
};

/**
 * Optional Razorpay webhook handler.
 * The live checkout flow completes via /api/payment/verify and does not
 * require this endpoint. Keep the route for a future webhook rollout.
 */
export async function POST(request: Request) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: "Unavailable" }, { status: 503 });
  }

  const config = getRazorpayServerConfig();

  if (!config?.webhookSecret) {
    return NextResponse.json(
      { error: "Webhook not configured", optional: true },
      { status: 503 }
    );
  }

  const rawBody = await request.text();
  const signature = request.headers.get("x-razorpay-signature") ?? "";

  if (
    !verifyWebhookSignature({
      rawBody,
      signature,
      webhookSecret: config.webhookSecret,
    })
  ) {
    console.error("Invalid Razorpay webhook signature");
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  let payload: RazorpayWebhookPayload;

  try {
    payload = JSON.parse(rawBody) as RazorpayWebhookPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const event = payload.event ?? "";
  const paymentEntity = payload.payload?.payment?.entity;
  const orderEntity = payload.payload?.order?.entity;

  const orderId = paymentEntity?.order_id ?? orderEntity?.id;
  const paymentId = paymentEntity?.id;

  if (
    event === "payment.failed" &&
    orderId
  ) {
    const registration = await getWebinarRegistrationByPaymentOrderId(orderId);

    if (registration && registration.payment_status !== "paid") {
      await updateWebinarRegistrationPaymentDetails(registration.id, {
        paymentStatus: "failed",
        paymentReference: paymentId ?? registration.payment_reference,
      });

      console.info("Registration payment marked failed from webhook", {
        registrationId: registration.id,
        orderId,
        paymentId,
      });
    }

    return NextResponse.json({ success: true });
  }

  const isSuccessEvent =
    event === "payment.captured" ||
    event === "order.paid" ||
    paymentEntity?.status === "captured";

  if (!isSuccessEvent || !orderId || !paymentId) {
    return NextResponse.json({ success: true, ignored: true });
  }

  try {
    const result = await completePaidRegistration({
      orderId,
      paymentId,
    });

    console.info("Razorpay webhook completed paid registration", {
      event,
      registrationId: result.registration.id,
      alreadyPaid: result.alreadyPaid,
      orderId,
      paymentId,
    });

    return NextResponse.json({
      success: true,
      registrationId: result.registration.id,
      alreadyPaid: result.alreadyPaid,
    });
  } catch (error) {
    console.error("Razorpay webhook failed to complete registration", {
      event,
      orderId,
      paymentId,
      error,
    });

    return NextResponse.json({ error: "Processing failed" }, { status: 500 });
  }
}
