import React, { useEffect, useRef, useState } from 'react';
import {
  Bell,
  TriangleAlert,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  ShieldAlert,
  Database,
  Activity,
  Layers
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Image from "next/image";

// Local Assets
import auditCard from "@/src/assets/audit_card.png";
import thresholdsCard from "@/src/assets/thresholds_card.png";
import gapsCard from "@/src/assets/gaps_card.png";
import mtfCard from "@/src/assets/mtf_card.png";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Component: Stylized Badge
const Badge = ({ children, variant = 'default', icon: Icon, className }: { children: React.ReactNode, variant?: 'default' | 'danger', icon?: any, className?: string }) => (
  <div className={`flex items-center gap-3 px-6 py-2 rounded-full border-2 uppercase tracking-[0.2em] font-black text-xs 2xl:text-lg ${variant === 'default'
    ? "bg-red-950/30 border-red-500/60 text-red-500 shadow-[0_0_20px_rgba(239,68,68,0.2)]"
    : "bg-red-600/30 border-red-500 text-white shadow-[0_0_25px_rgba(239,68,68,0.3)]"
    } ${className || ''}`}>
    {Icon && <Icon size={32} className={variant === 'danger' ? "animate-pulse" : ""} />}
    <span className="flex-1">{children}</span>
  </div>
);

// Component: Cyber Button
const CyberButton = ({ children, variant = 'primary', icon: Icon, onClick, className }: { children: React.ReactNode, variant?: 'primary' | 'outline', icon?: any, onClick?: () => void, className?: string }) => (
  <button
    onClick={onClick}
    className={`group relative flex items-center gap-3 px-8 py-4 rounded-xl font-bold transition-all duration-300 active:scale-95 ${variant === 'primary'
      ? "bg-red-600 text-white shadow-[0_0_30px_rgba(220,38,38,0.4)] hover:bg-red-500 hover:shadow-[0_0_40px_rgba(220,38,38,0.6)]"
      : "border-2 border-red-600/50 text-white hover:bg-red-600 hover:border-red-600 shadow-[0_0_20px_rgba(220,38,38,0.2)]"
      } ${className || ''}`}>
    {children}
    {Icon && <Icon size={20} className="transition-transform group-hover:translate-x-1" />}
  </button>
);

export const News = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const leftContentRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const slides = [
    {
      title: "Would Your Pharmacy Pass a PBM Audit Today?",
      description: "Small documentation and compliance issues can trigger audits, recoupments, and long-term revenue loss.",
      image: auditCard,
      cta: "Analyze Exposure"
    },
    {
      title: "Are PBM Thresholds Quietly Reducing Your Reimbursements?",
      description: "Minor inefficiencies in workflow and reporting often lead to major financial and compliance risks.",
      image: thresholdsCard,
      cta: "Check Thresholds"
    },
    {
      title: "Are Small Operational Gaps Creating Significant Financial Exposure?",
      description: "Many pharmacies unknowingly exceed PBM thresholds — increasing audit risk and reducing profitability.",
      image: gapsCard,
      cta: "Audit Gaps"
    },
    {
      title: "Backend Revenue Control",
      description: "MTF Revenue Leakage Control: If you are not actively tracking or disputing MTF payments, you are silently losing backend revenue.",
      image: mtfCard,
      cta: "Reconcile MTF"
    }
  ];

  useGSAP(() => {
    // Initial Entrance with ScrollTrigger
    gsap.from(leftContentRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
      },
      y: 50,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out'
    });

    gsap.from(cardRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
      },
      y: 50,
      opacity: 0,
      duration: 1.5,
      ease: 'power4.out',
      delay: 0.3
    });

    // Animate badge icons
    gsap.to(".pulse-icon", {
      scale: 1.1,
      repeat: -1,
      yoyo: true,
      duration: 2,
      ease: "sine.inOut"
    });

    // Pulse effect for Critical Insights
    gsap.to(".pulse-badge", {
      borderColor: "rgba(239, 68, 68, 0.8)",
      backgroundColor: "rgba(239, 68, 68, 0.15)",
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    gsap.to(".inner-dot", {
      opacity: 0.4,
      scale: 1.5,
      repeat: -1,
      yoyo: true,
      duration: 1,
      ease: "power1.inOut"
    });
  }, { scope: containerRef });

  // Auto-scroll logic
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, [activeSlide]); // Reset timer on slide change (manual or auto)

  const nextSlide = () => {
    gsap.to(cardRef.current, {
      opacity: 0,
      x: -20,
      duration: 0.3,
      onComplete: () => {
        setActiveSlide((prev) => (prev + 1) % slides.length);
        gsap.fromTo(cardRef.current,
          { opacity: 0, x: 20 },
          { opacity: 1, x: 0, duration: 0.5 }
        );
      }
    });
  };

  const prevSlide = () => {
    gsap.to(cardRef.current, {
      opacity: 0,
      x: 20,
      duration: 0.3,
      onComplete: () => {
        setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
        gsap.fromTo(cardRef.current,
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.5 }
        );
      }
    });
  };

  return (
    <div ref={containerRef} className="min-h-screen relative flex items-center justify-center 2xl:px-24 overflow-hidden">

      {/* Background Decorative Elements */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Red ambient glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-red-600/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Abstract Grid Overlays */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <main className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

        {/* Left Column: Alerts & Intro */}
        <div ref={leftContentRef} className="lg:col-span-4 space-y-10">
          <div className="space-y-6">
            <Badge icon={Bell} className="w-fit"><span className="text-3xl font-semibold">Critical Insights</span></Badge>

            <h1 className="text-4xl 2xl:text-6xl font-bold leading-[1.1] tracking-tight text-white">
              Pharmacy Compliance
              <br />
              &<span className="text-red-600"> Revenue Performance</span>
            </h1>

            <p className="text-slate-400 text-xl md:text-2xl max-w-lg leading-relaxed font-medium">
              Real-time alerts help you stay ahead of compliance risks, revenue leakage, and operational issues.
            </p>
          </div>

          <div className="pt-6">
            <CyberButton icon={ArrowRight} className="text-lg px-10 py-5">
              View All Alerts
            </CyberButton>
          </div>
        </div>

        {/* Right Column: Hero Card Slider */}
        <div className="lg:col-span-8 relative">
          {/* Glowing Border Container */}
          <div className="relative p-[1.5px] rounded-[3rem] bg-gradient-to-br from-red-500 via-red-600 to-red-900 shadow-[0_0_60px_rgba(220,38,38,0.3)]">
            {/* Main Card */}
            <div
              ref={cardRef}
              className="relative aspect-[16/10] w-full rounded-[2.9rem] overflow-hidden bg-[#02040a] z-10"
            >
              {/* Background Image */}
              <img
                src={typeof slides[activeSlide].image === 'string' ? slides[activeSlide].image : (slides[activeSlide].image as any).src}
                alt={slides[activeSlide].title}
                className="absolute inset-0 w-full h-full object-cover opacity-60 transition-opacity duration-700"
              />

              {/* Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#02040a] via-[#02040a]/20 to-transparent" />
              <div className="absolute inset-0 border-[1px] border-red-500/10 rounded-[2.9rem]" />

              {/* Top Right Label */}
              <div className="absolute top-10 right-10">
                <Badge variant="danger" icon={TriangleAlert} className="rounded-2xl border-red-500/50 bg-red-950/60 px-5 py-2.5 text-red-500 text-sm">
                  High Risk
                </Badge>
              </div>

              {/* Content Overlay */}
              <div className="absolute inset-x-0 bottom-0 p-12 md:p-20 space-y-10">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <h2 className="text-3xl md:text-5xl font-display font-bold leading-tight text-white max-w-2xl">
                      {slides[activeSlide].title}
                    </h2>
                  </div>
                  <p className="text-slate-300 text-lg md:text-xl leading-relaxed max-w-2xl font-light">
                    {slides[activeSlide].description}
                  </p>
                </div>

                <CyberButton variant="outline" icon={ChevronRight} className="rounded-full px-12 py-5 border-red-600 text-red-600 hover:bg-red-600 hover:text-white text-xl">
                  {slides[activeSlide].cta}
                </CyberButton>
              </div>
            </div>
          </div>

          {/* Slider Controls */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-14 h-14 rounded-full border-2 border-red-600/50 bg-[#02040a] flex items-center justify-center text-white hover:bg-red-600 transition-all z-20 shadow-[0_0_20px_rgba(220,38,38,0.2)]"
          >
            <ChevronLeft size={28} />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-14 h-14 rounded-full border-2 border-red-600/50 bg-[#02040a] flex items-center justify-center text-white hover:bg-red-600 transition-all z-20 shadow-[0_0_20px_rgba(220,38,38,0.2)]"
          >
            <ChevronRight size={28} />
          </button>

          {/* Pagination */}
          <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-4">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveSlide(i)}
                className={`h-1.5 transition-all duration-300 rounded-full ${activeSlide === i ? "w-16 bg-red-600 shadow-[0_0_15px_rgba(220,38,38,0.8)]" : "w-8 bg-white/10 hover:bg-white/20"
                  }`}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};
