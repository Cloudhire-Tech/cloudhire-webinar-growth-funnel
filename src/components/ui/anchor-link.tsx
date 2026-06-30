import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

type AnchorLinkProps = ComponentProps<"a">;

/**
 * Same-page anchor links should use a native <a>, not next/link.
 * Next.js Link can throw "[object Event]" for hash-only hrefs.
 */
export function AnchorLink({ className, href, ...props }: AnchorLinkProps) {
  return (
    <a
      href={href}
      className={cn(className)}
      {...props}
    />
  );
}
