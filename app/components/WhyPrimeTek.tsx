"use client"
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Target,
  BarChart3,
  Users,
  ShieldCheck,
  Search
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const steps = [
  {
    id: "01",
    title: "Profit Focus",
    icon: <Target className="w-6 h-6 text-accent" />,
    description: "Prioritize reimbursement, audit exposure, and efficiency—everything else is noise."
  },
  {
    id: "02",
    title: "Actionable Data",
    icon: <BarChart3 className="w-6 h-6 text-accent" />,
    description: "Turn payer data into clear, executable decisions."
  },
  {
    id: "03",
    title: "Embedded Systems",
    icon: <Users className="w-6 h-6 text-accent" />,
    description: "Operate inside your workflows—not as external support."
  },
  {
    id: "04",
    title: "Compliance Control",
    icon: <ShieldCheck className="w-6 h-6 text-accent" />,
    description: "Maintain audit readiness without disrupting clinical operations."
  },
  {
    id: "05",
    title: "Continuous Monitoring",
    icon: <Search className="w-6 h-6 text-accent" />,
    description: "Identify issues early before they become financial losses."
  }
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

    // 1. Set initial hidden states
    gsap.set([subHeadingRef.current, headingRef.current, textRef.current], {
      opacity: 0,
    });
    gsap.set(section.querySelectorAll(".why-step-card"), {
      opacity: 0,
    });
    gsap.set(section.querySelectorAll(".why-step-dot"), {
      opacity: 0,
      backgroundColor: "transparent",
      borderColor: "rgba(255,255,255,0.1)",
    });
    if (progressLineRef.current) {
      gsap.set(progressLineRef.current, { opacity: 0 });
    }

    // 2. Refresh ScrollTrigger positions after DOM is settled
    ScrollTrigger.refresh();

    // 3. Build the timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: trigger,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    // Header animations
    tl.to(
      [subHeadingRef.current, headingRef.current, textRef.current],
      {
        opacity: 1,
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out",
      }
    );

    // Progress line
    tl.to(
      progressLineRef.current,
      {
        opacity: 1,
        duration: 0.8,
        ease: "power2.inOut",
      },
      "-=0.2"
    );

    tl.to(
      section.querySelectorAll(".why-step-card"),
      {
        opacity: 1,
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out",
      },
      "<"
    );

    tl.to(
      section.querySelectorAll(".why-step-dot"),
      {
        opacity: 1,
        backgroundColor: "#2dd4bf",
        borderColor: "#2dd4bf",
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out",
      },
      "<"
    );

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === trigger) st.kill();
      });
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative w-[85%] mx-auto overflow-hidden font-montserrat">
      <div ref={triggerRef} className="relative h-auto flex flex-col justify-center py-40">
        <div className="max-w-[1700px] mx-auto text-center mb-16 relative z-10">
          <div ref={subHeadingRef} className="flex items-center justify-center gap-4 mb-6">
            <div className="h-[1px] w-12 bg-teal-400/40" />
            <span className="text-accent font-bold text-xs tracking-widest uppercase">WHY PRIMETEK</span>
            <div className="h-[1px] w-12 bg-teal-400/40" />
          </div>

          <h2 ref={headingRef} className="text-5xl lg:text-6xl font-bold text-ink mb-8 tracking-tight leading-[1.1]">
            Operational Control for Pharmacies<br />
            <span className="text-accent">Under Constant Pressure</span>
          </h2>

          <p ref={textRef} className="text-ink-muted text-2xl 2xl:w-[60%] mx-auto leading-relaxed">
            PBM pressure, reimbursement variability, and audit exposure create financial instability.
            PrimeTek installs structured systems that restore control and visibility.
          </p>
        </div>

        <div className="max-w-[1700px] mx-auto relative w-full">
          {/* Step Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative z-10 pb-14">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="why-step-card bg-white/75 border border-ink/10 rounded-2xl p-6 flex flex-col items-start text-left min-h-[260px] relative transition-all hover:bg-white/75/80 hover:border-teal-400/30"
              >
                <div className="flex flex-col mb-4">
                  <span className="text-xl font-bold text-accent mb-1">{step.id}</span>
                  <div className="h-[2px] w-6 bg-teal-400" />
                </div>

                <div className="w-12 h-12 rounded-full bg-white/65 flex items-center justify-center border border-ink/10 mb-6">
                  {step.icon}
                </div>

                <h3 className="text-2xl font-bold text-ink mb-4">{step.title}</h3>
                <p className="text-ink-subtle text-xl leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>

          {/* Timeline Indicator at Bottom */}
          <div className="hidden md:flex absolute bottom-4 left-12 right-12 items-center pointer-events-none">
            <div className="h-[2px] w-full bg-white/10 relative flex items-center">
              <div
                ref={progressLineRef}
                className="h-full w-full bg-teal-400 shadow-[0_0_15px_rgba(45,212,191,0.5)]"
              />
              <div className="absolute inset-0 flex justify-between items-center px-[2px]">
                {steps.map((_, i) => (
                  <div
                    key={i}
                    className="why-step-dot w-4 h-4 rounded-full border-2 bg-white/70 z-20"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
