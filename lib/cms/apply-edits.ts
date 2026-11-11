// B4 — apply edited-page instructions to the rendered DOM, matching the ERP
// editor's algorithm:
//
//   1. pass 1: resolve every plain selector against the original DOM
//   2. create duplicates in order (cloneNode + data-erp-clone + after())
//   3. pass 2: resolve [data-erp-clone="…"] selectors (the copies exist now)
//   4. element edits in order (textContent + !important styles)
//   5. moves and removals in order (removal = display:none !important)
//
// Returns an `undo` that restores every touched node so React/Next can safely
// unmount or re-render it (B6). Undo is property-precise: it only reverts the
// CSS properties an edit set, so inline styles written later by framer-motion
// (opacity/transform reveal animations) are never rolled back.

import {
  CLONE_SELECTOR_PREFIX,
  isValidCloneId,
  sanitizeEditStyles,
} from "./edits";
import type { PageEditInstruction } from "./types";

const INHERIT_TO_DESCENDANTS = new Set(["color", "text-decoration"]);

type UndoStack = Array<() => void>;

function isCopySelector(selector: string): boolean {
  return selector.trimStart().startsWith(CLONE_SELECTOR_PREFIX);
}

function query(root: ParentNode, selector: string): HTMLElement | null {
  try {
    const el = root.querySelector(selector);
    return el instanceof HTMLElement ? el : null;
  } catch {
    return null; // Invalid selector.
  }
}

/** True when at least one plain selector matches (used to wait for the route's DOM). */
export function anyPlainSelectorResolves(
  instructions: PageEditInstruction[],
  root: ParentNode = document,
): boolean {
  return instructions.some(
    (ins) =>
      !isCopySelector(ins.selector) && query(root, ins.selector) !== null,
  );
}

/**
 * Set `prop: value !important` on `el`, recording how to restore exactly that
 * property (and its longhands, for shorthands like padding / border).
 */
function setImportant(
  el: HTMLElement,
  prop: string,
  value: string,
  undo: UndoStack,
): void {
  const saved: Array<[string, string, string]> = [];
  for (let i = 0; i < el.style.length; i++) {
    const name = el.style[i];
    if (name === prop || name.startsWith(`${prop}-`)) {
      saved.push([
        name,
        el.style.getPropertyValue(name),
        el.style.getPropertyPriority(name),
      ]);
    }
  }
  const hadStyleAttr = el.hasAttribute("style");

  undo.push(() => {
    el.style.removeProperty(prop);
    for (const [name, v, priority] of saved)
      el.style.setProperty(name, v, priority);
    if (!hadStyleAttr && el.style.length === 0) el.removeAttribute("style");
  });

  el.style.setProperty(prop, value, "important");
}

/**
 * Keep a clone's inline styles in step with its source.
 *
 * cloneNode() copies the source's inline styles at that instant. On this site
 * most sections are revealed by framer-motion (initial opacity 0 / blur /
 * translate, scroll-driven background-size), which writes inline styles on
 * the ORIGINAL nodes only, so an un-synced copy would stay invisible. We
 * mirror every non-important inline property from source to copy; properties
 * set with !important (ERP edits on either node) are never copied or removed.
 */
function mirrorInlineStyles(
  source: HTMLElement,
  clone: HTMLElement,
): () => void {
  if (typeof MutationObserver === "undefined") return () => {};

  const sources = [
    source,
    ...Array.from(source.querySelectorAll<HTMLElement>("*")),
  ];
  const copies = [
    clone,
    ...Array.from(clone.querySelectorAll<HTMLElement>("*")),
  ];
  if (sources.length !== copies.length) return () => {};

  const counterpart = new Map<Node, HTMLElement>();
  sources.forEach((node, i) => counterpart.set(node, copies[i]));

  const sync = (from: HTMLElement, to: HTMLElement) => {
    const present = new Set<string>();
    for (let i = 0; i < from.style.length; i++) {
      const prop = from.style[i];
      if (from.style.getPropertyPriority(prop) === "important") continue;
      present.add(prop);
      if (to.style.getPropertyPriority(prop) === "important") continue;
      const value = from.style.getPropertyValue(prop);
      if (to.style.getPropertyValue(prop) !== value)
        to.style.setProperty(prop, value);
    }
    for (let i = to.style.length - 1; i >= 0; i--) {
      const prop = to.style[i];
      if (
        present.has(prop) ||
        to.style.getPropertyPriority(prop) === "important"
      )
        continue;
      to.style.removeProperty(prop);
    }
  };

  const observer = new MutationObserver((records) => {
    for (const record of records) {
      const from = record.target;
      const to = counterpart.get(from);
      if (to && from instanceof HTMLElement && to.isConnected) sync(from, to);
    }
  });
  observer.observe(source, {
    attributes: true,
    attributeFilter: ["style"],
    subtree: true,
  });

  // Catch anything that changed between cloneNode() and observe().
  sources.forEach((node, i) => sync(node, copies[i]));

  return () => observer.disconnect();
}

export function applyPageEdits(
  instructions: PageEditInstruction[],
  root: ParentNode = document,
): { undo: () => void; applied: number } {
  const undoStack: UndoStack = [];
  let applied = 0;

  // Pass 1 — resolve every plain selector against the original DOM.
  const elements = new Map<number, HTMLElement | null>();
  const targets = new Map<number, HTMLElement | null>();
  instructions.forEach((ins, i) => {
    if (!isCopySelector(ins.selector))
      elements.set(i, query(root, ins.selector));
    if (ins.kind === "move" && !isCopySelector(ins.target))
      targets.set(i, query(root, ins.target));
  });

  // Create duplicates, in order. A copy selector here (duplicating a copy) is
  // resolved now, so it can see copies made by earlier instructions.
  instructions.forEach((ins, i) => {
    if (ins.kind !== "duplicate" || !isValidCloneId(ins.id)) return;
    const source = elements.has(i)
      ? elements.get(i)
      : query(root, ins.selector);
    if (!source || !source.isConnected) return;

    const clone = source.cloneNode(true) as HTMLElement;
    clone.setAttribute("data-erp-clone", ins.id);
    source.after(clone);
    const stopMirroring = mirrorInlineStyles(source, clone);
    undoStack.push(() => {
      stopMirroring();
      clone.remove(); // Copies are not React-owned; removing them is safe.
    });
    applied++;
  });

  // Pass 2 — resolve copy selectors now that clones exist.
  instructions.forEach((ins, i) => {
    if (isCopySelector(ins.selector))
      elements.set(i, query(root, ins.selector));
    if (ins.kind === "move" && isCopySelector(ins.target))
      targets.set(i, query(root, ins.target));
  });

  // Element edits, in order.
  instructions.forEach((ins, i) => {
    if (ins.kind !== "edit") return;
    const el = elements.get(i);
    if (!el || !el.isConnected) return;

    if (typeof ins.text === "string") {
      const originalChildren = Array.from(el.childNodes);
      undoStack.push(() => el.replaceChildren(...originalChildren));
      el.textContent = ins.text; // never innerHTML
    }

    const styles = sanitizeEditStyles(ins.styles);
    if (styles) {
      for (const [prop, value] of Object.entries(styles))
        setImportant(el, prop, value, undoStack);
      // Theme rules on descendants would otherwise win for these two.
      const inherited = Object.entries(styles).filter(([prop]) =>
        INHERIT_TO_DESCENDANTS.has(prop),
      );
      if (inherited.length > 0) {
        el.querySelectorAll<HTMLElement>("*").forEach((child) => {
          for (const [prop, value] of inherited)
            setImportant(child, prop, value, undoStack);
        });
      }
    }
    applied++;
  });

  // Moves and removals, in order (plain and copy-targeting alike).
  instructions.forEach((ins, i) => {
    if (ins.kind !== "move" && ins.kind !== "remove") return;
    const el = elements.get(i);
    if (!el || !el.isConnected) return;

    if (ins.kind === "remove") {
      // Hide instead of el.remove(): the node may be owned by React.
      setImportant(el, "display", "none", undoStack);
      applied++;
      return;
    }

    const target = targets.get(i);
    if (!target || !target.isConnected || target === el || el.contains(target))
      return;

    // Record the original slot so cleanup can put React's node back (B6).
    const parent = el.parentNode;
    const nextSibling = el.nextSibling;
    undoStack.push(() => {
      if (!parent || !parent.isConnected) return;
      const anchor =
        nextSibling && nextSibling.parentNode === parent ? nextSibling : null;
      parent.insertBefore(el, anchor);
    });
    if (ins.position === "after") target.after(el);
    else target.before(el);
    applied++;
  });

  let undone = false;
  return {
    applied,
    undo: () => {
      if (undone) return;
      undone = true;
      for (let i = undoStack.length - 1; i >= 0; i--) {
        try {
          undoStack[i]();
        } catch {
          // Node already gone; nothing to restore.
        }
      }
    },
  };
}
