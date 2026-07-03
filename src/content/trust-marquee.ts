export const trustMarqueeContent = {
  title: "Trusted By Top Professionals",
  companies: [
    "google",
    "amazon",
    "microsoft",
    "apple",
    "meta",
    "adobe",
    "netflix",
    "uber",
    "atlassian",
    "oracle",
    "ibm",
  ] as const,
  layout: {
    slotWidthPx: 136,
    logoHeightPx: 32,
    stripGapPx: 48,
    animationDurationSec: 58,
  },
} as const;

export type TrustCompany = (typeof trustMarqueeContent.companies)[number];

export const trustLogoTitles: Record<TrustCompany, string> = {
  google: "Google",
  amazon: "Amazon",
  microsoft: "Microsoft",
  apple: "Apple",
  meta: "Meta",
  adobe: "Adobe",
  netflix: "Netflix",
  uber: "Uber",
  atlassian: "Atlassian",
  oracle: "Oracle",
  ibm: "IBM",
};
