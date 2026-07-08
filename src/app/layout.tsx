import type { Metadata } from "next";

import { GoogleAnalytics } from "@/components/analytics/google-analytics";
import { MicrosoftClarity } from "@/components/analytics/microsoft-clarity";
import { siteConfig } from "@/content/site-config";
import { fontVariables } from "@/lib/fonts";
import { cn } from "@/lib/utils";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light" suppressHydrationWarning>
      <body
        className={cn(
          fontVariables,
          "min-h-svh bg-white font-sans text-neutral-900 antialiased"
        )}
      >
        <GoogleAnalytics />
        <MicrosoftClarity />
        {children}
      </body>
    </html>
  );
}
