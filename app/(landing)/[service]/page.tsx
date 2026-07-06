import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getContentBySlug,
  getCategoryForSlug,
  allSlugs,
} from "@/content/services/index";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { ServiceClient } from "./ServicesClient";
import { RevealText } from "@/components/landing/motion";

// Generate static params for each category + slug combination
export async function generateStaticParams() {
  return allSlugs.map((slug) => ({
    service: getCategoryForSlug(slug),
    slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ service: string; slug: string }>;
}) {
  const { slug } = await params;
  const content = getContentBySlug(slug);

  if (!content) {
    return {
      title: "Service Not Found",
    };
  }

  const m = content.metadata;
  return {
    title: m.title_tag,
    description: m.meta_description,
    openGraph: {
      title: m.title_tag,
      description: m.meta_description,
      type: "article",
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ service: string; slug: string }>;
}) {
  const { service, slug } = await params;
  const content = getContentBySlug(slug);

  if (!content || getCategoryForSlug(slug) !== service) {
    notFound();
  }

  const otherServices = allSlugs
    .filter((s) => s !== slug)
    .map((s) => ({
      slug: s,
      content: getContentBySlug(s)!,
    }));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="px-4 pt-36 pb-4">
        <div className="mx-auto max-w-[85vw]">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            <span
              className="inline-block h-2 w-2 rounded-full"
              style={{ background: "var(--gradient-brand)" }}
            />
            What we build
          </div>

          <p className="mt-6 font-script text-5xl text-brand-pink">services</p>

          <h1 className="mt-1 font-script text-7xl   leading-[1.05] tracking-tight text-foreground sm:text-6xl">
            {content.metadata.title_tag || content.slug}
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {content.metadata.meta_description}
          </p>

          <div className="mt-8 h-px w-full bg-border" />

          <ServiceDetailClient content={content} />

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
              {otherServices.slice(0, 3).map(({ slug, content: other }) => (
                <Link
                  key={slug}
                  href={`/${getCategoryForSlug(slug)}/${slug}`}
                  className="group relative overflow-hidden rounded-3xl border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brand-pink/40 hover:shadow-xl"
                >
                  <h3 className="font-display text-xl font-bold text-foreground transition-colors group-hover:text-brand-pink">
                    {other.metadata.title_tag}
                  </h3>

                  <p className="mt-3 line-clamp-3 text-sm leading-7 text-muted-foreground">
                    {other.metadata.meta_description}
                  </p>

                  <div className=" inline-flex items-center gap-2 text-sm font-semibold text-brand-pink">
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
