import { cache } from "react";
import { CMS_REVALIDATE_SECONDS, cmsBaseUrl, cmsWarn } from "./config";
import { normalizeFlatEdits, normalizeSectionEdits } from "./edits";
import { encodeSlugForUrl, normalizeSlug } from "./slug";
import type { CmsPage, CmsPageSummary, CmsSiteInfo, PageEdits } from "./types";

// All ERP calls are public GETs, cached for ~60s in the Next.js data cache.
// Every helper resolves to null/[] on any failure so the site renders as if
// the ERP did not exist.

const REQUEST_TIMEOUT_MS = 4000;
// After repeated network failures, skip the ERP for a while instead of paying
// the timeout on every page (matters during `next build` with a dead host).
// A single transient failure does not trip it.
const CIRCUIT_OPEN_MS = 30_000;
const CIRCUIT_FAILURE_THRESHOLD = 3;
let circuitOpenUntil = 0;
let consecutiveFailures = 0;

type CmsResult<T> = { status: number; data: T | null };

/**
 * `fresh: true` skips Next's data cache entirely (and asks upstream caches
 * not to serve a stale copy). Only use it from dynamic route handlers — in a
 * page/layout it would opt the whole route out of static rendering.
 */
async function cmsGet<T>(
  path: string,
  { fresh = false }: { fresh?: boolean } = {},
): Promise<CmsResult<T> | null> {
  const base = cmsBaseUrl();
  if (!base) return null;
  if (Date.now() < circuitOpenUntil) return null;

  const url = `${base}${path}`;
  const request = () =>
    fetch(url, {
      headers: fresh
        ? { Accept: "application/json", "Cache-Control": "no-cache" }
        : { Accept: "application/json" },
      ...(fresh
        ? { cache: "no-store" as const }
        : { next: { revalidate: CMS_REVALIDATE_SECONDS } }),
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });

  try {
    let res: Response;
    try {
      res = await request();
    } catch (error) {
      // One retry for connection-level errors (e.g. a reused keep-alive
      // socket the server already closed); timeouts are not retried.
      if (
        error instanceof Error &&
        (error.name === "TimeoutError" || error.name === "AbortError")
      )
        throw error;
      res = await request();
    }

    consecutiveFailures = 0;
    if (res.status === 404) return { status: 404, data: null };
    if (!res.ok) {
      cmsWarn(`GET ${url} -> ${res.status}`);
      return { status: res.status, data: null };
    }

    const json = (await res.json()) as { data?: T } | T;
    const data =
      json && typeof json === "object" && "data" in (json as object)
        ? ((json as { data?: T }).data ?? null)
        : (json as T);
    return { status: res.status, data };
  } catch (error) {
    consecutiveFailures++;
    if (consecutiveFailures >= CIRCUIT_FAILURE_THRESHOLD) {
      circuitOpenUntil = Date.now() + CIRCUIT_OPEN_MS;
      consecutiveFailures = 0;
    }
    const cause =
      error instanceof Error && error.cause instanceof Error
        ? ` (${error.cause.message})`
        : "";
    cmsWarn(
      `GET ${url} failed:`,
      error instanceof Error ? `${error.message}${cause}` : error,
    );
    return null;
  }
}

/** A1 — site info, design colors and navigation. */
export const getCmsSiteInfo = cache(async (): Promise<CmsSiteInfo | null> => {
  const result = await cmsGet<CmsSiteInfo>("");
  return result?.data ?? null;
});

/**
 * A2 — list of created pages. `fresh` bypasses the ~60s data cache (only for
 * dynamic routes, e.g. app/cms-page, so CRM changes show on the first load).
 */
export const getCmsPages = cache(
  async (fresh: boolean = false): Promise<CmsPageSummary[]> => {
    const result = await cmsGet<{ pages?: CmsPageSummary[] }>("/pages", {
      fresh,
    });
    const pages = result?.data?.pages;
    return Array.isArray(pages) ? pages : [];
  },
);

/** A3 — one created page by (normalized) slug; null when missing or ERP down. */
export const getCmsPage = cache(
  async (slug: string, fresh: boolean = false): Promise<CmsPage | null> => {
    const normalized = normalizeSlug(slug);
    const result = await cmsGet<{ page?: CmsPage }>(
      `/pages/${encodeSlugForUrl(normalized)}`,
      { fresh },
    );
    const page = result?.data?.page;
    return page && typeof page === "object" ? page : null;
  },
);

/** B1 — normalized slugs of every page that has published DOM edits. */
async function loadEditedPageSlugs(fresh: boolean): Promise<string[]> {
  const result = await cmsGet<{ pages?: CmsPageSummary[] }>("/edited-pages", {
    fresh,
  });
  const pages = result?.data?.pages;
  if (!Array.isArray(pages)) return [];
  return Array.from(
    new Set(
      pages
        .map((p) =>
          typeof p?.slug === "string" ? normalizeSlug(p.slug) : null,
        )
        .filter((s): s is string => !!s),
    ),
  );
}

/** B2 — edits for one path. Checks the B1 list first so we never request 404s. */
async function loadPageEdits(
  path: string,
  fresh: boolean,
): Promise<PageEdits | null> {
  const slug = normalizeSlug(path);
  const editedSlugs = await loadEditedPageSlugs(fresh);
  if (!editedSlugs.includes(slug)) return null;

  const requestPath = slug === "/" ? "/" : `/${slug}`;

  // Flat form used by website loaders.
  const flat = await cmsGet<{
    title?: string;
    seo?: PageEdits["seo"];
    patches?: unknown;
    operations?: unknown;
    version?: number | string;
    publishedAt?: string;
  }>(`/page-edits?path=${encodeURIComponent(requestPath)}`, { fresh });

  if (flat?.status === 404) return null;
  if (flat?.data) {
    return {
      title: flat.data.title,
      seo: flat.data.seo,
      version: flat.data.version,
      publishedAt: flat.data.publishedAt,
      instructions: normalizeFlatEdits(flat.data.patches, flat.data.operations),
    };
  }

  // Fallback: sections (envelope) form.
  const envelope = await cmsGet<{
    page?: CmsPage & { version?: number | string };
  }>(
    slug === "/"
      ? `/edited-page?slug=${encodeURIComponent("/")}`
      : `/edited-pages/${encodeSlugForUrl(slug)}`,
    { fresh },
  );
  const page = envelope?.data?.page;
  if (!page) return null;
  return {
    title: page.title,
    seo: page.seo,
    version: page.version,
    publishedAt: page.publishedAt,
    instructions: normalizeSectionEdits(page.sections),
  };
}

/** B1 list, cached ~60s — for server-rendered HTML (anti-flicker list). */
export const getEditedPageSlugs = cache(() => loadEditedPageSlugs(false));

/** B2 edits, cached ~60s — for server-rendered SEO in generateMetadata. */
export const getPageEdits = cache((path: string) => loadPageEdits(path, false));

/**
 * B2 edits straight from the ERP, never cached — used by the browser-facing
 * /api/cms/page-edits route so a publish in the ERP shows on the very next
 * page load instead of after several refreshes.
 */
export const getLivePageEdits = cache((path: string) =>
  loadPageEdits(path, true),
);
