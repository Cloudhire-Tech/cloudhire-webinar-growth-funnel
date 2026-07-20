import type { Metadata } from "next";

import { PageShell } from "@/components/layout/page-shell";
import { privacyPolicyContent } from "@/content/privacy-policy";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Learn how Cloudhire collects, uses, and protects your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <PageShell showHeaderCta={false} shellVariant="light">
      <main className="container-shell flex-1 py-12 md:py-16 lg:py-20">
        <article className="mx-auto w-full max-w-3xl">
          <h1 className="text-foreground text-3xl font-semibold tracking-tight md:text-4xl">
            {privacyPolicyContent.title}
          </h1>

          <p className="text-muted-foreground mt-6 text-base leading-relaxed md:text-lg">
            {privacyPolicyContent.intro}
          </p>

          <div className="mt-12 space-y-10">
            {privacyPolicyContent.sections.map((section) => (
              <section key={section.title} className="space-y-4">
                <h2 className="text-foreground text-xl font-semibold tracking-tight md:text-2xl">
                  {section.title}
                </h2>
                {section.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="text-muted-foreground text-base leading-relaxed"
                  >
                    {paragraph}
                  </p>
                ))}
                {"addressLines" in section && section.addressLines ? (
                  <address className="text-muted-foreground not-italic text-base leading-relaxed">
                    {section.addressLines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </address>
                ) : null}
              </section>
            ))}
          </div>
        </article>
      </main>
    </PageShell>
  );
}
