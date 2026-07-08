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
    })
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
