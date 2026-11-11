"use client";

import { motion } from "framer-motion";
import { Target, Heart, Zap, Users } from "lucide-react";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { useLenisScroll } from "@/components/landing/motion";

const values = [
  {
    icon: Target,
    title: "Outcome-driven",
    desc: "We measure success by the impact your app has on real users and revenue.",
  },
  {
    icon: Heart,
    title: "Crafted with care",
    desc: "Every pixel and interaction is considered. We sweat the details so users feel it.",
  },
  {
    icon: Zap,
    title: "Fast & focused",
    desc: "Lean teams, tight loops, and rapid iteration get you to market sooner.",
  },
  {
    icon: Users,
    title: "True partners",
    desc: "We work as an extension of your team — transparent, honest, and invested.",
  },
];

export default function AboutPage() {
  useLenisScroll();

  return (
    <div className="relative min-h-screen bg-cream overflow-x-hidden">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative px-6 lg:px-10 pt-36 pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-electric/5 via-cream to-hot-pink/5" />
          <div className="max-w-5xl mx-auto relative">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-script text-3xl text-hot-pink"
            >
              who we are
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mt-2 font-display font-extrabold text-5xl md:text-7xl text-ink leading-[0.95] tracking-tight"
            >
              We turn bold ideas into apps people love.
            </motion.h1>
            <p className="mt-6 text-lg text-ink/70 max-w-2xl leading-relaxed">
              ClickMasters is a mobile app studio. We plan and build iOS,
              Android, Flutter, and React Native products. This site explains
              that work in plain language. It does not publish review scores,
              awards, headcount, or client metrics we cannot link to a source.
            </p>
          </div>
        </section>

        {/* Mission */}
        <section className="px-6 lg:px-10 py-20 bg-ink text-cream">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-display font-extrabold text-3xl md:text-5xl">
              Our mission
            </h2>
            <p className="mt-6 text-lg md:text-xl text-cream/75 leading-relaxed">
              Help teams ship a mobile app whose scope, stack, and store
              listing match the job the product is supposed to do. We would
              rather say what the first release includes than decorate the
              homepage with numbers we cannot show.
            </p>
          </div>
        </section>

        {/* Values */}
        <section className="px-6 lg:px-10 py-20">
          <div className="max-w-6xl mx-auto">
            <h3 className="font-display font-extrabold text-3xl md:text-4xl text-ink">
              What we stand for
            </h3>
            <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((v, idx) => (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08 }}
                  className="rounded-3xl border border-ink/10 bg-white p-6"
                >
                  <div className="size-12 rounded-xl bg-gradient-to-br from-electric to-hot-pink grid place-items-center text-white">
                    <v.icon className="size-6" />
                  </div>
                  <h3 className="mt-4 font-display font-bold text-lg text-ink">
                    {v.title}
                  </h3>
                  <p className="mt-2 text-sm text-ink/65 leading-relaxed">
                    {v.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 lg:px-10 pb-24">
          <div className="max-w-3xl mx-auto text-ink/75 leading-8 space-y-5">
            <h2 className="font-display font-extrabold text-3xl text-ink">
              How to read this site
            </h2>
            <p>
              The guides under Services are the pages we kept after removing a
              large set of unrelated keyword URLs. Each remaining page is about
              mobile app development: native iOS, native Android, Flutter,
              React Native, what a build costs, how a store listing works, or a
              mobile product in a specific industry. Pages about jobs, venture
              lists, forex platforms, electronic record catalogs, and similar
              topics now return a gone response and are not in the sitemap.
            </p>
            <p>
              Nothing here is a laboratory report. Where a page mentions a
              planning range, that range is a way to talk about scope. It is
              not a measurement from a test we ran, and it is not a quote. A
              quote starts when you send the flows, the platforms, and the
              systems the app must call.
            </p>
            <p>
              If you want to talk about a product, use the contact page. The
              email is sales@clickmastersmobiledevelopmentcompany.com and the
              phone is +1 325 202 4074. Please do not use any older placeholder
              number you may have seen on a previous version of this site.
            </p>
            <p>
              The work itself is ordinary and specific. We help you name the
              first release, choose native iOS, native Android, Flutter, or
              React Native for a reason you can repeat, and prepare the store
              listing from the binary you are actually submitting. We will say
              when a mobile website is enough. We will not invent a headcount,
              a founding year, a city, an award, or a star rating to fill a
              homepage. If a fact is not on this page or the contact page, do
              not treat an old screenshot of the site as evidence of it.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
