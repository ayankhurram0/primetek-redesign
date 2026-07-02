"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Search, ShieldAlert, Cpu, CheckCircle2 } from "lucide-react";

const ACCENT = "#17E8D4";
const ACCENT_GLOW = "rgba(23, 232, 212, 0.18)";
const TEXT_SECONDARY = "#A7C3CB";

const steps = [
  {
    id: "01",
    title: "Deep Packet Audit",
    desc: "Full historical claim extraction for the previous 24 months to identify risk patterns.",
    icon: Search,
  },
  {
    id: "02",
    title: "Node Hardening",
    desc: "Deployment of the local interception layer and real-time PBM policy sync.",
    icon: ShieldAlert,
  },
  {
    id: "03",
    title: "Logic Integration",
    desc: "Configuration of the Workflow_BIOS to align staff actions with clinical efficiency.",
    icon: Cpu,
  },
  {
    id: "04",
    title: "Validated Armor",
    desc: "System stress test and 100% audit-proof certification for the specific pharmacy node.",
    icon: CheckCircle2,
  },
];

const PARTICLES = [
  { x: "12%", y: "18%", size: 2, delay: 0 },
  { x: "78%", y: "12%", size: 1.5, delay: 1.2 },
  { x: "88%", y: "62%", size: 2, delay: 0.6 },
  { x: "22%", y: "72%", size: 1.5, delay: 1.8 },
  { x: "55%", y: "85%", size: 1, delay: 2.4 },
];

function ShieldIllustration() {
  return (
    <div className="relative flex items-center justify-center w-full max-w-[320px] lg:max-w-[380px] mx-auto lg:mx-0 lg:ml-auto aspect-square">
      <div
        className="absolute inset-[8%] rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${ACCENT_GLOW} 0%, transparent 65%)`,
        }}
      />
      <svg
        viewBox="0 0 200 200"
        className="relative w-full h-full"
        fill="none"
        aria-hidden
      >
        <circle
          cx="100"
          cy="100"
          r="88"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="1"
        />
        <circle
          cx="100"
          cy="100"
          r="72"
          stroke="rgba(23,232,212,0.12)"
          strokeWidth="1"
          strokeDasharray="4 8"
        />
        <path
          d="M100 36 L148 58 V98 C148 128 128 148 100 158 C72 148 52 128 52 98 V58 Z"
          stroke={ACCENT}
          strokeWidth="1.5"
          strokeLinejoin="round"
          style={{ filter: `drop-shadow(0 0 12px ${ACCENT_GLOW})` }}
        />
        <path
          d="M82 98 L94 110 L120 84"
          stroke={ACCENT}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ filter: `drop-shadow(0 0 8px ${ACCENT_GLOW})` }}
        />
      </svg>
    </div>
  );
}

function PhaseCard({
  step,
  idx,
  hoveredIndex,
  setHoveredIndex,
}: {
  step: (typeof steps)[number];
  idx: number;
  hoveredIndex: number | null;
  setHoveredIndex: (i: number | null) => void;
}) {
  const Icon = step.icon;
  const isHovered = hoveredIndex === idx;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: idx * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, margin: "-40px" }}
      onMouseEnter={() => setHoveredIndex(idx)}
      onMouseLeave={() => setHoveredIndex(null)}
      className="relative flex-1 min-w-0"
    >
      <motion.div
        animate={{ y: isHovered ? -8 : 0 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 h-full rounded-[24px] p-6 md:p-7 backdrop-blur-[16px] transition-[border-color,box-shadow] duration-[250ms]"
        style={{
          background: "rgba(255,255,255,0.03)",
          border: `1px solid ${isHovered ? "rgba(23,232,212,0.35)" : "rgba(255,255,255,0.08)"}`,
          boxShadow: isHovered
            ? `0 12px 40px rgba(0,0,0,0.2), 0 0 24px ${ACCENT_GLOW}`
            : "0 4px 24px rgba(0,0,0,0.12)",
        }}
      >
        <motion.div
          animate={{ scale: isHovered ? 1.06 : 1 }}
          transition={{ duration: 0.25 }}
          className="w-12 h-12 rounded-full flex items-center justify-center mb-6"
          style={{
            border: `1px solid ${isHovered ? "rgba(23,232,212,0.4)" : "rgba(255,255,255,0.1)"}`,
            background: "rgba(255,255,255,0.02)",
          }}
        >
          <Icon className="w-5 h-5" style={{ color: ACCENT }} strokeWidth={1.5} />
        </motion.div>

        <span
          className="block text-sm font-semibold tracking-[0.12em] mb-1.5 font-montserrat tabular-nums"
          style={{ color: ACCENT }}
        >
          {step.id}
        </span>

        <span
          className="block text-[10px] font-semibold uppercase tracking-[0.22em] mb-3 font-montserrat"
          style={{ color: `${ACCENT}80` }}
        >
          Phase {step.id}
        </span>

        <h3 className="text-base md:text-lg font-semibold text-ink uppercase tracking-wide mb-3 leading-snug font-montserrat">
          {step.title}
        </h3>

        <p
          className="text-sm leading-relaxed font-montserrat font-light"
          style={{ color: TEXT_SECONDARY }}
        >
          {step.desc}
        </p>
      </motion.div>

      {idx < steps.length - 1 && (
        <div className="lg:hidden flex justify-center py-4">
          <div
            className="w-px h-10"
            style={{ background: `linear-gradient(to bottom, rgba(23,232,212,0.3), transparent)` }}
          />
        </div>
      )}
    </motion.div>
  );
}

export default function CaseMethodology() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="relative py-28 md:py-36 px-26 overflow-hidden font-montserrat border-t border-white/[0.06]">
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      <div
        className="absolute top-0 right-0 w-[55%] h-[70%] pointer-events-none opacity-40"
        style={{
          background:
            "radial-gradient(ellipse at 80% 20%, rgba(6,43,52,0.6) 0%, transparent 55%), radial-gradient(ellipse at 60% 60%, rgba(23,232,212,0.04) 0%, transparent 50%)",
        }}
      />

      <div
        className="absolute top-[20%] left-[10%] w-[480px] h-[320px] rounded-full blur-[100px] pointer-events-none"
        style={{ background: `radial-gradient(circle, ${ACCENT_GLOW} 0%, transparent 70%)` }}
      />

      <svg
        className="absolute top-12 right-[18%] w-24 h-24 opacity-[0.12] pointer-events-none"
        viewBox="0 0 96 96"
        fill="none"
        aria-hidden
      >
        {Array.from({ length: 6 }).map((_, row) =>
          Array.from({ length: 6 }).map((__, col) => (
            <circle
              key={`${row}-${col}`}
              cx={8 + col * 16}
              cy={8 + row * 16}
              r="1"
              fill="rgba(23,232,212,0.5)"
            />
          ))
        )}
      </svg>

      {PARTICLES.map((p, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            background: ACCENT,
            opacity: 0.25,
            boxShadow: `0 0 6px ${ACCENT_GLOW}`,
          }}
          animate={{ y: [0, -8, 0], opacity: [0.15, 0.35, 0.15] }}
          transition={{ duration: 5 + i, repeat: Infinity, delay: p.delay, ease: "easeInOut" }}
        />
      ))}

      <div className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20 md:mb-28">
          <div className="max-w-xl">
            <p
              className="text-[11px] font-semibold uppercase tracking-[0.32em] mb-5 font-montserrat"
              style={{ color: ACCENT }}
            >
              Deployment Protocol
            </p>

            <h2 className="text-4xl md:text-5xl xl:text-[3.25rem] font-bold leading-[1.02] tracking-tight uppercase mb-6 font-display">
              <span style={{ color: ACCENT }}>How We Secure</span>
              <br />
              <span className="text-ink">The Node.</span>
            </h2>

            <p
              className="text-base md:text-lg leading-relaxed font-light max-w-md font-montserrat"
              style={{ color: TEXT_SECONDARY }}
            >
              A multi-layered deployment protocol designed to ensure the highest level of security,
              reliability and compliance for every pharmacy node.
            </p>
          </div>

          <ShieldIllustration />
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute left-[12.5%] right-[12.5%] top-[52px] h-px z-0 pointer-events-none">
            <div className="absolute inset-0 bg-white/[0.06]" />
            <motion.div
              className="absolute inset-0 origin-left"
              style={{
                background: ACCENT,
                boxShadow: hoveredIndex !== null ? `0 0 10px ${ACCENT_GLOW}` : "none",
              }}
              initial={{ scaleX: 0, opacity: 0.3 }}
              whileInView={{ scaleX: 1, opacity: hoveredIndex !== null ? 0.85 : 0.35 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              animate={{
                opacity: hoveredIndex !== null ? 0.85 : 0.35,
                boxShadow: hoveredIndex !== null ? `0 0 10px ${ACCENT_GLOW}` : "0 0 0px transparent",
              }}
            />
          </div>

          <div className="flex flex-col lg:flex-row gap-0 lg:gap-5 items-stretch relative z-10">
          {steps.map((step, idx) => (
            <PhaseCard
              key={step.id}
              step={step}
              idx={idx}
              hoveredIndex={hoveredIndex}
              setHoveredIndex={setHoveredIndex}
            />
          ))}
          </div>
        </div>


      </div>
    </section>
  );
}
