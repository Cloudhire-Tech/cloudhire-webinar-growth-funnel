import { CloudHireLogo } from "@/components/brand/cloudhire-logo";
import { PrimaryCtaButton } from "@/components/ui/primary-cta-button";
import { headerContent } from "@/content/header";
import { cn } from "@/lib/utils";

type SiteHeaderProps = {
  showCta?: boolean;
  variant?: "dark" | "light";
};

export function SiteHeader({
  showCta = false,
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
      <div className="container-shell flex h-11 items-center justify-between md:h-14">
        <CloudHireLogo imageClassName="h-6 w-auto md:h-7" />
        {showCta ? (
          <PrimaryCtaButton
            href="#register"
            label="Reserve My Seat ₹9 →"
            className="h-9 min-w-0 px-4 text-xs sm:h-10 sm:px-5 sm:text-sm"
          />
        ) : (
          <span className="trust-chip inline-flex max-w-[52vw] items-center rounded-full border border-border/60 bg-stone-50 px-2 py-1 text-[9px] font-medium text-foreground/80 sm:max-w-none sm:px-2.5 sm:text-[11px]">
            {headerContent.trustChip}
          </span>
        )}
      </div>
    </header>
  );
}
