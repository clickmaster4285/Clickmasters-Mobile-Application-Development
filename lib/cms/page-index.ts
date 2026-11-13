import { cmsBaseUrl, cmsWarn } from "./config";
import { normalizeSlug } from "./slug";

// Slugs of every ERP/CRM-created page, for proxy.ts (outside React, so no
// Next data cache). Kept in memory, but never trusted stale on a miss: a URL
// that is not in the list triggers a fresh check (at most once per
// MISS_RECHECK_MS), so a page just created in the CRM is found on the very
// first visit — no refresh needed. Any failure keeps the last good list.

const MISS_RECHECK_MS = 3_000;
const HIT_REFRESH_MS = 15_000;
const REQUEST_TIMEOUT_MS = 2500;

let cached: { at: number; slugs: Set<string> } | null = null;
let inflight: Promise<void> | null = null;

async function load(): Promise<void> {
  const base = cmsBaseUrl();
  if (!base) {
    cached = { at: Date.now(), slugs: new Set() };
    return;
  }
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
    cached = { at: Date.now(), slugs };
  } catch (error) {
    cmsWarn(
      "page index failed:",
      error instanceof Error ? error.message : error,
    );
    // Keep the last good list; don't hammer a failing ERP on every miss.
    cached = { at: Date.now(), slugs: cached?.slugs ?? new Set() };
  }
}

function refresh(): Promise<void> {
  inflight ??= load().finally(() => {
    inflight = null;
  });
  return inflight;
}

/** True when the ERP/CRM has a created page at `path`. */
export async function hasCmsPage(path: string): Promise<boolean> {
  const slug = normalizeSlug(path);
  if (!cached) await refresh();

  const age = Date.now() - cached!.at;
  if (cached!.slugs.has(slug)) {
    // Known page: answer now, refresh in the background so deletions apply.
    if (age >= HIT_REFRESH_MS) void refresh();
    return true;
  }
  // Not in the list: it may have just been created — check fresh.
  if (age >= MISS_RECHECK_MS) {
    await refresh();
    return cached!.slugs.has(slug);
  }
  return false;
}
