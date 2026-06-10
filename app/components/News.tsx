import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);
import {
  Activity,
  AlertTriangle,
  Monitor,
  AlertCircle,
  ShieldCheck,
  TrendingUp,
  DollarSign,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import auditCard from "@/src/assets/audit_card.png";
import thresholdsCard from "@/src/assets/thresholds_card.jpeg";
import gapsCard from "@/src/assets/gaps_card.jpeg";
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
  colorScheme?: {
    bg: string;
    border: string;
    icon: string;
    text: string;
  };
}

export const ALERTS: AlertItem[] = [
  {
    id: 'optumrx-cap',
    title: 'OptumRx 25% Therapeutic Class Cap Tracking',
    category: 'Audit Compliance',
    priority: 'High',
    description: 'Monitor and maintain compliance with OptumRx therapeutic class limits to prevent recoupments.',
    accentColor: 'text-red-500',
    colorScheme: {
      bg: 'from-red-500/20 to-red-600/15',
      border: 'border-red-500/40',
      icon: 'bg-red-500/30',
      text: 'text-red-400'
    },
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
    colorScheme: {
      bg: 'from-blue-500/20 to-blue-600/15',
      border: 'border-blue-500/40',
      icon: 'bg-blue-500/30',
      text: 'text-blue-400'
    },
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
    colorScheme: {
      bg: 'from-purple-500/20 to-purple-600/15',
      border: 'border-purple-500/40',
      icon: 'bg-purple-500/30',
      text: 'text-purple-400'
    },
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
    colorScheme: {
      bg: 'from-orange-500/20 to-orange-600/15',
      border: 'border-orange-500/40',
      icon: 'bg-orange-500/30',
      text: 'text-orange-400'
    },
    image: mtfCard,
    activities: [
      { text: 'New audit risk trigger identified', time: '2h ago' },
      { text: 'Documentation gap found', time: '1m ago' }
    ]
  },
  {
    id: 'cvs-aberrant-product',
    title: 'CVS Aberrant Product Alert',
    category: 'Audit Exposure Watch',
    priority: 'High',
    description: 'Potential high-risk product activity detected. Review dispensing patterns before audit exposure increases.',
    accentColor: 'text-red-500',
    colorScheme: {
      bg: 'from-red-500/20 to-red-600/15',
      border: 'border-red-500/40',
      icon: 'bg-red-500/30',
      text: 'text-red-400'
    },
    image: gapsCard,
    activities: [
      { text: 'Flagged: 3 NDC codes under review', time: 'Just now' },
      { text: 'CVS audit window: 14 days remaining', time: '2m ago' },
      { text: 'Dispensing pattern anomaly detected', time: '8m ago' }
    ]
  }
];

// --- Sub-components ---

const getColorTokens = (textClass: string = '') => {
  if (textClass.includes('blue')) return { border: 'border-blue-500/50', bg: 'bg-blue-500/20', border2: 'border-blue-500', text: 'text-blue-500', dotBg: 'bg-blue-500', dotShadow: 'shadow-[0_0_15px_#3b82f6]' };
  if (textClass.includes('purple')) return { border: 'border-purple-500/50', bg: 'bg-purple-500/20', border2: 'border-purple-500', text: 'text-purple-500', dotBg: 'bg-purple-500', dotShadow: 'shadow-[0_0_15px_#a855f7]' };
  if (textClass.includes('orange')) return { border: 'border-orange-500/50', bg: 'bg-orange-500/20', border2: 'border-orange-500', text: 'text-orange-500', dotBg: 'bg-orange-500', dotShadow: 'shadow-[0_0_15px_#f97316]' };
  return { border: 'border-red-500/50', bg: 'bg-red-500/20', border2: 'border-red-500', text: 'text-red-500', dotBg: 'bg-red-500', dotShadow: 'shadow-[0_0_15px_#ef4444]' };
};

function RadarAnimation({ icon: Icon, colorSchemeText }: { icon: any, colorSchemeText: string }) {
  const tokens = getColorTokens(colorSchemeText);
  return (
    <div className="relative w-80 h-80 flex items-center justify-center">
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full border ${tokens.border}`}
          initial={{ width: 120, height: 120, opacity: 0 }}
          animate={{
            width: 120 + i * 60,
            height: 120 + i * 60,
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
      <motion.div
        className={`z-10 ${tokens.bg} p-6 rounded-full border-2 ${tokens.border2}`}
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <Icon className={`w-16 h-16 ${tokens.text}`} />
      </motion.div>
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
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const dashboardRef = useRef<HTMLDivElement>(null);
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

  useGSAP(() => {
    const targets = [headingRef.current, dashboardRef.current].filter(Boolean);
    if (targets.length > 0) {
      gsap.fromTo(targets,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
  }, { scope: sectionRef });

  return (
    <div ref={sectionRef} className="space-y-8 2xl:px-24 2xl:py-20 relative z-10 overflow-hidden h-auto">
      {/* Ambient Red/Orange Background Glows with natural top/bottom blend */}
      <div className="absolute inset-0 pointer-events-none z-0" style={{ WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)', maskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)' }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[2000px] h-[1500px] bg-red-600/40 rounded-[100%] blur-[350px]" />
      </div>

      {/* Main Interaction Dashboard */}
      <section ref={dashboardRef} id="intelligence" className="animate-in fade-in duration-700">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 items-center">

          {/* Left Column: Headings & Sidebar Controls */}
          <div className="lg:col-span-4 w-full flex flex-col space-y-8">
            {/* Headings */}
            <section ref={headingRef} className="space-y-4 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-600/10 border border-red-500/50 text-red-500 text-sm font-bold uppercase tracking-[0.1em] shadow-[0_0_20px_rgba(239,68,68,0.15)]">
                Real-Time Alerts
              </div>
              <h2 className="text-5xl lg:text-6xl 2xl:text-7xl font-bold tracking-tight text-white leading-tight">
                Proactive Risk <br />
                <span className="text-red-600"> Alerts Included</span>
              </h2>
            </section>

            <div className="space-y-3 w-full">
              {ALERTS.map((alert) => (
                <button
                  key={alert.id}
                  onClick={() => {
                    setActiveAlertId(alert.id);
                    setIsAutoRotating(false);
                  }}
                  className={`w-full text-left p-4 rounded-xl transition-all duration-300 border-2 backdrop-blur-md group ${activeAlertId === alert.id
                    ? `bg-gradient-to-r ${alert.colorScheme?.bg} ${alert.colorScheme?.border} shadow-[0_0_30px_rgba(255,255,255,0.1)]`
                    : `bg-[#090E11]/95 border-white/10 hover:border-white/20 hover:bg-[#0E161B]`
                    }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-lg ${activeAlertId === alert.id ? alert.colorScheme?.icon + ' ' + alert.colorScheme?.text : 'bg-[#131B1E] text-white/70'}`}>
                      {React.createElement(getAlertIcon(alert.category, alert.priority), { className: "w-8 h-8" })}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className={`text-base font-semibold uppercase tracking-wider mb-1 ${activeAlertId === alert.id ? alert.colorScheme?.text : 'text-white/90'}`}>{alert.category}</div>
                      <div className="text-lg font-medium truncate text-white group-hover:text-white transition-colors">{alert.title}</div>
                    </div>
                    {activeAlertId === alert.id && (
                      <motion.div
                        layoutId="active-dot"
                        className={`w-8 w-8 rounded-full shadow-[0_0_8px_currentColor] ${alert.colorScheme?.text?.replace('text-', 'bg-') || 'bg-red-500'}`}
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
          </div>

          {/* Detail Panel */}
          <div className="lg:col-span-8 w-full h-[635px] relative mt-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeAlert.id}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4 }}
                className={`absolute inset-0 w-full h-full backdrop-blur-xl rounded-2xl overflow-hidden group border-2 bg-[#090E11] ${activeAlert.colorScheme?.border || 'border-white/30'} flex flex-col p-8`}
              >
                <img src={typeof activeAlert.image === 'string' ? activeAlert.image : activeAlert.image.src} alt={activeAlert.title} className="absolute inset-0 w-full h-full object-cover rounded-lg opacity-15 -z-10" />

                {/* Top Bar */}
                <div className={`absolute top-0 w-full left-0 right-0 p-4 px-6 backdrop-blur-md z-20 border-b bg-gradient-to-r ${activeAlert.colorScheme?.bg} ${activeAlert.colorScheme?.border}`}>
                  <div className='flex gap-10 items-center'>
                    <div className="flex gap-3">
                      <div className="w-4 h-4 rounded-full bg-white/30" />
                      <div className="w-4 h-4 rounded-full bg-white/30" />
                      <div className="w-4 h-4 rounded-full bg-white/30" />
                    </div>
                    <div>
                      <div className={`p-3 rounded-full flex gap-3 ${activeAlert.colorScheme?.icon || 'bg-white/20'} text-white backdrop-blur-sm relative`}>
                        <motion.div
                          className="absolute inset-0 rounded-full"
                          animate={{
                            scale: [1, 1.1, 1],
                            opacity: [0.5, 0.8, 0.5],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                          style={{
                            background: activeAlert.colorScheme?.text?.replace('text-', 'bg-')?.replace('400', '500') || 'bg-red-500',
                            filter: 'blur(8px)'
                          }}
                        />
                        {React.createElement(getAlertIcon(activeAlert.category, activeAlert.priority), { className: "w-6 h-6 relative z-10" })}
                        <div className="text-white text-xl font-semibold relative z-10">{activeAlert.category}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative w-full z-10 h-full flex flex-col pt-24">
                  <div className="flex flex-col lg:flex-row gap-8 items-center justify-between w-full h-full">

                    {/* Left Column: Text & Updates */}
                    <div className="flex-1 flex flex-col h-full justify-between pb-4">
                      <div className="space-y-4">
                        <h2 className="text-4xl lg:text-5xl font-sans font-bold text-white leading-tight">
                          {activeAlert.title}
                        </h2>
                        <p className="text-slate-400 leading-relaxed text-xl">
                          {activeAlert.description}
                        </p>
                      </div>

                      <div className="space-y-3 mt-auto">
                        <h3 className="text-xs font-bold tracking-[0.2em] text-slate-500 uppercase">Recent Updates</h3>
                        {activeAlert.activities.map((act, i) => {
                          const tokens = getColorTokens(activeAlert.colorScheme?.text);
                          return (
                            <div key={i} className={`flex items-center justify-between p-3 rounded-lg border ${activeAlert.colorScheme?.border || 'border-red-500/30'} ${activeAlert.colorScheme?.bg || 'bg-red-950/20'} group/item hover:border-white/40 hover:bg-white/10 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all`}>
                              <div className="flex items-center gap-3">
                                <div className={`w-3 h-3 rounded-full ${tokens.dotBg} ${tokens.dotShadow}`} />
                                <span className="text-xl font-medium text-white">{act.text}</span>
                              </div>
                              <span className="text-lg font-mono text-slate-500">{act.time}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Right Column: Radar Animation */}
                    <div className="hidden lg:flex w-96 flex-shrink-0 items-center justify-center h-full">
                      <RadarAnimation
                        icon={getAlertIcon(activeAlert.category, activeAlert.priority)}
                        colorSchemeText={activeAlert.colorScheme?.text || ''}
                      />
                    </div>

                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>
    </div>
  );
}
