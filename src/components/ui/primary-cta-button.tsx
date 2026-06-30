import type { ComponentProps } from "react";

import { AnchorLink } from "@/components/ui/anchor-link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const primaryCtaButtonClassName =
  "h-12 min-w-[200px] px-8 text-base shadow-lg shadow-orange-500/25 hover:shadow-xl hover:shadow-orange-500/30";

type PrimaryCtaButtonProps = {
  label: string;
  className?: string;
  fullWidth?: boolean;
} & (
  | ({ href: string } & Omit<ComponentProps<typeof AnchorLink>, "children">)
  | ({ href?: undefined } & ComponentProps<"button">)
);

export function PrimaryCtaButton({
  label,
  className,
  fullWidth,
  ...props
}: PrimaryCtaButtonProps) {
  const classes = cn(
    primaryCtaButtonClassName,
    fullWidth && "w-full min-w-0",
    className
  );

  if ("href" in props && props.href) {
    const { href, ...linkProps } = props;

    return (
      <Button asChild size="lg" className={classes}>
        <AnchorLink href={href} {...linkProps}>
          {label}
        </AnchorLink>
      </Button>
    );
  }

  const buttonProps = props as ComponentProps<"button">;

  return (
    <Button size="lg" className={classes} {...buttonProps}>
      {label}
    </Button>
  );
}
