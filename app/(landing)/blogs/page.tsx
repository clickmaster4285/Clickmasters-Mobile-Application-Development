// app/(landing)/blogs/page.tsx

import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { RevealText } from "@/components/landing/motion";
import {
  blogs,
  getFeaturedBlogs,
  blogCategories,
  getAllTags,
} from "@/content/blogs";
import { Calendar, Clock, ArrowRight, Filter, User, Hash } from "lucide-react";
import { withEditedSeo } from "@/lib/cms/metadata";

const baseMetadata: Metadata = {
  title: "Blog | Mobile App Development Insights & Guides",
  description:
    "Explore our latest blog posts on mobile app development trends, AI integration, cross-platform frameworks, UX design, and more.",
  alternates: { canonical: "/blogs" },
  openGraph: {
    title: "Blog | Mobile App Development Insights & Guides",
    description:
      "Explore our latest blog posts on mobile app development trends, AI integration, cross-platform frameworks, UX design, and more.",
    type: "website",
  },
};

// Edited-page SEO from the ERP (B4), layered on the page's own metadata.
export async function generateMetadata(): Promise<Metadata> {
  return withEditedSeo("/blogs", baseMetadata);
}

export default function BlogsPage() {
  const featuredBlogs = getFeaturedBlogs();
  const regularBlogs = blogs.filter((b) => !b.featured);
  const categories = blogCategories;
  const allTags = getAllTags();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="px-4 pt-36 pb-16">
        <div className="mx-auto max-w-7xl">
          {/* ================= HEADER ================= */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              <span
                className="inline-block h-2 w-2 rounded-full"
                style={{ background: "var(--gradient-brand)" }}
              />
              Our Blog
            </div>

            <p className="mt-6 font-script text-5xl text-brand-pink">
              insights
            </p>

            <h1 className="mt-3 font-script text-6xl sm:text-7xl leading-[1.05] tracking-tight text-foreground">
              Latest Articles
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-muted-foreground">
              Stay updated with the latest trends, best practices, and insights
              in mobile app development.
            </p>
          </div>

          {/* ================= CATEGORY FILTERS ================= */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-medium text-foreground">
              <Filter className="h-4 w-4" />
              All
            </span>
            {categories.map((category) => (
              <span
                key={category}
                className="cursor-pointer rounded-full border border-border px-4 py-2 text-sm font-medium text-muted-foreground transition-all hover:border-brand-pink hover:text-brand-pink"
              >
                {category}
              </span>
            ))}
          </div>

          {/* ================= FEATURED BLOGS ================= */}
          {featuredBlogs.length > 0 && (
            <div className="mt-16">
              <div className="mb-10">
                <p className="font-script text-2xl text-brand-pink">
                  hand-picked
                </p>
                <h2 className="mt-1 font-display text-3xl font-extrabold text-foreground">
                  Featured Articles
                </h2>
                <p className="mt-2 text-muted-foreground">
                  Handpicked insights and deep dives
                </p>
              </div>

              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {featuredBlogs.map((blog) => (
                  <Link
                    key={blog.id}
                    href={`/blogs/${blog.slug}`}
                    className="group relative overflow-hidden rounded-3xl border border-border bg-card transition-all duration-300 hover:-translate-y-2 hover:border-brand-pink/40 hover:shadow-2xl"
                  >
                    {/* Cover Image */}
                    <div className="relative aspect-video w-full overflow-hidden">
                      <Image
                        src={blog.image}
                        alt={blog.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="rounded-full bg-yellow-400 px-3 py-1 text-xs font-bold text-yellow-900 shadow-lg">
                          Featured
                        </span>
                      </div>
                    </div>

                    <div className="p-7">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-brand-pink/10 px-3 py-1 text-xs font-medium text-brand-pink">
                          {blog.category}
                        </span>
                        <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-500">
                          {blog.readTime}
                        </span>
                      </div>

                      <h3 className="mt-4 line-clamp-2 text-2xl font-bold text-foreground transition-colors group-hover:text-brand-pink">
                        {blog.title}
                      </h3>

                      <p className="mt-3 line-clamp-2 text-muted-foreground">
                        {blog.excerpt}
                      </p>

                      <div className="mt-4 flex items-center gap-3 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(blog.publishedDate).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            },
                          )}
                        </span>
                        <span className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {blog.author.name}
                        </span>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {blog.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-secondary px-2 py-1 text-xs"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>

                      <div className="mt-6 inline-flex items-center gap-2 font-semibold text-brand-pink transition-all group-hover:gap-3">
                        Read Article
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>

                    <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-transparent transition-all duration-300 group-hover:ring-brand-pink/20" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* ================= MORE ARTICLES (non-featured only) ================= */}
          {regularBlogs.length > 0 && (
            <div className="mt-24">
              <div className="mb-10 text-center">
                <p className="font-script text-3xl text-brand-pink">explore</p>
                <RevealText className="mt-3 font-display font-extrabold text-4xl md:text-5xl text-ink leading-tight">
                  More Articles
                </RevealText>
                <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-muted-foreground">
                  Additional insights and guides to deepen your knowledge
                </p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {regularBlogs.map((blog) => (
                  <Link
                    key={blog.id}
                    href={`/blogs/${blog.slug}`}
                    className="group relative rounded-3xl border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brand-pink/40 hover:shadow-xl"
                  >
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-brand-pink/10 px-3 py-1 text-xs font-medium text-brand-pink">
                        {blog.category}
                      </span>
                      <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-500">
                        {blog.readTime}
                      </span>
                    </div>

                    <h3 className="mt-4 line-clamp-2 font-display text-xl font-bold text-foreground transition-colors group-hover:text-brand-pink">
                      {blog.title}
                    </h3>

                    <p className="mt-2 line-clamp-2 text-sm leading-7 text-muted-foreground">
                      {blog.excerpt}
                    </p>

                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(blog.publishedDate).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            },
                          )}
                        </span>
                        <span className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {blog.author.name}
                        </span>
                      </div>

                      <ArrowRight className="h-5 w-5 text-brand-pink transition-transform group-hover:translate-x-1" />
                    </div>

                    <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-transparent transition-all duration-300 group-hover:ring-brand-pink/10" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* ================= TAGS CLOUD ================= */}
          <div className="mt-24">
            <div className="mb-8 text-center">
              <h2 className="font-display text-3xl font-extrabold text-foreground">
                Popular Topics
              </h2>
              <p className="mt-2 text-muted-foreground">
                Explore articles by topic
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              {allTags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm font-medium text-muted-foreground transition-all hover:border-brand-pink hover:text-brand-pink"
                >
                  <Hash className="h-3 w-3" />
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* ================= CTA ================= */}
          <div className="mt-24 overflow-hidden rounded-3xl bg-[#0a0a0a] p-10 text-white sm:p-14 md:p-16">
            <div className="mx-auto max-w-2xl text-center">
              <p className="font-script text-4xl tracking-tight text-primary md:text-5xl">
                stay informed
              </p>

              <h3 className="mt-4 font-display text-3xl font-black leading-tight sm:text-4xl md:text-5xl">
                Subscribe to our <br className="hidden sm:block" />
                newsletter
              </h3>

              <p className="mx-auto mt-6 max-w-md text-lg text-white/70">
                Get the latest insights and development tips delivered to your
                inbox.
              </p>

              <div className="mx-auto mt-10 flex max-w-md flex-col gap-3 sm:flex-row">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 rounded-full bg-white/10 px-6 py-3 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full bg-primary px-8 py-3 font-semibold text-white shadow-lg shadow-pink-500/30 transition-all hover:scale-105 hover:bg-[#ff4da8] active:scale-95">
                  Subscribe
                  <span className="text-xl leading-none">→</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
