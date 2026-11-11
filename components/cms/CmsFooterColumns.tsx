"use client";

import { useCmsNav } from "./CmsNavContext";

/** ERP footer navigation (A1). Renders nothing when the ERP has none. */
export function CmsFooterColumns() {
  const columns = useCmsNav().footer;
  if (columns.length === 0) return null;

  return (
    <div className="mt-12 grid grid-cols-2 gap-10 border-t border-cream/10 pt-10 md:grid-cols-4">
      {columns.map((col) => (
        <div key={col.title}>
          <h3 className="mb-4 font-display font-bold text-cream">
            {col.title}
          </h3>
          <ul className="space-y-2 text-sm text-cream/60">
            {col.links.map((link) => (
              <li key={`${link.href}-${link.label}`} className="break-words">
                <a
                  href={link.href}
                  {...(link.target
                    ? { target: link.target, rel: "noopener noreferrer" }
                    : {})}
                  className="transition-colors hover:text-hot-pink"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
