// app/(landing)/ebooks/page.tsx
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { RevealText } from "@/components/landing/motion";
import { ebooks } from "@/content/ebooks";
import {
  ArrowRight,
  Clock,
  User,
  Download,
  FileText,
  Sparkles,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Free Ebooks | Learn Mobile App Development & Growth",
  description:
    "Download free comprehensive ebooks on mobile app development, Flutter, AI, and app marketing. Expert guides to help you build and grow better apps.",
  alternates: { canonical: "/ebooks" },
  openGraph: {
    title: "Free Ebooks | Learn Mobile App Development & Growth",
    description:
      "Download free comprehensive ebooks on mobile app development, Flutter, AI, and app marketing.",
    type: "website",
  },
};

export default function EbooksPage() {
  const featuredEbooks = ebooks.filter((e) => e.featured);
  const regularEbooks = ebooks.filter((e) => !e.featured);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="px-4 pt-36 pb-16">
        <div className="mx-auto max-w-7xl">
          {/* ================= HERO ================= */}
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-brand-pink/10 px-4 py-2 text-sm font-semibold text-brand-pink">
              <Sparkles className="h-4 w-4" />
              100% Free Resources
            </div>

            <p className="mt-6 font-script text-3xl text-brand-pink">
              learn &amp; grow
            </p>

            <RevealText className="mt-3 font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-ink leading-tight">
              Free Ebooks &amp; Guides
            </RevealText>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
              Comprehensive guides written by industry experts to help you
              master mobile app development, AI integration, and app growth.
              Download any ebook for free.
            </p>

            {/* Stats */}
            <div className="mt-10 flex flex-wrap justify-center gap-10">
              <div>
                <p className="font-display text-3xl font-bold text-brand-pink">
                  {ebooks.length}+
                </p>
                <p className="text-sm text-muted-foreground">Free Ebooks</p>
              </div>
              <div>
                <p className="font-display text-3xl font-bold text-brand-pink">
                  {ebooks.reduce((sum, e) => sum + e.pages, 0).toLocaleString()}
                </p>
                <p className="text-sm text-muted-foreground">Total Pages</p>
              </div>
              <div>
                <p className="font-display text-3xl font-bold text-brand-pink">
                  100%
                </p>
                <p className="text-sm text-muted-foreground">Free Forever</p>
              </div>
            </div>
          </div>

          {/* ================= FEATURED ================= */}
          {featuredEbooks.length > 0 && (
            <div className="mt-20">
              <div className="mb-8">
                <p className="font-script text-2xl text-brand-pink">
                  hand-picked
                </p>
                <h2 className="mt-1 font-display text-3xl font-extrabold text-ink">
                  Featured Ebooks
                </h2>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {featuredEbooks.map((ebook) => (
                  <Link
                    key={ebook.id}
                    href={`/ebooks/${ebook.slug}`}
                    className="group relative rounded-3xl border border-border bg-card overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-brand-pink/40 hover:shadow-xl"
                  >
                    <div className="relative aspect-[4/3] w-full overflow-hidden">
                      <Image
                        src={ebook.coverImage}
                        alt={ebook.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="rounded-full bg-yellow-400 px-3 py-1 text-xs font-bold text-yellow-900 shadow-lg">
                          Featured
                        </span>
                      </div>
                      <div className="absolute top-4 right-4">
                        <span className="rounded-full bg-brand-pink px-3 py-1 text-xs font-bold text-white shadow-lg">
                          Free
                        </span>
                      </div>
                    </div>

                    <div className="p-6">
                      <span className="rounded-full bg-brand-pink/10 px-3 py-1 text-xs font-medium text-brand-pink">
                        {ebook.category}
                      </span>

                      <h3 className="mt-3 font-display text-xl font-bold text-foreground transition-colors group-hover:text-brand-pink line-clamp-2">
                        {ebook.title}
                      </h3>

                      <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                        {ebook.excerpt}
                      </p>

                      <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {ebook.author.name}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {ebook.readTime}
                        </span>
                        <span className="flex items-center gap-1">
                          <FileText className="h-3 w-3" />
                          {ebook.pages}p
                        </span>
                      </div>

                      <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-pink">
                          <Download className="h-4 w-4" />
                          Download Free
                        </span>
                        <ArrowRight className="h-5 w-5 text-brand-pink transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* ================= MORE EBOOKS (non-featured only) ================= */}
          {regularEbooks.length > 0 && (
            <div className="mt-20">
              <div className="mb-8 text-center">
                <p className="font-script text-3xl text-brand-pink">
                  explore more
                </p>
                <RevealText className="mt-3 font-display font-extrabold text-4xl md:text-5xl text-ink leading-tight">
                  More Ebooks
                </RevealText>
                <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-muted-foreground">
                  Additional free guides to expand your knowledge
                </p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {regularEbooks.map((ebook) => (
                  <Link
                    key={ebook.id}
                    href={`/ebooks/${ebook.slug}`}
                    className="group relative rounded-3xl border border-border bg-card overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-brand-pink/40 hover:shadow-xl"
                  >
                    <div className="relative aspect-[3/4] w-full overflow-hidden">
                      <Image
                        src={ebook.coverImage}
                        alt={ebook.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                        <span className="rounded-full bg-black/50 backdrop-blur-sm px-3 py-1 text-xs font-medium">
                          {ebook.format}
                        </span>
                        <span className="rounded-full bg-brand-pink px-3 py-1 text-xs font-bold">
                          {ebook.price === "Free" || ebook.price === "$0.00"
                            ? "Free"
                            : ebook.price}
                        </span>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-brand-pink/10 px-3 py-1 text-xs font-medium text-brand-pink">
                          {ebook.category}
                        </span>
                      </div>

                      <h3 className="mt-3 font-display text-xl font-bold text-foreground transition-colors group-hover:text-brand-pink line-clamp-2">
                        {ebook.title}
                      </h3>

                      <p className="mt-1 text-sm text-muted-foreground line-clamp-1">
                        {ebook.subtitle}
                      </p>

                      <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                        {ebook.excerpt}
                      </p>

                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {ebook.author.name}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {ebook.readTime}
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

          {/* ================= CTA ================= */}
          <div className="mt-24 overflow-hidden rounded-3xl bg-[#0a0a0a] p-10 text-white sm:p-14 md:p-16">
            <div className="mx-auto max-w-2xl text-center">
              <p className="font-script text-4xl tracking-tight text-primary md:text-5xl">
                keep learning
              </p>

              <h3 className="mt-4 font-display text-3xl font-black leading-tight sm:text-4xl md:text-5xl">
                New Ebooks <br className="hidden sm:block" />
                Coming Soon
              </h3>

              <p className="mx-auto mt-6 max-w-md text-lg text-white/70">
                We&apos;re constantly adding new free resources. Check back
                often or subscribe to get notified when new ebooks drop.
              </p>

              <Link
                href="/contact"
                className="mt-10 inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-semibold text-white shadow-lg shadow-pink-500/30 transition-all hover:scale-105 hover:bg-[#ff4da8] active:scale-95"
              >
                Get Notified
                <span className="text-xl leading-none">→</span>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
