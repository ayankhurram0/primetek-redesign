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
import { DecorativeBackground } from "./DecorativeBackground";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

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
            accentColor: "red-500/90"
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
        // Simple entrance animation instead of pinned scroll
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
        <section ref={sectionRef} className="relative w-full overflow-hidden">
            {/* Rich Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#020817] via-[#0a1122] to-[#020817] opacity-100" />
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_30%,rgba(113,198,164,0.08)_0%,transparent_50%)]" />
            <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_70%,rgba(59,130,246,0.08)_0%,transparent_50%)]" />

            <DecorativeBackground id="services" />

            <div className="flex flex-col justify-center py-20 px-12">
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
                                    className={`service-category-card group relative bg-[#0a1122]/40 backdrop-blur-3xl border border-white/10 rounded-3xl p-6 transition-all duration-700 hover:-translate-y-2 hover:scale-[1.02] active:scale-[0.98] flex flex-col justify-between h-[380px] ${service.hoverClass}`}
                                >
                                    <div className={`absolute inset-0 bg-gradient-to-br ${service.glow} opacity-10 group-hover:opacity-30 transition-all duration-700 pointer-events-none rounded-3xl`} />

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

                                    <div className="bg-[#050a14] rounded-2xl p-4 border border-white/5 flex items-center justify-between">
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <div className="w-4 h-4 bg-white/5 rounded-full flex items-center justify-center">
                                                    <Search className="w-2 h-2 text-white/40" />
                                                </div>
                                                <span className="text-xl font-bold text-white">{service.stat}</span>
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
                                    className={`service-category-card group relative bg-[#0a1122]/40 backdrop-blur-3xl border border-white/10 rounded-3xl p-6 transition-all duration-700 hover:-translate-y-2 hover:scale-[1.02] active:scale-[0.98] ${service.hoverClass}`}
                                >
                                    <div className={`absolute inset-0 bg-gradient-to-br ${service.glow} opacity-10 group-hover:opacity-30 transition-all duration-700 pointer-events-none rounded-3xl`} />

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

                                    <div className="bg-[#050a14] rounded-2xl p-4 border border-white/5 flex items-center justify-between">
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <div className="w-4 h-4 bg-white/5 rounded-full flex items-center justify-center">
                                                    <Activity className="w-2 h-2 text-white/40" />
                                                </div>
                                                <span className="text-xl font-bold text-white">{service.stat}</span>
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
