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
import Newhero from "./components/Newhero";
import SmoothScroll from "./components/SmoothScroll";
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
    <SmoothScroll>
      <main className="flex min-h-screen flex-col overflow-x-hidden relative">
        {/* Full Background Grid Pattern - Fixed */}
        <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
          <svg className="w-full h-full" viewBox="0 0 1920 1080" fill="none" preserveAspectRatio="xMidYMid slice">
            {/* Grid dots pattern covering full screen */}
            {[...Array(30)].map((_, row) => (
              [...Array(50)].map((_, col) => (
                <circle
                  key={`grid-${row}-${col}`}
                  cx={20 + col * 38}
                  cy={20 + row * 36}
                  r="2"
                  fill="#14b8a6"
                  opacity={0.1 + Math.sin(row * 0.1) * 0.2}
                />
              ))
            ))}
            {/* Flowing lines */}
            <path
              d="M0,200 Q400,100 800,200 T1600,200"
              stroke="#14b8a6"
              strokeWidth="1"
              fill="none"
              opacity="0.3"
            />
            <path
              d="M0,400 Q600,300 1200,400 T1920,400"
              stroke="#14b8a6"
              strokeWidth="0.8"
              fill="none"
              opacity="0.25"
            />
            <path
              d="M0,600 Q500,500 1000,600 T1920,600"
              stroke="#14b8a6"
              strokeWidth="0.6"
              fill="none"
              opacity="0.2"
            />
            <path
              d="M0,800 Q400,700 800,800 T1600,800"
              stroke="#14b8a6"
              strokeWidth="0.5"
              fill="none"
              opacity="0.15"
            />
          </svg>
        </div>

        {/* Decorative Elements - Bottom Right - Concentric Circles - Fixed */}
        <div className="fixed -bottom-40 -right-40 w-[800px] h-[800px] pointer-events-none z-0 opacity-70">
          <svg className="w-full h-full" viewBox="0 0 800 800" fill="none">
            {/* Concentric circles */}
            {[...Array(8)].map((_, i) => (
              <circle
                key={`circle-${i}`}
                cx="600"
                cy="600"
                r={50 + i * 60}
                stroke="#14b8a6"
                strokeWidth="1.5"
                fill="none"
                opacity={0.4 - i * 0.04}
              />
            ))}
            {/* Additional decorative dots */}
            {[...Array(12)].map((_, i) => (
              <circle
                key={`dot-${i}`}
                cx={500 + i * 25}
                cy={650 - i * 20}
                r="2"
                fill="#14b8a6"
                opacity={0.3 + i * 0.02}
              />
            ))}
          </svg>
        </div>

        <>
        <ScrollIndicator />
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
