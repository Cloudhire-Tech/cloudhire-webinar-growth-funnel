import { Star } from "lucide-react";

import { PrimaryCtaButton } from "@/components/ui/primary-cta-button";
import { SectionHeader } from "@/components/section/section-header";
import { Section } from "@/components/section/section";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { reviewsContent } from "@/content/testimonials";
import { heroContent } from "@/content/hero";
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
              ? "fill-primary text-primary"
              : "fill-muted text-muted"
          )}
          aria-hidden
        />
      ))}
    </div>
  );
}

export function ReviewsSection() {
  return (
    <Section className="section-shell-tight section-bg-default">
      <SectionHeader
        title={reviewsContent.title}
        subtitle={reviewsContent.subtitle}
      />

      <div className="grid gap-4 md:grid-cols-3 md:gap-5">
        {reviewsContent.reviews.map((review, index) => (
          <article
            key={`${review.name}-${index}`}
            className="premium-card flex flex-col p-5 md:p-6"
          >
            <StarRating rating={review.rating} />

            <blockquote className="text-muted-foreground mt-4 flex-1 text-sm leading-relaxed">
              &ldquo;{review.review}&rdquo;
            </blockquote>

            <footer className="mt-5 flex items-center gap-3 border-t border-border/60 pt-5">
              <Avatar className="size-11">
                {review.imageUrl ? (
                  <AvatarImage src={review.imageUrl} alt={review.name} />
                ) : null}
                <AvatarFallback className="bg-orange-50 text-primary text-sm font-semibold">
                  {review.avatar}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-foreground text-sm font-semibold">
                  {review.name}
                </p>
                <p className="text-muted-foreground text-xs">{review.role}</p>
              </div>
            </footer>
          </article>
        ))}
      </div>

      <div className="section-cta">
        <PrimaryCtaButton href="#register" label={heroContent.primaryCta} />
      </div>
    </Section>
  );
}
