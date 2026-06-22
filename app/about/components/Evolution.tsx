"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const VIEW_W = 1000;
const VIEW_H = 650;
const LABEL_Y = 520;

const WAVE_PATH =
  "M 24 150 C 80 10, 140 80, 200 240 C 260 400, 320 420, 380 200 C 440 20, 500 50, 560 300 C 620 480, 680 500, 740 220 C 800 10, 860 30, 940 180";

const FUTURE_X = 940;
const FUTURE_Y = 180;

const MILESTONE_FRACTIONS = [0.06, 0.25, 0.44, 0.63, 0.82];

const milestones = [
  {
    year: "2020",
    title: "The Beginning",
    body: "PrimeTek was founded with a bold vision to transform pharmacy operations.",
  },
  {
    year: "2021",
    title: "First Milestone",
    body: "Launched our platform and onboarded our first pharmacy partners.",
  },
  {
    year: "2022",
    title: "Expanding Impact",
    body: "Grew to new states and strengthened our presence nationwide.",
  },
  {
    year: "2023",
    title: "Product Innovation",
    body: "Introduced advanced analytics and reimbursement intelligence tools.",
  },
  {
    year: "2024",
    title: "Scaling Excellence",
    body: "Expanded our team, partnerships, and capabilities to drive greater value.",
  },
];

const future = {
  year: "2025+",
  title: "The Future Ahead",
  body: "Continuing to innovate and create lasting impact together.",
};

const STEPS = [...milestones, future];

type PathPoint = { x: number; y: number };

function samplePath(path: SVGPathElement) {
  const length = path.getTotalLength();
  const dots = MILESTONE_FRACTIONS.map((f) => {
    const pt = path.getPointAtLength(length * f);
    return { x: pt.x, y: pt.y };
  });
  const end = path.getPointAtLength(length);
  return { length, dots, futurePt: { x: end.x, y: end.y } };
}

export const Evolution = () => {
  const containerRef = useRef<HTMLElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [pathLength, setPathLength] = useState(0);
  const [dotPositions, setDotPositions] = useState<PathPoint[]>([]);
  const [futurePos, setFuturePos] = useState<PathPoint>({ x: FUTURE_X, y: FUTURE_Y });
  const [activeIdx, setActiveIdx] = useState(0);
  const [isInView, setIsInView] = useState(false);

  const measurePath = () => {
    const path = pathRef.current;
    if (!path) return;
    const { length, dots, futurePt } = samplePath(path);
    setPathLength(length);
    setDotPositions(dots);
    setFuturePos(futurePt);
  };

  useLayoutEffect(() => {
    measurePath();
    window.addEventListener("resize", measurePath);
    return () => window.removeEventListener("resize", measurePath);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsInView(true); },
      { threshold: 0.25 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView) return;
    const id = setTimeout(() => {
      setActiveIdx((prev) => (prev >= STEPS.length - 1 ? 0 : prev + 1));
    }, 3000);
    return () => clearTimeout(id);
  }, [isInView, activeIdx]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".evo-header", {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: containerRef.current, start: "top 80%" },
      });
      gsap.from(".evo-timeline", {
        opacity: 0,
        y: 40,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: { trigger: containerRef.current, start: "top 75%" },
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const lineProgress = pathLength > 0 ? activeIdx / (STEPS.length - 1) : 0;
  const dashOffset = pathLength * (1 - lineProgress);

  const selectStep = (idx: number) => {
    setActiveIdx(idx);
  };

  return (
    <section
      ref={containerRef}
      className="py-24 md:py-36 px-4 md:px-10 lg:px-16 relative overflow-hidden bg-transparent"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 right-0 w-[600px] h-[400px] bg-teal-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(260px,340px)_1fr] gap-10 lg:gap-14 items-start">

          <div className="evo-header">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-teal-400 font-mono text-sm font-bold tracking-widest">03</span>
              <span className="h-px w-10 bg-teal-500/40" />
            </div>
            <p className="text-teal-400 text-[11px] font-bold uppercase tracking-[0.35em] mb-4">
              Our Path Forward
            </p>
            <h2 className="text-4xl md:text-5xl xl:text-[3.25rem] font-display font-bold text-white leading-[1.08] tracking-tight mb-5">
              Milestones That Define Our Impact
            </h2>
            <p className="text-slate-400 text-sm md:text-base font-light leading-relaxed max-w-sm">
              Each step forward reflects our commitment to excellence and the pharmacies we serve.
            </p>
          </div>

          <div
            className="evo-timeline w-full hidden lg:block"
          >
            <svg
              viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
              className="w-full h-auto overflow-visible"
              role="img"
              aria-label="Company milestones timeline"
            >
              <defs>
                <filter id="evo-glow" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="3.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <linearGradient id="evo-line-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#2dd4bf" stopOpacity="1" />
                </linearGradient>
              </defs>

              {/* Track */}
              <path
                d={WAVE_PATH}
                fill="none"
                stroke="#14b8a6"
                strokeWidth="1.5"
                strokeOpacity="0.12"
                strokeLinecap="round"
              />

              {/* Animated line */}
              <path
                ref={pathRef}
                d={WAVE_PATH}
                fill="none"
                stroke="url(#evo-line-grad)"
                strokeWidth="3"
                strokeLinecap="round"
                filter="url(#evo-glow)"
                strokeDasharray={pathLength || undefined}
                strokeDashoffset={dashOffset}
                style={{ transition: "stroke-dashoffset 2.8s cubic-bezier(0.4, 0, 0.2, 1)" }}
              />

              {/* Connectors + labels */}
              {dotPositions.map((pt, idx) => {
                const m = milestones[idx];
                const isActive = activeIdx === idx;
                const isVisible = idx <= activeIdx;
                if (!m) return null;

                return (
                  <g key={m.year}>
                    <line
                      x1={pt.x}
                      y1={pt.y + 9}
                      x2={pt.x}
                      y2={LABEL_Y - 4}
                      stroke="#14b8a6"
                      strokeWidth="1"
                      strokeOpacity={isVisible ? 0.35 : 0.12}
                    />

                    <g
                      className="cursor-pointer"
                      onClick={() => selectStep(idx)}
                      onMouseEnter={() => selectStep(idx)}
                    >
                      {isActive && (
                        <circle cx={pt.x} cy={pt.y} r="16" fill="#14b8a6" fillOpacity="0.18" />
                      )}
                      <circle
                        cx={pt.x}
                        cy={pt.y}
                        r={isActive ? 8 : 6}
                        fill={isActive ? "#2dd4bf" : "#0f766e"}
                        stroke="#5eead4"
                        strokeWidth="1.8"
                        opacity={isVisible ? 1 : 0.45}
                      />
                      {isActive && <circle cx={pt.x} cy={pt.y} r="2.5" fill="white" />}
                    </g>

                    <foreignObject
                      x={pt.x - 72}
                      y={LABEL_Y}
                      width={144}
                      height={150}
                      className="overflow-visible pointer-events-none"
                    >
                      <div
                        xmlns="http://www.w3.org/1999/xhtml"
                        className={`text-center transition-opacity duration-500 pointer-events-auto cursor-pointer ${isVisible ? "opacity-100" : "opacity-35"}`}
                        onClick={() => selectStep(idx)}
                        onMouseEnter={() => selectStep(idx)}
                      >
                        <p className={`text-[11px] font-mono font-bold mb-1 ${isActive ? "text-teal-400" : "text-teal-500/70"}`}>
                          {m.year}
                        </p>
                        <p className={`text-[11px] font-bold uppercase tracking-tight leading-tight mb-1.5 ${isActive ? "text-white" : "text-slate-300"}`}>
                          {m.title}
                        </p>
                        <p className="text-[10px] text-slate-500 leading-relaxed">
                          {m.body}
                        </p>
                      </div>
                    </foreignObject>
                  </g>
                );
              })}

              {/* Future hub */}
              <g
                className="cursor-pointer"
                onClick={() => selectStep(STEPS.length - 1)}
                onMouseEnter={() => selectStep(STEPS.length - 1)}
              >
                {[62, 50, 38].map((r, i) => (
                  <circle
                    key={r}
                    cx={futurePos.x}
                    cy={futurePos.y}
                    r={r}
                    fill="none"
                    stroke="#14b8a6"
                    strokeWidth="1"
                    strokeOpacity={0.1 + i * 0.07}
                  />
                ))}
                <circle
                  cx={futurePos.x}
                  cy={futurePos.y}
                  r={activeIdx === STEPS.length - 1 ? 30 : 24}
                  fill="#020817"
                  stroke="#14b8a6"
                  strokeWidth="1.5"
                  strokeOpacity={activeIdx === STEPS.length - 1 ? 0.75 : 0.35}
                />
                {activeIdx === STEPS.length - 1 && (
                  <circle
                    cx={futurePos.x}
                    cy={futurePos.y}
                    r="36"
                    fill="none"
                    stroke="#2dd4bf"
                    strokeWidth="1.5"
                    strokeOpacity="0.45"
                  />
                )}

                <foreignObject
                  x={futurePos.x - 80}
                  y={futurePos.y + 50}
                  width={160}
                  height={150}
                  className="overflow-visible pointer-events-none"
                >
                  <div
                    xmlns="http://www.w3.org/1999/xhtml"
                    className={`text-center pointer-events-auto transition-opacity duration-500 ${activeIdx >= milestones.length ? "opacity-100" : "opacity-50"}`}
                    onClick={() => selectStep(STEPS.length - 1)}
                    onMouseEnter={() => selectStep(STEPS.length - 1)}
                  >
                    <p className="text-teal-400 text-[11px] font-mono font-bold mb-1">{future.year}</p>
                    <p className="text-white text-[11px] font-bold uppercase tracking-tight mb-1 leading-tight">
                      {future.title}
                    </p>
                    <p className="text-[9px] text-slate-400 leading-relaxed px-1 mb-2">
                      {future.body}
                    </p>
                    <div className="flex justify-center">
                      <div className="w-7 h-7 rounded-full border border-teal-500/30 flex items-center justify-center text-teal-400 mx-auto">
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                </foreignObject>
              </g>
            </svg>
          </div>
        </div>

        {/* Mobile */}
        <div className="lg:hidden mt-10 space-y-4 border-t border-white/5 pt-8">
          {[...milestones, future].map((m, idx) => (
            <button
              key={m.year}
              type="button"
              onClick={() => setActiveIdx(idx)}
              className={`w-full text-left p-4 rounded-xl border transition-all duration-300 ${
                activeIdx === idx
                  ? "border-teal-500/40 bg-teal-500/5"
                  : "border-white/8 bg-white/[0.02]"
              }`}
            >
              <p className="text-teal-400 text-xs font-mono font-bold mb-1">{m.year}</p>
              <h4 className="text-white font-bold text-sm uppercase tracking-tight mb-1">{m.title}</h4>
              <p className="text-slate-400 text-xs leading-relaxed">{m.body}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
