"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, MotionValue } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Diamond, Square, Activity, LayoutGrid } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const StepItem = ({ step, i, totalSteps, scrollYProgress }: { 
  step: { id: string; title: string; desc: string; bullets: string[]; icon: React.ReactNode }; 
  i: number; 
  totalSteps: number; 
  scrollYProgress: MotionValue<number>; 
}) => {
  const stepStart = i / totalSteps;
  const stepEnd = (i + 1) / totalSteps;

  // Ensure ranges are within [0, 1] and strictly increasing
  const getSafeRange = (baseRange: number[]) => {
    return baseRange.map((val, idx, arr) => {
      const clamped = Math.max(0, Math.min(1, val));
      if (idx > 0 && clamped <= arr[idx - 1]) {
        return Math.min(1, arr[idx - 1] + 0.0001);
      }
      return clamped;
    });
  };

  const flexRange = getSafeRange([
    i === 0 ? -0.1 : stepStart - 0.05,
    i === 0 ? 0 : stepStart,
    i === totalSteps - 1 ? 1 : stepEnd,
    i === totalSteps - 1 ? 1.1 : stepEnd + 0.05
  ]);

  // Flex value: 4 when active, 0.15 when inactive
  const flexValue = useTransform(
    scrollYProgress,
    flexRange,
    [i === 0 ? 4 : 0.15, 4, 4, i === totalSteps - 1 ? 4 : 0.15],
    { clamp: true }
  );

  return (
    <motion.div
      style={{ flex: flexValue }}
      className={`relative flex flex-col border-ink/10 ${i !== totalSteps - 1 ? 'md:border-r' : ''} border-b md:border-b-0 group overflow-hidden bg-transparent backdrop-blur-sm font-montserrat`}
    >
      <div className="flex h-full w-full relative">
        {/* Step Label (Always Visible) */}
        <div className="w-14 border-r border-ink/10 flex flex-col items-center justify-between py-12 flex-shrink-0 bg-white/60 z-10">
          <span className="rotate-[-90deg] whitespace-nowrap text-[9px] font-bold uppercase tracking-[0.3em] text-ink">
            Step {step.id}
          </span>
          <div className="text-accent group-hover:text-ink transition-colors">
            {step.icon}
          </div>
        </div>

        {/* Expanded Content */}
        <motion.div
          className="flex-1 p-8 md:p-16 flex flex-col min-w-[300px] md:min-w-[500px]"
        >
          <div className="mb-12">
            <h3 className="text-3xl md:text-4xl font-bold uppercase tracking-tight mb-8 text-black">{step.title}</h3>
            <p className="text-base text-black mb-10 leading-relaxed max-w-xl">
              {step.desc}
            </p>

            <ul className="space-y-4 mb-12">
              {step.bullets.map((bullet: string, j: number) => (
                <li key={j} className="flex items-start gap-4 text-sm text-black">
                  <span className="w-1.5 h-1.5 rounded-full bg-black mt-1.5 flex-shrink-0" />
                  {bullet}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

const WorkingProcess = () => {
  const steps = [
    {
      id: "1",
      title: "Discovery and Research",
      desc: "Identify client needs and gather market insights through focused stakeholder discussions and basic market analysis.",
      bullets: [
        "Conduct stakeholder meetings to understand objectives.",
        "Perform competitive analysis and research market trends."
      ],
      icon: <Diamond className="w-5 h-5" />,
    },
    {
      id: "2",
      title: "Strategy Development",
      desc: "Craft a focused strategy that aligns client goals with market trends and brand values. Lorem ipsum dolor sit amet. Et veritatis modi qui.",
      bullets: [
        "Define a clear brand message and value proposition.",
        "Outline actionable steps to reach the target audience."
      ],
      icon: <Square className="w-5 h-5" />,
    },
    {
      id: "3",
      title: "Creative Concepting",
      desc: "Develop creative concepts to transform the strategy into engaging visual and narrative ideas.",
      bullets: [
        "Brainstorm innovative ideas and design directions.",
        "Create mood boards to visualize the creative direction."
      ],
      icon: <Activity className="w-5 h-5" />,
    },
    {
      id: "4",
      title: "Execution and Implementation",
      desc: "Bring creative ideas to life with efficient execution and continuous refinement. Lorem ipsum dolor sit amet. Et veritatis modi qui similique.",
      bullets: [
        "Finalize design assets and launch marketing campaigns.",
        "Monitor performance and adjust strategies based on feedback."
      ],
      icon: <LayoutGrid className="w-5 h-5" />,
    }
  ];

  const containerRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
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
        defaults: { ease: "power4.out", duration: 1.2 }
      });

      tl.from(".framework-label", {
        y: 30,
        opacity: 0,
        delay: 0.1
      })
      .from(".framework-title-left", {
        y: 40,
        opacity: 0
      }, "-=0.9")
      .from(".framework-title-right", {
        y: 40,
        opacity: 0
      }, "-=0.8")
      .from(".framework-subtitle", {
        y: 30,
        opacity: 0
      }, "-=0.8");
    }, headerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="process" ref={containerRef} className="relative h-[500vh] bg-transparent text-ink border-t border-ink/10 font-montserrat">
      <div className="sticky top-0 h-screen flex flex-col overflow-hidden ">
        <div ref={headerRef} className="max-w-[80%] mx-auto px-6 py-12 md:py-16 flex flex-col md:flex-row justify-between items-start gap-8 w-full mt-30">
          <div>
            <span className="framework-label inline-block text-ink-muted  text-xs uppercase tracking-[0.3em]">PrimeTek Services applies a structured methodology designed specifically for pharmacy environments.</span>
            <h3 className="framework-title-left text-3xl text-ink md:text-5xl font-bold mt-10">Our 4-Step Operational Framework</h3>
          </div>
          <div>
            <h2 className="framework-title-right text-3xl text-ink md:text-5xl font-bold max-w-3xl leading-tight uppercase">
              Our Framework
            </h2>
            <h4 className="framework-subtitle text-3xl text-ink-muted md:text-lg font-medium max-w-3xl leading-tight uppercase mt-10">
              A disciplined approach to managing performance, reducing risk, and maintaining operational control.
            </h4>
          </div>

        </div>

        <div className="h-[50vh] flex flex-col md:flex-row border-t border-ink/10 relative">
          {steps.map((step, i) => (
            <StepItem 
              key={i} 
              step={step} 
              i={i} 
              totalSteps={steps.length} 
              scrollYProgress={scrollYProgress} 
            />
          ))}
        </div>

        {/* Progress Bar */}
        <div className="h-1 w-full bg-white/65 relative">
          <motion.div
            style={{ scaleX: scrollYProgress }}
            className="absolute top-0 left-0 h-full w-full bg-teal-400 origin-left shadow-[0_0_15px_rgba(45,212,191,0.5)]"
          />
        </div>
      </div>
    </section>
  );
};

export default WorkingProcess;
