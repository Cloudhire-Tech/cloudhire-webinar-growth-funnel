import assert from "node:assert/strict";
import { afterEach, describe, it } from "node:test";

import {
  exchangeAuthorizationCode,
  refreshAccessToken,
  ZohoOAuthError,
} from "./oauth.ts";

const originalFetch = globalThis.fetch;
const originalEnv = { ...process.env };

type FetchCall = {
  url: string;
  init: RequestInit;
};

let fetchCalls: FetchCall[] = [];

function mockTokenResponse(body: Record<string, unknown>, status = 200) {
  fetchCalls = [];
  globalThis.fetch = (async (url, init = {}) => {
    fetchCalls.push({ url: String(url), init });
    return new Response(JSON.stringify(body), {
      status,
      headers: { "Content-Type": "application/json" },
    });
  }) as typeof fetch;
}

afterEach(() => {
  globalThis.fetch = originalFetch;
  process.env = { ...originalEnv };
  fetchCalls = [];
});

describe("exchangeAuthorizationCode", () => {
  it("posts the authorization code to Zoho India", async () => {
    process.env.ZOHO_CLIENT_ID = "client-id";
    process.env.ZOHO_CLIENT_SECRET = "client-secret";
    process.env.ZOHO_REDIRECT_URI = "https://example.com/oauth/callback";

    mockTokenResponse({
      access_token: "access-token",
      refresh_token: "refresh-token",
      expires_in: 3600,
      api_domain: "https://www.zohoapis.in",
      token_type: "Bearer",
    });

    const token = await exchangeAuthorizationCode("auth-code");

    assert.equal(token.access_token, "access-token");
    assert.equal(token.refresh_token, "refresh-token");
    assert.equal(fetchCalls.length, 1);
    assert.equal(fetchCalls[0]?.url, "https://accounts.zoho.in/oauth/v2/token");
    assert.equal(fetchCalls[0]?.init.method, "POST");

    const body = new URLSearchParams(String(fetchCalls[0]?.init.body));
    assert.equal(body.get("grant_type"), "authorization_code");
    assert.equal(body.get("code"), "auth-code");
    assert.equal(body.get("client_id"), "client-id");
    assert.equal(body.get("client_secret"), "client-secret");
    assert.equal(body.get("redirect_uri"), "https://example.com/oauth/callback");
  });

  it("omits redirect_uri for the Self Client flow", async () => {
    process.env.ZOHO_CLIENT_ID = "client-id";
    process.env.ZOHO_CLIENT_SECRET = "client-secret";
    process.env.ZOHO_REDIRECT_URI = "https://example.com/oauth/callback";
    process.env.ZOHO_OAUTH_SELF_CLIENT = "true";

    mockTokenResponse({
      access_token: "access-token",
      refresh_token: "refresh-token",
      expires_in: 3600,
      api_domain: "https://www.zohoapis.in",
      token_type: "Bearer",
    });

    await exchangeAuthorizationCode("auth-code");

    const body = new URLSearchParams(String(fetchCalls[0]?.init.body));
    assert.equal(body.get("redirect_uri"), null);
  });

  it("surfaces Zoho error responses", async () => {
    process.env.ZOHO_CLIENT_ID = "client-id";
    process.env.ZOHO_CLIENT_SECRET = "client-secret";

    mockTokenResponse(
      {
        error: "invalid_code",
        error_description: "Authorization code expired.",
      },
      400
    );

    await assert.rejects(
      () => exchangeAuthorizationCode("expired-code"),
      (error: unknown) => {
        assert.ok(error instanceof ZohoOAuthError);
        assert.equal(error.code, "invalid_code");
        return true;
      }
    );
  });
});

describe("refreshAccessToken", () => {
  it("uses the stored refresh token from env", async () => {
    process.env.ZOHO_CLIENT_ID = "client-id";
    process.env.ZOHO_CLIENT_SECRET = "client-secret";
    process.env.ZOHO_REFRESH_TOKEN = "refresh-token";

    mockTokenResponse({
      access_token: "new-access-token",
      expires_in: 3600,
      api_domain: "https://www.zohoapis.in",
      token_type: "Bearer",
    });

    const token = await refreshAccessToken();

    assert.equal(token.access_token, "new-access-token");

    const body = new URLSearchParams(String(fetchCalls[0]?.init.body));
    assert.equal(body.get("grant_type"), "refresh_token");
    assert.equal(body.get("refresh_token"), "refresh-token");
  });
});
