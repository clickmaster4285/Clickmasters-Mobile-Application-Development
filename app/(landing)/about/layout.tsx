import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About ClickMasters | Mobile App Studio",
  description:
    "ClickMasters is a mobile app studio for iOS, Android, Flutter, and React Native. No unverified awards or review scores.",
  alternates: { canonical: "/about" },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
