import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "/solutions",
  },
};

export default function SolutionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
