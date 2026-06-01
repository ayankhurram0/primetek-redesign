"use client"
import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import {
    ArrowRight,
    Search,
    Activity,
    TrendingUp,
    FileSearch,
    ShieldCheck,
    Users,
    BarChart3
} from "lucide-react";

import Link from "next/link";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const renderServiceIllustration = (idx: number, color: string) => {
    switch (idx) {
        case 0: // Revenue Intelligence & Reporting (Red/Wavy Chart)
            return (
                <div className="w-full h-full relative flex items-center justify-center px-6">
                    {/* Background Grid Lines */}
                    <div className="absolute inset-0 opacity-5 flex flex-col justify-between py-6 px-4 pointer-events-none">
                        <div className="border-b border-dashed border-white w-full" />
                        <div className="border-b border-dashed border-white w-full" />
                        <div className="border-b border-dashed border-white w-full" />
                    </div>
                    {/* Glowing chart path */}
                    <svg className="w-full h-24 overflow-visible" viewBox="0 0 300 100" fill="none">
                        <motion.path
                            d="M0 85 Q50 95 90 60 T180 50 T240 35 T300 55"
                            stroke={color}
                            strokeWidth="4"
                            strokeLinecap="round"
                            className="drop-shadow-[0_0_8px_rgba(228,43,54,0.4)]"
                            strokeDasharray="15 15"
                            animate={{ strokeDashoffset: [0, -60] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        />
                        {/* Shaded Area */}
                        <motion.path
                            d="M0 85 Q50 95 90 60 T180 50 T240 35 T300 55 L300 100 L0 100 Z"
                            fill={`url(#gradient-rev-${idx})`}
                            animate={{ opacity: [0.1, 0.25, 0.1] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        />
                        <defs>
                            <linearGradient id={`gradient-rev-${idx}`} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor={color} />
                                <stop offset="100%" stopColor="transparent" />
                            </linearGradient>
                        </defs>
                        {/* Pulsing Active Dot */}
                        <circle cx="240" cy="35" r="6" fill={color} className="animate-ping opacity-75" />
                        <circle cx="240" cy="35" r="5" fill="white" stroke={color} strokeWidth="3" />
                    </svg>
                    {/* Floating Info Pill */}
                    <motion.div 
                        className="absolute right-4 top-4 bg-white/5 border border-white/10 rounded-lg py-1.5 px-3 text-[10px] font-bold text-white flex items-center gap-1.5 backdrop-blur-md z-10"
                        animate={{ y: [0, -6, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                        <span>Live Leakage: $1.2M+</span>
                    </motion.div>
                </div>
            );
        case 1: // Claims & Reimbursement Optimization (Orange-Red/Routing Network)
            return (
                <div className="w-full h-full relative flex items-center justify-center px-6">
                    {/* Connection paths */}
                    <svg className="w-full h-24 overflow-visible" viewBox="0 0 300 100" fill="none">
                        {/* Connecting lines */}
                        <motion.path d="M50 50 L120 50" stroke="rgba(255,255,255,0.1)" strokeWidth="2" strokeDasharray="4 4" animate={{ strokeDashoffset: [0, -20] }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }} />
                        <motion.path d="M120 50 L200 20" stroke="rgba(255,255,255,0.1)" strokeWidth="2" strokeDasharray="4 4" animate={{ strokeDashoffset: [0, -20] }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }} />
                        <motion.path d="M120 50 L200 80" stroke="rgba(255,255,255,0.1)" strokeWidth="2" strokeDasharray="4 4" animate={{ strokeDashoffset: [0, -20] }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }} />

                        {/* Smart Flow Path */}
                        <path
                            d="M50 50 L120 50 Q160 35 200 20"
                            stroke={color}
                            strokeWidth="3"
                            strokeLinecap="round"
                            className="opacity-70"
                        />
                        <path
                            d="M120 50 L200 80"
                            stroke={color}
                            strokeWidth="3"
                            strokeLinecap="round"
                            className="opacity-40"
                        />

                        {/* Nodes */}
                        <circle cx="50" cy="50" r="14" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" />
                        <circle cx="50" cy="50" r="6" fill="rgba(255,255,255,0.4)" />

                        <circle cx="120" cy="50" r="18" fill="rgba(255,92,77,0.1)" stroke={color} strokeWidth="2" className="drop-shadow-[0_0_6px_rgba(255,92,77,0.3)]" />
                        <motion.circle cx="120" cy="50" r="8" fill={color} animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} />

                        <circle cx="200" cy="20" r="12" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" />
                        <circle cx="200" cy="20" r="5" fill="rgba(255,255,255,0.3)" />

                        <circle cx="200" cy="80" r="12" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" />
                        <circle cx="200" cy="80" r="5" fill="rgba(255,255,255,0.3)" />
                    </svg>
                    {/* Floating pill */}
                    <div className="absolute right-4 top-4 bg-white/5 border border-white/10 rounded-lg py-1.5 px-3 text-[10px] font-bold text-white flex items-center gap-1.5 backdrop-blur-md">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#ff5c4d]" />
                        <span>Optimized Routing</span>
                    </div>
                </div>
            );
        case 2: // Compliance & Audit Protection (Orange/Timeline Cadence)
            return (
                <div className="w-full h-full relative flex items-center justify-center px-6">
                    {/* Timeline line */}
                    <div className="absolute left-10 right-10 h-[2px] bg-white/10" />
                    <motion.div 
                        className="absolute left-10 w-[60%] h-[2px]" 
                        style={{ backgroundColor: color }} 
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    />

                    <div className="relative w-full flex justify-between items-center px-4">
                        {/* Milestone 1 */}
                        <div className="flex flex-col items-center gap-2 relative z-10">
                            <div className="w-10 h-10 rounded-full bg-[#0a0f1d] border-2 border-white/25 flex items-center justify-center text-xs font-bold text-white/50">
                                01
                            </div>
                            <span className="text-[9px] font-bold text-white/30 uppercase tracking-wider">Gap Scan</span>
                        </div>
                        {/* Milestone 2 */}
                        <motion.div 
                            className="flex flex-col items-center gap-2 relative z-10"
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <div
                                className="w-12 h-12 rounded-full border-2 flex items-center justify-center text-xs font-bold shadow-[0_0_15px_rgba(251,146,60,0.2)]"
                                style={{ backgroundColor: "#0a0f1d", borderColor: color, color: color }}
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                            </div>
                            <span className="text-[9px] font-bold uppercase tracking-wider" style={{ color: color }}>Audit Ready</span>
                        </motion.div>
                        {/* Milestone 3 */}
                        <div className="flex flex-col items-center gap-2 relative z-10">
                            <div className="w-10 h-10 rounded-full bg-[#0a0f1d] border-2 border-white/10 flex items-center justify-center text-xs font-bold text-white/20">
                                03
                            </div>
                            <span className="text-[9px] font-bold text-white/20 uppercase tracking-wider">Safe</span>
                        </div>
                    </div>
                </div>
            );
        case 3: // Patient & Operational Support Systems (Blue/Scheduler details)
            return (
                <div className="w-full h-full relative flex items-center justify-center px-6">
                    <motion.div 
                        className="w-full max-w-[280px] bg-white/[0.03] border border-white/10 rounded-xl p-3.5 flex flex-col gap-2.5 backdrop-blur-md relative overflow-hidden"
                        animate={{ y: [0, -6, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full blur-xl pointer-events-none" />

                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5">
                                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                        <line x1="16" y1="2" x2="16" y2="6" />
                                        <line x1="8" y1="2" x2="8" y2="6" />
                                        <line x1="3" y1="10" x2="21" y2="10" />
                                    </svg>
                                </div>
                                <div className="flex flex-col text-left">
                                    <span className="text-[10px] font-bold text-white">Daily Queue</span>
                                    <span className="text-[8px] text-white/40 uppercase tracking-wider">Operational Audit</span>
                                </div>
                            </div>
                            <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
                                Active
                            </span>
                        </div>

                        <div className="h-[1px] bg-white/5" />

                        <div className="flex items-center justify-between text-[10px]">
                            <span className="text-white/50">Next scheduled Sync:</span>
                            <span className="font-bold text-white flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                Today, 6:00 PM
                            </span>
                        </div>
                    </motion.div>
                </div>
            );
        case 4: // Pharmacy Growth & Performance Strategy (Green/Growth Bolt)
            return (
                <div className="w-full h-full relative flex items-center justify-center px-6">
                    <div className="w-full flex items-end justify-between h-20 gap-3 max-w-[240px]">
                        {[40, 55, 75, 60, 95].map((val, idx) => (
                            <div key={idx} className="flex-1 flex flex-col items-center gap-1.5">
                                <div className="w-full bg-white/5 rounded-t-md relative overflow-hidden" style={{ height: `${val}%` }}>
                                    <motion.div
                                        className="absolute bottom-0 left-0 right-0 rounded-t-md shadow-[0_0_10px_rgba(52,211,153,0.15)]"
                                        style={{ backgroundColor: idx === 4 ? color : `${color}40` }}
                                        animate={{ height: ['85%', '100%', '85%'] }}
                                        transition={{ duration: 1.5 + idx * 0.2, repeat: Infinity, ease: "easeInOut" }}
                                    />
                                </div>
                                <span className={`text-[8px] font-bold ${idx === 4 ? 'text-emerald-400' : 'text-white/20'}`}>M{idx + 1}</span>
                            </div>
                        ))}
                    </div>
                    {/* Floating Lightning Bolt Indicator */}
                    <motion.div
                        className="absolute right-6 top-2 w-8 h-8 rounded-full border flex items-center justify-center shadow-[0_0_12px_rgba(52,211,153,0.25)]"
                        style={{ backgroundColor: "#0a0f1d", borderColor: color, color: color }}
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                        </svg>
                    </motion.div>
                </div>
            );
        default:
            return null;
    }
};

export const ServicesSection: React.FC = () => {

    const sectionRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);
    const subHeadingRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const textRef = useRef<HTMLParagraphElement>(null);

    const services = [
        {
            title: "Revenue Intelligence & Reporting",
            tag: "REVENUE LOSS",
            tagColor: "text-red-500/90",
            dotColor: "bg-red-500/90",
            description: "Track reimbursement trends, identify underpayments, and uncover revenue leakage across all payers.",
            stat: "$1.2M+",
            statLabel: "leakage identified across client pharmacies",
            link: "Analyze Revenue",
            icon: <TrendingUp className="w-6 h-6 text-red-500/90" />,
            glow: "from-red-500/10 to-transparent",
            hoverClass: "hover:bg-red-500/15 hover:border-red-500/60 hover:shadow-[0_20px_80px_rgba(113,198,164,0.25)]",
            accentColor: "#e42b36"
        },
        {
            title: "Claims & Reimbursement Optimization",
            tag: "HIGH IMPACT",
            tagColor: "text-red-400/90",
            dotColor: "bg-orange-500",
            description: "Reduce claim errors, fix rejection patterns, and maximize reimbursement accuracy across PBMs.",
            stat: "Up to 18%",
            statLabel: "improvement in reimbursement accuracy",
            link: "Fix My Claims",
            icon: <FileSearch className="w-6 h-6 text-[#ff5c4d]" />,
            glow: "from-red-500/10 to-transparent",
            hoverClass: "hover:bg-[#ff5c4d]/15 hover:border-[#ff5c4d]/60 hover:shadow-[0_20px_80px_rgba(255,92,77,0.25)]",
            accentColor: "#ff5c4d"
        },
        {
            title: "Compliance & Audit Protection",
            tag: "RISK CONTROL",
            tagColor: "text-orange-400/90",
            dotColor: "bg-orange-400",
            description: "Identify compliance gaps early and maintain audit-ready documentation across all operations.",
            stat: "87%",
            statLabel: "reduction in audit exposure risk",
            link: "Check Audit Risk",
            icon: <ShieldCheck className="w-6 h-6 text-orange-400" />,
            glow: "from-orange-600/10 to-transparent",
            hoverClass: "hover:bg-orange-400/15 hover:border-orange-400/60 hover:shadow-[0_20px_80px_rgba(251,146,60,0.25)]",
            accentColor: "#fb923c"
        },
        {
            title: "Patient & Operational Support Systems",
            tag: "EFFICIENCY",
            tagColor: "text-blue-400/90",
            dotColor: "bg-blue-500",
            description: "Standardize workflows, reduce manual errors, and improve team productivity across locations.",
            stat: "30%",
            statLabel: "improvement in workflow efficiency",
            link: "Improve Operations",
            icon: <Users className="w-6 h-6 text-blue-400" />,
            glow: "from-blue-500/10 to-transparent",
            hoverClass: "hover:bg-blue-400/15 hover:border-blue-400/60 hover:shadow-[0_20px_80px_rgba(96,165,250,0.25)]",
            accentColor: "#60a5fa"
        },
        {
            title: "Pharmacy Growth & Performance Strategy",
            tag: "GROWTH",
            tagColor: "text-emerald-400/90",
            dotColor: "bg-emerald-500",
            description: "Optimize pricing, sourcing, and operational strategy to improve margins and long-term scalability.",
            stat: "+12-20%",
            statLabel: "margin optimization potential",
            link: "Grow My Pharmacy",
            icon: <BarChart3 className="w-6 h-6 text-emerald-400" />,
            glow: "from-emerald-500/10 to-transparent",
            hoverClass: "hover:bg-emerald-400/15 hover:border-emerald-400/60 hover:shadow-[0_20px_80px_rgba(52,211,153,0.25)]",
            accentColor: "#34d399"
        }
    ];

    useGSAP(() => {
        const targets = [headingRef.current, textRef.current].filter(Boolean);
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

        gsap.fromTo(".service-category-card",
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} className="relative w-full overflow-hidden font-montserrat">

            <div className="flex flex-col justify-center 2xl:py-30 px-12">
                <div className="relative z-10 w-full mt-20">
                    <div className="text-center mb-12 flex flex-col items-center">
                        <h2 ref={headingRef} className="text-5xl lg:text-6xl font-bold text-white mb-8 tracking-tight">
                            Operational Systems That Protect  <br />
                            <span className="text-teal-400">& Grow Pharmacy Revenue</span>
                        </h2>
                        <p ref={textRef} className="text-white/60 text-2xl max-w-4xl leading-relaxed">
                            We identify revenue leakage, reduce audit exposure, and optimize operations across your pharmacy using structured, data-driven systems.
                        </p>
                    </div>

                    <div className="flex flex-col gap-6">
                        {/* Top Row: 3 Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1800px] mx-auto w-full mb-6">
                            {services.slice(0, 3).map((service, idx) => (
                                <Link
                                    href="/services"
                                    key={idx}
                                    className={`service-category-card group relative bg-white/10 backdrop-blur-md border border-white/10 rounded-3xl p-6 transition-all duration-700 hover:-translate-y-2 hover:scale-[1.02] active:scale-[0.98] overflow-hidden ${service.hoverClass}`}
                                >
                                    <div className={`absolute inset-0 bg-gradient-to-br ${service.glow} opacity-10 group-hover:opacity-30 transition-all duration-700 pointer-events-none rounded-3xl`} />

                                    {/* Stylized Service Illustration Graphic */}
                                    <div className="w-full h-44 bg-white/[0.01] border border-white/5 rounded-2xl mb-6 relative overflow-hidden flex items-center justify-center shrink-0">
                                        {renderServiceIllustration(idx, service.accentColor)}
                                    </div>

                                    <div className="flex justify-between items-start mb-6">
                                        <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-white/10 transition-colors">
                                            {service.icon}
                                        </div>
                                        <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10 shrink-0">
                                            <div className={`w-1.5 h-1.5 rounded-full ${service.dotColor}`} />
                                            <span className={`text-[10px] font-bold tracking-widest ${service.tagColor}`}>{service.tag}</span>
                                        </div>
                                    </div>

                                    <h3 className="text-3xl font-bold text-white mb-2 group-hover:opacity-100 transition-colors">{service.title}</h3>
                                    <p className="text-white/40 text-xl leading-relaxed mb-6 h-10 line-clamp-2">
                                        {service.description}
                                    </p>

                                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 flex items-center justify-between">
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <div
                                                    className="w-4 h-4 rounded-full flex items-center justify-center"
                                                    style={{ backgroundColor: `${service.accentColor}25` }}
                                                >
                                                    <Search
                                                        className="w-2 h-2"
                                                        style={{ color: service.accentColor }}
                                                    />
                                                </div>
                                                <span className="text-xl font-bold " style={{ color: service.accentColor }}>{service.stat}</span>
                                            </div>
                                            <p className="text-[12px] text-white/30 uppercase font-medium leading-tight max-w-[120px]">
                                                {service.statLabel}
                                            </p>
                                        </div>
                                        <div
                                            className="flex items-center gap-2 text-base font-bold transition-all"
                                            style={{ color: service.accentColor }}
                                        >
                                            {service.link}
                                            <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform duration-300" />
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {/* Bottom Row: 2 Cards (Centered) */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[1300px] mx-auto w-full">
                            {services.slice(3, 5).map((service, idx) => (
                                <Link
                                    href="/services"
                                    key={idx}
                                    className={`service-category-card group relative bg-white/10 backdrop-blur-md border border-white/10 rounded-3xl p-6 transition-all duration-700 hover:-translate-y-2 hover:scale-[1.02] active:scale-[0.98] overflow-hidden ${service.hoverClass}`}
                                >
                                    <div className={`absolute inset-0 bg-gradient-to-br ${service.glow} opacity-10 group-hover:opacity-30 transition-all duration-700 pointer-events-none rounded-3xl`} />

                                    {/* Stylized Service Illustration Graphic */}
                                    <div className="w-full h-44 bg-white/[0.01] border border-white/5 rounded-2xl mb-6 relative overflow-hidden flex items-center justify-center shrink-0">
                                        {renderServiceIllustration(idx + 3, service.accentColor)}
                                    </div>

                                    <div className="flex justify-between items-start mb-6">
                                        <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-white/10 transition-colors">
                                            {service.icon}
                                        </div>
                                        <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10 shrink-0">
                                            <div className={`w-1.5 h-1.5 rounded-full ${service.dotColor}`} />
                                            <span className={`text-[10px] font-bold tracking-widest ${service.tagColor}`}>{service.tag}</span>
                                        </div>
                                    </div>

                                    <h3 className="text-3xl font-bold text-white mb-2 group-hover:opacity-100 transition-colors h-12 flex items-center">{service.title}</h3>
                                    <p className="text-white/40 text-xl leading-relaxed mb-6 h-10 line-clamp-2">
                                        {service.description}
                                    </p>

                                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 flex items-center justify-between">
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <div
                                                    className="w-4 h-4 rounded-full flex items-center justify-center"
                                                    style={{ backgroundColor: `${service.accentColor}25` }}
                                                >
                                                    <Activity
                                                        className="w-2 h-2"
                                                        style={{ color: service.accentColor }}
                                                    />
                                                </div>
                                                <span className="text-xl font-bold " style={{ color: service.accentColor }}>{service.stat}</span>
                                            </div>
                                            <p className="text-[12px] text-white/30 uppercase font-medium leading-tight max-w-[150px]">
                                                {service.statLabel}
                                            </p>
                                        </div>
                                        <div
                                            className="flex items-center gap-2 text-base font-bold transition-all"
                                            style={{ color: service.accentColor }}
                                        >
                                            {service.link}
                                            <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform duration-300" />
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
