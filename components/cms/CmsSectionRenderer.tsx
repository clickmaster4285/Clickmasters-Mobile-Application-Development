import type { CmsPost, CmsSection } from "@/lib/cms/types";
import { SECTION_COMPONENTS } from "./sections";

/**
 * Created-page content sections (A3/A4) that will actually render, sorted by
 * `order`. Hidden sections are skipped unless `settings.required` is true;
 * unknown section types are skipped silently. ERP "header"/"footer" sections
 * are not in SECTION_COMPONENTS: CMS pages always use the site's own
 * Navbar/Footer, so rendering them would add a second navbar.
 */
export function visibleSections(
  sections: CmsSection[] | undefined,
): CmsSection[] {
  if (!Array.isArray(sections)) return [];
  return sections
    .filter(
      (s): s is CmsSection =>
        !!s && typeof s === "object" && typeof s.type === "string",
    )
    .filter((s) => s.hidden !== true || s.settings?.required === true)
    .filter((s) =>
      Object.prototype.hasOwnProperty.call(SECTION_COMPONENTS, s.type!),
    )
    .map((s, index) => ({ s, index }))
    .sort(
      (a, b) =>
        (Number(a.s.order) || 0) - (Number(b.s.order) || 0) ||
        a.index - b.index,
    )
    .map(({ s }) => s);
}

/** Renders created-page content sections. Edit instructions (Part B) never go through here. */
export function CmsSectionRenderer({
  sections,
  posts = [],
}: {
  sections: CmsSection[] | undefined;
  posts?: CmsPost[];
}) {
  const visible = visibleSections(sections);
  if (visible.length === 0) return null;

  return (
    <>
      {visible.map((section, i) => {
        const Section = SECTION_COMPONENTS[section.type!];
        return (
          <Section
            key={section.id ?? `${section.type}-${i}`}
            section={section}
            posts={posts}
            isFirst={i === 0}
          />
        );
      })}
    </>
  );
}
