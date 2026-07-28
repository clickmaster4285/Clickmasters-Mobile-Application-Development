// app/(landing)/ebooks/[slug]/page.tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { RevealText } from "@/components/landing/motion";
import {
  getEbookBySlug,
  getRelatedEbooks,
  ebookSlugs,
} from "@/content/ebooks";
import {
  ArrowRight,
  Calendar,
  Clock,
  User,
  Download,
  BookOpen,
  FileText,
  Share2,
  Bookmark,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// Generate static paths
export async function generateStaticParams() {
  return ebookSlugs.map((slug) => ({
    slug: slug,
  }));
}

// Generate metadata - MUST be async and await params
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const ebook = getEbookBySlug(slug);

  if (!ebook) {
    return {
      title: "Ebook Not Found",
    };
  }

  return {
    title: ebook.metadata.title_tag,
    description: ebook.metadata.meta_description,
    openGraph: {
      title: ebook.metadata.title_tag,
      description: ebook.metadata.meta_description,
      images: [ebook.coverImage],
      type: "article",
      publishedTime: ebook.publishedDate,
      authors: [ebook.author.name],
      tags: ebook.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: ebook.metadata.title_tag,
      description: ebook.metadata.meta_description,
      images: [ebook.coverImage],
    },
  };
}

// Page component - MUST be async and await params
export default async function EbookPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const ebook = getEbookBySlug(slug);

  if (!ebook) {
    notFound();
  }

  const relatedEbooks = getRelatedEbooks(slug);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="px-4 pt-36 pb-16">
        <div className="mx-auto max-w-7xl">
          {/* Breadcrumb */}
          <div className="mb-8">
            <Link
              href="/ebooks"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <span className="text-lg">←</span>
              Back to Ebooks
            </Link>
          </div>

          {/* Hero Section */}
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-start">
            {/* Left Content */}
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                <span
                  className="inline-block h-2 w-2 rounded-full"
                  style={{ background: "var(--gradient-brand)" }}
                />
                Free Ebook
              </div>

              <h1 className="mt-6 font-script text-5xl text-brand-pink">
                {ebook.title.split(" ").slice(0, 2).join(" ")}
              </h1>

              <h2 className="mt-3 font-script text-4xl sm:text-5xl leading-[1.05] tracking-tight text-foreground">
                {ebook.title}
              </h2>

              <p className="mt-4 text-xl text-muted-foreground">
                {ebook.subtitle}
              </p>

              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                {ebook.excerpt}
              </p>

              {/* Author & Meta Info */}
              <div className="mt-8 flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-pink/10 text-brand-pink">
                    <User className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">
                      {ebook.author.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {ebook.author.role}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {new Date(ebook.publishedDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {ebook.readTime}
                  </span>
                  <span className="flex items-center gap-1">
                    <FileText className="h-4 w-4" />
                    {ebook.pages} pages
                  </span>
                </div>
              </div>

              {/* Category & Tags */}
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-brand-pink/10 px-4 py-1.5 text-sm font-medium text-brand-pink">
                  {ebook.category}
                </span>
                {ebook.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-secondary px-4 py-1.5 text-sm text-muted-foreground"
                  >
                    #{tag}
                  </span>
                ))}
                {ebook.tags.length > 3 && (
                  <span className="rounded-full bg-secondary px-4 py-1.5 text-sm text-muted-foreground">
                    +{ebook.tags.length - 3}
                  </span>
                )}
              </div>

              {/* Action Buttons */}
              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  href={ebook.downloadUrl}
                  className="inline-flex items-center gap-2 rounded-full bg-brand-pink px-8 py-4 text-base font-semibold text-white transition-all hover:bg-[#ff4da8] hover:scale-105 active:scale-95 shadow-lg shadow-pink-500/30"
                >
                  <Download className="h-5 w-5" />
                  {ebook.price === "Free" || ebook.price === "$0.00"
                    ? "Download Free PDF"
                    : `Download - ${ebook.price}`}
                </a>
                <button className="inline-flex items-center gap-2 rounded-full border border-border px-8 py-4 text-base font-semibold text-foreground transition-all hover:border-brand-pink hover:text-brand-pink">
                  <Bookmark className="h-5 w-5" />
                  Save
                </button>
                <button className="inline-flex items-center gap-2 rounded-full border border-border px-8 py-4 text-base font-semibold text-foreground transition-all hover:border-brand-pink hover:text-brand-pink">
                  <Share2 className="h-5 w-5" />
                  Share
                </button>
              </div>

              {/* Format & Language */}
              <div className="mt-6 flex gap-4 text-sm text-muted-foreground">
                <span>Format: {ebook.format}</span>
                <span>•</span>
                <span>Language: {ebook.language}</span>
              </div>
            </div>

            {/* Cover Image */}
            <div className="relative">
              <div className="relative aspect-[3/4] max-w-md mx-auto lg:ml-auto">
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl" />
                <Image
                  src={ebook.coverImage}
                  alt={ebook.title}
                  fill
                  className="rounded-2xl shadow-2xl object-cover"
                  priority
                />
                {ebook.featured && (
                  <div className="absolute top-4 left-4">
                    <span className="px-4 py-2 bg-yellow-400 text-yellow-900 rounded-full text-sm font-bold shadow-lg">
                      Featured
                    </span>
                  </div>
                )}
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <div className="flex items-center gap-3 text-sm">
                    <span className="px-4 py-2 bg-black/50 backdrop-blur-sm rounded-full">
                      {ebook.format}
                    </span>
                    <span className="px-4 py-2 bg-black/50 backdrop-blur-sm rounded-full">
                      {ebook.language}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Table of Contents */}
          <div className="mt-20">
            <div className="mb-10 text-center">
              <p className="font-script text-3xl text-brand-pink">Navigate</p>
              <RevealText className="mt-3 font-display font-extrabold text-4xl md:text-5xl text-ink leading-tight">
                Table of Contents
              </RevealText>
              <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-muted-foreground">
                Jump to any section of this comprehensive guide
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 rounded-3xl border border-border bg-card p-8 shadow-xl">
              {ebook.tableOfContents.sections.map((section, index) => (
                <a
                  key={index}
                  href={`#section-${index}`}
                  className="group flex items-center gap-3 rounded-xl p-3 transition-all hover:bg-secondary"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-pink/10 text-sm font-bold text-brand-pink group-hover:bg-brand-pink group-hover:text-white transition-colors">
                    {index + 1}
                  </span>
                  <span className="text-sm font-medium text-foreground group-hover:text-brand-pink transition-colors">
                    {section}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Full Content */}
          <div className="mt-20">
            <div className="mb-10 text-center">
              <p className="font-script text-3xl text-brand-pink">Read</p>
              <RevealText className="mt-3 font-display font-extrabold text-4xl md:text-5xl text-ink leading-tight">
                Complete Guide
              </RevealText>
            </div>

            <div className="rounded-3xl border border-border bg-card p-8 shadow-xl md:p-12">
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h1: ({ children }) => (
                      <h1 className="text-4xl font-bold mt-12 mb-6 text-foreground">
                        {children}
                      </h1>
                    ),
                    h2: ({ children }) => (
                      <h2 className="text-3xl font-bold mt-10 mb-4 text-brand-pink">
                        {children}
                      </h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="text-2xl font-semibold mt-8 mb-3 text-foreground">
                        {children}
                      </h3>
                    ),
                    p: ({ children }) => (
                      <p className="text-lg leading-8 text-muted-foreground mb-4">
                        {children}
                      </p>
                    ),
                    ul: ({ children }) => (
                      <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                        {children}
                      </ul>
                    ),
                    ol: ({ children }) => (
                      <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
                        {children}
                      </ol>
                    ),
                    li: ({ children }) => (
                      <li className="text-muted-foreground">{children}</li>
                    ),
                    blockquote: ({ children }) => (
                      <blockquote className="border-l-4 border-brand-pink pl-4 py-2 my-4 bg-brand-pink/5 rounded-r-lg">
                        {children}
                      </blockquote>
                    ),
                    code: ({ children, className }) => {
                      const isInline = !className;
                      if (isInline) {
                        return (
                          <code className="px-2 py-1 bg-secondary rounded text-sm font-mono">
                            {children}
                          </code>
                        );
                      }
                      return (
                        <pre className="bg-zinc-950 text-white p-6 rounded-lg overflow-x-auto my-6">
                          <code className={className}>{children}</code>
                        </pre>
                      );
                    },
                    table: ({ children }) => (
                      <div className="overflow-x-auto my-8 rounded-xl border border-border">
                        <table className="min-w-full divide-y divide-border">
                          {children}
                        </table>
                      </div>
                    ),
                    thead: ({ children }) => (
                      <thead className="bg-secondary/50">{children}</thead>
                    ),
                    tbody: ({ children }) => <tbody>{children}</tbody>,
                    tr: ({ children }) => (
                      <tr className="border-t border-border transition-colors hover:bg-secondary/20">
                        {children}
                      </tr>
                    ),
                    th: ({ children }) => (
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                        {children}
                      </th>
                    ),
                    td: ({ children }) => (
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {children}
                      </td>
                    ),
                    a: ({ href, children }) => (
                      <a
                        href={href}
                        className="text-brand-pink hover:underline"
                        target={href?.startsWith("http") ? "_blank" : undefined}
                        rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
                      >
                        {children}
                      </a>
                    ),
                    hr: () => <hr className="my-8 border-t-2 border-border" />,
                    strong: ({ children }) => (
                      <strong className="font-bold text-foreground">
                        {children}
                      </strong>
                    ),
                    em: ({ children }) => (
                      <em className="text-foreground/80">{children}</em>
                    ),
                  }}
                >
                  {ebook.content}
                </ReactMarkdown>
              </div>
            </div>
          </div>

          {/* Author Bio */}
          {ebook.author.bio && (
            <div className="mt-20">
              <div className="rounded-3xl border border-border bg-card p-8 shadow-xl">
                <div className="flex items-start gap-6">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-brand-pink/10 text-brand-pink">
                    <User className="h-8 w-8" />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-bold text-foreground">
                      About the Author
                    </h3>
                    <p className="text-lg font-semibold text-brand-pink mt-1">
                      {ebook.author.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {ebook.author.role}
                    </p>
                    <p className="mt-3 text-lg leading-8 text-muted-foreground">
                      {ebook.author.bio}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Related Ebooks */}
          {relatedEbooks.length > 0 && (
            <div className="mt-24">
              <div className="mb-10 text-center">
                <p className="font-script text-3xl text-brand-pink">
                  Continue Learning
                </p>
                <RevealText className="mt-3 font-display font-extrabold text-4xl md:text-5xl text-ink leading-tight">
                  Related Ebooks
                </RevealText>
                <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-muted-foreground">
                  Explore more free resources to deepen your knowledge
                </p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {relatedEbooks.map((related) => (
                  <Link
                    key={related.id}
                    href={`/ebooks/${related.slug}`}
                    className="group rounded-3xl border border-border bg-card overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-brand-pink/40 hover:shadow-xl"
                  >
                    <div className="relative aspect-[3/4] w-full overflow-hidden">
                      <Image
                        src={related.coverImage}
                        alt={related.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    <div className="p-6">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-brand-pink/10 px-3 py-1 text-xs font-medium text-brand-pink">
                          {related.category}
                        </span>
                      </div>

                      <h3 className="mt-3 font-display text-xl font-bold text-foreground transition-colors group-hover:text-brand-pink line-clamp-2">
                        {related.title}
                      </h3>

                      <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                        {related.excerpt}
                      </p>

                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {related.author.name}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {related.readTime}
                          </span>
                        </div>

                        <ArrowRight className="h-5 w-5 text-brand-pink transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>

                    <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-transparent transition-all duration-300 group-hover:ring-brand-pink/10" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* CTA Section */}
          <div className="mt-24 overflow-hidden rounded-3xl bg-[#0a0a0a] p-10 sm:p-14 md:p-16 text-white">
            <div className="mx-auto max-w-2xl text-center">
              <p className="font-script text-4xl md:text-5xl text-primary tracking-tight">
                start learning
              </p>

              <h3 className="mt-4 font-display text-3xl sm:text-4xl md:text-5xl font-black leading-tight">
                Download Your <br className="hidden sm:block" />
                Free Ebook
              </h3>

              <p className="mt-6 text-lg text-white/70 max-w-md mx-auto">
                Get instant access to this comprehensive guide and start
                building better apps today.
              </p>

              <a
                href={ebook.downloadUrl}
                className="mt-10 inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-semibold text-white transition-all hover:bg-[#ff4da8] hover:scale-105 active:scale-95 shadow-lg shadow-pink-500/30"
              >
                Download Now
                <span className="text-xl leading-none">→</span>
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}