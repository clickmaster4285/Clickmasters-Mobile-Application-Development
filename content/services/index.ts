// Auto-generated index file

// This file exports all content from all folders

import { data as services } from "./servicesContent";

// Also export as a single combined object
export const allData = {
  services,
};

// All slugs across all folders
export const allSlugs = services.map((item) => item.services);

export function getAllContent() {
  return [...services];
}

export function getContentBySlug(slug: string) {
  return getAllContent().find((item) => item.services === slug);
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
