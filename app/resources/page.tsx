"use client";

import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import ConsultationCTA from "@/app/components/ConsultationCTA";
import ResourcesHero from "./Components/ResourcesHero";
import ResourcesFeatured from "./Components/ResourcesFeatured";
import ResourcesSupport from "./Components/ResourcesSupport";
import ResourcesFAQ from "./Components/ResourcesFAQ";

export default function ResourcesPage() {
  return (
    <main className="flex min-h-screen flex-col overflow-x-hidden">
      <Navbar />
      <ResourcesHero />
      <ResourcesFeatured />
      <ResourcesSupport />
      <ResourcesFAQ />
      <ConsultationCTA />
      <Footer />
    </main>
  );
}
