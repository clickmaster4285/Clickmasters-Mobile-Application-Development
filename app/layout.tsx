import type { Metadata } from "next";
import "./styles.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "ClickMasters — Powerful Mobile Apps, Start to End",
  description:
    "ClickMasters engineers high-performance iOS & Android apps for startups and enterprise. 250+ products shipped since 2015.",
  openGraph: {
    title: "ClickMasters — Powerful Mobile Apps, Start to End",
    description:
      "Premium Mobile development. Native iOS, Android, and cross-platform apps engineered for scale.",
    type: "website",
    images: [
      "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/08f601b3-37e0-4eb5-b988-438588cc8dbc/id-preview-53ce0115--b4cf6b60-8572-48f9-b32b-7ba09ae29899.lovable.app-1780744720067.png",
    ],
  },
  twitter: {
    card: "summary",
    site: "@Lovable",
    title: "ClickMasters — Powerful Mobile Apps, Start to End",
    description:
      "Premium Mobile development. Native iOS, Android, and cross-platform apps engineered for scale.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth" >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700;800;900&family=Inter:wght@400;500;600;700&family=Caveat:wght@500;700&display=swap"
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
