import { siteConfig } from "@/content/site-config";
import type { WebinarSession } from "@/lib/webinar-schedule";

export type RegistrationConfirmationEmailContent = {
  firstName: string;
  session: WebinarSession;
  calendarUrl: string;
  logoUrl: string;
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function getRegistrationFirstName(fullName: string): string {
  const trimmed = fullName.trim();
  if (!trimmed) {
    return "there";
  }

  return trimmed.split(/\s+/)[0] ?? "there";
}

export function buildRegistrationConfirmationEmailHtml(
  content: RegistrationConfirmationEmailContent
): string {
  const firstName = escapeHtml(content.firstName);
  const date = escapeHtml(content.session.date);
  const time = escapeHtml(content.session.time);
  const duration = escapeHtml(content.session.duration);
  const joinUrl = escapeHtml(content.session.joinUrl);
  const calendarUrl = escapeHtml(content.calendarUrl);
  const logoUrl = escapeHtml(content.logoUrl);
  const title = escapeHtml(content.session.title);

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Webinar registration confirmed</title>
  </head>
  <body style="margin:0;padding:0;background-color:#fafafa;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#171717;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#fafafa;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;background-color:#ffffff;border:1px solid #f3f4f6;border-radius:16px;overflow:hidden;">
            <tr>
              <td style="padding:32px 32px 24px;text-align:center;background-color:#ffffff;">
                <img src="${logoUrl}" alt="CloudHire" width="140" height="35" style="display:block;margin:0 auto;height:auto;max-width:140px;" />
              </td>
            </tr>
            <tr>
              <td style="padding:0 32px 8px;">
                <p style="margin:0 0 16px;font-size:16px;line-height:1.6;color:#171717;">Hi ${firstName},</p>
                <h1 style="margin:0 0 12px;font-size:24px;line-height:1.3;font-weight:700;color:#0c1527;">Your seat is reserved</h1>
                <p style="margin:0;font-size:16px;line-height:1.6;color:#525252;">
                  You're confirmed for the <strong>${title}</strong>. We look forward to seeing you live.
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 32px 8px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#fff7ed;border:1px solid #ffedd5;border-radius:12px;">
                  <tr>
                    <td style="padding:20px;">
                      <p style="margin:0 0 12px;font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#ea580c;">Webinar details</p>
                      <p style="margin:0 0 8px;font-size:15px;line-height:1.5;color:#171717;"><strong>Date:</strong> ${date}</p>
                      <p style="margin:0 0 8px;font-size:15px;line-height:1.5;color:#171717;"><strong>Time:</strong> ${time}</p>
                      <p style="margin:0;font-size:15px;line-height:1.5;color:#171717;"><strong>Duration:</strong> ${duration}</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 32px 8px;text-align:center;">
                <a href="${joinUrl}" style="display:inline-block;background-color:#ea580c;color:#ffffff;text-decoration:none;font-size:16px;font-weight:700;line-height:1;padding:14px 28px;border-radius:12px;">Join Webinar</a>
              </td>
            </tr>
            <tr>
              <td style="padding:8px 32px 24px;text-align:center;">
                <a href="${calendarUrl}" style="display:inline-block;background-color:#ffffff;color:#0c1527;text-decoration:none;font-size:15px;font-weight:600;line-height:1;padding:12px 24px;border-radius:12px;border:1px solid #e5e7eb;">Add to Calendar (.ics)</a>
              </td>
            </tr>
            <tr>
              <td style="padding:0 32px 24px;">
                <p style="margin:0;font-size:14px;line-height:1.6;color:#525252;background-color:#fafafa;border-radius:10px;padding:14px 16px;">
                  Please join 5–10 minutes early so you're settled before we begin.
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding:0 32px 32px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-top:1px solid #f3f4f6;">
                  <tr>
                    <td style="padding-top:20px;">
                      <p style="margin:0 0 8px;font-size:14px;line-height:1.6;color:#525252;">
                        Need help? Reply to this email or visit
                        <a href="${escapeHtml(siteConfig.url)}" style="color:#ea580c;text-decoration:none;font-weight:600;">${escapeHtml(siteConfig.url.replace(/^https?:\/\//, ""))}</a>.
                      </p>
                      <p style="margin:0;font-size:12px;line-height:1.5;color:#a3a3a3;">
                        © ${new Date().getFullYear()} CloudHire. All rights reserved.
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export function buildRegistrationConfirmationEmailText(
  content: RegistrationConfirmationEmailContent
): string {
  return [
    `Hi ${content.firstName},`,
    "",
    "Your seat is reserved.",
    "",
    `You're confirmed for the ${content.session.title}.`,
    "",
    "Webinar details",
    `Date: ${content.session.date}`,
    `Time: ${content.session.time}`,
    `Duration: ${content.session.duration}`,
    "",
    `Join webinar: ${content.session.joinUrl}`,
    `Add to calendar: ${content.calendarUrl}`,
    "",
    "Please join 5–10 minutes early so you're settled before we begin.",
    "",
    `Need help? Visit ${siteConfig.url}`,
  ].join("\n");
}
