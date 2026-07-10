import { createClient, type SupabaseClient } from "@supabase/supabase-js";

import type { WebinarRegistrationRecord } from "@/types/registration";

export type Database = {
  public: {
    Tables: {
      webinar_registrations: {
        Row: WebinarRegistrationRecord;
        Insert: {
          id?: string;
          full_name: string;
          email: string;
          whatsapp_number: string;
          webinar_date: string;
          webinar_time: string;
          webinar_join_url: string;
          registered_at?: string;
          source?: string;
          created_at?: string;
          updated_at?: string;
          zoho_webinar_id?: string | null;
          zoho_attendee_id?: string | null;
          zoho_join_url?: string | null;
          zoho_registration_status?: string;
        };
        Update: Partial<{
          full_name: string;
          email: string;
          whatsapp_number: string;
          webinar_date: string;
          webinar_time: string;
          webinar_join_url: string;
          registered_at: string;
          source: string;
          zoho_webinar_id: string | null;
          zoho_attendee_id: string | null;
          zoho_join_url: string | null;
          zoho_registration_status: string;
        }>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

let adminClient: SupabaseClient<Database> | null = null;

function getSupabaseEnv() {
  const url = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    return null;
  }

  return { url, serviceRoleKey };
}

export function createSupabaseAdminClient() {
  const env = getSupabaseEnv();

  if (!env) {
    throw new Error(
      "Missing Supabase configuration. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY."
    );
  }

  if (!adminClient) {
    adminClient = createClient<Database>(env.url, env.serviceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });
  }

  return adminClient;
}

export function isSupabaseConfigured() {
  return getSupabaseEnv() !== null;
}
