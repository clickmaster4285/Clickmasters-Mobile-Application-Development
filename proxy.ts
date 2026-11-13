import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decidePath } from "@/lib/library";
import { hasCmsPage } from "@/lib/cms/page-index";
import { normalizeSlug } from "@/lib/cms/slug";

// Internal route that renders an ERP/CRM-created page (see
// app/cms-page/[[...slug]]/page.tsx). Only reachable through the rewrite below.
const CMS_RENDER_PREFIX = "/cms-page";

// Never CRM pages: API routes and file-like requests (anything with an extension).
function isPageRequest(pathname: string): boolean {
  if (pathname === "/api" || pathname.startsWith("/api/")) return false;
  return !/\.[a-z0-9]+$/i.test(pathname);
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname === CMS_RENDER_PREFIX ||
    pathname.startsWith(`${CMS_RENDER_PREFIX}/`)
  ) {
    return new NextResponse("Not found\n", { status: 404 });
  }

  // A page created in the CRM wins over everything else at its URL — code
  // pages, guides, retired (410) paths and legacy redirects — so the CRM
  // user decides what lives at any URL (/blog, /about, /, ...).
  if (isPageRequest(pathname)) {
    const slug = normalizeSlug(pathname);
    if (await hasCmsPage(slug)) {
      const url = request.nextUrl.clone();
      url.pathname =
        slug === "/" ? CMS_RENDER_PREFIX : `${CMS_RENDER_PREFIX}/${slug}`;
      return NextResponse.rewrite(url);
    }
  }

  const decision = decidePath(pathname);
  if (decision.type === "gone") {
    return new NextResponse("This page has been removed.\n", {
      status: 410,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "X-Robots-Tag": "noindex",
      },
    });
  }
  if (decision.type === "redirect") {
    return NextResponse.redirect(new URL(decision.to, request.url), 301);
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|assets/|favicon.ico|robots.txt|sitemap).*)",
  ],
};
