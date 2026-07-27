// Auto-generated index file
import { data as services } from "./servicesContent";
import { getAllContent as getDirectUrlContent } from "@/content/directUrls/index";

type ContentEntry = {
  slug: string;
  services?: string;
  filename: string;
  metadata: {
    url?: string;
    title_tag?: string;
    meta_description?: string;
    [key: string]: unknown;
  };
  content: string;
};

const servicesWithSlug: ContentEntry[] = services.map((item) => ({
  ...item,
  slug: item.services,
}));

const directUrlEntries: ContentEntry[] = getDirectUrlContent().map((item) => ({
  ...item,
  slug: item.slug,
}));

const allContent: ContentEntry[] = [...servicesWithSlug, ...directUrlEntries];

// Create a keyed object for easy lookup
const servicesByKey = services.reduce(
  (acc, item) => {
    acc[item.services] = [item]; // Wrap in array since your page expects an array
    return acc;
  },
  {} as Record<string, typeof services>,
);

// Keep the original array for other uses
export const allData = servicesByKey;

// Also export the array if needed elsewhere
export const allServices = services;

// All slugs across all folders
export const allSlugs = Array.from(
  new Set(allContent.map((item) => item.slug)),
);

export function getAllContent() {
  return allContent;
}

export function getContentBySlug(slug: string) {
  return getAllContent().find((item) => item.slug === slug);
}

export function getCategoryForSlug(slug: string) {
  const categories = {
    services: allSlugs,
  } as const;

  for (const [category, slugs] of Object.entries(categories)) {
    if (slugs.includes(slug)) {
      return category;
    }
  }

  return "services";
}
