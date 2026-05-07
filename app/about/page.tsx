"use client";

import { useMotionValue } from "motion/react";
import Navbar from "@/app/components/Navbar";
import { AboutHero } from "./components/AboutHero";
import { OurStory } from "./components/OurStory";
import { MissionVision } from "./components/MissionVision";
import { CorePhilosophy } from "./components/CorePhilosophy";
import { Evolution } from "./components/Evolution";
import { TheCollective } from "./components/TheCollective";
import ConsultationCTA from "@/app/components/ConsultationCTA";
import Footer from "@/app/components/Footer";

export default function AboutPage() {
  const heroScale = useMotionValue(1);
  const heroOpacity = useMotionValue(1);

  return (
    <main className="flex min-h-screen flex-col overflow-x-hidden">
      <Navbar />
      <AboutHero heroScale={heroScale} heroOpacity={heroOpacity} />
      <OurStory />
      <MissionVision />
      <CorePhilosophy />
      <Evolution />
      <TheCollective />
      <ConsultationCTA />
      <Footer />
    </main>
  );
}
