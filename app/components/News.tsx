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
    id: 'pbm-audit-risk',
    title: 'Would Your Pharmacy Pass a PBM Audit Today?',
    category: 'Audit Compliance',
    priority: 'High',
    description: 'Small documentation and compliance issues can trigger audits, recoupments, and long-term revenue loss.',
    accentColor: 'text-red-500',
    image: auditCard,
    activities: [
      { text: 'Documentation gaps detected in 3 key areas', time: '2h ago' },
      { text: 'Audit probability increased by 47%', time: '4h ago' }
    ]
  },
  {
    id: 'pbm-thresholds',
    title: 'Are PBM Thresholds Quietly Reducing Your Reimbursements?',
    category: 'Revenue Optimization',
    priority: 'High',
    description: 'Minor inefficiencies in workflow and reporting often lead to major financial and compliance risks.',
    accentColor: 'text-brand-red',
    image: thresholdsCard,
    activities: [
      { text: 'Therapeutic class limits exceeded by 23%', time: '30m ago' },
      { text: 'Adherence benchmarks below threshold by 18%', time: '2h ago' }
    ]
  },
  {
    id: 'operational-gaps',
    title: 'Are Small Operational Gaps Creating Significant Financial Exposure?',
    category: 'Financial Risk',
    priority: 'High',
    description: 'Many pharmacies unknowingly exceed PBM thresholds — increasing audit risk and reducing profitability.',
    accentColor: 'text-red-500',
    image: gapsCard,
    activities: [
      { text: 'Workflow inefficiency costing $12.4K monthly', time: '1h ago' },
      { text: 'Compliance exposure identified in 2 departments', time: '3h ago' }
    ]
  },
  {
    id: 'backend-revenue',
    title: 'Backend Revenue Control',
    category: 'Revenue Recovery',
    priority: 'High',
    description: 'MTF Revenue Leakage Control: If you are not actively tracking or disputing MTF payments, you are silently losing backend revenue.',
    accentColor: 'text-brand-red',
    image: mtfCard,
    activities: [
      { text: 'Unreconciled MTF payments: $8,200', time: '45m ago' },
      { text: 'Revenue leakage detected in 4 categories', time: '2h ago' },
      { text: 'New activity', time: '1m ago' }
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

// Function to get appropriate icon based on alert category and priority
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
    <div className="space-y-16 2xl:px-24 2xl:py-20 relative overflow-hidden min-h-screen">
      {/* Decorative Elements - Top Right */}
      <div className="absolute -top-20 -right-20 w-[500px] h-[500px] pointer-events-none z-0 opacity-80">
        <svg className="w-full h-full" viewBox="0 0 500 500" fill="none">
          <path
            d="M500 0 C250 0, 250 250, 0 250"
            stroke="url(#news-gradient-tr)"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M500 80 C300 80, 300 300, 80 300"
            stroke="url(#news-gradient-tr)"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            opacity="0.6"
          />
          <path
            d="M500 160 C350 160, 350 350, 160 350"
            stroke="url(#news-gradient-tr)"
            strokeWidth="1"
            fill="none"
            strokeLinecap="round"
            opacity="0.4"
          />
          {[...Array(8)].map((_, i) => (
            <circle
              key={`tr-${i}`}
              cx={450 - i * 35}
              cy={30 + i * 25}
              r="3"
              fill="#ef4444"
              opacity={0.6 + i * 0.05}
            />
          ))}
          <defs>
            <linearGradient id="news-gradient-tr" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ef4444" stopOpacity="1" />
              <stop offset="50%" stopColor="#ef4444" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Decorative Elements - Bottom Left */}
      <div className="absolute -bottom-20 -left-20 w-[500px] h-[500px] pointer-events-none z-0 opacity-80">
        <svg className="w-full h-full" viewBox="0 0 500 500" fill="none">
          <path
            d="M0 500 C250 500, 250 250, 500 250"
            stroke="url(#news-gradient-bl)"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M0 420 C200 420, 200 200, 420 200"
            stroke="url(#news-gradient-bl)"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            opacity="0.6"
          />
          <path
            d="M0 340 C150 340, 150 150, 340 150"
            stroke="url(#news-gradient-bl)"
            strokeWidth="1"
            fill="none"
            strokeLinecap="round"
            opacity="0.4"
          />
          {[...Array(8)].map((_, i) => (
            <circle
              key={`bl-${i}`}
              cx={30 + i * 35}
              cy={470 - i * 25}
              r="3"
              fill="#ef4444"
              opacity={0.6 + i * 0.05}
            />
          ))}
          <defs>
            <linearGradient id="news-gradient-bl" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ef4444" stopOpacity="1" />
              <stop offset="50%" stopColor="#ef4444" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Headings */}
      <section className="space-y-4 text-center lg:text-left">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-600/10 border border-red-500/50 text-red-500 text-xl font-bold uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(239,68,68,0.15)]">
          Critical Insights
        </div>
        <h2 className="text-6xl 2xl:text-6xl xl:text-8xl font-bold tracking-tight text-white leading-tight">
          Pharmacy Compliance <br />
          <span className="text-white">& </span><span className="text-red-600">Revenue Performance</span>
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
                    <div className="text-xs font-medium truncate text-white group-hover:text-red-100 transition-colors">{alert.title}</div>
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
          <div className="lg:col-span-8 w-full bg-gradient-to-br from-red-950/30 to-blue-950/40 backdrop-blur-xl rounded-2xl p-8 min-h-[500px] relative overflow-hidden group border-2 border-red-500/60 flex flex-col justify-end items-end">
            <img src={typeof activeAlert.image === 'string' ? activeAlert.image : activeAlert.image.src} alt={activeAlert.title} className="absolute inset-0 w-full h-full object-cover rounded-lg opacity-10 -z-10" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/20 blur-[100px] rounded-full -mr-20 -mt-20 group-hover:bg-red-600/30 transition-colors" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-900/10 blur-[80px] rounded-full -ml-10 -mb-10" />
            <div className="flex-1 bg-red-500/40 absolute top-0 w-full right-0 p-4 px-6">
              <div className='flex gap-10 items-center'>
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
            <div className="relative z-10 h-full flex flex-col">
              <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start justify-between">
                <div className="space-y-6 flex-1">
                  <h2 className="text-5xl font-sans font-bold text-white leading-tight">
                    {activeAlert.title}
                  </h2>
                  <p className="text-slate-400 leading-relaxed text-2xl">
                    {activeAlert.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
