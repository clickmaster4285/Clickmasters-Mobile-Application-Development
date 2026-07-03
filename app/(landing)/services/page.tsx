"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, type LucideIcon } from "lucide-react";
import * as Icons from "lucide-react";
import { services } from "@/data/services";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { useLenisScroll } from "@/components/landing/motion";

function getIcon(name: string): LucideIcon {
  const lib = Icons as unknown as Record<string, LucideIcon>;
  return lib[name] ?? Icons.Code;
}

export default function ServicesPage() {
  useLenisScroll();
  return (
    <div className="relative min-h-screen bg-cream overflow-x-hidden">
      <Navbar />
      <main>
        <section className="px-6 lg:px-10 pt-40 pb-16">
          <div className="max-w-5xl mx-auto text-center">
            <p className="font-script text-3xl text-hot-pink -rotate-2">our</p>
            <h1 className="mt-2 font-display font-extrabold text-5xl md:text-7xl text-ink leading-[0.95]">
              Services
            </h1>
            <p className="mt-6 text-lg text-ink/65 max-w-2xl mx-auto">
              Comprehensive mobile development solutions tailored to your business needs.
            </p>
          </div>
        </section>

        <section className="px-6 lg:px-10 pb-32">
          <div className="max-w-[85vw] mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => {
              const Icon = getIcon(service.icon);
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                >
                  <Link
                    href={`/services/${service.slug}`}
                    className="group relative block h-full rounded-3xl border border-ink/10 bg-white p-7 transition-all duration-500 hover:-translate-y-1 hover:border-ink/20 hover:shadow-[0_30px_70px_-30px_rgba(0,0,0,0.35)]"
                  >
                    <div className="size-14 rounded-2xl bg-gradient-to-br from-electric/10 to-hot-pink/10 grid place-items-center text-ink group-hover:from-electric group-hover:to-hot-pink group-hover:text-white transition-all duration-500">
                      <Icon className="size-7" />
                    </div>
                    <h3 className="mt-5 font-display font-bold text-xl text-ink">{service.title}</h3>
                    <p className="mt-2 text-sm text-ink/65 leading-relaxed">
                      {service.shortDescription}
                    </p>
                    <div className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-hot-pink">
                      Learn more
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
