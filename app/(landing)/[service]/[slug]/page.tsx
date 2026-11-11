import type { Metadata } from "next";
import { permanentRedirect, notFound } from "next/navigation";
import { GuideArticle } from "@/components/guides/GuideArticle";
import { getGuide, guides } from "@/content/guides";
import { decidePath } from "@/lib/library";
import { capDescription } from "@/lib/site";
import {
  cmsMetadataOr,
  renderCmsPageOrNotFound,
} from "@/components/cms/CmsRoute";
import { withEditedSeo } from "@/lib/cms/metadata";

export function generateStaticParams() {
  return guides
    .filter((guide) => guide.kind === "article")
    .map((guide) => {
      const [, service, slug] = guide.path.split("/");
      return { service, slug };
    });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ service: string; slug: string }>;
}): Promise<Metadata> {
  const { service, slug } = await params;
  const decision = decidePath(`/${service}/${slug}`);
  // Not a known guide/redirect/retired path: may be an ERP-created page.
  if (decision.type === "unknown") {
    return cmsMetadataOr(`${service}/${slug}`, { title: "Page Not Found" });
  }
  if (decision.type !== "guide") {
    return { title: "Page removed", robots: { index: false, follow: false } };
  }
  const guide = getGuide(decision.path)!;
  const description = capDescription(guide.description);
  // Edited-page SEO from the ERP (B4), layered on the guide's own metadata.
  return withEditedSeo(guide.path, {
    title: guide.title,
    description,
    alternates: { canonical: guide.path },
    robots: { index: true, follow: true },
    openGraph: { title: guide.title, description, type: "article" },
  });
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ service: string; slug: string }>;
}) {
  const { service, slug } = await params;
  const decision = decidePath(`/${service}/${slug}`);

  if (decision.type === "redirect") permanentRedirect(decision.to);
  // Not a known guide: render an ERP-created page, else 404.
  if (decision.type === "unknown") return renderCmsPageOrNotFound(`${service}/${slug}`);
  if (decision.type !== "guide") notFound();

  const guide = getGuide(decision.path);
  if (!guide) notFound();
  return <GuideArticle guide={guide} />;
}
