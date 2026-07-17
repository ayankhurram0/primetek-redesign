"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";

const DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

function RollingDigit({
  digit,
  delay = 0,
  play = false,
}: {
  digit: number;
  delay?: number;
  play?: boolean;
}) {
  const strip = [...DIGITS, ...DIGITS, ...DIGITS];
  const targetIndex = 20 + digit;

  return (
    <span
      className="inline-block overflow-hidden align-bottom leading-none font-mono tabular-nums"
      style={{ height: "1em", minWidth: "0.58em" }}
    >
      <motion.span
        className="flex flex-col will-change-transform"
        initial={{ y: "0%" }}
        animate={play ? { y: `-${(targetIndex / strip.length) * 100}%` } : { y: "0%" }}
        transition={{
          duration: 2,
          delay,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {strip.map((n, i) => (
          <span
            key={i}
            className="flex items-center justify-center shrink-0"
            style={{ height: "1em", minWidth: "0.58em" }}
          >
            {n}
          </span>
        ))}
      </motion.span>
    </span>
  );
}

export function RollingInteger({
  value,
  delay = 0,
  play: playProp,
}: {
  value: number;
  delay?: number;
  play?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.45 });
  const play = playProp ?? inView;
  const digits = String(value).split("").map(Number);

  return (
    <span ref={ref} className="inline-flex tabular-nums font-mono">
      {digits.map((d, i) => (
        <RollingDigit key={`${value}-${i}`} digit={d} delay={delay + i * 0.14} play={play} />
      ))}
    </span>
  );
}

type RecoveryStat =
  | { type: "range"; min: number; max: number; unit: string }
  | { type: "plus"; min: number; unit: string };

export function RollingRecovery({
  stat,
  className = "",
  delay = 0,
  play: playProp,
  glowColor = "#0d9488",
}: {
  stat: RecoveryStat;
  className?: string;
  delay?: number;
  play?: boolean;
  glowColor?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.45 });
  const [play, setPlay] = useState(false);

  useEffect(() => {
    if (playProp !== undefined) {
      setPlay(playProp);
      return;
    }
    if (inView) setPlay(true);
  }, [inView, playProp]);

  const rolling = play;

  return (
    <span
      ref={ref}
      className={`inline-flex items-baseline tracking-tight ${className}`}
      style={{ textShadow: `0 0 28px ${glowColor}55` }}
    >
      $<span className="inline-flex font-mono tabular-nums tracking-tight">
        <RollingInteger value={stat.type === "range" ? stat.min : stat.min} delay={delay} play={rolling} />
      </span>
      {stat.unit}
      {stat.type === "range" ? (
        <>
          <span className="mx-0.5">-</span>
          $<span className="inline-flex font-mono tabular-nums tracking-tight">
            <RollingInteger value={stat.max} delay={delay + 0.3} play={rolling} />
          </span>
          {stat.unit}
        </>
      ) : (
        <span>+</span>
      )}
    </span>
  );
}

export function RollingPercent({
  value,
  className = "",
  delay = 0,
  play: playProp,
  glowColor = "#ffffff",
}: {
  value: number;
  className?: string;
  delay?: number;
  play?: boolean;
  glowColor?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.45 });
  const [play, setPlay] = useState(false);

  useEffect(() => {
    if (playProp !== undefined) {
      setPlay(playProp);
      return;
    }
    if (inView) setPlay(true);
  }, [inView, playProp]);

  return (
    <span
      ref={ref}
      className={`inline-flex items-baseline tracking-tight ${className}`}
      style={{ textShadow: glowColor === "#ffffff" ? "0 0 20px rgba(255,255,255,0.25)" : `0 0 28px ${glowColor}55` }}
    >
      +<span className="inline-flex font-mono tabular-nums tracking-tight">
        <RollingInteger value={value} delay={delay} play={play} />
      </span>
      %
    </span>
  );
}

/** Parses stats like "$1.2M+", "19%", "+18%" for homepage cards */
export function RollingStat({
  value,
  className = "",
  delay = 0,
  glowColor = "#0d9488",
}: {
  value: string;
  className?: string;
  delay?: number;
  glowColor?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.45 });
  const [play, setPlay] = useState(false);

  useEffect(() => {
    if (inView) setPlay(true);
  }, [inView]);

  const trimmed = value.trim();
  const prefix = trimmed.match(/^[^\d]+/)?.[0] ?? "";
  const suffix = trimmed.match(/[^\d.]+$/)?.[0] ?? "";
  const numStr = trimmed.slice(prefix.length, trimmed.length - suffix.length || undefined);
  const num = parseFloat(numStr);
  const decimals = numStr.includes(".") ? numStr.split(".")[1]?.length ?? 0 : 0;

  if (Number.isNaN(num)) {
    return <span className={className}>{value}</span>;
  }

  const scaled = Math.round(num * Math.pow(10, decimals));

  return (
    <span
      ref={ref}
      className={`inline-flex items-baseline font-mono tracking-tight ${className}`}
      style={{ textShadow: `0 0 24px ${glowColor}50` }}
    >
      {prefix && <span className="font-display">{prefix}</span>}
      <RollingInteger value={scaled} delay={delay} play={play} />
      {decimals > 0 && (
        <>
          <span>.</span>
          <RollingInteger
            value={scaled % Math.pow(10, decimals)}
            delay={delay + 0.15}
            play={play}
          />
        </>
      )}
      {suffix && <span className="font-display">{suffix}</span>}
    </span>
  );
}
