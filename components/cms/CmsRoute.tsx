import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCmsPage, getCmsPages } from "@/lib/cms/client";
import { createdPageMetadata, withEditedSeo } from "@/lib/cms/metadata";
import { normalizeSlug, slugToPath } from "@/lib/cms/slug";
import { CmsPage } from "./CmsPage";

/**
 * A5 step 2/3: render the created page for `path`, or a normal 404.
 * Used as the fallback of the code-owned dynamic routes ([service],
 * [service]/[slug]) and by the deep [...rest] route.
 */
export async function renderCmsPageOrNotFound(
  path: string,
  { fresh = false }: { fresh?: boolean } = {},
) {
  const slug = normalizeSlug(path);
  const page = await getCmsPage(slug, fresh);
  if (!page) notFound();
  return <CmsPage page={page} />;
}

/** Metadata for the created page at `path` (with edited SEO on top), or `fallback`. */
export async function cmsMetadataOr(
  path: string,
  fallback: Metadata,
  { fresh = false }: { fresh?: boolean } = {},
): Promise<Metadata> {
  const slug = normalizeSlug(path);
  const [page, pages] = await Promise.all([
    getCmsPage(slug, fresh),
    getCmsPages(fresh),
  ]);
  if (!page) return fallback;

  const listed = pages.find(
    (p) => typeof p.slug === "string" && normalizeSlug(p.slug) === slug,
  );
  const withNoindex =
    listed?.noindex === true ? { ...page, noindex: true } : page;
  return withEditedSeo(
    slugToPath(slug),
    createdPageMetadata(withNoindex, slug),
  );
}
