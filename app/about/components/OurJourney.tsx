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
    title: "VISION",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    img: vandm1,
    imgAlt: "Vision image",
    flip: false,
  },
  {
    number: "02",
    title: "MISSION",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    img: vandm5,
    imgAlt: "Mission image",
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

        // Text content fades & slides in
        tl.from(row.querySelector(".jrow-content"), {
          opacity: 0,
          x: isFlipped ? 30 : -30,
          duration: 0.7,
          ease: "power3.out"
        });

        // Image fades & scales in smoothly
        tl.from(row.querySelector(".jrow-img-container"), {
          opacity: 0,
          scale: 0.95,
          duration: 0.8,
          ease: "power2.out"
        }, "-=0.4");
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-transparent py-12 flex flex-col gap-20">
      {steps.map((step, i) => (
        <div
          key={step.number}
          className={`jrow ${step.flip ? "flipped" : ""} relative flex flex-col lg:flex-row ${step.flip ? "lg:flex-row-reverse" : ""
            } items-stretch min-h-[340px]`}
        >
          {/* ── TEXT COLUMN ── */}
          <div className="jrow-text flex flex-row items-center w-full lg:w-1/2 px-8 md:px-14 xl:px-20 py-16 relative z-10 ">
            {/* Text content */}
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
                <div className="mt-12 pt-6">
                  <span className="text-teal-400 font-bold uppercase tracking-[0.3em] text-sm">
                    We Are PrimeTek
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* ── IMAGE COLUMN ── */}
          <div className="jrow-img-container relative w-full lg:w-1/2 min-h-[550px] overflow-hidden">
            {/* Outer div: Horizontal Fade */}
            <div
              className="absolute inset-0 w-full h-full"
              style={{
                maskImage: step.flip
                  ? "linear-gradient(to right, rgba(0,0,0,1) 45%, rgba(0,0,0,0) 100%)"
                  : "linear-gradient(to left, rgba(0,0,0,1) 45%, rgba(0,0,0,0) 100%)",
                WebkitMaskImage: step.flip
                  ? "linear-gradient(to right, rgba(0,0,0,1) 45%, rgba(0,0,0,0) 100%)"
                  : "linear-gradient(to left, rgba(0,0,0,1) 45%, rgba(0,0,0,0) 100%)",
              }}
            >
              {/* Inner div: Vertical Fade */}
              <div
                className="w-full h-full relative"
                style={{
                  maskImage: "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 15%, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 100%)",
                  WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 15%, rgba(0,0,0,1) 85%, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 100%)",
                }}
              >
                <Image
                  src={step.img}
                  alt={step.imgAlt}
                  fill
                  priority
                  className="
                    object-cover
                    scale-105
                    opacity-85
                    transition-all
                    duration-700
                  "
                />

                {/* Soft teal atmospheric glow */}
                <div
                  className={`absolute inset-0 ${step.flip
                    ? "bg-[radial-gradient(circle_at_75%_50%,rgba(0,89,105,0.15),transparent_55%)]"
                    : "bg-[radial-gradient(circle_at_25%_50%,rgba(0,89,105,0.15),transparent_55%)]"
                    } blur-[100px]`}
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};
