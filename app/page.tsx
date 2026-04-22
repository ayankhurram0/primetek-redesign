"use client"
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Newhero from "./components/Newhero";
import Footer from "./components/Footer";
import Preloader from "./components/Preloader";
import ScrollIndicator from "./components/ScrollIndicator";
import ServicesSticky from "./components/ServicesSticky";
import News from "./components/News";
import { WhyPrimeTek } from "./components/WhyPrimeTek";
import Testimonials from "./components/Testimonials";
import ConsultationCTA from "./components/ConsultationCTA";
import { OrbitingSection } from "./components/OrbitingSection";
import { OurFramework } from "./components/OurFramework";
import { PharmacySlider } from "./components/PharmacySlider";
import Blah from "./components/blah";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);



export default function Home() {
  useEffect(() => {
    // Refresh ScrollTrigger after a short delay
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 1000);
    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);
  return (
    <>
      <Preloader />
      <ScrollIndicator />
      <Navbar />
      <Newhero />
      <News />
      <Blah />
      <OrbitingSection />
      <WhyPrimeTek />
      <OurFramework />
      <Testimonials />
      <ConsultationCTA />
      <Footer />
    </>
  );
}
