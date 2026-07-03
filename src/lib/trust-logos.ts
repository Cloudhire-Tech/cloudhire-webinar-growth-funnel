import { readFileSync } from "fs";
import { join } from "path";

import type { TrustCompany } from "@/content/trust-marquee";

const logoCache = new Map<TrustCompany, string>();

export function getTrustLogoSvg(company: TrustCompany): string {
  const cached = logoCache.get(company);
  if (cached) return cached;

  const filePath = join(process.cwd(), "public", "logos", `${company}.svg`);
  const svg = readFileSync(filePath, "utf8");
  logoCache.set(company, svg);

  return svg;
}
