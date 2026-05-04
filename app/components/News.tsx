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
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

// Component: Stylized Badge
const Badge = ({ children, variant = 'default', icon: Icon, className }: { children: React.ReactNode, variant?: 'default' | 'danger', icon?: any, className?: string }) => (
  <div className={`flex items-center gap-2 px-3 py-1 rounded-full border text-[10px] uppercase tracking-widest font-semibold ${variant === 'default' ? "bg-red-500/10 border-red-500/30 text-red-400" : "bg-red-600 border-red-400 text-white glow-red"
    } ${className || ''}`}>
    {Icon && <Icon size={12} className={variant === 'danger' ? "animate-pulse" : ""} />}
    {children}
    {variant === 'default' && <div className="inner-dot w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]" />}
  </div>
);

// Component: Cyber Button
const CyberButton = ({ children, variant = 'primary', icon: Icon, className }: { children: React.ReactNode, variant?: 'primary' | 'outline', icon?: any, className?: string }) => (
  <button className={`group relative flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 active:scale-95 ${variant === 'primary'
    ? "bg-gradient-to-r from-red-600 to-red-800 text-white glow-red hover:glow-red-strong"
    : "border border-red-500/30 text-white hover:bg-red-500/10"
    } ${className || ''}`}>
    {children}
    {Icon && <Icon size={18} className="transition-transform group-hover:translate-x-1" />}
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
      image: "https://images.unsplash.com/photo-1576091160550-217359f49f4c?auto=format&fit=crop&q=80&w=2000",
      cta: "Analyze Exposure"
    },
    {
      title: "Are PBM Thresholds Quietly Reducing Your Reimbursements?",
      description: "Minor inefficiencies in workflow and reporting often lead to major financial and compliance risks.",
      image: "https://images.unsplash.com/photo-1551288049-bbbda50a5f4a?auto=format&fit=crop&q=80&w=2000",
      cta: "Check Thresholds"
    },
    {
      title: "Are Small Operational Gaps Creating Significant Financial Exposure?",
      description: "Many pharmacies unknowingly exceed PBM thresholds — increasing audit risk and reducing profitability.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2000",
      cta: "Audit Gaps"
    },
    {
      title: "Backend Revenue Control",
      description: "MTF Revenue Leakage Control: If you are not actively tracking or disputing MTF payments, you are silently losing backend revenue.",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=2000",
      cta: "Reconcile MTF"
    }
  ];

  useGSAP(() => {
    // Initial Entrance
    gsap.from(leftContentRef.current, {
      x: -50,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out'
    });

    gsap.from(cardRef.current, {
      x: 100,
      opacity: 0,
      duration: 1.5,
      ease: 'power4.out',
      delay: 0.2
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
    <div ref={containerRef} className="min-h-screen relative flex items-center justify-center p-6 md:p-12 overflow-hidden bg-[#030508]">

      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-red-900/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-900/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Abstract Grid Overlays */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <main className="relative z-10 w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

        {/* Left Column: Alerts & Intro */}
        <div ref={leftContentRef} className="lg:col-span-5 space-y-8">
          <div className="space-y-4">
            <Badge icon={Bell} className="pulse-badge">Critical Insights</Badge>

            <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight tracking-tight">
              Pharmacy <span className="text-white">Compliance</span><br />
              & Revenue <span className="text-red-500 text-glow-red">Performance.</span>
            </h1>

            <p className="text-slate-400 text-lg md:text-xl max-w-md leading-relaxed">
              Real-time alerts help you stay ahead of compliance risks, revenue leakage, and operational issues.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <CyberButton icon={ArrowRight}>
              View All Alerts
            </CyberButton>

            <div className="flex items-center gap-4 px-4 py-2 border-l border-white/10">
              <div className="flex -space-x-3">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-[#030508] bg-slate-800 flex items-center justify-center text-[10px] font-bold">
                    {i === 1 ? <ShieldAlert size={12} className="text-red-400" /> : i === 2 ? <Database size={12} className="text-blue-400" /> : <Activity size={12} className="text-green-400" />}
                  </div>
                ))}
              </div>
              <span className="text-xs text-slate-500 font-medium tracking-wide">
                SYSTEM ACTIVE & SECURE
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Hero Card Slider */}
        <div className="lg:col-span-7 relative group">

          {/* Main Card */}
          <div
            ref={cardRef}
            className="relative aspect-[16/10] w-full rounded-2xl md:rounded-3xl border-2 border-glow-red overflow-hidden bg-slate-900 shadow-2xl"
          >
            {/* Background Image */}
            <img
              src={slides[activeSlide].image}
              alt="Pharmacy Professional"
              className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-60 transition-transform duration-700 group-hover:scale-105"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#030508] via-transparent to-transparent opacity-90" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#030508]/40 via-transparent to-transparent opacity-60" />

            {/* Top Right Label */}
            <div className="absolute top-6 right-6">
              <Badge variant="danger" icon={TriangleAlert}>High Risk</Badge>
            </div>

            {/* Content Overlay */}
            <div className="absolute inset-x-0 bottom-0 p-8 md:p-12 space-y-6">
              <div className="space-y-4 max-w-xl">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500" />
                  <h2 className="text-3xl md:text-5xl font-display font-bold leading-[1.1] text-white">
                    {slides[activeSlide].title}
                  </h2>
                </div>
                <p className="text-slate-300 text-lg leading-relaxed">
                  {slides[activeSlide].description}
                </p>
              </div>

              <CyberButton variant="outline" icon={ChevronRight} className="rounded-full px-8 border-red-500 text-red-500 hover:bg-red-500 hover:text-white glow-red hover:glow-red-strong">
                {slides[activeSlide].cta}
              </CyberButton>
            </div>
          </div>

          {/* Slider Controls */}
          {/* Left Arrow */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-black/80 border border-white/20 flex items-center justify-center text-white hover:border-red-500 hover:text-red-500 transition-all z-20 backdrop-blur-md"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Right Arrow */}
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-12 h-12 rounded-full bg-black/80 border border-white/20 flex items-center justify-center text-white hover:border-red-500 hover:text-red-500 transition-all z-20 backdrop-blur-md"
          >
            <ChevronRight size={24} />
          </button>

          {/* Pagination */}
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-3">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveSlide(i)}
                className={`h-1 transition-all duration-300 rounded-full ${activeSlide === i ? "w-12 bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]" : "w-6 bg-white/20 hover:bg-white/40"
                  }`}
              />
            ))}
          </div>
        </div>

        {/* Sidebar Info (Bottom Mobile / Side Desktop) */}
        <div className="lg:col-span-12 flex flex-wrap items-center justify-between gap-8 pt-12 border-t border-white/5 opacity-40 hover:opacity-100 transition-opacity">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Layers size={16} />
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Protocol v.392</span>
            </div>
            <div className="flex items-center gap-2">
              <Database size={16} />
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Data Integrity 100%</span>
            </div>
          </div>
          <div className="text-[10px] uppercase tracking-[0.2em] font-bold">
            © 2026 RISKPAS COMPLIANCE
          </div>
        </div>
      </main>

      {/* Decorative SVG Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.05]" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 100 Q 500 300 1000 100" stroke="white" fill="transparent" strokeWidth="0.5" />
        <path d="M100 0 Q 300 500 100 1000" stroke="white" fill="transparent" strokeWidth="0.5" />
      </svg>
    </div>
  );
};
