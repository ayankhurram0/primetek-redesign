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
    accent: "#3b82f6",
    hoverGlow: "hover:shadow-[0_0_50px_rgba(59,130,246,0.3)] hover:border-blue-400",
    textColor: "text-blue-400",
    labelPos: "right"
  },
  {
    src: badge3, // Operational
    title: "Operational",
    sub: "Efficiency",
    desc: "Improve workflows and consistency across your pharmacy.",
    accent: "#ef4444",
    hoverGlow: "hover:shadow-[0_0_50px_rgba(239,68,68,0.3)] hover:border-red-500",
    textColor: "text-red-500",
    labelPos: "right"
  },
  {
    src: badge4, // Data Security
    title: "Data Security",
    sub: "& Privacy",
    desc: "HIPAA-aligned systems designed to protect sensitive data.",
    accent: "#71c6a4",
    hoverGlow: "hover:shadow-[0_0_50px_rgba(113,198,164,0.3)] hover:border-teal-400",
    textColor: "text-teal-400",
    labelPos: "left"
  },
  {
    src: badge1, // Compliance
    title: "Compliance",
    sub: "Frameworks",
    desc: "Structured support to maintain compliance and reduce risk.",
    accent: "#fbbf24",
    hoverGlow: "hover:shadow-[0_0_50px_rgba(251,191,36,0.3)] hover:border-yellow-400",
    textColor: "text-yellow-400",
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

    const ctx = gsap.context(() => {
      // Initial states - check all refs exist
      const elementsToAnimate = [
        headingRef.current,
        paragraphRef.current,
        logoRef.current,
        badgesRef.current,
        orbitRingsRef.current
      ].filter(Boolean);

      if (elementsToAnimate.length > 0) {
        gsap.set(elementsToAnimate, { opacity: 0, y: 50 });
      }

      if (logoRef.current && badgesRef.current) {
        gsap.set([logoRef.current, badgesRef.current], { scale: 0.8 });
      }

      // ScrollTrigger timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=300%",
          pin: true,
          scrub: 0.5,
          pinSpacing: true,
          invalidateOnRefresh: true,
        },
      });

      // Animate elements only if they exist
      if (headingRef.current) {
        tl.to(headingRef.current, { opacity: 1, y: 0, duration: 1 });
      }
      if (paragraphRef.current) {
        tl.to(paragraphRef.current, { opacity: 1, y: 0, duration: 1 }, "+=0.3");
      }
      if (logoRef.current && orbitRingsRef.current) {
        tl.to([logoRef.current, orbitRingsRef.current], { opacity: 1, y: 0, scale: 1, duration: 1 }, "+=0.3");
      }
      if (badgesRef.current) {
        tl.to(badgesRef.current, { opacity: 1, y: 0, scale: 1, duration: 1 }, "+=0.3");
      }

      // Continuous orbit animation for badges
      const badgeElements = gsap.utils.toArray<HTMLElement>(".orbiting-badge-item");
      badgeElements.forEach((badge, i) => {
        if (!badge) return;
        const startAngle = (i / badgeElements.length) * (Math.PI * 2);
        const radius = window.innerWidth > 1536 ? 320 : 250;

        gsap.set(badge, {
          x: Math.cos(startAngle) * radius,
          y: Math.sin(startAngle) * radius,
        });

        const orbitData = { angle: startAngle };

        gsap.to(orbitData, {
          angle: startAngle + Math.PI * 2,
          duration: 40,
          repeat: -1,
          ease: "none",
          onUpdate: () => {
            if (badge) {
              gsap.set(badge, {
                x: Math.cos(orbitData.angle) * radius,
                y: Math.sin(orbitData.angle) * radius
              });
            }
          }
        });
      });

      // Logo pulse animation
      if (logoRef.current) {
        gsap.to(logoRef.current, {
          scale: 1.05,
          duration: 4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div id="orbit-section" ref={sectionRef} className="relative w-full overflow-hidden">
      <div ref={triggerRef} className="h-screen w-full flex flex-col items-center justify-center overflow-hidden px-6 relative pb-10">
        {/* Layered Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#020817] via-[#051125] to-[#020817]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.06)_0%,transparent_70%)]" />
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_100%_0%,rgba(113,198,164,0.04)_0%,transparent_40%)]" />

        {/* Decorative Elements - Top Right */}
        <div className="absolute -top-20 -right-20 w-[500px] h-[500px] pointer-events-none z-0 opacity-80">
            <svg className="w-full h-full" viewBox="0 0 500 500" fill="none">
                <path d="M500 0 C250 0, 250 250, 0 250" stroke="url(#orbit-gradient-tr)" strokeWidth="3" fill="none" strokeLinecap="round" />
                <path d="M500 80 C300 80, 300 300, 80 300" stroke="url(#orbit-gradient-tr)" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.6" />
                <path d="M500 160 C350 160, 350 350, 160 350" stroke="url(#orbit-gradient-tr)" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.4" />
                {[...Array(8)].map((_, i) => (<circle key={`tr-${i}`} cx={450 - i * 35} cy={30 + i * 25} r="3" fill="#71c6a4" opacity={0.6 + i * 0.05} />))}
                <defs><linearGradient id="orbit-gradient-tr" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#71c6a4" stopOpacity="1" /><stop offset="50%" stopColor="#71c6a4" stopOpacity="0.5" /><stop offset="100%" stopColor="#71c6a4" stopOpacity="0" /></linearGradient></defs>
            </svg>
        </div>

        {/* Decorative Elements - Bottom Left */}
        <div className="absolute -bottom-20 -left-20 w-[500px] h-[500px] pointer-events-none z-0 opacity-80">
            <svg className="w-full h-full" viewBox="0 0 500 500" fill="none">
                <path d="M0 500 C250 500, 250 250, 500 250" stroke="url(#orbit-gradient-bl)" strokeWidth="3" fill="none" strokeLinecap="round" />
                <path d="M0 420 C200 420, 200 200, 420 200" stroke="url(#orbit-gradient-bl)" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.6" />
                <path d="M0 340 C150 340, 150 150, 340 150" stroke="url(#orbit-gradient-bl)" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.4" />
                {[...Array(8)].map((_, i) => (<circle key={`bl-${i}`} cx={30 + i * 35} cy={470 - i * 25} r="3" fill="#71c6a4" opacity={0.6 + i * 0.05} />))}
                <defs><linearGradient id="orbit-gradient-bl" x1="0%" y1="100%" x2="100%" y2="0%"><stop offset="0%" stopColor="#71c6a4" stopOpacity="1" /><stop offset="50%" stopColor="#71c6a4" stopOpacity="0.5" /><stop offset="100%" stopColor="#71c6a4" stopOpacity="0" /></linearGradient></defs>
            </svg>
        </div>

        <div className="relative z-10 w-[100%] mx-auto text-center mt-30 flex items-center justify-center">
          <div className="w-[35%] 2xl:pl-20 pl-10">
            <h2
              ref={headingRef}
              className="text-4xl 2xl:text-5xl font-bold mb-8 tracking-tight text-left capitalize"
            >
              <span className="text-teal-400">Designed for</span>{" "}
              <span className="text-white">Pharmacies Operating Under Pressure</span>
            </h2>

            <p
              ref={paragraphRef}
              className="text-slate-400 2xl:text-xl text-md leading-relaxed mb-12 text-left"
            >
              Pharmacies today operate under constant pressure from reimbursement variability, payer requirements, and
              operational complexity. PrimeTek delivers structured, non-clinical support within fully compliant, HIPAA-aligned
              frameworks to improve clarity, control, and consistency.
            </p>
          </div>

          <div className="relative flex items-center justify-center h-[600px] w-[65%]">
            <div ref={orbitRingsRef} className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="absolute 2xl:w-[760px] 2xl:h-[760px] w-[580px] h-[580px] border border-white/5 rounded-full" />
              <div className="absolute 2xl:w-[640px] 2xl:h-[640px] w-[500px] h-[500px] border border-teal-400/10 rounded-full" />
              <div className="absolute 2xl:w-[480px] 2xl:h-[480px] w-[360px] h-[360px] border border-blue-500/5 rounded-full" />
            </div>

            <div
              ref={logoRef}
              className="relative z-10 2xl:w-72 2xl:h-72 w-52 h-52 bg-[#0a1122]/95 backdrop-blur-3xl rounded-full shadow-[0_0_80px_rgba(43,76,140,0.25)] flex items-center justify-center p-10 border border-white/10"
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
                    <div className={`w-20 h-20 2xl:w-28 2xl:h-28 bg-[#0a1122]/95 backdrop-blur-3xl rounded-full flex items-center justify-center p-4 shadow-2xl border-2 border-white/10 transition-all duration-500 hover:scale-110 ${badge.hoverGlow} cursor-pointer`}>
                      <Image src={badge.src} alt={badge.title} className="w-full h-full object-contain rounded-full" />
                    </div>

                    <div className={`text-left w-64 transition-all duration-300 ${badge.labelPos === 'left' ? 'text-right mr-4' : 'ml-4'}`}>
                      <div className={`font-black text-xs uppercase tracking-[0.25em] mb-1 ${badge.textColor}`}>{badge.title}</div>
                      <div className="text-white font-bold text-xl mb-1.5 leading-none">{badge.sub}</div>
                      <div className="text-white/50 text-[15px] leading-relaxed line-clamp-3 font-medium">{badge.desc}</div>
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




