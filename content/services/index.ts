// Auto-generated index file
import { data as services } from "./servicesContent";

// Create a keyed object for easy lookup
const servicesByKey = services.reduce((acc, item) => {
  acc[item.services] = [item]; // Wrap in array since your page expects an array
  return acc;
}, {} as Record<string, typeof services>);

// Keep the original array for other uses
export const allData = servicesByKey;

// Also export the array if needed elsewhere
export const allServices = services;

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