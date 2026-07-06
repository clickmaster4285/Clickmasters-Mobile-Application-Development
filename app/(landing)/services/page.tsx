"use client";

import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { useLenisScroll } from "@/components/landing/motion";
import { ServicesContentDropdown } from "@/components/landing/ServicesContentDropdown";
import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";


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
              Comprehensive mobile development solutions tailored to your
              business needs.
            </p>
          </div>
        </section>

        <ServicesContentDropdown />
      </main>
      <Footer />
    </div>
  );
}
