// app/sitemap.ts
import { allData } from "@/content/services";
import { allSlugs as directUrlSlugs } from "@/content/services/index";
import { allSlugs as detailSlugs, getCategoryForSlug } from "@/content/servicesDetail/index";

const siteUrl = "https://clickmastersmobiledevelopmentcompany.com";

function buildUrlElement(url: string, lastMod: string) {
  return `  <url>
    <loc>${url}</loc>
    <lastmod>${lastMod}</lastmod>
  </url>`;
}

export async function GET() {
  const lastMod = new Date().toISOString().split("T")[0];

  const routes = new Set<string>();

  // TYPE 1: Category pages - /[service]
  Object.keys(allData).forEach((service) => {
    routes.add(`${siteUrl}/${service}`);
  });

  // TYPE 2: Direct URL pages - /[slug] (from services/index.ts)
  // These are pages like /ai-businesses, /ai-code-review, etc.
  directUrlSlugs.forEach((slug) => {
    routes.add(`${siteUrl}/${slug}`);
  });

  // TYPE 3: Nested detail pages - /[service]/[slug] (from servicesDetail/index.ts)
  // These are pages like /ai-in-app-development/ai-agency, etc.
  detailSlugs.forEach((slug) => {
    const service = getCategoryForSlug(slug);
    if (service) {
      routes.add(`${siteUrl}/${service}/${slug}`);
    }
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...routes]
  .sort()
  .map((url) => buildUrlElement(url, lastMod))
  .join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}