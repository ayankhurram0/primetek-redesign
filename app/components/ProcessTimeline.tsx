"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { FileSearch, Target, Zap, TrendingUp } from "lucide-react";

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

export default function ProcessTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Line progress from 0 to 100% as user scrolls through section
  const lineHeight = useTransform(scrollYProgress, [0.1, 0.6], ["0%", "100%"]);

  return (
    <section ref={containerRef} className="relative bg-white pb-32 min-h-[250vh] overflow-hidden pt-50">
      {/* Header */}
      <div className="text-center mb-20 px-6 max-w-4xl mx-auto">
        <h2 className="text-[#2b4c8c] text-4xl md:text-5xl 2xl:text-6xl font-black tracking-tight mb-4">
          Our Framework
        </h2>
        <p className="text-black/80 text-xs uppercase 2xl:text-xl font-bold mb-2">
          A DISCIPLINED APPROACH TO MANAGING PERFORMANCE, REDUCING RISK, AND MAINTAINING OPERATIONAL CONTROL.
        </p>
        <p className="text-black/50 text-sm mt-4 max-w-2xl 2xl:text-xl mx-auto leading-relaxed">
          PrimeTek Services applies a structured methodology designed specifically for pharmacy environments.
        </p>
        <h3 className="text-black/70 text-lg 2xl:text-2xl font-bold mt-12 mb-8">
          Our 4-Step Operational Framework
        </h3>
      </div>

      {/* Timeline Container */}
      <div className="relative max-w-6xl mx-auto px-6 z-10">
        {/* Center Line - Background */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 hidden md:block" />
        
        <motion.div 
          style={{ height: lineHeight }}
          className="absolute left-1/2 top-0 w-[6px] bg-[#71c6a4] hidden md:block -translate-x-1/2 rounded-full"
        />

        {/* Steps */}
        <div className="relative space-y-16 md:space-y-24">
          {steps.map((step, index) => {
            const stepProgress = useTransform(
              scrollYProgress,
              [0.1 + index * 0.12, 0.2 + index * 0.12],
              [0, 1],
              { clamp: true }
            );

            const opacity = useTransform(stepProgress, [0, 1], [0, 1], { clamp: true });
            const y = useTransform(stepProgress, [0, 1], [50, 0], { clamp: true });
            const scale = useTransform(stepProgress, [0, 1], [0.9, 1], { clamp: true });
            const iconRotate = useTransform(stepProgress, [0, 1], [180, 0], { clamp: true });

            const isRight = step.position === "right";
            const Icon = step.icon;

            return (
              <motion.div
                key={step.id}
                style={{ opacity, y, scale }}
                className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-16 ${
                  isRight ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Content Side */}
                <div className={`flex-1 ${isRight ? "md:text-left md:pr-16" : "md:text-right md:pl-16"}`}>
                  <div className={`flex flex-col ${isRight ? "md:items-start" : "md:items-end"}`}>
                    <h3 className="text-[#2b4c8c] text-3xl md:text-4xl font-bold mb-4">
                      {step.title}
                    </h3>
                    <p className="text-black/60 text-sm md:text-base leading-relaxed max-w-md">
                      {step.desc}
                    </p>
                  </div>
                </div>

                {/* Center Node with Number on Line */}
                <div className="absolute left-1/2 -translate-x-1/2 z-10 hidden md:flex items-center justify-center">
                  {/* Number Circle centered on timeline line */}
                  <div className="w-10 h-10 rounded-full bg-[#71c6a4] flex items-center justify-center">
                    <span className="text-white text-sm font-bold">{step.id}</span>
                  </div>
                </div>
                
                {/* Icon - positioned to alternate sides */}
                <motion.div
                  style={{ rotate: iconRotate }}
                  className={`absolute top-1/2 -translate-y-1/2 z-10 hidden md:flex ${
                    isRight 
                      ? "left-[calc(50%+20rem)]" 
                      : "right-[calc(50%+20rem)]"
                  } w-24 h-24 md:w-32 md:h-32 mx-auto rounded-full bg-[#71c6a4] border border-black/10 flex items-center justify-center`}
                >
                  <Icon className="w-12 h-12 md:w-16 md:h-16 text-white" strokeWidth={1.5} />
                </motion.div>

                {/* Empty Side for balance */}
                <div className="flex-1 hidden md:block" />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50 to-white pointer-events-none -z-10" />
    </section>
  );
}
