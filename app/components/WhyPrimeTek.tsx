"use client"
import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Target,
  BarChart3,
  Users,
  ShieldCheck,
  Search
} from "lucide-react";


gsap.registerPlugin(ScrollTrigger);

export const WhyPrimeTekSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const subHeadingRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);

  const steps = [
    {
      id: "01",
      title: "Profit Focus",
      icon: <Target className="w-8 h-8 text-teal-400" />,
      description: "Prioritize reimbursement, audit exposure, and efficiency—everything else is noise."
    },
    {
      id: "02",
      title: "Actionable Data",
      icon: <BarChart3 className="w-8 h-8 text-teal-400" />,
      description: "Turn payer data into clear, executable decisions."
    },
    {
      id: "03",
      title: "Embedded Systems",
      icon: <Users className="w-8 h-8 text-teal-400" />,
      description: "Operate inside your workflows—not as external support."
    },
    {
      id: "04",
      title: "Compliance Control",
      icon: <ShieldCheck className="w-8 h-8 text-teal-400" />,
      description: "Maintain audit readiness without disrupting clinical operations."
    },
    {
      id: "05",
      title: "Continuous Monitoring",
      icon: <Search className="w-8 h-8 text-teal-400" />,
      description: "Identify issues early before they become financial losses."
    }
  ];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Set all elements to their final visible states
      gsap.set([subHeadingRef.current, headingRef.current, textRef.current], { opacity: 1, y: 0 });
      gsap.set(".why-step-card", { opacity: 1, y: 0 });
      gsap.set(".why-step-dot", { scale: 1, backgroundColor: "teak-400", borderColor: "teak-400" });
      gsap.set(progressLineRef.current, { scaleX: 1, transformOrigin: "left" });
    }, sectionRef.current || undefined);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden font-montserrat">

      <div ref={triggerRef} className="relative h-auto flex flex-col justify-center py-40">
        <div className="max-w-[1700px] mx-auto text-center mb-16 relative z-10 px-12">
          <div ref={subHeadingRef} className="flex items-center justify-center gap-4 mb-6">
            <div className="h-[1px] w-12 bg-teal-400/40" />
            <span className="text-teal-400 font-bold text-xs tracking-widest uppercase">WHY PRIMETEK</span>
            <div className="h-[1px] w-12 bg-teal-400/40" />
          </div>

          <h2 ref={headingRef} className="text-5xl lg:text-6xl font-bold text-white mb-8 tracking-tight leading-[1.1]">
            Operational Control for Pharmacies<br />
            <span className="text-teal-400">Under Constant Pressure</span>
          </h2>

          <p ref={textRef} className="text-white/60 text-2xl 2xl:w-[60%] mx-auto leading-relaxed">
            PBM pressure, reimbursement variability, and audit exposure create financial instability.
            PrimeTek installs structured systems that restore control and visibility.
          </p>
        </div>

        <div className="max-w-[1700px] mx-auto relative px-12 w-full">
          {/* Step Cards Grid */}
          <div ref={cardsContainerRef} className="grid grid-cols-1 md:grid-cols-5 gap-4 relative z-10 pb-14">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="why-step-card bg-[#04212a] border border-white/10 rounded-2xl p-6 flex flex-col items-start text-left min-h-[260px] relative transition-all hover:bg-[#04212a]/80 hover:border-teal-400/30"
              >
                <div className="flex flex-col mb-4">
                  <span className="text-xl font-bold text-teal-400 mb-1">{step.id}</span>
                  <div className="h-[2px] w-6 bg-teal-400" />
                </div>

                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10 mb-6 shadow-[0_0_30px_rgba(59,130,246,0.1)]">
                  {React.cloneElement(step.icon as React.ReactElement<{ className?: string }>, { className: "w-6 h-6 text-teal-400" })}
                </div>

                <h3 className="text-2xl font-bold text-white mb-4 transition-colors">{step.title}</h3>
                <p className="text-white/40 text-xl leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          {/* Timeline Indicator at Bottom */}
          <div className="absolute bottom-4 left-12 right-12 flex items-center pointer-events-none">
            <div className="h-[2px] w-full bg-white/10 relative flex items-center">
              <div ref={progressLineRef} className="h-full w-full bg-teal-400 shadow-[0_0_15px_rgba(45,212,191,0.5)]" />

              <div className="absolute inset-0 flex justify-between items-center px-[2px]">
                {steps.map((_, i) => (
                  <div key={i} className="why-step-dot w-4 h-4 rounded-full border-2 border-white/10 bg-[#020817] z-20" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
