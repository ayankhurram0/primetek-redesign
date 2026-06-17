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

/* ── Constants ─────────────────────────────────── */
const ORBIT_R = 190; // px — orbit radius
const CY = 48;       // % — vertical center of orbit inside container

/* ── Data ───────────────────────────────────────── */
const milestones = [
  {
    year: "2020", angle: 0,
    title: "The Beginning",
    body: "PrimeTek was founded with a vision to solve the operational challenges of independent pharmacies.",
    image: null,
    icon: Rocket,
    iconBg: "bg-teal-500/20 border-teal-400/30 text-teal-400",
    yearColor: "text-teal-400",
  },
  {
    year: "2021", angle: 60,
    title: "First Milestone",
    body: "Launched our core platform helping pharmacies streamline operations and ensure compliance.",
    image: mtfCard,
    icon: BarChart3,
    iconBg: "bg-blue-500/20 border-blue-400/30 text-blue-400",
    yearColor: "text-blue-400",
  },
  {
    year: "2022", angle: 120,
    title: "Expanding Impact",
    body: "Expanded our reach to multiple states and onboarded hundreds of independent pharmacies.",
    image: gapsCard,
    icon: Users,
    iconBg: "bg-cyan-500/20 border-cyan-400/30 text-cyan-400",
    yearColor: "text-cyan-400",
  },
  {
    year: "2023", angle: 180,
    title: "Product Innovation",
    body: "Introduced advanced analytics, reimbursement intelligence, and proactive risk alerts.",
    image: operationalChart,
    icon: Brain,
    iconBg: "bg-emerald-500/20 border-emerald-400/30 text-emerald-400",
    yearColor: "text-emerald-400",
  },
  {
    year: "2024", angle: 240,
    title: "Scaling Excellence",
    body: "Strengthened our platform, partnerships, and team to drive greater value.",
    image: service2,
    icon: Shield,
    iconBg: "bg-teal-500/20 border-teal-400/30 text-teal-400",
    yearColor: "text-teal-400",
  },
  {
    year: "2025+", angle: 300,
    title: "The Future Ahead",
    body: "Continuing our mission to empower pharmacies with smarter technology and unmatched support.",
    image: service5,
    icon: ChevronRight,
    iconBg: "bg-indigo-500/20 border-indigo-400/30 text-indigo-400",
    yearColor: "text-indigo-400",
  },
];

function nodeCoords(angle: number) {
  const rad = ((angle - 90) * Math.PI) / 180;
  return { dx: ORBIT_R * Math.cos(rad), dy: ORBIT_R * Math.sin(rad) };
}

/* ─────────────────────────────────────────────── */
export const Evolution = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeYear, setActiveYear] = useState("2020");
  const [maxRevealedIdx, setMaxRevealedIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isInView, setIsInView] = useState(false);

  /* ── Intersection → start autoplay ── */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsInView(true); },
      { threshold: 0.3 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  /* ── Track max revealed ── */
  useEffect(() => {
    const idx = milestones.findIndex((m) => m.year === activeYear);
    if (idx > maxRevealedIdx) setMaxRevealedIdx(idx);
  }, [activeYear, maxRevealedIdx]);

  /* ── Autoplay ── */
  useEffect(() => {
    if (!isInView || isHovered) return;
    const currentIdx = milestones.findIndex((m) => m.year === activeYear);
    if (currentIdx === milestones.length - 1) return;
    const id = setTimeout(() => setActiveYear(milestones[currentIdx + 1].year), 3000);
    return () => clearTimeout(id);
  }, [isInView, isHovered, activeYear]);

  /* ── GSAP entry animations ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".evo-left", {
        opacity: 0, x: -40, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: containerRef.current, start: "top 80%" },
      });
      gsap.from(".evo-orbital", {
        opacity: 0, scale: 0.92, duration: 1.3, ease: "power2.out",
        scrollTrigger: { trigger: containerRef.current, start: "top 75%" },
      });
      gsap.from(".stat-box", {
        y: 24, opacity: 0, duration: 0.7, stagger: 0.07, ease: "power2.out",
        scrollTrigger: { trigger: ".stats-bar", start: "top 90%" },
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="py-24 px-4 md:px-10 lg:px-16 relative overflow-hidden bg-transparent"
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-teal-500/4 rounded-full blur-[160px]" />
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

        {/* ══ MAIN: LEFT TEXT + RIGHT ORBITAL MAP ══ */}
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] xl:grid-cols-[340px_1fr] gap-8 items-center">

          {/* ── Left: Text column ── */}
          <div className="evo-left flex flex-col">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1] mb-5 font-display">
              The Evolution of <br />
              <span className="text-teal-400">PrimeTek</span>
            </h2>
            <p className="text-sm md:text-base text-slate-400 font-light leading-relaxed mb-8">
              A journey of innovation, resilience, and relentless focus on empowering independent pharmacies.
            </p>

            {/* Watch Story CTA */}
            <button className="group flex items-center gap-3 text-white font-semibold uppercase tracking-wider text-xs bg-white/5 border border-white/10 hover:border-teal-500/50 hover:bg-teal-500/5 px-5 py-3 rounded-full w-fit transition-all duration-300">
              <span className="w-7 h-7 rounded-full bg-teal-400/10 text-teal-400 flex items-center justify-center group-hover:bg-teal-400 group-hover:text-black transition-all duration-300">
                <svg className="w-3 h-3 fill-current ml-0.5" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
              Watch Our Story
            </button>
          </div>

          {/* ── Right: Orbital map (desktop only) ── */}
          <div className="evo-orbital relative hidden lg:block" style={{ height: 720 }}>

            {/* Orbit rings */}
            <div
              className="absolute rounded-full border border-dashed border-teal-500/15 animate-[spin_120s_linear_infinite]"
              style={{ width: 480, height: 480, left: "50%", top: `${CY}%`, transform: "translate(-50%, -50%)" }}
            />
            <div
              className="absolute rounded-full border border-teal-500/10 animate-[spin_70s_linear_infinite_reverse]"
              style={{ width: 340, height: 340, left: "50%", top: `${CY}%`, transform: "translate(-50%, -50%)" }}
            />
            <div
              className="absolute rounded-full border border-dashed border-teal-500/6 animate-[spin_40s_linear_infinite]"
              style={{ width: 210, height: 210, left: "50%", top: `${CY}%`, transform: "translate(-50%, -50%)" }}
            />

            {/* Center badge */}
            <div
              className="absolute z-10 w-28 h-28 rounded-full bg-[#02070f] border border-teal-500/40 flex items-center justify-center shadow-[0_0_50px_rgba(20,184,166,0.25)]"
              style={{ left: "50%", top: `${CY}%`, transform: "translate(-50%, -50%)" }}
            >
              <div className="absolute inset-1 rounded-full bg-gradient-to-br from-teal-500/10 via-transparent to-teal-400/5" />
              <svg className="w-12 h-12 text-teal-400 relative z-10 drop-shadow-[0_0_10px_rgba(20,184,166,0.7)]" viewBox="0 0 100 100" fill="none">
                <path d="M20 20 H55 C70 20 80 32 80 50 C80 68 70 80 55 80 H45 V55 H55 C62 55 65 53 65 50 C65 47 62 45 55 45 H45 V80 H20 V20 Z" fill="currentColor" opacity="0.9" />
                <path d="M20 50 H40 V55 H20 Z" fill="currentColor" opacity="0.5" />
              </svg>
            </div>

            {/* ── Orbit nodes + milestone cards ── */}
            {milestones.map((m, idx) => {
              const { dx, dy } = nodeCoords(m.angle);
              const isActive = m.year === activeYear;
              const isRevealed = idx <= maxRevealedIdx;
              const Icon = m.icon;

              const isTop = m.angle === 0;
              const isLeftSide = m.angle > 180; // 240°, 300°
              const isRightSide = !isTop && !isLeftSide; // 60°, 120°, 180°

              const GAP = 20; // px gap between node edge and card

              /* Card absolute position */
              let cardStyle: React.CSSProperties;
              if (isTop) {
                cardStyle = {
                  left: `calc(50% + ${dx}px)`,
                  top: `calc(${CY}% + ${dy - GAP}px)`,
                  transform: "translate(-50%, -100%)",
                  width: 210,
                };
              } else if (isRightSide) {
                cardStyle = {
                  left: `calc(50% + ${dx + GAP}px)`,
                  top: `calc(${CY}% + ${dy}px)`,
                  transform: "translateY(-50%)",
                  width: m.image ? 250 : 210,
                };
              } else {
                // left side
                cardStyle = {
                  left: `calc(50% + ${dx - GAP}px)`,
                  top: `calc(${CY}% + ${dy}px)`,
                  transform: "translate(-100%, -50%)",
                  width: m.image ? 250 : 210,
                };
              }

              return (
                <div key={m.year}>

                  {/* ── Node dot ── */}
                  <div
                    className={`absolute z-20 flex items-center justify-center cursor-pointer transition-all duration-700 ${
                      isRevealed ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-50 pointer-events-none"
                    }`}
                    style={{
                      left: `calc(50% + ${dx}px)`,
                      top: `calc(${CY}% + ${dy}px)`,
                      transform: "translate(-50%, -50%)",
                      width: 28, height: 28,
                    }}
                    onClick={() => { setActiveYear(m.year); setIsHovered(true); }}
                    onMouseEnter={() => { setActiveYear(m.year); setIsHovered(true); }}
                    onMouseLeave={() => setIsHovered(false)}
                  >
                    {/* Pulse rings on active */}
                    {isActive && (
                      <>
                        <span
                          className="absolute rounded-full border border-teal-400/30 animate-ping opacity-50"
                          style={{ width: 48, height: 48, top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
                        />
                        <span
                          className="absolute rounded-full border border-teal-400/50 animate-pulse opacity-70"
                          style={{ width: 36, height: 36, top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
                        />
                      </>
                    )}
                    {/* Outer halo ring */}
                    <div
                      className={`absolute rounded-full border transition-all duration-300 ${isActive ? "border-teal-400/60" : "border-white/10"}`}
                      style={{ width: 36, height: 36, top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
                    />
                    {/* Core dot */}
                    <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                      isActive
                        ? "bg-teal-400 border-teal-300 scale-110 shadow-[0_0_20px_rgba(20,184,166,0.8),0_0_40px_rgba(20,184,166,0.3)]"
                        : "bg-[#020817] border-teal-500/70 shadow-[0_0_10px_rgba(20,184,166,0.3)] hover:border-teal-400 hover:scale-110"
                    }`}>
                      <div className={`w-2.5 h-2.5 rounded-full ${isActive ? "bg-white" : "bg-teal-500/50"}`} />
                    </div>
                  </div>

                  {/* ── Milestone card ── */}
                  <div
                    className={`absolute z-30 transition-all duration-500 cursor-pointer ${
                      isRevealed ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                    }`}
                    style={{ ...cardStyle, position: "absolute" }}
                    onClick={() => { setActiveYear(m.year); setIsHovered(true); }}
                    onMouseLeave={() => setIsHovered(false)}
                  >
                    <div
                      className={`flex flex-row rounded-xl border overflow-hidden transition-all duration-300 ${
                        isActive
                          ? "border-teal-500/40 bg-[#020817]/95 shadow-[0_0_24px_rgba(20,184,166,0.2)]"
                          : "border-white/10 bg-[#020817]/80 hover:border-white/20"
                      }`}
                      style={{ minHeight: 110 }}
                    >
                      {/* Left image (left-side cards) */}
                      {isLeftSide && m.image && (
                        <div className="relative shrink-0 overflow-hidden" style={{ width: 90, minHeight: 110 }}>
                          <Image src={m.image} alt={m.title} fill className="object-cover opacity-60" />
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#020817]/70" />
                          <div className={`absolute bottom-2 right-2 w-6 h-6 rounded border flex items-center justify-center ${m.iconBg}`}>
                            <Icon className="w-3 h-3" />
                          </div>
                        </div>
                      )}

                      {/* Text content */}
                      <div className="flex flex-col justify-center p-3 flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 mb-2">
                          <div className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 ${m.iconBg}`}>
                            <Icon className="w-2.5 h-2.5" />
                          </div>
                          <span className={`text-[10px] font-mono font-bold ${m.yearColor}`}>{m.year}</span>
                        </div>
                        <h4 className="text-white font-bold text-[11px] uppercase tracking-tight leading-tight mb-1.5 font-display">
                          {m.title}
                        </h4>
                        <p className="text-[10px] text-slate-400 leading-relaxed">{m.body}</p>
                      </div>

                      {/* Right image (right-side & top cards) */}
                      {isRightSide && m.image && (
                        <div className="relative shrink-0 overflow-hidden" style={{ width: 90, minHeight: 110 }}>
                          <Image src={m.image} alt={m.title} fill className="object-cover opacity-60" />
                          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#020817]/70" />
                          <div className={`absolute bottom-2 left-2 w-6 h-6 rounded border flex items-center justify-center ${m.iconBg}`}>
                            <Icon className="w-3 h-3" />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile fallback: simple list */}
          <div className="lg:hidden space-y-4 mt-4">
            {milestones.map((m) => {
              const Icon = m.icon;
              return (
                <div key={m.year} className="flex items-start gap-3 bg-white/4 border border-white/8 rounded-xl p-4">
                  <div className={`w-8 h-8 rounded-lg border flex items-center justify-center shrink-0 ${m.iconBg}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className={`text-[11px] font-mono font-bold mb-0.5 ${m.yearColor}`}>{m.year}</div>
                    <div className="text-white font-bold text-sm uppercase tracking-tight mb-1 font-display">{m.title}</div>
                    <p className="text-xs text-slate-400 leading-relaxed">{m.body}</p>
                  </div>
                </div>
              );
            })}
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
