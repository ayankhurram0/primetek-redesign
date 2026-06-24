"use client";

import { useEffect, useLayoutEffect, useRef, useState, type ElementType } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "motion/react";
import {
  Rocket,
  Users,
  BarChart3,
  Globe2,
  Trophy,
  Sparkles,
  Building2,
  TrendingUp,
  Lightbulb,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const ACCENT = "#39ff14";

const milestones = [
  {
    year: "2020",
    title: "The Beginning",
    body: "PrimeTek was founded with a bold vision to transform pharmacy operations and protect independent pharmacy revenue.",
    icon: Rocket,
    pinIcon: Building2,
  },
  {
    year: "2021",
    title: "First Milestone",
    body: "Launched our platform and onboarded our first pharmacy partners across multiple states.",
    icon: Users,
    pinIcon: Users,
  },
  {
    year: "2022",
    title: "Expanding Impact",
    body: "Grew nationwide and strengthened our presence with deeper PBM intelligence capabilities.",
    icon: TrendingUp,
    pinIcon: BarChart3,
  },
  {
    year: "2023",
    title: "Product Innovation",
    body: "Introduced advanced analytics, reimbursement intelligence, and proactive compliance monitoring.",
    icon: Lightbulb,
    pinIcon: Globe2,
  },
  {
    year: "2024",
    title: "Scaling Excellence",
    body: "Expanded our team, partnerships, and capabilities to drive greater value for pharmacies.",
    icon: Globe2,
    pinIcon: Trophy,
  },
  {
    year: "2025+",
    title: "The Future Ahead",
    body: "Continuing to innovate and create lasting impact together with the pharmacies we serve.",
    icon: Sparkles,
    pinIcon: Sparkles,
  },
];

/** Centered serpentine path — nodes on the middle axis, curves bulge left/right */
const CENTER_X = 500;
const CURVE_BULGE = 130;

const NODE_POSITIONS = milestones.map((_, i) => ({
  x: CENTER_X,
  y: 90 + i * 180,
}));

const TIMELINE_PATH = (() => {
  const pts = NODE_POSITIONS;
  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 1; i < pts.length; i++) {
    const prev = pts[i - 1];
    const curr = pts[i];
    const midY = (prev.y + curr.y) / 2;
    const bulge = i % 2 === 1 ? CURVE_BULGE : -CURVE_BULGE;
    d += ` C ${prev.x + bulge} ${midY}, ${curr.x + bulge} ${midY}, ${curr.x} ${curr.y}`;
  }
  return d;
})();

function MapPinMarker({
  icon: Icon,
  active,
  reached,
  alignToLine = false,
}: {
  icon: ElementType;
  active: boolean;
  reached: boolean;
  alignToLine?: boolean;
}) {
  const lit = active || reached;

  return (
    <motion.div
      className="relative flex flex-col items-center"
      animate={
        alignToLine ? undefined : { y: lit ? [0, -6, 0] : [0, -3, 0] }
      }
      transition={{ duration: lit ? 3 : 4, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* Ripple rings */}
      {lit && (
        <>
          <motion.div
            className="absolute bottom-2 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full border pointer-events-none"
            style={{ borderColor: `${ACCENT}40` }}
            animate={{ scale: [1, 2.2], opacity: [0.5, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
          />
          <motion.div
            className="absolute bottom-2 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full border pointer-events-none"
            style={{ borderColor: `${ACCENT}30` }}
            animate={{ scale: [1, 2.8], opacity: [0.35, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut", delay: 0.8 }}
          />
        </>
      )}

      <div
        className="relative w-[88px] h-[110px] md:w-[100px] md:h-[120px] flex items-center justify-center transition-all duration-500"
        style={{
          filter: lit ? `drop-shadow(0 0 24px ${ACCENT})` : `drop-shadow(0 0 6px ${ACCENT}30)`,
          opacity: lit ? 1 : 0.5,
          transform: active ? "scale(1.06)" : "scale(1)",
        }}
      >
        <svg viewBox="0 0 100 120" className="w-full h-full" fill="none">
          <path
            d="M50 4 C30 4 16 20 16 40 C16 64 50 112 50 112 C50 112 84 64 84 40 C84 20 70 4 50 4 Z"
            fill={lit ? `${ACCENT}20` : `${ACCENT}08`}
            stroke={ACCENT}
            strokeWidth="2"
            strokeOpacity={lit ? 1 : 0.45}
          />
          <circle
            cx="50"
            cy="42"
            r="22"
            fill="rgba(0,0,0,0.4)"
            stroke={`${ACCENT}60`}
            strokeWidth="1.5"
            strokeOpacity={lit ? 1 : 0.35}
          />
        </svg>
        <Icon
          className="absolute top-[26px] md:top-[28px] w-7 h-7 md:w-8 md:h-8 transition-colors duration-500"
          style={{ color: lit ? ACCENT : `${ACCENT}70` }}
          strokeWidth={1.6}
        />
      </div>

      <div
        className="w-3 h-3 rounded-full -mt-1 z-10 transition-all duration-500"
        style={{
          backgroundColor: lit ? ACCENT : "transparent",
          border: `2px solid ${lit ? ACCENT : `${ACCENT}35`}`,
          boxShadow: lit ? `0 0 16px ${ACCENT}, 0 0 40px ${ACCENT}80` : "none",
        }}
      />
    </motion.div>
  );
}

function MilestoneCard({
  milestone,
  active,
}: {
  milestone: (typeof milestones)[0];
  active: boolean;
}) {
  const Icon = milestone.icon;

  return (
    <motion.div
      className={`group relative flex w-full max-w-[540px] min-h-[190px] md:min-h-[210px] rounded-[28px] border backdrop-blur-xl overflow-hidden transition-all duration-500 hover:-translate-y-1.5 ${active ? "opacity-100" : "opacity-55"
        }`}
      style={{
        background: "linear-gradient(145deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.03) 100%)",
        borderColor: active ? `${ACCENT}40` : `${ACCENT}15`,
        boxShadow: active
          ? `0 12px 48px rgba(0,0,0,0.35), 0 0 40px ${ACCENT}12, inset 0 1px 0 rgba(255,255,255,0.08)`
          : "0 8px 32px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.04)",
      }}
      whileHover={{
        borderColor: `${ACCENT}55`,
        boxShadow: `0 16px 56px rgba(0,0,0,0.4), 0 0 56px ${ACCENT}18`,
      }}
    >
      {/* Text */}
      <div className="flex-1 p-7 md:p-8 flex flex-col justify-center min-w-0">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xl md:text-2xl font-bold" style={{ color: ACCENT }}>
            {milestone.year}
          </span>
          <span className="h-px flex-1 max-w-[72px]" style={{ backgroundColor: `${ACCENT}55` }} />
        </div>
        <h3 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 leading-tight">
          {milestone.title}
        </h3>
        <p className="text-slate-300 text-base md:text-lg font-light leading-relaxed">
          {milestone.body}
        </p>
      </div>

      {/* Divider + icon */}
      <div
        className="hidden sm:flex flex-col items-center justify-center w-[88px] md:w-[100px] shrink-0 border-l"
        style={{ borderColor: `${ACCENT}20` }}
      >
        <div
          className="w-[60px] h-[60px] md:w-[68px] md:h-[68px] rounded-full border flex items-center justify-center transition-all duration-500 group-hover:scale-105"
          style={{
            borderColor: `${ACCENT}45`,
            backgroundColor: "rgba(0,0,0,0.35)",
            boxShadow: `0 0 28px ${ACCENT}20, inset 0 0 20px ${ACCENT}08`,
          }}
        >
          <Icon className="w-7 h-7 md:w-8 md:h-8" style={{ color: ACCENT }} strokeWidth={1.5} />
        </div>
      </div>
    </motion.div>
  );
}

export const Evolution = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [pathLength, setPathLength] = useState(0);
  const [activeNode, setActiveNode] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const [tipPos, setTipPos] = useState(NODE_POSITIONS[0]);

  const lineProgress = activeNode / (milestones.length - 1);
  const dashOffset = pathLength > 0 ? pathLength * (1 - lineProgress) : 0;

  useLayoutEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    const len = path.getTotalLength();
    setPathLength(len);
    const pt = path.getPointAtLength(len * lineProgress);
    setTipPos({ x: pt.x, y: pt.y });
  }, [lineProgress]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView) return;
    const timer = setTimeout(() => {
      setActiveNode((prev) => (prev >= milestones.length - 1 ? 0 : prev + 1));
    }, 2800);
    return () => clearTimeout(timer);
  }, [isInView, activeNode]);

  useEffect(() => {
    const path = pathRef.current;
    if (!path || pathLength === 0) return;
    const pt = path.getPointAtLength(pathLength * lineProgress);
    setTipPos({ x: pt.x, y: pt.y });
  }, [lineProgress, pathLength]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".evo-header > *", {
        opacity: 0,
        y: 32,
        duration: 1,
        stagger: 0.14,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 82%" },
      });

      gsap.utils.toArray<HTMLElement>(".evo-row").forEach((row, i) => {
        const cardOnLeft = i % 2 === 0;
        gsap.from(row, {
          opacity: 0,
          x: cardOnLeft ? -60 : 60,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: row, start: "top 85%" },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 md:py-36 lg:py-40 overflow-hidden bg-transparent">
      <div className="w-[90%] max-w-[1600px] mx-auto relative z-10">
        {/* Header */}
        <header className="evo-header text-center mb-20 md:mb-28">
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="h-px w-12 md:w-20" style={{ backgroundColor: `${ACCENT}50` }} />
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: ACCENT }} />
            <p
              className="text-xs md:text-sm font-bold uppercase tracking-[0.4em]"
              style={{ color: ACCENT }}
            >
              Our Journey
            </p>
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: ACCENT }} />
            <span className="h-px w-12 md:w-20" style={{ backgroundColor: `${ACCENT}50` }} />
          </div>

          <h2 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 leading-[1.05]">
            <span className="text-white">Company </span>
            <span
              className="bg-gradient-to-r from-white via-[#a3ff6e] to-[#39ff14] bg-clip-text text-transparent"
            >
              Timeline
            </span>
          </h2>
          <p className="text-slate-400 text-lg md:text-xl font-light max-w-xl mx-auto leading-relaxed">
            Milestones that shaped our growth and success
          </p>
        </header>

        {/* Serpentine timeline */}
        <div className="evo-timeline relative">
          {/* Map pins anchored to path nodes (desktop) */}
          <div className="absolute inset-0 pointer-events-none hidden lg:block z-10">
            {milestones.map((milestone, idx) => {
              const PinIcon = milestone.pinIcon;
              const isActive = activeNode === idx;
              const isReached = idx <= activeNode;
              const node = NODE_POSITIONS[idx];

              return (
                <div
                  key={`pin-${milestone.year}`}
                  className="absolute pointer-events-auto"
                  style={{
                    left: `${(node.x / 1000) * 100}%`,
                    top: `${(node.y / 1080) * 100}%`,
                    transform: "translate(-50%, calc(-100% + 6px))",
                  }}
                >
                  <MapPinMarker
                    icon={PinIcon}
                    active={isActive}
                    reached={isReached && !isActive}
                    alignToLine
                  />
                </div>
              );
            })}
          </div>

          {/* Full-width SVG path */}
          <div className="absolute inset-0 pointer-events-none hidden lg:block">
            <svg
              viewBox="0 0 1000 1080"
              preserveAspectRatio="none"
              className="w-full h-full overflow-visible"
              aria-hidden
            >
              <defs>
                <filter id="evo-glow" x="-60%" y="-5%" width="220%" height="110%">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <linearGradient id="evo-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={ACCENT} stopOpacity="0.6" />
                  <stop offset="50%" stopColor={ACCENT} stopOpacity="1" />
                  <stop offset="100%" stopColor={ACCENT} stopOpacity="0.75" />
                </linearGradient>
              </defs>

              <path
                d={TIMELINE_PATH}
                fill="none"
                stroke={`${ACCENT}10`}
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              <path
                ref={pathRef}
                d={TIMELINE_PATH}
                fill="none"
                stroke="url(#evo-grad)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#evo-glow)"
                strokeDasharray={pathLength || undefined}
                strokeDashoffset={dashOffset}
                style={{ transition: "stroke-dashoffset 1.4s cubic-bezier(0.4, 0, 0.2, 1)" }}
              />

              {pathLength > 0 && (
                <motion.circle
                  r="6"
                  fill={ACCENT}
                  animate={{ cx: tipPos.x, cy: tipPos.y }}
                  transition={{ duration: 1.4, ease: [0.4, 0, 0.2, 1] }}
                  style={{ filter: `drop-shadow(0 0 12px ${ACCENT})` }}
                />
              )}
            </svg>
          </div>

          <div className="space-y-28 md:space-y-32 lg:space-y-36">
            {milestones.map((milestone, idx) => {
              const cardOnLeft = idx % 2 === 0;
              const PinIcon = milestone.pinIcon;
              const isActive = activeNode === idx;
              const isReached = idx <= activeNode;

              return (
                <div key={milestone.year} className="evo-row relative min-h-[200px] md:min-h-[220px]">
                  {/* Desktop — cards on outer edges, line + pins in center */}
                  <div className="hidden lg:grid grid-cols-[1fr_100px_1fr] xl:grid-cols-[1fr_120px_1fr] items-center gap-x-8 xl:gap-x-12">
                    {cardOnLeft ? (
                      <>
                        <div className="flex justify-start min-w-0 pr-2 xl:pr-4">
                          <MilestoneCard milestone={milestone} active={isReached} />
                        </div>
                        <div aria-hidden />
                        <div aria-hidden />
                      </>
                    ) : (
                      <>
                        <div aria-hidden />
                        <div aria-hidden />
                        <div className="flex justify-end min-w-0 pl-2 xl:pl-4">
                          <MilestoneCard milestone={milestone} active={isReached} />
                        </div>
                      </>
                    )}
                  </div>

                  {/* Tablet — slightly narrower cards */}
                  <div className="hidden md:grid lg:hidden grid-cols-1 gap-8 items-center">
                    <div className="flex justify-center">
                      <MapPinMarker
                        icon={PinIcon}
                        active={isActive}
                        reached={isReached && !isActive}
                      />
                    </div>
                    <div className="flex justify-center px-4">
                      <MilestoneCard milestone={milestone} active={isReached} />
                    </div>
                  </div>

                  {/* Mobile */}
                  <div className="md:hidden flex flex-col items-center gap-8">
                    <MapPinMarker
                      icon={PinIcon}
                      active={isActive}
                      reached={isReached && !isActive}
                    />
                    <div className="w-full px-2">
                      <MilestoneCard milestone={milestone} active={isReached} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
