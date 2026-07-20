import { CheckCircle2, ListChecks } from "lucide-react";
import { format, parseISO } from "date-fns";
import type { Metadata } from "next";
import Link from "next/link";

import { PageShell } from "@/components/layout/page-shell";
import { ThankYouPaymentRetry } from "@/components/thank-you/thank-you-payment-retry";
import {
  WebinarMetaGrid,
  WebinarMetaItem,
} from "@/components/webinar/webinar-meta";
import { thankYouContent } from "@/content/thank-you";
import { getWebinarDetails } from "@/content/webinar";
import {
  getWebinarRegistrationById,
  isPaidRegistration,
} from "@/lib/db/webinar-registrations";
import { resolvePaidRegistrationJoinUrl } from "@/lib/registration/thank-you-join-url";

export const metadata: Metadata = {
  title: "Thank You",
  description: "Your webinar registration is confirmed.",
};

type ThankYouPageProps = {
  searchParams: Promise<{ registration?: string }>;
};

function formatRegistrationDate(isoDate: string) {
  try {
    return format(parseISO(isoDate), "EEE, d MMMM");
  } catch {
    return isoDate;
  }
}

function TelegramIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.064-1.226-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  );
}

function WebinarDetailsBlock({
  displayDate,
  webinarTime,
  duration,
  platform,
}: {
  displayDate: string;
  webinarTime: string;
  duration: string;
  platform: string;
}) {
  return (
    <>
      <h2 className="text-foreground mb-4 text-sm font-semibold uppercase tracking-wider">
        {thankYouContent.detailsTitle}
      </h2>
      <WebinarMetaGrid className="grid-cols-1 sm:grid-cols-2">
        <WebinarMetaItem icon="calendar" label="Date" value={displayDate} />
        <WebinarMetaItem icon="clock" label="Time" value={webinarTime} />
        <WebinarMetaItem icon="duration" label="Duration" value={duration} />
        <WebinarMetaItem icon="video" label="Platform" value={platform} />
      </WebinarMetaGrid>
    </>
  );
}

function WebinarActionLinks({
  joinUrl,
  registrationId,
}: {
  joinUrl: string | null;
  registrationId: string;
}) {
  if (!joinUrl) {
    return null;
  }

  return (
    <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-start">
      <Link
        href={joinUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-primary inline-flex h-11 items-center justify-center rounded-xl px-5 text-sm font-semibold text-white transition-colors hover:bg-orange-600"
      >
        Open webinar link
      </Link>
      <Link
        href={`/api/webinar/calendar?registration=${encodeURIComponent(registrationId)}`}
        className="border-border text-foreground inline-flex h-11 items-center justify-center rounded-xl border bg-white px-5 text-sm font-semibold transition-colors hover:bg-stone-50"
      >
        Add to calendar (.ics)
      </Link>
    </div>
  );
}

export default async function ThankYouPage({ searchParams }: ThankYouPageProps) {
  const { registration: registrationId } = await searchParams;
  const registration = registrationId?.trim()
    ? await getWebinarRegistrationById(registrationId.trim())
    : null;
  const isPaid = isPaidRegistration(registration);

  if (!isPaid || !registration) {
    return (
      <PageShell showHeaderCta={false} shellVariant="light">
        <main className="container-shell flex flex-1 flex-col items-center justify-center py-16 md:py-24">
          <div className="w-full max-w-lg text-center">
            <h1 className="text-foreground text-3xl font-semibold tracking-tight md:text-4xl">
              {thankYouContent.paymentIncompleteHeadline}
            </h1>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed">
              {thankYouContent.paymentIncompleteDescription}
            </p>
            {registration ? (
              <ThankYouPaymentRetry
                registrationId={registration.id}
                fullName={registration.full_name}
                email={registration.email}
                mobile={registration.whatsapp_number}
              />
            ) : (
              <div className="mt-8">
                <Link
                  href="/#register"
                  className="bg-primary inline-flex h-11 items-center justify-center rounded-xl px-5 text-sm font-semibold text-white transition-colors hover:bg-orange-600"
                >
                  Back to registration
                </Link>
              </div>
            )}
          </div>
        </main>
      </PageShell>
    );
  }

  const webinarDetails = getWebinarDetails();
  const joinUrl = resolvePaidRegistrationJoinUrl(registration);
  const displayDate = formatRegistrationDate(registration.webinar_date);

  return (
    <PageShell showHeaderCta={false} shellVariant="light">
      <main className="container-shell flex flex-1 flex-col items-center justify-center py-16 md:py-24">
        <div className="w-full max-w-lg text-center md:max-w-3xl">
          <div className="mx-auto max-w-lg">
            <div className="bg-orange-50 text-primary mx-auto mb-8 flex size-20 items-center justify-center rounded-full ring-4 ring-orange-100">
              <CheckCircle2 className="size-10" aria-hidden />
            </div>

            <p className="text-primary mb-2 text-sm font-semibold tracking-wide uppercase">
              {thankYouContent.paymentSuccessfulLabel}
            </p>

            <p className="mb-3 text-3xl" aria-hidden>
              🎉
            </p>

            <h1 className="text-foreground text-3xl font-semibold tracking-tight md:text-4xl">
              {thankYouContent.headline}
            </h1>

            <p className="text-muted-foreground mt-4 text-base leading-relaxed">
              {thankYouContent.description}
            </p>
          </div>

          {/* Mobile: single combined card */}
          <div className="premium-card mt-10 p-6 text-left md:hidden">
            <WebinarDetailsBlock
              displayDate={displayDate}
              webinarTime={registration.webinar_time}
              duration={webinarDetails.duration}
              platform={webinarDetails.platform}
            />
            <WebinarActionLinks
              joinUrl={joinUrl}
              registrationId={registration.id}
            />
            <Link
              href={thankYouContent.telegram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary mt-6 inline-flex h-11 w-full items-center justify-center rounded-xl px-5 text-sm font-semibold text-white transition-colors hover:bg-orange-600"
            >
              {thankYouContent.telegram.mobileButtonLabel}
            </Link>
          </div>

          {/* Desktop: side-by-side equal-height cards */}
          <div className="mt-10 hidden md:grid md:grid-cols-2 md:items-stretch md:gap-6">
            <div className="premium-card flex h-full flex-col p-6 text-left md:p-8">
              <WebinarDetailsBlock
                displayDate={displayDate}
                webinarTime={registration.webinar_time}
                duration={webinarDetails.duration}
                platform={webinarDetails.platform}
              />
              <div className="mt-auto">
                <WebinarActionLinks
                  joinUrl={joinUrl}
                  registrationId={registration.id}
                />
              </div>
            </div>

            <div className="premium-card flex h-full flex-col p-6 text-left md:p-8">
              <div className="bg-orange-50 text-primary mb-4 inline-flex size-10 items-center justify-center rounded-full">
                <TelegramIcon className="size-5" />
              </div>
              <h2 className="text-foreground text-lg font-semibold tracking-tight">
                {thankYouContent.telegram.title}
              </h2>
              <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
                {thankYouContent.telegram.description}
              </p>
              <Link
                href={thankYouContent.telegram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary mt-5 inline-flex h-11 w-full items-center justify-center rounded-xl px-5 text-sm font-semibold text-white transition-colors hover:bg-orange-600"
              >
                {thankYouContent.telegram.buttonLabel}
              </Link>
              <p className="text-muted-foreground mt-4 text-xs leading-relaxed">
                {thankYouContent.telegram.supportingNote}
              </p>
            </div>
          </div>

          <div className="premium-card mx-auto mt-10 max-w-lg p-6 text-left md:p-8">
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
