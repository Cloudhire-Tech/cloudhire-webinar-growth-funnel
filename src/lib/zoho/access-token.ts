import { refreshAccessToken } from "@/lib/zoho/oauth";

type CachedAccessToken = {
  token: string;
  expiresAtMs: number;
};

let cachedAccessToken: CachedAccessToken | null = null;

const EXPIRY_BUFFER_MS = 60_000;

export function clearZohoAccessTokenCache() {
  cachedAccessToken = null;
}

export async function getZohoAccessToken(): Promise<string> {
  if (
    cachedAccessToken &&
    Date.now() < cachedAccessToken.expiresAtMs - EXPIRY_BUFFER_MS
  ) {
    return cachedAccessToken.token;
  }

  const tokenResponse = await refreshAccessToken();

  cachedAccessToken = {
    token: tokenResponse.access_token,
    expiresAtMs: Date.now() + tokenResponse.expires_in * 1000,
  };

  return tokenResponse.access_token;
}
