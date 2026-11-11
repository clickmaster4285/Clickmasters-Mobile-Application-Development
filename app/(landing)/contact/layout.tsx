import type { Metadata } from "next";
import { withEditedSeo } from "@/lib/cms/metadata";

const baseMetadata: Metadata = {
  title: "Contact ClickMasters | App Development",
  description:
    "Email sales@clickmastersmobiledevelopmentcompany.com or call +1 325 202 4074. Send the flows and platforms for a scoped plan.",
  alternates: { canonical: "/contact" },
};

// Edited-page SEO from the ERP (B4), layered on the page's own metadata.
export async function generateMetadata(): Promise<Metadata> {
  return withEditedSeo("/contact", baseMetadata);
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
