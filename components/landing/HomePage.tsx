"use client";

import { CinematicEntry } from "@/components/landing/CinematicEntry";
import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { ServicesSection } from "@/components/landing/ServicesSection";
import { MeetPartner } from "@/components/landing/MeetPartner";
import { Process } from "@/components/landing/Process";
import { TechStack } from "@/components/landing/TechStack";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { Footer } from "@/components/landing/Footer";
import { FAQ } from "@/components/landing/FAQ";
import { Industries } from "@/components/landing/Industries";
import { FloatingContact } from "@/components/landing/FloatingContact";
import { useLenisScroll, ParallaxBackdrop } from "@/components/landing/motion";

export function HomePage() {
  useLenisScroll();

  return (
    <div className="relative min-h-screen bg-cream overflow-x-hidden">
      <ParallaxBackdrop />
      <CinematicEntry />
      <Navbar />
      <main>
        <Hero />
        <MeetPartner />
        <ServicesSection />
        <Industries />
        <Process />
        <TechStack />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <FloatingContact />
    </div>
  );
}
