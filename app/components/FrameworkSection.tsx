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

export default function FrameworkSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: triggerRef.current,
        start: "top top",
        end: `+=${window.innerHeight * 6}`,
        pin: true,
        pinSpacing: true,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Header animations
  const headingOpacity = useTransform(scrollYProgress, [0, 0.15, 0.25], [0, 1, 0]);
  const headingY = useTransform(scrollYProgress, [0, 0.15], [30, 0]);

  const subtitleOpacity = useTransform(scrollYProgress, [0.1, 0.2, 0.3], [0, 1, 0]);
  const subtitleY = useTransform(scrollYProgress, [0.1, 0.2], [20, 0]);

  const descOpacity = useTransform(scrollYProgress, [0.15, 0.25, 0.35], [0, 1, 0]);
  const descY = useTransform(scrollYProgress, [0.15, 0.25], [20, 0]);

  // Timeline line animation
  const lineHeight = useTransform(scrollYProgress, [0.3, 0.9], ["0%", "100%"]);

  // Pre-calculate all step transforms at top level
  const stepTransforms = steps.map((_, index) => {
    const stepStart = 0.3 + (index * 0.15);
    const stepEnd = stepStart + 0.12;

    return {
      opacity: useTransform(
        scrollYProgress,
        [stepStart, stepStart + 0.03, stepEnd - 0.03, stepEnd],
        [0.2, 1, 1, 0.2]
      ),
      y: useTransform(
        scrollYProgress,
        [stepStart, stepStart + 0.05],
        [20, 0]
      ),
      scale: useTransform(
        scrollYProgress,
        [stepStart, stepStart + 0.05],
        [0.8, 1]
      ),
      iconScale: useTransform(
        scrollYProgress,
        [stepStart, stepStart + 0.05],
        [0.9, 1]
      )
    };
  });

  return (
    <div className="bg-white">
      <section ref={containerRef} className="relative min-h-[700vh]">
        {/* Decorative Elements - Top Right */}
        <div className="absolute -top-20 -right-20 w-[500px] h-[500px] pointer-events-none z-0 opacity-80">
          <svg className="w-full h-full" viewBox="0 0 500 500" fill="none">
            <path d="M500 0 C250 0, 250 250, 0 250" stroke="url(#framework-gradient-tr)" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M500 80 C300 80, 300 300, 80 300" stroke="url(#framework-gradient-tr)" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.6" />
            <path d="M500 160 C350 160, 350 350, 160 350" stroke="url(#framework-gradient-tr)" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.4" />
            {[...Array(8)].map((_, i) => (<circle key={`tr-${i}`} cx={450 - i * 35} cy={30 + i * 25} r="3" fill="#2b4c8c" opacity={0.6 + i * 0.05} />))}
            <defs><linearGradient id="framework-gradient-tr" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#2b4c8c" stopOpacity="1" /><stop offset="50%" stopColor="#2b4c8c" stopOpacity="0.5" /><stop offset="100%" stopColor="#2b4c8c" stopOpacity="0" /></linearGradient></defs>
          </svg>
        </div>

        {/* Decorative Elements - Bottom Left */}
        <div className="absolute -bottom-20 -left-20 w-[500px] h-[500px] pointer-events-none z-0 opacity-80">
          <svg className="w-full h-full" viewBox="0 0 500 500" fill="none">
            <path d="M0 500 C250 500, 250 250, 500 250" stroke="url(#framework-gradient-bl)" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M0 420 C200 420, 200 200, 420 200" stroke="url(#framework-gradient-bl)" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.6" />
            <path d="M0 340 C150 340, 150 150, 340 150" stroke="url(#framework-gradient-bl)" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.4" />
            {[...Array(8)].map((_, i) => (<circle key={`bl-${i}`} cx={30 + i * 35} cy={470 - i * 25} r="3" fill="#2b4c8c" opacity={0.6 + i * 0.05} />))}
            <defs><linearGradient id="framework-gradient-bl" x1="0%" y1="100%" x2="100%" y2="0%"><stop offset="0%" stopColor="#2b4c8c" stopOpacity="1" /><stop offset="50%" stopColor="#2b4c8c" stopOpacity="0.5" /><stop offset="100%" stopColor="#2b4c8c" stopOpacity="0" /></linearGradient></defs>
          </svg>
        </div>

        <div ref={triggerRef} className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">

          <motion.div
            style={{ opacity: headingOpacity, y: headingY }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-40"
          >
            <h2 className="text-[#2b4c8c] text-5xl md:text-7xl font-bold tracking-tighter mb-4">
              Our Framework
            </h2>
          </motion.div>

          <motion.div
            style={{ opacity: subtitleOpacity, y: subtitleY }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-30"
          >
            <p className="text-black/80 text-sm md:text-lg uppercase tracking-[0.2em] font-bold mb-2">
              OPERATIONAL CONTROL FOR A COMPLEX PHARMACY ENVIRONMENT
            </p>
          </motion.div>

          <motion.div
            style={{ opacity: descOpacity, y: descY }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-20"
          >
            <p className="text-black/60 text-base md:text-lg max-w-3xl leading-relaxed">
              PrimeTek Services applies a structured methodology designed specifically for pharmacy environments.
            </p>
            <h3 className="text-teal-400 text-xl md:text-2xl font-bold mt-8">
              Our 4-Step Operational Framework
            </h3>
          </motion.div>

          <div
            className="relative w-full max-w-6xl mx-auto px-6 h-[80vh] flex items-center justify-center z-10"
          >
            {/* Background track */}
            <div className="absolute left-1/2 top-[10%] bottom-[10%] w-px bg-gray-200 -translate-x-1/2 hidden md:block" />

            {/* Animated line */}
            <motion.div
              style={{ height: lineHeight }}
              className="absolute left-1/2 top-[10%] w-[4px] bg-teal-400 hidden md:block -translate-x-1/2 rounded-full origin-top"
            />

            <div className="w-full h-full relative flex flex-col justify-center space-y-6">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isRight = step.position === "right";
                const transforms = stepTransforms[index];

                return (
                  <motion.div
                    key={step.id}
                    style={{ opacity: transforms.opacity, y: transforms.y }}
                    className={`relative flex items-center w-full ${isRight ? "flex-row" : "flex-row-reverse"}`}
                  >
                    <div className={`flex-1 ${isRight ? "pr-8 text-right" : "pl-8 text-left"}`}>
                      <div className={`inline-block ${isRight ? "text-right" : "text-left"}`}>
                        <span className="text-teal-400 text-xs font-mono tracking-tighter mb-2 block">
                          PHASE {step.id}
                        </span>
                        <h4 className="text-[#2b4c8c] text-2xl md:text-3xl font-bold mb-3">
                          {step.title}
                        </h4>
                        <p className="text-black/60 text-sm md:text-base leading-relaxed max-w-sm">
                          {step.desc}
                        </p>
                      </div>
                    </div>

                    <div className="relative z-30 mx-2 flex items-center justify-center">
                      <motion.div
                        style={{ scale: transforms.scale }}
                        className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-teal-400 border-4 border-white shadow-lg flex items-center justify-center"
                      >
                        <span className="text-white font-bold text-base">{step.id}</span>
                      </motion.div>
                    </div>

                    <div className={`flex-1 flex ${isRight ? "justify-start pl-8" : "justify-end pr-8"}`}>
                      <motion.div
                        style={{ scale: transforms.iconScale }}
                        className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white shadow-lg border border-gray-100 flex items-center justify-center"
                      >
                        <Icon className="w-5 h-5 md:w-6 md:h-6 text-teal-400" strokeWidth={1.5} />
                      </motion.div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div className="absolute inset-0 -z-10 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white via-gray-50/50 to-white" />
          </div>
        </div>
      </section>
    </div>
  );
}
