import Link from "next/link";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { caseStudies } from "@/content/case-study";
import { ArrowRight, Calendar, Briefcase } from "lucide-react";

export const metadata = {
  title: "Case Studies | Mobile App Development Portfolio",
  description:
    "Explore our portfolio of successful mobile app development projects across healthcare, fintech, e-commerce, and more.",
};

export default function CaseStudiesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="px-4 pt-36 pb-16">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="text-center">
            <p className="font-script text-5xl text-brand-pink">case studies</p>
            <h1 className="mt-3 font-script text-6xl leading-[1.05] tracking-tight text-foreground sm:text-7xl">
              Success Stories
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-muted-foreground">
              Explore how we've helped businesses transform their digital
              presence with innovative mobile solutions and measurable results.
            </p>
          </div>

          {/* Case Study Cards */}
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {caseStudies.map((study) => (
              <Link
                key={study.id}
                href={`/case-studies/${study.slug}`}
                className="group flex flex-col rounded-3xl border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-2 hover:border-brand-pink/40 hover:shadow-2xl"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-brand-pink/10 px-3 py-1 text-xs font-medium text-brand-pink">
                    {study.industry}
                  </span>
                  <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-500">
                    {study.category}
                  </span>
                </div>

                <h2 className="mt-4 font-display text-xl font-bold text-foreground transition-colors group-hover:text-brand-pink">
                  {study.title}
                </h2>

                <p className="mt-2 text-sm text-muted-foreground">
                  {study.client}
                </p>

                <p className="mt-3 line-clamp-3 text-sm leading-7 text-muted-foreground">
                  {study.metadata.meta_description}
                </p>

                <div className="mt-auto flex items-center justify-between pt-6">
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
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
