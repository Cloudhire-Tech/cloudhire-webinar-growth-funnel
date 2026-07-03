import { PrimaryCtaButton } from "@/components/ui/primary-cta-button";
import { registrationContent } from "@/content/registration";
import { cn } from "@/lib/utils";

type SectionCtaProps = {
  className?: string;
};

export function SectionCta({ className }: SectionCtaProps) {
  return (
    <div className={cn("flex justify-center", className ?? "section-cta")}>
      <PrimaryCtaButton
        href="#register"
        label={registrationContent.submitLabel}
      />
    </div>
  );
}
