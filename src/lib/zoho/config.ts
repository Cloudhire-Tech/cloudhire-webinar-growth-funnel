export const ZOHO_TOKEN_URL = "https://accounts.zoho.in/oauth/v2/token";

export type ZohoOAuthClientConfig = {
  clientId: string;
  clientSecret: string;
  redirectUri?: string;
};

export function getZohoOAuthClientConfig(): ZohoOAuthClientConfig | null {
  const clientId = process.env.ZOHO_CLIENT_ID?.trim();
  const clientSecret = process.env.ZOHO_CLIENT_SECRET?.trim();
  const redirectUri = process.env.ZOHO_REDIRECT_URI?.trim();

  if (!clientId || !clientSecret) {
    return null;
  }

  return {
    clientId,
    clientSecret,
    redirectUri: redirectUri || undefined,
  };
}

export function getZohoRefreshToken(): string | null {
  const refreshToken = process.env.ZOHO_REFRESH_TOKEN?.trim();
  return refreshToken || null;
}

export function isZohoSelfClient(): boolean {
  const value = process.env.ZOHO_OAUTH_SELF_CLIENT?.trim().toLowerCase();
  return value === "true" || value === "1" || value === "yes";
}

export function isZohoOAuthSetupAuthorized(request: Request): boolean {
  const setupSecret = process.env.ZOHO_OAUTH_SETUP_SECRET?.trim();

  if (!setupSecret) {
    return process.env.NODE_ENV !== "production";
  }

  return request.headers.get("x-zoho-setup-secret") === setupSecret;
}
