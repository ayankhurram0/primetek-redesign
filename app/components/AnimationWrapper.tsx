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
}: AnimationWrapperProps) {
  return (
    <div className={className}>
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
