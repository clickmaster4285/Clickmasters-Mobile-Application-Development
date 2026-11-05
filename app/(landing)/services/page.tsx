import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { getChildren, getHubs } from "@/content/guides";

export const metadata: Metadata = {
  title: "Mobile App Development Services | ClickMasters",
  description:
    "iOS, Android, Flutter, React Native, app cost, store listings, and industry apps. Each guide is linked from this index.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Mobile App Development Services | ClickMasters",
    description:
      "iOS, Android, Flutter, React Native, app cost, store listings, and industry apps. Each guide is linked from this index.",
    type: "website",
  },
};

export default function ServicesIndexPage() {
  const hubs = getHubs();

  return (
    <div className="min-h-screen bg-cream text-ink">
      <Navbar />
      <main className="px-6 lg:px-10 pt-36 pb-20">
        <div className="mx-auto max-w-5xl">
          <p className="font-script text-4xl text-hot-pink">services</p>
          <h1 className="mt-2 font-display font-extrabold text-5xl md:text-6xl leading-[0.95]">
            Mobile app development services
          </h1>
          <div className="mt-6 max-w-3xl space-y-5 text-lg leading-relaxed text-ink/70">
            <p>
              These are the guides we kept. Each one is about building,
              pricing, or releasing a mobile app. Off-topic keyword pages have
              been removed. Start with a hub, then open the article that
              matches the decision in front of you. The six hubs are iOS,
              Android, Flutter and React Native, app cost, how to build an app
              (including the store listing), and industry apps, which live on
              the solutions page and link back here.
            </p>
            <p>
              A hub is the page to read first. It says when that way of
              building fits, what a first release usually contains, and what
              this studio will and will not claim. The articles under a hub
              take one decision further: Swift rather than “an iPhone app” in
              the abstract, publishing to Google Play, a Flutter project, a
              React Native project, Kotlin Multiplatform, the cost line items,
              a business app, a hybrid shell versus a shared UI toolkit, and
              the industry briefs for care, banking, grocery, and local
              delivery. Every one of those URLs is linked from this index, from
              its hub, and from the footer, so none of them is an orphan.
            </p>
            <p>
              Pages that used to rank for jobs, courses, venture-capital lists,
              forex and trading platforms, electronic medical record catalogs,
              and generic software pricing are gone. Requesting one returns
              HTTP 410 and a noindex header. They are not in the sitemap. If a
              search result still shows one, that is a stale index entry, not
              a page we want you to brief a project from. Use the guides below
              instead, then contact the studio with the flows, the platforms,
              and the systems the app must call. A planning range in a guide is
              not a quote and not a test we ran.
            </p>
          </div>
          <div className="mt-12 space-y-10">
            {hubs.map((hub) => (
              <section key={hub.path}>
                <h2 className="font-display text-2xl font-bold">
                  <Link href={hub.path} className="hover:text-hot-pink">
                    {hub.h1}
                  </Link>
                </h2>
                <p className="mt-2 max-w-2xl text-ink/70">{hub.description}</p>
                <ul className="mt-4 space-y-2">
                  {getChildren(hub.path).map((article) => (
                    <li key={article.path}>
                      <Link
                        href={article.path}
                        className="font-semibold text-hot-pink"
                      >
                        {article.h1}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
            <section>
              <h2 className="font-display text-2xl font-bold">
                <Link href="/solutions" className="hover:text-hot-pink">
                  Industry apps
                </Link>
              </h2>
              <p className="mt-2 max-w-2xl text-ink/70">
                Healthcare, banking, grocery, and local delivery. These pages
                describe the mobile product, not unrelated software categories.
              </p>
              <ul className="mt-4 space-y-2">
                {getChildren("/solutions").map((article) => (
                  <li key={article.path}>
                    <Link
                      href={article.path}
                      className="font-semibold text-hot-pink"
                    >
                      {article.h1}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
