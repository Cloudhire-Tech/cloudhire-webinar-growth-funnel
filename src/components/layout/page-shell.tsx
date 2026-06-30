import type { ReactNode } from "react";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { cn } from "@/lib/utils";

type PageShellProps = {
  children: ReactNode;
  className?: string;
  showHeaderCta?: boolean;
};

export function PageShell({
  children,
  className,
  showHeaderCta = true,
}: PageShellProps) {
  return (
    <div className="flex min-h-svh flex-col bg-background">
      <SiteHeader showCta={showHeaderCta} />
      <div className={cn("flex flex-1 flex-col", className)}>{children}</div>
      <SiteFooter />
    </div>
  );
}
