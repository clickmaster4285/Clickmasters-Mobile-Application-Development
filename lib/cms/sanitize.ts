import sanitizeHtmlLib from "sanitize-html";

// A6 — every CMS (html) field goes through this allow-list sanitizer, and
// every CMS URL through safeUrl(). Only http:, https:, mailto:, tel: and
// site-relative URLs are allowed; data: only for images.

const SAFE_SCHEMES = ["http", "https", "mailto", "tel"];

/** Returns a safe href/src, or undefined when the URL must be rejected. */
export function safeUrl(
  value: unknown,
  { allowDataImage = false } = {},
): string | undefined {
  if (typeof value !== "string") return undefined;
  // Strip control chars (tabs/newlines) browsers ignore inside schemes, so
  // "java\tscript:" cannot slip past the scheme check.
  // eslint-disable-next-line no-control-regex -- stripping control chars is the point
  const url = value.replace(/[\u0000-\u001F\u007F]/g, "").trim();
  if (!url) return undefined;

  if (url.startsWith("#") || url.startsWith("?")) return url;
  if (url.startsWith("/") && !url.startsWith("//")) return url;
  if (url.startsWith("//")) return `https:${url}`;

  const scheme = /^([a-z][a-z0-9+.-]*):/i.exec(url)?.[1]?.toLowerCase();
  if (!scheme) {
    // Relative path like "contact" or "./x": treat as site-relative.
    return /^[\w./-]/.test(url) ? url : undefined;
  }
  if (SAFE_SCHEMES.includes(scheme)) return url;
  if (
    allowDataImage &&
    scheme === "data" &&
    /^data:image\/(png|jpe?g|gif|webp|avif|svg\+xml);/i.test(url)
  ) {
    return url;
  }
  return undefined;
}

export function safeImageUrl(value: unknown): string | undefined {
  return safeUrl(value, { allowDataImage: true });
}

export function isExternalUrl(url: string): boolean {
  return /^https?:\/\//i.test(url);
}

const HTML_OPTIONS: sanitizeHtmlLib.IOptions = {
  allowedTags: [
    "p",
    "br",
    "hr",
    "div",
    "span",
    "section",
    "article",
    "aside",
    "header",
    "footer",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "strong",
    "b",
    "em",
    "i",
    "u",
    "s",
    "small",
    "sub",
    "sup",
    "mark",
    "abbr",
    "cite",
    "q",
    "blockquote",
    "pre",
    "code",
    "kbd",
    "ul",
    "ol",
    "li",
    "dl",
    "dt",
    "dd",
    "a",
    "img",
    "figure",
    "figcaption",
    "picture",
    "source",
    "table",
    "thead",
    "tbody",
    "tfoot",
    "tr",
    "th",
    "td",
    "caption",
    "colgroup",
    "col",
    "details",
    "summary",
  ],
  allowedAttributes: {
    "*": [
      "class",
      "id",
      "title",
      "lang",
      "dir",
      "aria-label",
      "aria-hidden",
      "role",
    ],
    a: ["href", "name", "target", "rel"],
    img: ["src", "srcset", "alt", "width", "height", "loading", "decoding"],
    source: ["srcset", "type", "media"],
    td: ["colspan", "rowspan", "align"],
    th: ["colspan", "rowspan", "align", "scope"],
    ol: ["start", "type", "reversed"],
    col: ["span"],
  },
  allowedSchemes: SAFE_SCHEMES,
  allowedSchemesByTag: {
    img: [...SAFE_SCHEMES, "data"],
    source: ["http", "https"],
  },
  allowedSchemesAppliedToAttributes: ["href", "src", "cite"],
  allowProtocolRelative: false,
  disallowedTagsMode: "discard",
  transformTags: {
    a: (tagName, attribs) => {
      const href = safeUrl(attribs.href);
      const next: Record<string, string> = { ...attribs };
      if (href) next.href = href;
      else delete next.href;
      if (next.target === "_blank") next.rel = "noopener noreferrer";
      else delete next.target;
      return { tagName, attribs: next };
    },
    img: (tagName, attribs) => {
      const src = safeImageUrl(attribs.src);
      const next: Record<string, string> = { ...attribs };
      if (src) next.src = src;
      else delete next.src;
      return { tagName, attribs: next };
    },
  },
};

/** Allow-list sanitize a rich-text HTML fragment. */
export function sanitizeHtml(html: unknown): string {
  if (typeof html !== "string" || html.trim() === "") return "";
  return sanitizeHtmlLib(html, HTML_OPTIONS);
}

/** Make CMS-provided CSS safe to drop into a <style> element. */
export function sanitizeCss(css: unknown): string {
  if (typeof css !== "string") return "";
  return css
    .replace(/<\/?style/gi, "")
    .replace(/</g, "\\3c ")
    .replace(/@import[^;]*;?/gi, "")
    .replace(/expression\s*\(/gi, "")
    .replace(/javascript:/gi, "");
}

/** Plain-text coercion for non-html fields. */
export function text(value: unknown): string {
  if (typeof value === "string") return value;
  if (typeof value === "number") return String(value);
  return "";
}

/** CSS color guard for values coming from the ERP design settings. */
export function safeColor(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const v = value.trim();
  if (/^#[0-9a-f]{3,8}$/i.test(v)) return v;
  if (/^(rgb|rgba|hsl|hsla|oklch)\([\d\s.,%/-]+\)$/i.test(v)) return v;
  return undefined;
}
