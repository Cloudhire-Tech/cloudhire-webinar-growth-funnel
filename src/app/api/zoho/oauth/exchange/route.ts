import { NextResponse } from "next/server";

import { isZohoOAuthSetupAuthorized } from "@/lib/zoho/config";
import { exchangeAuthorizationCode, ZohoOAuthError } from "@/lib/zoho/oauth";

type ExchangeRequestBody = {
  code?: string;
};

export async function POST(request: Request) {
  if (!isZohoOAuthSetupAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  let body: ExchangeRequestBody;

  try {
    body = (await request.json()) as ExchangeRequestBody;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  try {
    const token = await exchangeAuthorizationCode(body.code ?? "");

    return NextResponse.json({
      success: true,
      message:
        "Token exchange succeeded. Save the refresh token in ZOHO_REFRESH_TOKEN on the server.",
      expiresIn: token.expires_in,
      apiDomain: token.api_domain,
      tokenType: token.token_type,
      refreshToken: token.refresh_token ?? null,
      refreshTokenReceived: Boolean(token.refresh_token),
    });
  } catch (error) {
    if (error instanceof ZohoOAuthError) {
      return NextResponse.json(
        { error: error.message, code: error.code },
        { status: error.status }
      );
    }

    console.error("Unhandled Zoho OAuth exchange error", error);

    return NextResponse.json(
      { error: "Failed to exchange the Zoho authorization code." },
      { status: 500 }
    );
  }
}
