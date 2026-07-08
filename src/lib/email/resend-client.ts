import { Resend } from "resend";

type ResendConfig = {
  client: Resend;
  fromEmail: string;
};

let cachedConfig: ResendConfig | null | undefined;

export function isResendConfigured(): boolean {
  return getResendConfig() !== null;
}

export function getResendConfig(): ResendConfig | null {
  if (cachedConfig !== undefined) {
    return cachedConfig;
  }

  const apiKey = process.env.RESEND_API_KEY?.trim();
  const fromEmail = process.env.RESEND_FROM_EMAIL?.trim();

  if (!apiKey || !fromEmail) {
    cachedConfig = null;
    return null;
  }

  cachedConfig = {
    client: new Resend(apiKey),
    fromEmail,
  };

  return cachedConfig;
}
