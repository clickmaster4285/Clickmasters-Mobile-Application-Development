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
    .filter((guide) => guide.kind === "hub")
    .map((guide) => ({ service: guide.path.slice(1) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ service: string }>;
}): Promise<Metadata> {
  const { service } = await params;
  const decision = decidePath(`/${service}`);
  // Not a known guide/redirect/retired path: may be an ERP-created page.
  if (decision.type === "unknown") {
    return cmsMetadataOr(service, { title: "Page Not Found" });
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

export default async function ServicePage({
  params,
}: {
  params: Promise<{ service: string }>;
}) {
  const { service } = await params;
  const decision = decidePath(`/${service}`);

  if (decision.type === "redirect") permanentRedirect(decision.to);
  // Not a known guide: render an ERP-created page, else 404.
  if (decision.type === "unknown") return renderCmsPageOrNotFound(service);
  if (decision.type !== "guide") notFound();

  const guide = getGuide(decision.path);
  if (!guide || guide.kind !== "hub") notFound();
  return <GuideArticle guide={guide} />;
}
