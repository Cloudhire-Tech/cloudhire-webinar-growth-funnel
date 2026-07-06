import { SectionHeader } from "@/components/section/section-header";
import { SectionCta } from "@/components/section/section-cta";
import { Section } from "@/components/section/section";
import { TestimonialCard } from "@/components/testimonials/testimonial-card";
import { WrittenReviews } from "@/components/testimonials/written-reviews";
import { testimonialsContent } from "@/content/testimonials";

export function TestimonialsSection() {
  const items = [
    ...testimonialsContent.videos,
    ...testimonialsContent.screenshots,
  ];

  return (
    <Section className="section-shell-tight section-bg-default">
      <SectionHeader
        eyebrow={testimonialsContent.eyebrow}
        title={testimonialsContent.heading}
      />

      <WrittenReviews />

      <div className="mx-auto flex w-full max-w-2xl flex-col gap-4 px-1 sm:gap-5 sm:px-0">
        {items.map((item) => (
          <TestimonialCard key={item.id} item={item} />
        ))}
      </div>

      <SectionCta />
    </Section>
  );
}
