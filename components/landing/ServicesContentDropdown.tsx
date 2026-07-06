"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { allData } from "@/content/servicesDetail/index";

function getCategoryLabel(key: string) {
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
    names[key] ||
    key.replace(/_/g, "-").replace(/\b\w/g, (l) => l.toUpperCase())
  );
}

function formatTitle(title: string) {
  return title.replace(/ Complete 2026 Guide$/, "").replace(/:\s*/, ": ");
}

export function ServicesContentDropdown() {
  const categories = useMemo(
    () =>
      Object.entries(allData).map(([key, items]) => ({
        key,
        fileName: key.replace(/_/g, "-"),
        label: getCategoryLabel(key),
        items: (items as { slug: string; metadata: any }[]).map((item) => ({
          slug: item.slug,
          title: formatTitle(item.metadata.title_tag || item.slug),
          description: item.metadata.meta_description || "",
        })),
      })),
    [],
  );

  const [activeCategory, setActiveCategory] = useState(
    categories[0]?.key ?? "",
  );
  const selectedCategory =
    categories.find((category) => category.key === activeCategory) ||
    categories[0];

  if (!selectedCategory) {
    return null;
  }

  return (
    <section className="px-6 lg:px-10 pb-20">
      <div className="max-w-6xl mx-auto rounded-[2rem] border border-ink/10 bg-white p-5 shadow-sm sm:p-8">
        <div className="grid gap-6 lg:grid-cols-[minmax(220px,280px)_1fr] lg:gap-8">
          <aside className="rounded-3xl border border-ink/10 bg-cream p-4 sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-ink/60">
              Content file
            </p>
            <div className="mt-4 space-y-2">
              {categories.map((category) => {
                const isActive = category.key === selectedCategory.key;
                return (
                  <button
                    key={category.key}
                    type="button"
                    onClick={() => setActiveCategory(category.key)}
                    className={`w-full rounded-2xl border px-4 py-3 text-left transition ${
                      isActive
                        ? "border-hot-pink/20 bg-hot-pink/10 text-ink"
                        : "border-transparent bg-white text-ink/80 hover:border-ink/10 hover:bg-cream"
                    }`}
                  >
                    <div className="text-sm font-semibold">
                      {category.fileName}
                    </div>
                    <div className="mt-1 text-xs text-ink/60">
                      {category.label}
                    </div>
                  </button>
                );
              })}
            </div>
          </aside>

          <div className="rounded-3xl border border-ink/10 bg-white p-4 sm:p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-ink/60">
                  Slugs
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-ink">
                  {selectedCategory.label}
                </h2>
              </div>
              <p className="text-sm text-ink/60">
                {selectedCategory.items.length} guides
              </p>
            </div>

            <div className="mt-6 grid gap-3">
              {selectedCategory.items.map((item) => (
                <Link
                  key={item.slug}
                  href={`/services/${item.slug}`}
                  className="block rounded-3xl border border-ink/10 bg-cream px-4 py-4 transition hover:border-hot-pink/20 hover:bg-hot-pink/5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-base font-semibold text-ink">
                        {item.title}
                      </p>
                      {item.description ? (
                        <p className="mt-2 text-sm text-ink/65 line-clamp-2">
                          {item.description}
                        </p>
                      ) : null}
                    </div>
                    <span className="text-hot-pink font-semibold text-sm">
                      View
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
