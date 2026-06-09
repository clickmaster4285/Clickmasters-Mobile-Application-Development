"use client";

import { use } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check, type LucideIcon } from "lucide-react";
import * as Icons from "lucide-react";
import { getServiceBySlug, services, type Service } from "@/data/services";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { useLenisScroll } from "@/components/landing/motion";

function getIcon(name: string): LucideIcon {
  const lib = Icons as unknown as Record<string, LucideIcon>;
  return lib[name] ?? Icons.Code;
}

export default function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const service = getServiceBySlug(slug);
  useLenisScroll();

  if (!service) {
    return (
      <div className="min-h-screen grid place-items-center bg-cream text-center px-6">
        <div>
          <p className="font-script text-4xl text-hot-pink">oops</p>
          <h1 className="mt-2 font-display font-extrabold text-4xl text-ink">Service not found</h1>
          <Link
            href="/services"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-ink text-cream px-6 py-3 font-semibold"
          >
            Back to services
          </Link>
        </div>
      </div>
    );
  }

  const Icon = getIcon(service.icon);
  const related = services.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <div className="relative min-h-screen bg-cream overflow-x-hidden">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative px-6 lg:px-10 pt-36 pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-electric/5 via-cream to-hot-pink/5" />
          <div className="max-w-5xl mx-auto relative">
            <nav className="flex items-center gap-2 text-sm text-ink/55">
              <Link href="/" className="hover:text-ink">Home</Link>
              <span>/</span>
              <Link href="/services" className="hover:text-ink">Services</Link>
              <span>/</span>
              <span className="text-ink font-medium">{service.title}</span>
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mt-8 size-20 rounded-3xl bg-gradient-to-br from-electric to-hot-pink grid place-items-center text-white shadow-[0_20px_50px_-20px_rgba(255,71,127,0.6)]"
            >
              <Icon className="size-10" />
            </motion.div>

            <h1 className="mt-8 font-display font-extrabold text-5xl md:text-7xl text-ink leading-[0.95] tracking-tight">
              {service.title}
            </h1>
            <p className="mt-6 text-lg text-ink/70 max-w-2xl leading-relaxed">
              {service.fullDescription}
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 rounded-full bg-hot-pink text-white px-7 py-4 font-semibold shadow-[0_18px_50px_-18px_color-mix(in_oklab,var(--color-hot-pink)_70%,transparent)]"
              >
                Start your project
                <ArrowRight className="size-4" />
              </Link>
              <a
                href="#process"
                className="rounded-full border-2 border-ink text-ink px-7 py-4 font-semibold bg-white/70 hover:bg-ink hover:text-cream transition-colors"
              >
                How it works
              </a>
            </div>
          </div>
        </section>

        {/* Stats */}
        {service.stats && (
          <section className="px-6 lg:px-10 py-16 bg-ink text-cream">
            <div className="max-w-5xl mx-auto grid sm:grid-cols-3 gap-8 text-center">
              {service.stats.map((s) => (
                <div key={s.label}>
                  <p className="font-display font-extrabold text-5xl bg-gradient-to-br from-electric to-hot-pink bg-clip-text text-transparent">
                    {s.value}
                  </p>
                  <p className="mt-2 text-sm uppercase tracking-[0.25em] text-cream/60">{s.label}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Technologies */}
        <section className="px-6 lg:px-10 py-20">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-ink">
              Technologies we use
            </h2>
            <div className="mt-8 flex flex-wrap gap-3">
              {service.technologies.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-ink/15 bg-white px-5 py-2.5 text-sm font-semibold text-ink"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="px-6 lg:px-10 py-20 bg-white/60">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-ink">
              Why choose us
            </h2>
            <div className="mt-8 grid md:grid-cols-2 gap-4">
              {service.benefits.map((b) => (
                <div
                  key={b}
                  className="flex items-start gap-3 rounded-2xl border border-ink/10 bg-cream p-5"
                >
                  <span className="mt-0.5 grid place-items-center size-6 rounded-full bg-hot-pink text-white flex-shrink-0">
                    <Check className="size-3.5" strokeWidth={3} />
                  </span>
                  <p className="text-ink/80">{b}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section id="process" className="px-6 lg:px-10 py-20">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-ink">
              Our process
            </h2>
            <div className="mt-10 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {service.process.map((step, idx) => (
                <div
                  key={step}
                  className="relative rounded-2xl border border-ink/10 bg-white p-5"
                >
                  <span className="font-display font-extrabold text-4xl text-hot-pink/30">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-2 font-semibold text-ink">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Related */}
        <section className="px-6 lg:px-10 py-20 bg-white/60">
          <div className="max-w-[85vw] mx-auto">
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-ink">
              Related services
            </h2>
            <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((r) => {
                const RIcon = getIcon(r.icon);
                return (
                  <Link
                    key={r.slug}
                    href={`/services/${r.slug}`}
                    className="group rounded-3xl border border-ink/10 bg-cream p-6 transition hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className="size-12 rounded-xl bg-ink/5 grid place-items-center text-ink">
                      <RIcon className="size-6" />
                    </div>
                    <h3 className="mt-4 font-display font-bold text-lg text-ink">{r.title}</h3>
                    <p className="mt-1 text-sm text-ink/60">{r.shortDescription}</p>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 lg:px-10 py-24 bg-ink text-cream text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display font-extrabold text-4xl md:text-5xl">
              Ready to build your app?
            </h2>
            <p className="mt-4 text-cream/70">
              Let&apos;s discuss your project and turn your idea into reality.
            </p>
            <Link
              href="/#contact"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-hot-pink text-white px-8 py-4 font-semibold"
            >
              Get a free consultation
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
