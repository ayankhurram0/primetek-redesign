"use client";

import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import {
  AlertTriangle,
  Monitor,
  ShieldCheck,
  TrendingUp,
  DollarSign,
  type LucideIcon,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import auditCard from '@/src/assets/audit_card.png';
import thresholdsCard from '@/src/assets/thresholds_card.jpeg';
import gapsCard from '@/src/assets/gaps_card.jpeg';
import mtfCard from '@/src/assets/mtf_card.png';
import type { StaticImageData } from 'next/image';

gsap.registerPlugin(ScrollTrigger);

type AlertThemeKey = 'red' | 'blue' | 'purple' | 'orange';

interface AlertTheme {
  cardGradient: string;
  cardBorder: string;
  iconBg: string;
  iconText: string;
  accentBar: string;
  panelBorder: string;
  panelOverlay: string;
  headerBg: string;
  badgeBg: string;
  badgeShadow: string;
  activityBg: string;
  activityBorder: string;
  activityHover: string;
  dotBg: string;
  dotShadow: string;
  radarBorder: string;
  radarBg: string;
  radarBorderSolid: string;
  radarText: string;
  glowRgb: string;
  categoryText: string;
}

const THEMES: Record<AlertThemeKey, AlertTheme> = {
  red: {
    cardGradient: 'bg-gradient-to-r from-red-500/35 to-red-600/25',
    cardBorder: 'border-red-400/55',
    iconBg: 'bg-red-500/25',
    iconText: 'text-red-600',
    accentBar: 'bg-red-500',
    panelBorder: 'border-red-300/70',
    panelOverlay: 'bg-gradient-to-br from-red-500/30 via-rose-200/45 to-white/55',
    headerBg: 'bg-gradient-to-r from-red-100/90 to-red-50/70',
    badgeBg: 'bg-red-500 text-white',
    badgeShadow: 'shadow-[0_0_24px_rgba(239,68,68,0.45)]',
    activityBg: 'bg-red-500/10',
    activityBorder: 'border-red-400/45',
    activityHover: 'hover:bg-red-500/15 hover:border-red-400/60',
    dotBg: 'bg-red-500',
    dotShadow: 'shadow-[0_0_12px_#ef4444]',
    radarBorder: 'border-red-500/50',
    radarBg: 'bg-red-500/20',
    radarBorderSolid: 'border-red-500',
    radarText: 'text-red-500',
    glowRgb: '239 68 68',
    categoryText: 'text-red-600',
  },
  blue: {
    cardGradient: 'bg-gradient-to-r from-blue-500/30 to-blue-600/20',
    cardBorder: 'border-blue-400/55',
    iconBg: 'bg-blue-500/25',
    iconText: 'text-blue-600',
    accentBar: 'bg-blue-500',
    panelBorder: 'border-blue-300/70',
    panelOverlay: 'bg-gradient-to-br from-blue-500/25 via-blue-200/40 to-white/55',
    headerBg: 'bg-gradient-to-r from-blue-100/90 to-blue-50/70',
    badgeBg: 'bg-blue-500 text-white',
    badgeShadow: 'shadow-[0_0_24px_rgba(59,130,246,0.45)]',
    activityBg: 'bg-blue-500/10',
    activityBorder: 'border-blue-400/45',
    activityHover: 'hover:bg-blue-500/15 hover:border-blue-400/60',
    dotBg: 'bg-blue-500',
    dotShadow: 'shadow-[0_0_12px_#3b82f6]',
    radarBorder: 'border-blue-500/50',
    radarBg: 'bg-blue-500/20',
    radarBorderSolid: 'border-blue-500',
    radarText: 'text-blue-500',
    glowRgb: '59 130 246',
    categoryText: 'text-blue-600',
  },
  purple: {
    cardGradient: 'bg-gradient-to-r from-purple-500/35 to-purple-600/25',
    cardBorder: 'border-purple-400/55',
    iconBg: 'bg-purple-500/25',
    iconText: 'text-purple-600',
    accentBar: 'bg-purple-500',
    panelBorder: 'border-purple-300/70',
    panelOverlay: 'bg-gradient-to-br from-purple-500/25 via-purple-200/40 to-white/55',
    headerBg: 'bg-gradient-to-r from-purple-100/90 to-purple-50/70',
    badgeBg: 'bg-purple-500 text-white',
    badgeShadow: 'shadow-[0_0_24px_rgba(168,85,247,0.45)]',
    activityBg: 'bg-purple-500/10',
    activityBorder: 'border-purple-400/45',
    activityHover: 'hover:bg-purple-500/15 hover:border-purple-400/60',
    dotBg: 'bg-purple-500',
    dotShadow: 'shadow-[0_0_12px_#a855f7]',
    radarBorder: 'border-purple-500/50',
    radarBg: 'bg-purple-500/20',
    radarBorderSolid: 'border-purple-500',
    radarText: 'text-purple-500',
    glowRgb: '168 85 247',
    categoryText: 'text-purple-600',
  },
  orange: {
    cardGradient: 'bg-gradient-to-r from-orange-500/30 to-orange-600/20',
    cardBorder: 'border-orange-400/55',
    iconBg: 'bg-orange-500/25',
    iconText: 'text-orange-600',
    accentBar: 'bg-orange-500',
    panelBorder: 'border-orange-300/70',
    panelOverlay: 'bg-gradient-to-br from-orange-500/25 via-orange-200/40 to-white/55',
    headerBg: 'bg-gradient-to-r from-orange-100/90 to-orange-50/70',
    badgeBg: 'bg-orange-500 text-white',
    badgeShadow: 'shadow-[0_0_24px_rgba(249,115,22,0.45)]',
    activityBg: 'bg-orange-500/10',
    activityBorder: 'border-orange-400/45',
    activityHover: 'hover:bg-orange-500/15 hover:border-orange-400/60',
    dotBg: 'bg-orange-500',
    dotShadow: 'shadow-[0_0_12px_#f97316]',
    radarBorder: 'border-orange-500/50',
    radarBg: 'bg-orange-500/20',
    radarBorderSolid: 'border-orange-500',
    radarText: 'text-orange-500',
    glowRgb: '249 115 22',
    categoryText: 'text-orange-600',
  },
};

export interface AlertItem {
  id: string;
  title: string;
  category: string;
  priority: 'High' | 'Medium' | 'Low';
  description: string;
  activities: { text: string; time: string }[];
  accentColor: string;
  image: string | StaticImageData;
  theme: AlertThemeKey;
}

export const ALERTS: AlertItem[] = [
  {
    id: 'optumrx-cap',
    title: 'OptumRx 25% Therapeutic Class Cap Tracking',
    category: 'Audit Compliance',
    priority: 'High',
    description: 'Monitor and maintain compliance with OptumRx therapeutic class limits to prevent recoupments.',
    accentColor: 'text-red-500',
    theme: 'red',
    image: auditCard,
    activities: [
      { text: 'Therapeutic class limits approaching 22%', time: '2h ago' },
      { text: 'Audit probability increased by 12%', time: '4h ago' },
    ],
  },
  {
    id: 'mtf-mtp-detection',
    title: 'MTF / MTP Claims Issue Detection',
    category: 'Revenue Optimization',
    priority: 'High',
    description: 'Proactive detection of MTF and MTP claim issues before they impact your backend revenue.',
    accentColor: 'text-brand-red',
    theme: 'blue',
    image: thresholdsCard,
    activities: [
      { text: 'MTF leakage detected in class B', time: '30m ago' },
      { text: 'Reimbursement variance flagged', time: '2h ago' },
    ],
  },
  {
    id: 'reimbursement-flagging',
    title: 'Reimbursement Irregularity Flagging',
    category: 'Financial Risk',
    priority: 'High',
    description: 'Identify and flag reimbursement patterns that deviate from expected PBM contracts.',
    accentColor: 'text-red-500',
    theme: 'purple',
    image: gapsCard,
    activities: [
      { text: 'Irregularity flagged in 4 claims', time: '1h ago' },
      { text: 'Contractual variance detected', time: '3h ago' },
    ],
  },
  {
    id: 'audit-risk-trigger',
    title: 'Audit Risk Trigger Identification',
    category: 'Revenue Recovery',
    priority: 'High',
    description: 'Spotting the specific triggers that lead to PBM audits and financial exposure.',
    accentColor: 'text-brand-red',
    theme: 'orange',
    image: mtfCard,
    activities: [
      { text: 'New audit risk trigger identified', time: '2h ago' },
      { text: 'Documentation gap found', time: '1m ago' },
    ],
  },
  {
    id: 'cvs-aberrant-product',
    title: 'CVS Aberrant Product Alert',
    category: 'Audit Exposure Watch',
    priority: 'High',
    description: 'Potential high-risk product activity detected. Review dispensing patterns before audit exposure increases.',
    accentColor: 'text-red-500',
    theme: 'red',
    image: gapsCard,
    activities: [
      { text: 'Flagged: 3 NDC codes under review', time: 'Just now' },
      { text: 'CVS audit window: 14 days remaining', time: '2m ago' },
      { text: 'Dispensing pattern anomaly detected', time: '8m ago' },
    ],
  },
];

function getImageSrc(image: string | StaticImageData): string {
  return typeof image === 'string' ? image : image.src;
}

function RadarAnimation({ icon: Icon, theme }: { icon: LucideIcon; theme: AlertTheme }) {
  return (
    <div className="relative w-72 h-72 flex items-center justify-center">
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full border-2 ${theme.radarBorder}`}
          initial={{ width: 100, height: 100, opacity: 0 }}
          animate={{
            width: 100 + i * 55,
            height: 100 + i * 55,
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.5,
            ease: 'linear',
          }}
        />
      ))}
      <motion.div
        className={`z-10 ${theme.radarBg} p-6 rounded-full border-2 ${theme.radarBorderSolid}`}
        style={{ boxShadow: `0 0 30px rgba(${theme.glowRgb} / 0.35)` }}
        animate={{ scale: [1, 1.12, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Icon className={`w-14 h-14 ${theme.radarText}`} />
      </motion.div>
    </div>
  );
}

const getAlertIcon = (category: string): LucideIcon => {
  switch (category) {
    case 'Audit Compliance':
      return AlertTriangle;
    case 'Revenue Optimization':
      return TrendingUp;
    case 'Financial Risk':
      return DollarSign;
    case 'Revenue Recovery':
      return ShieldCheck;
    default:
      return Monitor;
  }
};

function AlertDetailContent({ alert }: { alert: AlertItem }) {
  const theme = THEMES[alert.theme];
  const Icon = getAlertIcon(alert.category);
  const imageSrc = getImageSrc(alert.image);

  return (
    <>
      {/* Background layers */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <img
          src={imageSrc}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-[0.28]"
        />
        <div className={`absolute inset-0 ${theme.panelOverlay}`} />
      </div>

      {/* Top bar */}
      <div className={`relative z-20 flex shrink-0 items-center gap-8 border-b px-6 py-4 ${theme.headerBg} ${theme.panelBorder}`}>
        <div className="flex gap-2.5">
          <div className="h-3.5 w-3.5 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.9)] ring-1 ring-white/80" />
          <div className="h-3.5 w-3.5 rounded-full bg-white/80 shadow-[0_0_8px_rgba(255,255,255,0.7)]" />
          <div className="h-3.5 w-3.5 rounded-full bg-white/80 shadow-[0_0_8px_rgba(255,255,255,0.7)]" />
        </div>
        <div className={`inline-flex items-center gap-2.5 rounded-full px-5 py-2.5 text-base font-semibold ${theme.badgeBg} ${theme.badgeShadow}`}>
          <Icon className="h-5 w-5 shrink-0" />
          <span>{alert.category}</span>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-1 flex-col gap-6 overflow-hidden p-8 pt-6 lg:flex-row lg:items-stretch lg:justify-between">
        <div className="flex flex-1 flex-col justify-between gap-6">
          <div className="space-y-4">
            <h3 className="font-display text-4xl font-bold leading-tight text-ink lg:text-5xl">
              {alert.title}
            </h3>
            <p className="text-xl leading-relaxed text-ink-muted">{alert.description}</p>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-ink-subtle">Recent Updates</h4>
            {alert.activities.map((act, i) => (
              <div
                key={`${alert.id}-activity-${i}`}
                className={`flex items-center justify-between rounded-lg border p-3 transition-all ${theme.activityBg} ${theme.activityBorder} ${theme.activityHover}`}
              >
                <div className="flex items-center gap-3">
                  <div className={`h-3 w-3 shrink-0 rounded-full ${theme.dotBg} ${theme.dotShadow}`} />
                  <span className="text-lg font-medium text-ink">{act.text}</span>
                </div>
                <span className="shrink-0 pl-4 font-mono text-base text-ink-subtle">{act.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: image + radar overlay */}
        <div className="relative hidden w-80 shrink-0 items-center justify-center lg:flex">
          <div className="relative flex h-72 w-full items-center justify-center">
            <img
              src={imageSrc}
              alt=""
              className="absolute inset-0 h-full w-full rounded-xl object-contain opacity-80"
              aria-hidden
            />
            <RadarAnimation key={alert.id} icon={Icon} theme={theme} />
          </div>
        </div>
      </div>
    </>
  );
}

export default function IntelligenceDashboard() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const dashboardRef = useRef<HTMLDivElement>(null);
  const [activeAlertId, setActiveAlertId] = useState(ALERTS[4].id);
  const [isAutoRotating, setIsAutoRotating] = useState(true);

  const activeAlert = ALERTS.find((a) => a.id === activeAlertId) ?? ALERTS[0];
  const activeIndex = ALERTS.findIndex((a) => a.id === activeAlertId);

  useEffect(() => {
    if (!isAutoRotating) return;
    const interval = setInterval(() => {
      setActiveAlertId((prev) => {
        const currentIndex = ALERTS.findIndex((a) => a.id === prev);
        const nextIndex = (currentIndex + 1) % ALERTS.length;
        return ALERTS[nextIndex].id;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoRotating]);

  useGSAP(
    () => {
      const targets = [headingRef.current, dashboardRef.current].filter(Boolean);
      if (targets.length > 0) {
        gsap.fromTo(
          targets,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    },
    { scope: sectionRef }
  );

  const selectAlert = (id: string) => {
    setActiveAlertId(id);
    setIsAutoRotating(false);
  };

  return (
    <div ref={sectionRef} className="relative z-10 h-auto space-y-8 overflow-hidden 2xl:py-20">
      {/* Ambient reddish background wash */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)',
          maskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)',
        }}
      >
        <div className="absolute top-[10%] left-[-5%] h-[850px] w-[1100px] rounded-[100%] bg-red-500/50 blur-[220px]" />
        <div className="absolute top-[25%] left-[15%] h-[600px] w-[750px] rounded-[100%] bg-rose-400/45 blur-[180px]" />
        <div className="absolute top-[40%] right-0 h-[550px] w-[700px] rounded-[100%] bg-red-400/35 blur-[200px]" />
      </div>

      <section ref={dashboardRef} id="intelligence" className="mx-auto w-[85%] animate-in fade-in duration-700">
        <div className="flex flex-col items-center gap-8 lg:grid lg:grid-cols-12">
          {/* Left column */}
          <div className="flex w-full flex-col space-y-8 lg:col-span-4">
            <section ref={headingRef} className="space-y-4 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-red-500/50 bg-red-600/10 px-4 py-2 text-sm font-bold uppercase tracking-[0.1em] text-red-500 shadow-[0_0_20px_rgba(239,68,68,0.15)]">
                Real-Time Alerts
              </div>
              <h2 className="text-5xl font-bold leading-tight tracking-tight text-ink lg:text-6xl 2xl:text-7xl">
                Proactive Risk <br />
                <span className="text-red-600"> Alerts Included</span>
              </h2>
            </section>

            <div className="w-full space-y-3">
              {ALERTS.map((alert) => {
                const isActive = activeAlertId === alert.id;
                const theme = THEMES[alert.theme];
                const Icon = getAlertIcon(alert.category);

                return (
                  <button
                    key={alert.id}
                    type="button"
                    onClick={() => selectAlert(alert.id)}
                    className={`group relative w-full overflow-hidden rounded-xl border-2 p-4 text-left backdrop-blur-md transition-all duration-300 ${
                      isActive
                        ? `${theme.cardGradient} ${theme.cardBorder} shadow-[0_4px_24px_rgba(239,68,68,0.12)]`
                        : 'border-red-200/60 bg-white/70 hover:border-red-300/70 hover:bg-white/85'
                    }`}
                  >
                    {isActive && (
                      <div className={`absolute top-3 bottom-3 left-0 w-1 rounded-full ${theme.accentBar}`} />
                    )}
                    <div className="flex items-center gap-4">
                      <div className={`shrink-0 rounded-lg p-2 ${theme.iconBg} ${theme.iconText} ${isActive ? '' : 'opacity-70'}`}>
                        <Icon className="h-8 w-8" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className={`mb-1 text-base font-semibold uppercase tracking-wider ${isActive ? theme.categoryText : 'text-ink/70'}`}>
                          {alert.category}
                        </div>
                        <div className="truncate text-lg font-medium text-ink">{alert.title}</div>
                      </div>
                    </div>
                  </button>
                );
              })}

              <div className="flex items-center justify-between px-2 pt-4 text-xs text-red-400/60">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {ALERTS.map((_, i) => (
                      <div
                        key={i}
                        className={`h-2 rounded-full transition-all duration-1000 ${
                          isAutoRotating && activeIndex === i
                            ? 'w-6 bg-red-500 shadow-[0_0_8px_#ef4444]'
                            : 'w-2 bg-red-500/30'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xl text-red-300">Auto-rotating</span>
                </div>
                {!isAutoRotating && (
                  <button
                    type="button"
                    onClick={() => setIsAutoRotating(true)}
                    className="font-semibold text-red-400 transition-colors hover:text-red-300 hover:underline"
                  >
                    Resume
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Detail panel */}
          <div className="relative mt-1 h-[635px] w-full lg:col-span-8">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeAlertId}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className={`absolute inset-0 flex flex-col overflow-hidden rounded-2xl border-2 backdrop-blur-xl ${THEMES[activeAlert.theme].panelBorder}`}
              >
                <AlertDetailContent alert={activeAlert} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>
    </div>
  );
}

