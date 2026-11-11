import type { Metadata } from "next";
import { withEditedSeo } from "@/lib/cms/metadata";

const baseMetadata: Metadata = {
  alternates: {
    canonical: "/solutions",
  },
};

// Edited-page SEO from the ERP (B4), layered on the page's own metadata.
export async function generateMetadata(): Promise<Metadata> {
  return withEditedSeo("/solutions", baseMetadata);
}

export default function SolutionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
