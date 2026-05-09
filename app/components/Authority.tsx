'use client'
import { useEffect, useRef } from "react";
import Image from "next/image";
import vidImg from "@/src/assets/vidimg.png";
import sec7 from "@/src/assets/sec7.png";
import sec8 from "@/src/assets/sec8.png";
import AnimationWrapper from "./AnimationWrapper";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Register GSAP plugins
 */
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Authority() {
  const differentiators = [
    {
      title: "We Focus on What Directly Impacts Your Bottom Line",
      desc: "Our work is centered around the areas that matter most — reimbursement performance, compliance exposure, operational efficiency, and long-term profitability."
    },
    {
      title: "We Translate Complexity Into Actionable Insight",
      desc: "Pharmacies are constantly receiving data, reports, and payer updates — but very little of it is actionable. We interpret that information and provide clear direction so you can make informed decisions quickly."
    },
    {
      title: "We Operate as a Structured Extension of Your Business",
      desc: "We are not a generic support vendor. We integrate into your operations with defined processes, consistent reporting, and ongoing visibility — allowing you to maintain control without increasing internal workload."
    },
    {
      title: "We Maintain Strict Non-Clinical Boundaries",
      desc: "All services are designed to support your business operations while respecting clinical responsibilities — ensuring compliance without interfering with patient care decisions."
    },
    {
      title: "We Prioritize Consistency, Not One-Time Fixes",
      desc: "Our approach is ongoing and systematic. By monitoring performance, identifying issues early, and maintaining visibility across key areas, we help prevent problems before they escalate."
    }
  ];

  const frameworkSteps = [
    {
      title: "Assess",
      desc: "Review workflows, reporting structures, and areas of potential exposure."
    },
    {
      title: "Align",
      desc: "Adapt operational processes based on your pharmacy's payer mix and performance patterns."
    },
    {
      title: "Implement",
      desc: "Deploy consistent monitoring, reporting, and support across selected service areas."
    },
    {
      title: "Optimize",
      desc: "Continuously evaluate results, identify issues early, and refine operational performance."
    }
  ];

  const whyContainerRef = useRef<HTMLDivElement>(null);
  const frameContainerRef = useRef<HTMLDivElement>(null);
  const whyListRef = useRef<HTMLDivElement>(null);
  const frameListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Why PrimeTek Pinned Sequential Animation
      if (whyContainerRef.current && whyListRef.current) {
        const items = whyListRef.current.querySelectorAll(".diff-item");
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: whyContainerRef.current,
            start: "top -30%",
            end: "+=2500",
            scrub: 1,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
          }
        });

        // Intro delay
        tl.to({}, { duration: 0.5 });

        items.forEach((item: Element, idx: number) => {
          const num = item.querySelector(".diff-num");
          const title = item.querySelector(".diff-title");
          const desc = item.querySelector(".diff-desc");

          tl.fromTo(num, { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 1 });
          tl.fromTo(title, { opacity: 0, x: 50 }, { opacity: 1, x: 0, duration: 1 }, "-=0.6");
          tl.fromTo(desc, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1 }, "-=0.6");

          if (idx < items.length - 1) tl.to({}, { duration: 0.8 });
        });
      }

      // 2. Our Framework Pinned Sequential Animation
      if (frameContainerRef.current && frameListRef.current) {
        const items = frameListRef.current.querySelectorAll(".frame-item");
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: frameContainerRef.current,
            start: "top -20%",
            end: "+=3000",
            scrub: 1,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
          }
        });

        // Intro delay
        tl.to({}, { duration: 0.5 });

        items.forEach((item: Element, idx: number) => {
          const num = item.querySelector(".frame-num");
          const title = item.querySelector(".frame-title");
          const desc = item.querySelector(".frame-desc");

          // Show item with stagger
          tl.fromTo(num, { opacity: 0, scale: 0.2 }, { opacity: 1, scale: 1, duration: 0.8 });
          tl.fromTo(title, { opacity: 0, x: 50 }, { opacity: 1, x: 0, duration: 0.8 }, "-=0.4");
          tl.fromTo(desc, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, "-=0.4");

          // Hide item before showing next one
          if (idx < items.length - 1) {
            tl.to(num, { opacity: 0, scale: 0.2, duration: 0.5 });
            tl.to(title, { opacity: 0, x: -50, duration: 0.5 }, "-=0.3");
            tl.to(desc, { opacity: 0, y: -20, duration: 0.5 }, "-=0.3");
            tl.to({}, { duration: 0.5 });

            // Move next item to first position
            const nextItem = items[idx + 1];
            const nextNum = nextItem.querySelector(".frame-num");
            const nextTitle = nextItem.querySelector(".frame-title");
            const nextDesc = nextItem.querySelector(".frame-desc");

            // Calculate the distance to move (based on gap and item height)
            const moveDistance = -96 * (idx + 1); // Approximate item height + gap

            tl.to(nextItem, { y: moveDistance, duration: 0.5 });
          }
        });

        // Show final state with all items
        tl.to({}, { duration: 0.5 });
        items.forEach((item: Element, idx: number) => {
          const num = item.querySelector(".frame-num");
          const title = item.querySelector(".frame-title");
          const desc = item.querySelector(".frame-desc");

          // Reset item position and show all with stagger
          tl.to(item, { y: 0, duration: 0.5 });
          tl.to(num, { opacity: 1, scale: 1, duration: 0.5 }, `-=${0.1 * idx}`);
          tl.to(title, { opacity: 1, x: 0, duration: 0.5 }, `-=${0.1 * idx}`);
          tl.to(desc, { opacity: 1, y: 0, duration: 0.5 }, `-=${0.1 * idx}`);
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="bg-white overflow-hidden">
      <div className="w-[95%] max-w-[1800px] mx-auto">
        <div ref={whyContainerRef} className="flex flex-col lg:flex-row-reverse items-center min-h-screen py-30 pt-60 gap-16 lg:gap-24">
          <div className="w-full lg:w-1/2">
            <h2 className="text-5xl font-bold mb-10 leading-tight">
              <span className="text-[#64c4ad]">Why</span>{" "}
              <span className="text-[#2b4c8c]">PrimeTek</span>
            </h2>
            <div className="flex flex-col gap-4 text-black">
              <p className="2xl:text-2xl text-xl font-bold text-black leading-relaxed uppercase tracking-wide">
                Operational Control for a Complex Pharmacy Environment
              </p>
              <p className="2xl:text-lg text-base leading-relaxed text-black">
                Independent and multi-location pharmacies are operating in an increasingly complex environment — where PBM pressure, reimbursement variability, and audit exposure directly impact financial performance.
                PrimeTek was built to address these challenges through focused, non-clinical operational support that brings clarity, structure, and control to your day-to-day operations.
              </p>
              <div className="space-y-4 pt-6">
                <h3 className="2xl:text-2xl text-black font-bold text-xl mb-4">What Makes PrimeTek Different</h3>
                <div ref={whyListRef} className="flex flex-col gap-8 text-sm">
                  {differentiators.map((item, idx) => (
                    <div key={idx} className="flex flex-col gap-1 text-black group diff-item">
                      <p className="2xl:text-2xl font-bold text-[#2b4c8c] text-lg flex items-center gap-3 diff-title-row">
                        <span className="text-[#64c4ad] font-bold text-md bg-[#64c4ad]/10 w-10 h-10 rounded-full flex items-center justify-center diff-num">
                          {(idx + 1).toString().padStart(2, '0')}
                        </span>
                        <span className="diff-title 2xl:text-2xl">{item.title}</span>
                      </p>
                      <p className="text-sm 2xl:text-xl text-black  pl-11 leading-relaxed diff-desc">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <div className="rounded-[3rem] overflow-hidden shadow-2xl ring-8 ring-slate-50">
              <Image
                src={sec7}
                alt="Prime Tek Authority"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>

        {/* Our Framework section with pin */}
        <div ref={frameContainerRef} className="flex flex-col lg:flex-row pt-10 min-h-screen items-center pb-30 pt-60 gap-16 lg:gap-24">
          <div className="w-full lg:w-1/2">
            <h2 className="text-5xl font-bold mb-10 leading-tight">
              <span className="text-[#64c4ad]">Our</span>{" "}
              <span className="text-[#2b4c8c]">Framework</span>
            </h2>
            <div className="flex flex-col gap-4 text-black">
              <p className="2xl:text-2xl text-xl font-bold text-black leading-relaxed uppercase tracking-wide">
                A disciplined approach to managing performance, reducing risk, and maintaining operational control.
              </p>
              <p className="2xl:text-lg text-base leading-relaxed text-black">
                PrimeTek Services applies a structured methodology designed specifically for pharmacy environments.
              </p>
              <div className="flex flex-col gap-6 pt-6">
                <h3 className="2xl:text-2xl text-black font-bold text-xl mb-4">Our 4-Step Operational Framework</h3>
                <div ref={frameListRef} className="flex flex-col gap-8">
                  {frameworkSteps.map((item, idx) => (
                    <div key={idx} className="flex gap-6 group frame-item">
                      <div className="flex-shrink-0">
                        <span className="text-[#64c4ad] lg:text-4xl font-bold text-md bg-[#64c4ad]/10 w-20 h-20 rounded-full flex items-center justify-center frame-num">
                          {(idx + 1).toString().padStart(2, '0')}
                        </span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <p className="font-bold text-[#2b4c8c] 2xl:text-2xl text-lg frame-title">
                          {item.title}
                        </p>
                        <p className="text-sm 2xl:text-xl text-black leading-relaxed frame-desc">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <div className="rounded-[3rem] overflow-hidden shadow-2xl ring-8 ring-slate-50">
              <Image
                src={sec8}
                alt="Our Framework"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
