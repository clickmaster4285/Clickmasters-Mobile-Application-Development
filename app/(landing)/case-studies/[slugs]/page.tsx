// app/(landing)/case-studies/page.tsx

import { notFound } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import {
  caseStudies,
  getFeaturedCaseStudies,
  caseStudyCategories,
} from "@/content/case-study";
import { RevealText } from "@/components/landing/motion";
import {
  Briefcase,
  Calendar,
  TrendingUp,
  ArrowRight,
  Filter,
  Search,
} from "lucide-react";

export const metadata = {
  title: "Case Studies | Mobile App Development Portfolio",
  description:
    "Explore our portfolio of successful mobile app development projects across healthcare, fintech, e-commerce, and more.",
};

export default async function CaseStudiesPage() {
  const featuredStudies = getFeaturedCaseStudies();
  const categories = caseStudyCategories;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="px-4 pt-36 pb-16">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              <span
                className="inline-block h-2 w-2 rounded-full"
                style={{ background: "var(--gradient-brand)" }}
              />
              Our Portfolio
            </div>

            <p className="mt-6 font-script text-5xl text-brand-pink">
              case studies
            </p>

            <h1 className="mt-3 font-script text-6xl sm:text-7xl leading-[1.05] tracking-tight text-foreground">
              Success Stories
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-muted-foreground">
              Explore how we've helped businesses transform their digital
              presence with innovative mobile solutions and measurable results.
            </p>
          </div>

          {/* Category Filters */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-medium text-foreground">
              <Filter className="h-4 w-4" />
              All
            </span>
            {categories.map((category) => (
              <span
                key={category}
                className="rounded-full border border-border px-4 py-2 text-sm font-medium text-muted-foreground transition-all hover:border-brand-pink hover:text-brand-pink cursor-pointer"
              >
                {category}
              </span>
            ))}
          </div>

          {/* Featured Case Studies */}
          {featuredStudies.length > 0 && (
            <div className="mt-16">
              <div className="mb-10">
                <h2 className="font-display text-3xl font-extrabold text-foreground">
                  Featured Projects
                </h2>
                <p className="mt-2 text-muted-foreground">
                  Our most impactful success stories
                </p>
              </div>

              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {featuredStudies.map((study) => (
                  <Link
                    key={study.id}
                    href={`/case-studies/${study.slug}`}
                    className="group relative overflow-hidden rounded-3xl border border-border bg-card transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                  >
                    {/* Card Image Placeholder */}
                    <div className="aspect-video w-full bg-gradient-to-br from-brand-pink/10 to-blue-500/10" />

                    <div className="p-7">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-brand-pink/10 px-3 py-1 text-xs font-medium text-brand-pink">
                          {study.industry}
                        </span>
                        <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-500">
                          {study.timeline}
                        </span>
                      </div>

                      <h3 className="mt-4 text-2xl font-bold text-foreground transition-colors group-hover:text-brand-pink">
                        {study.title}
                      </h3>

                      <p className="mt-2 text-sm text-muted-foreground">
                        {study.client}
                      </p>

                      <p className="mt-4 line-clamp-3 text-muted-foreground">
                        {study.challenge.slice(0, 150)}...
                      </p>

                      <div className="mt-6 flex flex-wrap gap-2">
                        {study.technologies.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="rounded-full bg-secondary px-3 py-1 text-xs"
                          >
                            {tech}
                          </span>
                        ))}
                        {study.technologies.length > 4 && (
                          <span className="rounded-full bg-secondary px-3 py-1 text-xs">
                            +{study.technologies.length - 4}
                          </span>
                        )}
                      </div>

                      <div className="mt-6 inline-flex items-center gap-2 text-brand-pink font-semibold transition-all group-hover:gap-3">
                        Read Case Study
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>

                    <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-transparent transition-all duration-300 group-hover:ring-brand-pink/20" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* All Case Studies */}
          <div className="mt-24">
            <div className="mb-10 text-center">
              <RevealText className="font-display font-extrabold text-4xl md:text-5xl text-ink leading-tight">
                All Case Studies
              </RevealText>
              <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-muted-foreground">
                Browse our complete portfolio of successful projects
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {caseStudies.map((study) => (
                <Link
                  key={study.id}
                  href={`/case-studies/${study.slug}`}
                  className="group rounded-3xl border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brand-pink/40 hover:shadow-xl"
                >
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-brand-pink/10 px-3 py-1 text-xs font-medium text-brand-pink">
                      {study.industry}
                    </span>
                  </div>

                  <h3 className="mt-4 font-display text-xl font-bold text-foreground transition-colors group-hover:text-brand-pink">
                    {study.title}
                  </h3>

                  <p className="mt-2 text-sm text-muted-foreground">
                    {study.client}
                  </p>

                  <p className="mt-3 line-clamp-2 text-sm leading-7 text-muted-foreground">
                    {study.metadata.meta_description}
                  </p>

                  <div className="mt-6 flex items-center justify-between">
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {study.timeline}
                      </span>
                      <span className="flex items-center gap-1">
                        <Briefcase className="h-3 w-3" />
                        {study.serviceType}
                      </span>
                    </div>

                    <ArrowRight className="h-5 w-5 text-brand-pink transition-transform group-hover:translate-x-1" />
                  </div>

                  <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-transparent transition-all duration-300 group-hover:ring-brand-pink/10" />
                </Link>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-24 overflow-hidden rounded-3xl bg-[#0a0a0a] p-10 sm:p-14 md:p-16 text-white">
            <div className="mx-auto max-w-2xl text-center">
              <p className="font-script text-4xl md:text-5xl text-primary tracking-tight">
                ready to start
              </p>

              <h3 className="mt-4 font-display text-3xl sm:text-4xl md:text-5xl font-black leading-tight">
                Let's create your <br className="hidden sm:block" />
                success story
              </h3>

              <p className="mt-6 text-lg text-white/70 max-w-md mx-auto">
                Partner with us to build a mobile solution that delivers
                measurable results.
              </p>

              <button className="mt-10 inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-semibold text-white transition-all hover:bg-[#ff4da8] hover:scale-105 active:scale-95 shadow-lg shadow-pink-500/30">
                Start Your Project
                <span className="text-xl leading-none">→</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
