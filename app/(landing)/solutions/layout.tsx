import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mobile App Solutions by Industry | ClickMasters",
  description:
    "Mobile app briefs for healthcare, banking, grocery delivery, and local delivery, plus startup and education scope notes.",
  alternates: { canonical: "/solutions" },
};

export default function SolutionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
