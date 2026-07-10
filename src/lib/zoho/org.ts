import { getZohoAccessToken } from "@/lib/zoho/access-token";
import { getZohoWebinarConfig } from "@/lib/zoho/webinar-config";

type ZohoUserDetailsResponse = {
  userDetails?: {
    zsoid?: number | string;
  };
  error?: {
    code?: number | string;
    message?: string;
  };
};

let cachedZsoid: string | null = null;

export function clearZohoWebinarZsoidCache() {
  cachedZsoid = null;
}

export async function getZohoWebinarZsoid(): Promise<string> {
  const configuredZsoid = process.env.ZOHO_WEBINAR_ZSOID?.trim();

  if (configuredZsoid) {
    return configuredZsoid;
  }

  if (cachedZsoid) {
    return cachedZsoid;
  }

  const config = getZohoWebinarConfig();

  if (!config) {
    throw new Error("Zoho Webinar is not configured.");
  }

  const accessToken = await getZohoAccessToken();
  const response = await fetch(
    `${config.apiBaseUrl.replace(/\/$/, "")}/api/v2/user.json`,
    {
      headers: {
        Authorization: `Zoho-oauthtoken ${accessToken}`,
        "X-ZSOURCE": config.xZsource,
      },
      cache: "no-store",
    }
  );

  const payload = (await response.json()) as ZohoUserDetailsResponse;
  const zsoid = payload.userDetails?.zsoid;

  if (!response.ok || zsoid === undefined || zsoid === null) {
    throw new Error(
      payload.error?.message ??
        "Unable to resolve Zoho Webinar organization ID. Set ZOHO_WEBINAR_ZSOID or include ZohoWebinar.manageOrg.READ in your OAuth scope."
    );
  }

  cachedZsoid = String(zsoid);
  return cachedZsoid;
}
