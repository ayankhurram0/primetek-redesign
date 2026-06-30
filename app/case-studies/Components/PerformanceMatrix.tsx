"use client";

import { useState, useId } from "react";
import { motion } from "motion/react";
import {
  Shield,
  TrendingUp,
  BarChart3,
  FlaskConical,
  ArrowUpRight,
  Users,
} from "lucide-react";
import { RollingRecovery, RollingPercent } from "@/app/components/RollingNumber";

const CARD_THEMES = [
  {
    accent: "#22E8E8",
    accentRgb: "34, 232, 232",
    chartPoints: [22, 26, 24, 32, 30, 38, 42, 48],
  },
  {
    accent: "#2DA8FF",
    accentRgb: "45, 168, 255",
    chartPoints: [28, 32, 38, 36, 46, 52, 58, 66],
  },
  {
    accent: "#8B5CFF",
    accentRgb: "139, 92, 255",
    chartPoints: [18, 20, 26, 34, 48, 62, 78, 94],
  },
] as const;

const tiers = [
  {
    tier: "Node_Alpha",
    recovery: { type: "range" as const, min: 12, max: 18, unit: "k" },
    efficiency: 22,
    icon: FlaskConical,
  },
  {
    tier: "Node_Beta",
    recovery: { type: "range" as const, min: 45, max: 90, unit: "k" },
    efficiency: 34,
    icon: BarChart3,
  },
  {
    tier: "Node_Gamma",
    recovery: { type: "plus" as const, min: 240, unit: "k" },
    efficiency: 48,
    icon: TrendingUp,
  },
];

function smoothLinePath(
  coords: { x: number; y: number }[],
  tension = 0.35
): string {
  if (coords.length < 2) return "";
  let d = `M ${coords[0].x} ${coords[0].y}`;
  for (let i = 0; i < coords.length - 1; i++) {
    const p0 = coords[Math.max(i - 1, 0)];
    const p1 = coords[i];
    const p2 = coords[i + 1];
    const p3 = coords[Math.min(i + 2, coords.length - 1)];
    const cp1x = p1.x + ((p2.x - p0.x) / 6) * tension;
    const cp1y = p1.y + ((p2.y - p0.y) / 6) * tension;
    const cp2x = p2.x - ((p3.x - p1.x) / 6) * tension;
    const cp2y = p2.y - ((p3.y - p1.y) / 6) * tension;
    d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
  }
  return d;
}

function MiniSparkline({
  color,
  rgb,
  points,
  play,
}: {
  color: string;
  rgb: string;
  points: readonly number[];
  play: boolean;
}) {
  const gradId = useId();
  const width = 280;
  const height = 100;
  const padX = 4;
  const padY = 14;
  const max = Math.max(...points);
  const min = Math.min(...points);
  const range = max - min || 1;

  const coords = points.map((p, i) => ({
    x: padX + (i / (points.length - 1)) * (width - padX * 2),
    y: padY + (1 - (p - min) / range) * (height - padY * 2),
  }));

  const linePath = smoothLinePath(coords);
  const areaPath = `${linePath} L ${coords[coords.length - 1].x} ${height} L ${coords[0].x} ${height} Z`;
  const dotIndices = [1, 3, 5, 7];

  return (
    <div className="relative w-full h-[100px] my-5">
      {[0.3, 0.55, 0.8].map((y) => (
        <div
          key={y}
          className="absolute left-0 right-0 h-px"
          style={{
            top: `${y * 100}%`,
            background: `linear-gradient(90deg, transparent 5%, rgba(${rgb}, 0.1) 50%, transparent 95%)`,
          }}
        />
      ))}
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-full overflow-visible"
        preserveAspectRatio="none"
        aria-hidden
      >
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.4" />
            <stop offset="85%" stopColor={color} stopOpacity="0.05" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
          <filter id={`${gradId}-glow`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <motion.path
          d={areaPath}
          fill={`url(#${gradId})`}
          initial={{ opacity: 0 }}
          animate={play ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.9, delay: 0.35 }}
        />

        <motion.path
          d={linePath}
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          filter={`url(#${gradId}-glow)`}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={play ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
          transition={{ duration: 1.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        />

        {dotIndices.map((i) => (
          <motion.circle
            key={i}
            cx={coords[i].x}
            cy={coords[i].y}
            r="3.5"
            fill={color}
            initial={{ opacity: 0, scale: 0 }}
            animate={play ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
            transition={{ duration: 0.35, delay: 0.6 + i * 0.08 }}
            style={{ filter: `drop-shadow(0 0 6px ${color})` }}
          />
        ))}
      </svg>
    </div>
  );
}

function BenchmarkCard({
  node,
  i,
}: {
  node: (typeof tiers)[number];
  i: number;
}) {
  const [play, setPlay] = useState(false);
  const theme = CARD_THEMES[i];
  const Icon = node.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      onViewportEnter={() => setPlay(true)}
      viewport={{ once: true, amount: 0.3 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.25, delay: i * 0.1 }}
      className="group relative flex flex-col rounded-[24px] h-full min-h-[480px] bg-transparent"
      style={{
        border: `1px solid rgba(${theme.accentRgb}, 0.35)`,
        boxShadow: `
          0 0 32px rgba(${theme.accentRgb}, 0.18),
          0 0 64px rgba(${theme.accentRgb}, 0.08)
        `,
      }}
    >
      <div className="relative z-10 flex flex-col h-full px-6 pt-8 pb-7 md:px-7 md:pt-9 md:pb-8">
        <div
          className="flex items-center justify-center w-[52px] h-[52px] rounded-full mb-7 mx-auto transition-transform duration-[250ms] group-hover:scale-105"
          style={{
            background: `rgba(${theme.accentRgb}, 0.1)`,
            border: `1px solid rgba(${theme.accentRgb}, 0.45)`,
            boxShadow: `0 0 24px rgba(${theme.accentRgb}, 0.35), inset 0 0 16px rgba(${theme.accentRgb}, 0.1)`,
          }}
        >
          <Icon
            className="w-[22px] h-[22px]"
            strokeWidth={1.75}
            style={{ color: theme.accent, filter: `drop-shadow(0 0 8px ${theme.accent})` }}
          />
        </div>

        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500 mb-2.5">
          Avg Monthly Recovery
        </p>

        <div
          className="text-[1.75rem] md:text-[2rem] font-bold tracking-tight leading-none font-montserrat"
          style={{ color: theme.accent, textShadow: `0 0 32px rgba(${theme.accentRgb}, 0.45)` }}
        >
          <RollingRecovery
            stat={node.recovery}
            className="!font-montserrat"
            delay={0.2 + i * 0.15}
            play={play}
            glowColor={theme.accent}
          />
        </div>

        <MiniSparkline
          color={theme.accent}
          rgb={theme.accentRgb}
          points={theme.chartPoints}
          play={play}
        />

        <div
          className="mt-auto pt-5"
          style={{ borderTop: `1px solid rgba(${theme.accentRgb}, 0.15)` }}
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500 mb-3">
            Efficiency Delta
          </p>
          <div className="flex items-center gap-3">
            <div
              className="text-2xl md:text-[1.75rem] font-bold tracking-tight leading-none font-montserrat"
              style={{ color: theme.accent, textShadow: `0 0 24px rgba(${theme.accentRgb}, 0.4)` }}
            >
              <RollingPercent
                value={node.efficiency}
                className="!font-montserrat"
                delay={0.45 + i * 0.15}
                play={play}
                glowColor={theme.accent}
              />
            </div>
            <div
              className="flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-[250ms] group-hover:scale-105"
              style={{
                background: `rgba(${theme.accentRgb}, 0.1)`,
                border: `1px solid rgba(${theme.accentRgb}, 0.3)`,
                boxShadow: `0 0 12px rgba(${theme.accentRgb}, 0.2)`,
              }}
            >
              <ArrowUpRight
                className="w-4 h-4"
                style={{ color: theme.accent, filter: `drop-shadow(0 0 4px ${theme.accent})` }}
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function PerformanceMatrix() {
  return (
    <section className="relative py-28 md:py-36 px-26 overflow-hidden font-montserrat bg-transparent">
      <div className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20 items-start">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-2.5 mb-7">
              <span className="flex gap-1">
                <span className="w-1 h-1 rounded-full bg-[#22E8E8]" style={{ boxShadow: "0 0 6px #22E8E8" }} />
                <span className="w-1 h-1 rounded-full bg-[#22E8E8]" style={{ boxShadow: "0 0 6px #22E8E8" }} />
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#22E8E8]">
                Data That Drives Results
              </span>
            </div>

            <h2 className="text-[2.75rem] md:text-[3.25rem] xl:text-[3.75rem] font-bold leading-[0.92] tracking-tight uppercase mb-8 font-montserrat">
              <span
                className="block text-[#22E8E8]"
                style={{ textShadow: "0 0 48px rgba(34,232,232,0.3)" }}
              >
                Performance
              </span>
              <span className="block text-white mt-1">Benchmarks.</span>
            </h2>

            <p className="text-slate-400/90 text-base md:text-[1.05rem] leading-relaxed max-w-[340px] mb-10">
              Aggregated data from over 1,200 independent pharmacy nodes currently operating on the
              PrimeTek Secure-Link™ standard.
            </p>

            <div
              className="relative rounded-[20px] max-w-[360px] overflow-hidden bg-transparent"
              style={{
                border: "1px solid rgba(34, 232, 232, 0.3)",
                boxShadow: "0 0 24px rgba(34, 232, 232, 0.12)",
              }}
            >
              <div className="p-5 flex gap-4 items-start">
                <div
                  className="shrink-0 flex items-center justify-center w-11 h-11 rounded-full"
                  style={{
                    background: "rgba(34, 232, 232, 0.08)",
                    border: "1px solid rgba(34, 232, 232, 0.35)",
                    boxShadow: "0 0 16px rgba(34, 232, 232, 0.25)",
                  }}
                >
                  <Shield className="w-5 h-5 text-[#22E8E8]" />
                </div>
                <div>
                  <p className="text-[13px] font-bold uppercase tracking-wide text-white mb-1.5">
                    Statistical Certainty
                  </p>
                  <p className="text-[11px] text-slate-500 leading-relaxed uppercase tracking-wider">
                    Data reflects 2024–2025 fiscal verification.
                  </p>
                  <p className="text-[11px] text-[#22E8E8] mt-1.5 uppercase tracking-wider font-semibold">
                    Standard deviation: &lt; 0.02%.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-7">
            {tiers.map((node, i) => (
              <BenchmarkCard key={node.tier} node={node} i={i} />
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.45 }}
          className="mt-16 md:mt-20 rounded-full overflow-hidden bg-transparent"
          style={{
            border: "1px solid rgba(34, 232, 232, 0.15)",
            boxShadow: "0 0 32px rgba(34,232,232,0.06)",
          }}
        >
          <div className="px-6 md:px-10 py-4 md:py-5 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-0">
            <div className="flex items-center gap-3 shrink-0 sm:pr-8">
              <div
                className="flex items-center justify-center w-9 h-9 rounded-full shrink-0"
                style={{
                  background: "rgba(34, 232, 232, 0.08)",
                  border: "1px solid rgba(34, 232, 232, 0.25)",
                  boxShadow: "0 0 12px rgba(34, 232, 232, 0.15)",
                }}
              >
                <Users className="w-4 h-4 text-[#22E8E8]" />
              </div>
              <span className="text-[11px] md:text-xs font-bold uppercase tracking-[0.22em] text-[#22E8E8] whitespace-nowrap">
                Powered by Real-World Data
              </span>
            </div>

            <div className="hidden sm:block w-px h-7 bg-white/10 shrink-0" />

            <p className="text-sm text-slate-500 leading-relaxed sm:pl-8">
              Insights you can trust. Results you can measure. Performance you can scale.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
