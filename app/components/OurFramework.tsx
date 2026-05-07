/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FileSearch, Target, Zap, TrendingUp } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface Step {
  id: number;
  title: string;
  desc: string;
  icon: React.ElementType;
}

const steps: Step[] = [
  {
    id: 1,
    title: "Assess",
    desc: "Review workflows, reporting structures, and areas of potential exposure.",
    icon: FileSearch,
  },
  {
    id: 2,
    title: "Align",
    desc: "Adapt operational processes based on your pharmacy's payer mix and performance patterns.",
    icon: Target,
  },
  {
    id: 3,
    title: "Implement",
    desc: "Deploy consistent monitoring, reporting, and support across selected service areas.",
    icon: Zap,
  },
  {
    id: 4,
    title: "Optimize",
    desc: "Continuously evaluate results, identify issues early, and refine operational performance.",
    icon: TrendingUp,
  }
];

export const OurFramework: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const leftContentRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLSpanElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const rowsRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: `+=${window.innerHeight * 7}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        }
      });

      const q = gsap.utils.selector(leftContentRef);

      // 1. Heading
      tl.fromTo(q(".framework-heading"),
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 2 },
        0
      );

      // 2. Subtitle (Uppercase)
      tl.fromTo(q(".framework-subtitle"),
        { opacity: 0, x: -30, borderLeftWidth: 0 },
        { opacity: 1, x: 0, borderLeftWidth: 4, duration: 2 },
        2
      );

      // 3. Description
      tl.fromTo(q(".framework-description"),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 2 },
        4
      );

      // 4. Grid Subtitle
      tl.fromTo(subtitleRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 1.5 },
        6
      );

      // 5. Timeline Line
      tl.fromTo(lineRef.current,
        { height: "0%" },
        { height: "90%", duration: 8, ease: "none" },
        7
      );

      // 6. Rows
      rowsRef.current.forEach((row, index) => {
        if (!row) return;
        const rowIcon = row.querySelector(".row-icon");
        const rowDot = row.querySelector(".row-dot");
        const startTime = 8 + (index * 2);

        tl.fromTo(row,
          { opacity: 0, scale: 0.95, y: 40 },
          { opacity: 1, scale: 1, y: 0, duration: 2 },
          startTime
        );

        tl.fromTo(rowDot,
          { scale: 0, backgroundColor: "#f3f4f6" },
          { scale: 1, backgroundColor: "#71c6a4", duration: 1 },
          startTime + 0.5
        );

        tl.fromTo(rowIcon,
          { scale: 0.6, rotate: -20 },
          { scale: 1, rotate: 0, duration: 1.5 },
          startTime + 0.3
        );
      });
      // Dead scroll buffer (keeps the section locked for another 1-2 scrolls)
      tl.to({}, { duration: 4 });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-[500vh] font-sans selection:bg-teal-400/30 overflow-x-hidden pb-60">
      {/* Decorative Elements - Top Right */}
      <div className="absolute -top-20 -right-20 w-[500px] h-[500px] pointer-events-none z-0 opacity-80">
        <svg className="w-full h-full" viewBox="0 0 500 500" fill="none">
          <path d="M500 0 C250 0, 250 250, 0 250" stroke="url(#ourframework-gradient-tr)" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M500 80 C300 80, 300 300, 80 300" stroke="url(#ourframework-gradient-tr)" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.6" />
          <path d="M500 160 C350 160, 350 350, 160 350" stroke="url(#ourframework-gradient-tr)" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.4" />
          {[...Array(8)].map((_, i) => (<circle key={`tr-${i}`} cx={450 - i * 35} cy={30 + i * 25} r="3" fill="#71c6a4" opacity={0.6 + i * 0.05} />))}
          <defs><linearGradient id="ourframework-gradient-tr" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#71c6a4" stopOpacity="1" /><stop offset="50%" stopColor="#71c6a4" stopOpacity="0.5" /><stop offset="100%" stopColor="#71c6a4" stopOpacity="0" /></linearGradient></defs>
        </svg>
      </div>

      {/* Decorative Elements - Bottom Left */}
      <div className="absolute -bottom-20 -left-20 w-[500px] h-[500px] pointer-events-none z-0 opacity-80">
        <svg className="w-full h-full" viewBox="0 0 500 500" fill="none">
          <path d="M0 500 C250 500, 250 250, 500 250" stroke="url(#ourframework-gradient-bl)" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M0 420 C200 420, 200 200, 420 200" stroke="url(#ourframework-gradient-bl)" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.6" />
          <path d="M0 340 C150 340, 150 150, 340 150" stroke="url(#ourframework-gradient-bl)" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.4" />
          {[...Array(8)].map((_, i) => (<circle key={`bl-${i}`} cx={30 + i * 35} cy={470 - i * 25} r="3" fill="#71c6a4" opacity={0.6 + i * 0.05} />))}
          <defs><linearGradient id="ourframework-gradient-bl" x1="0%" y1="100%" x2="100%" y2="0%"><stop offset="0%" stopColor="#71c6a4" stopOpacity="1" /><stop offset="50%" stopColor="#71c6a4" stopOpacity="0.5" /><stop offset="100%" stopColor="#71c6a4" stopOpacity="0" /></linearGradient></defs>
        </svg>
      </div>

      <div ref={triggerRef} className="sticky top-0 h-screen w-full flex items-center overflow-hidden">

        <div className="container mx-auto px-6 h-full flex flex-col lg:flex-row items-center lg:gap-12">

          <div
            ref={leftContentRef}
            className="w-full lg:w-[45%] flex flex-col justify-center space-y-8 text-center lg:text-left z-20 pt-12 lg:pt-0"
          >
            <h2 className="framework-heading opacity-0 text-white 2xl:text-5xl font-bold flex gap-2">
              <span className="text-teal-400">Our</span> Framework
            </h2>
            <div className="space-y-6">
              <p className="framework-subtitle opacity-0 text-slate-300 text-xs 2xl:text-2xl font-semibold border-l-4 border-teal-400 pl-4">
                A DISCIPLINED APPROACH TO MANAGING PERFORMANCE, REDUCING RISK, AND MAINTAINING OPERATIONAL CONTROL.
              </p>
              <p className="framework-description opacity-0 text-slate-400 text-lg 2xl:text-2xl font-medium pl-5">
                PrimeTek Services applies a structured methodology designed specifically for pharmacy environments.
              </p>
            </div>
          </div>

          <div className="flex-1 w-full h-full relative flex flex-col justify-center pt-16 lg:pt-0">
            <div className="w-full text-center mb-8 absolute top-[6%] 2xl:top-[16%] left-0 z-30">
              <span
                ref={subtitleRef}
                className="inline-block text-white 2xl:text-[32px] font-bold"
              >
                Our 4-Step Operational Framework
              </span>
            </div>

            <div className="relative w-full max-w-2xl mx-auto py-8 mt-50">
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2 hidden md:block" />
              <div
                ref={lineRef}
                className="absolute left-1/2 top-0 w-px bg-teal-400 -translate-x-1/2 origin-top hidden md:block h-0"
              />

              <div className="space-y-12 lg:space-y-16 relative z-10 px-4">
                {steps.map((step, index) => {
                  const isTextOnLeft = index % 2 === 0;
                  const Icon = step.icon;

                  return (
                    <div
                      key={step.id}
                      ref={(el: HTMLDivElement | null): void => { rowsRef.current[index] = el; }}
                      className="grid grid-cols-1 md:grid-cols-[1fr_40px_1fr] items-center gap-6 md:gap-0 relative opacity-0"
                    >
                      <div className="md:pr-10">
                        {isTextOnLeft ? (
                          <div className="row-text flex flex-col space-y-1 md:items-end text-center md:text-right">
                            <h4 className="text-white text-2xl lg:text-3xl font-bold mb-1">{step.title}</h4>
                            <p className="text-slate-400 text-sm lg:text-base leading-snug font-medium max-w-[280px]">
                              {step.desc}
                            </p>
                          </div>
                        ) : (
                          <div className="row-icon flex justify-end items-center">
                            <div className="w-16 h-16 lg:w-24 lg:h-24 rounded-full bg-teal-400 flex items-center justify-center text-white shadow-lg group">
                              <Icon className="w-8 h-8 lg:w-12 lg:h-12" strokeWidth={1} />
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="hidden md:flex justify-center relative z-20">
                        <div className="row-dot w-12 h-12 rounded-full border-2 border-[#020817] shadow-md flex items-center justify-center text-white text-md font-black bg-white/5 backdrop-blur-md scale-0">
                          {step.id}
                        </div>
                      </div>

                      <div className="md:pl-10">
                        {isTextOnLeft ? (
                          <div className="row-icon flex justify-start items-center">
                            <div className="w-16 h-16 lg:w-24 lg:h-24 rounded-full bg-teal-400 flex items-center justify-center text-white shadow-lg group">
                              <Icon className="w-8 h-8 lg:w-12 lg:h-12" strokeWidth={1} />
                            </div>
                          </div>
                        ) : (
                          <div className="row-text flex flex-col space-y-1 items-start text-center text-left">
                            <h4 className="text-white text-2xl lg:text-3xl font-bold mb-1">{step.title}</h4>
                            <p className="text-slate-400 text-sm 2xl:text-base leading-snug font-medium max-w-[280px]">
                              {step.desc}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

        </div>

        <div className="absolute inset-0 -z-20 opacity-[0.03] pointer-events-none">
          <div className="h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
        </div>
      </div>
    </section>
  );
};
