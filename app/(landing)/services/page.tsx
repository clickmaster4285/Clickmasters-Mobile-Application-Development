// app/(landing)/services/page.tsx
import Link from "next/link";
import type { Metadata } from "next";
import {
  allServices,
  allSlugs,
  getContentBySlug,
} from "@/content/services/index";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { RevealText } from "@/components/landing/motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { withEditedSeo } from "@/lib/cms/metadata";

const baseMetadata: Metadata = {
  title: "Services | Mobile App Development Guides & Deep Dives",
  description:
    "Browse all our in-depth service guides covering mobile app development, AI integration, cross-platform frameworks, UI/UX design, and more.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Services | Mobile App Development Guides & Deep Dives",
    description:
      "Browse all our in-depth service guides covering mobile app development, AI integration, cross-platform frameworks, UI/UX design, and more.",
    type: "website",
  },
};

// Edited-page SEO from the ERP (B4), layered on the page's own metadata.
export async function generateMetadata(): Promise<Metadata> {
  return withEditedSeo("/services", baseMetadata);
}

function formatTitle(title: string) {
  return title.replace(/ Complete 2026 Guide$/, "").trim();
}

type ServiceCard = {
  slug: string;
  title: string;
  description: string;
  category?: string;
};

function buildServiceCards(): ServiceCard[] {
  return allSlugs
    .map((slug) => {
      const content = getContentBySlug(slug);
      if (!content) return null;

      return {
        slug,
        title: content.metadata?.title_tag
          ? formatTitle(content.metadata.title_tag)
          : slug,
        description: content.metadata?.meta_description ?? "",
        category: (content.metadata as { category?: string })?.category,
      };
    })
    .filter(Boolean) as ServiceCard[];
}

export default function ServicesIndexPage() {
  const cards = buildServiceCards();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="px-4 pt-36 pb-16">
        <div className="mx-auto max-w-[85vw]">
          {/* ================= HEADER ================= */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              <span
                className="inline-block h-2 w-2 rounded-full"
                style={{ background: "var(--gradient-brand)" }}
              />
              What we build
            </div>

            <p className="mt-6 font-script text-5xl text-brand-pink">
              services
            </p>

            <h1 className="mt-1 font-script text-7xl leading-[1.05] tracking-tight text-foreground sm:text-6xl">
              All Services
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Explore our complete library of service guides, deep dives, and
              resources — covering everything from mobile app development to AI
              integration and beyond.
            </p>
          </div>

          <div className="mt-8 h-px w-full bg-border" />

          {/* ================= SERVICES GRID ================= */}
          <div className="mt-16">
            <div className="mb-10">
              <p className="font-script text-2xl text-brand-pink">explore</p>
              <h2 className="mt-1 font-display text-3xl font-extrabold text-foreground">
                Browse by Service
              </h2>
              <p className="mt-2 text-muted-foreground">
                {cards.length} guides and counting
              </p>
            </div>

            {cards.length === 0 ? (
              <div className="rounded-3xl border border-border bg-card p-10 text-center text-muted-foreground">
                No services available yet.
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {cards.map((card) => (
                  <Link
                    key={card.slug}
                    href={`/${card.slug}`}
                    className="group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brand-pink/40 hover:shadow-xl"
                  >
                    {card.category && (
                      <span className="mb-3 inline-flex w-fit items-center gap-1.5 rounded-full bg-brand-pink/10 px-3 py-1 text-xs font-medium text-brand-pink">
                        <Sparkles className="h-3 w-3" />
                        {card.category}
                      </span>
                    )}

                    <h3 className="line-clamp-2 font-display text-xl font-bold text-foreground transition-colors group-hover:text-brand-pink">
                      {card.title}
                    </h3>

                    <p className="mt-3 line-clamp-3 flex-1 text-sm leading-7 text-muted-foreground">
                      {card.description}
                    </p>

                    <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-pink">
                      Read Guide
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>

                    <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-transparent transition-all duration-300 group-hover:ring-brand-pink/10" />
                  </Link>
                ))}
              </div>
            )}
          </div>

          <CTASection />

          <MoreGuidesSection services={allServices.slice(0, 3)} />
        </div>
      </main>

      <Footer />
    </div>
  );
}

// ===================== Helper Components =====================

function CTASection() {
  return (
    <div className="my-14 overflow-hidden rounded-3xl bg-[#0a0a0a] p-10 sm:p-14 md:p-16 text-white">
      <div className="max-w-2xl mx-auto text-center">
        <p className="font-script text-4xl md:text-5xl text-primary tracking-tight">
          let's talk
        </p>

        <h3 className="mt-4 font-display text-4xl sm:text-5xl md:text-6xl font-black leading-tight">
          Ready to get an itemized estimate
          <br className="hidden sm:block" /> for your project?
        </h3>

        <p className="mt-6 text-lg text-white/70 max-w-md mx-auto">
          Request current, tailored pricing and a scoped plan from our team. No
          pay-to-play, no fluff.
        </p>

        <Link
          href="/contact"
          className="mt-10 inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-semibold text-white transition-all hover:bg-[#ff4da8] hover:scale-105 active:scale-95 shadow-lg shadow-pink-500/30"
        >
          Request a tailored quote
          <span className="text-xl leading-none">→</span>
        </Link>
      </div>
    </div>
  );
}

function MoreGuidesSection({
  services,
}: {
  services: Array<{
    slug: string;
    metadata: { title_tag?: string; meta_description?: string };
  }>;
}) {
  return (
    <div className="my-16">
      <div className="mb-10 text-center">
        <p className="font-script text-3xl text-brand-pink">Featured</p>

        <RevealText className="mt-3 font-display font-extrabold text-4xl md:text-5xl text-ink leading-tight">
          Popular Guides
        </RevealText>

        <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-muted-foreground">
          Start with some of our most-read service guides.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-3">
        {services.map(({ slug, metadata }) => (
          <Link
            key={slug}
            href={`/${slug}`}
            className="group relative overflow-hidden rounded-3xl border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brand-pink/40 hover:shadow-xl"
          >
            <h3 className="font-display text-xl font-bold text-foreground transition-colors group-hover:text-brand-pink">
              {metadata.title_tag ? formatTitle(metadata.title_tag) : slug}
            </h3>

            <p className="mt-3 line-clamp-3 text-sm leading-7 text-muted-foreground">
              {metadata.meta_description}
            </p>

            <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-pink">
              Read Guide
              <span className="text-lg">→</span>
            </div>

            <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-transparent transition-all duration-300 group-hover:ring-brand-pink/10" />
          </Link>
        ))}
      </div>
    </div>
  );
}
