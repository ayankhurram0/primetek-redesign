"use client";

import { useEffect, useRef, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Register GSAP plugins
 */
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface AnimationWrapperProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  duration?: number;
  once?: boolean;
  effect?: "reveal" | "fade" | "scale" | "slide";
}

/**
 * Global Animation Wrapper using GSAP ScrollTrigger Scrubbing.
 * Elements arrive as you enter and depart as you leave.
 */
export default function AnimationWrapper({
  children,
  className = "",
  delay = 0,
  direction = "up",
  distance = 100, // Significant offset for visible scrub
  duration = 0.8,
  once = false, // Scrub works best without 'once: true'
  effect = "fade",
}: AnimationWrapperProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const ctx = gsap.context(() => {
      // 3-Stage Timeline: Enter -> OnScreen -> Depart
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: elementRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 2.2, // Increased smoothing for a 'slower' feel
        },
      });

      const xOffset = direction === "left" ? -distance : direction === "right" ? distance : 0;
      const yOffset = direction === "up" ? distance : direction === "down" ? -distance : 0;

      if (effect === "reveal") {
        tl.fromTo(elementRef.current,
          { clipPath: "inset(0% 100% 0% 0%)", opacity: 0 },
          { clipPath: "inset(0% 0% 0% 0%)", opacity: 1, ease: "none", duration: 1 }
        ).to(elementRef.current,
          { clipPath: "inset(0% 100% 0% 0%)", opacity: 0, ease: "none", duration: 1 },
          "+=2" // Increased stay duration
        );
      } else if (effect === "scale") {
        tl.fromTo(elementRef.current,
          { scale: 0.7, opacity: 0 },
          { scale: 1, opacity: 1, ease: "none", duration: 1 }
        ).to(elementRef.current,
          { scale: 0.7, opacity: 0, ease: "none", duration: 1 },
          "+=2" // Increased stay duration
        );
      } else {
        tl.fromTo(elementRef.current,
          { x: xOffset, y: yOffset, opacity: 0 },
          { x: 0, y: 0, opacity: 1, ease: "none", duration: 1 }
        ).to(elementRef.current,
          { x: -xOffset * 0.5, y: -yOffset * 0.5, opacity: 0, ease: "none", duration: 1 },
          "+=2" // Increased stay duration
        );
      }
    }, elementRef);

    return () => ctx.revert();
  }, [direction, distance, duration, delay, once, effect]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
}

/**
 * StaggerContainer using GSAP ScrollTrigger Scrubbing
 */
export const StaggerContainer = ({
  children,
  className = "",
  staggerChildren = 0.1,
  delayChildren = 0,
  once = false,
}: {
  children: ReactNode;
  className?: string;
  staggerChildren?: number;
  delayChildren?: number;
  once?: boolean;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const items = containerRef.current?.children;
      if (!items || items.length === 0) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      tl.fromTo(items,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, stagger: staggerChildren, ease: "none", duration: 1 }
      ).to(items,
        { opacity: 0, y: -50, stagger: staggerChildren, ease: "none", duration: 1 },
        "+=0.8"
      );
    }, containerRef);

    return () => ctx.revert();
  }, [staggerChildren, delayChildren, once]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
};

/**
 * StaggerItem wrapper
 */
export const StaggerItem = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
  direction?: string;
  distance?: number;
}) => {
  return <div className={className}>{children}</div>;
};
