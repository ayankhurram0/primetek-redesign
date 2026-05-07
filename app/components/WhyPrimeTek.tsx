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
      if (!triggerRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: "+=400%", // Longer area for more steps
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      // Initial State
      gsap.set([subHeadingRef.current, headingRef.current, textRef.current], { opacity: 0, y: 30 });
      gsap.set(".why-step-card", { opacity: 0, y: 50 });
      gsap.set(".why-step-dot", { scale: 0.5, backgroundColor: "rgba(255,255,255,0.2)" });
      gsap.set(progressLineRef.current, { scaleX: 0, transformOrigin: "left" });

      // Sequence
      tl.to(subHeadingRef.current, { opacity: 1, y: 0, duration: 1 })
        .to(headingRef.current, { opacity: 1, y: 0, duration: 1 }, "+=0.5")
        .to(textRef.current, { opacity: 1, y: 0, duration: 1 }, "+=0.5");

      // Progress through steps
      const cards = gsap.utils.toArray<HTMLElement>(".why-step-card");
      const dots = gsap.utils.toArray<HTMLElement>(".why-step-dot");

      cards.forEach((card, i) => {
        tl.to(card, { opacity: 1, y: 0, duration: 1.5, ease: "power2.out" }, "+=0.5");
        tl.to(dots[i], { scale: 1.2, backgroundColor: "#71c6a4", borderColor: "#71c6a4", duration: 0.5 }, "<");
        tl.to(progressLineRef.current, { scaleX: (i + 1) / steps.length, duration: 1.5, ease: "none" }, "<");

        // Add a bit of space between each step
        if (i < steps.length - 1) {
          tl.to({}, { duration: 1 });
        }
      });

      tl.to({}, { duration: 2 }); // End buffer
    }, sectionRef.current || undefined);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden">
      {/* Decorative Elements - Top Right */}
      <div className="absolute -top-20 -right-20 w-[500px] h-[500px] pointer-events-none z-0 opacity-80">
        <svg className="w-full h-full" viewBox="0 0 500 500" fill="none">
          <path d="M500 0 C250 0, 250 250, 0 250" stroke="url(#whyprimetek-gradient-tr)" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M500 80 C300 80, 300 300, 80 300" stroke="url(#whyprimetek-gradient-tr)" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.6" />
          <path d="M500 160 C350 160, 350 350, 160 350" stroke="url(#whyprimetek-gradient-tr)" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.4" />
          {[...Array(8)].map((_, i) => (<circle key={`tr-${i}`} cx={450 - i * 35} cy={30 + i * 25} r="3" fill="#71c6a4" opacity={0.6 + i * 0.05} />))}
          <defs><linearGradient id="whyprimetek-gradient-tr" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#71c6a4" stopOpacity="1" /><stop offset="50%" stopColor="#71c6a4" stopOpacity="0.5" /><stop offset="100%" stopColor="#71c6a4" stopOpacity="0" /></linearGradient></defs>
        </svg>
      </div>

      {/* Decorative Elements - Bottom Left */}
      <div className="absolute -bottom-20 -left-20 w-[500px] h-[500px] pointer-events-none z-0 opacity-80">
        <svg className="w-full h-full" viewBox="0 0 500 500" fill="none">
          <path d="M0 500 C250 500, 250 250, 500 250" stroke="url(#whyprimetek-gradient-bl)" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M0 420 C200 420, 200 200, 420 200" stroke="url(#whyprimetek-gradient-bl)" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.6" />
          <path d="M0 340 C150 340, 150 150, 340 150" stroke="url(#whyprimetek-gradient-bl)" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.4" />
          {[...Array(8)].map((_, i) => (<circle key={`bl-${i}`} cx={30 + i * 35} cy={470 - i * 25} r="3" fill="#71c6a4" opacity={0.6 + i * 0.05} />))}
          <defs><linearGradient id="whyprimetek-gradient-bl" x1="0%" y1="100%" x2="100%" y2="0%"><stop offset="0%" stopColor="#71c6a4" stopOpacity="1" /><stop offset="50%" stopColor="#71c6a4" stopOpacity="0.5" /><stop offset="100%" stopColor="#71c6a4" stopOpacity="0" /></linearGradient></defs>
        </svg>
      </div>

      <div ref={triggerRef} className="min-h-screen flex flex-col justify-center py-20">
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
                className="why-step-card bg-[#0a1122]/40 backdrop-blur-3xl border border-white/10 rounded-2xl p-6 flex flex-col items-start text-left min-h-[260px] relative transition-all hover:bg-[#0a1122]/60 hover:border-teal-400/30"
              >
                <div className="flex flex-col mb-4">
                  <span className="text-xl font-bold text-teal-400 mb-1">{step.id}</span>
                  <div className="h-[2px] w-6 bg-teal-400" />
                </div>

                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10 mb-6 shadow-[0_0_30px_rgba(59,130,246,0.1)]">
                  {React.cloneElement(step.icon as React.ReactElement<{ className?: string }>, { className: "w-6 h-6 text-teal-400" })}
                </div>

                <h3 className="text-lg font-bold text-white mb-4 transition-colors">{step.title}</h3>
                <p className="text-white/40 text-lg leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          {/* Timeline Indicator at Bottom */}
          <div className="absolute bottom-4 left-12 right-12 flex items-center pointer-events-none">
            <div className="h-[2px] w-full bg-white/10 relative flex items-center">
              <div ref={progressLineRef} className="h-full w-full bg-teal-400 shadow-[0_0_15px_#71c6a4]" />

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
