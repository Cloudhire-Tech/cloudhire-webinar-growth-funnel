import { format } from "date-fns";
import { toZonedTime } from "date-fns-tz";

import { getZohoAccessToken } from "@/lib/zoho/access-token";
import { getZohoWebinarZsoid } from "@/lib/zoho/org";
import { getZohoWebinarConfig, type ZohoWebinarConfig } from "@/lib/zoho/webinar-config";

export type ZohoWebinarRegistrantInput = {
  email: string;
  fullName: string;
  webinarDate: string;
};

export type ZohoWebinarRegistrationResult = {
  webinarId: string;
  attendeeId: string;
  joinUrl: string;
  status: string;
};

type WebinarSessionListItem = {
  sysId?: string;
  meetingKey?: string;
  uId?: string;
  startTimeMillis?: string;
  startTimeMillisec?: number;
  registrationLink?: string;
};

type WebinarListResponse = {
  session?: WebinarSessionListItem[];
};

type BulkRegistrationResponse = {
  registrant?: Array<{
    email?: string;
    joinLink?: string;
    registerId?: string;
  }>;
  failedCount?: number;
  successCount?: number;
  error?: {
    code?: number | string;
    message?: string;
    errorCode?: number;
    key?: string;
  };
};

type RegistrationListResponse = {
  registrants?: Array<{
    email?: string;
    registerId?: string;
    joinLink?: string;
    status?: string;
  }>;
};

export type ResolvedWebinarSession = {
  webinarKey: string;
  instanceId: string;
};

const WEBINAR_TIMEZONE = "Asia/Kolkata";

function splitFullName(fullName: string): { firstName: string; lastName: string } {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);

  if (parts.length === 0) {
    return { firstName: "Guest", lastName: "User" };
  }

  if (parts.length === 1) {
    return { firstName: parts[0]!, lastName: "." };
  }

  return {
    firstName: parts[0]!,
    lastName: parts.slice(1).join(" "),
  };
}

export function getSessionIsoDate(session: WebinarSessionListItem): string | null {
  const millis = session.startTimeMillis ?? session.startTimeMillisec;

  if (!millis) {
    return null;
  }

  return format(
    toZonedTime(new Date(Number(millis)), WEBINAR_TIMEZONE),
    "yyyy-MM-dd"
  );
}

export function pickWebinarSessionForDate(
  sessions: WebinarSessionListItem[],
  webinarDate: string,
  seriesKey?: string
): WebinarSessionListItem | null {
  const filtered = seriesKey
    ? sessions.filter(
        (session) =>
          session.uId === seriesKey ||
          session.meetingKey === seriesKey ||
          session.registrationLink?.includes(seriesKey)
      )
    : sessions;

  return (
    filtered.find((session) => getSessionIsoDate(session) === webinarDate) ??
    null
  );
}

function buildRegistrationUrl(
  config: ZohoWebinarConfig,
  zsoid: string,
  registrationTarget: ResolvedWebinarSession
): string {
  const url = new URL(
    `${config.apiBaseUrl.replace(/\/$/, "")}/api/v2/${zsoid}/register/${registrationTarget.webinarKey}.json`
  );

  url.searchParams.set("sendMail", String(config.sendMail));
  url.searchParams.set("instanceId", registrationTarget.instanceId);

  return url.toString();
}

async function zohoWebinarRequest<T>(
  url: string,
  init: RequestInit
): Promise<{ response: Response; payload: T | null; rawBody: string }> {
  const accessToken = await getZohoAccessToken();
  const config = getZohoWebinarConfig();

  if (!config) {
    throw new Error("Zoho Webinar is not configured.");
  }

  const response = await fetch(url, {
    ...init,
    headers: {
      Authorization: `Zoho-oauthtoken ${accessToken}`,
      "Content-Type": "application/json;charset=UTF-8",
      "X-ZSOURCE": config.xZsource,
      ...(init.headers ?? {}),
    },
    cache: "no-store",
  });

  const rawBody = await response.text();
  let payload: T | null = null;

  if (rawBody) {
    try {
      payload = JSON.parse(rawBody) as T;
    } catch {
      payload = null;
    }
  }

  return { response, payload, rawBody };
}

async function listWebinarSessions(
  config: ZohoWebinarConfig,
  zsoid: string
): Promise<WebinarSessionListItem[]> {
  const url = new URL(
    `${config.apiBaseUrl.replace(/\/$/, "")}/api/v2/${zsoid}/webinar.json`
  );
  url.searchParams.set("listtype", "all");
  url.searchParams.set("index", "1");
  url.searchParams.set("count", "100");

  const { response, payload, rawBody } = await zohoWebinarRequest<WebinarListResponse>(
    url.toString(),
    { method: "GET" }
  );

  if (!response.ok || !payload?.session) {
    throw new Error(
      `Failed to list Zoho Webinar sessions (${response.status}): ${rawBody || "empty response"}`
    );
  }

  return payload.session;
}

export async function resolveWebinarSessionForDate(
  config: ZohoWebinarConfig,
  webinarDate: string
): Promise<ResolvedWebinarSession> {
  if (config.instanceId) {
    return {
      webinarKey: config.webinarKey,
      instanceId: config.instanceId,
    };
  }

  const sessions = await listWebinarSessions(config, await getZohoWebinarZsoid());
  const matchedSession = pickWebinarSessionForDate(
    sessions,
    webinarDate,
    config.webinarKey
  );

  if (!matchedSession?.meetingKey || !matchedSession.sysId) {
    throw new Error(
      `No Zoho Webinar session found for ${webinarDate}. Check ZOHO_WEBINAR_KEY and ZOHO_WEBINAR_ZSOID.`
    );
  }

  return {
    webinarKey: matchedSession.meetingKey,
    instanceId: matchedSession.sysId,
  };
}

async function resolveAttendeeId(
  config: ZohoWebinarConfig,
  zsoid: string,
  registrationTarget: ResolvedWebinarSession,
  email: string,
  joinLink: string,
  registerId?: string
): Promise<string> {
  if (registerId) {
    return registerId;
  }

  const registerKeyMatch = joinLink.match(/registerKey=([^&]+)/);
  if (registerKeyMatch?.[1]) {
    return registerKeyMatch[1];
  }

  const listUrl = new URL(
    `${config.apiBaseUrl.replace(/\/$/, "")}/api/v2/${zsoid}/registration/${registrationTarget.webinarKey}.json`
  );
  listUrl.searchParams.set("index", "1");
  listUrl.searchParams.set("count", "100");
  listUrl.searchParams.set("sysId", registrationTarget.instanceId);

  const { response, payload } = await zohoWebinarRequest<RegistrationListResponse>(
    listUrl.toString(),
    { method: "GET" }
  );

  if (response.ok && payload?.registrants) {
    const match = payload.registrants.find(
      (registrant) => registrant.email?.toLowerCase() === email.toLowerCase()
    );

    if (match?.registerId) {
      return match.registerId;
    }
  }

  return joinLink;
}

export async function registerZohoWebinarAttendee(
  input: ZohoWebinarRegistrantInput
): Promise<ZohoWebinarRegistrationResult> {
  const config = getZohoWebinarConfig();

  if (!config) {
    throw new Error("Zoho Webinar is not configured.");
  }

  const registrationTarget = await resolveWebinarSessionForDate(
    config,
    input.webinarDate
  );
  const zsoid = await getZohoWebinarZsoid();
  const { firstName, lastName } = splitFullName(input.fullName);
  const url = buildRegistrationUrl(config, zsoid, registrationTarget);

  const { response, payload, rawBody } =
    await zohoWebinarRequest<BulkRegistrationResponse>(url, {
      method: "POST",
      body: JSON.stringify({
        registrant: [
          {
            email: input.email,
            firstName,
            lastName,
          },
        ],
      }),
    });

  if (!response.ok || !payload) {
    throw new Error(
      `Zoho Webinar registration failed (${response.status}): ${rawBody || "empty response"}`
    );
  }

  if (payload.error) {
    throw new Error(
      payload.error.message ??
        payload.error.key ??
        `Zoho Webinar registration error (${payload.error.code ?? "unknown"})`
    );
  }

  const registrant = payload.registrant?.find(
    (entry) => entry.email?.toLowerCase() === input.email.toLowerCase()
  );

  if (!registrant?.joinLink) {
    throw new Error(
      `Zoho Webinar registration did not return a join link: ${rawBody}`
    );
  }

  const attendeeId = await resolveAttendeeId(
    config,
    zsoid,
    registrationTarget,
    input.email,
    registrant.joinLink,
    registrant.registerId
  );

  return {
    webinarId: registrationTarget.webinarKey,
    attendeeId,
    joinUrl: registrant.joinLink,
    status: "registered",
  };
}
