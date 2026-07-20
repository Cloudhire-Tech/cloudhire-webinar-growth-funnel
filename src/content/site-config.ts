export const siteConfig = {
  name: "CloudHire",
  title: "100+ job applications a week. On autopilot.",
  description:
    "Watch the system that applies to remote jobs at Indian companies for you — live, start to finish. Reserve your seat.",
  url: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
} as const;
