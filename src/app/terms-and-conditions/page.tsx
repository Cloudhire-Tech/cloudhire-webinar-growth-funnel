import type { Metadata } from "next";

import { LegalBackLink } from "@/components/layout/legal-back-link";
import { PageShell } from "@/components/layout/page-shell";
import { termsAndConditionsContent } from "@/content/terms-and-conditions";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "CloudHire Candidate Platform Terms of Use governing access and use of the Platform.",
};

export default function TermsAndConditionsPage() {
  return (
    <PageShell showHeaderCta={false} shellVariant="light">
      <main className="container-shell flex-1 py-12 md:py-16 lg:py-20">
        <article className="mx-auto w-full max-w-3xl">
          <LegalBackLink />
          <p className="text-muted-foreground text-sm font-medium tracking-wide uppercase">
            {termsAndConditionsContent.brandTitle}
          </p>
          <h1 className="text-foreground mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
            {termsAndConditionsContent.title}
          </h1>
          <p className="text-muted-foreground mt-4 text-base leading-relaxed">
            {termsAndConditionsContent.effectiveDate}
          </p>

          <div className="mt-12 space-y-10">
            {termsAndConditionsContent.sections.map((section) => (
              <section key={section.title} className="space-y-4">
                <h2 className="text-foreground text-xl font-semibold tracking-tight md:text-2xl">
                  {section.title}
                </h2>

                {"paragraphs" in section && section.paragraphs
                  ? section.paragraphs.map((paragraph, index) => (
                      <p
                        key={`${section.title}-${index}`}
                        className="text-muted-foreground text-base leading-relaxed"
                      >
                        {paragraph}
                      </p>
                    ))
                  : null}

                {"subsections" in section && section.subsections
                  ? section.subsections.map((subsection) => (
                      <div key={subsection.title} className="space-y-3 pt-2">
                        <h3 className="text-foreground text-lg font-semibold tracking-tight">
                          {subsection.title}
                        </h3>
                        {subsection.paragraphs.map((paragraph, index) => (
                          <p
                            key={`${subsection.title}-${index}`}
                            className="text-muted-foreground text-base leading-relaxed"
                          >
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    ))
                  : null}
              </section>
            ))}
          </div>

          <p className="text-foreground mt-12 text-sm font-semibold tracking-wide uppercase">
            {termsAndConditionsContent.closing}
          </p>
        </article>
      </main>
    </PageShell>
  );
}
