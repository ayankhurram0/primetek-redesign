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
    <section ref={containerRef} className="relative pt-44 pb-20 px-6 overflow-hidden bg-hero-gradient">
      <div className="max-w-7xl mx-auto relative z-10 text-center">
        <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/[0.05] border border-white/10 text-brand-teal text-[10px] font-black uppercase tracking-[0.4em] mb-10 hero-reveal rounded-lg">
          <Calendar className="w-4 h-4" />
          Schedule a Strategy Call
        </div>
        <h1 className="hero-reveal text-7xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter uppercase mb-12">
          Let's Talk About <br /> Your Pharmacy.
        </h1>
        <p className="hero-reveal text-2xl text-slate-400 font-light leading-relaxed max-w-3xl mx-auto">
          Fill out the form below and a PrimeTek specialist will reach out within one business day to schedule your complimentary strategy call.
        </p>
      </div>
    </section>
  );
};
