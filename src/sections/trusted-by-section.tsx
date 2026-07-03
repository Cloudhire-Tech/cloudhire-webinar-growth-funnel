import { TrustMarquee } from "@/components/trust/trust-marquee";
import { trustMarqueeContent } from "@/content/trust-marquee";

export function TrustedBySection() {
  return (
    <section
      className="trust-by-section border-y border-border/50 bg-stone-50/90 py-10 md:py-12"
      aria-labelledby="trusted-by-heading"
    >
      <div className="container-shell mb-8 md:mb-10">
        <h2
          id="trusted-by-heading"
          className="text-muted-foreground text-center text-xs font-semibold tracking-[0.2em] uppercase md:text-sm"
        >
          {trustMarqueeContent.title}
        </h2>
      </div>
      <TrustMarquee />
    </section>
  );
}
