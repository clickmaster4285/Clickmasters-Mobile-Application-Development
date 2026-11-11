import type { Metadata } from "next";
import {
  cmsMetadataOr,
  renderCmsPageOrNotFound,
} from "@/components/cms/CmsRoute";

// A5 — ERP-created pages three or more segments deep (e.g. /blog/2026/post).
// Shallower paths are handled by the code-owned [service] and
// [service]/[slug] routes, which fall back to the CMS before 404ing.
// Anything the ERP does not know about is a normal 404.

export const revalidate = 60;

// Render on first visit, then cache (ISR) for `revalidate` seconds.
export async function generateStaticParams() {
  return [];
}

type Props = {
  params: Promise<{ service: string; slug: string; rest: string[] }>;
};

function pathOf({
  service,
  slug,
  rest,
}: {
  service: string;
  slug: string;
  rest: string[];
}): string {
  return [service, slug, ...rest].join("/");
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return cmsMetadataOr(pathOf(await params), {});
}

export default async function CmsDeepPage({ params }: Props) {
  return renderCmsPageOrNotFound(pathOf(await params));
}
