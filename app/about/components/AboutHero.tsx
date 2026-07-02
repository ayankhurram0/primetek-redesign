"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import aboutImg1 from "@/src/assets/aboutimg1.png";
import aboutImg2 from "@/src/assets/aboutimg2.png";

gsap.registerPlugin(ScrollTrigger);

export const AboutHero = () => {
  const heroRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Intro animations
      gsap.from(".hero-subtitle", {
        opacity: 0,
        y: -15,
        duration: 0.8,
        ease: "power2.out"
      });

      gsap.from(".hero-title", {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: "power3.out",
        delay: 0.1
      });

      gsap.from(".hero-description", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: "power2.out",
        delay: 0.3
      });

      gsap.from(".about-img-left", {
        opacity: 0,
        x: -80,
        duration: 1.4,
        ease: "power4.out",
        delay: 0.2
      });

      gsap.from(".about-img-right", {
        opacity: 0,
        x: 80,
        duration: 1.4,
        ease: "power4.out",
        delay: 0.2
      });

      // Scroll animations
      gsap.fromTo(heroRef.current,
        { scale: 1, opacity: 1 },
        {
          scale: 0.95,
          opacity: 0,
          scrollTrigger: {
            trigger: heroRef.current,
            start: "center center",
            end: "bottom top",
            scrub: true,
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-center items-center px-6 md:px-16 pt-32 pb-20 overflow-hidden bg-transparent"
    >
      {/* Background Masked Images */}

      {/* Left Image: Female Pharmacist */}
      <div
        className="absolute left-0 top-[10%] w-[38%] lg:w-[32%] xl:w-[28%] h-[80%] pointer-events-none z-0 overflow-hidden about-img-left"
      >
        {/* Horizontal Blend */}
        <div
          className="w-full h-full"
          style={{
            maskImage: "linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 15%, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)",
            WebkitMaskImage: "linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 15%, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)",
          }}
        >
          {/* Vertical Blend */}
          <div
            className="w-full h-full relative"
            style={{
              maskImage: "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 15%, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 100%)",
              WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 15%, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 100%)",
            }}
          >
            <Image
              src={aboutImg1}
              alt="Pharmacist on front lines"
              fill
              className="object-cover object-top opacity-90 lg:opacity-100"
              priority
            />
          </div>
        </div>
      </div>

      {/* Right Image: Patient/Man */}
      <div
        className="absolute right-0 top-[10%] w-[38%] lg:w-[32%] xl:w-[28%] h-[80%] pointer-events-none z-0 overflow-hidden about-img-right"
      >
        {/* Horizontal Blend */}
        <div
          className="w-full h-full"
          style={{
            maskImage: "linear-gradient(to left, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 15%, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)",
            WebkitMaskImage: "linear-gradient(to left, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 15%, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)",
          }}
        >
          {/* Vertical Blend */}
          <div
            className="w-full h-full relative"
            style={{
              maskImage: "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 15%, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 100%)",
              WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 15%, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 100%)",
            }}
          >
            <Image
              src={aboutImg2}
              alt="Independent pharmacy customer"
              fill
              className="object-cover object-top opacity-90 lg:opacity-100"
              priority
            />
          </div>
        </div>
      </div>

      {/* Central Hero Content */}
      <div className="relative z-10 w-[85%] mx-auto max-w-4xl text-center flex flex-col items-center justify-center">

        <span className="text-accent font-bold uppercase tracking-[0.2em] text-sm md:text-base mb-6 block hero-subtitle">
          Lorem Ipsum
        </span>

        <h1 className="text-5xl xl:text-7xl font-bold text-ink tracking-tight leading-[1.05] uppercase mb-8 hero-title max-w-3xl font-display">
          Lorem Ipsum <br />
          <span className="text-accent">Dolor Sit Amet</span>
        </h1>

        <p className="text-lg md:text-xl lg:text-2xl text-ink/80 font-light leading-relaxed max-w-2xl mx-auto hero-description font-sans">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis nostrud.
        </p>

      </div>
    </section>
  );
};
