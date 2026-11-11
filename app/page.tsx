import type { Metadata } from "next";
import { HomePage } from "@/components/landing/HomePage";
import { withEditedSeo } from "@/lib/cms/metadata";

const baseMetadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

// Edited-page SEO from the ERP (B4), layered on the page's own metadata.
export async function generateMetadata(): Promise<Metadata> {
  return withEditedSeo("/", baseMetadata);
}

export default function Page() {
  return <HomePage />;
}
