"use client";

import { useEffect, useRef } from "react";
import { useInView, animate } from "motion/react";

interface AnimatedNumberProps {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
}

export default function AnimatedNumber({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  duration = 2,
}: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!inView) return;

    const element = ref.current;
    if (!element) return;

    const controls = animate(0, value, {
      duration,
      ease: "easeOut",
      onUpdate(latestValue) {
        element.textContent = prefix + latestValue.toFixed(decimals) + suffix;
      },
    });

    return () => controls.stop();
  }, [value, inView, prefix, suffix, decimals, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {value.toFixed(decimals)}
      {suffix}
    </span>
  );
}
