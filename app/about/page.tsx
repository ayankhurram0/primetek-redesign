import Navbar from "@/app/components/Navbar";
import { AboutHero } from "./components/AboutHero";
import { OurJourney } from "./components/OurJourney";

import { MissionVision } from "./components/MissionVision";
import { CorePhilosophy } from "./components/CorePhilosophy";
import { Evolution } from "./components/Evolution";
import { TheCollective } from "./components/TheCollective";
import ConsultationCTA from "@/app/components/ConsultationCTA";
import Footer from "@/app/components/Footer";

export default function AboutPage() {
  return (
    <main className="flex min-h-screen flex-col overflow-x-hidden">
      <Navbar />
      <AboutHero />
      <OurJourney />
      <Evolution />
      <ConsultationCTA />
      <Footer />
    </main>
  );
}
