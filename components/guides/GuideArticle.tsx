import Link from "next/link";
import { Footer } from "@/components/landing/Footer";
import { Navbar } from "@/components/landing/Navbar";
import { getChildren, getGuide, guides, type Guide } from "@/content/guides";
import { site } from "@/lib/site";

function relatedGuides(guide: Guide) {
  const siblings = getChildren(guide.hubPath).filter(
    (item) => item.path !== guide.path,
  );
  const hubs = guides.filter(
    (item) => item.kind === "hub" && item.path !== guide.path,
  );
  const unique = new Map<string, Guide>();
  for (const item of [...siblings, ...hubs]) {
    if (item.path !== guide.path) unique.set(item.path, item);
  }
  return [...unique.values()].slice(0, 6);
}

export function GuideArticle({ guide }: { guide: Guide }) {
  const parent = guide.kind === "article" ? getGuide(guide.hubPath) : undefined;
  const related = relatedGuides(guide);
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: guide.h1,
    serviceType: guide.serviceType,
    description: guide.description,
    url: `${site.url}${guide.path}`,
    provider: { "@id": `${site.url}/#organization` },
    areaServed: "Worldwide",
  };

  return (
    <div className="min-h-screen bg-cream text-ink">
      <Navbar />
      <main className="px-6 lg:px-10 pt-36 pb-20">
        <article className="mx-auto max-w-3xl">
          <nav className="text-sm text-ink/60">
            <Link href="/" className="hover:text-hot-pink">
              Home
            </Link>
            {parent ? (
              <>
                <span className="px-2">/</span>
                <Link href={parent.path} className="hover:text-hot-pink">
                  {parent.h1}
                </Link>
              </>
            ) : null}
          </nav>
          <p className="mt-8 font-script text-3xl text-hot-pink">guide</p>
          <h1 className="mt-2 font-display font-extrabold text-4xl md:text-6xl leading-[0.95] tracking-tight">
            {guide.h1}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            {guide.description}
          </p>
          <div className="mt-10 space-y-5 text-base leading-8 text-ink/80">
            {guide.body.map((paragraph) => (
              <p key={paragraph.slice(0, 48)}>{paragraph}</p>
            ))}
          </div>
          <div className="mt-12 rounded-3xl bg-ink text-cream p-8">
            <h2 className="font-display font-extrabold text-3xl">
              Ask for a scoped plan
            </h2>
            <p className="mt-3 text-cream/70 leading-relaxed">
              Send the flows, the platforms, and the systems the app must call.
              We will reply with what is in the first release and what should
              wait. This guide is not a quote and not a test report.
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-flex rounded-full bg-hot-pink px-6 py-3 font-semibold text-white"
            >
              Contact ClickMasters
            </Link>
          </div>
          <div className="mt-14">
            <h2 className="font-display font-bold text-2xl">Related guides</h2>
            <ul className="mt-4 space-y-3">
              {related.map((item) => (
                <li key={item.path}>
                  <Link href={item.path} className="font-semibold text-hot-pink">
                    {item.h1}
                  </Link>
                  <p className="text-sm text-ink/60">{item.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </article>
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </div>
  );
}
