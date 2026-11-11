import type { Metadata } from "next";
import { canonicalUrl } from "./config";
import { getPageEdits } from "./client";
import { safeImageUrl, safeUrl } from "./sanitize";
import { slugToPath } from "./slug";
import type { CmsPage, CmsSeo } from "./types";

function nonEmpty(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() !== ""
    ? value.trim()
    : undefined;
}

function resolveCanonical(value: unknown): string | undefined {
  const url = safeUrl(nonEmpty(value));
  if (!url) return undefined;
  if (/^https?:\/\//i.test(url)) return url;
  if (url.startsWith("/")) return canonicalUrl(url);
  return undefined;
}

function resolveRobots(
  robots: unknown,
  noindex: boolean | undefined,
): string | undefined {
  const value = nonEmpty(robots);
  if (!noindex || (value && /noindex/i.test(value))) return value;
  // Force noindex, keep any other directives (e.g. "follow").
  const rest = (value ?? "")
    .split(",")
    .map((d) => d.trim())
    .filter((d) => d && !/^index$/i.test(d));
  return ["noindex", ...rest].join(", ");
}

function twitterHandle(value: unknown): string | undefined {
  const handle = nonEmpty(value);
  if (!handle) return undefined;
  return handle.startsWith("@") ? handle : `@${handle}`;
}

/**
 * Overlay CMS SEO fields on top of an existing Metadata object. Only fields
 * that are actually set in the CMS override the base.
 */
export function mergeSeo(
  base: Metadata,
  seo: CmsSeo | undefined,
  options: { noindex?: boolean } = {},
): Metadata {
  if (!seo && !options.noindex) return base;
  const s = seo ?? {};

  const title = nonEmpty(s.title);
  const description = nonEmpty(s.metaDescription);
  const canonical = resolveCanonical(s.canonicalUrl);
  const robots = resolveRobots(s.robots, options.noindex);
  const ogTitle = nonEmpty(s.ogTitle) ?? title;
  const ogDescription = nonEmpty(s.ogDescription) ?? description;
  const ogImage = safeImageUrl(nonEmpty(s.ogImage));
  const handle = twitterHandle(s.twitterHandle);

  const next: Metadata = { ...base };
  if (title) next.title = { absolute: title };
  if (description) next.description = description;
  if (canonical) next.alternates = { ...(base.alternates ?? {}), canonical };
  if (robots) next.robots = robots;

  if (ogTitle || ogDescription || ogImage || canonical) {
    next.openGraph = {
      ...(base.openGraph ?? {}),
      ...(ogTitle ? { title: ogTitle } : {}),
      ...(ogDescription ? { description: ogDescription } : {}),
      ...(ogImage ? { images: [{ url: ogImage }] } : {}),
      ...(canonical ? { url: canonical } : {}),
    };
  }

  if (ogTitle || ogDescription || ogImage || handle) {
    next.twitter = {
      ...(base.twitter ?? {}),
      ...(ogTitle ? { title: ogTitle } : {}),
      ...(ogDescription ? { description: ogDescription } : {}),
      ...(ogImage ? { images: [ogImage] } : {}),
      ...(handle ? { site: handle, creator: handle } : {}),
    } as Metadata["twitter"];
  }

  return next;
}

/** Metadata for a created (CMS) page. */
export function createdPageMetadata(page: CmsPage, slug: string): Metadata {
  const path = slugToPath(slug);
  const title = nonEmpty(page.title);
  const base: Metadata = {
    ...(title ? { title: { absolute: title } } : {}),
    alternates: { canonical: canonicalUrl(path) },
    openGraph: {
      ...(title ? { title } : {}),
      url: canonicalUrl(path),
      type: page.pageType === "blog" ? "article" : "website",
      ...(safeImageUrl(page.featuredImage)
        ? { images: [{ url: safeImageUrl(page.featuredImage)! }] }
        : {}),
    },
  };
  return mergeSeo(base, page.seo, { noindex: page.noindex === true });
}

/**
 * B4 — apply edited-page SEO on the server for any route (code-owned or created).
 * Resolves to `base` unchanged when the path has no edits or the ERP is down.
 */
export async function withEditedSeo(
  path: string,
  base: Metadata,
): Promise<Metadata> {
  try {
    const edits = await getPageEdits(path);
    if (!edits) return base;
    return mergeSeo(base, edits.seo);
  } catch {
    return base;
  }
}
