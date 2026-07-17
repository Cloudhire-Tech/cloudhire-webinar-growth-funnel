import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import type {
  CreateWebinarRegistrationInput,
  PaymentStatus,
  WebinarRegistrationRecord,
} from "@/types/registration";

const TABLE = "webinar_registrations";

export async function insertWebinarRegistration(
  input: CreateWebinarRegistrationInput
): Promise<WebinarRegistrationRecord> {
  const supabase = createSupabaseAdminClient();

  const { data, error } = await supabase
    .from(TABLE)
    .insert({
      full_name: input.fullName,
      email: input.email,
      whatsapp_number: input.whatsappNumber,
      webinar_date: input.webinarDate,
      webinar_time: input.webinarTime,
      webinar_join_url: input.webinarJoinUrl,
      source: input.source ?? "webinar_landing_page",
      zoho_registration_status: "pending",
      payment_status: input.paymentStatus ?? "pending",
      payment_amount: input.paymentAmount ?? null,
      payment_currency: input.paymentCurrency ?? null,
      payment_provider: input.paymentProvider ?? null,
      payment_order_id: input.paymentOrderId ?? null,
    })
    .select("*")
    .single();

  if (error) {
    throw error;
  }

  return data as WebinarRegistrationRecord;
}

export type UpdateWebinarRegistrationZohoDetailsInput = {
  zohoWebinarId?: string;
  zohoAttendeeId?: string;
  zohoJoinUrl?: string;
  zohoRegistrationStatus: string;
};

export async function updateWebinarRegistrationZohoDetails(
  registrationId: string,
  input: UpdateWebinarRegistrationZohoDetailsInput
): Promise<WebinarRegistrationRecord> {
  const supabase = createSupabaseAdminClient();

  const { data, error } = await supabase
    .from(TABLE)
    .update({
      zoho_webinar_id: input.zohoWebinarId ?? null,
      zoho_attendee_id: input.zohoAttendeeId ?? null,
      zoho_join_url: input.zohoJoinUrl ?? null,
      ...(input.zohoJoinUrl?.trim()
        ? { webinar_join_url: input.zohoJoinUrl.trim() }
        : {}),
      zoho_registration_status: input.zohoRegistrationStatus,
    })
    .eq("id", registrationId)
    .select("*")
    .single();

  if (error) {
    throw error;
  }

  return data as WebinarRegistrationRecord;
}

export async function getWebinarRegistrationByEmailAndDate(
  email: string,
  webinarDate: string
): Promise<WebinarRegistrationRecord | null> {
  const supabase = createSupabaseAdminClient();

  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .eq("webinar_date", webinarDate)
    .ilike("email", email)
    .maybeSingle();

  if (error) {
    console.error("Failed to fetch webinar registration by email and date", {
      email,
      webinarDate,
      error,
    });
    return null;
  }

  return data as WebinarRegistrationRecord | null;
}

export async function getWebinarRegistrationByPaymentOrderId(
  paymentOrderId: string
): Promise<WebinarRegistrationRecord | null> {
  const supabase = createSupabaseAdminClient();

  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .eq("payment_order_id", paymentOrderId)
    .maybeSingle();

  if (error) {
    console.error("Failed to fetch webinar registration by payment order id", {
      paymentOrderId,
      error,
    });
    return null;
  }

  return data as WebinarRegistrationRecord | null;
}

export async function updateWebinarRegistrationPaymentDetails(
  registrationId: string,
  input: {
    paymentStatus: PaymentStatus;
    paymentAmount?: number | null;
    paymentCurrency?: string | null;
    paymentProvider?: string | null;
    paymentOrderId?: string | null;
    paymentReference?: string | null;
    paymentCompletedAt?: string | null;
    fullName?: string;
    whatsappNumber?: string;
  }
): Promise<WebinarRegistrationRecord> {
  const supabase = createSupabaseAdminClient();

  const { data, error } = await supabase
    .from(TABLE)
    .update({
      payment_status: input.paymentStatus,
      ...(input.paymentAmount !== undefined
        ? { payment_amount: input.paymentAmount }
        : {}),
      ...(input.paymentCurrency !== undefined
        ? { payment_currency: input.paymentCurrency }
        : {}),
      ...(input.paymentProvider !== undefined
        ? { payment_provider: input.paymentProvider }
        : {}),
      ...(input.paymentOrderId !== undefined
        ? { payment_order_id: input.paymentOrderId }
        : {}),
      ...(input.paymentReference !== undefined
        ? { payment_reference: input.paymentReference }
        : {}),
      ...(input.paymentCompletedAt !== undefined
        ? { payment_completed_at: input.paymentCompletedAt }
        : {}),
      ...(input.fullName !== undefined ? { full_name: input.fullName } : {}),
      ...(input.whatsappNumber !== undefined
        ? { whatsapp_number: input.whatsappNumber }
        : {}),
    })
    .eq("id", registrationId)
    .select("*")
    .single();

  if (error) {
    throw error;
  }

  return data as WebinarRegistrationRecord;
}

export function isDuplicateRegistrationError(error: unknown) {
  if (!error || typeof error !== "object") {
    return false;
  }

  return "code" in error && error.code === "23505";
}

export async function getWebinarRegistrationById(
  registrationId: string
): Promise<WebinarRegistrationRecord | null> {
  const supabase = createSupabaseAdminClient();

  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .eq("id", registrationId)
    .maybeSingle();

  if (error) {
    console.error("Failed to fetch webinar registration", {
      registrationId,
      error,
    });
    return null;
  }

  return data as WebinarRegistrationRecord | null;
}

export function isPaidRegistration(
  registration: Pick<WebinarRegistrationRecord, "payment_status"> | null | undefined
) {
  return registration?.payment_status === "paid";
}
