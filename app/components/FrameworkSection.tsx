"use client"

import React, { useLayoutEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FileSearch, Target, Zap, TrendingUp } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    id: 1,
    title: "Assess",
    desc: "Review workflows, reporting structures, and areas of potential exposure.",
    icon: FileSearch,
    position: "right"
  },
  {
    id: 2,
    title: "Align",
    desc: "Adapt operational processes based on your pharmacy's payer mix and performance patterns.",
    icon: Target,
    position: "left"
  },
  {
    id: 3,
    title: "Implement",
    desc: "Deploy consistent monitoring, reporting, and support across selected service areas.",
    icon: Zap,
    position: "right"
  },
  {
    id: 4,
    title: "Optimize",
    desc: "Continuously evaluate results, identify issues early, and refine operational performance.",
    icon: TrendingUp,
    position: "left"
  }
];

export const FrameworkSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  // We use useScroll on the containerRef which will be the tall spacer
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Pinning the section
      ScrollTrigger.create({
        trigger: triggerRef.current,
        start: "top top",
        end: () => `+=${containerRef.current?.offsetHeight || 0}`,
        pin: true,
        pinSpacing: false, // We use the containerRef's height for spacing
      });

      // Intro animations
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top 10%",
          end: "top -20%",
          scrub: 1,
        }
      });

      tl.from(".timeline-h2", { y: 40, opacity: 0 })
        .from(".timeline-p1", { y: 30, opacity: 0 }, "-=0.5")
        .from(".timeline-p2", { y: 20, opacity: 0 }, "-=0.5")
        .from(".timeline-h3", { scale: 0.95, opacity: 0 }, "-=0.4")
        // Fade out header to make room for timeline
        .to(".header-content", { opacity: 0, y: -50, duration: 1 }, "+=0.5");

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const lineHeight = useTransform(scrollYProgress, [0.3, 0.9], ["0%", "100%"]);

  return (
    <section ref={containerRef} className="relative bg-white min-h-[600vh]">
      {/* Sticky Content */}
      <div ref={triggerRef} className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">

        {/* Header */}
        <div
          ref={headerRef}
          className="header-content text-center px-6 max-w-4xl mx-auto absolute z-20"
        >
          <h2 className="timeline-h2 text-[#2b4c8c] text-4xl md:text-5xl 2xl:text-6xl font-black tracking-tight mb-4">
            Our Framework
          </h2>
          <p className="timeline-p1 text-black/80 text-xs uppercase 2xl:text-xl font-bold mb-2">
            A DISCIPLINED APPROACH TO MANAGING PERFORMANCE, REDUCING RISK, AND MAINTAINING OPERATIONAL CONTROL.
          </p>
          <p className="timeline-p2 text-black/50 text-sm mt-4 max-w-2xl 2xl:text-xl mx-auto leading-relaxed">
            PrimeTek Services applies a structured methodology designed specifically for pharmacy environments.
          </p>
          <h3 className="timeline-h3 text-black/70 text-lg 2xl:text-2xl font-bold mt-12 mb-8">
            Our 4-Step Operational Framework
          </h3>
        </div>

        {/* Timeline Container */}
        <div className="relative w-full max-w-6xl mx-auto px-6 z-10 h-full flex items-center justify-center">
          <div className="w-full relative">
            {/* Center Line - Background */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-100 -translate-x-1/2 hidden md:block" />

            <motion.div
              style={{ height: lineHeight }}
              className="absolute left-1/2 top-0 w-[6px] bg-[#71c6a4] hidden md:block -translate-x-1/2 rounded-full origin-top"
            />

            {/* Steps */}
            <div className="relative flex flex-col items-center">
              {steps.map((step, index) => {
                // Calculate ranges for each step based on total scroll
                const start = 0.35 + (index * 0.15);
                const end = start + 0.1;

                const stepProgress = useTransform(
                  scrollYProgress,
                  [start, end],
                  [0, 1],
                  { clamp: true }
                );

                const opacity = useTransform(stepProgress, [0, 1], [0, 1]);
                const y = useTransform(stepProgress, [0, 1], [50, 0]);
                const scale = useTransform(stepProgress, [0, 1], [0.9, 1]);
                const iconRotate = useTransform(stepProgress, [0, 1], [180, 0]);

                const isRight = step.position === "right";
                const Icon = step.icon;

                return (
                  <motion.div
                    key={step.id}
                    style={{ opacity, y, scale }}
                    className={`relative flex flex-col md:flex-row items-center w-full py-8 md:py-12 ${isRight ? "md:flex-row" : "md:flex-row-reverse"
                      }`}
                  >
                    {/* Content Side */}
                    <div className={`flex-1 ${isRight ? "md:text-left md:pr-16" : "md:text-right md:pl-16"}`}>
                      <div className={`flex flex-col ${isRight ? "md:items-start" : "md:items-end"}`}>
                        <h3 className="text-[#2b4c8c] text-2xl 2xl:text-3xl font-bold mb-2">
                          {step.title}
                        </h3>
                        <p className="text-black/60 text-sm 2xl:text-base leading-relaxed max-w-md">
                          {step.desc}
                        </p>
                      </div>
                    </div>

                    {/* Center Node with Number on Line */}
                    <div className="relative z-10 flex items-center justify-center w-12 h-12 my-4 md:my-0">
                      <div className="w-10 h-10 rounded-full bg-[#71c6a4] flex items-center justify-center shadow-lg">
                        <span className="text-white text-sm font-bold">{step.id}</span>
                      </div>
                    </div>

                    {/* Icon Area */}
                    <div className="flex-1 flex justify-center">
                      <motion.div
                        style={{ rotate: iconRotate }}
                        className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-[#71c6a4]/10 border border-[#71c6a4]/20 flex items-center justify-center"
                      >
                        <div className="w-20 h-20 md:w-28 md:h-28 rounded-full bg-[#71c6a4] flex items-center justify-center shadow-xl">
                          <Icon className="w-10 h-10 md:w-14 md:h-14 text-white" strokeWidth={1.5} />
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50 to-white pointer-events-none -z-10" />
      </div>
    </section>
  );
};
