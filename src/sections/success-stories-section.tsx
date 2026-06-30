import { Quote } from "lucide-react";

import { SectionHeader } from "@/components/section/section-header";
import { Section } from "@/components/section/section";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { testimonialsContent } from "@/content/testimonials";

export function SuccessStoriesSection() {
  return (
    <Section className="bg-muted/30">
      <SectionHeader
        title={testimonialsContent.title}
        subtitle={testimonialsContent.subtitle}
      />

      <div className="grid gap-6 md:grid-cols-3">
        {testimonialsContent.testimonials.map((testimonial) => (
          <article
            key={testimonial.name}
            className="premium-card flex flex-col p-6 md:p-8"
          >
            <Quote
              className="text-primary/40 mb-4 size-8"
              aria-hidden
            />
            <blockquote className="text-foreground flex-1 text-sm leading-relaxed">
              &ldquo;{testimonial.quote}&rdquo;
            </blockquote>
            <footer className="mt-6 flex items-center gap-3 border-t border-border/60 pt-6">
              <Avatar className="size-10">
                <AvatarFallback className="bg-primary/10 text-primary text-sm font-medium">
                  {testimonial.avatar}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-foreground text-sm font-semibold">
                  {testimonial.name}
                </p>
                <p className="text-muted-foreground text-xs">
                  {testimonial.role}
                </p>
              </div>
            </footer>
          </article>
        ))}
      </div>
    </Section>
  );
}
