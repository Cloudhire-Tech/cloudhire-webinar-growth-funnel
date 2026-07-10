import { NextResponse } from "next/server";

import { isZohoOAuthSetupAuthorized } from "@/lib/zoho/config";
import { refreshAccessToken, ZohoOAuthError } from "@/lib/zoho/oauth";

export async function GET(request: Request) {
  if (!isZohoOAuthSetupAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const token = await refreshAccessToken();

    return NextResponse.json({
      success: true,
      message: "Zoho refresh token is valid.",
      expiresIn: token.expires_in,
      apiDomain: token.api_domain,
      tokenType: token.token_type,
    });
  } catch (error) {
    if (error instanceof ZohoOAuthError) {
      return NextResponse.json(
        { error: error.message, code: error.code },
        { status: error.status }
      );
    }

    console.error("Unhandled Zoho OAuth verify error", error);

    return NextResponse.json(
      { error: "Failed to verify the Zoho refresh token." },
      { status: 500 }
    );
  }
}
