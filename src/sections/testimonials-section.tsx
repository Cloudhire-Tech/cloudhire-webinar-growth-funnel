import { Star } from "lucide-react";

import { SectionHeader } from "@/components/section/section-header";
import { SectionCta } from "@/components/section/section-cta";
import { Section } from "@/components/section/section";
import { testimonialsContent } from "@/content/testimonials";
import { cn } from "@/lib/utils";

function StarRating({ rating }: { rating: number }) {
  return (
    <div
      className="flex items-center gap-0.5"
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          className={cn(
            "size-4",
            index < rating
              ? "fill-amber-400 text-amber-400"
              : "fill-muted text-muted"
          )}
          aria-hidden
        />
      ))}
    </div>
  );
}

export function TestimonialsSection() {
  return (
    <Section className="section-shell-tight section-bg-default">
      <SectionHeader
        eyebrow={testimonialsContent.eyebrow}
        title={testimonialsContent.heading}
      />

      <p className="text-muted-foreground mx-auto mb-8 max-w-3xl text-center text-xs leading-relaxed">
        {testimonialsContent.placeholderNotice}
      </p>

      <div className="mx-auto grid max-w-4xl gap-5 md:grid-cols-2">
        {testimonialsContent.testimonials.map((testimonial) => (
          <article
            key={testimonial.name}
            className="premium-card p-6 md:p-7"
          >
            <StarRating rating={testimonial.rating} />
            <blockquote className="text-muted-foreground mt-4 text-sm leading-relaxed">
              &ldquo;{testimonial.quote}&rdquo; — {testimonial.name} ·{" "}
              {testimonial.role}
            </blockquote>
          </article>
        ))}
      </div>
      <SectionCta />
    </Section>
  );
}
