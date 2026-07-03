import { z } from "zod";

function isValidIndianMobile(value: string): boolean {
  const digits = value.replace(/\D/g, "");

  if (digits.length === 10) {
    return /^[6-9]\d{9}$/.test(digits);
  }

  if (digits.length === 12 && digits.startsWith("91")) {
    return /^91[6-9]\d{9}$/.test(digits);
  }

  return false;
}

export const registrationSchema = z.object({
  fullName: z
    .string()
    .min(1, "Full name is required")
    .min(2, "Please enter your full name"),
  email: z
    .string()
    .min(1, "Email address is required")
    .email("Please enter a valid email address"),
  mobile: z
    .string()
    .min(1, "WhatsApp number is required")
    .refine(
      isValidIndianMobile,
      "Please enter a valid Indian mobile number (+91, 10 digits)"
    ),
});

export type RegistrationFormValues = z.infer<typeof registrationSchema>;
