import { CloudHireLogo } from "@/components/brand/cloudhire-logo";
import { PrimaryCtaButton } from "@/components/ui/primary-cta-button";
import { heroContent } from "@/content/hero";

type SiteHeaderProps = {
  showCta?: boolean;
};

export function SiteHeader({ showCta = true }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-orange-100/80 bg-white/90 backdrop-blur-md supports-[backdrop-filter]:bg-white/80">
      <div className="container-shell flex h-14 items-center justify-between md:h-16">
        <CloudHireLogo />
        {showCta ? (
          <PrimaryCtaButton
            href="#register"
            label={heroContent.primaryCta}
            className="hidden sm:inline-flex"
          />
        ) : null}
      </div>
    </header>
  );
}
