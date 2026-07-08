import { CheckCircle2, ListChecks } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { PageShell } from "@/components/layout/page-shell";
import {
  WebinarMetaGrid,
  WebinarMetaItem,
} from "@/components/webinar/webinar-meta";
import { thankYouContent } from "@/content/thank-you";
import { getWebinarDetails } from "@/content/webinar";

export const metadata: Metadata = {
  title: "Thank You",
  description: "Your webinar registration is confirmed.",
};

export default function ThankYouPage() {
  const webinarDetails = getWebinarDetails();

  return (
    <PageShell showHeaderCta={false} shellVariant="light">
      <main className="container-shell flex flex-1 flex-col items-center justify-center py-16 md:py-24">
        <div className="w-full max-w-lg text-center">
          <div className="bg-orange-50 text-primary mx-auto mb-8 flex size-20 items-center justify-center rounded-full ring-4 ring-orange-100">
            <CheckCircle2 className="size-10" aria-hidden />
          </div>

          <p className="mb-3 text-3xl" aria-hidden>
            🎉
          </p>

          <h1 className="text-foreground text-3xl font-semibold tracking-tight md:text-4xl">
            {thankYouContent.headline}
          </h1>

          <p className="text-muted-foreground mt-4 text-base leading-relaxed">
            {thankYouContent.description}
          </p>

          <div className="mt-10 text-left">
            <h2 className="text-foreground mb-4 text-sm font-semibold uppercase tracking-wider">
              {thankYouContent.detailsTitle}
            </h2>
            <WebinarMetaGrid className="grid-cols-1 sm:grid-cols-2">
              <WebinarMetaItem
                icon="calendar"
                label="Date"
                value={webinarDetails.date}
              />
              <WebinarMetaItem
                icon="clock"
                label="Time"
                value={webinarDetails.time}
              />
              <WebinarMetaItem
                icon="duration"
                label="Duration"
                value={webinarDetails.duration}
              />
              <WebinarMetaItem
                icon="video"
                label="Platform"
                value={webinarDetails.platform}
              />
            </WebinarMetaGrid>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href={webinarDetails.joinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary inline-flex h-11 items-center justify-center rounded-xl px-5 text-sm font-semibold text-white transition-colors hover:bg-orange-600"
            >
              Open webinar link
            </Link>
            <Link
              href="/api/webinar/calendar"
              className="border-border text-foreground inline-flex h-11 items-center justify-center rounded-xl border bg-white px-5 text-sm font-semibold transition-colors hover:bg-stone-50"
            >
              Add to calendar (.ics)
            </Link>
          </div>

          <div className="premium-card mt-10 p-6 text-left md:p-8">
            <div className="mb-4 flex items-center gap-2">
              <ListChecks className="text-primary size-5" aria-hidden />
              <h2 className="text-foreground font-semibold">
                {thankYouContent.nextStepsTitle}
              </h2>
            </div>
            <ul className="space-y-3">
              {thankYouContent.nextSteps.map((step) => (
                <li
                  key={step}
                  className="text-muted-foreground flex items-start gap-3 text-sm leading-relaxed"
                >
                  <CheckCircle2
                    className="text-primary mt-0.5 size-4 shrink-0"
                    aria-hidden
                  />
                  {step}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </PageShell>
  );
}
