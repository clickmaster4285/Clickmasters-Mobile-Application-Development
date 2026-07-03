import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { allData, getAllContent } from "@/content/index";

export const metadata: Metadata = {
  title: "Services — Clickmasters",
  description:
    "End-to-end mobile and healthcare tech services — expert guides, costs, timelines and FAQs across our practice areas.",
  openGraph: {
    title: "Services — Clickmasters",
    description:
      "Expert guides across our healthcare and mobile practice areas.",
    type: "website",
  },
};

function extractQuickAnswer(md: string): string {
  const m = md.match(/>\s*\*\*Quick answer:\*\*\s*([\s\S]*?)(?:\n\n|\n>|$)/);
  if (!m) return "";
  return m[1].replace(/\*\*/g, "").replace(/\n>/g, " ").trim();
}

function getCategoryIcon(category: string): string {
  const icons: Record<string, string> = {
    ai_in_app_development: "🤖",
    android_development: "📱",
    careers_salaries: "💼",
    cost_pricing: "💰",
    cross_platform_flutter_rn: "⚡",
    general_mobile_app_development: "📲",
    hiring_agencies_money_pages: "🏢",
    how_to_build_an_app: "🛠️",
    industry_ecommerce: "🛒",
    industry_fintech: "💳",
    industry_healthcare: "🏥",
    ios_development: "🍎",
    learning_courses: "📚",
    no_code_app_builders: "🔧",
    testing_qa_maintenance: "🧪",
    tools_frameworks_software: "🛠️",
    ui_ux_design: "🎨",
    web_pwa_development: "🌐",
  };
  return icons[category] || "📄";
}

function getCategoryName(category: string): string {
  const names: Record<string, string> = {
    ai_in_app_development: "AI Development",
    android_development: "Android Development",
    careers_salaries: "Careers & Salaries",
    cost_pricing: "Cost & Pricing",
    cross_platform_flutter_rn: "Cross-Platform (Flutter/RN)",
    general_mobile_app_development: "Mobile Development",
    hiring_agencies_money_pages: "Hiring & Agencies",
    how_to_build_an_app: "How to Build an App",
    industry_ecommerce: "E-Commerce",
    industry_fintech: "FinTech",
    industry_healthcare: "Healthcare",
    ios_development: "iOS Development",
    learning_courses: "Learning & Courses",
    no_code_app_builders: "No-Code App Builders",
    testing_qa_maintenance: "Testing & QA",
    tools_frameworks_software: "Tools & Frameworks",
    ui_ux_design: "UI/UX Design",
    web_pwa_development: "Web & PWA Development",
  };
  return (
    names[category] ||
    category
      .replace(/_/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase())
  );
}

function getCategoryForSlug(slug: string): string {
  for (const [key, folderData] of Object.entries(allData)) {
    // @ts-ignore
    if (folderData.slugs?.includes(slug)) {
      return key;
    }
  }
  return "general_mobile_app_development";
}

export default function ServicesPage() {
  const allContent = getAllContent();

  const categoryCount = new Set();
  allContent.forEach((item: any) => {
    const category = getCategoryForSlug(item.slug);
    categoryCount.add(category);
  });

  return (
    <div className="min-h-screen bg-background">
      <header className="pt-6 px-6">
        <div className="mx-auto max-w-6xl rounded-full bg-neutral-900 text-white px-6 py-3 flex items-center justify-between">
          <Link href="/" className="font-bold tracking-tight text-lg">
            CLICK<span className="text-brand-pink">M</span>ASTERS
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm">
            <a href="#solutions" className="hover:text-brand-pink transition">
              Solutions
            </a>
            <Link
              href="/services"
              className="hover:text-brand-pink transition"
            >
              Services
            </Link>
            <a href="#about" className="hover:text-brand-pink transition">
              About
            </a>
            <a href="#contact" className="hover:text-brand-pink transition">
              Contact
            </a>
          </nav>
          <button className="rounded-full px-5 py-2 text-sm font-medium text-white bg-gradient-to-r from-brand-blue to-brand-pink">
            Book a Call
          </button>
        </div>
      </header>

      <section className="px-6 pt-20 pb-16 max-w-6xl mx-auto">
        <div className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-neutral-600">
          <span className="h-2 w-2 rounded-full bg-brand-pink" />
          What we build
        </div>
        <div className="mt-6 flex items-baseline gap-4 flex-wrap">
          <span className="font-script text-4xl md:text-5xl text-brand-pink -mb-2">
            services
          </span>
        </div>
        <h1 className="mt-2 text-5xl md:text-7xl font-bold tracking-tight leading-[1.05]">
          Guides that <span className="gradient-heading">drive digital</span>
          <br />
          <span className="gradient-heading">growth</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-neutral-600">
          End-to-end mobile and healthcare tech expertise — deep-dive guides on
          every service we ship, with costs, timelines and honest trade-offs.
        </p>

        <div className="mt-8 flex flex-wrap gap-2">
          <span className="rounded-full px-4 py-1.5 text-sm font-medium bg-brand-pink text-white">
            All
          </span>
          {Array.from(categoryCount).map((category: any) => (
            <span
              key={category}
              className="rounded-full px-4 py-1.5 text-sm font-medium bg-neutral-100 hover:bg-neutral-200 transition cursor-pointer"
            >
              {getCategoryName(category)}
            </span>
          ))}
        </div>
      </section>

      <section className="px-6 pb-24 max-w-6xl mx-auto">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {allContent.map((entry: any) => {
            const quick = extractQuickAnswer(entry.content);
            const category = getCategoryForSlug(entry.slug);

            return (
              <article
                key={entry.slug}
                className="group relative rounded-3xl bg-white border border-neutral-200 p-8 hover:border-brand-pink transition-all hover:-translate-y-1 hover:shadow-[0_20px_60px_-20px_rgba(236,72,153,0.35)]"
              >
                <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-brand-blue/10 to-brand-pink/20 flex items-center justify-center mb-6 text-2xl">
                  {getCategoryIcon(category)}
                </div>

                <h2 className="text-xl font-bold leading-tight tracking-tight">
                  {entry.metadata.title_tag
                    .replace(/ Complete 2026 Guide$/, "")
                    .replace(/:\s*/, ": ")}
                </h2>

                <p className="mt-3 text-sm text-neutral-600 line-clamp-4">
                  {quick || entry.metadata.meta_description}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  <span className="text-[10px] font-semibold uppercase tracking-wider bg-neutral-100 rounded-full px-3 py-1">
                    {entry.metadata.page_type?.split(" ")[0] || "Guide"}
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-wider bg-neutral-100 rounded-full px-3 py-1">
                    {entry.metadata.primary_keyword
                      ?.split(" ")
                      .slice(0, 2)
                      .join(" ") || "Service"}
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-wider bg-brand-pink/10 text-brand-pink rounded-full px-3 py-1">
                    {getCategoryName(category).split(" ").slice(0, 2).join(" ")}
                  </span>
                </div>

                <Link
                  href={`/services/${entry.slug}`}
                  className="mt-8 inline-flex items-center gap-2 text-brand-pink font-semibold text-sm group-hover:gap-3 transition-all"
                >
                  Read the guide <ArrowRight className="h-4 w-4" />
                </Link>
              </article>
            );
          })}
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-neutral-200 pt-16">
          <div>
            <p className="text-3xl font-bold">{allContent.length}</p>
            <p className="text-sm text-neutral-500">Total Guides</p>
          </div>
          <div>
            <p className="text-3xl font-bold">{categoryCount.size}</p>
            <p className="text-sm text-neutral-500">Categories</p>
          </div>
          <div>
            <p className="text-3xl font-bold">2026</p>
            <p className="text-sm text-neutral-500">Updated</p>
          </div>
          <div>
            <p className="text-3xl font-bold">100%</p>
            <p className="text-sm text-neutral-500">Expert Reviewed</p>
          </div>
        </div>

        <div className="mt-20 rounded-3xl bg-neutral-900 text-white p-12 md:p-16 relative overflow-hidden">
          <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-brand-pink/30 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-brand-blue/40 blur-3xl" />
          <div className="relative">
            <span className="font-script text-3xl text-brand-pink">
              let's talk
            </span>
            <h3 className="mt-2 text-3xl md:text-5xl font-bold tracking-tight max-w-2xl">
              Have a project in mind?
            </h3>
            <p className="mt-4 max-w-xl text-neutral-300">
              Tell us your idea. We'll come back within 24 hours with a clear
              plan, timeline, and pricing.
            </p>
            <button className="mt-8 rounded-full px-8 py-3 font-medium bg-gradient-to-r from-brand-blue to-brand-pink">
              Get in Touch →
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}