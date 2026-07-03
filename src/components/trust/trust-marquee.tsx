import type { CSSProperties } from "react";

import { TrustLogoSlot } from "@/components/trust/trust-logo-slot";
import { trustMarqueeContent } from "@/content/trust-marquee";

export function TrustMarquee() {
  const { companies, layout } = trustMarqueeContent;

  const marqueeStyle = {
    "--trust-slot-width": `${layout.slotWidthPx}px`,
    "--trust-logo-height": `${layout.logoHeightPx}px`,
    "--trust-strip-gap": `${layout.stripGapPx}px`,
    "--trust-marquee-duration": `${layout.animationDurationSec}s`,
  } as CSSProperties;

  return (
    <div
      className="trust-marquee"
      style={marqueeStyle}
      role="region"
      aria-label="Trusted by professionals at leading companies"
    >
      <div className="trust-marquee__edge trust-marquee__edge--left" aria-hidden />
      <div className="trust-marquee__edge trust-marquee__edge--right" aria-hidden />

      <div className="trust-marquee__scroll">
        <div className="trust-marquee__track">
          <ul className="trust-marquee__strip">
            {companies.map((company) => (
              <li key={company}>
                <TrustLogoSlot company={company} />
              </li>
            ))}
          </ul>
          <ul className="trust-marquee__strip" aria-hidden>
            {companies.map((company) => (
              <li key={`${company}-clone`}>
                <TrustLogoSlot company={company} />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <ul className="trust-marquee__grid">
        {companies.map((company) => (
          <li key={`${company}-static`}>
            <TrustLogoSlot company={company} />
          </li>
        ))}
      </ul>
    </div>
  );
}
