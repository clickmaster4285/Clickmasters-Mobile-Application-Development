import { getGuide, guides, normalizePath } from "@/content/guides";
import redirects from "@/data/redirects.json";
import retired from "@/data/retired-paths.json";

const retiredSet = new Set(retired);
const redirectMap = redirects as Record<string, string>;

const gonePrefixes = ["/blog", "/blogs", "/ebooks", "/case-studies"];

export type RouteDecision =
  | { type: "guide"; path: string }
  | { type: "redirect"; to: string }
  | { type: "gone" }
  | { type: "unknown" };

export function decidePath(pathname: string): RouteDecision {
  const path = normalizePath(pathname.split("?")[0] || "/");

  if (gonePrefixes.some((prefix) => path === prefix || path.startsWith(`${prefix}/`))) {
    return { type: "gone" };
  }

  if (getGuide(path)) return { type: "guide", path };

  const target = redirectMap[path];
  if (target) return { type: "redirect", to: target };

  const segments = path.split("/").filter(Boolean);
  if (segments.length === 1) {
    const match = guides.find(
      (guide) => guide.path.endsWith(`/${segments[0]}`) && guide.path !== path,
    );
    if (match) return { type: "redirect", to: match.path };
  }

  if (retiredSet.has(path)) return { type: "gone" };

  if (segments.length > 1 && retiredSet.has(`/${segments[0]}`)) {
    return { type: "gone" };
  }

  return { type: "unknown" };
}

export function retainedGuidePaths() {
  return guides.map((guide) => guide.path);
}
