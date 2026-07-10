import assert from "node:assert/strict";
import { afterEach, describe, it } from "node:test";

import { clearZohoAccessTokenCache, getZohoAccessToken } from "./access-token.ts";

const originalFetch = globalThis.fetch;
const originalEnv = { ...process.env };

afterEach(() => {
  globalThis.fetch = originalFetch;
  process.env = { ...originalEnv };
  clearZohoAccessTokenCache();
});

describe("getZohoAccessToken", () => {
  it("refreshes the access token using the stored refresh token", async () => {
    process.env.ZOHO_CLIENT_ID = "client-id";
    process.env.ZOHO_CLIENT_SECRET = "client-secret";
    process.env.ZOHO_REFRESH_TOKEN = "refresh-token";

    globalThis.fetch = (async () =>
      new Response(
        JSON.stringify({
          access_token: "access-token",
          expires_in: 3600,
          api_domain: "https://www.zohoapis.in",
          token_type: "Bearer",
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      )) as typeof fetch;

    const token = await getZohoAccessToken();

    assert.equal(token, "access-token");

    const cached = await getZohoAccessToken();
    assert.equal(cached, "access-token");
    assert.equal((globalThis.fetch as { callCount?: number }).callCount, undefined);
  });
});
