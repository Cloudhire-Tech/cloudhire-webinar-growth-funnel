import { Quote, Star } from "lucide-react";

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
              ? "fill-amber-400 text-amber-400"
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
    <Section className="section-shell-tight section-bg-alt">
      <SectionHeader
        eyebrow={reviewsContent.eyebrow}
        title={reviewsContent.title}
        subtitle={reviewsContent.subtitle}
      />

      <div className="grid gap-5 md:grid-cols-3">
        {reviewsContent.reviews.map((review, index) => (
          <article
            key={`${review.name}-${index}`}
            className="premium-card flex flex-col p-6 md:p-7"
          >
            <StarRating rating={review.rating} />

            <Quote
              className="text-primary/20 mt-4 size-8"
              aria-hidden
            />

            <blockquote className="text-muted-foreground mt-2 flex-1 text-sm leading-relaxed">
              {review.review}
            </blockquote>

            <footer className="mt-6 flex items-center gap-3 border-t border-border/60 pt-5">
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
