"use client"
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import { Hero } from "./components/Hero";
import Footer from "./components/Footer";
import ScrollIndicator from "./components/ScrollIndicator";
import ServicesSticky from "./components/ServicesSticky";
import News from "./components/News";
import { WhyPrimeTekSection } from "./components/WhyPrimeTek";
import Testimonials from "./components/Testimonials";
import ConsultationCTA from "./components/ConsultationCTA";
import { OrbitingSection } from "./components/OrbitingSection";
import { OurFramework } from "./components/OurFramework";
import { ServicesSection } from "./components/Services";
import TestingSection from "./components/TestingSection";
import Newhero from "./components/Newhero";
import SmoothScroll from "./components/SmoothScroll";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);



export default function Home() {
  return (
    <SmoothScroll>
      <main className="flex min-h-screen flex-col overflow-x-hidden relative">

        <>
          <Navbar />
          <Newhero />
          <News />
          <ServicesSection />
          <OrbitingSection />
          <WhyPrimeTekSection />
          <OurFramework />
          <Testimonials />
          <ConsultationCTA />
          <Footer />
        </>
      </main>
    </SmoothScroll>
  );
}
