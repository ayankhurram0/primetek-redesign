"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

type ServiceIllustrationProps = {
  index: number;
  color?: string;
};

const ACCENTS = ["#FF4A3A", "#FF6B00", "#FF9F29", "#3B82F6", "#00C48C"] as const;

function StatusBadge({ label, accent }: { label: string; accent: string }) {
  return (
    <div
      className="absolute top-2.5 right-2.5 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full text-[8px] font-mono font-bold uppercase tracking-widest pointer-events-none"
      style={{
        border: `1px solid ${accent}66`,
        backgroundColor: `${accent}0d`,
        color: accent,
      }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accent }} />
      {label}
    </div>
  );
}

// ─── 0 · Revenue Intelligence ───────────────────────────────────────────────

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

function getCurvedPath(pts: DataPoint[]) {
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
}

function RevenueIllustration({ accent, uid }: { accent: string; uid: number }) {
  const [activeSet, setActiveSet] = useState("reimbursements");
  const [hoveredPointId, setHoveredPointId] = useState<number | null>(null);
  const points = REVENUE_DATA_SETS[activeSet];
  const curveD = getCurvedPath(points);

  useEffect(() => {
    const interval = setInterval(() => {
      if (hoveredPointId === null) {
        setActiveSet((current) => {
          const i = REVENUE_DATA_KEYS.indexOf(current);
          return REVENUE_DATA_KEYS[(i + 1) % REVENUE_DATA_KEYS.length];
        });
      }
    }, 6000);
    return () => clearInterval(interval);
  }, [hoveredPointId]);

  return (
    <div className="w-full h-full relative overflow-hidden">
      <StatusBadge label="Live Tracking" accent={accent} />
      <motion.div
        className="absolute top-0 bottom-0 w-[1.5px] z-10 pointer-events-none"
        style={{ background: `linear-gradient(to bottom, transparent, ${accent}99, transparent)` }}
        animate={{ x: ["30px", "330px", "30px"] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
      />
      <div className="absolute inset-0 opacity-5 flex flex-col justify-between py-6 px-4 pointer-events-none">
        <div className="border-b border-dashed border-white w-full" />
        <div className="border-b border-dashed border-white w-full" />
        <div className="border-b border-dashed border-white w-full" />
      </div>
      <svg className="w-full h-full overflow-visible" viewBox="0 0 350 110" fill="none">
        <defs>
          <linearGradient id={`rev-grad-${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={accent} stopOpacity="0.15" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.path
          d={`${curveD} L 330,110 L 30,110 Z`}
          fill={`url(#rev-grad-${uid})`}
          initial={false}
          animate={{ d: `${curveD} L 330,110 L 30,110 Z` }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
        <motion.path
          d={curveD}
          fill="none"
          stroke={accent}
          strokeWidth="2.5"
          strokeLinecap="round"
          className="drop-shadow-[0_0_6px_rgba(255,74,58,0.35)]"
          initial={false}
          animate={{ d: curveD }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
        {points.map((pt, idx) => (
          <g key={idx}>
            <circle
              cx={pt.x}
              cy={pt.y}
              r="10"
              className="fill-transparent cursor-pointer"
              onMouseEnter={() => setHoveredPointId(idx)}
              onMouseLeave={() => setHoveredPointId(null)}
            />
            {(hoveredPointId === idx || (hoveredPointId === null && idx === points.length - 1)) && (
              <>
                <motion.circle
                  cx={pt.x}
                  cy={pt.y}
                  r="6"
                  fill={accent}
                  className="opacity-75"
                  animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
                  transition={{ repeat: Infinity, duration: 1.2, ease: "easeOut" }}
                />
                <circle cx={pt.x} cy={pt.y} r="3.5" fill="white" stroke={accent} strokeWidth="2" />
              </>
            )}
          </g>
        ))}
      </svg>
      <div className="absolute right-2 bottom-1 bg-white/65 border border-ink/10 rounded-lg py-1 px-2.5 text-[8px] font-bold text-ink flex items-center gap-1.5 backdrop-blur-md z-10 font-mono">
        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
        <span>Live Leakage: $1.2M+</span>
      </div>
    </div>
  );
}

// ─── 1 · Claims & Reimbursement ───────────────────────────────────────────────

const CLAIM_ENDPOINTS = [
  { label: "PBM Auto-Match", status: "Success" },
  { label: "COB Validation", status: "Auto-Fixed" },
  { label: "NPI Resolution", status: "Matched" },
];

function ClaimsIllustration({ accent }: { accent: string }) {
  const [activeRouteIndex, setActiveRouteIndex] = useState(0);
  const [isRouting, setIsRouting] = useState(false);

  const routePath =
    activeRouteIndex === 0
      ? "M50 50 L120 50 Q162 35 215 20"
      : activeRouteIndex === 1
        ? "M50 50 L120 50 L215 50"
        : "M50 50 L120 50 Q162 65 215 80";

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveRouteIndex((prev) => (prev + 1) % 3);
      setIsRouting(true);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!isRouting) return;
    const t = setTimeout(() => setIsRouting(false), 1200);
    return () => clearTimeout(t);
  }, [isRouting, activeRouteIndex]);

  return (
    <div className="w-full h-full relative overflow-hidden flex items-center justify-center">
      <StatusBadge label="Auto-Route" accent={accent} />
      <svg className="w-full h-24 overflow-visible" viewBox="0 0 320 100" fill="none">
        <path d="M50 50 L120 50" stroke="rgba(255,255,255,0.08)" strokeWidth="2" strokeDasharray="4 4" />
        <path d="M120 50 L215 20" stroke="rgba(255,255,255,0.08)" strokeWidth="2" strokeDasharray="4 4" />
        <path d="M120 50 L215 50" stroke="rgba(255,255,255,0.08)" strokeWidth="2" strokeDasharray="4 4" />
        <path d="M120 50 L215 80" stroke="rgba(255,255,255,0.08)" strokeWidth="2" strokeDasharray="4 4" />
        <motion.path
          d={routePath}
          stroke={accent}
          strokeWidth="3.5"
          strokeLinecap="round"
          className="drop-shadow-[0_0_6px_rgba(255,107,0,0.5)]"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          key={activeRouteIndex}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
        <circle cx="50" cy="50" r="14" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" />
        <motion.circle
          cx="50"
          cy="50"
          r="11"
          fill="transparent"
          stroke={accent}
          strokeWidth="1"
          animate={{ scale: [1, 1.4], opacity: [0.6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeOut" }}
        />
        <circle cx="50" cy="50" r="5" fill={accent} />
        <circle cx="120" cy="50" r="18" fill={`${accent}14`} stroke={accent} strokeWidth="2" />
        <motion.circle
          cx="120"
          cy="50"
          r="18"
          fill="transparent"
          stroke={accent}
          strokeWidth="1"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        />
        <circle cx="120" cy="50" r="8" fill={accent} />
        {CLAIM_ENDPOINTS.map((item, idx) => {
          const nodeY = idx === 0 ? 20 : idx === 1 ? 50 : 80;
          const isTarget = idx === activeRouteIndex;
          return (
            <g key={item.label}>
              <circle
                cx="215"
                cy={nodeY}
                r={isTarget ? 12 : 10}
                fill={isTarget ? `${accent}1f` : "rgba(255,255,255,0.04)"}
                stroke={isTarget ? accent : "rgba(255,255,255,0.15)"}
                strokeWidth="1.5"
              />
              <circle
                cx="215"
                cy={nodeY}
                r={isTarget ? 5.5 : 4}
                fill={isTarget ? accent : "rgba(255,255,255,0.3)"}
              />
              <text
                x="234"
                y={nodeY + 3}
                fill={isTarget ? "#FFF" : "#8E9B9E"}
                fontSize="7.5"
                fontWeight="bold"
              >
                {item.label}
              </text>
            </g>
          );
        })}
      </svg>
      <div className="absolute left-2 bottom-1">
        <span className="text-[7.5px] font-mono text-gray-500 uppercase leading-none block">PPR Status:</span>
        <span
          className="text-[8px] font-mono font-bold uppercase mt-0.5 inline-block"
          style={{ color: accent }}
        >
          {isRouting ? "processing..." : "Success"}
        </span>
      </div>
    </div>
  );
}

// ─── 2 · Compliance & Audit ───────────────────────────────────────────────────

function ComplianceIllustration({ accent }: { accent: string }) {
  const [activeStage, setActiveStage] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStage((prev) => (prev + 1) % 3);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full relative overflow-hidden flex flex-col justify-center px-4">
      <StatusBadge label="Risk Control" accent={accent} />
      <motion.div
        className="absolute inset-x-0 h-10 pointer-events-none"
        style={{ background: `linear-gradient(to bottom, transparent, ${accent}0d, transparent)` }}
        animate={{ y: [-40, 180] }}
        transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
      />
      <span className="text-[9px] font-mono font-bold uppercase tracking-wider z-10" style={{ color: accent }}>
        Risk Scanner Active
      </span>
      <div className="relative w-full flex justify-between items-center px-2 mt-3 z-10">
        <div className="absolute left-[38px] right-[38px] top-[22px] -translate-y-1/2 h-[2.5px] bg-white/10" />
        <motion.div
          className="absolute left-[38px] top-[22px] -translate-y-1/2 h-[2.5px] origin-left"
          style={{ backgroundColor: accent, right: "38px" }}
          initial={false}
          animate={{ scaleX: activeStage === 0 ? 0 : activeStage === 1 ? 0.5 : 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
        {[
          { label: "Gap Scan", num: "01" },
          { label: "Audit Ready", num: "02" },
          { label: "Safe", num: "03" },
        ].map((stage, idx) => {
          const isActive = activeStage === idx;
          const isPast = activeStage > idx;
          return (
            <div key={stage.label} className="flex flex-col items-center gap-2 relative">
              <div
                className={`w-11 h-11 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                  isActive ? "scale-110" : ""
                }`}
                style={{
                  backgroundColor: "#0a0f1d",
                  borderColor: isActive || isPast ? accent : "rgba(255,255,255,0.15)",
                  color: isActive || isPast ? accent : "rgba(255,255,255,0.3)",
                  boxShadow: isActive ? `0 0 15px ${accent}4d` : undefined,
                }}
              >
                {isPast || (isActive && idx === 2) ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : (
                  <span className="font-mono">{stage.num}</span>
                )}
              </div>
              <span
                className="text-[8.5px] font-bold uppercase tracking-wider"
                style={{ color: isActive ? accent : "rgba(255,255,255,0.3)" }}
              >
                {stage.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── 3 · Patient & Operational ──────────────────────────────────────────────

const OPERATIONS_QUEUE = [
  {
    initials: "SJ",
    name: "Sarah Jenkins, PharmD",
    detail: "Automated audit of prior authorization forms resolved 4 pending clinical exceptions.",
  },
  {
    initials: "DM",
    name: "David Miller, RPh",
    detail: "Daily inventory reconciliation completed. 12 prescription bottlenecks automatically resolved.",
  },
  {
    initials: "ER",
    name: "Elena Rostova, CPht",
    detail: "Client pharmacy onboarding logs fully audited. Compliance checks updated to active-state.",
  },
];

function PatientIllustration({ accent }: { accent: string }) {
  const [notifications, setNotifications] = useState<number[]>([1]);

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
    <div className="w-full h-full relative overflow-hidden flex items-start justify-center pt-2">
      <StatusBadge label="Sync" accent={accent} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full blur-2xl pointer-events-none" style={{ backgroundColor: `${accent}1a` }} />
      <div className="relative w-full max-w-[280px] h-[110px]">
        <AnimatePresence>
          {notifications.map((itemIndex, stackPos) => {
            const item = OPERATIONS_QUEUE[itemIndex];
            const isTop = stackPos === 0;
            return (
              <motion.div
                key={`${itemIndex}-${stackPos}`}
                initial={{ opacity: 0, y: -40 }}
                animate={{
                  opacity: isTop ? 1 : stackPos === 1 ? 0.6 : 0.35,
                  y: stackPos * 10,
                  scale: 1 - stackPos * 0.04,
                }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                style={{ zIndex: 10 - stackPos, position: "absolute", width: "100%" }}
                className="bg-black/50 backdrop-blur-xl border border-ink/10 rounded-[14px] p-3 flex flex-col gap-1.5 shadow-lg"
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1.5">
                    <div
                      className="w-4 h-4 rounded-md flex items-center justify-center shrink-0"
                      style={{ backgroundColor: `${accent}33` }}
                    >
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2.5">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                    </div>
                    <span className="text-[8px] text-ink-subtle font-semibold tracking-wide uppercase">
                      System • {item.initials}
                    </span>
                  </div>
                  <span className="text-[8.5px] text-ink-subtle">{isTop ? "now" : `${stackPos * 2}m ago`}</span>
                </div>
                <div className="text-left">
                  <span className="text-[9px] font-bold text-ink/90 leading-tight block">{item.name}</span>
                  <span className="text-[9px] text-ink-muted line-clamp-2 leading-snug mt-0.5 block">{item.detail}</span>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ─── 4 · Pharmacy Growth ──────────────────────────────────────────────────────

function GrowthIllustration({ accent }: { accent: string }) {
  const bars = [
    { x: 35, h: 30, labelX: 62.5, lineY: 70, delay: 0 },
    { x: 130, h: 45, labelX: 157.5, lineY: 52, delay: 0.12 },
    { x: 225, h: 35, labelX: 252.5, lineY: 62, delay: 0.22 },
    { x: 320, h: 55, labelX: 347.5, lineY: 42, delay: 0.32 },
    { x: 415, h: 72, labelX: 442.5, lineY: 26, delay: 0.42 },
  ];

  return (
    <div className="w-full h-full relative overflow-hidden flex items-center justify-center">
      <StatusBadge label="Growth Scale" accent={accent} />
      <svg className="w-full h-full overflow-visible" viewBox="0 0 500 130" fill="none">
        <line x1="20" y1="110" x2="480" y2="110" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
        {bars.map((bar, idx) => (
          <motion.rect
            key={bar.x}
            x={bar.x}
            width="55"
            rx="6"
            fill={accent}
            className="drop-shadow-[0_0_8px_rgba(0,196,140,0.3)]"
            animate={{
              y: [110, 110, 110 - bar.h, 110 - bar.h, 110],
              height: [0, 0, bar.h, bar.h, 0],
            }}
            transition={{
              duration: 5,
              ease: "easeInOut",
              repeat: Infinity,
              times: [0, 0.05, 0.25 + idx * 0.04, 0.75, 1],
              delay: bar.delay,
            }}
          />
        ))}
        {bars.map((bar, idx) => (
          <text
            key={`lbl-${bar.x}`}
            x={bar.labelX}
            y="126"
            fill={idx === 4 ? accent : "rgba(255,255,255,0.6)"}
            fontSize="10.5"
            fontWeight="bold"
            textAnchor="middle"
          >
            M{idx + 1}
          </text>
        ))}
        <motion.g animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}>
          <motion.path
            d="M 62.5 70 L 157.5 52 L 252.5 62 L 347.5 42 L 442.5 26"
            stroke={accent}
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="drop-shadow-[0_0_6px_rgba(0,196,140,0.4)]"
            animate={{ pathLength: [0, 1, 1, 0], opacity: [0, 1, 1, 0] }}
            transition={{ duration: 5, ease: "easeInOut", repeat: Infinity, times: [0, 0.45, 0.75, 1] }}
          />
          {bars.slice(1).map((bar, i) => (
            <motion.circle
              key={`dot-${bar.x}`}
              cx={bar.labelX}
              cy={bar.lineY}
              r="4.5"
              fill={accent}
              animate={{ scale: [0, 0, 1, 1, 0], opacity: [0, 0, 1, 1, 0] }}
              transition={{
                duration: 5,
                ease: "easeInOut",
                repeat: Infinity,
                times: [0, 0.28 + i * 0.06, 0.45, 0.75, 1],
              }}
            />
          ))}
        </motion.g>
      </svg>
    </div>
  );
}

// ─── Export ───────────────────────────────────────────────────────────────────

export function ServiceIllustration({ index, color }: ServiceIllustrationProps) {
  const accent = color ?? ACCENTS[index] ?? ACCENTS[0];

  switch (index) {
    case 0:
      return <RevenueIllustration accent={accent} uid={index} />;
    case 1:
      return <ClaimsIllustration accent={accent} />;
    case 2:
      return <ComplianceIllustration accent={accent} />;
    case 3:
      return <PatientIllustration accent={accent} />;
    case 4:
      return <GrowthIllustration accent={accent} />;
    default:
      return null;
  }
}
