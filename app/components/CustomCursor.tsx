"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!cursorRef.current) return;

    // Use quickTo for the best performance in cursor following
    const xTo = gsap.quickTo(cursorRef.current, "x", { duration: 0.4, ease: "power3.out" });
    const yTo = gsap.quickTo(cursorRef.current, "y", { duration: 0.4, ease: "power3.out" });

    const moveCursor = (e: MouseEvent) => {
      xTo(e.clientX - 10);
      yTo(e.clientY - 10);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        target.classList.contains("cursor-pointer")
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  useEffect(() => {
    if (cursorRef.current) {
      gsap.to(cursorRef.current, {
        scale: isHovered ? 1.5 : 1,
        backgroundColor: isHovered ? "#2b4c8c" : "#71c6a4",
        mixBlendMode: isHovered ? "difference" : "multiply",
        duration: 0.3,
      });
    }
  }, [isHovered]);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-5 h-5 rounded-full pointer-events-none z-[9999] transition-colors"
        style={{
          backgroundColor: "#71c6a4",
        }}
      />
      <style jsx global>{`
        body {
          cursor: none !important;
        }
        button, a, .cursor-pointer {
          cursor: none !important;
        }
      `}</style>
    </>
  );
}
