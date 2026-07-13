"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Target,
  BarChart3,
  Users,
  ShieldCheck,
  Search,
  type LucideIcon,
} from "lucide-react";
import {
  FeatureStepCard,
  FEATURE_BLUE as BLUE,
  FEATURE_TEAL as TEAL,
} from "@/app/components/FeatureStepCard";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const steps: {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  accent: string;
}[] = [
  {
    id: "01",
    title: "Profit Focus",
    icon: Target,
    description:
      "Prioritize reimbursement, audit exposure, and efficiency—everything else is noise.",
    accent: BLUE,
  },
  {
    id: "02",
    title: "Actionable Data",
    icon: BarChart3,
    description: "Turn payer data into clear, executable decisions.",
    accent: TEAL,
  },
  {
    id: "03",
    title: "Embedded Systems",
    icon: Users,
    description: "Operate inside your workflows—not as external support.",
    accent: BLUE,
  },
  {
    id: "04",
    title: "Compliance Control",
    icon: ShieldCheck,
    description:
      "Maintain audit readiness without disrupting clinical operations.",
    accent: TEAL,
  },
  {
    id: "05",
    title: "Continuous Monitoring",
    icon: Search,
    description: "Identify issues early before they become financial losses.",
    accent: BLUE,
  },
];

export const WhyPrimeTekSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const subHeadingRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const section = sectionRef.current;
    const trigger = triggerRef.current;
    if (!section || !trigger) return;

    gsap.set([subHeadingRef.current, headingRef.current, textRef.current], {
      opacity: 0,
      y: 16,
    });
    gsap.set(section.querySelectorAll(".why-step-card"), {
      opacity: 0,
      y: 28,
    });
    gsap.set(section.querySelectorAll(".why-step-dot"), {
      opacity: 0,
      scale: 0.7,
    });
    if (progressLineRef.current) {
      gsap.set(progressLineRef.current, { scaleX: 0, transformOrigin: "left" });
    }

    ScrollTrigger.refresh();

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    tl.to([subHeadingRef.current, headingRef.current, textRef.current], {
      opacity: 1,
      y: 0,
      duration: 0.75,
      stagger: 0.14,
      ease: "power3.out",
    });

    tl.to(
      progressLineRef.current,
      { scaleX: 1, duration: 1.15, ease: "power3.inOut" },
      "-=0.2"
    );

    tl.to(
      section.querySelectorAll(".why-step-card"),
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
      },
      "<"
    );

    tl.to(
      section.querySelectorAll(".why-step-dot"),
      {
        opacity: 1,
        scale: 1,
        duration: 0.55,
        stagger: 0.12,
        ease: "power3.out",
      },
      "<0.1"
    );

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === trigger) st.kill();
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative mx-auto w-[85%] overflow-hidden font-montserrat"
    >
      <div
        ref={triggerRef}
        className="relative flex h-auto flex-col justify-center py-32 md:py-40"
      >
        {/* Background washes + corner grids */}
        <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
          <div className="absolute -bottom-24 -left-24 h-[420px] w-[480px] rounded-full bg-[#93c5fd]/25 blur-[130px]" />
          <div className="absolute -bottom-28 -right-20 h-[400px] w-[460px] rounded-full bg-[#a5b4fc]/20 blur-[130px]" />
          <div className="absolute right-6 top-4 opacity-45 sm:right-12 sm:top-8">
            <div className="grid grid-cols-10 gap-[7px]">
              {Array.from({ length: 70 }).map((_, i) => (
                <span
                  key={i}
                  className="h-[2.5px] w-[2.5px] rounded-full bg-[#94a3b8]/45"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="relative z-10 mx-auto mb-20 max-w-[1700px] text-center md:mb-24">
          <div
            ref={subHeadingRef}
            className="mb-6 flex items-center justify-center gap-4"
          >
            <div className="h-px w-10 bg-teal-400/70" />
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-teal-500">
              Why PrimeTek
            </span>
            <div className="h-px w-10 bg-teal-400/70" />
          </div>

          <h2
            ref={headingRef}
            className="mb-6 font-display text-5xl font-bold leading-[1.08] tracking-tight text-[#0f172a] sm:text-6xl lg:text-[4rem]"
          >
            Operational Control for Pharmacies
            <br />
            <span className="bg-gradient-to-r from-[#14b8a6] via-[#2dd4bf] to-[#5eead4] bg-clip-text text-transparent">
              Under Constant Pressure
            </span>
          </h2>

          <p
            ref={textRef}
            className="mx-auto max-w-3xl text-base leading-relaxed text-[#94a3b8] md:text-lg lg:text-xl"
          >
            PBM pressure, reimbursement variability, and audit exposure create
            financial instability. PrimeTek installs structured systems that
            restore control and visibility.
          </p>
        </div>

        {/* Cards + timeline */}
        <div className="relative z-10 mx-auto w-full max-w-[1700px]">
          <div className="relative z-10 grid grid-cols-1 gap-5 pb-24 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4 xl:gap-5">
            {steps.map((step) => (
              <FeatureStepCard
                key={step.id}
                id={step.id}
                title={step.title}
                description={step.description}
                icon={step.icon}
                accent={step.accent}
              />
            ))}
          </div>

          {/* Bottom timeline — dotted ends, alternating nodes, focus on center */}
          <div className="pointer-events-none absolute bottom-4 left-4 right-4 hidden md:block lg:left-8 lg:right-8">
            <div className="relative h-10 w-full">
              {/* Dotted side rails */}
              <div
                className="absolute left-0 top-1/2 h-px w-[8%] -translate-y-1/2"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(90deg, #2dd4bf 0 3px, transparent 3px 7px)",
                }}
              />
              <div
                className="absolute right-0 top-1/2 h-px w-[8%] -translate-y-1/2"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(90deg, #2dd4bf 0 3px, transparent 3px 7px)",
                }}
              />

              {/* Main thin teal line */}
              <div className="absolute left-[8%] right-[8%] top-1/2 h-[1.5px] -translate-y-1/2 overflow-hidden rounded-full bg-teal-200/70">
                <div
                  ref={progressLineRef}
                  className="h-full w-full bg-[#2dd4bf]"
                />
              </div>

              {/* Nodes aligned under cards */}
              <div className="absolute left-[8%] right-[8%] top-1/2 flex -translate-y-1/2 items-center justify-between">
                {steps.map((step, i) => {
                  const isFocus = i === 2;
                  return (
                    <div
                      key={step.id}
                      className="why-step-dot relative flex items-center justify-center"
                    >
                      {isFocus && (
                        <>
                          <span
                            className="absolute h-11 w-11 rounded-full opacity-40"
                            style={{
                              boxShadow: `0 0 0 1px ${BLUE}55, 0 0 18px ${BLUE}55`,
                              backgroundImage: `repeating-conic-gradient(from 0deg, ${BLUE} 0deg 8deg, transparent 8deg 20deg)`,
                              WebkitMask:
                                "radial-gradient(farthest-side, transparent calc(100% - 1.5px), #000 calc(100% - 1.5px))",
                              mask: "radial-gradient(farthest-side, transparent calc(100% - 1.5px), #000 calc(100% - 1.5px))",
                            }}
                          />
                          <span
                            className="absolute h-7 w-7 rounded-full border"
                            style={{ borderColor: `${TEAL}cc` }}
                          />
                        </>
                      )}
                      <span
                        className={`relative z-10 rounded-full border-2 border-white ${
                          isFocus ? "h-3.5 w-3.5" : "h-2.5 w-2.5"
                        }`}
                        style={{
                          backgroundColor: isFocus ? BLUE : TEAL,
                          boxShadow: isFocus
                            ? `0 0 12px ${BLUE}66`
                            : "0 1px 3px rgba(15,23,42,0.12)",
                        }}
                      />
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
