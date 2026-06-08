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
};

const solutions: Solution[] = [
  {
    icon: Rocket,
    title: "Startup MVPs",
    description: "Validate fast with a lean, investor-ready app built in weeks, not months.",
    outcomes: ["Rapid prototyping", "Investor-ready demos", "Scalable foundation"],
  },
  {
    icon: ShoppingBag,
    title: "E-commerce & Retail",
    description: "High-converting shopping experiences with seamless checkout and payments.",
    outcomes: ["Frictionless checkout", "Push re-engagement", "Inventory sync"],
  },
  {
    icon: HeartPulse,
    title: "Healthcare",
    description: "Secure, compliant apps for telehealth, scheduling and patient engagement.",
    outcomes: ["HIPAA-aware design", "Telehealth video", "Patient portals"],
  },
  {
    icon: Banknote,
    title: "Fintech",
    description: "Trusted, secure financial products with real-time data and strong auth.",
    outcomes: ["Bank-grade security", "Real-time data", "KYC & onboarding"],
  },
  {
    icon: GraduationCap,
    title: "Education",
    description: "Engaging learning platforms with content, progress tracking and community.",
    outcomes: ["Interactive lessons", "Progress tracking", "Offline access"],
  },
  {
    icon: Truck,
    title: "Logistics & Delivery",
    description: "Real-time tracking, routing and fleet management built for scale.",
    outcomes: ["Live GPS tracking", "Smart routing", "Driver apps"],
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
            <p className="font-script text-3xl text-hot-pink -rotate-2">tailored</p>
            <h1 className="mt-2 font-display font-extrabold text-5xl md:text-7xl text-ink leading-[0.95]">
              Solutions
            </h1>
            <p className="mt-6 text-lg text-ink/65 max-w-2xl mx-auto">
              Purpose-built mobile solutions for the industries we know best — designed to launch
              fast, scale smoothly, and drive real business results.
            </p>
          </div>
        </section>

        <section className="px-6 lg:px-10 pb-32">
          <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {solutions.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="group relative block h-full rounded-3xl border border-ink/10 bg-white p-7 transition-all duration-500 hover:-translate-y-1 hover:border-ink/20 hover:shadow-[0_30px_70px_-30px_rgba(0,0,0,0.35)]"
              >
                <div className="size-14 rounded-2xl bg-gradient-to-br from-electric/10 to-hot-pink/10 grid place-items-center text-ink group-hover:from-electric group-hover:to-hot-pink group-hover:text-white transition-all duration-500">
                  <s.icon className="size-7" />
                </div>
                <h3 className="mt-5 font-display font-bold text-xl text-ink">{s.title}</h3>
                <p className="mt-2 text-sm text-ink/65 leading-relaxed">{s.description}</p>
                <ul className="mt-5 space-y-2">
                  {s.outcomes.map((o) => (
                    <li key={o} className="flex items-center gap-2 text-sm text-ink/70">
                      <span className="size-1.5 rounded-full bg-hot-pink" />
                      {o}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="px-6 lg:px-10 py-24 bg-ink text-cream text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display font-extrabold text-4xl md:text-5xl">
              Don&apos;t see your industry?
            </h2>
            <p className="mt-4 text-cream/70">
              We build custom solutions for ambitious teams across every vertical. Let&apos;s talk about
              yours.
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
