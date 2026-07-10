import {
  getZohoOAuthClientConfig,
  getZohoRefreshToken,
  isZohoSelfClient,
  ZOHO_TOKEN_URL,
  type ZohoOAuthClientConfig,
} from "@/lib/zoho/config";

export type ZohoTokenSuccess = {
  access_token: string;
  refresh_token?: string;
  expires_in: number;
  api_domain: string;
  token_type: string;
};

export type ZohoTokenError = {
  error: string;
  error_description?: string;
};

export class ZohoOAuthError extends Error {
  readonly code: string;
  readonly status: number;

  constructor(message: string, code: string, status = 502) {
    super(message);
    this.name = "ZohoOAuthError";
    this.code = code;
    this.status = status;
  }
}

async function requestZohoToken(
  params: Record<string, string>,
  config: ZohoOAuthClientConfig
): Promise<ZohoTokenSuccess> {
  const body = new URLSearchParams({
    client_id: config.clientId,
    client_secret: config.clientSecret,
    ...params,
  });

  const response = await fetch(ZOHO_TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
    cache: "no-store",
  });

  const payload = (await response.json()) as ZohoTokenSuccess | ZohoTokenError;

  if (!response.ok || "error" in payload) {
    const error = "error" in payload ? payload : { error: "unknown_error" };
    throw new ZohoOAuthError(
      error.error_description ?? error.error,
      error.error,
      response.status || 502
    );
  }

  if (!payload.access_token) {
    throw new ZohoOAuthError(
      "Zoho token response did not include an access token.",
      "invalid_token_response",
      502
    );
  }

  return payload;
}

export async function exchangeAuthorizationCode(code: string) {
  const config = getZohoOAuthClientConfig();

  if (!config) {
    throw new ZohoOAuthError(
      "Missing Zoho OAuth client configuration.",
      "missing_config",
      503
    );
  }

  const trimmedCode = code.trim();

  if (!trimmedCode) {
    throw new ZohoOAuthError(
      "Authorization code is required.",
      "missing_code",
      400
    );
  }

  const params: Record<string, string> = {
    grant_type: "authorization_code",
    code: trimmedCode,
  };

  if (!isZohoSelfClient() && config.redirectUri) {
    params.redirect_uri = config.redirectUri;
  }

  return requestZohoToken(params, config);
}

export async function refreshAccessToken(refreshToken?: string) {
  const config = getZohoOAuthClientConfig();
  const resolvedRefreshToken = refreshToken?.trim() || getZohoRefreshToken();

  if (!config) {
    throw new ZohoOAuthError(
      "Missing Zoho OAuth client configuration.",
      "missing_config",
      503
    );
  }

  if (!resolvedRefreshToken) {
    throw new ZohoOAuthError(
      "Missing Zoho refresh token.",
      "missing_refresh_token",
      503
    );
  }

  return requestZohoToken(
    {
      grant_type: "refresh_token",
      refresh_token: resolvedRefreshToken,
    },
    config
  );
}
