import { execSync } from "child_process";
import fs from "fs";
import path from "path";

const LOGOS_DIR = path.join("public", "logos");
const UA = "Mozilla/5.0";

/** Official brand SVG sources (Wikimedia Commons). */
export const LOGO_SOURCES = {
  google:
    "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
  amazon:
    "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
  microsoft:
    "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg",
  apple:
    "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
  meta: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg",
  adobe:
    "https://upload.wikimedia.org/wikipedia/commons/6/6e/Adobe_Corporate_logo.svg",
  netflix:
    "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
  uber: "https://upload.wikimedia.org/wikipedia/commons/5/58/Uber_logo_2018.svg",
  atlassian:
    "https://upload.wikimedia.org/wikipedia/commons/4/4d/Atlassian-logo.svg",
  oracle:
    "https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg",
  ibm: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
};

fs.mkdirSync(LOGOS_DIR, { recursive: true });

for (const existing of fs.readdirSync(LOGOS_DIR)) {
  if (existing.endsWith(".svg")) {
    fs.unlinkSync(path.join(LOGOS_DIR, existing));
  }
}

for (const [slug, url] of Object.entries(LOGO_SOURCES)) {
  const dest = path.join(LOGOS_DIR, `${slug}.svg`);
  execSync(`curl -sL -A "${UA}" "${url}" -o "${dest}"`, { stdio: "pipe" });
  const size = fs.statSync(dest).size;
  const head = fs.readFileSync(dest, "utf8").slice(0, 60);
  if (size < 200 || head.includes("File not found")) {
    throw new Error(`Failed to download ${slug} from ${url}`);
  }
  console.log(`✓ fetched ${slug} (${size} bytes)`);
}
