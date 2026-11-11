import type { Metadata } from "next";
import "./styles.css";
import { Providers } from "./providers";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import { ErpPageEdits } from "@/components/cms/ErpPageEdits";
import { CmsNavProvider } from "@/components/cms/CmsNavContext";
import { getCmsSiteInfo, getEditedPageSlugs } from "@/lib/cms/client";
import { toFooterColumns, toHeaderNav } from "@/lib/cms/navigation";
import { safeColor } from "@/lib/cms/sanitize";
import {
  erpAntiFlickerCss,
  erpAntiFlickerScript,
} from "@/lib/cms/anti-flicker";
import { SiteJsonLd } from "@/components/seo/SiteJsonLd";
import { site } from "@/lib/site";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "ClickMasters | iOS and Android App Development",
    template: "%s",
  },
  description: site.description,
  openGraph: {
    title: "ClickMasters | iOS and Android App Development",
    description: site.description,
    type: "website",
    url: site.url,
  },
  twitter: {
    card: "summary",
    title: "ClickMasters | iOS and Android App Development",
    description: site.description,
  },
  verification: {
    google: "8Q2IR2BEPc-qizdU0b-FRF6r3OLYynSSTTK-4h-HZIU",
  },
};

// Re-generate pages at most every 60s so ERP nav, colors, edited-page SEO and
// the anti-flicker list pick up changes — even if the build ran without the
// CMS env vars (then no ERP fetch happens at build to set a revalidate).
export const revalidate = 60;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // ERP CMS (optional): resolves to null / [] when unconfigured or unreachable,
  // in which case everything below renders exactly as before.
  const [cmsSite, editedSlugs] = await Promise.all([
    getCmsSiteInfo(),
    getEditedPageSlugs(),
  ]);
  const cmsHeaderNav = toHeaderNav(cmsSite?.navigation?.header);
  const cmsFooterColumns = toFooterColumns(cmsSite?.navigation?.footer);
  const erpPrimary = safeColor(
    cmsSite?.design?.colors?.primary ?? cmsSite?.website?.primaryColor,
  );
  const erpSecondary = safeColor(
    cmsSite?.design?.colors?.secondary ?? cmsSite?.website?.secondaryColor,
  );
  // Exposed as --erp-* tokens (used by CMS-created pages); the site's own
  // brand tokens are left untouched so existing pages look the same.
  const erpThemeVars = {
    ...(erpPrimary ? { "--erp-primary": erpPrimary } : {}),
    ...(erpSecondary ? { "--erp-secondary": erpSecondary } : {}),
  } as React.CSSProperties;
  const antiFlicker = process.env.CMS_ANTI_FLICKER !== "off";

  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={cn("font-sans", geist.variable)}
      style={erpThemeVars}
      // The anti-flicker <head> script may set data-erp-pending before hydration.
      suppressHydrationWarning
    >
      <head>
        {editedSlugs.length > 0 && antiFlicker && (
          <>
            <style dangerouslySetInnerHTML={{ __html: erpAntiFlickerCss }} />
            <script
              dangerouslySetInnerHTML={{
                __html: erpAntiFlickerScript(editedSlugs),
              }}
            />
          </>
        )}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700;800;900&family=Inter:wght@400;500;600;700&family=Caveat:wght@500;700&display=swap"
        />
      </head>
      <body>
        {/* Must stay before {children}: see ErpPageEdits for why. Renders no DOM. */}
        <ErpPageEdits editedSlugs={editedSlugs} antiFlicker={antiFlicker} />
        <SiteJsonLd />
        <CmsNavProvider header={cmsHeaderNav} footer={cmsFooterColumns}>
          <Providers>{children}</Providers>
        </CmsNavProvider>
      </body>
    </html>
  );
}
