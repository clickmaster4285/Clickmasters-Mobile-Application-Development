import type { Metadata } from "next";
import { withEditedSeo } from "@/lib/cms/metadata";

const baseMetadata: Metadata = {
  alternates: {
    canonical: "/about",
  },
};

// Edited-page SEO from the ERP (B4), layered on the page's own metadata.
export async function generateMetadata(): Promise<Metadata> {
  return withEditedSeo("/about", baseMetadata);
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
