"use client";

import React, { useState, useEffect, type ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  FileText,
  ShieldCheck,
  RotateCcw,
  Users,
  BarChart3,
  Target,
} from "lucide-react";
import styles from "./TestingSection.module.css";

const ACCENTS = {
  blue: { accent: "#2A6DFA", deep: "#0D204A" },
  teal: { accent: "#149E9E", deep: "#0A6B6C" },
  orange: { accent: "#F28D35", deep: "#B45C10" },
  royal: { accent: "#3B6CF4", deep: "#1D4ED8" },
  green: { accent: "#149E5D", deep: "#00703C" },
} as const;

type ServiceCardShellProps = {
  step: string;
  title: string;
  description: string;
  badge: string;
  accent: string;
  accentDeep: string;
  icon: ReactNode;
  metric: string;
  metricLabel: string;
  cta: string;
  href: string;
  children: ReactNode;
};

function ServiceCardShell({
  step,
  title,
  description,
  badge,
  accent,
  accentDeep,
  icon,
  metric,
  metricLabel,
  cta,
  href,
  children,
}: ServiceCardShellProps) {
  return (
    <article
      className={styles.card}
      style={
        {
          "--accent": accent,
          "--accent-deep": accentDeep,
        } as React.CSSProperties
      }
    >
      <div className={styles.ribbon} aria-hidden />
      <div className={styles.numberBadge}>{step}</div>
      <div className={styles.iconDisc}>{icon}</div>
      <div className={styles.main}>
        <div className={styles.cardHead}>
          <h3 className={styles.cardTitle}>{title}</h3>
          <div className={styles.statusPill}>
            <span className={styles.statusDot} />
            {badge}
          </div>
        </div>
        <p className={styles.cardDescription}>{description}</p>
        <div className={styles.graphicSlot}>{children}</div>
      </div>
      <div className={styles.metricBar}>
        <div className={styles.metricCopy}>
          <span className={styles.metricValue}>{metric}</span>
          <span className={styles.metricLabel}>{metricLabel}</span>
        </div>
        <a href={href} className={styles.cta}>
          {cta}
          <span className={styles.ctaArrow}>→</span>
        </a>
      </div>
    </article>
  );
}

// ==========================================
// 1. REVENUE INTELLIGENCE
// ==========================================

interface DataPoint {
  x: number;
  y: number;
}

const REVENUE_DATA_SETS: Record<string, DataPoint[]> = {
  reimbursements: [
    { x: 30, y: 110 },
    { x: 80, y: 55 },
    { x: 130, y: 75 },
    { x: 180, y: 40 },
    { x: 230, y: 85 },
    { x: 280, y: 45 },
    { x: 330, y: 35 },
  ],
  underpayments: [
    { x: 30, y: 40 },
    { x: 80, y: 85 },
    { x: 130, y: 50 },
    { x: 180, y: 95 },
    { x: 230, y: 60 },
    { x: 280, y: 110 },
    { x: 330, y: 90 },
  ],
  cashflow: [
    { x: 30, y: 90 },
    { x: 80, y: 100 },
    { x: 130, y: 60 },
    { x: 180, y: 70 },
    { x: 230, y: 45 },
    { x: 280, y: 35 },
    { x: 330, y: 25 },
  ],
};

const REVENUE_DATA_KEYS = ["reimbursements", "underpayments", "cashflow"];
const BLUE = ACCENTS.blue.accent;

function RevenueIntelligenceCard() {
  const [activeSet, setActiveSet] = useState<string>("reimbursements");
  const [hoveredPointId, setHoveredPointId] = useState<number | null>(null);

  const points = REVENUE_DATA_SETS[activeSet];

  useEffect(() => {
    const interval = setInterval(() => {
      if (hoveredPointId === null) {
        setActiveSet((current) => {
          const currentIndex = REVENUE_DATA_KEYS.indexOf(current);
          const nextIndex = (currentIndex + 1) % REVENUE_DATA_KEYS.length;
          return REVENUE_DATA_KEYS[nextIndex];
        });
      }
    }, 6000);
    return () => clearInterval(interval);
  }, [hoveredPointId]);

  const getCurvedPath = (pts: DataPoint[]) => {
    if (pts.length < 2) return "";
    let d = `M ${pts[0].x},${pts[0].y}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i];
      const p1 = pts[i + 1];
      const cpX1 = p0.x + (p1.x - p0.x) / 2;
      const cpY1 = p0.y;
      const cpX2 = p0.x + (p1.x - p0.x) / 2;
      const cpY2 = p1.y;
      d += ` C ${cpX1},${cpY1} ${cpX2},${cpY2} ${p1.x},${p1.y}`;
    }
    return d;
  };

  const curveD = getCurvedPath(points);

  return (
    <ServiceCardShell
      step="01"
      title="Revenue Intelligence & Reporting"
      description="Real-time revenue tracking that flags underpayments and recovers lost income automatically."
      badge="Live Tracking"
      accent={ACCENTS.blue.accent}
      accentDeep={ACCENTS.blue.deep}
      icon={<Target className="h-9 w-9" strokeWidth={1.6} />}
      metric="$1.2M+"
      metricLabel="avg. underpayments recovered per store."
      cta="Analyze Revenue"
      href="#analyze"
    >
      <div
        className={`${styles.graphicPanel} border-[#bfdbfe] bg-[#eff6ff]`}
      >
        <motion.div
          className="pointer-events-none absolute top-0 bottom-0 z-10 w-[1.5px] bg-gradient-to-b from-transparent via-[#2A6DFA]/55 to-transparent"
          animate={{ x: ["30px", "330px", "30px"] }}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        />

        <div className="relative mt-0 flex h-full w-full flex-1 items-center justify-center">
          <div className="pointer-events-none absolute inset-0 flex flex-col justify-between px-4 py-4 opacity-20">
            <div className="w-full border-b border-dashed border-[#2A6DFA]" />
            <div className="w-full border-b border-dashed border-[#2A6DFA]" />
            <div className="w-full border-b border-dashed border-[#2A6DFA]" />
          </div>

          <svg className="h-full w-full overflow-visible" viewBox="0 0 350 110" fill="none" preserveAspectRatio="xMidYMid meet">
            <defs>
              <linearGradient id="blueCurveGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={BLUE} stopOpacity="0.18" />
                <stop offset="100%" stopColor="transparent" stopOpacity="0" />
              </linearGradient>
            </defs>

            <motion.path
              d={`${curveD} L 330,110 L 30,110 Z`}
              fill="url(#blueCurveGrad)"
              initial={false}
              animate={{ d: `${curveD} L 330,110 L 30,110 Z` }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />

            <motion.path
              d={curveD}
              fill="none"
              stroke={BLUE}
              strokeWidth="4"
              strokeLinecap="round"
              className="drop-shadow-[0_0_8px_rgba(43,76,140,0.35)]"
              initial={false}
              animate={{ d: curveD }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />

            {points.map((pt, idx) => (
              <g key={idx}>
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r="12"
                  className="cursor-pointer fill-transparent"
                  onMouseEnter={() => setHoveredPointId(idx)}
                  onMouseLeave={() => setHoveredPointId(null)}
                />

                {(hoveredPointId === idx ||
                  (hoveredPointId === null && idx === points.length - 1)) && (
                  <>
                    <motion.circle
                      cx={pt.x}
                      cy={pt.y}
                      r="9"
                      fill={BLUE}
                      className="opacity-75"
                      animate={{ scale: [1, 2], opacity: [0.6, 0] }}
                      transition={{
                        repeat: Infinity,
                        duration: 1.2,
                        ease: "easeOut",
                      }}
                    />
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r="5"
                      fill="white"
                      stroke={BLUE}
                      strokeWidth="3.5"
                    />
                  </>
                )}
              </g>
            ))}
          </svg>

          <div className="absolute bottom-1 right-2 z-10 flex items-center gap-1.5 rounded-lg border border-ink/10 bg-white/80 px-2.5 py-1 font-mono text-[8px] font-bold text-ink backdrop-blur-md">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#2A6DFA]" />
            <span>Live Leakage: $1.2M+</span>
          </div>
        </div>
      </div>
    </ServiceCardShell>
  );
}

// ==========================================
// 2. COMPLIANCE & AUDIT
// ==========================================

const TEAL = ACCENTS.teal.accent;

function ComplianceAuditCard() {
  const [activeStage, setActiveStage] = useState<number>(1);

  const stages = [
    { id: 0, title: "Audit Deficit" },
    { id: 1, title: "Risk Mitigated" },
    { id: 2, title: "Protected" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStage((prev) => (prev + 1) % stages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <ServiceCardShell
      step="02"
      title="Compliance & Audit Protection"
      description="Stay permanently audit-ready by detecting compliance gaps before they become liabilities."
      badge="Risk Scanner Active"
      accent={ACCENTS.teal.accent}
      accentDeep={ACCENTS.teal.deep}
      icon={<ShieldCheck className="h-9 w-9" strokeWidth={1.6} />}
      metric="87%"
      metricLabel="achieve full compliance within 30 days."
      cta="Check Audit Risk"
      href="#audits"
    >
      <div
        className={`${styles.graphicPanel} border-[#9adede] bg-[#eefbfb]`}
      >
        <motion.div
          className="pointer-events-none absolute inset-x-0 h-10 bg-gradient-to-b from-transparent via-[#149E9E]/12 to-transparent"
          animate={{ y: [-40, 180] }}
          transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
        />

        <div className="relative flex h-full w-full flex-1 items-center justify-center px-2">
          <div className="relative z-10 flex w-full max-w-full items-center justify-between gap-6 px-4 sm:gap-8 sm:px-5">
            <div className="absolute top-[22px] left-[52px] right-[52px] h-[2.5px] -translate-y-1/2 bg-[#149E9E]/15" />
            <motion.div
              className="absolute top-[22px] left-[52px] h-[2.5px] origin-left -translate-y-1/2 bg-[#149E9E]"
              style={{ right: "52px" }}
              initial={false}
              animate={{
                scaleX: activeStage === 0 ? 0 : activeStage === 1 ? 0.5 : 1,
              }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />

            {[
              { label: "Gap Scan", stage: 0 },
              { label: "Audit Ready", stage: 1 },
              { label: "Safe", stage: 2 },
            ].map(({ label, stage }) => {
              const isActive = activeStage === stage;
              const isDone = activeStage > stage;
              return (
                <div
                  key={stage}
                  onClick={() => setActiveStage(stage)}
                  className="group/node relative flex min-w-0 flex-1 cursor-pointer flex-col items-center gap-2.5"
                >
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold transition-all duration-300 ${
                      isActive
                        ? "scale-110 border-[#149E9E] bg-white font-mono text-[#149E9E] shadow-[0_0_15px_rgba(20,158,158,0.3)]"
                        : isDone
                          ? "border-[#149E9E] bg-white text-[#149E9E]"
                          : "border-ink/10 bg-white text-ink-subtle"
                    }`}
                  >
                    {isDone || (stage === 2 && isActive) ? (
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke={TEAL}
                        strokeWidth="3"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    ) : (
                      <span className="font-mono">
                        {String(stage + 1).padStart(2, "0")}
                      </span>
                    )}
                  </div>
                  <span
                    className={`text-center text-[8.5px] font-bold uppercase tracking-wider transition-colors duration-300 ${
                      isActive ? "text-[#149E9E]" : "text-ink-subtle"
                    }`}
                  >
                    {label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </ServiceCardShell>
  );
}

// ==========================================
// 3. CLAIMS & REIMBURSEMENT
// ==========================================

const ORANGE = ACCENTS.orange.accent;

function ClaimsReimbursementCard() {
  const [activeRouteIndex, setActiveRouteIndex] = useState<number>(0);
  const [isRouting, setIsRouting] = useState<boolean>(false);
  const [routeStatus, setRouteStatus] = useState<string>("Approved");

  const endpoints = [
    { label: "PBM Auto-Match", status: "Success" },
    { label: "COB Validation", status: "Auto-Fixed" },
    { label: "NPI Resolution", status: "Matched" },
  ];

  const handleTriggerRoute = (index: number) => {
    if (isRouting) return;
    setActiveRouteIndex(index);
    setIsRouting(true);
    setTimeout(() => {
      setIsRouting(false);
      setRouteStatus(endpoints[index].status);
    }, 1200);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isRouting) {
        const nextIdx = (activeRouteIndex + 1) % endpoints.length;
        handleTriggerRoute(nextIdx);
      }
    }, 5000);
    return () => clearInterval(timer);
  }, [activeRouteIndex, isRouting]);

  const routePath =
    activeRouteIndex === 0
      ? "M50 50 L120 50 Q162 35 215 20"
      : activeRouteIndex === 1
        ? "M50 50 L120 50 L215 50"
        : "M50 50 L120 50 Q162 65 215 80";

  return (
    <ServiceCardShell
      step="03"
      title="Claims & Reimbursement Optimization"
      description="Automatically fix claim errors and maximize clean-claim reimbursement flow."
      badge="Auto-Route"
      accent={ACCENTS.orange.accent}
      accentDeep={ACCENTS.orange.deep}
      icon={<FileText className="h-9 w-9" strokeWidth={1.6} />}
      metric="19%"
      metricLabel="increase in clean-claim recovery rates."
      cta="Fix My Claims"
      href="#claims"
    >
      <div
        className={`${styles.graphicPanel} border-[#fdba74] bg-[#fff7ed]`}
      >
        <div className="relative mt-0 flex h-full w-full flex-1 items-center justify-center">
          <svg className="h-full w-full overflow-visible" viewBox="0 0 320 100" fill="none" preserveAspectRatio="xMidYMid meet">
            <path
              d="M50 50 L120 50"
              stroke="rgba(242,141,53,0.15)"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
            <path
              d="M120 50 L215 20"
              stroke="rgba(242,141,53,0.15)"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
            <path
              d="M120 50 L215 50"
              stroke="rgba(242,141,53,0.15)"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
            <path
              d="M120 50 L215 80"
              stroke="rgba(242,141,53,0.15)"
              strokeWidth="2"
              strokeDasharray="4 4"
            />

            <motion.path
              d={routePath}
              stroke={ORANGE}
              strokeWidth="3.5"
              strokeLinecap="round"
              className="drop-shadow-[0_0_6px_rgba(242,141,53,0.45)]"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              key={activeRouteIndex}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />

            {isRouting && (
              <motion.circle
                r="4"
                fill={ORANGE}
                animate={{ offsetDistance: ["0%", "100%"] }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                style={{ motionPath: `path('${routePath}')` }}
              />
            )}

            <g
              className="cursor-pointer"
              onClick={() => handleTriggerRoute((activeRouteIndex + 1) % 3)}
            >
              <circle
                cx="50"
                cy="50"
                r="14"
                fill="rgba(242,141,53,0.06)"
                stroke="rgba(242,141,53,0.2)"
                strokeWidth="1.5"
              />
              <motion.circle
                cx="50"
                cy="50"
                r="11"
                fill="transparent"
                stroke={ORANGE}
                strokeWidth="1"
                animate={{ scale: [1, 1.4], opacity: [0.6, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeOut" }}
              />
              <circle cx="50" cy="50" r="5" fill={ORANGE} />
            </g>

            <g>
              <circle
                cx="120"
                cy="50"
                r="18"
                fill="rgba(242,141,53,0.1)"
                stroke={ORANGE}
                strokeWidth="2"
                className="drop-shadow-[0_0_6px_rgba(242,141,53,0.3)]"
              />
              <motion.circle
                cx="120"
                cy="50"
                r="18"
                fill="transparent"
                stroke={ORANGE}
                strokeWidth="1"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              />
              <circle cx="120" cy="50" r="8" fill={ORANGE} />
            </g>

            {endpoints.map((item, idx) => {
              const isTarget = idx === activeRouteIndex;
              const nodeY = idx === 0 ? 20 : idx === 1 ? 50 : 80;
              return (
                <g
                  key={idx}
                  className="cursor-pointer font-mono"
                  onClick={() => handleTriggerRoute(idx)}
                >
                  <circle
                    cx="215"
                    cy={nodeY}
                    r={isTarget ? "12" : "10"}
                    fill={
                      isTarget
                        ? "rgba(242,141,53,0.14)"
                        : "rgba(242,141,53,0.04)"
                    }
                    stroke={isTarget ? ORANGE : "rgba(242,141,53,0.25)"}
                    strokeWidth="1.5"
                    className="transition-colors duration-200"
                  />
                  <circle
                    cx="215"
                    cy={nodeY}
                    r={isTarget ? "5.5" : "4"}
                    fill={isTarget ? ORANGE : "rgba(242,141,53,0.35)"}
                    className="transition-colors duration-200"
                  />
                  <text
                    x="234"
                    y={nodeY + 3}
                    fill={isTarget ? "#0f172a" : "#94a3b8"}
                    fontSize="7.5"
                    fontWeight="bold"
                    className="select-none font-bold"
                  >
                    {item.label}
                  </text>
                </g>
              );
            })}
          </svg>

          <div className="absolute bottom-1 left-2 max-w-[140px]">
            <span className="block text-[7.5px] font-mono uppercase leading-none text-gray-500">
              Pipe Status:
            </span>
            <span className="mt-0.5 inline-block animate-pulse text-[8px] font-mono font-bold uppercase text-[#F28D35]">
              {isRouting ? "processing..." : routeStatus}
            </span>
          </div>
        </div>
      </div>
    </ServiceCardShell>
  );
}

// ==========================================
// 4. PATIENT & OPERATIONAL
// ==========================================

interface QueueItem {
  initials: string;
  name: string;
  detail: string;
  defaultStatus: string;
}

const OPERATIONS_QUEUE: QueueItem[] = [
  {
    initials: "SJ",
    name: "Prior authorization audit complete",
    detail:
      "Automated audit of prior authorization forms resolved 4 pending clinical exceptions.",
    defaultStatus: "In Review",
  },
  {
    initials: "DM",
    name: "Daily reconciliation complete",
    detail:
      "Daily inventory reconciliation completed. 12 prescription bottlenecks automatically resolved & batch-routed to fulfillment.",
    defaultStatus: "In Review",
  },
  {
    initials: "ER",
    name: "Pharmacy onboarding logs audited",
    detail:
      "Client pharmacy onboarding logs fully audited. Compliance checks updated to active-state.",
    defaultStatus: "In Review",
  },
];

function PatientOperationalCard() {
  const [notifications, setNotifications] = useState<number[]>([0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setNotifications((prev) => {
        const next = (prev[0] + 1) % OPERATIONS_QUEUE.length;
        return [next, ...prev].slice(0, 3);
      });
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <ServiceCardShell
      step="04"
      title="Patient & Operational Support Systems"
      description="Streamline every pharmacy workflow from patient onboarding to team coordination."
      badge="Sync"
      accent={ACCENTS.royal.accent}
      accentDeep={ACCENTS.royal.deep}
      icon={<Users className="h-9 w-9" strokeWidth={1.6} />}
      metric="30%"
      metricLabel="reduction in bottlenecks."
      cta="Improve Operations"
      href="#operations"
    >
      <div
        className={`${styles.graphicPanel} border-[#bfdbfe] bg-[#eff6ff]`}
      >
        <div className="relative flex h-full w-full items-center justify-center">
          <div className="relative h-full w-full" style={{ maxHeight: "100%" }}>
            <AnimatePresence>
              {notifications.map((itemIndex, stackPos) => {
                const item = OPERATIONS_QUEUE[itemIndex];
                const isTop = stackPos === 0;
                return (
                  <motion.div
                    key={itemIndex}
                    initial={{ opacity: 0, y: -40, scale: 1 }}
                    animate={{
                      opacity: isTop ? 1 : stackPos === 1 ? 0.6 : 0.35,
                      y: stackPos * 8,
                      scale: 1 - stackPos * 0.04,
                    }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    style={{
                      zIndex: 10 - stackPos,
                      position: "absolute",
                      left: 0,
                      right: 0,
                      top: 0,
                      width: "100%",
                    }}
                    className="flex flex-col gap-1 rounded-[12px] border border-blue-300/40 bg-[#3B6CF4] p-2 shadow-2xl"
                  >
                    <div className="flex items-center justify-between px-0.5">
                      <div className="flex items-center gap-2">
                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-black">
                          <RotateCcw className="h-3.5 w-3.5 text-white" />
                        </div>
                        <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-white">
                          SYSTEM · {item.initials}
                        </span>
                      </div>
                      <span className="text-[9px] font-medium text-white">
                        {isTop ? "now" : `${stackPos * 2}m ago`}
                      </span>
                    </div>

                    <div className="mt-0.5 flex flex-col px-0.5 text-left">
                      <span className="line-clamp-1 text-[11px] font-bold leading-tight text-white">
                        {item.name}
                      </span>
                      <span className="mt-0.5 line-clamp-1 text-[10px] leading-normal text-white/90">
                        {item.detail}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </ServiceCardShell>
  );
}

// ==========================================
// 5. PHARMACY GROWTH
// ==========================================

const GREEN = ACCENTS.green.accent;

function PharmacyGrowthCard() {
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);
  const [, setTargetMargin] = useState<number>(85);

  useEffect(() => {
    let index = 0;
    const dialVals = [25, 45, 60, 75, 85];
    const interval = setInterval(() => {
      if (hoveredBar === null) {
        setHoveredBar(index);
        setTargetMargin(dialVals[index]);
        index = (index + 1) % 5;
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [hoveredBar]);

  return (
    <ServiceCardShell
      step="05"
      title="Pharmacy Growth & Performance Strategy"
      description="Optimize procurement pricing and sourcing to grow your pharmacy's total margins."
      badge="Growth Scale"
      accent={ACCENTS.green.accent}
      accentDeep={ACCENTS.green.deep}
      icon={<BarChart3 className="h-9 w-9" strokeWidth={1.6} />}
      metric="+18%"
      metricLabel="margin amplification across departments."
      cta="Grow My Pharmacy"
      href="#growth"
    >
      <div
        className={`${styles.graphicPanel} border-[#86efac] bg-[#ecfdf5]`}
      >
        <svg
          className="h-full w-full overflow-visible"
          viewBox="0 0 500 130"
          fill="none"
          preserveAspectRatio="xMidYMid meet"
        >
          <line
            x1="20"
            y1="110"
            x2="480"
            y2="110"
            stroke="rgba(20,158,93,0.2)"
            strokeWidth="1"
          />

          <motion.rect
            x="35"
            width="55"
            rx="6"
            fill={GREEN}
            className="cursor-pointer drop-shadow-[0_0_8px_rgba(20,158,93,0.3)]"
            animate={{ y: [110, 110, 80, 80, 110], height: [0, 0, 30, 30, 0] }}
            transition={{
              duration: 5,
              ease: "easeInOut",
              repeat: Infinity,
              times: [0, 0.05, 0.25, 0.75, 1],
              delay: 0,
            }}
          />
          <motion.rect
            x="130"
            width="55"
            rx="6"
            fill={GREEN}
            className="cursor-pointer drop-shadow-[0_0_8px_rgba(20,158,93,0.3)]"
            animate={{ y: [110, 110, 65, 65, 110], height: [0, 0, 45, 45, 0] }}
            transition={{
              duration: 5,
              ease: "easeInOut",
              repeat: Infinity,
              times: [0, 0.05, 0.3, 0.75, 1],
              delay: 0.12,
            }}
          />
          <motion.rect
            x="225"
            width="55"
            rx="6"
            fill={GREEN}
            className="cursor-pointer drop-shadow-[0_0_8px_rgba(20,158,93,0.3)]"
            animate={{ y: [110, 110, 75, 75, 110], height: [0, 0, 35, 35, 0] }}
            transition={{
              duration: 5,
              ease: "easeInOut",
              repeat: Infinity,
              times: [0, 0.05, 0.35, 0.75, 1],
              delay: 0.22,
            }}
          />
          <motion.rect
            x="320"
            width="55"
            rx="6"
            fill={GREEN}
            className="cursor-pointer drop-shadow-[0_0_8px_rgba(20,158,93,0.3)]"
            animate={{ y: [110, 110, 55, 55, 110], height: [0, 0, 55, 55, 0] }}
            transition={{
              duration: 5,
              ease: "easeInOut",
              repeat: Infinity,
              times: [0, 0.05, 0.4, 0.75, 1],
              delay: 0.32,
            }}
          />
          <motion.rect
            x="415"
            width="55"
            rx="6"
            fill={GREEN}
            className="cursor-pointer drop-shadow-[0_0_8px_rgba(20,158,93,0.3)]"
            animate={{ y: [110, 110, 38, 38, 110], height: [0, 0, 72, 72, 0] }}
            transition={{
              duration: 5,
              ease: "easeInOut",
              repeat: Infinity,
              times: [0, 0.05, 0.45, 0.75, 1],
              delay: 0.42,
            }}
          />

          <text
            x="62.5"
            y="126"
            fill="rgba(100,116,139,0.7)"
            fontSize="10.5"
            fontWeight="bold"
            textAnchor="middle"
            fontFamily="Montserrat, sans-serif"
          >
            M1
          </text>
          <text
            x="157.5"
            y="126"
            fill="rgba(100,116,139,0.7)"
            fontSize="10.5"
            fontWeight="bold"
            textAnchor="middle"
            fontFamily="Montserrat, sans-serif"
          >
            M2
          </text>
          <text
            x="252.5"
            y="126"
            fill="rgba(100,116,139,0.7)"
            fontSize="10.5"
            fontWeight="bold"
            textAnchor="middle"
            fontFamily="Montserrat, sans-serif"
          >
            M3
          </text>
          <text
            x="347.5"
            y="126"
            fill="rgba(100,116,139,0.7)"
            fontSize="10.5"
            fontWeight="bold"
            textAnchor="middle"
            fontFamily="Montserrat, sans-serif"
          >
            M4
          </text>
          <text
            x="442.5"
            y="126"
            fill={GREEN}
            fontSize="10.5"
            fontWeight="bold"
            textAnchor="middle"
            fontFamily="Montserrat, sans-serif"
          >
            M5
          </text>

          <motion.g
            animate={{ y: [0, -3, 0] }}
            transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
          >
            <motion.path
              d="M 62.5 70 L 157.5 52 L 252.5 62 L 347.5 42 L 442.5 26"
              stroke={GREEN}
              strokeWidth="3.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="drop-shadow-[0_0_6px_rgba(20,158,93,0.4)]"
              animate={{ pathLength: [0, 1, 1, 0], opacity: [0, 1, 1, 0] }}
              transition={{
                duration: 5,
                ease: "easeInOut",
                repeat: Infinity,
                times: [0, 0.45, 0.75, 1],
              }}
            />

            <motion.circle
              cx="157.5"
              cy="52"
              r="4.5"
              fill={GREEN}
              stroke={GREEN}
              strokeWidth="1"
              className="drop-shadow-[0_0_6px_rgba(20,158,93,0.4)]"
              animate={{ scale: [0, 0, 1, 1, 0], opacity: [0, 0, 1, 1, 0] }}
              style={{ transformOrigin: "157.5px 52px" }}
              transition={{
                duration: 5,
                ease: "easeInOut",
                repeat: Infinity,
                times: [0, 0.28, 0.45, 0.75, 1],
              }}
            />
            <motion.circle
              cx="252.5"
              cy="62"
              r="4.5"
              fill={GREEN}
              stroke={GREEN}
              strokeWidth="1"
              className="drop-shadow-[0_0_6px_rgba(20,158,93,0.4)]"
              animate={{ scale: [0, 0, 1, 1, 0], opacity: [0, 0, 1, 1, 0] }}
              style={{ transformOrigin: "252.5px 62px" }}
              transition={{
                duration: 5,
                ease: "easeInOut",
                repeat: Infinity,
                times: [0, 0.34, 0.45, 0.75, 1],
              }}
            />
            <motion.circle
              cx="347.5"
              cy="42"
              r="4.5"
              fill={GREEN}
              stroke={GREEN}
              strokeWidth="1"
              className="drop-shadow-[0_0_6px_rgba(20,158,93,0.4)]"
              animate={{ scale: [0, 0, 1, 1, 0], opacity: [0, 0, 1, 1, 0] }}
              style={{ transformOrigin: "347.5px 42px" }}
              transition={{
                duration: 5,
                ease: "easeInOut",
                repeat: Infinity,
                times: [0, 0.39, 0.45, 0.75, 1],
              }}
            />
            <motion.circle
              cx="442.5"
              cy="26"
              r="4.5"
              fill={GREEN}
              stroke={GREEN}
              strokeWidth="1"
              className="drop-shadow-[0_0_6px_rgba(20,158,93,0.4)]"
              animate={{ scale: [0, 0, 1, 1, 0], opacity: [0, 0, 1, 1, 0] }}
              style={{ transformOrigin: "442.5px 26px" }}
              transition={{
                duration: 5,
                ease: "easeInOut",
                repeat: Infinity,
                times: [0, 0.44, 0.45, 0.75, 1],
              }}
            />
          </motion.g>
        </svg>
      </div>
    </ServiceCardShell>
  );
}

// ==========================================
// SECTION
// ==========================================

export default function TestingSection() {
  return (
    <section className={styles.section}>
      <div className={styles.atmosphere} aria-hidden>
        <div className={styles.glowBlue} />
        <div className={styles.glowTeal} />
        <div className={styles.dotPattern} />
      </div>

      <div className={styles.inner}>
        <header className={styles.header}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowLine} />
            Why PrimeTek
            <span className={styles.eyebrowLine} />
          </div>

          <h2 className={styles.headline}>
            Operational Control for Pharmacies
            <span className={styles.headlineGradient}>
              Under Constant Pressure
            </span>
          </h2>
          <div className={styles.headlineRule} />
          <p className={styles.subhead}>
            We identify revenue leakage, reduce audit exposure, and optimize
            operations across your pharmacy using structured, data-driven
            systems.
          </p>
        </header>

        <div className={styles.gridTop}>
          <RevenueIntelligenceCard />
          <ComplianceAuditCard />
          <ClaimsReimbursementCard />
        </div>

        <div className={styles.gridBottom}>
          <PatientOperationalCard />
          <PharmacyGrowthCard />
        </div>
      </div>
    </section>
  );
}
