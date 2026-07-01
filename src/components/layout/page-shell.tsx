import type { ReactNode } from "react";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { cn } from "@/lib/utils";

type PageShellProps = {
  children: ReactNode;
  className?: string;
  showHeaderCta?: boolean;
  shellVariant?: "dark" | "light";
};

export function PageShell({
  children,
  className,
  showHeaderCta = true,
  shellVariant = "light",
}: PageShellProps) {
  return (
    <div className="flex min-h-svh flex-col bg-background">
      <SiteHeader showCta={showHeaderCta} variant={shellVariant} />
      <div className={cn("flex flex-1 flex-col", className)}>{children}</div>
      <SiteFooter variant={shellVariant} />
    </div>
  );
}
