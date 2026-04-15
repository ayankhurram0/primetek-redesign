"use client"
import Image from "next/image";
import React, { use, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import badge1 from "@/src/assets/badges1.png";
import badge2 from "@/src/assets/badges2.png";
import badge3 from "@/src/assets/badges3.png";
import badge4 from "@/src/assets/badges4.png";
import coloredlogo from "@/src/assets/logo-colored.png";

gsap.registerPlugin(ScrollTrigger);

const badgeImages = [
  { src: badge1, label: "HIPAA COMPLIANT", color: "bg-blue-50" },
  { src: badge2, label: "CERTIFIED DEV", color: "bg-emerald-50" },
  { src: badge3, label: "MARKETING", color: "bg-orange-50" },
  { src: badge4, label: "GRAPHIC DESIGN", color: "bg-purple-50" },
];

export const OrbitingSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);
  const orbitRingsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Pinning and Sequential Animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: "+=300%",
          pin: true,
          scrub: 1, 
        },
      });

      // Initial states
      gsap.set([headingRef.current, paragraphRef.current, logoRef.current, badgesRef.current, orbitRingsRef.current], {
        opacity: 0,
        y: 50,
      });
      gsap.set([logoRef.current, badgesRef.current], { scale: 0.8 });

      // Sequence
      tl.to(headingRef.current, { opacity: 1, y: 0, duration: 1 })
        .to(paragraphRef.current, { opacity: 1, y: 0, duration: 1 }, "+=0.5")
        .to([logoRef.current, orbitRingsRef.current], { opacity: 1, y: 0, scale: 1, duration: 1 }, "+=0.5")
        .to(badgesRef.current, { opacity: 1, y: 0, scale: 1, duration: 1 }, "+=0.5");

      // 2. Continuous Orbiting Animation
      const badgeElements = gsap.utils.toArray<HTMLElement>(".orbiting-badge-item");
      badgeElements.forEach((badge, i) => {
        const angle = (i / badgeElements.length) * (Math.PI * 2);
        const radius = 220;

        // Position badges initially
        gsap.set(badge, {
          x: Math.cos(angle) * radius,
          y: Math.sin(angle) * radius,
        });

        // Orbit animation
        gsap.to(badge, {
          duration: 20,
          repeat: -1,
          ease: "none",
          modifiers: {
            x: (x, target) => {
              const time = gsap.ticker.time * 0.3; // Speed control
              const currentAngle = angle + time;
              return Math.cos(currentAngle) * radius;
            },
            y: (y, target) => {
              const time = gsap.ticker.time * 0.3;
              const currentAngle = angle + time;
              return Math.sin(currentAngle) * radius;
            }
          }
        });
      });

      // 3. Logo Pulse
      gsap.to(logoRef.current, {
        scale: 1.05,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="bg-white">
      <div ref={triggerRef} className="h-screen w-full flex flex-col items-center justify-center overflow-hidden px-6 relative">
        {/* Background decorative elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.03)_0%,transparent_70%)]" />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          {/* Step 1: Heading */}
          <h2
            ref={headingRef}
            className="text-4xl md:text-5xl font-display font-bold mb-8 tracking-tight"
          >
            <span className="text-emerald-500">Designed for</span>{" "}
            <span className="text-slate-800">Pharmacies Operating Under Pressure</span>
          </h2>

          {/* Step 2: Paragraph */}
          <p
            ref={paragraphRef}
            className="text-slate-600 text-lg leading-relaxed max-w-3xl mx-auto mb-12"
          >
            Pharmacies today operate under constant pressure from reimbursement variability, payer requirements, and
            operational complexity. PrimeTek delivers structured, non-clinical support within fully compliant, HIPAA-aligned
            frameworks to improve clarity, control, and consistency.
          </p>

          {/* Step 3 & 4: Orbit Visualization */}
          <div className="relative flex items-center justify-center h-[500px]">
            {/* Orbit Paths */}
            <div ref={orbitRingsRef} className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="absolute w-[440px] h-[440px] border border-slate-100/50 rounded-full" />
              <div className="absolute w-[320px] h-[320px] border border-slate-100 rounded-full" />
            </div>

            {/* Central Logo */}
            <div
              ref={logoRef}
              className="relative z-10 w-48 h-48 bg-white rounded-full shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] flex items-center justify-center p-6 border border-slate-100"
            >
              <div className="relative w-full h-full flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-emerald-500/10 rounded-full blur-2xl" />
                <Image src={coloredlogo} alt="PrimeTek Logo" className="w-full h-full object-contain relative z-10" />
              </div>
            </div>

            {/* Step 4: Orbiting Badges */}
            <div
              ref={badgesRef}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              {badgeImages.map((badge, i) => (
                <div
                  key={i}
                  className="orbiting-badge-item absolute pointer-events-auto group"
                >
                  <div className={`w-20 h-20 ${badge.color} rounded-full flex flex-col items-center justify-center p-2 shadow-xl border-2 border-white transition-all duration-300 hover:scale-110 hover:shadow-2xl`}>
                    <Image src={badge.src} alt={badge.label} className="w-full h-full object-contain" />
                    <span className="text-[8px] font-bold text-slate-600 mt-1 text-center leading-tight">
                      {badge.label}
                    </span>
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
