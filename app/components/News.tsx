import React, { useState, useEffect } from 'react';
import {
  Activity,
  AlertTriangle,
  Monitor,
  AlertCircle,
  ShieldCheck,
  TrendingUp,
  DollarSign,
} from 'lucide-react';
import { motion } from 'framer-motion';
import auditCard from "@/src/assets/audit_card.png";
import thresholdsCard from "@/src/assets/thresholds_card.png";
import gapsCard from "@/src/assets/gaps_card.png";
import mtfCard from "@/src/assets/mtf_card.png";
import type { StaticImageData } from 'next/image';

export interface AlertItem {
  id: string;
  title: string;
  category: string;
  priority: 'High' | 'Medium' | 'Low';
  description: string;
  activities: { text: string; time: string }[];
  accentColor: string;
  image: string | StaticImageData;
}

export const ALERTS: AlertItem[] = [
  {
    id: 'optumrx-cap',
    title: 'OptumRx 25% Therapeutic Class Cap Tracking',
    category: 'Audit Compliance',
    priority: 'High',
    description: 'Monitor and maintain compliance with OptumRx therapeutic class limits to prevent recoupments.',
    accentColor: 'text-red-500',
    image: auditCard,
    activities: [
      { text: 'Therapeutic class limits approaching 22%', time: '2h ago' },
      { text: 'Audit probability increased by 12%', time: '4h ago' }
    ]
  },
  {
    id: 'mtf-mtp-detection',
    title: 'MTF / MTP Claims Issue Detection',
    category: 'Revenue Optimization',
    priority: 'High',
    description: 'Proactive detection of MTF and MTP claim issues before they impact your backend revenue.',
    accentColor: 'text-brand-red',
    image: thresholdsCard,
    activities: [
      { text: 'MTF leakage detected in class B', time: '30m ago' },
      { text: 'Reimbursement variance flagged', time: '2h ago' }
    ]
  },
  {
    id: 'reimbursement-flagging',
    title: 'Reimbursement Irregularity Flagging',
    category: 'Financial Risk',
    priority: 'High',
    description: 'Identify and flag reimbursement patterns that deviate from expected PBM contracts.',
    accentColor: 'text-red-500',
    image: gapsCard,
    activities: [
      { text: 'Irregularity flagged in 4 claims', time: '1h ago' },
      { text: 'Contractual variance detected', time: '3h ago' }
    ]
  },
  {
    id: 'audit-risk-trigger',
    title: 'Audit Risk Trigger Identification',
    category: 'Revenue Recovery',
    priority: 'High',
    description: 'Spotting the specific triggers that lead to PBM audits and financial exposure.',
    accentColor: 'text-brand-red',
    image: mtfCard,
    activities: [
      { text: 'New audit risk trigger identified', time: '2h ago' },
      { text: 'Documentation gap found', time: '1m ago' }
    ]
  }
];

// --- Sub-components ---

function RadarAnimation() {
  return (
    <div className="relative w-48 h-48 flex items-center justify-center">
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-red-500/50"
          initial={{ width: 40, height: 40, opacity: 0 }}
          animate={{
            width: 40 + i * 40,
            height: 40 + i * 40,
            opacity: [0, 0.4, 0]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "linear"
          }}
        />
      ))}
      <div className="z-10 bg-red-500/20 p-4 rounded-full border-2 border-red-500">
        <Activity className="w-8 h-8 text-red-500" />
      </div>
      <motion.div
        className="absolute w-2 h-2 bg-red-500 rounded-full shadow-[0_0_15px_#ef4444]"
        animate={{
          rotate: 360,
          x: [0, 60, 0, -60, 0],
          y: [0, 0, 60, 0, -60],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        style={{ originX: '0.5', originY: '0.5' }}
      />
    </div>
  );
}

const getAlertIcon = (category: string, priority: string) => {
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

export default function IntelligenceDashboard() {
  const [activeAlertId, setActiveAlertId] = useState(ALERTS[2].id);
  const [isAutoRotating, setIsAutoRotating] = useState(true);

  const activeAlert = ALERTS.find(a => a.id === activeAlertId) || ALERTS[0];

  useEffect(() => {
    if (!isAutoRotating) return;
    const interval = setInterval(() => {
      setActiveAlertId(prev => {
        const currentIndex = ALERTS.findIndex(a => a.id === prev);
        const nextIndex = (currentIndex + 1) % ALERTS.length;
        return ALERTS[nextIndex].id;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoRotating]);

  return (
    <div className="space-y-16 2xl:px-24 2xl:py-30 relative overflow-hidden h-auto">

      {/* Headings */}
      <section className="space-y-4 text-center lg:text-left">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-600/10 border border-red-500/50 text-red-500 text-xl font-bold uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(239,68,68,0.15)]">
          Real-Time Alerts for Critical Issues
        </div>
        <h2 className="text-6xl 2xl:text-6xl xl:text-8xl font-bold tracking-tight text-white leading-tight">
          Proactive Risk <br />
          <span className="text-red-600"> Alerts Included</span>
        </h2>
      </section>

      {/* Main Interaction Dashboard */}
      <section id="intelligence" className="animate-in fade-in duration-700">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 items-start">

          {/* Sidebar Controls */}
          <div className="lg:col-span-4 w-full space-y-3">
            {ALERTS.map((alert) => (
              <button
                key={alert.id}
                onClick={() => {
                  setActiveAlertId(alert.id);
                  setIsAutoRotating(false);
                }}
                className={`w-full text-left p-4 rounded-xl transition-all duration-300 border-2 backdrop-blur-sm group ${activeAlertId === alert.id
                  ? 'bg-red-950/40 border-red-500 shadow-[0_0_25px_rgba(239,68,68,0.3)]'
                  : 'bg-red-950/20 border-red-500/40 hover:border-red-400 hover:bg-red-950/30'
                  }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-lg ${activeAlertId === alert.id ? 'bg-red-600/20 text-red-400' : 'bg-red-950/30 text-red-500/60'}`}>
                    {React.createElement(getAlertIcon(alert.category, alert.priority), { className: "w-8 h-8" })}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-base font-semibold uppercase tracking-wider text-red-400/80 mb-1">{alert.category}</div>
                    <div className="text-lg font-medium truncate text-white group-hover:text-red-100 transition-colors">{alert.title}</div>
                  </div>
                  {activeAlertId === alert.id && (
                    <motion.div
                      layoutId="active-dot"
                      className="w-8 w-8 bg-red-500 rounded-full shadow-[0_0_8px_#ef4444]"
                    />
                  )}
                </div>
              </button>
            ))}

            <div className="pt-4 flex items-center justify-between px-2 text-xs text-red-400/60">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {[...Array(ALERTS.length)].map((_, i) => (
                    <div
                      key={i}
                      className={`h-2 rounded-full transition-all duration-1000 ${isAutoRotating && ALERTS.indexOf(activeAlert) === i ? 'w-6 bg-red-500 shadow-[0_0_8px_#ef4444]' : 'w-2 bg-red-500/30'
                        }`}
                    />
                  ))}
                </div>
                <span className="text-red-300 text-xl">Auto-rotating</span>
              </div>
              {!isAutoRotating && (
                <button onClick={() => setIsAutoRotating(true)} className="text-red-400 hover:text-red-300 hover:underline transition-colors font-semibold shadow-[0_0_10px_rgba(239,68,68,0.2)]">Resume</button>
              )}
            </div>
          </div>

          {/* Detail Panel */}
          <div className="lg:col-span-8 w-full backdrop-blur-xl rounded-2xl p-8 min-h-[500px] relative overflow-hidden group border-2 border-red-500/60 flex flex-col justify-end items-end">
            <img src={typeof activeAlert.image === 'string' ? activeAlert.image : activeAlert.image.src} alt={activeAlert.title} className="absolute inset-0 w-full h-full object-cover rounded-lg opacity-10 -z-10" />
            <div className="flex-1 absolute top-0 w-full right-0 p-4 px-6 bg-red-700/40">
              <div className='flex gap-10 items-center '>
                <div className="flex gap-3">
                  <div className="w-4 h-4 rounded-full bg-white/40" />
                  <div className="w-4 h-4 rounded-full bg-white/40" />
                  <div className="w-4 h-4 rounded-full bg-white/40" />
                </div>
                <div>
                  <div className={`p-3 rounded-full flex gap-3 ${activeAlertId === activeAlert.id ? 'bg-orange-600/20 text-red-400' : 'bg-red-950/30 text-red-500/60'}`}>
                    {React.createElement(getAlertIcon(activeAlert.category, activeAlert.priority), { className: "w-6 h-6" })}
                    <div className="text-white text-xl font-semibold">{activeAlert.category}</div>
                  </div>

                </div>
              </div>
              <div></div>
            </div>
            <div className="relative w-full z-10 h-full flex flex-col">
              <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start justify-between w-full">
                <div className="space-y-6 flex-1">
                  <h2 className="text-5xl font-sans font-bold text-white leading-tight">
                    {activeAlert.title}
                  </h2>
                  <p className="text-slate-400 leading-relaxed text-2xl">
                    {activeAlert.description}
                  </p>
                </div>
              </div>
              <div className="space-y-3 pt-4">
                <h3 className="text-xs font-bold tracking-[0.2em] text-slate-500 uppercase">Recent Updates</h3>
                {activeAlert.activities.map((act, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-red-500/30 bg-red-950/20 group/item hover:border-red-500 hover:bg-red-950/30 hover:shadow-[0_0_15px_rgba(239,68,68,0.2)] transition-all">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_6px_#ef4444]" />
                      <span className="text-xl font-medium text-white">{act.text}</span>
                    </div>
                    <span className="text-lg font-mono text-slate-500">{act.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
