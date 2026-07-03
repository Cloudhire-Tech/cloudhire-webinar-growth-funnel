import { trustLogoTitles } from "@/content/trust-marquee";
import type { TrustCompany } from "@/content/trust-marquee";
import { getTrustLogoSvg } from "@/lib/trust-logos";

type TrustLogoSlotProps = {
  company: TrustCompany;
};

export function TrustLogoSlot({ company }: TrustLogoSlotProps) {
  const svg = getTrustLogoSvg(company);
  const title = trustLogoTitles[company];

  return (
    <div className="trust-logo-slot" title={title}>
      <div
        className="trust-logo-slot__mark"
        dangerouslySetInnerHTML={{ __html: svg }}
      />
    </div>
  );
}
