import { z } from "zod";

export const registrationSchema = z.object({
  fullName: z
    .string()
    .min(1, "Full name is required")
    .min(2, "Please enter your full name"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  mobile: z
    .string()
    .min(1, "Mobile number is required")
    .min(10, "Please enter a valid mobile number")
    .regex(
      /^[\d\s+\-()]+$/,
      "Mobile number can only contain digits and + - ( )"
    ),
});

export type RegistrationFormValues = z.infer<typeof registrationSchema>;
