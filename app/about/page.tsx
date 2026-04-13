"use client";

import Navbar from "@/app/components/Navbar";
import AboutHero from "./components/AboutHero";
import AboutMission from "./components/AboutMission";
import AboutValues from "./components/AboutValues";
import ConsultationCTA from "@/app/components/ConsultationCTA";
import Footer from "@/app/components/Footer";

export default function AboutPage() {
  return (
    <main className="flex min-h-screen flex-col overflow-x-hidden">
      <Navbar />
      <AboutHero />
      <AboutMission />
      <AboutValues />
      <ConsultationCTA />
      <Footer />
    </main>
  );
}
