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

export const REGISTRATION_CONFIRMATION_EMAIL_SUBJECT =
  "Seat Locked ✅ (Read This Before Saturday)";

export const REGISTRATION_CONFIRMATION_EMAIL_PREVIEW =
  "Your join link + the one thing to bring.";

function getWebinarTimeForEmail(time: string): string {
  return time.replace(/\sIST$/, "");
}

export function buildRegistrationConfirmationEmailHtml(
  content: RegistrationConfirmationEmailContent
): string {
  const firstName = escapeHtml(content.firstName);
  const webinarDate = escapeHtml(content.session.date);
  const webinarTime = escapeHtml(getWebinarTimeForEmail(content.session.time));
  const joinUrl = escapeHtml(content.session.joinUrl);
  const calendarUrl = escapeHtml(content.calendarUrl);
  const logoUrl = escapeHtml(content.logoUrl);
  const previewText = escapeHtml(REGISTRATION_CONFIRMATION_EMAIL_PREVIEW);

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Webinar registration confirmed</title>
  </head>
  <body style="margin:0;padding:0;background-color:#fafafa;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#171717;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${previewText}</div>
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
                <p style="margin:0 0 16px;font-size:16px;line-height:1.6;color:#171717;">${firstName}, you're in. 🎯</p>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 32px 8px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#fff7ed;border:1px solid #ffedd5;border-radius:12px;">
                  <tr>
                    <td style="padding:20px;">
                      <p style="margin:0;font-size:15px;line-height:1.5;color:#171717;">📅 ${webinarDate} · 🕛 ${webinarTime} IST</p>
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
                <a href="${calendarUrl}" style="display:inline-block;background-color:#ffffff;color:#0c1527;text-decoration:none;font-size:15px;font-weight:600;line-height:1;padding:12px 24px;border-radius:12px;border:1px solid #e5e7eb;">Add to Calendar</a>
              </td>
            </tr>
            <tr>
              <td style="padding:0 32px 24px;">
                <p style="margin:0 0 16px;font-size:16px;line-height:1.6;color:#171717;">Do these two things and you'll get 10x more out of it:</p>
                <p style="margin:0 0 12px;font-size:15px;line-height:1.6;color:#525252;">1. Show up 5 minutes early. The auto-apply setup gets shown in the first 10 minutes — no recap for latecomers.</p>
                <p style="margin:0;font-size:15px;line-height:1.6;color:#525252;">2. Decide the exact role you want. Bring it. I'll show you live how the system hunts down 100+ of them a week and applies while you sleep.</p>
              </td>
            </tr>
            <tr>
              <td style="padding:0 32px 24px;">
                <p style="margin:0 0 16px;font-size:16px;line-height:1.6;color:#171717;">Reminders coming so you don't miss it. This is the one that fixes the grind.</p>
                <p style="margin:0;font-size:16px;line-height:1.6;color:#171717;">— Sejal</p>
              </td>
            </tr>
            <tr>
              <td style="padding:0 32px 32px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-top:1px solid #f3f4f6;">
                  <tr>
                    <td style="padding-top:20px;">
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
  const webinarTime = getWebinarTimeForEmail(content.session.time);

  return [
    `${content.firstName}, you're in. 🎯`,
    "",
    `📅 ${content.session.date} · 🕛 ${webinarTime} IST`,
    "",
    "Join Webinar",
    content.session.joinUrl,
    "",
    "Add to Calendar",
    content.calendarUrl,
    "",
    "Do these two things and you'll get 10x more out of it:",
    "",
    "1. Show up 5 minutes early. The auto-apply setup gets shown in the first 10 minutes — no recap for latecomers.",
    "",
    "2. Decide the exact role you want. Bring it. I'll show you live how the system hunts down 100+ of them a week and applies while you sleep.",
    "",
    "Reminders coming so you don't miss it. This is the one that fixes the grind.",
    "",
    "— Sejal",
  ].join("\n");
}
