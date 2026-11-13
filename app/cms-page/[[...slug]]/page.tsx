import type { Metadata } from "next";
import {
  cmsMetadataOr,
  renderCmsPageOrNotFound,
} from "@/components/cms/CmsRoute";

// Renders an ERP/CRM-created page at any URL. proxy.ts rewrites a request
// here whenever the CRM has a page at that path (it takes priority over code
// pages, guides, retired paths and redirects). Direct requests to /cms-page
// are 404ed by the proxy.
//
// Rendered on every request with fresh CRM data (no ISR / data cache), so a
// page created or edited in the CRM shows on the very first load — never a
// stale copy that needs a refresh.

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug?: string[] }> };

const pathOf = (slug: string[] | undefined) =>
  slug && slug.length > 0 ? slug.join("/") : "/";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return cmsMetadataOr(pathOf((await params).slug), {}, { fresh: true });
}

export default async function CmsRewrittenPage({ params }: Props) {
  return renderCmsPageOrNotFound(pathOf((await params).slug), { fresh: true });
}
