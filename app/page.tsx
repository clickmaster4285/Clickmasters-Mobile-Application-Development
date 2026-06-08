"use client";

import { CinematicEntry } from "@/components/landing/CinematicEntry";
import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { ServicesSection } from "@/components/landing/ServicesSection";
import { Awesoop } from "@/components/landing/Awesoop";
import { TrustedPartners } from "@/components/landing/TrustedPartners";
import { MeetPartner } from "@/components/landing/MeetPartner";
import { Portfolio } from "@/components/landing/Portfolio";
import { Process } from "@/components/landing/Process";
import { Testimonials } from "@/components/landing/Testimonials";
import { Team } from "@/components/landing/Team";
import { Awards } from "@/components/landing/Awards";
import { TechStack } from "@/components/landing/TechStack";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { Footer } from "@/components/landing/Footer";
import { FAQ } from "@/components/landing/FAQ";
import { Industries } from "@/components/landing/Industries";
import { FloatingContact } from "@/components/landing/FloatingContact";
import { useLenisScroll, ParallaxBackdrop } from "@/components/landing/motion";

export default function HomePage() {
  useLenisScroll();

  return (
    <div className="relative min-h-screen bg-cream overflow-x-hidden">
      <ParallaxBackdrop />
      <CinematicEntry />
      <Navbar />
      <main>
        <Hero />
        <TrustedPartners />
        <Awesoop />
        <MeetPartner />
        <Portfolio />
        <ServicesSection />
        <Industries />
        <Process />
        <Testimonials />
        <Team />
        <Awards />
        <TechStack />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <FloatingContact />
    </div>
  );
}
