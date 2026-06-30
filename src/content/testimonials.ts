export const reviewsContent = {
  title: "What Our Users Say",
  subtitle:
    "Hear from candidates who have used CloudHire in their job search.",
  reviews: [
    {
      name: "[User Name]",
      role: "[Job Title]",
      avatar: "UN",
      imageUrl: null as string | null,
      review:
        "[Placeholder review — e.g. CloudHire helped me prepare better for interviews and stay organized throughout my job search.]",
      rating: 5,
    },
    {
      name: "[User Name]",
      role: "[Job Title]",
      avatar: "UN",
      imageUrl: null as string | null,
      review:
        "[Placeholder review — e.g. The AI mock interviews gave me the confidence I needed before my final round.]",
      rating: 5,
    },
    {
      name: "[User Name]",
      role: "[Job Title]",
      avatar: "UN",
      imageUrl: null as string | null,
      review:
        "[Placeholder review — e.g. I landed more interview callbacks after refining my resume with CloudHire.]",
      rating: 5,
    },
  ] as const,
} as const;

/** @deprecated Use reviewsContent — kept for legacy section file */
export const testimonialsContent = {
  title: reviewsContent.title,
  subtitle: reviewsContent.subtitle,
  testimonials: reviewsContent.reviews.map((review) => ({
    name: review.name,
    role: review.role,
    avatar: review.avatar,
    quote: review.review,
  })),
} as const;
