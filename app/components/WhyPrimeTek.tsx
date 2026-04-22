"use client";

import { useRef, useEffect } from "react";
import {
  Target,
  BarChart3,
  Settings,
  ShieldCheck,
  CheckCircle2
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const STEPS = [
  {
    number: "01",
    title: "We Focus on What Directly Impacts Your Bottom Line",
    description: "Our work is centered around the areas that matter most — reimbursement performance, compliance exposure, operational efficiency, and long-term profitability."
  },
  {
    number: "02",
    title: "We Translate Complexity Into Actionable Insight",
    description: "Pharmacies are constantly receiving data, reports, and payer updates — but very little of it is actionable. We interpret that information and provide clear direction so you can make informed decisions quickly."
  },
  {
    number: "03",
    title: "We Operate as a Structured Extension of Your Business",
    description: "We are not a generic support vendor. We integrate into your operations with defined processes, consistent reporting, and ongoing visibility — allowing you to maintain control without increasing internal workload."
  },
  {
    number: "04",
    title: "We Maintain Strict Non-Clinical Boundaries",
    description: "All services are designed to support your business operations while respecting clinical responsibilities — ensuring compliance without interfering with patient care decisions."
  },
  {
    number: "05",
    title: "We Prioritize Consistency, Not One-Time Fixes",
    description: "Our approach is ongoing and systematic. By monitoring performance, identifying issues early, and maintaining visibility across key areas, we help prevent problems before they escalate."
  }
];

export function WhyPrimeTek() {
  const containerRef = useRef<HTMLElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const h1Ref = useRef<HTMLDivElement>(null);
  const h2Ref = useRef<HTMLDivElement>(null);
  const pRef = useRef<HTMLDivElement>(null);
  const h3Ref = useRef<HTMLDivElement>(null);
  const stepsContainerRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.set([h1Ref.current, h2Ref.current, pRef.current, h3Ref.current, stepsContainerRef.current], {
      opacity: 0,
      y: 20
    });

    stepRefs.current.forEach((el, i) => {
      if (el) gsap.set(el, { flexGrow: i === 0 ? 8 : 0.1 });
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        invalidateOnRefresh: true,
      }
    });

    tl.to(h1Ref.current, { opacity: 1, y: 0, duration: 10 }, 0)
      .to(h2Ref.current, { opacity: 1, y: 0, duration: 10 }, 10)
      .to(pRef.current, { opacity: 1, y: 0, duration: 15 }, 20)
      .to(h3Ref.current, { opacity: 1, y: 0, duration: 10 }, 35);

    tl.to(stepsContainerRef.current, { opacity: 1, y: 0, duration: 20 }, 45);
    const stepsCount = STEPS.length;
    const accordionStart = 65;
    const accordionEnd = 100;
    const accordionDuration = accordionEnd - accordionStart;
    const share = accordionDuration / (stepsCount - 1);

    for (let i = 0; i < stepsCount - 1; i++) {
      const currentStep = stepRefs.current[i];
      const nextStep = stepRefs.current[i + 1];
      const timeOffset = accordionStart + (i * share);

      if (currentStep && nextStep) {
        tl.to(currentStep, { flexGrow: 0.1, duration: share, ease: "power2.inOut" }, timeOffset)
          .to(nextStep, { flexGrow: 8, duration: share, ease: "power2.inOut" }, timeOffset);
      }
    }

    // 4. Progress Bar (Progress: 0% -> 100%)
    tl.to(progressBarRef.current, { scaleX: 1, duration: 100, ease: "none" }, 0);

  }, { scope: mainRef });

  const icons = [
    <Target className="w-8 h-8 md:w-12 md:h-12" key="1" />,
    <BarChart3 className="w-8 h-8 md:w-12 md:h-12" key="2" />,
    <Settings className="w-8 h-8 md:w-12 md:h-12" key="3" />,
    <ShieldCheck className="w-8 h-8 md:w-12 md:h-12" key="4" />,
    <CheckCircle2 className="w-8 h-8 md:w-12 md:h-12" key="5" />
  ];

  return (
    <div ref={mainRef} className="relative w-full bg-white font-sans selection:bg-[#71c6a4]/30">
      <section ref={containerRef} className="relative h-[600vh] bg-white">
        <div className="sticky top-45 h-screen flex flex-col overflow-hidden">

          <div className="flex flex-col items-left justify-left 2xl:px-20 px-10 w-full text-left">
            <div ref={h1Ref} className="mb-5">
              <h2 className="text-4xl 2xl:text-5xl font-bold tracking-tight capitalize text-[#2b4c8c]">
                <span className="text-[#71c6a4]">Why </span>PrimeTek ?
              </h2>
            </div>

            <div ref={h2Ref} className="mb-5">
              <h4 className="text-xl md:text-2xl 2xl:text-3xl font-semibold uppercase text-[#1e293b]">
                Operational Control for a Complex Pharmacy Environment
              </h4>
            </div>

            <div ref={pRef} className="mb-8">
              <p className="text-[#334155] text-base 2xl:text-2xl leading-relaxed">
                Independent and multi-location pharmacies are operating in an increasingly complex environment — where PBM pressure, reimbursement variability, and audit exposure directly impact financial performance. PrimeTek was built to address these challenges through focused, non-clinical operational support that brings clarity, structure, and control to your day-to-day operations.
              </p>
            </div>

            <div ref={h3Ref}>
              <h3 className="text-2xl 2xl:text-3xl font-semibold text-[#2b4c8c] relative">
                What Makes PrimeTek Different
              </h3>
            </div>
          </div>

          <div
            ref={stepsContainerRef}
            className="h-[45vh] 2xl:h-[40vh] flex flex-col 2xl:flex-row border-t border-slate-200 bg-slate-50 mt-10"
          >
            {STEPS.map((step, i) => (
              <div
                key={i}
                ref={(el) => { stepRefs.current[i] = el; }}
                className={`relative flex flex-col group overflow-hidden bg-white shadow-2xl grow-0`}
                style={{ flexBasis: '3%' }}
              >
                <div className="flex h-full w-full relative">
                  <div className="w-12 md:w-20 bg-[#2b4c8c] flex flex-col items-center justify-center flex-shrink-0">
                    <div className="text-white transform group-hover:scale-110 transition-all duration-500">
                      {icons[i]}
                    </div>
                  </div>

                  <div className="flex-1 min-w-[800px] 2xl:min-w-[1200px] flex-shrink-0 overflow-hidden">
                    <div className="p-6 md:p-12 flex gap-8 items-center justify-between h-full">
                      <div className="w-[60%]">
                        <h3 className="text-xl md:text-3xl 2xl:text-4xl font-semibold uppercase text-[#2b4c8c] mb-6 leading-tight whitespace-nowrap">
                          {step.title}
                        </h3>
                        <p className="text-sm 2xl:text-2xl text-[#1e293b] leading-relaxed max-w-2xl">
                          {step.description}
                        </p>
                      </div>

                      <div className="hidden xl:flex flex-1 justify-center items-center h-full w-[40%]">
                        <div className="w-32 h-32 lg:w-48 lg:h-48 rounded-full bg-[#71c6a4]/30 flex items-center justify-center group-hover:bg-[#71c6a4]/10 transition-colors duration-700">
                          <div className="text-[#71c6a4] scale-150 transition-transform duration-700">
                            {icons[i]}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="h-1 w-full bg-slate-200 overflow-hidden">
            <div
              ref={progressBarRef}
              className="h-full w-full bg-[#71c6a4] origin-left scale-x-0"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
