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

/**
 * ScrollStagger component with scrubbing support for 'Arrive & Depart' behavior.
 */
export default function ScrollStagger({
  children,
  className = "",
  stagger = 0.1,
  x = -100,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  x?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className={className}>
      {children}
    </div>
  );
}
