import Link from "next/link";

import { CloudHireLogo } from "@/components/brand/cloudhire-logo";
import { Separator } from "@/components/ui/separator";
import { footerContent } from "@/content/footer";
import { siteConfig } from "@/content/site-config";

type SiteFooterProps = {
  variant?: "dark" | "light";
};

export function SiteFooter({ variant = "light" }: SiteFooterProps) {
  const year = new Date().getFullYear();
  const isDark = variant === "dark";

  if (isDark) {
    return (
      <footer className="border-t border-white/10 bg-[var(--brand-navy)] text-white">
        <div className="container-shell flex flex-col items-center gap-6 py-10 text-center md:py-12">
          <CloudHireLogo href="/" />
          <nav
            aria-label="Footer"
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
          >
            <Link
              href={footerContent.privacyPolicyUrl}
              className="text-sm text-white/55 transition-colors hover:text-white"
            >
              Privacy Policy
            </Link>
            <Link
              href={footerContent.termsUrl}
              className="text-sm text-white/55 transition-colors hover:text-white"
            >
              Terms
            </Link>
          </nav>
          <p className="text-xs text-white/40">
            © {year} {siteConfig.name}. All rights reserved.
          </p>
        </div>
      </footer>
    );
  }

  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container-shell py-10 md:py-12">
        <div className="flex flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left">
          <CloudHireLogo href="/" />
          <nav
            aria-label="Footer"
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
          >
            <Link
              href={footerContent.privacyPolicyUrl}
              className="text-muted-foreground hover:text-foreground text-sm transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href={footerContent.termsUrl}
              className="text-muted-foreground hover:text-foreground text-sm transition-colors"
            >
              Terms
            </Link>
          </nav>
        </div>
        <Separator className="my-8" />
        <p className="text-muted-foreground text-center text-xs">
          © {year} {siteConfig.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
