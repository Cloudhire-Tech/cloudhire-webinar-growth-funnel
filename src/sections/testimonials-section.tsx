import { SectionHeader } from "@/components/section/section-header";
import { SectionCta } from "@/components/section/section-cta";
import { Section } from "@/components/section/section";
import { TestimonialCard } from "@/components/testimonials/testimonial-card";
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

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <TestimonialCard key={item.id} item={item} />
        ))}
      </div>

      <SectionCta />
    </Section>
  );
}
