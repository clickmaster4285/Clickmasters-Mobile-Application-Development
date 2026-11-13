import { cmsBaseUrl, cmsWarn } from "./config";
import { normalizeSlug } from "./slug";

// Slugs of every ERP-created page, for use in proxy.ts (outside React, so no
// Next data cache): kept in memory for TTL_MS. Any failure yields an empty
// set, so the site behaves exactly as if the ERP did not exist.

const TTL_MS = 60_000;
const FAILURE_TTL_MS = 15_000;
const REQUEST_TIMEOUT_MS = 2500;

let cached: { at: number; ttl: number; slugs: Set<string> } | null = null;
let inflight: Promise<Set<string>> | null = null;

async function load(): Promise<Set<string>> {
  const base = cmsBaseUrl();
  if (!base) return new Set();
  try {
    const res = await fetch(`${base}/pages`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });
    if (!res.ok) throw new Error(`status ${res.status}`);
    const json = (await res.json()) as {
      data?: { pages?: { slug?: unknown }[] };
      pages?: { slug?: unknown }[];
    };
    const pages = json?.data?.pages ?? json?.pages;
    const slugs = new Set<string>();
    if (Array.isArray(pages)) {
      for (const p of pages) {
        if (typeof p?.slug === "string") slugs.add(normalizeSlug(p.slug));
      }
    }
    cached = { at: Date.now(), ttl: TTL_MS, slugs };
    return slugs;
  } catch (error) {
    cmsWarn(
      "page index failed:",
      error instanceof Error ? error.message : error,
    );
    // Keep serving the last good list; retry sooner than a normal refresh.
    const slugs = cached?.slugs ?? new Set<string>();
    cached = { at: Date.now(), ttl: FAILURE_TTL_MS, slugs };
    return slugs;
  }
}

/** True when the ERP has a created page at `path`. */
export async function hasCmsPage(path: string): Promise<boolean> {
  const slug = normalizeSlug(path);
  if (!cached || Date.now() - cached.at >= cached.ttl) {
    inflight ??= load().finally(() => {
      inflight = null;
    });
    // Serve the previous list while refreshing; only the first call waits.
    if (!cached) await inflight;
  }
  return cached?.slugs.has(slug) ?? false;
}
