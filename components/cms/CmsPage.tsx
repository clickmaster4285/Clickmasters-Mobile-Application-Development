import Script from "next/script";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { allowCustomJs } from "@/lib/cms/config";
import { sanitizeCss, sanitizeHtml } from "@/lib/cms/sanitize";
import type { CmsPage as CmsPageData } from "@/lib/cms/types";
import { CmsSectionRenderer, visibleSections } from "./CmsSectionRenderer";
import { PAGE_TONE } from "./primitives";

// ERP-created pages use this website's own look: same Navbar / Footer, cream
// background, and the site's brand palette (hot pink / ink / cream). ERP
// design colors are deliberately not applied so CMS pages match the rest of
// the site; they remain available as --erp-primary / --erp-secondary on <html>.

export function CmsPage({ page }: { page: CmsPageData }) {
  const css = sanitizeCss(page.customCode?.css);
  const html = sanitizeHtml(page.customCode?.html);
  const js =
    typeof page.customCode?.js === "string" ? page.customCode.js.trim() : "";
  // Same list the renderer uses, so a leading (ignored) ERP header section
  // does not stop a hero from being treated as first.
  const startsWithHero = visibleSections(page.sections)[0]?.type === "hero";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main
        data-cms-page={page.pageType ?? "page"}
        // A leading hero clears the fixed Navbar itself; otherwise match the
        // site's pages (pt-36).
        className={`text-ink ${startsWithHero ? "" : "pt-36"}`}
        style={PAGE_TONE}
      >
        {/* sanitizeCss strips "<" so the CSS cannot close the <style> element. */}
        {css && <style dangerouslySetInnerHTML={{ __html: css }} />}
        <CmsSectionRenderer
          sections={page.sections}
          posts={Array.isArray(page.context?.posts) ? page.context.posts : []}
        />
        {html && (
          <div
            data-cms-custom-html
            className="mx-auto max-w-[85vw] px-6 lg:px-10"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        )}
        {/* customCode.js runs only with explicit opt-in (CMS_ALLOW_CUSTOM_JS=true). */}
        {js && allowCustomJs() && (
          <Script
            id={`cms-custom-js-${(page.slug ?? "page").replace(/[^a-z0-9-]/gi, "-")}`}
            strategy="afterInteractive"
          >
            {js}
          </Script>
        )}
      </main>
      <Footer />
    </div>
  );
}
