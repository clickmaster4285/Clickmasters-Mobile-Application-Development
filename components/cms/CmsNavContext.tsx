"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { FooterColumn, NavGroup } from "@/lib/cms/navigation";

// ERP header/footer navigation (A1), fetched once in the root layout and read
// by the site's own Navbar / Footer. Empty when the ERP has none or is down,
// in which case both components render exactly as before.

type CmsNav = { header: NavGroup[]; footer: FooterColumn[] };

const CmsNavContext = createContext<CmsNav>({ header: [], footer: [] });

export function CmsNavProvider({
  header,
  footer,
  children,
}: CmsNav & { children: ReactNode }) {
  return (
    <CmsNavContext.Provider value={{ header, footer }}>
      {children}
    </CmsNavContext.Provider>
  );
}

export function useCmsNav(): CmsNav {
  return useContext(CmsNavContext);
}
