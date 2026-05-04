"use client";

import Navbar from "@/app/components/Navbar";
import AboutHero from "./components/AboutHero";
import ConsultationCTA from "@/app/components/ConsultationCTA";
import AboutPillars from "./components/AboutPillars";
import AboutMethodology from "./components/AboutMethodology";
import AboutLeadership from "./components/AboutLeadership";
import Footer from "@/app/components/Footer";

export default function AboutPage() {
  return (
    <main className="flex min-h-screen flex-col overflow-x-hidden">
      <Navbar />
      <AboutHero />
      <AboutPillars />
      <AboutMethodology />
      <AboutLeadership />
      <ConsultationCTA />
      <Footer />
    </main>
  );
}
