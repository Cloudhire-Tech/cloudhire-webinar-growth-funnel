import Image from "next/image";
import Link from "next/link";

import { siteConfig } from "@/content/site-config";
import { cn } from "@/lib/utils";

type CloudHireLogoProps = {
  className?: string;
  href?: string;
  imageClassName?: string;
};

export function CloudHireLogo({
  className,
  href = "/",
  imageClassName,
}: CloudHireLogoProps) {
  const logo = (
    <span className={cn("inline-flex items-center", className)}>
      <Image
        src="/images/cloudhire-logo.png"
        alt={siteConfig.name}
        width={128}
        height={32}
        priority
        className={cn("h-6 w-auto md:h-7", imageClassName)}
      />
    </span>
  );

  if (href) {
    return (
      <Link href={href} className="transition-opacity hover:opacity-80">
        {logo}
      </Link>
    );
  }

  return logo;
}
