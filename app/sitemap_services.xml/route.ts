import { allData } from "@/content/services";
import { allSlugs, getCategoryForSlug } from "@/content/servicesDetail";

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

  // /[service]
  Object.keys(allData).forEach((service) => {
    routes.add(`${siteUrl}/${service}`);
  });

  // /[service]/[slug]
  allSlugs.forEach((slug) => {
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
