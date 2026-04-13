'use client'
import Image from "next/image";
import bgImage from "@/src/assets/sec1bg.png";
import FancyButton from "./button";
import { StaggerContainer, StaggerItem } from "./AnimationWrapper";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Hero() {
  const heroRef = useRef<HTMLSelectElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const originalHeadingContent = headingRef.current?.innerHTML || "";

    const ctx = gsap.context(() => {
      if (headingRef.current) {
        const text = headingRef.current.textContent || "";
        headingRef.current.innerHTML = text
          .split(" ")
          .map((word) =>
            `<span class="word inline-block whitespace-nowrap overflow-visible">
              ${word.split("").map(char => `<span class="hero-char opacity-0 inline-block transform translate-y-10">${char}</span>`).join("")}
            </span>`
          )
          .join(" ");

        const tl = gsap.timeline({ delay: 0.5 });

        tl.to(".hero-char", {
          opacity: 1,
          y: 0,
          stagger: 0.01,
          duration: 0.8,
          ease: "power4.out"
        });

        tl.from(".hero-subtitle", {
          opacity: 0,
          x: -50,
          duration: 1,
          ease: "power3.out"
        }, "-=0.6")
          .from(".hero-description", {
            opacity: 0,
            y: 30,
            duration: 1,
            ease: "power3.out"
          }, "-=0.8")
          .from(".hero-btn", {
            opacity: 0,
            scale: 0.8,
            y: 20,
            stagger: 0.2,
            duration: 0.8,
            ease: "back.out(1.7)"
          }, "-=0.8");
      }

      // 2. SCROLL-OUT DEPARTURE (Scrubbed)   
      if (heroRef.current && contentRef.current && videoRef.current) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 2.2,
          }
        });

        tl.to(contentRef.current, {
          y: -250,
          opacity: 0,
          scale: 0.9,
          ease: "none",
        }, 0);

        tl.to(videoRef.current, {
          y: "20%",
          scale: 1.2,
          opacity: 0.4,
          ease: "none",
        }, 0);
      }
    }, heroRef);

    return () => {
      ctx.revert();
      if (headingRef.current) {
        headingRef.current.innerHTML = originalHeadingContent;
      }
    };
  }, []);

  return (
    <section ref={heroRef} className="relative h-screen min-h-screen flex items-center justify-start text-black overflow-hidden pt-18">
      <div ref={videoRef} className="absolute inset-0 z-0 scale-110">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover"
          style={{ backgroundColor: '#000', objectFit: 'cover' }}
        >
          <source src="/banner-vid.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-white/90"></div>
      </div>

      <div ref={contentRef} className="relative z-10 w-full px-0 flex flex-col items-start xl:max-w-7xl 2xl:max-w-[1600px] px-16">
        <StaggerContainer delayChildren={0.5} staggerChildren={0.2} className="flex flex-col items-start w-[80%]! 2xl:w-3/4! ">
          <StaggerItem>
            <span className="hero-subtitle inline-flex items-center px-4 py-1.5 rounded-full bg-[#71c6a4]/40 border border-[#71c6a4]/20 text-[#71c6a4] font-bold text-xs md:text-base lg:text-sm xl:text-sm 2xl:text-xl tracking-widest uppercase mb-6 backdrop-blur-sm ">
              Operational systems built for independent & multi-location pharmacies
            </span>
          </StaggerItem>

          <StaggerItem>
            <h1 ref={headingRef} className="text-4xl md:text-4xl xl:text-6xl 2xl:text-7xl font-black leading-[1.1] mb-6 text-left text-white drop-shadow-2xl capitalize">
              Is your pharmacy losing revenue due to hidden compliance gaps?
            </h1>
          </StaggerItem>

          <StaggerItem>
            <p className="hero-description text-base md:text-lg lg:text-xl xl:text-base 2xl:text-xl mb-6 text-white text-left leading-relaxed font-light ">
              Built to support pharmacies navigating PBM pressure, audit risk, and operational complexity.
            </p>
          </StaggerItem>

          <StaggerItem className="w-full">
            <div className="flex flex-col sm:flex-row items-start gap-6 w-full mt-4">
              <div className="hero-btn">
                <FancyButton
                  label="Request a Strategy Call"
                  textColor="white"
                  borderColor="[#71c6a4]"
                  rippleColor="#2b4c8c"
                  bgColor="#71c6a4"
                  extraClasses="hover:border-[#2b4c8c] hover:text-white transition-all duration-200 2xl:py-6 2xl:px-12 2xl:text-lg" />
              </div>
              <div className="hero-btn">
                <FancyButton
                  label="See How We Protect Revenue"
                  textColor="black"
                  borderColor="white"
                  rippleColor="#2b4c8c"
                  bgColor="white"
                  extraClasses="backdrop-blur-md hover:border-[#2b4c8c] hover:text-white transition-all duration-500 2xl:py-6 2xl:px-12 2xl:text-lg"
                  onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
                />
              </div>
            </div>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </section>
  );
}
