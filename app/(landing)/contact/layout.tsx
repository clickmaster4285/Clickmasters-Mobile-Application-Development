import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact ClickMasters | App Development",
  description:
    "Email sales@clickmastersmobiledevelopmentcompany.com or call +1 325 202 4074. Send the flows and platforms for a scoped plan.",
  alternates: { canonical: "/contact" },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
