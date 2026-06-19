"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import vandm1 from "@/src/assets/vandm1.png";
import vandm5 from "@/src/assets/vandm5.png";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: "01",
    title: "Vision",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis nostrud exercitation.",
    img: vandm1,
    imgAlt: "Pharmacist in store aisle",
    flip: false,
  },
  {
    number: "02",
    title: "Mission",
    body: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
    img: vandm5,
    imgAlt: "Pharmacist with family in store",
    flip: true,
    isLast: true,
  },
];

export const OurJourney = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      document.querySelectorAll(".jrow").forEach((row) => {
        const isFlipped = row.classList.contains("flipped");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: "top 80%",
            toggleActions: "play none none none",
          }
        });

        // 1. Number animates first
        tl.from(row.querySelector(".jrow-num"), {
          opacity: 0,
          y: -20,
          duration: 0.5,
          ease: "power2.out"
        });

        // 2. Timeline line draws down sequentially from the number
        tl.from(row.querySelector(".jrow-line"), {
          scaleY: 0,
          transformOrigin: "top center",
          duration: 0.6,
          ease: "power1.inOut"
        }, "-=0.25");

        // 3. Circle dot pop scale-up at the bottom of the line
        tl.from(row.querySelector(".jrow-dot"), {
          scale: 0,
          duration: 0.45,
          ease: "back.out(2)"
        }, "-=0.15");

        // 4. Text content fades & slides in
        tl.from(row.querySelector(".jrow-content"), {
          opacity: 0,
          x: isFlipped ? 30 : -30,
          duration: 0.7,
          ease: "power3.out"
        }, "-=0.3");

        // 5. Image fades & scales in smoothly
        tl.from(row.querySelector(".jrow-img-container"), {
          opacity: 0,
          scale: 0.95,
          duration: 0.8,
          ease: "power2.out"
        }, "-=0.5");
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-transparent">
      {steps.map((step, i) => (
        <div
          key={step.number}
          className={`jrow ${step.flip ? "flipped" : ""} relative flex ${step.flip ? "flex-row-reverse" : "flex-row"
            } items-stretch min-h-[340px] border-b border-white/5`}
        >
          {/* ── TEXT COLUMN ── */}
          <div className="jrow-text flex flex-row items-center w-full lg:w-1/2 px-8 md:px-14 xl:px-20 py-16 relative z-10">
            {/* Timeline graphic track on the left */}
            <div className="flex flex-col items-center mr-6 md:mr-8 pt-2 shrink-0">
              <span className="jrow-num text-teal-400 font-bold text-4xl md:text-5xl lg:text-6xl leading-none font-mono tracking-tight mb-4">
                {step.number}
              </span>
              <div className="jrow-line w-[1.5px] h-32 md:h-40 bg-gradient-to-b from-teal-500/50 to-teal-500/10 origin-top" />
              <div className="jrow-dot w-2 h-2 rounded-full bg-teal-400 mt-2 shadow-[0_0_8px_#14b8a6]" />
            </div>

            {/* Text content on the right */}
            <div className="jrow-content flex-1 flex flex-col justify-center">
              {/* Title */}
              <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white uppercase tracking-tight leading-none mb-6 font-display whitespace-pre-line">
                {step.title}
              </h2>

              {/* Body */}
              <p className="text-base md:text-lg lg:text-xl text-slate-400 font-light leading-relaxed max-w-xl">
                {step.body}
              </p>

              {/* WE ARE PRIMETEK footer */}
              {step.isLast && (
                <div className="mt-12 pt-6 border-t border-white/10">
                  <span className="text-teal-400 font-bold uppercase tracking-[0.3em] text-sm">
                    We Are PrimeTek
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* ── IMAGE COLUMN ── */}
          <div
            className="jrow-img-container relative w-full lg:w-1/2 overflow-hidden flex items-center justify-center"
            style={{
              WebkitMaskImage: step.flip
                ? "radial-gradient(ellipse at left center, black 15%, rgba(0,0,0,0.9) 35%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0.4) 65%, rgba(0,0,0,0.15) 80%, rgba(0,0,0,0.05) 90%, transparent 100%)"
                : "radial-gradient(ellipse at right center, black 15%, rgba(0,0,0,0.9) 35%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0.4) 65%, rgba(0,0,0,0.15) 80%, rgba(0,0,0,0.05) 90%, transparent 100%)",
              maskImage: step.flip
                ? "radial-gradient(ellipse at left center, black 15%, rgba(0,0,0,0.9) 35%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0.4) 65%, rgba(0,0,0,0.15) 80%, rgba(0,0,0,0.05) 90%, transparent 100%)"
                : "radial-gradient(ellipse at right center, black 15%, rgba(0,0,0,0.9) 35%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0.4) 65%, rgba(0,0,0,0.15) 80%, rgba(0,0,0,0.05) 90%, transparent 100%)"
            }}
          >
            <Image
              src={step.img}
              alt={step.imgAlt}
              className="w-full h-[450px] object-cover opacity-75 hover:opacity-95 transition-opacity duration-700 mix-blend-lighten"
              style={{ minHeight: "340px" }}
            />
          </div>
        </div>
      ))}
    </section>
  );
};
