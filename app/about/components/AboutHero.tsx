"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export const AboutHero = () => {
  const heroRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-subtitle", {
        opacity: 0,
        y: -15,
        duration: 0.8,
        ease: "power2.out",
      });

      gsap.from(".hero-title", {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: "power3.out",
        delay: 0.1,
      });

      gsap.from(".hero-description", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: "power2.out",
        delay: 0.3,
      });

      gsap.fromTo(
        ".about-hero-bg",
        { scale: 1.06, opacity: 0.85 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.6,
          ease: "power2.out",
        },
      );

      gsap.fromTo(
        heroRef.current,
        { scale: 1, opacity: 1 },
        {
          scale: 0.98,
          opacity: 0.55,
          scrollTrigger: {
            trigger: heroRef.current,
            start: "center center",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-transparent px-6 pb-20 pt-32 md:px-16"
    >
      <div
        ref={heroRef}
        className="about-hero-bg pointer-events-none absolute inset-0 z-0"
        aria-hidden
      >
        <Image
          src="/images/about-hero-bg.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Soft center wash so headline stays readable */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.72)_0%,rgba(255,255,255,0.35)_42%,rgba(255,255,255,0.08)_70%,transparent_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-white/50 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto flex w-[85%] max-w-4xl flex-col items-center justify-center text-center">
        <span className="hero-subtitle mb-6 block text-sm font-bold uppercase tracking-[0.2em] text-accent md:text-base">
          Lorem Ipsum
        </span>

        <h1 className="hero-title mb-8 max-w-3xl font-display text-5xl font-bold uppercase leading-[1.05] tracking-tight text-ink xl:text-7xl">
          Lorem Ipsum <br />
          <span className="text-accent">Dolor Sit Amet</span>
        </h1>

        <p className="hero-description mx-auto max-w-2xl font-sans text-lg font-light leading-relaxed text-ink/80 md:text-xl lg:text-2xl">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam quis nostrud.
        </p>
      </div>
    </section>
  );
};
