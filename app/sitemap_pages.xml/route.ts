import { site } from "@/lib/site";

function buildUrlElement(url: string, lastMod: string) {
  return `  <url>
    <loc>${url}</loc>
    <lastmod>${lastMod}</lastmod>
  </url>`;
}

export async function GET() {
  const lastMod = new Date().toISOString().split("T")[0];
  const pages = ["", "/about", "/contact", "/services"];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map((page) => buildUrlElement(`${site.url}${page}`, lastMod)).join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
