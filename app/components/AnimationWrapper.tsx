"use client";

import { useEffect, useRef, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

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
  distance = 30,
  duration = 0.8,
}: AnimationWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ref.current) return;
    
    gsap.fromTo(ref.current, 
      { opacity: 0, y: direction === "up" ? distance : direction === "down" ? -distance : 0, x: direction === "left" ? distance : direction === "right" ? -distance : 0 },
      {
        opacity: 1,
        y: 0,
        x: 0,
        duration: duration,
        delay: delay,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, { scope: ref });

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/**
 * StaggerContainer - Simplified to just return children
 */
export const StaggerContainer = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
  staggerChildren?: number;
  delayChildren?: number;
  once?: boolean;
}) => {
  return (
    <div className={className}>
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
