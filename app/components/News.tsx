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

type AlertThemeKey = 'red' | 'blue' | 'purple' | 'orange' | 'teal';

interface AlertTheme {
  cardGradient: string;
  cardBorder: string;
  iconBg: string;
  iconText: string;
  accentBar: string;
  panelBorder: string;
  panelOverlay: string;
  panelScrim: string;
  imageOpacity: string;
  headerBg: string;
  badgeBg: string;
  badgeShadow: string;
  activityBg: string;
  activityBorder: string;
  activityHover: string;
  titleText: string;
  bodyText: string;
  mutedText: string;
  activityText: string;
  activityTime: string;
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
    cardGradient: 'bg-white',
    cardBorder: 'border-red-400',
    iconBg: 'bg-red-50',
    iconText: 'text-red-600',
    accentBar: 'bg-red-500',
    panelBorder: 'border-red-300/70',
    panelOverlay: 'bg-gradient-to-br from-red-500/35 via-rose-100/55 to-white/70',
    panelScrim: 'bg-gradient-to-r from-white/70 via-white/35 to-transparent lg:via-white/25',
    imageOpacity: 'opacity-[0.32]',
    headerBg: 'bg-gradient-to-r from-red-100/95 to-red-50/90',
    badgeBg: 'bg-red-500 text-white',
    badgeShadow: 'shadow-[0_0_24px_rgba(239,68,68,0.45)]',
    activityBg: 'bg-white/80',
    activityBorder: 'border-red-400/45',
    activityHover: 'hover:bg-white/95 hover:border-red-400/60',
    titleText: '!text-ink',
    bodyText: 'text-ink/80',
    mutedText: 'text-ink/60',
    activityText: 'text-ink',
    activityTime: 'text-ink/55',
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
    cardGradient: 'bg-white',
    cardBorder: 'border-blue-400',
    iconBg: 'bg-blue-50',
    iconText: 'text-blue-600',
    accentBar: 'bg-blue-500',
    panelBorder: 'border-blue-300/70',
    panelOverlay: 'bg-gradient-to-br from-blue-500/30 via-blue-100/55 to-white/70',
    panelScrim: 'bg-gradient-to-r from-white/70 via-white/35 to-transparent lg:via-white/25',
    imageOpacity: 'opacity-[0.32]',
    headerBg: 'bg-gradient-to-r from-blue-100/95 to-blue-50/90',
    badgeBg: 'bg-blue-500 text-white',
    badgeShadow: 'shadow-[0_0_24px_rgba(59,130,246,0.45)]',
    activityBg: 'bg-white/80',
    activityBorder: 'border-blue-400/45',
    activityHover: 'hover:bg-white/95 hover:border-blue-400/60',
    titleText: '!text-ink',
    bodyText: 'text-ink/80',
    mutedText: 'text-ink/60',
    activityText: 'text-ink',
    activityTime: 'text-ink/55',
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
    cardGradient: 'bg-white',
    cardBorder: 'border-purple-400',
    iconBg: 'bg-purple-50',
    iconText: 'text-purple-600',
    accentBar: 'bg-purple-500',
    panelBorder: 'border-purple-300/70',
    panelOverlay: 'bg-gradient-to-br from-purple-500/28 via-purple-100/55 to-white/70',
    panelScrim: 'bg-gradient-to-r from-white/70 via-white/35 to-transparent lg:via-white/25',
    imageOpacity: 'opacity-[0.32]',
    headerBg: 'bg-gradient-to-r from-purple-100/95 to-purple-50/90',
    badgeBg: 'bg-purple-500 text-white',
    badgeShadow: 'shadow-[0_0_24px_rgba(168,85,247,0.45)]',
    activityBg: 'bg-white/80',
    activityBorder: 'border-purple-400/45',
    activityHover: 'hover:bg-white/95 hover:border-purple-400/60',
    titleText: '!text-ink',
    bodyText: 'text-ink/80',
    mutedText: 'text-ink/60',
    activityText: 'text-ink',
    activityTime: 'text-ink/55',
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
    cardGradient: 'bg-white',
    cardBorder: 'border-orange-400',
    iconBg: 'bg-orange-50',
    iconText: 'text-orange-600',
    accentBar: 'bg-orange-500',
    panelBorder: 'border-orange-300/70',
    panelOverlay: 'bg-gradient-to-br from-orange-500/30 via-orange-100/55 to-white/70',
    panelScrim: 'bg-gradient-to-r from-white/70 via-white/35 to-transparent lg:via-white/25',
    imageOpacity: 'opacity-[0.32]',
    headerBg: 'bg-gradient-to-r from-orange-100/95 to-orange-50/90',
    badgeBg: 'bg-orange-500 text-white',
    badgeShadow: 'shadow-[0_0_24px_rgba(249,115,22,0.45)]',
    activityBg: 'bg-white/80',
    activityBorder: 'border-orange-400/45',
    activityHover: 'hover:bg-white/95 hover:border-orange-400/60',
    titleText: '!text-ink',
    bodyText: 'text-ink/80',
    mutedText: 'text-ink/60',
    activityText: 'text-ink',
    activityTime: 'text-ink/55',
    dotBg: 'bg-orange-500',
    dotShadow: 'shadow-[0_0_12px_#f97316]',
    radarBorder: 'border-orange-500/50',
    radarBg: 'bg-orange-500/20',
    radarBorderSolid: 'border-orange-500',
    radarText: 'text-orange-500',
    glowRgb: '249 115 22',
    categoryText: 'text-orange-600',
  },
  teal: {
    cardGradient: 'bg-white',
    cardBorder: 'border-teal-400',
    iconBg: 'bg-teal-50',
    iconText: 'text-teal-600',
    accentBar: 'bg-teal-500',
    panelBorder: 'border-teal-300/70',
    panelOverlay: 'bg-gradient-to-br from-teal-500/30 via-teal-100/55 to-white/70',
    panelScrim: 'bg-gradient-to-r from-white/70 via-white/35 to-transparent lg:via-white/25',
    imageOpacity: 'opacity-[0.32]',
    headerBg: 'bg-gradient-to-r from-teal-100/95 to-teal-50/90',
    badgeBg: 'bg-teal-500 text-white',
    badgeShadow: 'shadow-[0_0_24px_rgba(20,184,166,0.45)]',
    activityBg: 'bg-white/80',
    activityBorder: 'border-teal-400/45',
    activityHover: 'hover:bg-white/95 hover:border-teal-400/60',
    titleText: '!text-ink',
    bodyText: 'text-ink/80',
    mutedText: 'text-ink/60',
    activityText: 'text-ink',
    activityTime: 'text-ink/55',
    dotBg: 'bg-teal-500',
    dotShadow: 'shadow-[0_0_12px_#14b8a6]',
    radarBorder: 'border-teal-500/50',
    radarBg: 'bg-teal-500/20',
    radarBorderSolid: 'border-teal-500',
    radarText: 'text-teal-500',
    glowRgb: '20 184 166',
    categoryText: 'text-teal-600',
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
    accentColor: 'text-teal-600',
    theme: 'teal',
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

function DashboardPreview({ icon: Icon, theme }: { icon: LucideIcon; theme: AlertTheme }) {
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <div
        className="relative w-full max-w-[210px] rounded-2xl border border-white/80 bg-white/90 p-4 shadow-[0_18px_50px_rgba(15,23,42,0.1)] backdrop-blur-sm"
        style={{ borderColor: `rgba(${theme.glowRgb} / 0.28)` }}
      >
        <div className="mb-3 flex gap-1.5">
          <div className="h-2 w-2 rounded-full bg-slate-300/90" />
          <div className="h-2 w-2 rounded-full bg-slate-300/70" />
          <div className="h-2 w-2 rounded-full bg-slate-300/70" />
        </div>

        <div
          className="mb-4 flex h-[88px] items-center justify-center rounded-xl"
          style={{
            background: `linear-gradient(160deg, rgba(${theme.glowRgb} / 0.16) 0%, rgba(${theme.glowRgb} / 0.06) 100%)`,
          }}
        >
          <Icon className={`h-10 w-10 ${theme.radarText}`} strokeWidth={1.75} />
        </div>

        <div className="mb-3 space-y-2">
          <div className="h-2 w-full rounded-full bg-slate-200/90" />
          <div className="h-2 w-[72%] rounded-full bg-slate-200/70" />
        </div>

        <div className="flex h-[56px] items-end gap-1.5">
          {[36, 58, 46, 70, 52].map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-t-md"
              style={{
                height: `${h}%`,
                backgroundColor: `rgba(${theme.glowRgb} / ${0.28 + i * 0.08})`,
              }}
            />
          ))}
        </div>
      </div>
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
      {/* Background image + wash */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <img
          src={imageSrc}
          alt=""
          className={`absolute inset-0 h-full w-full object-cover ${theme.imageOpacity}`}
        />
        <div className={`absolute inset-0 ${theme.panelOverlay}`} />
        <div className={`absolute inset-0 ${theme.panelScrim}`} />
      </div>

      {/* Top bar */}
      <div className={`relative z-20 flex shrink-0 items-center border-b px-5 py-3.5 ${theme.headerBg} ${theme.panelBorder}`}>
        <div className="flex gap-2">
          <div className="h-3 w-3 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.9)] ring-1 ring-white/80" />
          <div className="h-3 w-3 rounded-full bg-white/80 shadow-[0_0_8px_rgba(255,255,255,0.7)]" />
          <div className="h-3 w-3 rounded-full bg-white/80 shadow-[0_0_8px_rgba(255,255,255,0.7)]" />
        </div>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold ${theme.badgeBg} ${theme.badgeShadow}`}>
            <Icon className="h-4 w-4 shrink-0" />
            <span>{alert.category}</span>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-1 flex-col gap-4 overflow-hidden p-6 pt-5 lg:flex-row lg:items-stretch lg:justify-between">
        <div className="flex flex-1 flex-col justify-between gap-4">
          <div className="space-y-3">
            <h3 className={`font-display text-3xl font-bold leading-tight lg:text-[2.5rem] ${theme.titleText}`}>
              {alert.title}
            </h3>
            <p className={`text-lg leading-relaxed lg:text-xl ${theme.bodyText}`}>
              {alert.description}
            </p>
          </div>

          {/* Recent Updates */}
          <div className="space-y-3">
            <h4 className={`text-sm font-bold uppercase tracking-[0.2em] ${theme.mutedText}`}>Recent Updates</h4>
            {alert.activities.map((act, i) => (
              <div
                key={`${alert.id}-activity-${i}`}
                className={`flex items-center justify-between rounded-xl border px-5 py-4 backdrop-blur-sm transition-all ${theme.activityBg} ${theme.activityBorder} ${theme.activityHover}`}
              >
                <div className="flex min-w-0 items-center gap-3.5">
                  <div className={`h-3.5 w-3.5 shrink-0 rounded-full ${theme.dotBg} ${theme.dotShadow}`} />
                  <span className={`truncate text-lg font-medium leading-snug ${theme.activityText}`}>{act.text}</span>
                </div>
                <span className={`shrink-0 pl-4 font-mono text-base leading-snug ${theme.activityTime}`}>{act.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: dashboard preview */}
        <div className="relative hidden w-72 shrink-0 items-center justify-center lg:flex">
          <DashboardPreview key={alert.id} icon={Icon} theme={theme} />
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
    <div ref={sectionRef} className="relative isolate z-10 w-full overflow-hidden py-16 lg:py-20 2xl:py-24">
      {/* Reference bg — opaque blush base, diffused glows, dot grid on right */}
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        {/* Solid base blocks global site texture from bleeding through */}
        <div className="absolute inset-0 bg-[#fff9f9]" />

        {/* Left heading wash */}
        <div className="absolute -left-[12%] top-[2%] h-[72%] w-[58%] rounded-full bg-[#fecdd3]/55 blur-[110px]" />
        <div className="absolute left-[4%] top-[18%] h-[48%] w-[38%] rounded-full bg-[#fda4af]/30 blur-[90px]" />

        {/* Right coral glow behind dashboard */}
        <div className="absolute -right-[6%] top-[8%] h-[78%] w-[52%] rounded-full bg-[#fca5a5]/35 blur-[130px]" />
        <div className="absolute right-[2%] bottom-[6%] h-[42%] w-[34%] rounded-full bg-[#fecaca]/28 blur-[100px]" />

        {/* Horizontal blush → white gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(90deg, #ffe4e6 0%, #fff1f2 18%, #fffbfb 42%, #ffffff 62%, #ffffff 82%, #fff5f5 100%)',
          }}
        />

        {/* Soft center lift — keeps middle airy like the ref */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 70% 85% at 58% 48%, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.55) 45%, transparent 78%)',
          }}
        />

        {/* Right-edge dot grid */}
        <div
          className="absolute inset-y-0 right-0 w-[42%]"
          style={{
            backgroundImage:
              'radial-gradient(rgba(248, 113, 113, 0.42) 1.15px, transparent 1.15px)',
            backgroundSize: '12px 12px',
            WebkitMaskImage:
              'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.25) 38%, rgba(0,0,0,0.9) 100%)',
            maskImage:
              'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.25) 38%, rgba(0,0,0,0.9) 100%)',
          }}
        />
      </div>

      <section ref={dashboardRef} id="intelligence" className="relative z-10 mx-auto w-[85%] animate-in fade-in duration-700">
        <div className="flex flex-col gap-6 lg:grid lg:grid-cols-12 lg:grid-rows-[auto_minmax(0,1fr)_auto] lg:gap-x-8 lg:gap-y-6">
          {/* Heading — left only */}
          <section
            ref={headingRef}
            className="space-y-4 text-center lg:col-start-1 lg:col-end-5 lg:row-start-1 lg:text-left"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-red-500/50 bg-red-600/10 px-4 py-2 text-sm font-bold uppercase tracking-[0.1em] text-red-500 shadow-[0_0_20px_rgba(239,68,68,0.15)]">
              Real-Time Alerts
            </div>
            <h2 className="text-5xl font-bold leading-tight tracking-tight text-ink lg:text-6xl 2xl:text-7xl">
              Proactive Risk <br />
              <span className="text-red-600"> Alerts Included</span>
            </h2>
          </section>

          {/* Alert list — left, middle row */}
          <div className="w-full space-y-3 lg:col-start-1 lg:col-end-5 lg:row-start-2">
            {ALERTS.map((alert) => {
              const isActive = activeAlertId === alert.id;
              const theme = THEMES[alert.theme];
              const Icon = getAlertIcon(alert.category);

              return (
                <button
                  key={alert.id}
                  type="button"
                  onClick={() => selectAlert(alert.id)}
                  className={`group relative w-full overflow-hidden rounded-xl border p-4 text-left transition-all duration-300 ${
                    isActive
                      ? `${theme.cardGradient} border-2 ${theme.cardBorder} shadow-md`
                      : 'border-slate-200/70 bg-white/95 shadow-sm hover:border-slate-300 hover:bg-white hover:shadow-md'
                  }`}
                  style={
                    isActive
                      ? { boxShadow: `0 10px 32px rgba(${theme.glowRgb} / 0.18)` }
                      : undefined
                  }
                >
                    <div className="flex items-center gap-4">
                      <div className={`shrink-0 rounded-lg p-2.5 ${theme.iconBg} ${theme.iconText}`}>
                        <Icon className="h-8 w-8" strokeWidth={1.75} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className={`mb-1.5 text-base font-bold uppercase tracking-wider ${theme.categoryText}`}>
                          {alert.category}
                        </div>
                        <div className="truncate text-lg font-semibold leading-snug text-ink">{alert.title}</div>
                      </div>
                    </div>
                </button>
              );
            })}
          </div>

          {/* Detail panel — spans heading + alert list rows only */}
          <div className="relative min-h-[420px] w-full lg:col-start-5 lg:col-end-13 lg:row-start-1 lg:row-end-3 lg:min-h-0">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeAlertId}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className={`absolute inset-0 flex flex-col overflow-hidden rounded-[1.75rem] border-2 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.08),0_10px_32px_rgba(248,113,113,0.1)] ${THEMES[activeAlert.theme].panelBorder}`}
              >
                <AlertDetailContent alert={activeAlert} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Auto-rotate — under alerts only, does not extend the panel */}
          <div className="flex items-center justify-between px-2 text-xs text-red-400/70 lg:col-start-1 lg:col-end-5 lg:row-start-3">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {ALERTS.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 rounded-full transition-all duration-1000 ${
                      isAutoRotating && activeIndex === i
                        ? 'w-5 bg-red-500 shadow-[0_0_8px_#ef4444]'
                        : 'w-1.5 bg-red-500/30'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-medium text-red-400/80">Auto-rotating</span>
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
      </section>
    </div>
  );
}

