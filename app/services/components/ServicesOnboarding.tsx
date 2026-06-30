"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Search, FolderSync, FileCheck, TrendingUp } from "lucide-react";

const ACCENT = "#18E7D5";
const ACCENT_GLOW = "rgba(24, 231, 213, 0.18)";
const TEXT_BODY = "#A9C3CB";

const steps = [
  {
    id: "01",
    title: "Discovery Call",
    description:
      "We learn your pharmacy's specific challenges, PBM contracts, and performance goals.",
    icon: Search,
  },
  {
    id: "02",
    title: "Data Onboarding",
    description: "Secure data intake and system setup.",
    icon: FolderSync,
  },
  {
    id: "03",
    title: "First Report Cycle",
    description: "Your first performance report with immediate findings.",
    icon: FileCheck,
  },
  {
    id: "04",
    title: "Ongoing Intelligence",
    description: "Real-time alerts and quarterly strategy reviews.",
    icon: TrendingUp,
  },
];

function WorkflowStep({
  step,
  idx,
  hovered,
  setHovered,
}: {
  step: (typeof steps)[number];
  idx: number;
  hovered: number | null;
  setHovered: (i: number | null) => void;
}) {
  const Icon = step.icon;
  const isHovered = hovered === idx;

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(idx)}
      onMouseLeave={() => setHovered(null)}
      className="relative flex flex-col items-center text-center flex-1 min-w-0"
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45, delay: 0.5 + idx * 0.15 }}
        className="relative z-10 flex items-center justify-center w-10 h-10 rounded-full font-montserrat text-[11px] font-semibold tabular-nums mb-12 transition-all duration-[250ms]"
        style={{
          color: ACCENT,
          border: `1px solid ${isHovered ? "rgba(24,231,213,0.55)" : "rgba(24,231,213,0.35)"}`,
          background: "rgba(24,231,213,0.08)",
          boxShadow: isHovered ? `0 0 24px ${ACCENT_GLOW}` : `0 0 14px ${ACCENT_GLOW}`,
        }}
      >
        {step.id}
      </motion.div>

      <motion.div
        animate={{ y: isHovered ? -8 : 0 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center w-full"
      >
        <motion.div
          animate={{ scale: isHovered ? 1.06 : 1, rotate: isHovered ? 3 : 0 }}
          transition={{ duration: 0.25 }}
          className="w-[72px] h-[72px] rounded-2xl flex items-center justify-center mb-8 backdrop-blur-[16px] transition-[border-color,box-shadow] duration-[250ms]"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: `1px solid ${isHovered ? "rgba(24,231,213,0.4)" : "rgba(255,255,255,0.08)"}`,
            boxShadow: isHovered ? `0 8px 32px rgba(0,0,0,0.15), 0 0 20px ${ACCENT_GLOW}` : "0 2px 16px rgba(0,0,0,0.08)",
          }}
        >
          <Icon className="w-6 h-6" style={{ color: ACCENT }} strokeWidth={1.5} />
        </motion.div>

        <div
          className="w-6 h-px mb-6"
          style={{ background: ACCENT, opacity: isHovered ? 0.7 : 0.35 }}
        />

        <h4 className="text-xl md:text-2xl font-display font-bold text-white mb-4 leading-snug px-1">
          {step.title}
        </h4>

        <p
          className="text-base leading-relaxed font-montserrat font-light max-w-[240px]"
          style={{ color: TEXT_BODY }}
        >
          {step.description}
        </p>
      </motion.div>

      {idx < steps.length - 1 && (
        <div className="md:hidden flex flex-col items-center py-8">
          <div className="w-px h-10 bg-white/[0.06]" />
        </div>
      )}
    </motion.div>
  );
}

export const ServicesOnboarding = () => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="relative py-[140px] px-26 overflow-hidden font-montserrat">
      <div
        className="absolute top-[22%] left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-[120px] pointer-events-none"
        style={{ background: `radial-gradient(circle, ${ACCENT_GLOW} 0%, transparent 68%)` }}
      />

      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      <div
        className="absolute top-8 right-[8%] w-24 h-24 opacity-[0.08] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(rgba(24,231,213,0.7) 1px, transparent 1px)",
          backgroundSize: "10px 10px",
        }}
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 45% 35% at 15% 85%, rgba(57,184,255,0.04) 0%, transparent 55%)",
        }}
      />

      {[0, 1].map((i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full blur-[90px] pointer-events-none ${i === 0 ? "top-[10%] left-[6%] w-56 h-56" : "bottom-[12%] right-[8%] w-64 h-64"}`}
          style={{ background: i === 0 ? ACCENT_GLOW : "rgba(57,184,255,0.05)" }}
          animate={{ opacity: [0.2, 0.35, 0.2] }}
          transition={{ duration: 8, repeat: Infinity, delay: i * 2, ease: "easeInOut" }}
        />
      ))}

      <div className="relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-24 md:mb-28">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-[11px] font-semibold uppercase tracking-[0.35em] mb-4"
            style={{ color: ACCENT }}
          >
            The Workflow
          </motion.p>

          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="w-8 h-px mx-auto mb-8 origin-center"
            style={{ background: ACCENT }}
          />

          <motion.h3
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.12 }}
            className="text-4xl md:text-5xl xl:text-[3.5rem] font-display font-bold leading-[1.08] tracking-tight mb-6"
          >
            <span className="text-white">From </span>
            <span style={{ color: ACCENT }}>Onboarding</span>
            <span className="text-white"> to </span>
            <span style={{ color: ACCENT }}>Intelligence.</span>
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base md:text-lg leading-relaxed font-montserrat font-light"
            style={{ color: TEXT_BODY }}
          >
            A streamlined process built to turn pharmacy challenges into clear insights and
            measurable results.
          </motion.p>
        </div>

        <div className="relative">
          <div className="hidden md:block absolute left-[12.5%] right-[12.5%] top-5 h-px z-0">
            <div className="absolute inset-0 bg-white/[0.06]" />
            <motion.div
              className="absolute inset-0 origin-left"
              style={{ background: ACCENT }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
              animate={{
                opacity: hovered !== null ? 0.8 : 0.45,
                boxShadow: hovered !== null ? `0 0 10px ${ACCENT_GLOW}` : "none",
              }}
            />
          </div>

          <div className="flex flex-col md:flex-row md:gap-12 relative z-10">
            {steps.map((step, idx) => (
              <WorkflowStep
                key={step.id}
                step={step}
                idx={idx}
                hovered={hovered}
                setHovered={setHovered}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
