// app/(landing)/[service]/page.tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import { allData, allSlugs, getContentBySlug } from "@/content/services/index";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { ServiceClient } from "./ServicesClient";
import { RevealText } from "@/components/landing/motion";

const categoryLabels: Record<string, string> = {
  "ai-in-app-development": "AI Development",
  "android-development": "Android Development",
  "careers-salaries": "Careers & Salaries",
  "cost-pricing": "Cost & Pricing",
  "cross-platform-flutter-rn": "Cross-Platform (Flutter/RN)",
  "game-development": "Game Development",
  "general-mobile-app-development": "Mobile Development",
  "hiring-agencies-money-pages": "Hiring & Agencies",
  "how-to-build-an-app": "How to Build an App",
  "industry-ecommerce": "E-Commerce",
  "industry-fintech": "FinTech",
  "industry-healthcare": "Healthcare",
  "ios-development": "iOS Development",
  "learning-courses": "Learning & Courses",
  "money-pages": "Money Pages",
  "no-code-app-builders": "No-Code App Builders",
  "testing-qa-maintenance": "Testing & QA",
  "tools-frameworks-software": "Tools & Frameworks",
  "ui-ux-design": "UI/UX Design",
  "web-pwa-development": "Web & PWA Development",
};

function getCategoryLabel(service: string) {
  return (
    categoryLabels[service] ||
    service.replace(/[_-]/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())
  );
}

function formatTitle(title: string) {
  return title.replace(/ Complete 2026 Guide$/, "").trim();
}

function normalizeContentForClient(entry: {
  content: string;
  metadata?: {
    title_tag?: string;
    meta_description?: string;
  };
  slug: string;
}) {
  return {
    content: entry.content,
    metadata: {
      title_tag: entry.metadata?.title_tag ?? entry.slug,
      meta_description: entry.metadata?.meta_description ?? "",
    },
    slug: entry.slug,
  };
}

// Generate all possible paths (both categories AND individual slugs)
export async function generateStaticParams() {
  const categories = Object.keys(allData);
  const slugs = allSlugs;

  // Combine both with the same param name 'service'
  return [...categories, ...slugs].map((service) => ({
    service,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ service: string }>;
}) {
  const { service } = await params;

  // Check if it's a slug (individual content)
  const content = getContentBySlug(service);
  if (content) {
    const m = content.metadata;
    return {
      title: m.title_tag,
      description: m.meta_description,
      openGraph: {
        title: m.title_tag,
        description: m.meta_description,
        type: "article",
      },
    };
  }

  // Check if it's a category
  const category = allData[service as keyof typeof allData];
  if (category) {
    return {
      title: `${getCategoryLabel(service)} Guides`,
      description: `Browse ${getCategoryLabel(service)} service guides and deep dives.`,
      openGraph: {
        title: `${getCategoryLabel(service)} Guides`,
        description: `Browse ${getCategoryLabel(service)} service guides and deep dives.`,
        type: "website",
      },
    };
  }

  return {
    title: "Service Not Found",
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ service: string }>;
}) {
  const { service } = await params;

  // Check if this is a slug (individual content page) FIRST
  const content = getContentBySlug(service);
  const isSlug = !!content;
  const isCategory = !isSlug && !!allData[service as keyof typeof allData];

  // If neither slug nor category exists, 404
  if (!isSlug && !isCategory) {
    notFound();
  }

  // Get other services for "More Guides" section
  const getAllOtherServices = () => {
    const allPaths = [...Object.keys(allData), ...allSlugs];
    const others = allPaths
      .filter((path) => path !== service)
      .slice(0, 3)
      .map((path) => {
        // Check if path is a slug (has content)
        const content = getContentBySlug(path);
        if (content) {
          return {
            slug: path,
            content,
            isSlug: true,
          };
        }
        // Otherwise it's a category
        const categoryData = allData[path as keyof typeof allData];
        if (categoryData && categoryData[0]) {
          return {
            slug: path,
            content: categoryData[0],
            isSlug: false,
          };
        }
        return null;
      })
      .filter(Boolean) as Array<{
      slug: string;
      content: any;
      isSlug: boolean;
    }>;

    return others;
  };

  const otherServices = getAllOtherServices();

  // RENDER SLUG PAGE (Individual content)
  if (isSlug) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />

        <main className="px-4 pt-36 pb-4">
          <div className="mx-auto max-w-[85vw]">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
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
              {content.metadata.title_tag || content.slug}
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              {content.metadata.meta_description}
            </p>

            <div className="mt-8 h-px w-full bg-border" />

            <ServiceClient content={normalizeContentForClient(content)} />

            <CTASection />
            <MoreGuidesSection services={otherServices} />
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  // RENDER CATEGORY PAGE
  if (isCategory) {
    const category = allData[service as keyof typeof allData];
    const categoryItem = category[0];

    const contentForClient = {
      content: categoryItem.content,
      metadata: {
        title_tag: categoryItem.metadata.title_tag,
        meta_description: categoryItem.metadata.meta_description,
      },
      slug: service,
    };

    return (
      <div className="min-h-screen bg-background">
        <Navbar />

        <main className="px-4 pt-36 pb-16">
          <div className="mx-auto max-w-[85vw]">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              <span
                className="inline-block h-2 w-2 rounded-full"
                style={{ background: "var(--gradient-brand)" }}
              />
              {getCategoryLabel(service)}
            </div>

            <h1 className="mt-6 font-script text-5xl text-brand-pink">
              {getCategoryLabel(service)} Guides
            </h1>

            <p className="mt-4 max-w-3xl text-lg leading-relaxed text-muted-foreground">
              Explore the latest guides, deep dives, and resources for{" "}
              {getCategoryLabel(service)}.
            </p>

            <div className="mt-8 h-px w-full bg-border" />

            <ServiceClient content={contentForClient} />

            <CTASection />
            <MoreGuidesSection services={otherServices} />
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  return notFound();
}

// Helper Components
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

        <button className="mt-10 inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-semibold text-white transition-all hover:bg-[#ff4da8] hover:scale-105 active:scale-95 shadow-lg shadow-pink-500/30">
          Request a tailored quote
          <span className="text-xl leading-none">→</span>
        </button>
      </div>
    </div>
  );
}

function MoreGuidesSection({
  services,
}: {
  services: Array<{ slug: string; content: any; isSlug: boolean }>;
}) {
  return (
    <div className="my-16">
      <div className="mb-10 text-center">
        <p className="font-script text-3xl text-brand-pink">More Guides</p>

        <RevealText className="mt-3 font-display font-extrabold text-4xl md:text-5xl text-ink leading-tight">
          Continue Exploring
        </RevealText>

        <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-muted-foreground">
          Discover more in-depth guides and resources to help you make informed
          decisions.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-3">
        {services.map(({ slug, content, isSlug }) => (
          <Link
            key={slug}
            href={`/${slug}`}
            className="group relative overflow-hidden rounded-3xl border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brand-pink/40 hover:shadow-xl"
          >
            <h3 className="font-display text-xl font-bold text-foreground transition-colors group-hover:text-brand-pink">
              {content.metadata.title_tag
                ? formatTitle(content.metadata.title_tag)
                : slug}
            </h3>

            <p className="mt-3 line-clamp-3 text-sm leading-7 text-muted-foreground">
              {content.metadata.meta_description}
            </p>

            <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-pink">
              {isSlug ? "Read Guide" : "Explore Category"}
              <span className="text-lg">→</span>
            </div>

            <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-transparent transition-all duration-300 group-hover:ring-brand-pink/10" />
          </Link>
        ))}
      </div>
    </div>
  );
}
