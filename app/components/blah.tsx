"use client";
import React, { useRef, useLayoutEffect } from "react";
import { motion } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FancyButton from "./button";
import Image, { StaticImageData } from 'next/image';
import service1 from "@/src/assets/service1.png";
import service2 from "@/src/assets/service2.png";
import service3 from "@/src/assets/service3.png";
import service4 from "@/src/assets/service4.png";
import service5 from "@/src/assets/service5.png";

gsap.registerPlugin(ScrollTrigger);

interface ServiceSectionProps {
    number: string;
    title: string;
    description: string;
    imageSrc: string | StaticImageData;
    imageAlt: string;
    zIndex: number;
}

const ServiceSection = ({ number, title, description, imageSrc, imageAlt, zIndex }: ServiceSectionProps) => {
    return (
        <motion.section
            style={{ zIndex }}
            className="sticky top-0 h-screen w-full flex flex-col justify-center bg-white border-t border-black/10 py-12 2xl:px-30 px-10"
        >
            <div className="max-w-[1400px] mx-auto w-full">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-center gap-6 mb-16 mt-10">
                    <div className="flex items-center gap-8 flex-1">
                        <h2 className="text-3xl 2xl:text-5xl font-semibold tracking-tight text-[#2b4c8c]">
                            {title}
                        </h2>
                    </div>
                    <div className="flex items-center gap-6">
                        <span className="2xl:text-4xl text-3xl font-light text-[#71c6a4]">{number}</span>
                        <div className="w-[1px] h-12 bg-[#2b4c8c]/20" />
                        <div className="flex gap-2">
                            {[...Array(8)].map((_, i) => (
                                <div key={i} className="w-[1px] h-6 bg-[#71c6a4]/30" />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Section Content */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                    {/* Left: Description */}
                    <div className="lg:col-span-6 space-y-12">
                        <p className="text-lg 2xl:text-2xl font-light leading-relaxed text-gray-600">
                            {description}
                        </p>

                        <FancyButton
                            label="Explore Service"
                            textColor="white"
                            borderColor="[#71c6a4]"
                            bgColor="#71c6a4"
                            rippleColor="#2b4c8c"
                            extraClasses="hover:border-[#2b4c8c] hover:text-white transition-all duration-200 2xl:py-5 2xl:px-10 px-8 py-4 font-bold text-lg shadow-[0_10px_30px_rgba(113,198,164,0.3)]"
                        />
                    </div>

                    {/* Right: Portfolio Grid Image */}
                    <div className="lg:col-span-6">
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-black/5 aspect-[4/3]">
                            <Image
                                src={imageSrc}
                                alt={imageAlt}
                                fill
                                className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                                sizes="(max-width: 1024px) 100vw, 50vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-br from-[#2b4c8c]/5 via-transparent to-[#71c6a4]/10 pointer-events-none" />
                        </div>
                    </div>
                </div>
            </div>
        </motion.section>
    );
};

export default function ServicesSticky() {
    const containerRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const paragraphRef = useRef<HTMLParagraphElement>(null);
    const btnRef = useRef<HTMLDivElement>(null);

    const services = [
        {
            number: "01",
            title: "Revenue Intelligence & Reporting",
            description: "Identify Revenue Leakage, Monitor PBM Performance, And Stay Ahead Of Compliance Risks Through Structured Data Analysis.",
            imageSrc: service1,
            imageAlt: "Revenue Intelligence"
        },
        {
            number: "02",
            title: "Claims & Reimbursement Optimization",
            description: "Recover Lost Revenue, Reduce Claim Fees, And Improve Reimbursement Accuracy Across All Payers.",
            imageSrc: service2,
            imageAlt: "Claims Optimization"
        },
        {
            number: "03",
            title: "Compliance & Audit Protection",
            description: "Stay Audit-Ready With Systems Designed To Reduce Recoupment Risk And Maintain Regulatory Alignment.",
            imageSrc: service3,
            imageAlt: "Compliance Protection"
        },
        {
            number: "04",
            title: "Patient & Operational Support Systems",
            description: "Streamline Communication, Improve Workflow Efficiency, And Enhance Patient Engagement Through Structured Support.",
            imageSrc: service4,
            imageAlt: "Patient Support"
        },
        {
            number: "05",
            title: "Pharmacy Growth & Performance Strategy",
            description: "Optimize Pricing, Sourcing, And Operational Strategy To Improve Profitability And Scalability.",
            imageSrc: service5,
            imageAlt: "Growth Strategy"
        }
    ];

    const titleWords = "Operational Systems that Protect & Grow Pharmacy Revenue".split(" ");

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // 1. Initial hidden states for Hero
            gsap.set(".hero-word-wrap", { opacity: 0, y: 40 });
            gsap.set(paragraphRef.current, { opacity: 0, y: 40 });
            gsap.set(btnRef.current, { opacity: 0, y: 40 });

            // 2. Initial hidden states for Services
            const cards = gsap.utils.toArray<HTMLElement>(".service-card");
            gsap.set(cards, { yPercent: 100 });

            // 3. Main Timeline
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: `+=${(services.length + 5) * 100}%`,
                    pin: true,
                    pinSpacing: true,
                    scrub: 1,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                    refreshPriority: 10,
                }
            });

            // Step 1: Heading (fast)
            tl.to(".hero-word-wrap", {
                opacity: 1,
                y: 0,
                duration: 0.5
            });

            // Step 2: Paragraph (quick follow)
            tl.to(paragraphRef.current, {
                opacity: 1,
                y: 0,
                duration: 0.5
            }, "+=0.3");

            // Step 3: Button (quick follow)
            tl.to(btnRef.current, {
                opacity: 1,
                y: 0,
                duration: 0.5
            }, "+=0.3");

            // Step 4: Services
            cards.forEach((card, index) => {
                tl.to(card, {
                    yPercent: 0,
                    duration: 1.5,
                    ease: "power2.inOut"
                }, `+=${index === 0 ? 1 : 0.5}`);
            });

            // Dead scroll buffer (keeps the section locked for ~2 more scrolls)
            tl.to({}, { duration: 3 });

        }, containerRef);

        return () => ctx.revert();
    }, [services.length]);

    return (
        <section id="services" ref={containerRef} className="relative h-screen flex overflow-hidden w-full bg-white">
            {/* Hero Section - Fixed Left Sidebar */}
            <div className="relative h-full flex flex-col justify-center bg-white z-20 2xl:pl-30 pl-10 2xl:w-[38%] w-[40%] self-start">
                {/* Animated Background Pattern */}
                <div className="absolute inset-0 z-[-1] opacity-[0.03]">
                    <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#2b4c8c 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
                    <motion.div
                        animate={{
                            x: [0, -40, 0],
                            y: [0, -40, 0]
                        }}
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        className="absolute inset-[-100px]"
                        style={{ backgroundImage: 'linear-gradient(to right, #71c6a4 1px, transparent 1px), linear-gradient(to bottom, #71c6a4 1px, transparent 1px)', backgroundSize: '100px 100px' }}
                    />
                </div>

                <div className="max-w-[1400px] mx-auto w-full">
                    <div className="mb-12 hero-word-wrap">
                        <h2 ref={headingRef} className="2xl:text-5xl text-4xl text-left font-bold flex flex-wrap justify-left gap-x-3">
                            {titleWords.map((word, i) => (
                                <span
                                    key={i}
                                    className={`inline-block ${word === "that" || word === "Protect" || word === "&" || word === "Grow" || word === "Revenue" || word === "Pharmacy" ? "text-[#2b4c8c]" : "text-[#71c6a4]"}`}
                                >
                                    {word}
                                </span>
                            ))}
                        </h2>
                    </div>

                    <div className="flex flex-col items-left gap-12 max-w-4xl mx-auto text-left">
                        <p ref={paragraphRef} className="text-md 2xl:text-2xl font-light leading-relaxed text-gray-700 max-w-3xl">
                            Empower your pharmacy with automated workflows and data-driven insights that safeguard your margins and accelerate revenue generation.
                        </p>

                        <div ref={btnRef}>
                            <FancyButton
                                label="Become a client"
                                textColor="white"
                                borderColor="[#71c6a4]"
                                bgColor="#71c6a4"
                                rippleColor="#2b4c8c"
                                extraClasses="hover:border-[#2b4c8c] hover:text-white transition-all duration-200 2xl:py-5 2xl:px-10 px-8 py-4 font-bold text-lg shadow-[0_10px_30px_rgba(113,198,164,0.3)]"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Service Sections - Scrollable Right Content */}
            <div className=" 2xl:w-[62%] w-[60%] relative h-full overflow-hidden">
                {services.map((service, index) => (
                    <div
                        key={service.number}
                        className="service-card absolute inset-0 bg-white shadow-[-20px_0_40px_rgba(0,0,0,0.05)]"
                        style={{ zIndex: index + 10 }}
                    >
                        <ServiceSection
                            number={service.number}
                            title={service.title}
                            description={service.description}
                            imageSrc={service.imageSrc}
                            imageAlt={service.imageAlt}
                            zIndex={index + 10}
                        />
                    </div>
                ))}
            </div>
        </section>
    );
}
