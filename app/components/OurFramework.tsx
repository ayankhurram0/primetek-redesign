/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
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

  useGSAP(() => {
    const section = containerRef.current;
    if (!section) return;

    gsap.set([".framework-heading", ".framework-subtitle", ".framework-description", subtitleRef.current], {
      opacity: 0,
      y: 30,
    });
    gsap.set(lineRef.current, { height: 0 });
    
    const rows = rowsRef.current.filter(Boolean);
    gsap.set(rows, { opacity: 0, y: 50 });
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 75%",
        toggleActions: "play none none reverse"
      }
    });

    tl.to([".framework-heading", ".framework-subtitle", ".framework-description"], {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "power2.out"
    })
    .to(subtitleRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.4")
    .to(lineRef.current, {
      height: "90%",
      duration: 1.5,
      ease: "power2.inOut"
    }, "-=0.2")
    .to(rows, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.3,
      ease: "power2.out"
    }, "<");

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative h-auto font-montserrat selection:bg-teal-400/30 overflow-x-hidden py-40">

      <div ref={triggerRef} className="relative w-full flex items-center ">

        <div className="container w-[95%] mx-auto h-full flex flex-col lg:flex-row items-center lg:gap-12">

          <div
            ref={leftContentRef}
            className="w-full lg:w-[45%] flex flex-col justify-center space-y-8 text-center lg:text-left z-20 pt-12 lg:pt-0"
          >
            <h2 className="framework-heading text-white 2xl:text-5xl font-bold flex gap-2">
              <span className="text-teal-400">Our</span> Framework
            </h2>
            <div className="space-y-6">
              <p className="framework-subtitle text-slate-300 text-xs 2xl:text-2xl font-semibold">
                A DISCIPLINED APPROACH TO MANAGING PERFORMANCE, REDUCING RISK, AND MAINTAINING OPERATIONAL CONTROL.
              </p>
              <p className="framework-description text-slate-400 text-lg 2xl:text-2xl font-medium">
                PrimeTek Services applies a structured methodology designed specifically for pharmacy environments.
              </p>
            </div>
          </div>

          <div className="flex-1 w-full h-full relative flex flex-col justify-center pt-16 lg:pt-0">
            <div className="w-full text-center mb-8 z-30">
              <span
                ref={subtitleRef}
                className="inline-block text-white 2xl:text-[32px] font-bold"
              >
                Our 4-Step Operational Framework
              </span>
            </div>

            <div className="relative w-full max-w-2xl mx-auto py-8 mt-12">
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2 hidden md:block" />
              <div
                ref={lineRef}
                className="absolute left-1/2 top-0 w-px bg-teal-400 -translate-x-1/2 origin-top hidden md:block h-[90%]"
              />

              <div className="space-y-12 lg:space-y-16 relative z-10 px-4">
                {steps.map((step, index) => {
                  const isTextOnLeft = index % 2 === 0;
                  const Icon = step.icon;

                  return (
                    <div
                      key={step.id}
                      ref={(el: HTMLDivElement | null): void => { rowsRef.current[index] = el; }}
                      className="grid grid-cols-1 md:grid-cols-[1fr_40px_1fr] items-center gap-6 md:gap-0 relative"
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
                        <div className="row-dot w-12 h-12 rounded-full border-2 border-[#010810] shadow-md flex items-center justify-center text-white text-md font-bold bg-teal-400 backdrop-blur-md">
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

      </div>
    </section>
  );
};
