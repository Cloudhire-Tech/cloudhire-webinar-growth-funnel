export type PaymentStatus = "pending" | "paid" | "failed";

export type WebinarRegistrationRecord = {
  id: string;
  full_name: string;
  email: string;
  whatsapp_number: string;
  webinar_date: string;
  webinar_time: string;
  webinar_join_url: string;
  registered_at: string;
  source: string;
  created_at: string;
  updated_at: string;
  zoho_webinar_id: string | null;
  zoho_attendee_id: string | null;
  zoho_join_url: string | null;
  zoho_registration_status: string;
  payment_status: PaymentStatus;
  payment_amount: number | null;
  payment_currency: string | null;
  payment_provider: string | null;
  payment_order_id: string | null;
  payment_reference: string | null;
  payment_completed_at: string | null;
};

export type CreateWebinarRegistrationInput = {
  fullName: string;
  email: string;
  whatsappNumber: string;
  webinarDate: string;
  webinarTime: string;
  webinarJoinUrl: string;
  source?: string;
  paymentStatus?: PaymentStatus;
  paymentAmount?: number;
  paymentCurrency?: string;
  paymentProvider?: string;
  paymentOrderId?: string | null;
};

export type RegistrationErrorCode =
  | "VALIDATION_ERROR"
  | "DUPLICATE_REGISTRATION"
  | "DATABASE_ERROR"
  | "CONFIGURATION_ERROR"
  | "PAYMENT_ERROR";

export class RegistrationError extends Error {
  constructor(
    message: string,
    public readonly code: RegistrationErrorCode,
    public readonly status: number
  ) {
    super(message);
    this.name = "RegistrationError";
  }
}
