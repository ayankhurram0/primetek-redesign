"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { MessageSquare, Phone, MapPin, Mail, Calendar } from "lucide-react";

export const ContactHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-reveal", {
        opacity: 0,
        y: 40,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out"
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative pt-44 pb-20 px-26 overflow-hidden bg-hero-gradient">
      <div className="relative z-10 text-center">
        <h1 className="hero-reveal text-7xl md:text-8xl font-bold text-white leading-[0.9] tracking-tighter uppercase mb-12">
          Let's Talk About <br /> <span className="text-teal-400"> Your Pharmacy.</span>
        </h1>
        <p className="hero-reveal text-2xl text-slate-400 font-light leading-relaxed max-w-3xl mx-auto">
          Fill out the form below and a PrimeTek specialist will reach out within one business day to schedule your complimentary strategy call.
        </p>
      </div>
    </section>
  );
};
