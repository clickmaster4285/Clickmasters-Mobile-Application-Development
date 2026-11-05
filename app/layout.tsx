import type { Metadata } from "next";
import "./styles.css";
import { Providers } from "./providers";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import { SiteJsonLd } from "@/components/seo/SiteJsonLd";
import { site } from "@/lib/site";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "ClickMasters | iOS and Android App Development",
    template: "%s",
  },
  description: site.description,
  openGraph: {
    title: "ClickMasters | iOS and Android App Development",
    description: site.description,
    type: "website",
    url: site.url,
  },
  twitter: {
    card: "summary",
    title: "ClickMasters | iOS and Android App Development",
    description: site.description,
  },
  verification: {
    google: "8Q2IR2BEPc-qizdU0b-FRF6r3OLYynSSTTK-4h-HZIU",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={cn("font-sans", geist.variable)}
    >
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
        <SiteJsonLd />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
