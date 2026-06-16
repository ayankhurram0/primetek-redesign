"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import {
  Calendar,
  Database,
  Globe,
  TrendingUp,
  Rocket,
  BarChart3,
  Users,
  Brain,
  Shield,
  ChevronRight,
} from "lucide-react";

import mtfCard from "@/src/assets/mtf_card.png";
import gapsCard from "@/src/assets/gaps_card.png";
import operationalChart from "@/src/assets/operational_analysis_chart.png";
import service2 from "@/src/assets/service2.png";
import service5 from "@/src/assets/service5.png";

gsap.registerPlugin(ScrollTrigger);

interface Milestone {
  year: string;
  title: string;
  body: string;
  image: typeof mtfCard | null;
  icon: React.FC<{ className?: string }>;
  side: "left" | "right" | "top";
  // angle in degrees on the orbit circle (0 = top, clockwise)
  angle: number;
  iconBg: string;
}

const milestones: Milestone[] = [
  {
    year: "2020",
    title: "The Beginning",
    body: "PrimeTek was founded with a vision to solve the operational challenges of independent pharmacies.",
    image: null,
    icon: Rocket,
    side: "top",
    angle: 0,
    iconBg: "bg-teal-500/20 border-teal-400/30 text-teal-400",
  },
  {
    year: "2021",
    title: "First Milestone",
    body: "Launched our core platform helping pharmacies streamline operations and ensure compliance.",
    image: mtfCard,
    icon: BarChart3,
    side: "right",
    angle: 60,
    iconBg: "bg-blue-500/20 border-blue-400/30 text-blue-400",
  },
  {
    year: "2022",
    title: "Expanding Impact",
    body: "Expanded our reach to multiple states and onboarded hundreds of independent pharmacies.",
    image: gapsCard,
    icon: Users,
    side: "right",
    angle: 120,
    iconBg: "bg-cyan-500/20 border-cyan-400/30 text-cyan-400",
  },
  {
    year: "2023",
    title: "Product Innovation",
    body: "Introduced advanced analytics, reimbursement intelligence, and proactive risk alerts.",
    image: operationalChart,
    icon: Brain,
    side: "right",
    angle: 180,
    iconBg: "bg-emerald-500/20 border-emerald-400/30 text-emerald-400",
  },
  {
    year: "2024",
    title: "Scaling Excellence",
    body: "Strengthened our platform, partnerships, and team to drive greater value.",
    image: service2,
    icon: Shield,
    side: "left",
    angle: 240,
    iconBg: "bg-teal-500/20 border-teal-400/30 text-teal-400",
  },
  {
    year: "2025+",
    title: "The Future Ahead",
    body: "Continuing our mission to empower pharmacies with smarter technology and unmatched support.",
    image: service5,
    icon: ChevronRight,
    side: "left",
    angle: 300,
    iconBg: "bg-indigo-500/20 border-indigo-400/30 text-indigo-400",
  },
];

// Converts angle (deg, 0=top, clockwise) + radius to SVG/CSS coords (x,y in %)
// Center is 50,50
function polarToPercent(angleDeg: number, radiusPct: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: 50 + radiusPct * Math.cos(rad),
    y: 50 + radiusPct * Math.sin(rad),
  };
}

const ORBIT_RADIUS = 40; // % of container

export const Evolution = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const [activeYear, setActiveYear] = useState<string>("2020");
  const [maxRevealedIdx, setMaxRevealedIdx] = useState<number>(0);
  const [isHovered, setIsHovered] = useState(false);

  const [isInView, setIsInView] = useState(false);

  /* ── Intersection Observer to start autoplay when in view ── */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.4 } // Trigger when 40% of the section is visible
    );
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  /* ── Update max revealed index ── */
  useEffect(() => {
    const idx = milestones.findIndex((m) => m.year === activeYear);
    if (idx > maxRevealedIdx) {
      setMaxRevealedIdx(idx);
    }
  }, [activeYear, maxRevealedIdx]);

  /* ── Autoplay ── */
  useEffect(() => {
    // Only run if the section has been seen and is not hovered
    if (!isInView || isHovered) return;

    const currentIdx = milestones.findIndex((m) => m.year === activeYear);
    
    // Stop at the last dot
    if (currentIdx === milestones.length - 1) return;

    const id = setTimeout(() => {
      setActiveYear(milestones[currentIdx + 1].year);
    }, 3000);

    return () => clearTimeout(id);
  }, [isInView, isHovered, activeYear]);

  /* ── GSAP entry animations ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".evo-left", {
        opacity: 0, x: -40, duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: containerRef.current, start: "top 80%" },
      });
      gsap.from(".orbit-ring", {
        scale: 0.7, opacity: 0, duration: 1.4, stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: { trigger: orbitRef.current, start: "top 75%" },
      });
      gsap.from(".stat-box", {
        y: 24, opacity: 0, duration: 0.7, stagger: 0.07,
        ease: "power2.out",
        scrollTrigger: { trigger: ".stats-bar", start: "top 90%" },
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const active = milestones.find((m) => m.year === activeYear)!;
  const Icon = active.icon;

  const leftMilestones = milestones.filter((m) => m.side === "left");
  const rightMilestones = milestones.filter((m) => m.side === "right");
  const topMilestone = milestones.find((m) => m.side === "top");

  return (
    <section
      ref={containerRef}
      className="py-24 px-4 md:px-10 lg:px-16 relative overflow-hidden bg-transparent"
    >
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-teal-500/5 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10">

        {/* ══ TOP META STRIP ══ */}
        <div className="flex items-center justify-between mb-12 border-b border-white/5 pb-4">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
            <span className="text-teal-400 font-bold uppercase tracking-[0.25em] text-xs">Our Journey</span>
          </div>
          <div className="hidden md:block text-[10px] font-bold tracking-[0.3em] uppercase text-slate-500 border-l border-r border-white/10 px-6 py-1">
            Chronology of Company Development
          </div>
          <div className="hidden md:flex items-center gap-2 bg-white/5 border border-white/5 px-4 py-1.5 rounded-full">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500" />
            </span>
            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Building the Future of Pharmacy Ops</span>
          </div>
        </div>

        {/* ══ MAIN 3-COLUMN LAYOUT ══ */}
        {/* Left text | Orbital | Right info card */}
        <div className="grid lg:grid-cols-[300px_1fr_360px] xl:grid-cols-[340px_1fr_400px] gap-8 xl:gap-12 items-center">

          {/* ── COL 1: Intro Text ── */}
          <div className="evo-left flex flex-col justify-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white uppercase tracking-tight leading-[1.05] mb-5 font-display">
              The Evolution <br />
              of <span className="text-teal-400">PrimeTek</span>
            </h2>
            <p className="text-sm md:text-base text-slate-400 font-light leading-relaxed mb-8">
              A journey of innovation, resilience, and relentless focus on empowering independent pharmacies.
            </p>

            {/* Milestone list — acts as a stepper nav */}
            <div className="space-y-1">
              {milestones.map((m, idx) => {
                const MIcon = m.icon;
                const isAct = m.year === activeYear;
                const isRevealed = idx <= maxRevealedIdx;
                return (
                  <button
                    key={m.year}
                    onClick={() => { setActiveYear(m.year); setIsHovered(true); }}
                    onMouseLeave={() => setIsHovered(false)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-500 group ${
                      isAct
                        ? "bg-teal-500/10 border border-teal-500/30"
                        : "hover:bg-white/5 border border-transparent"
                    } ${isRevealed ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"}`}
                  >
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center border shrink-0 transition-all duration-300 ${
                      isAct ? m.iconBg : "bg-white/5 border-white/10 text-slate-500"
                    }`}>
                      <MIcon className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className={`text-[11px] font-mono font-bold transition-colors duration-300 ${isAct ? "text-teal-400" : "text-slate-500 group-hover:text-slate-400"}`}>
                        {m.year}
                      </div>
                      <div className={`text-xs font-bold uppercase tracking-tight leading-none truncate transition-colors duration-300 ${isAct ? "text-white" : "text-slate-500 group-hover:text-slate-300"}`}>
                        {m.title}
                      </div>
                    </div>
                    {/* Active progress bar */}
                    {isAct && (
                      <div className="w-1 h-5 rounded-full bg-teal-400 shrink-0 animate-pulse" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Watch Story CTA */}
            <button className="group mt-8 flex items-center gap-3 text-white font-semibold uppercase tracking-wider text-xs bg-white/5 border border-white/10 hover:border-teal-500/50 hover:bg-teal-500/5 px-5 py-3 rounded-full w-fit transition-all duration-300">
              <span className="w-7 h-7 rounded-full bg-teal-400/10 text-teal-400 flex items-center justify-center group-hover:bg-teal-400 group-hover:text-black transition-all duration-300">
                <svg className="w-3 h-3 fill-current ml-0.5" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
              Watch Our Story
            </button>
          </div>

          {/* ── COL 2: Orbital Diagram ── */}
          <div
            ref={orbitRef}
            className="relative flex items-center justify-center"
            style={{ height: "660px" }}
          >
            {/* Orbital rings */}
            <div className="orbit-ring absolute rounded-full border border-dashed border-teal-500/15 animate-[spin_120s_linear_infinite]"
              style={{ width: "88%", height: "88%", maxWidth: 520, maxHeight: 520 }} />
            <div className="orbit-ring absolute rounded-full border border-teal-500/10 animate-[spin_70s_linear_infinite_reverse]"
              style={{ width: "62%", height: "62%", maxWidth: 360, maxHeight: 360 }} />
            <div className="orbit-ring absolute rounded-full border border-dashed border-teal-500/6 animate-[spin_40s_linear_infinite]"
              style={{ width: "38%", height: "38%", maxWidth: 220, maxHeight: 220 }} />

            {/* Center badge */}
            <div className="absolute z-10 w-32 h-32 rounded-full bg-[#02070f] border border-teal-500/40 flex items-center justify-center shadow-[0_0_50px_rgba(20,184,166,0.25)]">
              <div className="absolute inset-1 rounded-full bg-gradient-to-br from-teal-500/10 via-transparent to-teal-400/5" />
              <svg className="w-14 h-14 text-teal-400 relative z-10 drop-shadow-[0_0_10px_rgba(20,184,166,0.7)]" viewBox="0 0 100 100" fill="none">
                <path d="M20 20 H55 C70 20 80 32 80 50 C80 68 70 80 55 80 H45 V55 H55 C62 55 65 53 65 50 C65 47 62 45 55 45 H45 V80 H20 V20 Z" fill="currentColor" opacity="0.9"/>
                <path d="M20 50 H40 V55 H20 Z" fill="currentColor" opacity="0.5"/>
              </svg>
            </div>

            {/* Orbit nodes — positioned by polar coords */}
            {milestones.map((m, idx) => {
              const coords = polarToPercent(m.angle, ORBIT_RADIUS);
              const isAct = m.year === activeYear;
              const isRevealed = idx <= maxRevealedIdx;
              return (
                <div
                  key={m.year}
                  className={`orbit-node absolute z-20 flex flex-col items-center cursor-pointer group transition-all duration-700 ${
                    isRevealed ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-50 pointer-events-none"
                  }`}
                  style={{
                    left: `${coords.x}%`,
                    top: `${coords.y}%`,
                    transform: "translate(-50%, -50%)"
                  }}
                  onClick={() => { setActiveYear(m.year); setIsHovered(true); }}
                  onMouseEnter={() => { setActiveYear(m.year); setIsHovered(true); }}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  {/* Outer pulse rings — double layer for prominence */}
                  {isAct && (
                    <>
                      <span className="absolute w-12 h-12 rounded-full border border-teal-400/30 animate-ping opacity-50" />
                      <span className="absolute w-9 h-9 rounded-full border border-teal-400/50 animate-pulse opacity-70" />
                    </>
                  )}
                  {/* Outer halo ring always visible */}
                  <div className={`absolute w-9 h-9 rounded-full border transition-all duration-300 ${
                    isAct ? "border-teal-400/60 scale-100" : "border-white/10 group-hover:border-teal-500/40"
                  }`} />
                  {/* Node dot */}
                  <div className={`w-7 h-7 rounded-full border-2 transition-all duration-300 flex items-center justify-center ${
                    isAct
                      ? "bg-teal-400 border-teal-300 scale-110 shadow-[0_0_20px_rgba(20,184,166,0.8),0_0_40px_rgba(20,184,166,0.3)]"
                      : "bg-[#020817] border-teal-500/70 shadow-[0_0_10px_rgba(20,184,166,0.3)] group-hover:border-teal-400 group-hover:bg-teal-500/10 group-hover:scale-110 group-hover:shadow-[0_0_16px_rgba(20,184,166,0.5)]"
                  }`}>
                    {/* Inner bright core */}
                    <div className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      isAct ? "bg-white" : "bg-teal-500/50 group-hover:bg-teal-400"
                    }`} />
                  </div>
                  {/* Year pill */}
                  <div className={`mt-2 px-2 py-0.5 rounded text-[11px] font-bold font-mono whitespace-nowrap transition-all duration-300 ${
                    isAct ? "text-teal-400" : "text-slate-500 group-hover:text-teal-500"
                  }`}>
                    {m.year}
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── COL 3: Active Card Detail ── */}
          <div className="relative">
            {milestones.map((m) => {
              const isAct = m.year === activeYear;
              const CardIcon = m.icon;
              return (
                <div
                  key={m.year}
                  className={`absolute inset-0 flex flex-col gap-4 transition-all duration-500 ${
                    isAct ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"
                  }`}
                >
                  {/* Image preview */}
                  <div className="relative w-full rounded-xl overflow-hidden border border-white/10 bg-[#020817]/80" style={{ height: 220 }}>
                    {m.image ? (
                      <Image
                        src={m.image}
                        alt={m.title}
                        fill
                        className="object-cover opacity-70"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-teal-500/5">
                        <Rocket className="w-12 h-12 text-teal-400/70" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020817]/60 to-transparent" />
                    {/* Corner Accent */}
                    <div className="absolute top-0 right-0 w-2 h-2 bg-teal-400" />
                  </div>

                  {/* Text card */}
                  <div className="bg-[#020817]/60 backdrop-blur-xl border border-white/5 p-5 rounded-xl shadow-2xl">
                    <div className="flex items-center gap-2 mb-3">
                      <div className={`w-7 h-7 rounded-md flex items-center justify-center border ${m.iconBg}`}>
                        <CardIcon className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-teal-400 font-bold text-sm font-mono tracking-wider">{m.year}</span>
                    </div>
                    <h4 className="text-white font-bold text-base uppercase tracking-tight mb-2 font-display">
                      {m.title}
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed font-light">
                      {m.body}
                    </p>
                  </div>

                  {/* Step indicator pills */}
                  <div className="flex items-center gap-1.5 justify-center pt-1">
                    {milestones.map((dot) => (
                      <div
                        key={dot.year}
                        onClick={() => { setActiveYear(dot.year); setIsHovered(true); }}
                        className={`cursor-pointer rounded-full transition-all duration-300 ${
                          dot.year === activeYear
                            ? "w-5 h-1.5 bg-teal-400"
                            : "w-1.5 h-1.5 bg-white/20 hover:bg-white/40"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              );
            })}

            {/* Spacer to give the absolute children a height reference */}
            <div className="invisible" style={{ height: 360 }}>
              <div style={{ height: 220 }} />
              <div className="p-5">
                <div className="h-7 mb-3" />
                <div className="h-5 mb-2" />
                <div className="h-10" />
              </div>
            </div>
          </div>
        </div>

        {/* ══ BOTTOM STATS BAR ══ */}
        <div className="stats-bar mt-16 w-full px-6 py-5 rounded-2xl border border-white/5 bg-[#02070f]/50 backdrop-blur-xl grid grid-cols-2 md:grid-cols-5 gap-4 items-center shadow-[0_12px_40px_rgba(0,0,0,0.2)]">

          <div className="stat-box flex items-center gap-3 md:border-r border-white/5 md:pr-4">
            <div className="w-9 h-9 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 shrink-0">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <div className="text-white font-black text-lg leading-none">5+</div>
              <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-0.5">Years of Innovation</div>
            </div>
          </div>

          <div className="stat-box flex items-center gap-3 md:border-r border-white/5 md:pr-4">
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
              <Database className="w-4 h-4" />
            </div>
            <div>
              <div className="text-white font-black text-lg leading-none">0 → 1000+</div>
              <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-0.5">Pharmacies Empowered</div>
            </div>
          </div>

          <div className="stat-box flex items-center gap-3 md:border-r border-white/5 md:pr-4">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
              <Globe className="w-4 h-4" />
            </div>
            <div>
              <div className="text-white font-black text-lg leading-none">Multi-State</div>
              <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-0.5">National Presence</div>
            </div>
          </div>

          <div className="stat-box flex items-center gap-3 md:border-r border-white/5 md:pr-4">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <div className="text-white font-black text-lg leading-none">Continuous</div>
              <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-0.5">Growth & Impact</div>
            </div>
          </div>

          <div className="stat-box flex items-center gap-3 col-span-2 md:col-span-1 justify-center md:justify-start">
            <div className="relative flex h-3.5 w-3.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-teal-500" />
            </div>
            <div>
              <div className="text-slate-400 font-light text-xs">And this is just</div>
              <div className="text-teal-400 font-bold text-xs uppercase tracking-wider">the beginning.</div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
