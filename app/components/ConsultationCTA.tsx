"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FancyButton from "./button";
import Globe from "./Globe";
import { DecorativeBackground } from "./DecorativeBackground";
import Link from "next/link";

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
      // Robust word splitting that preserves layout
      const text = headingRef.current?.textContent || "";
      headingRef.current!.innerHTML = "";
      text.split(" ").forEach((word, i, arr) => {
        const span = document.createElement("span");
        span.className = "word inline-block relative";
        span.textContent = word + (i === arr.length - 1 ? "" : "\u00A0");
        headingRef.current!.appendChild(span);
      });

      const words = headingRef.current?.querySelectorAll(".word");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      // 1. ARRIVAL PHASE
      if (words && words.length > 0) {
        tl.from(words, {
          opacity: 0,
          y: 20,
          stagger: 0.03,
          duration: 0.6,
          ease: "power2.out",
        });
      }

      tl.from(textRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power2.out"
      }, "-=0.3");

      tl.from(buttonRef.current, {
        opacity: 0,
        y: 20,
        scale: 0.95,
        duration: 0.6,
        ease: "back.out(1.2)"
      }, "-=0.3");

    }, sectionRef);

    return () => {
      ctx.revert();
      if (headingRef.current) {
        headingRef.current.innerHTML = originalHeadingContent;
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden flex flex-col items-center justify-center py-24 px-26"
    >
      <DecorativeBackground id="cta" />

      {/* Blending Masks */}
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-[#020817] to-transparent z-10" />
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[#020817] to-transparent z-10" />

      {/* Subtle Atmospheric Glows */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(113,198,164,0.05)_0%,transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(59,130,246,0.03)_0%,transparent_70%)]" />

      <div className="w-full px-26">
        <div className="rounded-[4rem] py-24 px-8 text-center relative overflow-hidden group">
          {/* Interactive Globe Background */}
          <div className="absolute inset-0 z-0 opacity-20 pointer-events-none transition-opacity duration-700 group-hover:opacity-40 scale-[2.5] overflow-hidden">
            <Globe />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto">
            <h2 ref={headingRef} className="text-white text-4xl 2xl:text-6xl font-bold mb-8 drop-shadow-sm flex flex-wrap justify-center leading-[1.2]">
              Operational Support for <br /> <span className="text-teal-400">Modern Healthcare</span>
            </h2>

            <p ref={textRef} className="text-slate-400 text-md 2xl:text-2xl font-medium leading-relaxed mb-12 max-w-3xl mx-auto px-4">
              Primetek Services delivers compliance-aware, non-clinical solutions that help healthcare organizations streamline operations, improve communication, and optimize performance—without crossing clinical boundaries.
            </p>

            <div ref={buttonRef} className="w-fit mx-auto">
              <Link href="/contact">
                <FancyButton
                  label="Request a Strategy Call"
                  textColor="white"
                  borderColor="teal-400"
                  rippleColor="#2b4c8c"
                  bgColor="teal-400"
                  extraClasses="hover:border-[#2b4c8c] hover:text-white transition-all duration-300 py-6 px-12 text-lg shadow-lg border-2"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
