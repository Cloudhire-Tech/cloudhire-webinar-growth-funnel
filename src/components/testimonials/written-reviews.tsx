import { Star } from "lucide-react";

import { writtenReviewsContent } from "@/content/written-reviews";

const TRUSTPILOT_GREEN = "#00b67a";

function AggregateStars({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.25 && rating % 1 < 0.75;

  return (
    <div
      className="flex items-center gap-0.5"
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }, (_, index) => {
        if (index < fullStars) {
          return (
            <Star
              key={index}
              className="size-4 fill-amber-400 text-amber-400 sm:size-5"
              aria-hidden
            />
          );
        }

        if (index === fullStars && hasHalfStar) {
          return (
            <span key={index} className="relative inline-block size-4 sm:size-5">
              <Star
                className="absolute inset-0 size-4 fill-stone-200 text-stone-200 sm:size-5"
                aria-hidden
              />
              <Star
                className="absolute inset-0 size-4 fill-amber-400 text-amber-400 sm:size-5"
                style={{ clipPath: "inset(0 50% 0 0)" }}
                aria-hidden
              />
            </span>
          );
        }

        return (
          <Star
            key={index}
            className="size-4 fill-stone-200 text-stone-200 sm:size-5"
            aria-hidden
          />
        );
      })}
    </div>
  );
}

function ReviewStars() {
  return (
    <div className="flex items-center gap-0.5" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          className="size-3.5 fill-amber-400 text-amber-400 sm:size-4"
          aria-hidden
        />
      ))}
    </div>
  );
}

export function WrittenReviews() {
  return (
    <div className="mx-auto mb-8 w-full max-w-2xl px-1 sm:mb-10 sm:px-0">
      <div className="text-center">
        <h3 className="text-foreground text-xl font-bold tracking-tight sm:text-2xl md:text-3xl">
          {writtenReviewsContent.title}
        </h3>

        <div className="mt-3 flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
          <AggregateStars rating={writtenReviewsContent.rating} />
          <p className="text-muted-foreground text-sm sm:text-base">
            {writtenReviewsContent.rating} / 5 — {writtenReviewsContent.reviewCount}{" "}
            reviews
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:gap-4">
        {writtenReviewsContent.reviews.map((review) => (
          <article
            key={review.id}
            className="relative overflow-hidden rounded-lg border border-stone-200 bg-white py-3 pr-3 pl-4"
          >
            <div
              className="absolute top-0 bottom-0 left-0 w-1"
              style={{ backgroundColor: TRUSTPILOT_GREEN }}
              aria-hidden
            />

            <ReviewStars />

            <blockquote className="text-foreground mt-2 text-sm leading-relaxed">
              &ldquo;{review.quote}&rdquo;
            </blockquote>

            <p className="mt-2.5 flex items-center gap-1.5 text-xs">
              <Star
                className="size-3.5 shrink-0 sm:size-4"
                style={{ fill: TRUSTPILOT_GREEN, color: TRUSTPILOT_GREEN }}
                aria-hidden
              />
              <span className="text-muted-foreground">Verified on Trustpilot</span>
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
