"use client";

import React from "react";
import { motion } from "motion/react";
import {
  Quote,
  MapPin,
  Calendar,
  Hash,
  FileText,
  Server,
  Check,
} from "lucide-react";

export interface CaseStudyData {
  category: string;
  type: string;
  title: string;
  headlinePrimary?: string;
  headlineAccent?: string;
  location: string;
  statValue: string;
  statLabel: string;
  statDuration: string;
  challenge: string;
  approach: string;
  results: string[];
  quote: string;
  author: string;
  authorRole: string;
  theme: "teal" | "purple" | "blue" | "red";
}

const themeStyles = {
  teal: {
    accent: "#059669",
    accentLight: "#d1fae5",
    accentSoft: "#ecfdf5",
    background: "/images/case-study-card-bg-teal.png",
  },
  purple: {
    accent: "#7c3aed",
    accentLight: "#ddd6fe",
    accentSoft: "#f5f3ff",
    background: "/images/case-study-card-bg-purple.png",
  },
  blue: {
    accent: "#2563eb",
    accentLight: "#bfdbfe",
    accentSoft: "#eff6ff",
    background: "/images/case-study-card-bg-blue.png",
  },
  red: {
    accent: "#dc2626",
    accentLight: "#fecaca",
    accentSoft: "#fef2f2",
    background: "/images/case-study-card-bg-red.png",
  },
};

function getHeadline(study: CaseStudyData) {
  if (study.headlinePrimary && study.headlineAccent) {
    return {
      primary: study.headlinePrimary,
      accent: study.headlineAccent,
    };
  }

  const parts = study.title.split(/\s+(?=(?:Recovered|Avoided|Improvement|Catches)\b)/i);
  if (parts.length >= 2) {
    return {
      primary: parts[0].toUpperCase(),
      accent: parts.slice(1).join(" ").toUpperCase(),
    };
  }

  return {
    primary: study.title.toUpperCase(),
    accent: "",
  };
}

interface CaseStudyCardProps {
  study: CaseStudyData;
  idx: number;
  key?: React.Key;
}

export default function CaseStudyCard({ study, idx }: CaseStudyCardProps) {
  const styles = themeStyles[study.theme];
  const { primary, accent: headlineAccent } = getHeadline(study);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      className="mb-24 py-6 font-montserrat md:py-8"
    >
      <div className="relative overflow-hidden rounded-[28px] border border-slate-200/70 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
        <div
          className="case-study-card__background pointer-events-none absolute inset-0 -z-10"
          style={{
            backgroundImage: `url('${styles.background}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
          aria-hidden
        />

        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200/70 px-8 py-4 md:px-10">
          <div className="flex flex-wrap items-center gap-3 text-[11px] font-bold uppercase tracking-[0.28em] text-slate-500">
            <span className="flex items-center gap-1.5" style={{ color: styles.accent }}>
              <Hash className="h-3.5 w-3.5" />
              Study Log 0{idx + 1}
            </span>
            <span className="text-slate-300">|</span>
            <span>{study.type}</span>
          </div>
          <div
            className="rounded-full border px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em]"
            style={{ borderColor: styles.accent, color: styles.accent }}
          >
            {study.category}
          </div>
        </div>

        <div className="p-8 md:p-12 lg:p-14">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-14">
            {/* Left column */}
            <div>
              <div className="mb-8 flex flex-wrap items-center gap-6">
                <div
                  className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest"
                  style={{ color: styles.accent }}
                >
                  <MapPin className="h-4 w-4" />
                  {study.location}
                </div>
                <div
                  className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest"
                  style={{ color: styles.accent }}
                >
                  <Calendar className="h-4 w-4" />
                  {study.statDuration}
                </div>
              </div>

              <h2 className="font-display text-[clamp(2.4rem,4.8vw,4.5rem)] font-bold uppercase leading-[0.98] tracking-tight">
                <span className="block text-ink">{primary}</span>
                {headlineAccent ? (
                  <span className="block" style={{ color: styles.accent }}>
                    {headlineAccent}
                  </span>
                ) : null}
              </h2>

              <div className="grid gap-10 pt-10 md:grid-cols-2 md:gap-8">

                <div className="md:border-slate-200/80 bg-white p-8 shadow-[0_12px_40px_rgba(15,23,42,0.06)] md:p-10 border border-slate-200/80 rounded-2xl">
                  <div className="mb-5 flex items-center gap-3">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-full"
                      style={{ backgroundColor: styles.accentSoft, color: styles.accent }}
                    >
                      <FileText className="h-5 w-5" strokeWidth={1.75} />
                    </div>
                    <h4
                      className="text-md font-black uppercase tracking-[0.22em]"
                      style={{ color: styles.accent }}
                    >
                      Initial Condition
                    </h4>
                  </div>
                  <p className="text-base leading-relaxed text-black md:text-[1.05rem]">
                    {study.challenge}
                  </p>
                </div>

                <div className="md:pl-10 md:border-slate-200/80 bg-white p-8 shadow-[0_12px_40px_rgba(15,23,42,0.06)] md:p-10 border border-slate-200/80 rounded-2xl">
                  <div className="mb-5 flex items-center gap-3">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-full"
                      style={{ backgroundColor: styles.accentSoft, color: styles.accent }}
                    >
                      <Server className="h-5 w-5" strokeWidth={1.75} />
                    </div>
                    <h4
                      className="text-md font-black uppercase tracking-[0.22em]"
                      style={{ color: styles.accent }}
                    >
                      System Deployment
                    </h4>
                  </div>
                  <p className="text-base leading-relaxed text-black md:text-[1.05rem]">
                    {study.approach}
                  </p>
                </div>
              </div>
            </div>

            {/* Right column */}
            <div>
              <div className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-8 shadow-[0_16px_48px_rgba(15,23,42,0.08)]">
                <div
                  className="absolute top-0 right-0 h-16 w-16 translate-x-1/2 -translate-y-1/2 rotate-45"
                  style={{ backgroundColor: styles.accentLight }}
                />
                <div
                  className="relative mb-2 font-display text-6xl font-bold tracking-tighter"
                  style={{ color: styles.accent }}
                >
                  {study.statValue}
                </div>
                <div className="relative mb-5 text-xs font-bold uppercase tracking-[0.24em] text-ink">
                  {study.statLabel}
                </div>
                <div
                  className="relative h-1.5 w-full overflow-hidden rounded-full"
                  style={{ backgroundColor: styles.accentLight }}
                >
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "82%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.35, ease: "easeOut" }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: styles.accent }}
                  />
                </div>
              </div>

              <ul className="mt-8 space-y-5">
                {study.results.map((result, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div
                      className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                      style={{ backgroundColor: styles.accent }}
                    >
                      <Check className="h-3 w-3 text-white" strokeWidth={3} />
                    </div>
                    <span className="text-[11px] font-bold uppercase leading-snug tracking-wide text-slate-600">
                      {result}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Testimonial */}
          <div className="relative mt-12 overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-8 shadow-[0_12px_40px_rgba(15,23,42,0.06)] md:p-10">
            <Quote
              className="pointer-events-none absolute top-6 right-6 h-24 w-24 opacity-[0.07]"
              style={{ color: styles.accent }}
            />
            <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-start">
              <div
                className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full"
                style={{ backgroundColor: styles.accent }}
              >
                <Quote className="h-7 w-7 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="mb-6 font-display text-2xl font-bold leading-[1.15] tracking-tight text-ink md:text-[1.75rem]">
                  &ldquo;{study.quote}&rdquo;
                </p>
                <div>
                  <div
                    className="text-xs font-bold uppercase tracking-[0.28em]"
                    style={{ color: styles.accent }}
                  >
                    {study.author}
                  </div>
                  <div className="mt-1 text-xs font-bold uppercase tracking-[0.22em] text-slate-400">
                    {study.authorRole}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
