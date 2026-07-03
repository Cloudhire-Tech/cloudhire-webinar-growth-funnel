import fs from "fs";
import path from "path";

const LOGOS_DIR = path.join("public", "logos");

const titles = {
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

function extractViewBox(svg) {
  const viewBoxMatch = svg.match(/viewBox=["']([^"']+)["']/i);
  if (viewBoxMatch) return viewBoxMatch[1];

  const widthMatch = svg.match(/\bwidth=["']([\d.]+)/i);
  const heightMatch = svg.match(/\bheight=["']([\d.]+)/i);
  if (widthMatch && heightMatch) {
    return `0 0 ${widthMatch[1]} ${heightMatch[1]}`;
  }

  return null;
}

function inlineUseElements(svg) {
  return svg.replace(
    /<use\b[^>]*(?:href|xlink:href)=["']#([^"']+)["'][^>]*\/?>/gi,
    (full, id) => {
      const transformMatch = full.match(/transform=["']([^"']+)["']/i);
      const transform = transformMatch ? ` transform="${transformMatch[1]}"` : "";

      const pathPatterns = [
        new RegExp(
          `<path\\b[^>]*\\sid=["']${id}["'][^>]*\\sd=["']([^"']+)["']`,
          "i"
        ),
        new RegExp(
          `<path\\b[^>]*\\sd=["']([^"']+)["'][^>]*\\sid=["']${id}["']`,
          "i"
        ),
      ];

      for (const pattern of pathPatterns) {
        const match = svg.match(pattern);
        if (match) {
          return `<path fill="currentColor" d="${match[1]}"${transform}/>`;
        }
      }

      return "";
    }
  );
}

function stripNonGraphicElements(svg) {
  return svg
    .replace(/<\?xml[^>]*>/gi, "")
    .replace(/<!DOCTYPE[^>]*>/gi, "")
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<metadata[\s\S]*?<\/metadata>/gi, "")
    .replace(/<sodipodi:[^>]*\/>/gi, "")
    .replace(/<sodipodi:[\s\S]*?<\/sodipodi:[^>]*>/gi, "")
    .replace(/<inkscape:[^>]*\/>/gi, "")
    .replace(/<inkscape:[\s\S]*?<\/inkscape:[^>]*>/gi, "")
    .replace(/<defs[\s\S]*?<\/defs>/gi, "");
}

function normalizeSvg(raw, title) {
  if (raw.includes("File not found")) {
    throw new Error(`Invalid SVG for ${title}`);
  }

  let svg = stripNonGraphicElements(raw);
  svg = inlineUseElements(svg);

  const viewBox = extractViewBox(svg);
  if (!viewBox) {
    throw new Error(`Missing viewBox for ${title}`);
  }

  let inner = svg
    .replace(/<svg[^>]*>/i, "")
    .replace(/<\/svg>\s*$/i, "")
    .replace(/<title[\s\S]*?<\/title>/gi, "")
    .replace(/\sstyle=["'][^"']*["']/gi, "")
    .replace(/\sclass=["'][^"']*["']/gi, "")
    .replace(/\sid=["'][^"']*["']/gi, "")
    .replace(/\sxml:space=["'][^"']*["']/gi, "")
    .replace(/\sxmlns:[^=]+=["'][^"']*["']/gi, "")
    .replace(/\sinkscape:[^=]+=["'][^"']*["']/gi, "")
    .replace(/\ssodipodi:[^=]+=["'][^"']*["']/gi, "")
    .replace(/\sfill=["'](?!currentColor)[^"']*["']/gi, ' fill="currentColor"')
    .replace(/\sstroke=["'](?!currentColor)[^"']*["']/gi, ' stroke="currentColor"');

  inner = inner.replace(
    /<(path|rect|polygon|circle|ellipse|polyline)(?![^>]*\bfill=)/gi,
    '<$1 fill="currentColor"'
  );

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" role="img" aria-label="${title}" fill="currentColor"><title>${title}</title>${inner.trim()}</svg>`;
}

for (const file of fs.readdirSync(LOGOS_DIR)) {
  if (!file.endsWith(".svg")) continue;
  const slug = file.replace(".svg", "");
  const title = titles[slug];
  if (!title) {
    fs.unlinkSync(path.join(LOGOS_DIR, file));
    console.log(`✗ removed unlisted ${slug}`);
    continue;
  }

  const inputPath = path.join(LOGOS_DIR, file);
  const raw = fs.readFileSync(inputPath, "utf8");
  const normalized = normalizeSvg(raw, title);
  fs.writeFileSync(inputPath, normalized);
  console.log(`✓ normalized ${slug} (${normalized.length} bytes)`);
}
