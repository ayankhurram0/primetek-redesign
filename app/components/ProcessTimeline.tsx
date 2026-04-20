"use client";

import { useRef, useEffect } from "react";
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

export default function ProcessTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  useEffect(() => {
    if (!headerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 85%",
          toggleActions: "play none none none"
        },
        defaults: { ease: "power4.out", duration: 1 }
      });

      tl.from(".timeline-h2", {
        y: 40,
        opacity: 0,
        delay: 0.1
      })
        .from(".timeline-p1", {
          y: 30,
          opacity: 0
        }, "-=0.7")
        .from(".timeline-p2", {
          y: 20,
          opacity: 0
        }, "-=0.7")
        .from(".timeline-h3", {
          scale: 0.95,
          opacity: 0
        }, "-=0.6");
    }, headerRef);

    return () => ctx.revert();
  }, []);

  const lineHeight = useTransform(scrollYProgress, [0.1, 0.7], ["0%", "100%"]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.3, 0.45], [1, 1, 0]);

  return (
    <section ref={containerRef} className="relative bg-white pb-60 min-h-[100vh] overflow-hidden pt-50">
      {/* Header */}
      <motion.div
        ref={headerRef}
        style={{ opacity: headerOpacity }}
        className="text-center mb-0 px-6 max-w-4xl mx-auto"
      >
        <h2 className="timeline-h2 text-[#2b4c8c] text-4xl  2xl:text-6xl font-black tracking-tight mb-4">
          Our Framework
        </h2>
        <p className="timeline-p1 text-black/80 text-xs uppercase 2xl:text-2xl font-bold mb-2">
          A DISCIPLINED APPROACH TO MANAGING PERFORMANCE, REDUCING RISK, AND MAINTAINING OPERATIONAL CONTROL.
        </p>
        <p className="timeline-p2 text-black/50 text-sm mt-4 max-w-2xl 2xl:text-xl mx-auto leading-relaxed">
          PrimeTek Services applies a structured methodology designed specifically for pharmacy environments.
        </p>
        <h3 className="timeline-h3 text-black/70 text-lg 2xl:text-3xl font-bold mt-12 mb-8">
          Our 4-Step Operational Framework
        </h3>
      </motion.div>

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
                className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-10 ${isRight ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
              >
                {/* Content Side */}
                <div className={`flex-1 ${isRight ? "md:text-right md:pr-16" : "md:text-left md:pl-16"}`}>
                  <div className={`flex flex-col ${isRight ? "md:items-end" : "md:items-start"}`}>
                    <h3 className="text-[#2b4c8c] text-2xl 2xl:text-3xl font-bold mb-2">
                      {step.title}
                    </h3>
                    <p className="text-black/60 text-sm 2xl:text-base leading-relaxed max-w-md">
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
                  className={`absolute top-1/2 -translate-y-1/2 right-0 z-10 hidden md:flex ${isRight
                    ? "left-[calc(50%+20rem)]"
                    : "right-[calc(50%+20rem)]"
                    } w-20 h-20 md:w-22 md:h-22 mx-auto rounded-full bg-[#71c6a4] border border-black/10 flex items-center justify-center`}
                >
                  <Icon className="w-8 h-8 md:w-12 md:h-12 text-white" strokeWidth={1.5} />
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
