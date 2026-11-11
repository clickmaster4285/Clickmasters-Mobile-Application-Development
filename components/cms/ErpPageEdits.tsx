"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import {
  anyPlainSelectorResolves,
  applyPageEdits,
} from "@/lib/cms/apply-edits";
import {
  ERP_MAX_HIDE_MS as MAX_HIDE_MS,
  ERP_PENDING_ATTR,
} from "@/lib/cms/anti-flicker";
import { normalizeSlug } from "@/lib/cms/slug";
import type { PageEditInstruction } from "@/lib/cms/types";

// B5 (client-router mode) — applies ERP DOM edits on first load and after
// every client-side navigation, exactly once per navigation.
//
// Mount ONCE in the root layout, BEFORE {children}. React runs this layout
// effect's cleanup in the commit's mutation phase, ahead of the old page's
// removal, so moved nodes are back in their original slot and hidden/edited
// nodes are restored before React unmounts or re-renders them (B6). Without
// that, the next navigation throws "Failed to execute 'removeChild'".

const DOM_WAIT_ATTEMPTS = 15;
const DOM_WAIT_INTERVAL_MS = 100;
// Only de-duplicates the double effect run of React StrictMode / a quick
// re-render. Every real navigation asks the server again so ERP edits show
// up immediately (the API route itself is never cached).
const CLIENT_CACHE_MS = 2_000;

type EditsResponse = { edits: { instructions: PageEditInstruction[] } | null };

const responseCache = new Map<
  string,
  { at: number; promise: Promise<PageEditInstruction[] | null> }
>();

function warn(...args: unknown[]) {
  if (process.env.NODE_ENV !== "production")
    console.warn("[erp-edits]", ...args);
}

function fetchEdits(slug: string): Promise<PageEditInstruction[] | null> {
  const cached = responseCache.get(slug);
  if (cached && Date.now() - cached.at < CLIENT_CACHE_MS) return cached.promise;

  const path = slug === "/" ? "/" : `/${slug}`;
  const promise = fetch(
    `/api/cms/page-edits?path=${encodeURIComponent(path)}`,
    {
      headers: { Accept: "application/json" },
      cache: "no-store",
    },
  )
    .then((res) =>
      res.ok ? (res.json() as Promise<EditsResponse>) : { edits: null },
    )
    .then((body) =>
      Array.isArray(body?.edits?.instructions) ? body.edits.instructions : null,
    )
    .catch((error) => {
      responseCache.delete(slug);
      warn("could not load edits", error);
      return null;
    });

  responseCache.set(slug, { at: Date.now(), promise });
  return promise;
}

function hide() {
  document.documentElement.setAttribute(ERP_PENDING_ATTR, "");
}

function reveal() {
  document.documentElement.removeAttribute(ERP_PENDING_ATTR);
}

export function ErpPageEdits({
  editedSlugs,
  antiFlicker = true,
}: {
  editedSlugs: string[];
  antiFlicker?: boolean;
}) {
  const pathname = usePathname();
  // Primitive key: a re-rendered layout passing an equal list must not
  // re-run the effect (re-applying would duplicate copies again).
  const editedKey = editedSlugs.join("\n");

  useLayoutEffect(() => {
    const slug = normalizeSlug(pathname);
    const edited = new Set(editedKey ? editedKey.split("\n") : []);

    let cancelled = false;
    let undo: (() => void) | null = null;
    let frame = 0;
    let retry: ReturnType<typeof setTimeout> | undefined;

    // `editedSlugs` is baked into the (possibly ISR-cached) HTML, so it only
    // drives anti-flicker. Whether edits exist is always asked of
    // /api/cms/page-edits, which checks the live B1 list server-side and never
    // requests a 404 from the ERP. On hard loads the inline <head> script has
    // already hidden <main>; on client navigations this runs before paint.
    if (antiFlicker && edited.has(slug)) hide();
    const revealTimer = setTimeout(reveal, MAX_HIDE_MS);

    const applyWhenReady = (
      instructions: PageEditInstruction[],
      attempt: number,
    ) => {
      // Wait for the new route's DOM to commit before touching it.
      frame = requestAnimationFrame(() => {
        if (cancelled) return;
        if (
          !anyPlainSelectorResolves(instructions) &&
          attempt < DOM_WAIT_ATTEMPTS
        ) {
          // Route DOM may still be streaming in; try again shortly.
          retry = setTimeout(
            () => applyWhenReady(instructions, attempt + 1),
            DOM_WAIT_INTERVAL_MS,
          );
          return;
        }
        try {
          undo = applyPageEdits(instructions).undo;
        } catch (error) {
          warn("failed to apply edits", error);
        }
        reveal();
      });
    };

    fetchEdits(slug).then((instructions) => {
      if (cancelled) return;
      if (!instructions || instructions.length === 0) {
        reveal();
        return;
      }
      applyWhenReady(instructions, 0);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      clearTimeout(retry);
      clearTimeout(revealTimer);
      // Restore moved/hidden/edited nodes and drop copies before React touches them.
      undo?.();
      undo = null;
      reveal();
    };
  }, [pathname, editedKey, antiFlicker]);

  return null;
}
