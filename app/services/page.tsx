"use client";

import Navbar from "@/app/components/Navbar";
import { ServicesHero } from "./components/ServicesHero";
import { ServicesDetail } from "./components/ServicesDetail";
import { AlertSystem } from "./components/AlertSystem";
import { ServicesOnboarding } from "./components/ServicesOnboarding";
import ConsultationCTA from "@/app/components/ConsultationCTA";
import Footer from "@/app/components/Footer";

export default function ServicesPage() {

  return (
    <>
      <Navbar />
      <div className="bg-[#020817]">
        <ServicesHero />
        <ServicesDetail />
        <ServicesOnboarding />
      </div>
      <ConsultationCTA />
      <Footer />
    </>
  );
}
