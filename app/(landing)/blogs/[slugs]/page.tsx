// app/(landing)/blogs/page.tsx

import { notFound } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import {
  blogs,
  getFeaturedBlogs,
  blogCategories,
  getAllTags,
} from "@/content/blogs";
import { RevealText } from "@/components/landing/motion";
import {
  Calendar,
  Clock,
  Tag,
  ArrowRight,
  Filter,
  User,
  Hash,
} from "lucide-react";

export const metadata = {
  title: "Blog | Mobile App Development Insights & Guides",
  description:
    "Explore our latest blog posts on mobile app development trends, AI integration, cross-platform frameworks, UX design, and more.",
};

export default async function BlogsPage() {
  const featuredBlogs = getFeaturedBlogs();
  const categories = blogCategories;
  const allTags = getAllTags();

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

          {/* Featured Blogs */}
          {featuredBlogs.length > 0 && (
            <div className="mt-16">
              <div className="mb-10">
                <h2 className="font-display text-3xl font-extrabold text-foreground">
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
                    className="group relative overflow-hidden rounded-3xl border border-border bg-card transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                  >
                    {/* Card Image Placeholder */}
                    <div className="aspect-video w-full bg-gradient-to-br from-brand-pink/10 to-blue-500/10" />

                    <div className="p-7">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-brand-pink/10 px-3 py-1 text-xs font-medium text-brand-pink">
                          {blog.category}
                        </span>
                        <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-500">
                          {blog.readTime}
                        </span>
                      </div>

                      <h3 className="mt-4 text-2xl font-bold text-foreground transition-colors group-hover:text-brand-pink line-clamp-2">
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

                      <div className="mt-6 inline-flex items-center gap-2 text-brand-pink font-semibold transition-all group-hover:gap-3">
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

          {/* All Blogs */}
          <div className="mt-24">
            <div className="mb-10 text-center">
              <RevealText className="font-display font-extrabold text-4xl md:text-5xl text-ink leading-tight">
                All Articles
              </RevealText>
              <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-muted-foreground">
                Browse our complete collection of articles and insights
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {blogs.map((blog) => (
                <Link
                  key={blog.id}
                  href={`/blogs/${blog.slug}`}
                  className="group rounded-3xl border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brand-pink/40 hover:shadow-xl"
                >
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-brand-pink/10 px-3 py-1 text-xs font-medium text-brand-pink">
                      {blog.category}
                    </span>
                    <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-500">
                      {blog.readTime}
                    </span>
                  </div>

                  <h3 className="mt-4 font-display text-xl font-bold text-foreground transition-colors group-hover:text-brand-pink line-clamp-2">
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

          {/* Tags Cloud */}
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
                  className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm font-medium text-muted-foreground transition-all hover:border-brand-pink hover:text-brand-pink cursor-pointer"
                >
                  <Hash className="h-3 w-3" />
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-24 overflow-hidden rounded-3xl bg-[#0a0a0a] p-10 sm:p-14 md:p-16 text-white">
            <div className="mx-auto max-w-2xl text-center">
              <p className="font-script text-4xl md:text-5xl text-primary tracking-tight">
                stay informed
              </p>

              <h3 className="mt-4 font-display text-3xl sm:text-4xl md:text-5xl font-black leading-tight">
                Subscribe to our <br className="hidden sm:block" />
                newsletter
              </h3>

              <p className="mt-6 text-lg text-white/70 max-w-md mx-auto">
                Get the latest insights and development tips delivered to your
                inbox.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 rounded-full bg-white/10 px-6 py-3 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-3 font-semibold text-white transition-all hover:bg-[#ff4da8] hover:scale-105 active:scale-95 shadow-lg shadow-pink-500/30 whitespace-nowrap">
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
