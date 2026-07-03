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
import { ServiceIllustration } from "@/app/components/ServiceIllustration";

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
            description: "Real-time revenue tracking that flags underpayments and recovers lost income automatically.",
            stat: "$1.2M+",
            statLabel: "avg. underpayments recovered per store",
            link: "Analyze Revenue",
            icon: <TrendingUp className="w-6 h-6 text-[#FF4A3A]" />,
            glow: "from-red-500/10 to-transparent",
            hoverClass: "hover:bg-red-500/15 hover:border-red-500/60 hover:shadow-[0_20px_80px_rgba(113,198,164,0.25)]",
            accentColor: "#FF4A3A"
        },
        {
            title: "Claims & Reimbursement Optimization",
            tag: "HIGH IMPACT",
            tagColor: "text-red-400/90",
            dotColor: "bg-orange-500",
            description: "Automatically fix claim errors and maximize clean-claim reimbursement flow.",
            stat: "19%",
            statLabel: "increase in clean-claim recovery rates",
            link: "Fix My Claims",
            icon: <FileSearch className="w-6 h-6 text-[#FF6B00]" />,
            glow: "from-red-500/10 to-transparent",
            hoverClass: "hover:bg-[#FF6B00]/15 hover:border-[#FF6B00]/60 hover:shadow-[0_20px_80px_rgba(255,107,0,0.25)]",
            accentColor: "#FF6B00"
        },
        {
            title: "Compliance & Audit Protection",
            tag: "RISK CONTROL",
            tagColor: "text-orange-400/90",
            dotColor: "bg-orange-400",
            description: "Stay permanently audit-ready by detecting compliance gaps before they become liabilities.",
            stat: "87%",
            statLabel: "achieve full compliance within 30 days",
            link: "Check Audit Risk",
            icon: <ShieldCheck className="w-6 h-6 text-[#FF9F29]" />,
            glow: "from-orange-600/10 to-transparent",
            hoverClass: "hover:bg-[#FF9F29]/15 hover:border-[#FF9F29]/60 hover:shadow-[0_20px_80px_rgba(255,159,41,0.25)]",
            accentColor: "#FF9F29"
        },
        {
            title: "Patient & Operational Support Systems",
            tag: "EFFICIENCY",
            tagColor: "text-blue-400/90",
            dotColor: "bg-blue-500",
            description: "Streamline every pharmacy workflow from patient onboarding to team coordination.",
            stat: "30%",
            statLabel: "reduction in bottlenecks",
            link: "Improve Operations",
            icon: <Users className="w-6 h-6 text-[#3B82F6]" />,
            glow: "from-blue-500/10 to-transparent",
            hoverClass: "hover:bg-[#3B82F6]/15 hover:border-[#3B82F6]/60 hover:shadow-[0_20px_80px_rgba(59,130,246,0.25)]",
            accentColor: "#3B82F6"
        },
        {
            title: "Pharmacy Growth & Performance Strategy",
            tag: "GROWTH",
            tagColor: "text-emerald-400/90",
            dotColor: "bg-emerald-500",
            description: "Optimize procurement pricing and sourcing to grow your pharmacy's total margins.",
            stat: "+18%",
            statLabel: "margin amplification across departments",
            link: "Grow My Pharmacy",
            icon: <BarChart3 className="w-6 h-6 text-[#00C48C]" />,
            glow: "from-emerald-500/10 to-transparent",
            hoverClass: "hover:bg-[#00C48C]/15 hover:border-[#00C48C]/60 hover:shadow-[0_20px_80px_rgba(0,196,140,0.25)]",
            accentColor: "#00C48C"
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
                        <h2 ref={headingRef} className="text-5xl lg:text-6xl font-bold text-ink mb-8 tracking-tight">
                            Operational Systems That Protect  <br />
                            <span className="text-accent">& Grow Pharmacy Revenue</span>
                        </h2>
                        <p ref={textRef} className="text-ink-muted text-2xl max-w-4xl leading-relaxed">
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
                                    className={`service-category-card group relative bg-white border border-ink/10 rounded-3xl p-6 shadow-[0_4px_24px_rgba(6,43,52,0.06)] transition-all duration-700 hover:-translate-y-2 hover:scale-[1.02] active:scale-[0.98] overflow-hidden ${service.hoverClass}`}
                                >
                                    <div className={`absolute inset-0 bg-gradient-to-br ${service.glow} opacity-10 group-hover:opacity-30 transition-all duration-700 pointer-events-none rounded-3xl`} />

                                    {/* Stylized Service Illustration Graphic */}
                                    <div className="w-full h-44 bg-slate-50 border border-ink/10 rounded-2xl mb-6 relative overflow-hidden flex items-center justify-center shrink-0 p-3">
                                        <ServiceIllustration index={idx} color={service.accentColor} />
                                    </div>

                                    <div className="flex justify-between items-start mb-6">
                                        <div className="w-12 h-12 rounded-2xl bg-white/65 flex items-center justify-center border border-ink/10 group-hover:bg-white/10 transition-colors">
                                            {service.icon}
                                        </div>
                                        <div className="flex items-center gap-2 px-3 py-1 bg-white/65 rounded-full border border-ink/10 shrink-0">
                                            <div className={`w-1.5 h-1.5 rounded-full ${service.dotColor}`} />
                                            <span className={`text-[9px] font-bold tracking-widest ${service.tagColor}`}>{service.tag}</span>
                                        </div>
                                    </div>

                                    <h3 className="text-3xl font-bold text-ink mb-2 group-hover:opacity-100 transition-colors">{service.title}</h3>
                                    <p className="text-ink-subtle text-xl leading-relaxed mb-6 h-10 line-clamp-2">
                                        {service.description}
                                    </p>

                                    <div className="bg-slate-50 rounded-2xl p-4 border border-ink/10 flex items-center justify-between">
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
                                            <p className="text-[10px] text-ink-subtle uppercase font-medium leading-tight max-w-[120px]">
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
                                    className={`service-category-card group relative bg-white border border-ink/10 rounded-3xl p-6 shadow-[0_4px_24px_rgba(6,43,52,0.06)] transition-all duration-700 hover:-translate-y-2 hover:scale-[1.02] active:scale-[0.98] overflow-hidden ${service.hoverClass}`}
                                >
                                    <div className={`absolute inset-0 bg-gradient-to-br ${service.glow} opacity-10 group-hover:opacity-30 transition-all duration-700 pointer-events-none rounded-3xl`} />

                                    {/* Stylized Service Illustration Graphic */}
                                    <div className="w-full h-44 bg-slate-50 border border-ink/10 rounded-2xl mb-6 relative overflow-hidden flex items-center justify-center shrink-0 p-3">
                                        <ServiceIllustration index={idx + 3} color={service.accentColor} />
                                    </div>

                                    <div className="flex justify-between items-start mb-6">
                                        <div className="w-12 h-12 rounded-2xl bg-white/65 flex items-center justify-center border border-ink/10 group-hover:bg-white/10 transition-colors">
                                            {service.icon}
                                        </div>
                                        <div className="flex items-center gap-2 px-3 py-1 bg-white/65 rounded-full border border-ink/10 shrink-0">
                                            <div className={`w-1.5 h-1.5 rounded-full ${service.dotColor}`} />
                                            <span className={`text-[9px] font-bold tracking-widest ${service.tagColor}`}>{service.tag}</span>
                                        </div>
                                    </div>

                                    <h3 className="text-3xl font-bold text-ink mb-2 group-hover:opacity-100 transition-colors h-12 flex items-center">{service.title}</h3>
                                    <p className="text-ink-subtle text-xl leading-relaxed mb-6 h-10 line-clamp-2">
                                        {service.description}
                                    </p>

                                    <div className="bg-slate-50 rounded-2xl p-4 border border-ink/10 flex items-center justify-between">
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
                                            <p className="text-[10px] text-ink-subtle uppercase font-medium leading-tight max-w-[150px]">
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
