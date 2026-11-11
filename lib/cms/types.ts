// Shapes returned by the ERP's public CMS endpoints. Every field is treated as
// optional/untrusted: the ERP may omit anything, so renderers must guard.

export type CmsNavItem = {
  id?: string;
  label?: string;
  url?: string;
  order?: number;
  target?: string;
  children?: CmsNavItem[];
};

export type CmsColors = {
  primary?: string;
  secondary?: string;
  [key: string]: string | undefined;
};

export type CmsSiteInfo = {
  website?: {
    name?: string;
    domain?: string;
    logo?: string;
    favicon?: string;
    primaryColor?: string;
    secondaryColor?: string;
  };
  design?: { colors?: CmsColors };
  navigation?: { header?: CmsNavItem[]; footer?: CmsNavItem[] };
};

export type CmsPageSummary = {
  title?: string;
  slug?: string;
  pageType?: string;
  publishedAt?: string;
  noindex?: boolean;
  version?: number | string;
};

export type CmsSectionSettings = {
  layout?: string;
  width?: "narrow" | "wide" | "full" | string;
  paddingY?: [number, number] | number[];
  background?: "primary" | "muted" | "dark" | "light" | string;
  motion?: string;
  columns?: number;
  required?: boolean;
  [key: string]: unknown;
};

export type CmsSection = {
  id?: string;
  type?: string;
  order?: number;
  hidden?: boolean;
  content?: Record<string, unknown>;
  styles?: Record<string, unknown>;
  responsive?: Record<string, unknown>;
  settings?: CmsSectionSettings;
};

export type CmsSeo = {
  title?: string;
  metaDescription?: string;
  canonicalUrl?: string;
  robots?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  focusKeyword?: string;
  twitterHandle?: string;
};

export type CmsPost = {
  title?: string;
  url?: string;
  pageType?: string;
  excerpt?: string;
  image?: string;
  publishedAt?: string;
};

export type CmsPage = {
  title?: string;
  slug?: string;
  pageType?: string;
  featuredImage?: string;
  noindex?: boolean;
  sections?: CmsSection[];
  design?: { colors?: CmsColors };
  context?: {
    posts?: CmsPost[];
    navigation?: { header?: CmsNavItem[]; footer?: CmsNavItem[] };
  };
  seo?: CmsSeo;
  customCode?: { css?: string; html?: string; js?: string };
  publishedAt?: string;
};

/** Normalized edit instruction (from either the flat or the sections form). */
export type PageEditInstruction =
  | {
      kind: "edit";
      selector: string;
      text?: string;
      styles?: Record<string, string>;
    }
  | { kind: "duplicate"; selector: string; id: string }
  | {
      kind: "move";
      selector: string;
      target: string;
      position: "before" | "after";
    }
  | { kind: "remove"; selector: string };

export type PageEdits = {
  title?: string;
  seo?: CmsSeo;
  version?: number | string;
  publishedAt?: string;
  instructions: PageEditInstruction[];
};
