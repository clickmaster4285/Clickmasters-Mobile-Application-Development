"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Rocket,
  ShoppingBag,
  HeartPulse,
  Banknote,
  GraduationCap,
  Truck,
  type LucideIcon,
} from "lucide-react";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { useLenisScroll } from "@/components/landing/motion";

type Solution = {
  icon: LucideIcon;
  title: string;
  description: string;
  outcomes: string[];
  href: string;
};

const solutions: Solution[] = [
  {
    icon: Rocket,
    title: "Startup MVPs",
    description:
      "Validate fast with a lean, investor-ready app built in weeks, not months.",
    outcomes: [
      "One job in the first release",
      "A thin installable slice",
      "A store plan before the date",
    ],
    href: "/how-to-build-an-app",
  },
  {
    icon: ShoppingBag,
    title: "E-commerce & Retail",
    description:
      "High-converting shopping experiences with seamless checkout and payments.",
    outcomes: ["Catalog source of truth", "Substitution rules", "Slots you can staff"],
    href: "/industry-ecommerce/grocery-delivery-app",
  },
  {
    icon: HeartPulse,
    title: "Healthcare",
    description:
      "Secure, compliant apps for telehealth, scheduling and patient engagement.",
    outcomes: ["Named data owner", "Device storage rules", "Clinical owner for advice"],
    href: "/industry-healthcare/medical-mobile-app-development",
  },
  {
    icon: Banknote,
    title: "Fintech",
    description:
      "Trusted, secure financial products with real-time data and strong auth.",
    outcomes: ["Core statuses, not invented ones", "Step-up rules", "Sandbox failures"],
    href: "/industry-fintech/mobile-banking-apps",
  },
  {
    icon: GraduationCap,
    title: "Education",
    description:
      "Engaging learning platforms with content, progress tracking and community.",
    outcomes: ["One learner job", "Content you already own", "Offline only if required"],
    href: "/how-to-build-an-app/build-an-app-for-my-business",
  },
  {
    icon: Truck,
    title: "Logistics & Delivery",
    description:
      "Real-time tracking, routing and fleet management built for scale.",
    outcomes: ["Stops with one proof type", "A coordinator queue", "Honest failed states"],
    href: "/industry-ecommerce/delivery-app",
  },
];

export default function SolutionsPage() {
  useLenisScroll();
  return (
    <div className="relative min-h-screen bg-cream overflow-x-hidden">
      <Navbar />
      <main>
        <section className="relative px-6 lg:px-10 pt-40 pb-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-electric/5 via-cream to-hot-pink/5" />
          <div className="max-w-5xl mx-auto text-center relative">
            <p className="font-script text-3xl text-hot-pink -rotate-2">
              tailored
            </p>
            <h1 className="mt-2 font-display font-extrabold text-5xl md:text-7xl text-ink leading-[0.95]">
              Solutions
            </h1>
            <p className="mt-6 text-lg text-ink/65 max-w-2xl mx-auto">
              Industry pages for mobile apps only. Each card links to a guide.
              The guides describe scope. They do not report a client result.
            </p>
          </div>
        </section>

        <section className="px-6 lg:px-10 pb-32">
          <div className="max-w-[85vw] mx-auto">
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-ink text-center">
              Industries we build for
            </h2>
            <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {solutions.map((s, i) => (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                >
                <Link
                  href={s.href}
                  className="group relative block h-full rounded-3xl border border-ink/10 bg-white p-7 transition-all duration-500 hover:-translate-y-1 hover:border-ink/20 hover:shadow-[0_30px_70px_-30px_rgba(0,0,0,0.35)]"
                >
                  <div className="size-14 rounded-2xl bg-gradient-to-br from-electric/10 to-hot-pink/10 grid place-items-center text-ink group-hover:from-electric group-hover:to-hot-pink group-hover:text-white transition-all duration-500">
                    <s.icon className="size-7" />
                  </div>
                  <h3 className="mt-5 font-display font-bold text-xl text-ink">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm text-ink/65 leading-relaxed">
                    {s.description}
                  </p>
                  <ul className="mt-5 space-y-2">
                    {s.outcomes.map((o) => (
                      <li
                        key={o}
                        className="flex items-center gap-2 text-sm text-ink/70"
                      >
                        <span className="size-1.5 rounded-full bg-hot-pink" />
                        {o}
                      </li>
                    ))}
                  </ul>
                </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 lg:px-10 pb-20">
          <div className="max-w-3xl mx-auto space-y-5 text-ink/75 leading-8">
            <h2 className="font-display font-extrabold text-3xl text-ink">
              What these solutions are
            </h2>
            <p>
              A solution on this page is a mobile client for a job you already
              run or are about to run. A startup MVP is a first release with
              one job, built far enough to install. An education product is the
              same shape pointed at a learner: a lesson, a progress record, and
              only the offline behavior you can actually support. Healthcare,
              banking, grocery, and local delivery each have a guide because
              the hard part is not the icon. It is the system behind the phone:
              a record sandbox, a core ledger, a store catalog, or a list of
              stops.
            </p>
            <p>
              We removed the old library pages that ranked for electronic
              medical record software, forex platforms, trading terminals, and
              similar topics. Those URLs were not mobile-app briefs. If you
              need a mobile client that talks to a system you already operate,
              say that in the guide&apos;s language: who holds the data, what
              the phone is allowed to store, and what &quot;done&quot; looks
              like for one order, one visit, or one transfer.
            </p>
            <p>
              Read the linked guide before you write. Then use the contact page
              with the first-release list and the later list kept separate. The
              cost guide explains why those lists change the price. The iOS,
              Android, and Flutter or React Native hubs explain the stack. None
              of those pages are a case study. The named projects that used to
              appear on the homepage are not published here, because they were
              not tied to a source you can open.
            </p>
            <p>
              Education and startup work do not get a separate industry catalog.
              They use the how-to-build guide and, when the buyer is an
              operating company, the business-app guide. Logistics that is
              really grocery belongs on the grocery page because substitutions
              and slots dominate the scope. Logistics that is a pickup and a
              dropoff belongs on the delivery page. Picking the wrong one makes
              the estimate describe a product you are not building.
            </p>
          </div>
        </section>

        <section className="px-6 lg:px-10 py-24 bg-ink text-cream text-center">
          <div className="max-w-3xl mx-auto">
            <h3 className="font-display font-extrabold text-4xl md:text-5xl">
              Don&apos;t see your industry?
            </h3>
            <p className="mt-4 text-cream/70">
              We build custom solutions for ambitious teams across every
              vertical. Let&apos;s talk about yours.
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-hot-pink text-white px-8 py-4 font-semibold"
            >
              Start a conversation
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
