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
          scrub: 2,
        },
      });

      // Arrival Phase (0% to 50%)
      tl.fromTo(items,
        { opacity: 0, x: x, y: 50 },
        { opacity: 1, x: 0, y: 0, stagger: stagger, ease: "none", duration: 1 }
      ).to(items,
        // Departure Phase (50% to 100%)
        { opacity: 0, x: -x * 0.5, y: -50, stagger: stagger, ease: "none", duration: 1 },
        "+=2.5"
      );
    }, containerRef);

    return () => ctx.revert();
  }, [stagger, x]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
