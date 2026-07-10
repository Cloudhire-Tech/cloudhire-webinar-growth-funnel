import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import type {
  CreateWebinarRegistrationInput,
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
    })
    .select("*")
    .single();

  if (error) {
    throw error;
  }

  return data;
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

  return data;
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

  return data;
}
