// Edited-page instruction normalization + style sanitization.
// Pure functions, safe for both server and browser bundles.

import type { CmsSection, PageEditInstruction } from "./types";

export const ALLOWED_STYLE_PROPERTIES = new Set([
  "color",
  "font-size",
  "font-weight",
  "font-style",
  "font-family",
  "text-align",
  "text-transform",
  "text-decoration",
  "line-height",
  "letter-spacing",
  "background-color",
  "padding",
  "margin",
  "border",
  "border-width",
  "border-style",
  "border-color",
  "border-radius",
  "width",
  "max-width",
  "opacity",
]);

const STYLE_VALUE_PATTERN = /^[\w\s#(),.%'"+\-/]*$/;
const STYLE_VALUE_BLOCKLIST = /url\(|expression|javascript|@import/i;
const CLONE_ID_PATTERN = /^[A-Za-z0-9-]+$/;
export const CLONE_SELECTOR_PREFIX = "[data-erp-clone=";

/** Keep only allow-listed CSS properties with safe values. */
export function sanitizeEditStyles(
  input: unknown,
): Record<string, string> | undefined {
  if (!input || typeof input !== "object") return undefined;

  const out: Record<string, string> = {};
  for (const [rawProp, rawValue] of Object.entries(
    input as Record<string, unknown>,
  )) {
    const prop = rawProp.trim().toLowerCase();
    if (!ALLOWED_STYLE_PROPERTIES.has(prop)) continue;
    if (typeof rawValue !== "string" && typeof rawValue !== "number") continue;

    const value = String(rawValue).trim();
    if (!STYLE_VALUE_PATTERN.test(value)) continue;
    if (STYLE_VALUE_BLOCKLIST.test(value)) continue;
    out[prop] = value;
  }

  return Object.keys(out).length > 0 ? out : undefined;
}

export function isValidCloneId(id: unknown): id is string {
  return typeof id === "string" && CLONE_ID_PATTERN.test(id);
}

function str(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() !== "" ? value : undefined;
}

function position(value: unknown): "before" | "after" {
  return value === "after" ? "after" : "before";
}

function buildEdit(
  selector: string,
  text: unknown,
  styles: unknown,
): PageEditInstruction | null {
  const cleanStyles = sanitizeEditStyles(styles);
  const cleanText = typeof text === "string" ? text : undefined;
  if (cleanText === undefined && !cleanStyles) return null;
  return { kind: "edit", selector, text: cleanText, styles: cleanStyles };
}

/** Stable sort by numeric `order` when the ERP provides one; else keep array order. */
function byOrder<T>(list: T[]): T[] {
  return list
    .map((item, index) => ({ item, index }))
    .sort((a, b) => {
      const ao = Number((a.item as { order?: unknown })?.order);
      const bo = Number((b.item as { order?: unknown })?.order);
      const diff =
        (Number.isFinite(ao) ? ao : a.index) -
        (Number.isFinite(bo) ? bo : b.index);
      return diff || a.index - b.index;
    })
    .map(({ item }) => item);
}

/** Flat form: data.patches[] + data.operations[] (GET .../page-edits?path=). */
export function normalizeFlatEdits(
  patches: unknown,
  operations: unknown,
): PageEditInstruction[] {
  const out: PageEditInstruction[] = [];

  if (Array.isArray(operations)) {
    for (const op of byOrder(operations)) {
      if (!op || typeof op !== "object" || op.hidden === true) continue;
      const selector = str(op.selector);
      if (!selector) continue;

      if (op.action === "duplicate") {
        if (isValidCloneId(op.id))
          out.push({ kind: "duplicate", selector, id: op.id });
      } else if (op.action === "move") {
        const target = str(op.target);
        if (target)
          out.push({
            kind: "move",
            selector,
            target,
            position: position(op.position),
          });
      } else if (op.action === "remove") {
        out.push({ kind: "remove", selector });
      }
    }
  }

  if (Array.isArray(patches)) {
    for (const patch of byOrder(patches)) {
      if (!patch || typeof patch !== "object" || patch.hidden === true)
        continue;
      const selector = str(patch.selector);
      if (!selector) continue;
      const edit = buildEdit(selector, patch.text, patch.styles);
      if (edit) out.push(edit);
    }
  }

  return out;
}

/** Sections form: data.page.sections[] (GET .../edited-pages/{slug}). */
export function normalizeSectionEdits(
  sections: unknown,
): PageEditInstruction[] {
  if (!Array.isArray(sections)) return [];

  const sorted = [...(sections as CmsSection[])]
    .filter((s) => s && typeof s === "object" && s.hidden !== true)
    .sort((a, b) => (Number(a.order) || 0) - (Number(b.order) || 0));

  const out: PageEditInstruction[] = [];
  for (const section of sorted) {
    const content = section.content ?? {};
    const selector = str(content.selector);
    if (!selector) continue;

    switch (section.type) {
      case "elementEdit": {
        const edit = buildEdit(selector, content.text, {
          ...(content.styles ?? {}),
          ...(section.styles ?? {}),
        });
        if (edit) out.push(edit);
        break;
      }
      case "sectionDuplicate":
        if (isValidCloneId(content.id))
          out.push({ kind: "duplicate", selector, id: content.id });
        break;
      case "sectionMove": {
        const target = str(content.target);
        if (target)
          out.push({
            kind: "move",
            selector,
            target,
            position: position(content.position),
          });
        break;
      }
      case "sectionRemove":
        out.push({ kind: "remove", selector });
        break;
      default:
        // Unknown instruction types are skipped silently.
        break;
    }
  }
  return out;
}
