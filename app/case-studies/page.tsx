"use client";

import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import ConsultationCTA from "@/app/components/ConsultationCTA";
import CaseHero from "./Components/CaseHero";
import CaseStudiesList from "./Components/CaseStudiesList";
import CaseMethodology from "./Components/CaseMethodology";
import PerformanceMatrix from "./Components/PerformanceMatrix";
import NetworkPulse from "./Components/NetworkPulse";

export default function CaseStudiesPage() {
  return (
    <main className="flex min-h-screen flex-col overflow-x-hidden">
      <Navbar />
      <CaseHero />
      <NetworkPulse />
      <PerformanceMatrix />
      <CaseStudiesList />
      <CaseMethodology />
      <ConsultationCTA />
      <Footer />
    </main>
  );
}
