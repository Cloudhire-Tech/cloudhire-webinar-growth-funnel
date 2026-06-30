export const siteConfig = {
  name: "CloudHire",
  title: "Accelerate Your Job Search",
  description:
    "Join our free live webinar and learn practical strategies to land more interviews, stand out to employers, and move your career forward.",
  url: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
} as const;
