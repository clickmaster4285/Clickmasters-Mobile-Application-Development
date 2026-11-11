/**
 * Normalize a URL path / CMS slug to the canonical form used for lookups:
 * decoded, lowercased, no query/hash, no leading/trailing slash. Home is "/".
 *
 *   "/Services/AI-Reporting/"  -> "services/ai-reporting"
 *   "" | "/"                   -> "/"
 */
export function normalizeSlug(
  input: string | string[] | null | undefined,
): string {
  let value = Array.isArray(input) ? input.join("/") : (input ?? "");

  value = value.split(/[?#]/)[0];
  try {
    value = decodeURIComponent(value);
  } catch {
    // Malformed escape sequences: keep the raw value.
  }

  value = value
    .trim()
    .toLowerCase()
    .replace(/\/{2,}/g, "/")
    .replace(/^\/+|\/+$/g, "");
  return value === "" ? "/" : value;
}

/** Normalized slug -> request path form with a single leading slash. */
export function slugToPath(slug: string): string {
  return slug === "/" ? "/" : `/${slug}`;
}

/** Encode a normalized slug for use in an ERP URL path segment ("a/b c" -> "a/b%20c"). */
export function encodeSlugForUrl(slug: string): string {
  if (slug === "/") return "";
  return slug.split("/").map(encodeURIComponent).join("/");
}
