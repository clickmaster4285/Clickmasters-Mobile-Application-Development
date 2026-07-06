import { notFound } from "next/navigation";
import Link from "next/link";
import { allData } from "@/content/services/index";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";

const categoryLabels: Record<string, string> = {
  "ai-in-app-development": "AI Development",
  "android-development": "Android Development",
  "careers-salaries": "Careers & Salaries",
  "cost-pricing": "Cost & Pricing",
  "cross-platform-flutter-rn": "Cross-Platform (Flutter/RN)",
  "general-mobile-app-development": "Mobile Development",
  "hiring-agencies-money-pages": "Hiring & Agencies",
  "how-to-build-an-app": "How to Build an App",
  "industry-ecommerce": "E-Commerce",
  "industry-fintech": "FinTech",
  "industry-healthcare": "Healthcare",
  "ios-development": "iOS Development",
  "learning-courses": "Learning & Courses",
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

export async function generateStaticParams() {
  return Object.keys(allData).map((service) => ({ service }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ service: string }>;
}) {
  // Await the params
  const { service } = await params;
  const category = allData[service as keyof typeof allData];

  if (!category) {
    return {
      title: "Category Not Found",
    };
  }

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

export default async function ServiceCategoryPage({
  params,
}: {
  params: Promise<{ service: string }>;
}) {
  // Await the params
  const { service } = await params;
  const category = allData[service as keyof typeof allData];

  if (!category) {
    notFound();
  }

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
            Explore the latest guides, deep dives, and resources for {getCategoryLabel(service)}.
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {category.map((item: any) => (
              <Link
                key={item.services}
                href={`/${service}/${item.services}`}
                className="group block overflow-hidden rounded-3xl border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brand-pink/40 hover:shadow-xl"
              >
                <h2 className="font-display text-xl font-bold text-foreground transition-colors group-hover:text-brand-pink">
                  {formatTitle(item.metadata.title_tag || item.services)}
                </h2>

                <p className="mt-3 text-sm leading-7 text-muted-foreground line-clamp-3">
                  {item.metadata.meta_description}
                </p>

                <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-pink">
                  Read guide
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}