"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FancyButton from "./button";
import Globe from "./Globe";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * ConsultationCTA component with 'Arrive & Depart' scrubbed GSAP animation.
 */
export default function ConsultationCTA() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !headingRef.current || !textRef.current || !buttonRef.current) return;

    const originalHeadingContent = headingRef.current?.innerHTML || "";

    const ctx = gsap.context(() => {
      // Split heading into individual words and then characters to prevent word-breaks
      const text = headingRef.current?.textContent || "";
      headingRef.current!.innerHTML = text
        .split(" ")
        .map((word) =>
          `<span class="word inline-block whitespace-nowrap overflow-visible">
            ${word.split("").map(char => `<span class="char opacity-0 inline-block transform translate-y-full">${char}</span>`).join("")}
          </span>`
        )
        .join(" ");

      const chars = headingRef.current?.querySelectorAll(".char");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 2,
        },
      });

      // 1. ARRIVAL PHASE (0% to 50%)
      if (chars && chars.length > 0) {
        tl.to(chars, {
          opacity: 1,
          y: 0,
          stagger: 0.01,
          duration: 1,
          ease: "none",
        });
      }

      tl.fromTo(textRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "none" },
        "-=0.5"
      );

      tl.fromTo(buttonRef.current,
        { opacity: 0, y: 80, scale: 0.5 },
        { opacity: 1, y: 0, scale: 1, duration: 1, ease: "none" },
        "-=0.5"
      );

      // 2. DEPARTURE PHASE (50% to 100%)
      tl.to([headingRef.current, textRef.current], {
        opacity: 0,
        y: -100,
        duration: 1.5,
        ease: "none",
      }, "+=2");

      tl.to(buttonRef.current, {
        opacity: 0,
        y: -150,
        scale: 0.5,
        duration: 1.5,
        ease: "none",
      }, "-=1.5");

    }, sectionRef);

    return () => {
      ctx.revert();
      if (headingRef.current) {
        headingRef.current.innerHTML = originalHeadingContent;
      }
    };
  }, []);

  return (
    <section className="pb-60 bg-[#020817]">
      <div className="w-[95%] max-w-[1800px] mx-auto px-6 md:px-12">
        <div ref={sectionRef} className="rounded-[4rem] py-24 px-8 text-center relative overflow-hidden group">
          {/* Interactive Globe Background */}
          <div className="absolute inset-0 z-0 opacity-20 pointer-events-none transition-opacity duration-700 group-hover:opacity-40 scale-[2.5] overflow-hidden">
            <Globe />
          </div>

          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 ref={headingRef} className="text-white text-4xl 2xl:text-5xl font-bold mb-8 drop-shadow-sm">
              Operational Support for Modern Healthcare
            </h2>

            <p ref={textRef} className="text-slate-400 text-md 2xl:text-xl font-medium leading-relaxed mb-12 max-w-3xl mx-auto px-4">
              Primetek Services delivers compliance-aware, non-clinical solutions that help healthcare organizations streamline operations, improve communication, and optimize performance—without crossing clinical boundaries.
            </p>

            <div ref={buttonRef} className="w-fit mx-auto">
              <FancyButton
                label="Request a Strategy Call"
                textColor="white"
                borderColor="[#71c6a4]"
                rippleColor="#2b4c8c"
                bgColor="#71c6a4"
                extraClasses="hover:border-[#2b4c8c] hover:text-white transition-all duration-300 py-6 px-12 text-lg shadow-lg border-2"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
