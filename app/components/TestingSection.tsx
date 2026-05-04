"use client"
import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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

gsap.registerPlugin(ScrollTrigger);

export const TestingSection: React.FC = () => {

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
            dotColor: "bg-red-500",
            description: "Track reimbursement trends, identify underpayments, and uncover revenue leakage across all payers.",
            stat: "$1.2M+",
            statLabel: "leakage identified across client pharmacies",
            link: "Analyze Revenue",
            icon: <TrendingUp className="w-6 h-6 text-[#71c6a4]" />,
            glow: "from-emerald-500/10 to-transparent"
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
            glow: "from-red-500/10 to-transparent"
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
            glow: "from-orange-600/10 to-transparent"
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
            glow: "from-blue-500/10 to-transparent"
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
            glow: "from-emerald-500/10 to-transparent"
        }
    ];

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "+=400%",
                    pin: true,
                    pinSpacing: true,
                    scrub: 1,
                    invalidateOnRefresh: true,
                    refreshPriority: 10,
                },
            });

            // Initial State
            gsap.set([subHeadingRef.current, headingRef.current, textRef.current], { opacity: 0, y: 30 });
            gsap.set(".service-category-card", { opacity: 0, y: 50 });

            // Sequence
            tl.to(subHeadingRef.current, { opacity: 1, y: 0, duration: 1 })
                .to(headingRef.current, { opacity: 1, y: 0, duration: 1 }, "+=0.5")
                .to(textRef.current, { opacity: 1, y: 0, duration: 1 }, "+=0.5");

            // Progress through cards
            const cards = gsap.utils.toArray<HTMLElement>(".service-category-card");

            cards.forEach((card, i) => {
                tl.to(card, { opacity: 1, y: 0, duration: 1.5, ease: "power2.out" }, "+=0.5");
                if (i < cards.length - 1) {
                    tl.to({}, { duration: 1 });
                }
            });

            tl.to({}, { duration: 2 })
                .to([subHeadingRef.current, headingRef.current, textRef.current, ".service-category-card"], {
                    opacity: 0,
                    y: -50,
                    duration: 1.5,
                    stagger: 0.1
                });
        }, sectionRef.current || undefined);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="bg-[#020817] relative w-full overflow-hidden">
            {/* Decorative Glows */}
            <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

            <div ref={triggerRef} className="min-h-screen flex flex-col justify-center py-10 px-12">
                <div className="max-w-[1600px] mx-auto relative z-10 w-full mt-20">
                    <div className="text-center mb-12 flex flex-col items-center">
                        <div ref={subHeadingRef} className="flex items-center gap-4 mb-6">
                            <div className="h-[1px] w-8 bg-white/20" />
                            <span className="text-[#71c6a4] font-bold text-xs tracking-widest uppercase">OUR SERVICES</span>
                            <div className="h-[1px] w-8 bg-white/20" />
                        </div>
                        <h2 ref={headingRef} className="text-5xl lg:text-6xl font-bold text-white mb-8 tracking-tight">
                            Operational Systems That Protect  <br />
                            <span className="text-[#71c6a4]">& Grow Pharmacy Revenue</span>
                        </h2>
                        <p ref={textRef} className="text-white/60 text-lg max-w-2xl leading-relaxed">
                            We identify revenue leakage, reduce audit exposure, and optimize operations across your pharmacy using structured, data-driven systems.
                        </p>
                    </div>

                    <div className="flex flex-col gap-6">
                        {/* Top Row: 3 Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {services.slice(0, 3).map((service, idx) => (
                                <div
                                    key={idx}
                                    className="service-category-card group relative bg-[#0a1122]/40 backdrop-blur-3xl border border-white/10 rounded-3xl p-8 hover:border-[#71c6a4]/30 transition-all active:scale-[0.98]"
                                >
                                    <div className={`absolute inset-0 bg-gradient-to-br ${service.glow} opacity-20 pointer-events-none rounded-3xl`} />

                                    <div className="flex justify-between items-start mb-6">
                                        <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-[#71c6a4]/10 transition-colors">
                                            {service.icon}
                                        </div>
                                        <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10 shrink-0">
                                            <div className={`w-1.5 h-1.5 rounded-full ${service.dotColor}`} />
                                            <span className={`text-[10px] font-bold tracking-widest ${service.tagColor}`}>{service.tag}</span>
                                        </div>
                                    </div>

                                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#71c6a4] transition-colors">{service.title}</h3>
                                    <p className="text-white/40 text-[13px] leading-relaxed mb-6 h-10 line-clamp-2">
                                        {service.description}
                                    </p>

                                    <div className="bg-[#050a14] rounded-2xl p-4 border border-white/5 flex items-center justify-between">
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <div className="w-4 h-4 bg-[#71c6a4]/20 rounded-full flex items-center justify-center">
                                                    <Search className="w-2 h-2 text-[#71c6a4]" />
                                                </div>
                                                <span className="text-xl font-bold text-white">{service.stat}</span>
                                            </div>
                                            <p className="text-[9px] text-white/30 uppercase font-medium leading-tight max-w-[120px]">
                                                {service.statLabel}
                                            </p>
                                        </div>
                                        <button className="flex items-center gap-2 text-[#71c6a4] text-xs font-bold hover:gap-3 transition-all">
                                            {service.link}
                                            <ArrowRight size={14} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Bottom Row: 2 Cards (Centered) */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[1060px] mx-auto w-full">
                            {services.slice(3, 5).map((service, idx) => (
                                <div
                                    key={idx}
                                    className="service-category-card group relative bg-[#0a1122]/40 backdrop-blur-3xl border border-white/10 rounded-3xl p-6 hover:border-[#71c6a4]/30 transition-all active:scale-[0.98]"
                                >
                                    <div className={`absolute inset-0 bg-gradient-to-br ${service.glow} opacity-20 pointer-events-none rounded-3xl`} />

                                    <div className="flex justify-between items-start mb-6">
                                        <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-[#71c6a4]/10 transition-colors">
                                            {service.icon}
                                        </div>
                                        <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10 shrink-0">
                                            <div className={`w-1.5 h-1.5 rounded-full ${service.dotColor}`} />
                                            <span className={`text-[10px] font-bold tracking-widest ${service.tagColor}`}>{service.tag}</span>
                                        </div>
                                    </div>

                                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#71c6a4] transition-colors h-12 flex items-center">{service.title}</h3>
                                    <p className="text-white/40 text-[13px] leading-relaxed mb-6 h-10 line-clamp-2">
                                        {service.description}
                                    </p>

                                    <div className="bg-[#050a14] rounded-2xl p-4 border border-white/5 flex items-center justify-between">
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <div className="w-4 h-4 bg-[#71c6a4]/20 rounded-full flex items-center justify-center">
                                                    <Activity className="w-2 h-2 text-[#71c6a4]" />
                                                </div>
                                                <span className="text-xl font-bold text-white">{service.stat}</span>
                                            </div>
                                            <p className="text-[9px] text-white/30 uppercase font-medium leading-tight max-w-[150px]">
                                                {service.statLabel}
                                            </p>
                                        </div>
                                        <button className="flex items-center gap-2 text-[#71c6a4] text-xs font-bold hover:gap-3 transition-all">
                                            {service.link}
                                            <ArrowRight size={14} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
