import { notFound } from "next/navigation";
import Link from "next/link";
import { allData } from "@/content/services/index";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { RevealText } from "@/components/landing/motion";
import { ServiceClient } from "./ServicesClient";

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
  const { service } = await params;
  const category = allData[service as keyof typeof allData];

  if (!category) {
    notFound();
  }

  // Get the first item from the category array
  const categoryItem = category[0];

  // Get other services for "More Guides" section (exclude current)
  const allServiceKeys = Object.keys(allData);
  const otherServices = allServiceKeys
    .filter((key) => key !== service)
    .slice(0, 3)
    .map((key) => ({
      slug: key,
      content: allData[key][0],
    }));

  // Prepare content for ServiceClient - matches the expected structure
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
          {/* Category Header */}
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

          {/* Service Client - Pass the properly structured content */}
          <ServiceClient content={contentForClient} />

          {/* CTA Section */}
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
                Request current, tailored pricing and a scoped plan from our
                team. No pay-to-play, no fluff.
              </p>

              <button className="mt-10 inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-semibold text-white transition-all hover:bg-[#ff4da8] hover:scale-105 active:scale-95 shadow-lg shadow-pink-500/30">
                Request a tailored quote
                <span className="text-xl leading-none">→</span>
              </button>
            </div>
          </div>

          {/* More Guides Section */}
          <div className="my-16">
            <div className="mb-10 text-center">
              <p className="font-script text-3xl text-brand-pink">
                More Guides
              </p>

              <RevealText className="mt-3 font-display font-extrabold text-4xl md:text-5xl text-ink leading-tight">
                Continue Exploring
              </RevealText>

              <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-muted-foreground">
                Discover more in-depth guides and resources to help you make
                informed decisions.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-3">
              {otherServices.map(({ slug, content: other }) => (
                <Link
                  key={slug}
                  href={`/${slug}`}
                  className="group relative overflow-hidden rounded-3xl border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brand-pink/40 hover:shadow-xl"
                >
                  <h3 className="font-display text-xl font-bold text-foreground transition-colors group-hover:text-brand-pink">
                    {formatTitle(other.metadata.title_tag || slug)}
                  </h3>

                  <p className="mt-3 line-clamp-3 text-sm leading-7 text-muted-foreground">
                    {other.metadata.meta_description}
                  </p>

                  <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-pink">
                    Read Guide
                  </div>

                  <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-transparent transition-all duration-300 group-hover:ring-brand-pink/10" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
