export type ZohoWebinarConfig = {
  apiBaseUrl: string;
  zsoid?: string;
  webinarKey: string;
  instanceId?: string;
  xZsource: string;
  sendMail: boolean;
};

export function getZohoWebinarConfig(): ZohoWebinarConfig | null {
  const webinarKey = process.env.ZOHO_WEBINAR_KEY?.trim();

  if (!webinarKey) {
    return null;
  }

  const zsoid = process.env.ZOHO_WEBINAR_ZSOID?.trim();
  const instanceId = process.env.ZOHO_WEBINAR_INSTANCE_ID?.trim();
  const sendMail = process.env.ZOHO_WEBINAR_SEND_MAIL?.trim().toLowerCase() === "true";

  return {
    apiBaseUrl:
      process.env.ZOHO_WEBINAR_API_BASE?.trim() || "https://webinar.zoho.in",
    zsoid: zsoid || undefined,
    webinarKey,
    instanceId: instanceId || undefined,
    xZsource: process.env.ZOHO_WEBINAR_X_ZSOURCE?.trim() || "CloudHire",
    sendMail,
  };
}

export function isZohoWebinarConfigured(): boolean {
  return getZohoWebinarConfig() !== null;
}
