import { safeUrl, text } from "./sanitize";
import type { CmsNavItem } from "./types";

export type NavLink = { label: string; href: string; target?: "_blank" };
export type NavGroup = NavLink & { items: NavLink[] };
export type FooterColumn = { title: string; links: NavLink[] };

function sorted(items: CmsNavItem[] | undefined): CmsNavItem[] {
  if (!Array.isArray(items)) return [];
  return items
    .filter((i) => i && typeof i === "object")
    .map((item, index) => ({ item, index }))
    .sort(
      (a, b) =>
        (Number(a.item.order) || 0) - (Number(b.item.order) || 0) ||
        a.index - b.index,
    )
    .map(({ item }) => item);
}

function toLink(item: CmsNavItem): NavLink | null {
  const label = text(item.label).trim();
  const href = safeUrl(item.url) ?? (item.children?.length ? "#" : undefined);
  if (!label || !href) return null;
  return item.target === "_blank"
    ? { label, href, target: "_blank" }
    : { label, href };
}

/** ERP header navigation -> the site's Nav shape (top level + one dropdown level). */
export function toHeaderNav(items: CmsNavItem[] | undefined): NavGroup[] {
  return sorted(items)
    .map((item) => {
      const link = toLink(item);
      if (!link) return null;
      const children = sorted(item.children)
        .map(toLink)
        .filter((l): l is NavLink => !!l);
      return { ...link, items: children };
    })
    .filter((g): g is NavGroup => !!g);
}

/** ERP footer navigation -> footer columns (items with children become columns). */
export function toFooterColumns(
  items: CmsNavItem[] | undefined,
): FooterColumn[] {
  const columns: FooterColumn[] = [];
  const loose: NavLink[] = [];

  for (const item of sorted(items)) {
    const children = sorted(item.children)
      .map(toLink)
      .filter((l): l is NavLink => !!l);
    if (children.length > 0) {
      columns.push({
        title: text(item.label).trim() || "Links",
        links: children,
      });
    } else {
      const link = toLink(item);
      if (link) loose.push(link);
    }
  }

  if (loose.length > 0) columns.push({ title: "Links", links: loose });
  return columns;
}
