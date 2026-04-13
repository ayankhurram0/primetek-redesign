"use client";

import { useEffect, useRef, ReactNode } from "react";
import gsap from "gsap";

interface MagneticProps {
  children: ReactNode;
  className?: string;
  strength?: number;
}

/**
 * A GSAP Magnetic component that pulls children toward the mouse cursor.
 * Perfect for buttons and interactive icons.
 */
export default function Magnetic({ children, className = "", strength = 0.3 }: MagneticProps) {
  const magneticRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!magneticRef.current) return;

    const xTo = gsap.quickTo(magneticRef.current, "x", {
      duration: 0.8,
      ease: "power2.out",
    });
    const yTo = gsap.quickTo(magneticRef.current, "y", {
      duration: 0.8,
      ease: "power2.out",
    });

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { height, width, left, top } = magneticRef.current!.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      xTo(x * strength);
      yTo(y * strength);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    const element = magneticRef.current;
    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [strength]);

  return (
    <div ref={magneticRef} className={`inline-block ${className}`}>
      {children}
    </div>
  );
}
