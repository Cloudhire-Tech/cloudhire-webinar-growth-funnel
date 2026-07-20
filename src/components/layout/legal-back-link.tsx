import Link from "next/link";

/** Minimal back control for legal pages — navigates to the landing page. */
export function LegalBackLink() {
  return (
    <Link
      href="/"
      className="text-muted-foreground hover:text-foreground mb-8 inline-flex text-sm transition-colors"
    >
      ← Back
    </Link>
  );
}
