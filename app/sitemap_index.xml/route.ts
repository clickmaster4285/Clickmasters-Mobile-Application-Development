const siteUrl = "https://clickmastersmobiledevelopmentcompany.com";
const lastModified = new Date().toISOString();

export async function GET() {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${siteUrl}/sitemap_pages.xml</loc>
    <lastmod>${lastModified}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${siteUrl}/sitemap_services.xml</loc>
    <lastmod>${lastModified}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${siteUrl}/sitemap_solutions.xml</loc>
    <lastmod>${lastModified}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${siteUrl}/sitemap_case-studies.xml</loc>
    <lastmod>${lastModified}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${siteUrl}/sitemap_blogs.xml</loc>
    <lastmod>${lastModified}</lastmod>
  </sitemap>
</sitemapindex>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
