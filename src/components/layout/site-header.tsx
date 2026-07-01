import { CloudHireLogo } from "@/components/brand/cloudhire-logo";
import { PrimaryCtaButton } from "@/components/ui/primary-cta-button";
import { heroContent } from "@/content/hero";
import { cn } from "@/lib/utils";

type SiteHeaderProps = {
  showCta?: boolean;
  variant?: "dark" | "light";
};

export function SiteHeader({
  showCta = true,
  variant = "light",
}: SiteHeaderProps) {
  const isDark = variant === "dark";

  return (
    <header
      className={cn(
        "sticky top-0 z-50 backdrop-blur-md",
        isDark
          ? "border-b border-white/10 bg-[var(--brand-navy)]/95"
          : "border-b border-orange-100/80 bg-white/90 supports-[backdrop-filter]:bg-white/80"
      )}
    >
      <div className="container-shell flex h-14 items-center justify-between md:h-16">
        <CloudHireLogo />
        {showCta ? (
          <PrimaryCtaButton
            href="#register"
            label={heroContent.primaryCta}
            className="hidden h-10 min-w-0 px-5 text-sm sm:inline-flex"
          />
        ) : null}
      </div>
    </header>
  );
}
