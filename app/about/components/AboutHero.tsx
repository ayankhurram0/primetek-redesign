"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, BarChart3, ShieldCheck, Users, Calendar } from "lucide-react";


gsap.registerPlugin(ScrollTrigger);

interface Stat {
  label: string;
  value: string;
  icon: any;
  color: string;
}

const stats: Stat[] = [
  { label: "Revenue Recovered", value: "$4.2M+", icon: BarChart3, color: "text-emerald-400" },
  { label: "Audit Readiness", value: "98%", icon: ShieldCheck, color: "text-blue-400" },
  { label: "Pharmacies", value: "100+", icon: Users, color: "text-brand-teal" },
  { label: "Experience", value: "8 Yrs", icon: Calendar, color: "text-amber-400" },
];

export const AboutHero = () => {
  const heroRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Intro animations
      gsap.from(".hero-top", {
        opacity: 0,
        y: -20,
        duration: 0.8,
        ease: "power2.out"
      });

      gsap.from(".hero-content > *", {
        opacity: 0,
        x: -30,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out"
      });

      gsap.from(".stat-card", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        stagger: 0.1,
        delay: 0.5,
        ease: "power2.out"
      });

      // Scroll animations
      gsap.fromTo(heroRef.current,
        { scale: 1, opacity: 1 },
        {
          scale: 0.95,
          opacity: 0,
          scrollTrigger: {
            trigger: heroRef.current,
            start: "center center",
            end: "bottom top",
            scrub: true,
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-[90vh] flex flex-col justify-center px-26 pt-32 pb-20 overflow-hidden bg-transparent">
      <div className="relative z-10 text-center w-full max-w-7xl mx-auto hero-content">
        <h1 className="text-6xl md:text-8xl xl:text-8xl font-bold text-white tracking-tighter mb-10 leading-[0.9] uppercase">
          About
          <span className="text-teal-400"> Us.</span>
        </h1>
        <p className="text-2xl md:text-2xl text-slate-400 font-light leading-relaxed max-w-4xl mx-auto mb-12">
          PrimeTek is not a consultancy. We are the Operating System for independent pharmacy survival in a predatory PBM landscape.
        </p>
      </div>
    </section>
  );
};
