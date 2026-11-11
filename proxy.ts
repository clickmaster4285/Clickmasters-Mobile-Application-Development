import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decidePath } from "@/lib/library";

export function proxy(request: NextRequest) {
  const decision = decidePath(request.nextUrl.pathname);
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
