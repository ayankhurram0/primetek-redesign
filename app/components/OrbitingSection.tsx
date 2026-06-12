"use client"
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import badge1 from "@/src/assets/badges1.png";
import badge2 from "@/src/assets/badges2.png";
import badge3 from "@/src/assets/badges3.png";
import badge4 from "@/src/assets/badges4.png";
import coloredlogo from "@/src/assets/logo-colored.png";


// Shim for next/image to keep JSX identical while working in Vite
const Image = ({ src, alt, className }: { src: string | { src: string }; alt: string; className?: string }) => (
  <img
    src={typeof src === "string" ? src : (src as { src: string }).src}
    alt={alt}
    className={className}
    referrerPolicy="no-referrer"
  />
);

gsap.registerPlugin(ScrollTrigger);

const badgeData = [
  {
    src: badge2, // Audit
    title: "Audit",
    sub: "Monitoring",
    desc: "Proactive monitoring to identify issues before they become problems.",
    accent: "#2dd4bf",
    hoverGlow: "hover:shadow-[0_0_50px_rgba(45,212,191,0.3)] hover:border-teal-400",
    textColor: "text-teal-400",
    labelPos: "right"
  },
  {
    src: badge3, // Operational
    title: "Operational",
    sub: "Efficiency",
    desc: "Improve workflows and consistency across your pharmacy.",
    accent: "orange",
    hoverGlow: "hover:shadow-[0_0_50px_rgba(255,165,0,0.3)] hover:border-orange-500",
    textColor: "text-orange-500",
    labelPos: "right"
  },
  {
    src: badge4, // Data Security
    title: "Data Security",
    sub: "& Privacy",
    desc: "HIPAA-aligned systems designed to protect sensitive data.",
    accent: "#2563eb",
    hoverGlow: "hover:shadow-[0_0_50px_rgba(37,99,235,0.3)] hover:border-blue-500",
    textColor: "text-blue-500",
    labelPos: "left"
  },
  {
    src: badge1, // Compliance
    title: "Compliance",
    sub: "Frameworks",
    desc: "Structured support to maintain compliance and reduce risk.",
    accent: "red",
    hoverGlow: "hover:shadow-[0_0_50px_rgba(255,0,0,0.3)] hover:border-red-500",
    textColor: "text-red-500",
    labelPos: "right"
  },
];

export const OrbitingSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);
  const orbitRingsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    // Position badges statically around the circle and start them hidden/scaled down
    const badgeElements = gsap.utils.toArray<HTMLElement>(".orbiting-badge-item");
    badgeElements.forEach((badge, i) => {
      const angle = (i / badgeElements.length) * (Math.PI * 2);
      const radius = window.innerWidth > 1536 ? 320 : 250;
      gsap.set(badge, {
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
        opacity: 0
      });
    });

    // Start logo and rings hidden
    gsap.set([logoRef.current, orbitRingsRef.current], {
      opacity: 0
    });

    // Add continuous rotation animation
    const rotationTl = gsap.to(badgesRef.current, {
      rotation: 360,
      duration: 60,
      repeat: -1,
      ease: "none"
    });

    // Keep badges upright by counter-rotating them
    const counterRotationTl = gsap.to(".orbiting-badge-item", {
      rotation: -360,
      duration: 60,
      repeat: -1,
      ease: "none"
    });

    // Orchestrated ScrollTrigger reveal sequence
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerRef.current,
        start: "top 75%",
        toggleActions: "play none none reverse"
      }
    });

    // 1. Text reveals
    tl.fromTo(headingRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.8, ease: "power2.out" }
    );

    tl.fromTo(paragraphRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.8, ease: "power2.out" },
      "-=0.5"
    );

    // 2. Rings fade
    tl.fromTo(orbitRingsRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.0, ease: "power2.out" },
      "-=0.6"
    );

    // 3. Central logo fades in
    tl.fromTo(logoRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.8, ease: "power2.out" },
      "-=0.8"
    );

    // 4. Badges fade in one-by-one (staggered)
    tl.fromTo(".orbiting-badge-item",
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out"
      },
      "-=0.4"
    );

    return () => {
      rotationTl.kill();
      counterRotationTl.kill();
      tl.kill();
    };
  }, []);

  return (
    <div id="orbit-section" ref={sectionRef} className="relative w-full overflow-hidden">
      <div ref={triggerRef} className="h-auto w-full flex flex-col items-center justify-center overflow-hidden px-6 relative py-30">

        <div className="relative z-10 w-[100%] mx-auto text-center mt-30 flex items-center justify-center">
          <div className="w-[35%] 2xl:pl-20 pl-10">
            <h2
              ref={headingRef}
              className="text-4xl 2xl:text-6xl font-bold mb-8 tracking-tight text-left capitalize"
            >
              <span className="text-teal-400">Designed for</span>{" "}
              <span className="text-white">Pharmacies Operating Under Pressure</span>
            </h2>

            <p
              ref={paragraphRef}
              className="text-slate-400 2xl:text-2xl text-md leading-relaxed mb-12 text-left"
            >
              Pharmacies today operate under constant pressure from reimbursement variability, payer requirements, and
              operational complexity. PrimeTek delivers structured, non-clinical support within fully compliant, HIPAA-aligned
              frameworks to improve clarity, control, and consistency.
            </p>
          </div>

          <div className="relative flex items-center justify-center h-[600px] w-[65%]">
            <div ref={orbitRingsRef} className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="absolute 2xl:w-[760px] 2xl:h-[760px] w-[580px] h-[580px] border border-white/5 rounded-full" />
              <div className="absolute 2xl:w-[480px] 2xl:h-[480px] w-[360px] h-[360px] border border-blue-500/5 rounded-full" />
            </div>

            <div
              ref={logoRef}
              className="relative z-10 2xl:w-72 2xl:h-72 w-52 h-52 bg-white/5 backdrop-blur-3xl rounded-full shadow-[0_0_80px_rgba(43,76,140,0.15)] flex items-center justify-center p-10 border border-white/10"
            >
              <div className="relative w-full h-full flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 to-teal-400/30 rounded-full blur-3xl animate-pulse" />
                <Image src={coloredlogo} alt="PrimeTek Logo" className="w-full h-full object-contain relative z-10 p-4" />
              </div>
            </div>

            <div
              ref={badgesRef}
              className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
            >
              {badgeData.map((badge, i) => (
                <div
                  key={i}
                  className="orbiting-badge-item absolute pointer-events-auto group"
                >
                  <div className={`flex items-center gap-4 relative ${badge.labelPos === 'left' ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-20 h-20 2xl:w-28 2xl:h-28 bg-white/5 backdrop-blur-3xl rounded-full flex items-center justify-center p-4 shadow-2xl border-2 border-white/10 transition-all duration-500 hover:scale-110 ${badge.hoverGlow} cursor-pointer`}>
                      <Image src={badge.src} alt={badge.title} className="w-full h-full object-contain rounded-full" />
                    </div>

                    <div className={`text-left w-64 transition-all duration-300 ${badge.labelPos === 'left' ? 'text-right mr-4' : 'ml-4'}`}>
                      <div className={`font-bold text-xs uppercase tracking-[0.25em] mb-1 ${badge.textColor}`}>{badge.title}</div>
                      <div className="text-white font-bold text-xl mb-1.5 leading-none">{badge.sub}</div>
                      <div className="text-white/50 text-[13px] leading-relaxed line-clamp-3 font-medium">{badge.desc}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};




